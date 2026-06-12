---
description: Analyze git changes and create a Conventional Commits commit aligned with SEMVER, short title and bullet body
agent: command-router
---

# Do Commit

## What I do

- Analyze Git changes with `git status`.
- Pick the commit type following Conventional Commits with SEMVER impact.
- Generate and run a commit with a short title and bullet body in the project’s standard format.

## When to use

Use this command when you want a clear commit consistent with SEMVER from the current branch changes.

## Mandatory rules

1. Read `AGENTS.md` at the project root before any action.
2. Run `git status` to identify:
   - modified files
   - new files
   - staged/unstaged files
3. If needed for bullet detail, inspect diffs (`git diff` and `git diff --staged`).
4. Define the commit type from impact:
   - `fix`: fix without breaking change (PATCH)
   - `feat`: new feature without breaking change (MINOR)
   - `feat!` or `BREAKING CHANGE`: breaking change (MAJOR)
   - `chore`, `docs`, `refactor`, `test`, `ci`, `build`, `perf`, `style` when applicable
5. Build the message as:

   `[branch-name] <type>: <short phrase>`

   Body with objective bullets:
   - what was added/changed
   - tests created/adjusted
   - other relevant points

6. Example of expected output:

   `[branch-name] feat: add new role`
   - added role to create user
   - created new tests in XXX.xx
   - anything else

7. Do not include secret files (e.g. `.env`, `credentials.json`) in the commit.
8. Run `git status` after the commit to verify success.

## Quality notes

- The title phrase should be short and direct.
- The body should explain the “why” and impact, not only list files.
- Stay consistent with the repository commit history when possible.
