import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";

export default function Categories({
  categories,
}: {
  categories: NonNullable<PAGINATED_POSTS_QUERY_RESULT>[number]["categories"];
}) {
  return (
    <ul className="flex gap-2">
      {categories.map((category) => (
        <li
          key={category._id}
          className="bg-cyan-50 rounded-full px-2 py-1 leading-none whitespace-nowrap text-sm font-semibold text-cyan-700 list-none"
        >
          {category.title}
        </li>
      ))}
    </ul>
  );
}
