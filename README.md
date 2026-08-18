# IL-12 Dispatch

## Agent skills

Project agent skills live in `.agents/skills/` and are pinned by `skills-lock.json`.
The `skills` CLI is a project devDependency so everyone shares the same version after `bun install`.

### Update skills

From the repo root:

```bash
bun install
bun run skills:update
```

That runs the project `skills` CLI against **Project** scope, refreshes locked skills under `.agents/skills/`, updates `skills-lock.json`, and removes `.claude/` if the CLI recreates it.

Canonical skills live only in `.agents/skills/`. The `skills` CLI’s default/Universal update path also materializes `.claude/skills/` (usually symlinks) for Claude Code. This repo does not use that tree — `.claude/` is gitignored, and `skills:update` deletes it after refresh.

If you install a skill manually, target Universal only so nothing is written under `.claude/`:

```bash
bunx skills add <source> --skill <name> -a universal -y -p
```

Use the project CLI (`bun run` / `bunx skills`), not a random global install. This repo expects `skills` **≥ 1.5.22**; older versions can fail “check for deleted skills” even when skill content still updates.

Do not add or remove skills unless the team agrees — keep the set limited to what `skills-lock.json` already tracks.
