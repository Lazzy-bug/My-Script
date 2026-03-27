"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark" | "read";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    const html = document.documentElement;
    html.classList.remove("light", "dark", "read");
    html.classList.add(newTheme);
    localStorage.setItem("myscript-theme", newTheme);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("myscript-theme") as Theme | null;
    const initial = saved || "dark";
    setThemeState(initial);
    document.documentElement.classList.remove("light", "dark", "read");
    document.documentElement.classList.add(initial);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
