import Image from "next/image";
import type { PortableTextComponents } from "next-sanity";
import urlFor from "@/sanity/lib/url-for";

/**
 * Custom renderers for Portable Text blocks.
 *
 * Defines how Sanity's structured rich text content is transformed into
 * React components.
 * These overrides replace default rendering behavior for specific block types.
 *
 * @see https://github.com/portabletext/react-portabletext
 */
export const components: PortableTextComponents = {
  types: {
    /**
     * Custom image renderer for images embedded in Portable Text.
     *
     * Transforms Sanity image references into
     * optimized Next.js Image components
     * with CDN-powered transformations (format conversion, resizing, quality).
     */
    image: (props) =>
      props.value ? (
        <Image
          // not-prose prevents Tailwind Typography from overriding image styles
          className="rounded-lg not-prose w-full h-auto"
          src={urlFor(props.value)
            .width(500)
            .height(664)
            .quality(80)
            .auto("format") // WebP/AVIF based on browser support
            .url()}
          alt={props?.value?.alt || ""}
          width={500}
          height={664}
        />
      ) : null,
  },
};
