---
description: Open and create pull requests from the real diff of the current branch
---

Create a pull request from the current branch following these rules exactly.

## Goal

- Identify the correct base branch for the current branch.
- Analyze all real changes against that base.
- Find the repository PR template when one exists.
- Generate a descriptive title in English.
- Generate a PR body faithful to the real diff.
- Add appropriate labels when it makes sense.
- Create the pull request with `gh pr create`.
- Return the link to the created pull request.

## Mandatory rules

- Read `AGENTS.md` at the project root before anything else, if it exists.
- Discover the current branch with `git branch --show-current`.
- Infer the base branch in this order:
  1. upstream of the current branch
  2. default remote branch via `origin/HEAD`
  3. fallback to `origin/main`
  4. fallback to `origin/master`
- Confirm the divergence point with `git merge-base <base> HEAD`.
- Collect full branch context:
  - `git log --oneline <base>..HEAD`
  - `git diff --name-status <base>...HEAD`
  - `git diff <base>...HEAD`
- Do not invent changes, motivations, tests, or impact. Use only what is supported by the diff, logs, and repository files.
- Look for a PR template before building the body. Check, when they exist:
  - `.github/pull_request_template.md`
  - `.github/PULL_REQUEST_TEMPLATE.md`
  - `.github/pull_request_template/*.md`
  - `.gitlab/merge_request_templates/default.md`
- If the base branch cannot be inferred safely, stop and ask the user for the correct base before creating the PR.
- If there are no changes against the base, do not create a PR. Explain why to the user.
- If `gh` is not authenticated or creation fails, explain the error clearly and stop.

## PR title

- Write the title in English.
- The title must describe the branch’s main change.
- Be concise and specific.
- Do not use generic titles like `update code` or `fix stuff`.

## Labels

- Add appropriate labels only if you can infer them safely from the changes and the repository accepts labels in the `gh` flow.
- Do not invent label names without enough evidence.
- If labels cannot be applied safely, create the PR without labels and say so at the end.

## PR body

Build the body using the repository template when one exists.
If there is no template, use exactly this structure:

```
## 🆕 Describe what changed and why

- List the branch’s main real changes.
- Explain motivations based on the diff and commit context.

## 🧪 How to test

- List only validation steps supported by the changes found.
- If there is not enough evidence for test steps, write `Not specified in the branch changes.`

## 📸 Images/Videos

- Write `Not applicable.` when there is no evidence of visual changes.
```

## Execution

- Check current branch state and whether it has a remote.
- If needed, publish the branch with upstream before opening the PR.
- Create the PR with `gh pr create`, setting:
  - correct base
  - title in English
  - final body
- If there are reliable labels and support in the chosen flow, apply them.
- At the end, respond with:
  - final title
  - base branch used
  - short summary of what went into the PR
  - link to the created pull request

## Constraints

- Do not assume without evidence.
- Do not hide uncertainty: state clearly when something cannot be determined confidently.
- Do not open an issue, merge, or force push.
- Do not change branch content beyond what is strictly needed to publish the branch and create the PR.
