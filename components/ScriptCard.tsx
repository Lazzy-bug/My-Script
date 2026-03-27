"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GitFork, Eye, Clock, BookOpen, Star, Film } from "lucide-react";
import { Script } from "@/types";

interface ScriptCardProps {
  script: Script;
  variant?: "default" | "compact";
}

const genreColors: Record<string, string> = {
  "Sci-Fi": "bg-violet-900/60 text-violet-300 border-violet-700/50",
  "Thriller": "bg-red-900/60 text-red-300 border-red-700/50",
  "Drama": "bg-amber-900/60 text-amber-300 border-amber-700/50",
  "Adventure": "bg-green-900/60 text-green-300 border-green-700/50",
  "Action": "bg-orange-900/60 text-orange-300 border-orange-700/50",
  "Mystery": "bg-blue-900/60 text-blue-300 border-blue-700/50",
};

// Gradient placeholders for covers (since we don't have real images)
const coverGradients = [
  "linear-gradient(135deg, #1a1a2e 0%, #7c3aed 50%, #ec4899 100%)",
  "linear-gradient(135deg, #0f3460 0%, #16213e 50%, #e94560 100%)",
  "linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%)",
  "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  "linear-gradient(135deg, #41295a 0%, #2f0743 50%, #e74c3c 100%)",
];

export function ScriptCard({ script, variant = "default" }: ScriptCardProps) {
  const idx = parseInt(script.id.replace("s", "")) - 1;
  const gradient = coverGradients[idx % coverGradients.length];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      {/* Cover (16:9) */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: gradient }}
        >
          <Film className="w-10 h-10 text-white/30" />
        </div>
        {/* Genre badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {script.genre.map((g) => (
            <span
              key={g}
              className={`text-xs px-2 py-0.5 rounded-full border font-medium backdrop-blur-sm ${genreColors[g] || "bg-gray-900/60 text-gray-300 border-gray-700/50"}`}
            >
              {g}
            </span>
          ))}
        </div>
        {/* Stats overlay */}
        <div className="absolute bottom-3 right-3 flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
            <Eye className="w-3 h-3" /> {script.reads.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
            <GitFork className="w-3 h-3" /> {script.forks}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-violet-400 transition-colors" style={{ color: "var(--text-primary)" }}>
            {script.title}
          </h3>
        </div>

        {variant === "default" && (
          <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {script.logline}
          </p>
        )}

        {/* Author row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={script.author.avatar}
              alt={script.author.displayName}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              {script.author.displayName}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {new Date(script.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          <motion.button
            id={`fork-${script.id}`}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.04 }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--border)" }}
          >
            <GitFork className="w-3.5 h-3.5" />
            Fork
          </motion.button>
          <Link href={`/editor/${script.id}`} className="flex-1">
            <motion.button
              id={`read-${script.id}`}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.04 }}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-white transition-colors accent-bg-gradient shadow"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Read
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
