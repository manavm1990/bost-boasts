import { ImageIcon } from "@sanity/icons/Image";
import { defineArrayMember, defineType } from "sanity";
import { factBoxType } from "./fact-box";
import { kickerType } from "./kicker";
import { pullQuoteType } from "./pull-quote";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",

      /**
       * Styles define the different block types that can be used in the editor.
       * Each style corresponds to a specific HTML tag or custom rendering.
       * The "Normal" style is the default and
       * renders as a standard paragraph (<p>),
       * while "H1" through "H4" render as heading tags (<h1> to <h4>).
       * The "Quote" style renders as a blockquote (<blockquote>).
       */
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],

        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),

    /**
     * Additional types.
     *
     * * Can't use primitive types like 'string' or 'number' in
     * the same array as a block type,
     * so we define an image type here to allow for
     *  image blocks within the content.
     */
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineArrayMember({ type: factBoxType.name }),
    defineArrayMember({ type: kickerType.name }),
    defineArrayMember({ type: pullQuoteType.name }),
  ],
});
