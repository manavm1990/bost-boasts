import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import SanityImage from "@/components/sanity-image";
import Title from "@/components/title";
import querySanity from "@/sanity/lib/live";
import { FIRST_POST_QUERY } from "@/sanity/lib/queries";
import urlFor from "@/sanity/lib/url-for";
import { components } from "@/sanity/portable-text-components";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { data: post } = await querySanity({
    query: FIRST_POST_QUERY,
    params: await params,
  });

  if (!post) return {};

  const description = excerptFromBody(post.body ?? undefined);
  const ogImage = post.mainImage
    ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }]
    : undefined;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title ?? undefined,
      description,
      images: ogImage,
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
  const { data: post } = await querySanity({
    query: FIRST_POST_QUERY,
    params: await params,
  });

  if (!post) notFound();

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 py-12">
      {post?.mainImage && (
        <div className="overflow-hidden rounded-lg">
          <SanityImage
            image={post.mainImage}
            alt={post.mainImage.alt || "Post cover image"}
            width={300}
            height={150}
            className="w-full aspect-300/150"
            sizes="(max-width: 768px) 100vw, 75vw"
          />
        </div>
      )}

      <Title>{post?.title}</Title>
      {post?.body ? (
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

function excerptFromBody(body: unknown[] | undefined, maxLength = 160) {
  const text =
    body
      ?.flatMap((block) =>
        block && typeof block === "object" && "children" in block
          ? ((block as { children?: { text?: string }[] }).children?.map(
              (span) => span.text,
            ) ?? [])
          : [],
      )
      .join(" ")
      .trim() ?? "";

  return text.length <= maxLength
    ? text
    : `${text.slice(0, maxLength).trimEnd()}…`;
}
