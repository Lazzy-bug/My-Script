"use client";

import { EditorProvider } from "@/context/EditorContext";
import { ContextSidebar } from "@/components/editor/ContextSidebar";
import { ScriptEditor } from "@/components/editor/ScriptEditor";
import { demoScript, mockScripts } from "@/lib/mockData";
import { useTheme } from "@/context/ThemeContext";
import { use } from "react";

interface EditorPageProps {
  params: Promise<{ id: string }>;
}

export default function EditorPage({ params }: EditorPageProps) {
  const { id } = use(params);
  const { theme } = useTheme();
  const script = id === "demo" ? demoScript : (mockScripts.find(s => s.id === id) || demoScript);

  return (
    <EditorProvider>
      <div className="flex h-[calc(100vh-4rem)]" style={{ background: "var(--bg-primary)" }}>
        {/* Liquid Glass Context Sidebar */}
        {theme !== "read" && <ContextSidebar />}

        {/* Main Editor Canvas */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <ScriptEditor initialBlocks={script.blocks} />
        </div>
      </div>
    </EditorProvider>
  );
}
