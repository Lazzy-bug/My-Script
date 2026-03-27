"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { ImageIcon, X, AlertCircle, Upload } from "lucide-react";
import { useEditor } from "@/context/EditorContext";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";

interface ImageReferenceBlockProps {
  onRemove?: () => void;
}

export function ImageReferenceBlockStandalone({ onRemove }: ImageReferenceBlockProps) {
  const { removeImage } = useEditor();
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemove = () => {
    removeImage();
    if (onRemove) onRemove();
  };

  const loadFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  }, []);

  return (
    <div
      className={clsx(
        "my-4 rounded-xl overflow-hidden relative group transition-all",
        theme !== "read" && "cursor-pointer"
      )}
      style={{ border: "2px dashed var(--accent)", background: "var(--accent-light)" }}
    >
      {/* 16:9 enforced via padding trick */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !imageUrl && inputRef.current?.click()}
        >
          <AnimatePresence mode="wait">
            {imageUrl ? (
              <motion.img
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={imageUrl}
                alt="Reference image"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: isDragging ? 0.9 : 1 }}
                className="flex flex-col items-center gap-2 pointer-events-none select-none"
              >
                {isDragging ? (
                  <Upload className="w-8 h-8" style={{ color: "var(--accent)" }} />
                ) : (
                  <ImageIcon className="w-8 h-8" style={{ color: "var(--accent)" }} />
                )}
                <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                  {isDragging ? "Drop here" : "Click or drag to add reference image"}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Displayed in cinematic 16:9
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Label badge */}
      <div className="absolute top-3 left-3">
        <span className="text-xs px-2 py-1 rounded-full font-semibold text-white backdrop-blur-sm"
          style={{ background: "var(--accent)" }}>
          📷 Reference Image
        </span>
      </div>

      {/* Remove button */}
      {theme !== "read" && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleRemove}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(0,0,0,0.6)" }}
          title="Remove image"
          id={`remove-image-block`}
        >
          <X className="w-3.5 h-3.5 text-white" />
        </motion.button>
      )}

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  );
}

// ====== ImageInsertButton used in toolbar ======
export function ImageInsertButton({ onInsert }: { onInsert: () => void }) {
  const { imageCount, addImage } = useEditor();
  const MAX = 3;
  const atLimit = imageCount >= MAX;

  const handleClick = () => {
    if (atLimit) return;
    const added = addImage();
    if (added) onInsert();
  };

  return (
    <div className="relative">
      <motion.button
        id="insert-image-btn"
        whileTap={atLimit ? {} : { scale: 0.92 }}
        whileHover={atLimit ? {} : { scale: 1.05 }}
        onClick={handleClick}
        disabled={atLimit}
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
          atLimit ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
        style={{
          background: atLimit ? "var(--border)" : "var(--accent-light)",
          color: atLimit ? "var(--text-muted)" : "var(--accent)",
          border: "1px solid var(--border)",
        }}
        title={atLimit ? "Maximum 3 reference images allowed" : `Insert image (${imageCount}/3 used)`}
      >
        <ImageIcon className="w-3.5 h-3.5" />
        Image {imageCount}/{MAX}
      </motion.button>

      <AnimatePresence>
        {atLimit && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-full left-0 mt-2 z-50 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl"
            style={{ background: "#DC2626", color: "white" }}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Maximum 3 reference images allowed
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
