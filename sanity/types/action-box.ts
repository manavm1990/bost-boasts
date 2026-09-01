import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle";
import { defineArrayMember, defineField, defineType } from "sanity";

export const actionBoxType = defineType({
  name: "actionBox",
  title: "Action box",
  type: "object",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Take Action",
    }),
    defineField({
      name: "items",
      title: "Items",
      description:
        'Each row renders as a bullet point. The label (optional) is bolded, e.g. "Submit a comment to the ICC." before the rest of the text.',
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "actionBoxItem",
          fields: [
            defineField({
              name: "label",
              title: "Bold label",
              type: "string",
              description:
                'Optional bold lead-in, e.g. "Ask Rep. Bost where he stands."',
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 2,
              validation: (rule) =>
                rule.required().error("Item text is required"),
            }),
          ],
          preview: {
            select: { label: "label", text: "text" },
            prepare({ label, text }) {
              return {
                title: label ? `${label}: ${text}` : text,
              };
            },
          },
        }),
      ],
      validation: (rule) =>
        rule.min(1).error("Add at least one item to the action box"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: title || "Take Action",
        subtitle: items?.length ? `${items.length} item(s)` : undefined,
      };
    },
  },
});
