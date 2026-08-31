import type { Metadata } from "next";
import Link from "next/link";
import { H1, Muted } from "@/components/typography";
import querySanity from "@/sanity/lib/live";
import { PAGINATED_POSTS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Posts",
  description: "All dispatches and newsletters from IL-12 Dispatch.",
  alternates: {
    canonical: "/posts",
  },
};

export default async function PostsPage() {
  const { data: posts } = await querySanity({
    query: PAGINATED_POSTS_QUERY,
  });

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <H1>Post index</H1>
      {posts.length === 0 ? (
        <Muted role="status">No posts published yet.</Muted>
      ) : (
        <ul className="grid grid-cols-1 divide-y divide-blue-100">
          {posts.map((post) => {
            const slug = post.slug?.current;
            if (!slug) return null;

            return (
              <li key={post._id}>
                <Link
                  className="block p-4 hover:text-blue-500"
                  href={`/posts/${slug}`}
                >
                  {post.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <Link href="/" className="mt-4">
        &larr; Return home
      </Link>
    </main>
  );
}
