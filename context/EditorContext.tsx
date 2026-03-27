"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";

interface EditorContextValue {
  imageCount: number;
  addImage: () => boolean; // returns false if at limit
  removeImage: () => void;
  activeBlockType: string;
  setActiveBlockType: (type: string) => void;
}

const EditorContext = createContext<EditorContextValue>({
  imageCount: 0,
  addImage: () => false,
  removeImage: () => {},
  activeBlockType: "action",
  setActiveBlockType: () => {},
});

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [imageCount, setImageCount] = useState(0);
  const [activeBlockType, setActiveBlockType] = useState("action");
  const MAX_IMAGES = 3;

  const addImage = useCallback(() => {
    if (imageCount >= MAX_IMAGES) return false;
    setImageCount((c) => c + 1);
    return true;
  }, [imageCount]);

  const removeImage = useCallback(() => {
    setImageCount((c) => Math.max(0, c - 1));
  }, []);

  return (
    <EditorContext.Provider value={{ imageCount, addImage, removeImage, activeBlockType, setActiveBlockType }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return useContext(EditorContext);
}
