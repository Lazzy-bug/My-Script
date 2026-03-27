"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FilmIcon, Home, BookOpen, Users, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const { theme } = useTheme();

  if (theme === "read") return null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="navbar sticky top-0 z-50 liquid-glass"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg accent-bg-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <FilmIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
            My<span className="accent-gradient">Script</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "/dashboard", icon: Home, label: "Dashboard" },
            { href: "/editor/demo", icon: BookOpen, label: "Editor" },
            { href: "/community", icon: Users, label: "Community" },
            { href: "/profile/jane-doe", icon: User, label: "Profile" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                (e.currentTarget as HTMLElement).style.background = "var(--accent-light)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/editor/new"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 accent-bg-gradient shadow-lg"
          >
            + New Script
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
