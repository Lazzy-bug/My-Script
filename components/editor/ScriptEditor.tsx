"use client";

import { useEditor as useTipTap, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useEditor as useEditorCtx } from "@/context/EditorContext";
import { ImageReferenceBlockStandalone } from "./ImageReferenceBlock";
import { EditorToolbar } from "./EditorToolbar";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// ---- Block-level styling map ----
const BLOCK_STYLES: Record<string, React.CSSProperties> = {
  "scene-heading": {
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: "12pt",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    padding: "8px 0 4px",
    borderBottom: "1px solid var(--border)",
    marginBottom: "4px",
  },
  action: {
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: "12pt",
    lineHeight: "1.8",
    padding: "4px 0",
  },
  character: {
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: "12pt",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: "12px",
    marginBottom: "2px",
  },
  dialogue: {
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: "12pt",
    lineHeight: "1.7",
    paddingLeft: "48px",
    paddingRight: "48px",
    color: "var(--text-primary)",
  },
};

// ---- A single screenplay "block" row ----
interface BlockRowProps {
  type: string;
  content: string;
  readMode: boolean;
  onChange: (val: string) => void;
}

function BlockRow({ type, content, readMode, onChange }: BlockRowProps) {
  const style = BLOCK_STYLES[type] || BLOCK_STYLES.action;
  const label = type.replace("-", " ").toUpperCase();

  const labelColors: Record<string, string> = {
    "scene-heading": "#7C3AED",
    action: "#059669",
    character: "#D97706",
    dialogue: "#2563EB",
  };

  return (
    <div
      className="group relative mb-2"
      style={{ color: "var(--text-primary)" }}
    >
      {/* Block type label (hidden in read mode) */}
      {!readMode && (
        <span
          className="absolute -left-28 top-1 text-xs font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity select-none"
          style={{ color: labelColors[type] || "var(--text-muted)", width: "6rem", textAlign: "right" }}
        >
          {label}
        </span>
      )}

      <div
        contentEditable={!readMode}
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.textContent || "")}
        style={style}
        className={clsx(
          "outline-none transition-all",
          !readMode && "hover:bg-opacity-5 focus:bg-opacity-10 rounded"
        )}
      >
        {content || (readMode ? "" : <span style={{ color: "var(--text-muted)", opacity: 0.5 }}>Add {label.toLowerCase()}…</span>)}
      </div>
    </div>
  );
}

// ---- Types ----
interface Block {
  id: string;
  type: string;
  content: string;
  isImage?: boolean;
}

// ---- Main ScriptEditor ----
export function ScriptEditor({ initialBlocks }: { initialBlocks: Block[] }) {
  const { theme } = useTheme();
  const { activeBlockType } = useEditorCtx();
  const readMode = theme === "read";

  const [blocks, setBlocks] = useState<Block[]>(initialBlocks.length > 0 ? initialBlocks : [
    { id: "1", type: "scene-heading", content: "EXT. ANDROMEDA STATION — AIRLOCK — DAY" },
    { id: "2", type: "action", content: "A lone figure in a battered EVA suit clings to the hull. Stars drift silently behind her. The signal pings again — steady, patient, impossible." },
    { id: "3", type: "character", content: "DR. MARA QUINN" },
    { id: "4", type: "dialogue", content: "Houston, I've found something. I don't think they're going to believe me." },
    { id: "5", type: "action", content: "She stares at the readout. The coordinates don't match any known star system." },
    { id: "6", type: "scene-heading", content: "INT. ANDROMEDA STATION — CONTROL ROOM — CONTINUOUS" },
    { id: "7", type: "action", content: "The control room hums with quiet tension. Banks of monitors display data streams and star charts. COMMANDER HAL, 50s, weathered, stands at the central console." },
    { id: "8", type: "character", content: "COMMANDER HAL" },
    { id: "9", type: "dialogue", content: "We heard you, Quinn. Don't touch anything until we get a team together." },
  ]);

  const [imageBlocks, setImageBlocks] = useState<string[]>([]); // IDs of image placeholder blocks

  const wordCount = blocks.reduce((acc, b) => acc + (b.content?.split(/\s+/).filter(Boolean).length || 0), 0);

  const updateBlock = useCallback((id: string, content: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, content } : b));
  }, []);

  const addBlock = useCallback(() => {
    const newId = Date.now().toString();
    setBlocks(prev => [...prev, { id: newId, type: activeBlockType, content: "" }]);
  }, [activeBlockType]);

  const insertImageBlock = useCallback(() => {
    const newId = `img-${Date.now()}`;
    setBlocks(prev => [...prev, { id: newId, type: "image-reference", content: "", isImage: true }]);
    setImageBlocks(prev => [...prev, newId]);
  }, []);

  const removeImageBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
    setImageBlocks(prev => prev.filter(iid => iid !== id));
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <EditorToolbar
        wordCount={wordCount}
        onInsertImage={insertImageBlock}
        onSave={() => {}}
      />

      {/* Page canvas */}
      <div className="flex-1 overflow-y-auto py-10 px-6" style={{ background: "var(--bg-primary)" }}>
        <div
          className="max-w-2xl mx-auto rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            minHeight: "80vh",
            padding: "48px 64px",
          }}
        >
          {/* Title / Script name */}
          {!readMode && (
            <div className="mb-10 pb-6" style={{ borderBottom: "2px solid var(--border)" }}>
              <input
                type="text"
                defaultValue="Echoes of Andromeda"
                className="w-full text-3xl font-bold outline-none bg-transparent"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: '"Courier New", Courier, monospace',
                }}
                placeholder="Untitled Script"
              />
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)", fontFamily: '"Courier New", Courier, monospace' }}>
                Written by Jane Doe · Feature Film Draft 2.1
              </p>
            </div>
          )}

          {readMode && (
            <div className="mb-10 pb-6 text-center" style={{ borderBottom: "2px solid var(--border-strong)" }}>
              <h1 className="text-3xl font-bold font-courier" style={{ color: "var(--text-primary)", fontFamily: '"Courier New", Courier, monospace' }}>
                ECHOES OF ANDROMEDA
              </h1>
              <p className="mt-2 text-sm font-courier" style={{ color: "var(--text-secondary)", fontFamily: '"Courier New", Courier, monospace' }}>
                Written by Jane Doe
              </p>
            </div>
          )}

          {/* Blocks */}
          <div className="relative pl-32">
            <AnimatePresence initial={false}>
              {blocks.map((block, idx) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {block.isImage ? (
                    <ImageReferenceBlockStandalone
                      onRemove={() => removeImageBlock(block.id)}
                    />
                  ) : (
                    <BlockRow
                      type={block.type}
                      content={block.content}
                      readMode={readMode}
                      onChange={(val) => updateBlock(block.id, val)}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add block button */}
            {!readMode && (
              <motion.button
                id="add-block-btn"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={addBlock}
                className="mt-4 w-full py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: "transparent",
                  border: "2px dashed var(--border)",
                  color: "var(--text-muted)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                }}
              >
                + Add {activeBlockType.replace("-", " ")} block
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
