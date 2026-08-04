import type { SanityQueries } from "@sanity/client";
import { defineLive } from "next-sanity/live";
import type {} from "@/sanity/sanity.types";
import client from "./client";

/**
 * Typed sanityFetch: preserves TypeGen result type on `data`.
 *
 * Usage (either import style):
 *   import querySanity from '@/sanity/lib/live'
 *   import { querySanity } from '@/sanity/lib/live'
 *   const { data: posts } = await querySanity({ query: PAGINATED_POSTS_QUERY })
 */
function querySanity<Q extends keyof SanityQueries>(
  options: Parameters<typeof sanityFetch>[0] & { query: Q },
) {
  return sanityFetch(options) as Promise<
    Omit<Awaited<ReturnType<typeof sanityFetch>>, "data"> & {
      data: SanityQueries[Q];
    }
  >;
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
});
export default querySanity;
