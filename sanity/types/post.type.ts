import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "editorial", title: "Editorial" },
    { name: "metadata", title: "Metadata" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "editorial",
      validation: (rule) =>
        rule
          .required()
          .error("Post title is required")
          .max(60)
          .warning("Keep titles under 60 characters for better SEO"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Generated automatically from the post title for URL-friendly reference",
      group: "metadata",
      options: {
        source: "title",
      },
      validation: (rule) =>
        rule.required().error("Required to generate a page on the website"),
      hidden: ({ document }) => !document?.title,
    }),
    defineField({
      name: "author",
      title: "Author",
      description: "Select the author of this post from the list",
      type: "reference",
      to: { type: "author" },
      group: "editorial",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      group: "editorial",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) =>
            rule
              .required()
              .error("Alternative text is required for accessibility"),
        }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "metadata",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "metadata",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "editorial",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
