## Workflow Orchestration

### 1. Classify Before Planning

- For software changes, load `product-engineering` before choosing a workflow.
- Classify the task as TRIVIAL, SMALL, MEDIUM, or LARGE using scope, files, architectural/API/schema impact, risk, and uncertainty.
- TRIVIAL/SMALL, clear and localized: use the Fast Path; do not create a formal plan/spec or use subagents unless risk or dependencies justify it.
- MEDIUM/LARGE, architectural, or genuinely ambiguous work: use plan mode and the Full Engineering Path; ask before proceeding when a product or design decision is unresolved.
- Save any formal plan and execution record under `~/.config/opencode/records/tasks/`; do not use an upstream default plan directory.
- If something goes sideways, STOP and re-plan immediately – don't keep pushing
- Use plan mode for verification steps when the work warrants a formal plan, not just building
- Write detailed specs only for explicit SDD requests or when the requirements genuinely warrant one

### 2. Subagent Strategy

- Use subagents when work is independent, parallelizable, or needs real isolation; do not delegate merely because agents are available
- Keep simple, localized work in the primary session
- For code review, prefer a read-only reviewer; do not use `architect-reviewer` for code review because it has write/edit permission
- One task per subagent for focused execution

### 3. Self-Improvement Loop

- After ANY correction from the user: update `~/.config/opencode/records/memory/YYYY-MM-DD.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these memory entries until mistake rate drops
- Review recent memory entries at session start for relevant project

### 4. Verification Before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes – don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests – then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## Task Management

1. **Plan First**: For MEDIUM/LARGE work or work that otherwise warrants a formal plan, write it to `~/.config/opencode/records/tasks/[TASK_NAME][timestamp in number].md` with checkable items. TRIVIAL/SMALL Fast Path work does not need a plan file.
2. **Verify Plan**: For a formal plan, present it and wait for the user's check-in/approval before implementation; do not add a checkpoint to Fast Path work
3. **Track Progress**: Mark plan items complete as you go when a formal plan exists
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to the task record when one was created; do not create a formal record for Fast Path work
6. **Capture Memory**: Append to `~/.config/opencode/records/memory/YYYY-MM-DD.md` after any task, following `records/memory/AGENTS.md`

---

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
