"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NewsletterSignup from "@/components/newsletter-signup.client";

export default function FooterNewsletter() {
  const pathname = usePathname();
  if (pathname === "/subscribe") return null;

  return (
    <div className="flex flex-col gap-4 border-b border-slate-700 pb-8 lg:flex-row lg:items-end lg:justify-between">
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
  );
}
