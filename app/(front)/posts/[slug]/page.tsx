import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Post from "@/components/post";
import { getPostBySlug } from "@/lib/get-post";
import { getSiteUrl } from "@/lib/site-url";
import urlFor from "@/sanity/lib/url-for";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const description = excerptForMeta(post.excerpt);
  const ogImage = post.mainImage
    ? [
        {
          url: urlFor(post.mainImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: post.mainImage.alt || post.title || "Post cover image",
        },
      ]
    : undefined;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title ?? undefined,
      description,
      url: `/posts/${slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post._updatedAt ?? undefined,
      images: ogImage,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title ?? undefined,
      description,
      images: ogImage,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const shareUrl = `${getSiteUrl()}/posts/${slug}`;
  const shareText = excerptForMeta(post.excerpt);

  return (
    <main className="container mx-auto px-6 pt-12 pb-24">
      <Post {...post} shareUrl={shareUrl} shareText={shareText} />
      <nav className="mx-auto mt-10 max-w-190">
        <Link
          href="/"
          className="text-[13px] font-bold tracking-wide text-brand uppercase"
        >
          &larr; Back to all posts
        </Link>
      </nav>
    </main>
  );
}

function excerptForMeta(excerpt: string | null | undefined, maxLength = 160) {
  const text = excerpt?.replace(/\s+/g, " ").trim() ?? "";
  if (!text) return undefined;
  return text.length <= maxLength
    ? text
    : `${text.slice(0, maxLength).trimEnd()}…`;
}
