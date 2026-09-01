import { TagIcon } from "@sanity/icons/Tag";
import { defineField, defineType } from "sanity";

export const kickerType = defineType({
  name: "kicker",
  title: "Kicker",
  type: "object",
  icon: TagIcon,
  fields: [
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      description: "Primary label (e.g. Dispatch, Analysis)",
      validation: (rule) => rule.required().error("Section label is required"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Optional secondary label shown before the section",
    }),
  ],
  preview: {
    select: {
      section: "section",
      category: "category",
    },
    prepare({ section, category }) {
      return {
        title: category ? `${category} | ${section}` : section || "Kicker",
      };
    },
  },
});
