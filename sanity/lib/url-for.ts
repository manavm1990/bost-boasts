// Utility to generate optimized image URLs from Sanity image references
import type { SanityImageSource } from "@sanity/image-url";
import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "../env";

export default (source: SanityImageSource) => {
  return createImageUrlBuilder({ projectId, dataset }).image(source);
};
