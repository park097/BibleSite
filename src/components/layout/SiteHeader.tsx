import Link from "next/link";

const links = [
  { href: "/", label: "홈" },
  { href: "/competition", label: "대회 안내" },
  { href: "/register", label: "참가 신청" },
  { href: "/notice", label: "공지사항" },
  { href: "/gallery", label: "갤러리" },
  { href: "/admin", label: "관리자" }
];

function LogoMark() {
  return (
    <div className="grid h-11 w-11 place-items-center text-primary">
      <div className="relative h-6 w-6 rotate-45">
        <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-primary" />
        <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-primary" />
        <span className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 border border-primary/70" />
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <div>
            <p className="font-serif text-xl font-semibold tracking-[0.18em] text-primary md:text-2xl">HARMONY</p>
            <p className="text-[10px] uppercase tracking-[0.32em] text-primary/55 md:text-[11px]">Community Church</p>
          </div>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-primary/80 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition duration-300 hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
