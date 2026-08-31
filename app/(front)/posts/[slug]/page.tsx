import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import SanityImage from "@/components/sanity-image";
import Title from "@/components/title";
import { getPostBySlug } from "@/lib/get-post";
import urlFor from "@/sanity/lib/url-for";
import { components } from "@/sanity/portable-text-components";

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

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 py-12">
      {post.mainImage ? (
        <div className="overflow-hidden rounded-lg">
          <SanityImage
            image={post.mainImage}
            alt={post.mainImage.alt || "Post cover image"}
            width={1200}
            height={630}
            className="w-full aspect-video"
            sizes="(max-width: 768px) 100vw, 75vw"
            preload
          />
        </div>
      ) : null}

      <Title>{post.title}</Title>
      {post.body ? (
        <div className="prose prose-headings:font-serif">
          <PortableText value={post.body} components={components} />
        </div>
      ) : null}
      <Link href="/posts" className="mt-4">
        &larr; Return to index
      </Link>
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
