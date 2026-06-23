## Wiki Integration

- Wiki vault: ~/llm-wiki. Read SCHEMA.md for conventions before writing.
- After ANY correction from the user: update `~/llm-wiki/memory/YYYY-MM-DD.md` with the pattern learned. Use `date` command for current date.
- After non-trivial task completion: create or update `~/llm-wiki/concepts/*.md` and `~/llm-wiki/entities/*.md` with extracted patterns.
- Update `~/llm-wiki/index.md` when adding new wiki pages.
- Append to `~/llm-wiki/log.md` for every significant operation (ingest, create, update, lint).
- Use `[[wikilinks]]` and YAML frontmatter per wiki conventions.
- Review recent wiki/memory entries at session start for relevant project context.

## Workflow Orchestration

### 1. Plan Node Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately – don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop

- After ANY correction from the user: update `~/llm-wiki/memory/YYYY-MM-DD.md` with the pattern
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

1. **Plan First**: Write plan to `~/llm-wiki/raw/notes/tasks/[TASK_NAME][timestamp].md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to task file
6. **Capture Memory**: Update `~/llm-wiki/memory/YYYY-MM-DD.md` after any task

---

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
