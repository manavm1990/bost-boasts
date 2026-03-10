# Sanity Project

This is a Sanity-powered project. Use the Knowledge Router below to find Sanity guidance for your task.

## Knowledge Router

For Next.js + Sanity guidance, use the table below:

| Topic         | Trigger Keywords                                                                           | Rule File                        |
| :------------ | :----------------------------------------------------------------------------------------- | :------------------------------- |
| **Schema**    | `schema`, `model`, `document`, `field`, `defineType`                                       | `rules/sanity-schema.mdc`        |
| **Next.js**   | `next.js`, `app router`, `server component`, `fetch`                                       | `rules/sanity-nextjs.mdc`        |
| **GROQ**      | `groq`, `query`, `defineQuery`, `projection`, `filter`, `order`                            | `rules/sanity-groq.mdc`          |
| **Rich Text** | `portable text`, `rich text`, `block content`, `serializer`, `PTE`, `marks`, `annotations` | `rules/sanity-portable-text.mdc` |
| **Images**    | `image`, `urlFor`, `crop`, `hotspot`, `lqip`                                               | `rules/sanity-image.mdc`         |
| **TypeGen**   | `typegen`, `typescript`, `types`, `infer`, `satisfies`, `type generation`                  | `rules/sanity-typegen.mdc`       |

### Using the Knowledge Router

**Before modifying any code:**

1. Identify which topics from the table above apply to your task
2. Read the corresponding rule file(s) using the file path
3. Follow the patterns and constraints defined in those rules

Example: If asked to "create a blog post schema", read `rules/sanity-schema.mdc` first.

## Agent Behavior

- Specialize in **Structured Content**, **GROQ**, and **Sanity Studio** configuration for Next.js.
- Write best-practice, type-safe code using **Sanity TypeGen**.
- Follow Next.js App Router patterns with server components and server-side data fetching.
- Assume Next.js unless stated otherwise.

## MCP Server (Preferred for Content Operations)

**ALWAYS** use MCP tools instead of writing scripts:

| Tool                            | Use For                       |
| ------------------------------- | ----------------------------- |
| `query_documents`               | Run GROQ queries              |
| `create_document_from_markdown` | Create content from markdown  |
| `patch_document`                | Modify existing documents     |
| `deploy_schema`                 | Deploy schema to Content Lake |
| `get_schema`                    | Inspect deployed schema       |
| `transform_image`               | Edit images with AI           |

**Critical:** After schema changes, deploy with `deploy_schema` before using content tools.

## Boundaries

- **Always:**
  - Use `defineQuery` for all GROQ queries.
  - Use MCP tools for content operations (query, create, update, patch).
  - Run `deploy_schema` after schema changes — required before using content tools. If a local Studio exists, update schema files first to keep them in sync with the deployed schema.
  - Follow the "Deprecation Pattern" when removing fields (ReadOnly -> Hidden -> Deprecated).
  - Run `npm run typegen` after schema or query changes.
- **Ask First:**
  - Before modifying `sanity.config.ts`.
  - Before deleting any schema definition file.
- **Never:**
  - Hardcode API tokens (use `process.env`).
  - Use loose types (`any`) for Sanity content.
  - Generate NDJSON import scripts for simple content tasks (use MCP).
