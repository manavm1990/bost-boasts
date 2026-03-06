import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGINATED_POSTS_QUERY } from "@/sanity/lib/queries";
import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";

export default async function Page() {
  // Type assertion required: sanityFetch loses generic inference after
  // @sanity/client 7.16.0 / sanity 5.13.0. Remove when next-sanity fixes it.
  const { data: posts } = (await sanityFetch({
    query: PAGINATED_POSTS_QUERY,
  })) as { data: PAGINATED_POSTS_QUERY_RESULT };

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">Post index</h1>
      <ul className="grid grid-cols-1 divide-y divide-blue-100">
        {posts.map((post) => (
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
