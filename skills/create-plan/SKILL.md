---
name: create-plan
description: Generate an execution plan using a fixed template and TDD discipline. Use when the user asks to create a plan, execution plan, or task breakdown that must follow the provided template, include taskd Test Fails/Code/Green steps, or require a checklist and execution log.

compatibility: opencode
---

# Create Plan

## Overview

Generate a plan by copying the template from `assets/plan-template.md` and filling every `<placeholder>` with task-specific details.

## Workflow

1. Read `assets/plan-template.md` and copy it verbatim as the plan output.
2. Read `AGENTS.md` in the repo root for project context and rules.
3. Replace every `<placeholder>` with concrete content based on the user request.
4. Add as many `Task <n>` blocks as needed. Keep tasks incremental and independently deliverable.
5. Keep the TDD cadence explicit in each task: Test Fails -> Code -> Green.
6. Ensure the Global Checks and Execution Log are filled with realistic items for the task.

## Output Rules

- Do not change section titles or remove sections from the template.
- Do not leave any `<placeholder>` in the final output.
- Keep language consistent with the template (pt-BR).
- If the user provides constraints (stack, tooling, tests), reflect them in tasks and checks.

## Resources

- `assets/plan-template.md`: canonical plan template to copy and fill.
