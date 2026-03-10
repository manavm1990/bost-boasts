import Link from "next/link";

export default async function HomePage() {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">Home</h1>

      <Link href="/posts" className="mt-4">
        Posts index &rarr;
      </Link>
    </section>
  );
}
