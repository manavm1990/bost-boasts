import Link from "next/link";

const navItems = [{ href: "/", label: "Posts" }] as const;

export default function Header() {
  return (
    <>
      <div className="bg-ink text-brand-tint">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-2">
          <span className="text-[11px] font-bold tracking-wider uppercase">
            Illinois 12th Congressional District
          </span>
          <span className="hidden text-[11px] text-brand-tint/70 italic sm:inline">
            Holding our representatives accountable — one vote at a time
          </span>
        </div>
      </div>
      <header className="border-b-[6px] border-brand bg-white">
        <div className="container mx-auto flex flex-wrap items-end justify-between gap-6 px-6 py-6">
          <Link
            href="/"
            className="font-serif text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl"
          >
            The IL-12 Dispatch
          </Link>
          <nav aria-label="Primary">
            <ul className="flex items-center gap-7 pb-1">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="border-b-2 border-brand pb-1 text-[13px] font-bold tracking-wide text-slate-900 uppercase"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
