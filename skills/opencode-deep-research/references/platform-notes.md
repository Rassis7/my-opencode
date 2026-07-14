# OpenCode Platform Notes

## Skill location

- Prefer a workspace-local compatible path such as `.claude/skills/opencode-deep-research/` when using OpenCode's Agent Skills compatibility.
- Keep the project memory under the active workspace, not under the skill directory.

## Recommended usage

- Treat this as an Agent Skills compatible workflow pack.
- Use the same local ledgers even when the session is short; OpenCode benefits from file-backed state just as much as any other agent shell.
- Keep handoffs short and artifact-driven so the next run can resume quickly.

## Delegation guidance

- If the OpenCode setup offers agent delegation, split by independent artifact or research slice.
- If delegation is absent or awkward, keep the PM role local and use the same ledgers without spawning workers.

## Practical adjustment from the base skill

- Wording is more neutral about skill location because OpenCode often uses compatibility with Claude-style skill directories.
- The workflow itself stays the same.
