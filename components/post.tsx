import Image from "next/image";
import { PortableText } from "next-sanity";
import urlFor from "@/sanity/lib/url-for";
import { components } from "@/sanity/portable-text-components";
import type { FIRST_POST_QUERY_RESULT } from "@/sanity/sanity.types";
import Author from "./author";
import Categories from "./categories";
import Published from "./published";
import Title from "./title";

export function Post({
  title,
  author,
  mainImage,
  body,
  publishedAt,
  categories,
}: NonNullable<FIRST_POST_QUERY_RESULT>) {
  return (
    <article className="grid lg:grid-cols-12 gap-y-12">
      <header className="lg:col-span-12 flex flex-col gap-4 items-start">
        <nav className="flex gap-4 items-center">
          <Categories categories={categories} />
          <Published publishedAt={publishedAt} />
        </nav>
        <Title>{title}</Title>
        <Author author={author} />
      </header>

      {mainImage ? (
        <figure className="lg:col-span-4 flex flex-col gap-2 items-start">
          <Image
            src={urlFor(mainImage).width(400).height(400).url()}
            width={400}
            height={400}
            alt={mainImage.alt || title || ""}
          />
        </figure>
      ) : null}

      {body ? (
        <section className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg prose-headings:font-serif">
          <PortableText value={body} components={components} />
        </section>
      ) : null}
    </article>
  );
}
