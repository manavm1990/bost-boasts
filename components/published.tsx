import dayjs from "dayjs";
import type { POSTS_QUERY_RESULT } from "@/sanity/sanity.types";

type PublishedProps = {
  publishedAt: NonNullable<POSTS_QUERY_RESULT>[number]["publishedAt"];
};

export default function Published({ publishedAt }: PublishedProps) {
  return publishedAt ? (
    <time className="text-base text-slate-700" dateTime={publishedAt}>
      {dayjs(publishedAt).format("D MMMM YYYY")}
    </time>
  ) : null;
}
