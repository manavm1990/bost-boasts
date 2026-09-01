import Link from "next/link";
import { Kicker, Lead, Muted } from "@/components/typography";

export default function NotFound() {
  return (
    <main className="container mx-auto flex flex-col items-center px-6 py-16 text-center sm:py-20 md:items-start md:py-28 md:text-left">
      <Kicker section="Correction & Clarification" className="mb-3" />
      <h1 className="mb-4 font-serif text-[80px] leading-[0.9] font-extrabold tracking-tight text-ink sm:text-[100px] md:text-[120px]">
        404
      </h1>
      <Lead className="mb-4 max-w-md italic sm:text-2xl md:max-w-lg">
        This story doesn't exist — or it's been moved, retracted, or was never
        filed.
      </Lead>
      <Muted className="mb-9 max-w-sm text-[15px] md:max-w-md">
        Check the address, or head back to the front page for the latest
        accountability reporting on IL-12.
      </Muted>
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 bg-brand px-6 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-dark"
      >
        Back to the Front Page &rarr;
      </Link>
    </main>
  );
}
