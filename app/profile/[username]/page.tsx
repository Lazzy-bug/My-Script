"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Film, Eye, GitFork, ExternalLink, MapPin } from "lucide-react";
import { mockUser, mockScripts } from "@/lib/mockData";
import { ScriptCard } from "@/components/ScriptCard";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ProfilePage() {
  const user = mockUser;
  const scripts = mockScripts.filter((s) => s.author.username === "jane-doe");

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">

        {/* ======= Profile Header ======= */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-2xl overflow-hidden ring-4 shadow-2xl"
              style={{ ringColor: "var(--accent)" }}>
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-full h-full object-cover"
                style={{ background: "var(--accent-light)" }}
              />
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-400 ring-2 shadow"
              style={{ ringColor: "var(--bg-card)" }} />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {user.displayName}
                </h1>
                <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                  @{user.username}
                </p>
              </div>
              {/* Focus badge */}
              <span
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--border)" }}
              >
                {user.focus}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {user.bio}
            </p>

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                <MapPin className="w-3.5 h-3.5" />
                Los Angeles, CA
              </span>

              {/* Social links */}
              <div className="flex items-center gap-2">
                {user.github && (
                  <a href={user.github} target="_blank" rel="noopener noreferrer" id="profile-github">
                    <motion.div
                      whileTap={{ scale: 0.92 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
                    >
                      <Github className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                    </motion.div>
                  </a>
                )}
                {user.twitter && (
                  <a href={user.twitter} target="_blank" rel="noopener noreferrer" id="profile-twitter">
                    <motion.div
                      whileTap={{ scale: 0.92 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
                    >
                      <Twitter className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                    </motion.div>
                  </a>
                )}
                {user.imdb && (
                  <a href={user.imdb} target="_blank" rel="noopener noreferrer" id="profile-imdb">
                    <motion.div
                      whileTap={{ scale: 0.92 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
                    >
                      <ExternalLink className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                    </motion.div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ======= Stats Bar ======= */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: "Scripts", value: user.stats.scripts, icon: Film, color: "from-violet-600 to-pink-500" },
            { label: "Total Forks", value: user.stats.forks, icon: GitFork, color: "from-blue-600 to-cyan-400" },
            { label: "Total Reads", value: user.stats.reads.toLocaleString(), icon: Eye, color: "from-amber-500 to-orange-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass-card p-5 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{value}</p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ======= Published Scripts ======= */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
              Published Scripts
            </h2>
            <Link href="/community">
              <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                View all →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scripts.map((script, i) => (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ScriptCard script={script} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
