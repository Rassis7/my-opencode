---
description: Write software with a full TDD workflow
agent: command-router
---

Run TDD for: $ARGUMENTS

Mandatory rules:

- Call `test-automator` to propose/write tests first.
- For back-end work, call `backend-developer`, `python-pro`, `typescript-pro`, or `ai-engineer` for implementation (pick by stack).
- For front-end work, call `frontend-developer` or `typescript-pro` for implementation (pick by stack).
- Call `code-reviewer` at the end for quality validation.
- Call `ai-context-documentation-engineer` at the end to document and refresh project context for what was done

Strict flow:

1. Plan the smallest change.
2. Write/adjust tests.
3. Run tests and prove they fail.
4. Implement the minimum code to pass.
5. Run tests and prove they pass.
6. Run relevant checks and report the outcome.

Output:

- What was tested, evidence of fail → green, files changed, and residual risks.
