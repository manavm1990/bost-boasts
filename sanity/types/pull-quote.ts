import { BlockquoteIcon } from "@sanity/icons/Blockquote";
import { defineField, defineType } from "sanity";

export const pullQuoteType = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: "text",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().error("Quote text is required"),
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      type: "string",
      description: "Optional speaker or source",
    }),
  ],
  preview: {
    select: {
      text: "text",
      attribution: "attribution",
    },
    prepare({ text, attribution }) {
      return {
        title: text || "Pull quote",
        subtitle: attribution ? `— ${attribution}` : undefined,
      };
    },
  },
});
