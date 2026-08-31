import Link from "next/link";
import { H1 } from "@/components/typography";

export default async function HomePage() {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <H1>Home</H1>

      <Link href="/posts" className="mt-4">
        Posts index &rarr;
      </Link>
    </section>
  );
}
