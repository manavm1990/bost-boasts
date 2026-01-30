import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./author.types";
import { blockContentType } from "./block-content.types";
import { categoryType } from "./category.type";
import { postType } from "./post.type";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType],
};
