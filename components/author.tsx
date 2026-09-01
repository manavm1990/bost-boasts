import type { FIRST_POST_QUERY_RESULT } from "@/sanity/sanity.types";
import SanityImage from "./sanity-image";

export default function Author({
  author,
}: {
  author: NonNullable<FIRST_POST_QUERY_RESULT>["author"];
}) {
  return author?.image || author?.name ? (
    <figure className="flex items-center gap-2">
      {author?.image ? (
        <SanityImage
          image={author.image}
          width={48}
          height={48}
          alt=""
          className="size-6 rounded-full bg-brand-tint shadow-inner"
        />
      ) : null}

      {author?.name ? (
        <figcaption className="text-[13px] font-semibold text-slate-500">
          By {author.name}
        </figcaption>
      ) : null}
    </figure>
  ) : null;
}
