import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
      setTheme: (t) => set({ theme: t }),
    }),
    { name: "theme-storage" }
  )
);
