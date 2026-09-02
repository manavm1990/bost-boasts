import type { Metadata } from "next";
import Link from "next/link";
import NewsletterSignup from "@/components/newsletter-signup.client";
import { H1, Kicker, Lead, List, P } from "@/components/typography";
import { SITE_NAME } from "@/lib/site-info";

export const metadata: Metadata = {
  title: "Subscribe",
  description: `Get ${SITE_NAME} in your inbox — accountability reporting for Illinois's 12th Congressional District. Unsubscribe anytime.`,
  alternates: {
    canonical: "/subscribe",
  },
};

export default function SubscribePage() {
  return (
    <main className="container mx-auto px-6 pt-11 pb-24">
      <div className="mx-auto max-w-190">
        <Kicker section="Newsletter" />
        <H1 className="mt-3.5 font-extrabold">Get the Dispatch</H1>
        <Lead className="mt-4">
          Occasional emails when we publish — votes, local accountability, and
          reader editorials. No daily spam. Unsubscribe anytime.
        </Lead>

        <div className="mt-10 max-w-md">
          <NewsletterSignup variant="page" />
        </div>

        <div className="mt-12 space-y-4 border-t border-border pt-8">
          <P className="mt-0 text-sm text-muted">
            What you&apos;re signing up for:
          </P>
          <List className="text-sm">
            <li>New Dispatch reporting when it ships</li>
            <li>Selected reader editorials we choose to run</li>
            <li>One-click unsubscribe on every message</li>
          </List>
          <P className="text-sm text-muted">
            Want to write for us? See the{" "}
            <Link href="/editorials" className="font-bold text-brand underline">
              reader editorial guide
            </Link>
            . Or{" "}
            <Link href="/" className="font-bold text-brand underline">
              browse recent posts
            </Link>
            .
          </P>
        </div>
      </div>
    </main>
  );
}
