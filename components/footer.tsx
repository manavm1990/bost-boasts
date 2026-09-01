const EDITOR_EMAIL = "editor@il12dispatch.org";

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-400">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-7">
        <div className="space-y-1">
          <p className="text-sm font-bold tracking-wide text-brand-tint">
            The IL-12 Dispatch
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
        <p className="text-xs">
          Independent accountability reporting for Illinois's 12th Congressional
          District.
        </p>
      </div>
    </footer>
  );
}
