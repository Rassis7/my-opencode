---
description: Adjust documentation and AI context with Mermaid
agent: command-router
---

Update documentation and AI context for: $ARGUMENTS

Mandatory rules:
- Call `documentation-engineer` for structure and copy.
- Call `software-architect` or `architect-reviewer` for architecture consistency.
- If there are LLM/RAG/agent components, also call `llm-architect`.

Deliver:
- Updated documentation with AI context sections (goal, limits, flows, decisions).
- At least one useful Mermaid diagram (architecture, sequence, flow, or decision).
- A maintenance checklist to keep docs in sync with code.
