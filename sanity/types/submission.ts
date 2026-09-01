import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

export const submissionType = defineType({
  name: "submission",
  title: "Editorial Submission",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Author name",
      description: "Full name as the submitter wants it published.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Contact email",
      description: "Not published. For following up on sourcing or edits.",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "image",
      title: "Author photo",
      description:
        "Optional headshot from the submitter. Copy onto the author document if the piece runs.",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "title",
      title: "Suggested title",
      type: "string",
    }),
    defineField({
      name: "thesis",
      title: "One-sentence point",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Draft text",
      type: "text",
      rows: 20,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sources",
      title: "Sources",
      description: "One link or citation per entry.",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      name: "name",
      submittedAt: "submittedAt",
      media: "image",
    },
    prepare({ title, name, submittedAt, media }) {
      return {
        title: title || "(untitled)",
        subtitle: [name, submittedAt?.slice(0, 10)].filter(Boolean).join(" — "),
        media,
      };
    },
  },
});
