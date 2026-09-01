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
      // Incoming reader submissions surface first — they need regular triage.
      S.documentTypeListItem("submission").title("Editorial Submissions"),
      S.divider(),

      // Primary content types appear next for quick access
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
        return id && !["submission", "post", "category", "author"].includes(id);
      }),
    ]);
