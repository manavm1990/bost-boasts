import { cache } from "react";
import querySanity from "@/sanity/lib/live";
import { FIRST_POST_QUERY } from "@/sanity/lib/queries";

export const getPostBySlug = cache((slug: string) =>
  querySanity({
    query: FIRST_POST_QUERY,
    params: { slug },
    stega: false,
  }).then(({ data }) => data),
);
