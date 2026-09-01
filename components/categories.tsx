import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";

export default function Categories({
  categories,
}: {
  categories: NonNullable<PAGINATED_POSTS_QUERY_RESULT>[number]["categories"];
}) {
  if (!categories.length) return null;

  return (
    <ul className="flex flex-wrap gap-2 text-xs font-extrabold tracking-wide text-brand uppercase">
      {categories.map((category, i) => (
        <li key={category._id} className="flex list-none items-center gap-2">
          {i > 0 ? <span className="text-slate-300">|</span> : null}
          {category.title}
        </li>
      ))}
    </ul>
  );
}
