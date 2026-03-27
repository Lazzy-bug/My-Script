"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FilmIcon, ArrowRight, Users, BookOpen, Zap } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] as const } },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--border)" }}
          >
            <Zap className="w-3.5 h-3.5" />
            Next-Generation Collaborative Screenwriting
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-none tracking-tight" style={{ color: "var(--text-primary)" }}>
          Write Scripts.
          <br />
          <span className="accent-gradient">Together.</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          MyScript blends Final Draft's precision with Figma's freedom and GitHub's community. The canvas where great stories are born.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/editor/demo">
            <motion.button
              id="cta-start-writing"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white accent-bg-gradient shadow-xl"
            >
              <FilmIcon className="w-5 h-5" />
              Start Writing Free
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <Link href="/community">
            <motion.button
              id="cta-explore"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
              style={{ background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
            >
              <Users className="w-5 h-5" />
              Explore Community
            </motion.button>
          </Link>
        </motion.div>

        {/* Feature cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: FilmIcon, title: "Block Editor", desc: "Scene Headings, Action, Character, Dialogue — all perfectly formatted." },
            { icon: Users, title: "Community Hub", desc: "Discover, fork, and remix scripts from writers worldwide." },
            { icon: BookOpen, title: "Read Mode", desc: "Distraction-free sepia reading experience with zero chrome." },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-card p-5 text-left"
            >
              <div className="w-10 h-10 rounded-xl accent-bg-gradient flex items-center justify-center mb-3 shadow">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{title}</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
