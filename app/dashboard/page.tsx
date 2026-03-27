"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FilmIcon, Clock, GitFork, Eye, BarChart2, Zap,
  BookOpen, Users, Plus, TrendingUp, Star, AlignLeft
} from "lucide-react";
import { mockUser, mockScripts } from "@/lib/mockData";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Script } from "@/types";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.25, 0, 1] as const } },
};

// ---------- Draggable Recent Project Row ----------
function SortableProjectRow({ script }: { script: Script }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: script.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  const gradients = [
    "from-violet-600 to-pink-500",
    "from-blue-600 to-cyan-400",
    "from-amber-500 to-orange-500",
  ];
  const idx = parseInt(script.id.replace("s", "")) - 1;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-3 rounded-xl cursor-grab active:cursor-grabbing transition-all hover:scale-[1.01]"
      {...attributes}
      {...listeners}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-light)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center flex-shrink-0 shadow`}>
        <FilmIcon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{script.title}</p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Updated {new Date(script.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
          <Eye className="w-3 h-3" /> {script.reads.toLocaleString()}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
          <GitFork className="w-3 h-3" /> {script.forks}
        </span>
        <Link href={`/editor/${script.id}`}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white accent-bg-gradient shadow"
          >
            Open
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

// ---------- Main Dashboard ----------
export default function DashboardPage() {
  const [projects, setProjects] = useState(mockScripts.slice(0, 5));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setProjects((prev) => {
        const oldIdx = prev.findIndex((s) => s.id === active.id);
        const newIdx = prev.findIndex((s) => s.id === over?.id);
        const next = [...prev];
        const [removed] = next.splice(oldIdx, 1);
        next.splice(newIdx, 0, removed);
        return next;
      });
    }
  }

  const stats = [
    { label: "Scripts", value: mockUser.stats.scripts, icon: FilmIcon, color: "from-violet-600 to-violet-400" },
    { label: "Forks", value: mockUser.stats.forks, icon: GitFork, color: "from-pink-600 to-pink-400" },
    { label: "Total Reads", value: mockUser.stats.reads.toLocaleString(), icon: Eye, color: "from-amber-500 to-amber-300" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-8">
        <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              Good morning, <span className="accent-gradient">{mockUser.displayName.split(" ")[0]}</span> 👋
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              Here&apos;s what&apos;s happening with your scripts today.
            </p>
          </div>
          <Link href="/editor/new">
            <motion.button
              id="dashboard-new-script"
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white accent-bg-gradient shadow-lg"
            >
              <Plus className="w-4 h-4" /> New Script
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* ====== BENTO GRID ====== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-12 gap-4"
        style={{ gridAutoRows: "minmax(80px, auto)" }}
      >

        {/* ---- CELL: Stats (3 cols, row 1) ---- */}
        {stats.map(({ label, value, icon: Icon, color }) => (
          <motion.div
            key={label}
            variants={itemVariants}
            className="col-span-12 md:col-span-4 glass-card p-5 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{value}</p>
              <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</p>
            </div>
          </motion.div>
        ))}

        {/* ---- CELL: Recent Projects (8 cols) ---- */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 lg:col-span-8 glass-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "var(--accent)" }} />
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Recent Projects</h2>
            </div>
            <span className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
              Drag to reorder
            </span>
          </div>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-1">
                {projects.map((script) => (
                  <SortableProjectRow key={script.id} script={script} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </motion.div>

        {/* ---- CELL: Quick Actions (4 cols) ---- */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 lg:col-span-4 glass-card p-5 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Quick Actions</h2>
          </div>
          {[
            { icon: FilmIcon, label: "New Script", href: "/editor/new", desc: "Start from blank", gradient: "from-violet-600 to-pink-500" },
            { icon: Users, label: "Browse Community", href: "/community", desc: "Discover scripts", gradient: "from-blue-600 to-cyan-500" },
            { icon: BookOpen, label: "My Profile", href: "/profile/jane-doe", desc: "View public page", gradient: "from-amber-500 to-orange-500" },
            { icon: AlignLeft, label: "Script Templates", href: "/editor/demo", desc: "Try a template", gradient: "from-green-600 to-teal-500" },
          ].map(({ icon: Icon, label, href, desc, gradient }) => (
            <Link key={label} href={href}>
              <motion.div
                whileTap={{ scale: 0.97 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                style={{ border: "1px solid var(--border)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
              >
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{label}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* ---- CELL: Activity Feed (8 cols) ---- */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 lg:col-span-8 glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Activity Feed</h2>
          </div>
          <div className="space-y-4">
            {[
              { time: "2h ago", event: "Marco Valentini forked your script", script: "Echoes of Andromeda", icon: GitFork, color: "text-violet-400" },
              { time: "6h ago", event: "Priya Sharma starred", script: "Silicon Pastoral", icon: Star, color: "text-amber-400" },
              { time: "1d ago", event: "1,000 reads milestone reached on", script: "Echoes of Andromeda", icon: Eye, color: "text-green-400" },
              { time: "2d ago", event: "New comment on", script: "Silicon Pastoral", icon: BarChart2, color: "text-blue-400" },
            ].map(({ time, event, script, icon: Icon, color }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "var(--accent-light)" }}
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {event}{" "}
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      &quot;{script}&quot;
                    </span>
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---- CELL: Writing Streak (4 cols) ---- */}
        <motion.div
          variants={itemVariants}
          className="col-span-12 lg:col-span-4 glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Writing Streak</h2>
          </div>
          <div className="text-center py-4">
            <p className="text-5xl font-black accent-gradient mb-1">7</p>
            <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>day streak 🔥</p>
          </div>
          <div className="grid grid-cols-7 gap-1 mt-4">
            {Array.from({ length: 28 }, (_, i) => {
              const intensity = [0, 1, 2, 3][Math.floor(Math.random() * 4)];
              const colors = ["var(--border)", "var(--accent-light)", "rgba(139,92,246,0.4)", "var(--accent)"];
              return (
                <div
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{ background: colors[intensity] }}
                />
              );
            })}
          </div>
          <p className="text-xs text-center mt-3" style={{ color: "var(--text-muted)" }}>
            Last 4 weeks
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}
