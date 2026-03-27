"use client";

import { motion } from "framer-motion";
import { Sun, Moon, BookOpen } from "lucide-react";
import { useTheme, Theme } from "@/context/ThemeContext";

const themes: { value: Theme; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "read", icon: BookOpen, label: "Read" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center rounded-full p-1 relative"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      role="group"
      aria-label="Theme selector"
    >
      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            id={`theme-${value}`}
            aria-label={`Switch to ${label} mode`}
            onClick={() => setTheme(value)}
            className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200"
            style={{ color: isActive ? "white" : "var(--text-muted)" }}
          >
            {isActive && (
              <motion.div
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full accent-bg-gradient"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              <Icon className="w-3.5 h-3.5" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
