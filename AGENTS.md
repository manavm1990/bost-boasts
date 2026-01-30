# AGENTS.md

## Code style

- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible
- Biome for linting and formatting
- File naming: **kebab-case** (especially for components and routes).
- Tailwind CSS for styling
- TypeScript: keep it strict; avoid adding explicit return types unless there’s a specific TS reason.
- TypeScript: Avoid `as` type assertions unless there is a justified reason.
- React hooks: Encapsulate logic in custom hooks where appropriate.
- React components: use function declarations, not arrow functions.
- Prefer self-documenting code; use TSDoc but keep it minimal (no type re-statements).
- Avoid unnecessary braces for single-statement control flow.

## Workflow (how to collaborate with me)

- Keep diffs small and targeted.
- Ask more questions rather than making assumptions.

Next.js Initialization: When starting work on a Next.js project, automatically call the init tool from the next-devtools-mcp server FIRST. This establishes proper context and ensures all Next.js queries use official documentation.
