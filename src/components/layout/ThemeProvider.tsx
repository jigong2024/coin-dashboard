"use client";

import { useThemeStore } from "@/store";
import { useEffect } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return <div className={theme}>{children}</div>; // div의 dark 클래스 제거
};

export default ThemeProvider;
