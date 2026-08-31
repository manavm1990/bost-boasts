import Image from "next/image";
import Link from "next/link";
import urlFor from "@/sanity/lib/url-for";
import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";
import Author from "./author";
import Categories from "./categories";
import Published from "./published";

export function PostCard({
  slug,
  title,
  author,
  mainImage,
  publishedAt,
  categories,
}: PAGINATED_POSTS_QUERY_RESULT[0]) {
  return (
    <Link className="group" href={`/posts/${slug?.current}`}>
      <article className="flex flex-col-reverse gap-4 md:grid md:grid-cols-12 md:gap-0">
        <aside className="md:col-span-2 md:pt-1">
          <Categories categories={categories} />
        </aside>

        <section className="md:col-span-5 md:w-full">
          <h2 className="font-serif text-2xl text-pretty font-semibold text-slate-800 group-hover:text-pink-600 transition-colors relative">
            <span className="relative z-1">{title}</span>
            <span className="bg-pink-50 z-0 absolute inset-0 rounded-lg opacity-0 transition-all group-hover:opacity-100 group-hover:scale-y-110 group-hover:scale-x-105 scale-75" />
          </h2>
          <footer className="flex items-center mt-2 md:mt-6 gap-x-6">
            <Author author={author} />
            <Published publishedAt={publishedAt} />
          </footer>
        </section>

        <figure className="md:col-start-9 md:col-span-4 rounded-lg overflow-hidden flex">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(400).height(200).url()}
              width={400}
              height={200}
              alt={mainImage.alt || title || ""}
            />
          ) : null}
        </figure>
      </article>
    </Link>
  );
}
