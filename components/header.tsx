import Link from "next/link";

const navItems = [{ href: "/posts", label: "Posts" }] as const;

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container mx-auto flex items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-slate-900 transition-colors hover:text-slate-600 md:text-xl"
        >
          IL-12 Dispatch
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 text-sm font-semibold text-slate-700">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition-colors hover:text-slate-900"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
