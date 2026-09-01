import { EDITOR_EMAIL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-info";

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-400">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-7">
        <div className="space-y-1">
          <p className="text-sm font-bold tracking-wide text-brand-tint">
            {SITE_NAME}
          </p>
          <p className="text-xs">
            <a
              className="underline decoration-slate-600 underline-offset-2 transition-colors hover:text-brand-tint hover:decoration-brand-tint"
              href={`mailto:${EDITOR_EMAIL}`}
            >
              {EDITOR_EMAIL}
            </a>
          </p>
        </div>
        <p className="text-xs">{SITE_DESCRIPTION}</p>
      </div>
    </footer>
  );
}
