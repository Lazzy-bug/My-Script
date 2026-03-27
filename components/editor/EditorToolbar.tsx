"use client";

import { motion } from "framer-motion";
import { AlignLeft, User, MessageSquare, Clapperboard, Type, Save, MoreHorizontal } from "lucide-react";
import { useEditor } from "@/context/EditorContext";
import { useTheme } from "@/context/ThemeContext";
import { ImageInsertButton } from "./ImageReferenceBlock";
import clsx from "clsx";

const BLOCK_TYPES = [
  { type: "scene-heading", label: "Scene", icon: Clapperboard, shortcut: "⌘1" },
  { type: "action", label: "Action", icon: AlignLeft, shortcut: "⌘2" },
  { type: "character", label: "Character", icon: User, shortcut: "⌘3" },
  { type: "dialogue", label: "Dialogue", icon: MessageSquare, shortcut: "⌘4" },
] as const;

interface EditorToolbarProps {
  wordCount: number;
  onInsertImage: () => void;
  onSave?: () => void;
}

export function EditorToolbar({ wordCount, onInsertImage, onSave }: EditorToolbarProps) {
  const { activeBlockType, setActiveBlockType } = useEditor();
  const { theme } = useTheme();

  if (theme === "read") return null;

  return (
    <div
      className="editor-toolbar sticky top-16 z-40 flex items-center justify-between gap-4 px-4 py-2"
      style={{
        background: "var(--sidebar-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Block type selector */}
      <div className="flex items-center gap-1">
        <Type className="w-3.5 h-3.5 mr-2 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
        {BLOCK_TYPES.map(({ type, label, icon: Icon, shortcut }) => {
          const isActive = activeBlockType === type;
          return (
            <motion.button
              key={type}
              id={`block-type-${type}`}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveBlockType(type)}
              title={`${label} (${shortcut})`}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                isActive ? "text-white shadow" : "hover:opacity-80"
              )}
              style={{
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "white" : "var(--text-secondary)",
                border: isActive ? "1px solid transparent" : "1px solid var(--border)",
              }}
            >
              <Icon className="w-3 h-3" />
              {label}
            </motion.button>
          );
        })}
      </div>

      {/* Right side: image insert + word count + save */}
      <div className="flex items-center gap-3">
        <ImageInsertButton onInsert={onInsertImage} />

        <span className="hidden md:block text-xs font-medium px-3 py-1.5 rounded-lg"
          style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
          {wordCount} words
        </span>

        <motion.button
          id="save-script-btn"
          whileTap={{ scale: 0.94 }}
          onClick={onSave}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white accent-bg-gradient shadow"
        >
          <Save className="w-3 h-3" />
          Save
        </motion.button>

        <button className="w-7 h-7 flex items-center justify-center rounded-lg"
          style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
