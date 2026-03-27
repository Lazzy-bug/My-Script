"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, TrendingUp, Sparkles, GitFork, Filter } from "lucide-react";
import { ScriptCard } from "@/components/ScriptCard";
import { mockScripts } from "@/lib/mockData";
import { useTheme } from "@/context/ThemeContext";

const GENRES = ["All", "Sci-Fi", "Drama", "Thriller", "Adventure", "Action", "Mystery"];
const SORTS = ["Trending", "Newest", "Most Forked", "Most Read"];

export default function CommunityPage() {
  const { setTheme } = useTheme();

  // Force dark mode on mount
  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  const [activeGenre, setActiveGenre] = useState("All");
  const [activeSort, setActiveSort] = useState("Trending");
  const [search, setSearch] = useState("");

  const filtered = mockScripts
    .filter((s) => {
      const matchGenre = activeGenre === "All" || s.genre.includes(activeGenre);
      const matchSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.author.displayName.toLowerCase().includes(search.toLowerCase());
      return matchGenre && matchSearch;
    })
    .sort((a, b) => {
      if (activeSort === "Most Forked") return b.forks - a.forks;
      if (activeSort === "Most Read") return b.reads - a.reads;
      if (activeSort === "Newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // Trending: weighted score
      return b.reads * 0.3 + b.forks * 0.7 - (a.reads * 0.3 + a.forks * 0.7);
    });

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero banner */}
      <div className="relative overflow-hidden px-6 py-16 text-center"
        style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.15) 0%, transparent 100%)" }}>
        {/* Decorative orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)", transform: "translate(-50%,-50%)" }} />
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)", transform: "translate(50%,-50%)" }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--border)" }}>
            <Sparkles className="w-3.5 h-3.5" />
            Community Scripts
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Discover &{" "}
            <span className="accent-gradient">Fork Scripts</span>
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Thousands of screenplays from writers worldwide. Read, fork, and remix.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="max-w-xl mx-auto mt-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              id="community-search"
              type="text"
              placeholder="Search scripts or authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6"
        >
          {/* Genre pills */}
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <motion.button
                key={g}
                id={`genre-${g.toLowerCase()}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveGenre(g)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: activeGenre === g ? "var(--accent)" : "var(--bg-card)",
                  color: activeGenre === g ? "white" : "var(--text-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                {g}
              </motion.button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <select
              id="community-sort"
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="text-sm px-3 py-2 rounded-lg outline-none"
              style={{
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              }}
            >
              {SORTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-4 h-4" style={{ color: "var(--accent)" }} />
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {filtered.length} script{filtered.length !== 1 ? "s" : ""}
            {activeGenre !== "All" && ` in ${activeGenre}`}
          </span>
        </div>

        {/* Script Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((script) => (
              <motion.div
                key={script.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <ScriptCard script={script} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-3 text-center py-20"
              style={{ color: "var(--text-muted)" }}
            >
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No scripts found</p>
              <p className="text-sm mt-1">Try a different genre or search term</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
