---
name: test-generator
description: Create or update tests (pytest) for modified code with minimal mocking, focus on unit/integration coverage, and enforce a pre-test plan/approval workflow. Use when a user asks to add, update, or improve tests or coverage in a codebase.
compatibility: opencode
---

# Test Generator

## Workflow

1. Read `AGENTS.md` in the repo root for project context and rules.
2. Consult `ai-context/index.md` and any referenced files before proceeding.
3. The path to the modified file will be provided; use the git diff command to verify all modifications made to the target branch.
4. Produce a PLAN before writing tests:
   - List all test cases to add/update.
   - Separate unit vs integration coverage.
   - Wait for explicit user approval before writing any tests.
5. Write tests only for the modified code paths and behaviors.
6. Prefer integration and unit tests; mock the minimum possible.
7. Aim for 80%+ coverage for the touched areas; add tests until reached.
8. Never changes the implementation code, just to write in file tests
9. If any new library or dependency is needed, ask the user for approval before installing.
10. Run tests (use AGENTS.md to discovery a running command) and do not conclude the task until tests pass.
11. In each test case, add a one line description with the test case

## Quality Rules

- Use pytest conventions and project test layout (`tests/test_*.py`).
- Avoid definitive diagnostics or speculative assertions; test observable behavior.
- Keep tests readable and focused on user-impacting behavior.

## Output Expectations

- Provide a clear PLAN first, then wait for approval.
- After implementing tests, report test command and outcome.
- If coverage is below 80%, state what’s missing and add tests.
