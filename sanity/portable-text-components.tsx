import Image from "next/image";
import type { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export const components: PortableTextComponents = {
  types: {
    image: (props) =>
      props.value ? (
        <Image
          className="rounded-lg not-prose w-full h-auto"
          src={urlFor(props.value)
            .width(500)
            .height(664)
            .quality(80)
            .auto("format")
            .url()}
          alt={props?.value?.alt || ""}
          width={500}
          height={664}
        />
      ) : null,
  },
};
