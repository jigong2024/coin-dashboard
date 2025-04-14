import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-white dark:bg-black dark:text-white">
      메인입니다.
      <ThemeToggle />
    </main>
  );
}
