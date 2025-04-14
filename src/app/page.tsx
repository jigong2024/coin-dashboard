"use client";
import AssetList from "@/components/asset/AssetList";
import FavoriteList from "@/components/asset/FavoriteList";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 w-screen h-screen bg-white dark:bg-black dark:text-white">
      메인입니다.
      <ThemeToggle />
      <AssetList />
      <FavoriteList />
    </main>
  );
}
