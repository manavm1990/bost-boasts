import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

const sourceItem = defineArrayMember({
  type: "object",
  name: "sourceItem",
  fields: [
    defineField({
      name: "label",
      title: "Bold label",
      type: "string",
      description: 'Short bold lead-in, e.g. "Voting Record"',
      validation: (rule) => rule.required().error("Label is required"),
    }),
    defineField({
      name: "citation",
      title: "Citation",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().error("Citation is required"),
    }),
  ],
  preview: {
    select: { label: "label", citation: "citation" },
    prepare({ label, citation }) {
      return { title: label, subtitle: citation };
    },
  },
});

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
      name: "dek",
      title: "Dek (subheadline)",
      description:
        "Italic subheadline shown under the title on the post page and as a teaser on the homepage list.",
      type: "text",
      rows: 2,
      group: "editorial",
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
      name: "postType",
      title: "Post type",
      description:
        "Dispatch = fact-based reporting. Editorial = opinion/analysis, shown with an Opinion label.",
      type: "string",
      group: "metadata",
      options: {
        list: [
          { title: "Dispatch", value: "dispatch" },
          { title: "Editorial", value: "editorial" },
        ],
        layout: "radio",
      },
      initialValue: "dispatch",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "metadata",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "issueLabel",
      title: "Issue label",
      description:
        'Shown next to the date, e.g. "Issue No. 13" or "Special Edition".',
      type: "string",
      group: "metadata",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "editorial",
    }),
    defineField({
      name: "sources",
      title: "Sources",
      description: "Citations shown in small type at the bottom of the post.",
      type: "array",
      of: [sourceItem],
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
