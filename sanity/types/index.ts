import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./author";
import { blockContentType } from "./block-content";
import { categoryType } from "./category";
import { factBoxType } from "./fact-box";
import { kickerType } from "./kicker";
import { postType } from "./post";
import { pullQuoteType } from "./pull-quote";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    blockContentType,
    categoryType,
    factBoxType,
    kickerType,
    postType,
    pullQuoteType,
  ],
};
