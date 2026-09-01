import type { Metadata } from "next";
import PostCard from "@/components/post-card";
import { Muted } from "@/components/typography";
import querySanity from "@/sanity/lib/live";
import { PAGINATED_POSTS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  description: "Independent accountability reporting for IL-12.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const { data: posts } = await querySanity({
    query: PAGINATED_POSTS_QUERY,
  });

  const validPosts = posts.filter((post) => post.slug?.current);
  const [lead, ...rest] = validPosts;

  return (
    <main className="container mx-auto px-6 pt-11 pb-24">
      {!lead ? (
        <Muted role="status">No posts published yet.</Muted>
      ) : (
        <>
          <PostCard {...lead} variant="lead" />
          <div className="flex flex-col">
            {rest.map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
