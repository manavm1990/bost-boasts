import Link from "next/link";
import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";
import Categories from "./categories";
import Published from "./published";
import { OpinionBadge } from "./typography";

type PostCardProps = PAGINATED_POSTS_QUERY_RESULT[0] & {
  variant?: "lead" | "list";
};

export default function PostCard({
  slug,
  title,
  dek,
  publishedAt,
  issueLabel,
  categories,
  postType,
  variant = "list",
}: PostCardProps) {
  if (variant === "lead") {
    return (
      <Link
        href={`/posts/${slug?.current}`}
        className="mb-10 block border-b border-slate-200 pb-9"
      >
        <div className="flex items-center gap-2.5">
          <Categories categories={categories} />
          {postType === "editorial" ? <OpinionBadge /> : null}
        </div>
        <h1 className="mt-3.5 font-serif text-4xl leading-tight font-extrabold tracking-tight text-slate-900 md:text-[44px]">
          {title}
        </h1>
        {dek ? (
          <p className="mt-4 max-w-3xl font-serif text-lg text-slate-600 italic md:text-xl">
            {dek}
          </p>
        ) : null}
        <Published
          publishedAt={publishedAt}
          issueLabel={issueLabel}
          className="mt-4 text-[13px] font-bold text-slate-500"
        />
      </Link>
    );
  }

  return (
    <Link
      href={`/posts/${slug?.current}`}
      className="group block border-b border-slate-200 py-7"
    >
      <article className="grid gap-3 md:grid-cols-[200px_1fr] md:gap-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Categories categories={categories} />
            {postType === "editorial" ? <OpinionBadge /> : null}
          </div>
          <Published
            publishedAt={publishedAt}
            issueLabel={issueLabel}
            className="mt-1.5 block text-xs font-semibold text-slate-400"
          />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 transition-colors group-hover:text-brand">
            {title}
          </h2>
          {dek ? (
            <p className="mt-2 max-w-2xl text-[15px] text-slate-500">{dek}</p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
