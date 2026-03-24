import Link from "next/link";

const links = [
  { href: "/", label: "홈" },
  { href: "/competition", label: "대회 안내" },
  { href: "/register", label: "참가 신청" },
  { href: "/test", label: "시험" },
  { href: "/ranking", label: "랭킹" },
  { href: "/admin", label: "관리자" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#ddd2c4] bg-[#f4efea]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-semibold tracking-[0.06em] text-ink">
          성경 암송 대회
        </Link>
        <nav className="hidden gap-5 text-sm text-muted md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
