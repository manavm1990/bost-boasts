import { BookIcon } from "@sanity/icons/Book";
import { defineField, defineType } from "sanity";

export const factBoxType = defineType({
  name: "factBox",
  title: "Fact box",
  type: "object",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "The Record",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().error("Fact box body is required"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      body: "body",
    },
    prepare({ title, body }) {
      return {
        title: title || "The Record",
        subtitle: body,
      };
    },
  },
});
