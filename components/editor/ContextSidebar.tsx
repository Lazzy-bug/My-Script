"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, BookOpen, Layers, ChevronRight, Plus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const characters = [
  { name: "DR. MARA QUINN", role: "Protagonist", color: "from-violet-500 to-pink-500" },
  { name: "COMMANDER HAL", role: "Antagonist", color: "from-red-500 to-orange-500" },
  { name: "EVA", role: "AI Companion", color: "from-blue-500 to-cyan-400" },
  { name: "DIRECTOR CROSS", role: "Authority", color: "from-amber-500 to-yellow-400" },
];

const scenes = [
  { id: 1, heading: "EXT. ANDROMEDA STATION — AIRLOCK", time: "DAY", blocks: 4 },
  { id: 2, heading: "INT. CONTROL ROOM", time: "NIGHT", blocks: 7 },
  { id: 3, heading: "EXT. DEEP SPACE", time: "CONTINUOUS", blocks: 3 },
  { id: 4, heading: "INT. MARA'S QUARTERS", time: "LATER", blocks: 5 },
];

export function ContextSidebar() {
  const { theme } = useTheme();

  if (theme === "read") return null;

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="context-sidebar w-64 flex-shrink-0 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16"
      style={{
        background: "var(--sidebar-bg)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRight: "1px solid var(--border)",
      }}
    >
      <div className="p-4 space-y-6">

        {/* Scene Navigator */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Scenes
              </span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
              {scenes.length}
            </span>
          </div>
          <div className="space-y-1">
            {scenes.map((scene, i) => (
              <motion.button
                key={scene.id}
                whileHover={{ x: 3 }}
                className="w-full text-left flex items-start gap-2 px-2 py-2 rounded-lg text-xs group transition-colors"
                style={{
                  background: i === 0 ? "var(--accent-light)" : "transparent",
                  color: i === 0 ? "var(--accent)" : "var(--text-secondary)",
                }}
              >
                <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded flex items-center justify-center text-xs font-bold"
                  style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                  {scene.id}
                </span>
                <div className="min-w-0">
                  <p className="font-medium truncate leading-tight">{scene.heading}</p>
                  <p style={{ color: "var(--text-muted)" }}>{scene.time} · {scene.blocks} blocks</p>
                </div>
                <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)" }} />

        {/* Characters */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Characters
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{ background: "var(--accent-light)", color: "var(--accent)" }}
              title="Add character"
            >
              <Plus className="w-3 h-3" />
            </motion.button>
          </div>
          <div className="space-y-2">
            {characters.map((char) => (
              <div
                key={char.name}
                className="flex items-center gap-2.5 p-2 rounded-lg transition-colors"
                style={{ background: "transparent" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-light)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${char.color} flex items-center justify-center flex-shrink-0 shadow`}>
                  <span className="text-xs font-bold text-white">{char.name[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>{char.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{char.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)" }} />

        {/* Script info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Script Info
            </span>
          </div>
          <div className="space-y-2 text-xs" style={{ color: "var(--text-secondary)" }}>
            {[
              ["Genre", "Sci-Fi · Thriller"],
              ["Format", "Feature Film"],
              ["Draft", "v2.1"],
              ["Pages", "~94"],
              ["WGA #", "1-234-5678"],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between">
                <span style={{ color: "var(--text-muted)" }}>{label}</span>
                <span className="font-medium" style={{ color: "var(--text-primary)" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
