import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
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
        <ul className="grid grid-cols-1 gap-6">
          {posts.map((post) => {
            if (!post.slug?.current) return null;

            return (
              <li key={post._id}>
                <PostCard {...post} />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
