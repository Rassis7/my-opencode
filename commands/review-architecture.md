---
description: Architecture review with an objective recommendation
agent: command-router
---

Review architecture for: $ARGUMENTS

Mandatory rules:
- Call `software-architect` for options and the main recommendation.
- Call `architect-reviewer` for independent validation and risks.
- Do not write code unless the task explicitly asks for it.

Deliver:
- Options with trade-offs, final recommendation, and main accepted risk.
- Incremental adoption plan and operational impact.
