import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGINATED_POSTS_QUERY } from "@/sanity/lib/queries";
import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";

export default async function Page() {
  const { data: posts } = await sanityFetch({
    query: PAGINATED_POSTS_QUERY,
  });

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">Post index</h1>
      <ul className="grid grid-cols-1 divide-y divide-blue-100">
        {posts.map((post: PAGINATED_POSTS_QUERY_RESULT[number]) => (
          <li key={post._id}>
            <Link
              className="block p-4 hover:text-blue-500"
              href={`/posts/${post?.slug?.current}`}
            >
              {post?.title}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/" className="mt-4">
        &larr; Return home 🏠
      </Link>
    </main>
  );
}
