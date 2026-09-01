import type { SchemaTypeDefinition } from "sanity";
import { actionBoxType } from "./action-box";
import { authorType } from "./author";
import { blockContentType } from "./block-content";
import { categoryType } from "./category";
import { factBoxType } from "./fact-box";
import { postType } from "./post";
import { pullQuoteType } from "./pull-quote";
import { submissionType } from "./submission";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    actionBoxType,
    authorType,
    blockContentType,
    categoryType,
    factBoxType,
    postType,
    pullQuoteType,
    submissionType,
  ],
};
