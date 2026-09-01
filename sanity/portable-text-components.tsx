import type { PortableTextComponents } from "next-sanity";
import SanityImage from "@/components/sanity-image";
import {
  ActionBox,
  FactBox,
  PullQuote,
  SectionHeading,
} from "@/components/typography";

type BoxItem = { label?: string | null; text: string };

function BoxItems({ items }: { items: BoxItem[] }) {
  return (
    <ul>
      {items.map((item, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: items have no stable id
        <li key={i}>
          {item.label ? <strong>{item.label}:</strong> : null} {item.text}
        </li>
      ))}
    </ul>
  );
}

export const components: PortableTextComponents = {
  block: {
    /** Quote style → branded pull quote (no attribution field on block styles). */
    blockquote: ({ children }) => <PullQuote>{children}</PullQuote>,
    /** H2 style → bold uppercase section divider used throughout post bodies. */
    h2: ({ children }) => (
      <SectionHeading className="not-prose">{children}</SectionHeading>
    ),
  },
  types: {
    image: (props) =>
      props.value ? (
        <SanityImage
          // not-prose prevents Tailwind Typography from overriding image styles
          className="rounded-lg not-prose w-full h-auto"
          image={props.value}
          alt={props.value.alt || ""}
          width={500}
          height={664}
          quality={80}
        />
      ) : null,
    actionBox: ({ value }) => {
      if (!value?.items?.length) return null;

      return (
        <ActionBox title={value.title || undefined} className="not-prose">
          <BoxItems items={value.items} />
        </ActionBox>
      );
    },
    factBox: ({ value }) => {
      if (!value?.items?.length) return null;

      return (
        <FactBox title={value.title || undefined} className="not-prose">
          <BoxItems items={value.items} />
        </FactBox>
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
