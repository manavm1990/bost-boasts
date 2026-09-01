import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";

type PublishedProps = {
  publishedAt: NonNullable<PAGINATED_POSTS_QUERY_RESULT>[number]["publishedAt"];
  issueLabel?: NonNullable<PAGINATED_POSTS_QUERY_RESULT>[number]["issueLabel"];
  className?: string;
};

export default function Published({
  publishedAt,
  issueLabel,
  className,
}: PublishedProps) {
  if (!publishedAt) return null;

  return (
    <p className={cn("text-base text-slate-700", className)}>
      <time dateTime={publishedAt}>
        {dayjs(publishedAt).format("MMMM D, YYYY").toUpperCase()}
      </time>
      {issueLabel ? (
        <>
          <span className="mx-1.5">&middot;</span>
          <span className="uppercase">{issueLabel}</span>
        </>
      ) : null}
    </p>
  );
}
