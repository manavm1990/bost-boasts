import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { FIRST_POST_QUERY } from "@/sanity/lib/queries";
import urlFor from "@/sanity/lib/url-for";
import { components } from "@/sanity/portable-text-components";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: post } = await sanityFetch({
    query: FIRST_POST_QUERY,
    params: await params,
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 py-12">
      {post?.mainImage ? (
        <Image
          className="w-full aspect-300/150 object-cover rounded-lg"
          src={urlFor(post.mainImage)
            .width(300)
            .height(150)
            .quality(80)
            .auto("format")
            .url()}
          alt={post?.mainImage?.alt || ""}
          width={300}
          height={150}
        />
      ) : null}
      <h1 className="text-4xl font-bold text-balance">{post?.title}</h1>
      {post?.body ? (
        <div className="prose">
          <PortableText value={post.body} components={components} />
        </div>
      ) : null}
      <hr />
      <Link href="/posts">&larr; Return to index</Link>
    </main>
  );
}
