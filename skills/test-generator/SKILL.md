---
name: test-generator
description: Create or update tests for modified code with minimal mocking, focus on unit/integration coverage, and enforce a pre-test plan/approval workflow. Adapts to any test framework (pytest, jest, vitest, etc.) based on project AGENTS.md. Use when a user asks to add, update, or improve tests or coverage in a codebase.
compatibility: opencode
---

# Test Generator

## Main Task

Create or update tests according to the following request: $ARGUMENTS

## Workflow

1. Read `AGENTS.md` in the repo root for project context, test framework, conventions, and run commands. Follow any file references it provides — never assume paths like `ai-context/` or `docs/`.
2. The path to the modified file will be provided; use the git diff command to verify all modifications made to the target branch.
3. Produce a PLAN before writing tests:
   - List all test cases to add/update.
   - Separate unit vs integration coverage.
   - Wait for explicit user approval before writing any tests.
4. Write tests only for the modified code paths and behaviors.
5. Prefer integration and unit tests; mock the minimum possible.
6. Aim for 80%+ coverage for the touched areas; add tests until reached.
7. Never change the implementation code — only write test files.
8. If any new library or dependency is needed, ask the user for approval before installing.
9. Run tests using the command discovered from AGENTS.md and do not conclude the task until tests pass.
10. In each test case, add a one-line description with the test case.

## Quality Rules

- Use the project's test framework and conventions as discovered in AGENTS.md.
- Avoid definitive diagnostics or speculative assertions; test observable behavior.
- Keep tests readable and focused on user-impacting behavior.

## Output Expectations

- Provide a clear PLAN first, then wait for approval.
- After implementing tests, report test command and outcome.
- If coverage is below 80%, state what's missing and add tests.
