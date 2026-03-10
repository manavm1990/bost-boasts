import Image from "next/image";
import urlFor from "@/sanity/lib/url-for";
import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";

type AuthorProps = {
  author: NonNullable<PAGINATED_POSTS_QUERY_RESULT>[number]["author"];
};

export default function Author({ author }: AuthorProps) {
  return author?.image || author?.name ? (
    <figure className="flex items-center gap-2">
      {author?.image ? (
        <Image
          src={urlFor(author.image).width(80).height(80).url()}
          width={80}
          height={80}
          alt=""
          className="bg-pink-50 size-10 shadow-inner rounded-full"
        />
      ) : null}

      {author?.name ? (
        <figcaption className="text-base text-slate-700">
          {author.name}
        </figcaption>
      ) : null}
    </figure>
  ) : null;
}
