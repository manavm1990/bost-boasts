// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import type { SanityQueries } from "@sanity/client";
import { defineLive } from "next-sanity/live";
import type {} from "@/sanity/sanity.types";
import client from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
});

export function querySanity<Q extends keyof SanityQueries>(
  options: Parameters<typeof sanityFetch>[0] & { query: Q },
) {
  return sanityFetch(options) as Promise<
    Omit<Awaited<ReturnType<typeof sanityFetch>>, "data"> & {
      data: SanityQueries[Q];
    }
  >;
}
