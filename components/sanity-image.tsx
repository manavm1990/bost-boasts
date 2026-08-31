import type { SanityImageSource } from "@sanity/image-url";
import type { ImageProps } from "next/image";
import Image from "next/image";

import urlFor from "@/sanity/lib/url-for";

type SanityImageProps = {
  image: SanityImageSource;
  // optional: falls back to CMS image.alt, then ""
  alt?: string;
} & Pick<
  ImageProps,
  "width" | "height" | "className" | "quality" | "sizes" | "preload" | "fill"
>;

function imageAlt(image: SanityImageSource): string | undefined {
  if (typeof image !== "object" || image === null || !("alt" in image))
    return undefined;

  // CMS image objects often carry alt outside SanityImageSource's declared shape
  const { alt } = image as { alt?: unknown };
  return typeof alt === "string" ? alt : undefined;
}

export default function SanityImage({
  image,
  alt = "",
  width = 300,
  height = 150,
  className = "",
  quality = 80,
  sizes,
  preload = false,
  fill = false,
}: SanityImageProps) {
  if (!image) return null;

  return (
    <Image
      className={`object-cover ${className}`.trim()}
      src={urlFor(image)
        .width(Number(width))
        .height(Number(height))
        .quality(Number(quality))
        .auto("format")
        .url()}
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      alt={alt || imageAlt(image) || ""}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      preload={preload}
      fill={fill}
    />
  );
}
