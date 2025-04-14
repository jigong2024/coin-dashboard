"use client";

import { useThemeStore } from "@/store";
import React, { useEffect } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  // 테마 변경 시 html class 적용
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <button onClick={toggleTheme} className="px-4 py-2 border rounded">
      {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
