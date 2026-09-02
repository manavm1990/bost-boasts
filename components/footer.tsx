import Link from "next/link";
import NewsletterSignup from "@/components/newsletter-signup.client";
import { EDITOR_EMAIL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-info";

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-400">
      <div className="container mx-auto space-y-8 px-6 py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md space-y-2">
            <p className="text-sm font-bold tracking-wide text-brand-tint uppercase">
              Get the Dispatch
            </p>
            <p className="text-xs text-slate-400">
              Occasional emails when we publish.{" "}
              <Link
                href="/subscribe"
                className="underline decoration-slate-600 underline-offset-2 transition-colors hover:text-brand-tint hover:decoration-brand-tint"
              >
                Why subscribe?
              </Link>
            </p>
          </div>
          <NewsletterSignup variant="footer" className="lg:justify-end" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-700 pt-6">
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
      </div>
    </footer>
  );
}
