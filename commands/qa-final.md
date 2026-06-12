---
description: Final quality gate before merge/release
agent: command-router
---

Run final QA for: $ARGUMENTS

Mandatory rules:

- Call `code-reviewer` for technical review.
- Call `test-automator` for test strategy and gaps.
- When there is architectural risk, call `architect-reviewer`.

Deliver:

- List of blockers and non-blockers.
- Quality status: approved, approved with caveats, or rejected.
- Objective next actions to ship safely.
