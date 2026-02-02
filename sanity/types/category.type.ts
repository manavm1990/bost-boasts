import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().error("Category title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Generated automatically from the category title for URL-friendly reference",
      options: {
        source: "title",
      },
      validation: (rule) =>
        rule.required().error("Required for URL generation"),
      hidden: ({ document }) => !document?.title,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of the category",
    }),
  ],
});
