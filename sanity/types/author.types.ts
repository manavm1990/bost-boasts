import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  groups: [
    { name: "content", title: "Content" },
    { name: "metadata", title: "Metadata" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().error("Author name is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Generated automatically from the author name for URL-friendly reference",
      group: "metadata",
      options: {
        source: "name",
      },
      validation: (rule) =>
        rule.required().error("Required to generate author page URL"),
      hidden: ({ document }) => !document?.name,
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Biography",
      description: "Author bio and background information",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled author",
        media,
      };
    },
  },
});
