import type { StructureResolver } from "sanity/structure";

/**
 * Configures the Sanity Studio sidebar navigation structure.
 *
 * Prioritizes core blog content types (Posts, Categories, Authors)
 *  at the top of the sidebar, followed by
 * any additional document types that may be added later.
 *
 * @see https://www.sanity.io/docs/structure-builder-cheat-sheet
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Blog")
    .items([
      // Primary content types appear first for quick access
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),

      /**
       * Additional document types can be added here.
       * These types will appear below the divider in the sidebar.
       */
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id && !["post", "category", "author"].includes(id);
      }),
    ]);
