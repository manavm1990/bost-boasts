import type { PAGINATED_POSTS_QUERY_RESULT } from "@/sanity/sanity.types";

type CategoriesProps = {
  categories: NonNullable<PAGINATED_POSTS_QUERY_RESULT>[number]["categories"];
};

export default function Categories({ categories }: CategoriesProps) {
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
