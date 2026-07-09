import Link from "next/link";

const navItems = [
  { href: "/", label: "🏠 今日" },
  { href: "/records", label: "📖 記録" },
  { href: "/community", label: "🤝 みんな" },
  { href: "/growth", label: "🌳 成長" },
  { href: "/mypage", label: "👤 マイページ" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-orange-200/60 bg-[#fff8ed]/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span>
              <span className="block text-sm text-orange-700">TSUNAGU ら！</span>
              <span className="block font-bold text-stone-900">人間力向上委員会</span>
            </span>
          </Link>
          <nav className="grid grid-cols-5 gap-1 text-center text-xs sm:text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-1 py-2 text-stone-700 transition hover:bg-orange-100 hover:text-orange-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6 md:py-10">{children}</main>
    </div>
  );
}
