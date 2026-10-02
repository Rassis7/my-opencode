---
name: product-engineering
description: Orchestrate software engineering in OpenCode by classifying work, selecting a proportional workflow, applying Ponytail simplicity gates, and requiring evidence-based verification.
---

# Product Engineering Orchestrator

This skill coordinates existing OpenCode and upstream skills. It is **orchestration, not duplication**: load the named skills when their stage applies; do not copy their procedures here.

## 1. Classify first

For repository/code work, choose one category before planning:

- **TRIVIAL** — one obvious, low-risk localized change.
- **SMALL** — bounded change with known behavior and no meaningful architectural decision.
- **MEDIUM** — multiple components/files, API or behavior implications, or nontrivial edge cases.
- **LARGE** — broad architecture/schema change, high risk, multiple subsystems, or unresolved product requirements.

Use judgment across file count, architecture, schema/API impact, risk, existing behavior, dependencies, product decisions, and research. Ask only when a genuine product/design ambiguity blocks a correct choice; state assumptions for non-blocking uncertainty.

## 2. Fast Path — TRIVIAL/SMALL

1. Read the applicable `AGENTS.md`, relevant implementation/tests, and existing patterns.
2. Inspect what already solves the problem; apply Ponytail's existing simplicity principles.
3. For every code or user-visible behavior change—including one-line text changes—follow strict RED → GREEN → REFACTOR: load Superpowers `test-driven-development`, write/update a meaningful assertion first, and run it to observe RED before implementation. For a button label, assert the requested accessible/rendered text; do not waive RED because the task is trivial. Keep the check focused and use the project's test tooling.
4. Verify the focused check and resulting diff. TDD does not require formal brainstorming, design docs, plan files, or subagents on the Fast Path.

Do not skip codebase investigation in the name of simplicity.

## 3. Full Engineering Path — MEDIUM/LARGE

1. **Understand:** inspect the real flow, existing abstractions/dependencies, project instructions, and tests before designing.
2. **Brainstorm:** load Superpowers `brainstorming`; establish the problem, expected behavior, requirements, constraints, edge cases, and acceptance criteria. Ask before proceeding only for unresolved product/design decisions.
3. **Simplicity gate:** load Ponytail `ponytail` when available. Check necessity, existing solution, extension/reuse, standard library, platform/framework capability, existing dependencies, requirement simplification, and smallest correct implementation.
4. **Design:** use the existing project architecture and capabilities. Do not introduce speculative abstractions or dependencies.
5. **Plan:** when a formal plan is warranted, load Superpowers `writing-plans`, then review the plan through Ponytail's simplicity principles. Save the plan and progress record under `~/.config/opencode/records/tasks/`; present it and wait for the user's check-in/approval before implementation, as required by `AGENTS.md`.
6. **Implement with strict TDD:** load Superpowers `test-driven-development`; establish a failing meaningful test/check first (RED), implement the minimum to pass (GREEN), then refactor while tests remain green. Do not write behavior code before the failing test. For configuration/skill changes, define observable discovery/validation checks first and observe the expected failure before the configuration change; do not add unrelated test scaffolding.
7. **Delegate selectively:** load Superpowers `subagent-driven-development` or `dispatching-parallel-agents` only when tasks are independent or isolation provides value. Otherwise implement inline.
8. **Review complexity:** before code review, apply Ponytail's `ponytail-review` to the plan/diff where available. Delete or simplify unnecessary work without weakening correctness, security, accessibility, observability needed, validation, error handling, data integrity, or maintainability.
9. **Code review:** load Superpowers `requesting-code-review`; use `task` with the read-only `explore` agent and require concrete findings against requirements, correctness, security, regressions, edge cases, and tests. Do not use the write-enabled `architect-reviewer` as a code reviewer.
10. **Verify:** load Superpowers `verification-before-completion`; run relevant tests, lint, typecheck, build, and integration checks available in the project. Report exact commands and pass/fail; state what could not be run.

## 4. Bug path

For a reported bug, load Superpowers `systematic-debugging` before changing code: reproduce, inspect evidence, identify root cause, write a regression test, then make the minimal fix and verify it. Use `debug` for diagnosis only; its prompt disallows edits.

## 5. Records, Git, and done

- For formal work, keep the plan, checkable tasks, execution evidence, and review in `~/.config/opencode/records/tasks/`.
- After every task, append the required brief memory entry to `records/memory/YYYY-MM-DD.md`, including Fast Path work.
- Use worktrees only when they provide useful isolation. Never commit, push, merge, discard, or create a worktree automatically; follow explicit user authorization and existing Git safety rules.
- Done means requirements met, meaningful tests/checks passed, regressions assessed, complexity reviewed, and no known errors hidden. Never claim an unrun verification passed.

## 6. Scope boundary

Non-coding requests do not enter this workflow. Explicit requests for SDD, ADR/RFC, deep research, or other specialized workflows continue to use their existing skills; this skill only routes ordinary software implementation work.
