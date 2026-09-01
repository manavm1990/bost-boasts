import { PortableText } from "next-sanity";
import { components } from "@/sanity/portable-text-components";
import type { FIRST_POST_QUERY_RESULT } from "@/sanity/sanity.types";
import Author from "./author";
import Categories from "./categories";
import Published from "./published";
import SanityImage from "./sanity-image";
import { H1, Lead, OpinionBadge } from "./typography";

export default function Post({
  title,
  dek,
  author,
  mainImage,
  body,
  publishedAt,
  issueLabel,
  categories,
  postType,
  sources,
}: NonNullable<FIRST_POST_QUERY_RESULT>) {
  return (
    <article className="mx-auto max-w-190">
      <header className="mb-8 border-b-2 border-slate-900 pb-5">
        <div className="flex items-center gap-2.5">
          <Categories categories={categories} />
          {postType === "editorial" ? <OpinionBadge /> : null}
        </div>
        <H1 className="mt-3.5 text-3xl leading-[1.15] font-extrabold md:text-[38px]">
          {title}
        </H1>
        {dek ? (
          <Lead className="mt-4 font-serif text-[19px] leading-[1.55] text-slate-600 italic">
            {dek}
          </Lead>
        ) : null}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <Published
            publishedAt={publishedAt}
            issueLabel={issueLabel}
            className="text-[13px] font-bold text-slate-500"
          />
          <Author author={author} />
        </div>
      </header>

      {mainImage ? (
        <figure className="mb-8">
          <SanityImage
            image={mainImage}
            width={760}
            height={400}
            alt={mainImage.alt || title || ""}
            className="h-auto w-full rounded-lg"
          />
        </figure>
      ) : null}

      {body ? (
        <section className="prose prose-slate max-w-none prose-headings:font-sans prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-slate-700">
          <PortableText value={body} components={components} />
        </section>
      ) : null}

      {sources?.length ? (
        <footer className="mt-12 border-t border-slate-200 pt-5">
          <h2 className="mb-4 font-sans text-xs font-extrabold tracking-wide text-slate-400 uppercase">
            Sources
          </h2>
          <div className="space-y-2.5 text-[13px] leading-relaxed text-slate-500">
            {sources.map((source) => (
              <p key={source._key}>
                <strong className="text-slate-600">{source.label}:</strong>{" "}
                {source.citation}
              </p>
            ))}
          </div>
        </footer>
      ) : null}
    </article>
  );
}
