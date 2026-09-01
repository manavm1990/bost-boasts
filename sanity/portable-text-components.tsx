import Image from "next/image";
import type { PortableTextComponents } from "next-sanity";
import { FactBox, Kicker, PullQuote } from "@/components/typography";
import urlFor from "@/sanity/lib/url-for";

export const components: PortableTextComponents = {
  block: {
    /** Quote style → branded pull quote (no attribution field on block styles). */
    blockquote: ({ children }) => <PullQuote>{children}</PullQuote>,
  },
  types: {
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
    factBox: ({ value }) => {
      if (!value?.body) return null;

      return (
        <FactBox title={value.title || undefined} className="not-prose">
          <p className="whitespace-pre-line">{value.body}</p>
        </FactBox>
      );
    },
    kicker: ({ value }) => {
      if (!value?.section) return null;

      return (
        <Kicker
          section={value.section}
          category={value.category || undefined}
          className="not-prose"
        />
      );
    },
    pullQuote: ({ value }) => {
      if (!value?.text) return null;

      return (
        <PullQuote
          attribution={value.attribution || undefined}
          className="not-prose"
        >
          {value.text}
        </PullQuote>
      );
    },
  },
};
