import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode
        cream: "#FAF7F0",
        sepia: "#8B7355",
        // Dark mode
        charcoal: {
          DEFAULT: "#1A1A2E",
          800: "#16213E",
          700: "#0F3460",
          600: "#1E1E2E",
          500: "#2A2A3E",
          400: "#3A3A4E",
        },
        // Accents
        violet: {
          DEFAULT: "#7C3AED",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          900: "#2D1B69",
        },
        amber: {
          400: "#FBBF24",
          500: "#F59E0B",
        },
        glass: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        courier: ['"Courier New"', "Courier", "monospace"],
        inter: ["Inter", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.4s ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
