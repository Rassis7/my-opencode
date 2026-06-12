---
description: Specialized consulting for AI systems
agent: command-router
---

Act as an AI specialist for: $ARGUMENTS

Mandatory rules:
- Call `llm-architect` for solution design and trade-offs.
- Call `ai-engineer` for technical implementation/operations plan.
- If agents or multi-agent setups are involved, spell out architecture, limits, and evaluation criteria.

Deliver:
- One final recommendation with alternatives considered.
- Clear trade-offs (cost, latency, quality, risk).
- Incremental phased plan (POC → pilot → production) with metrics.
