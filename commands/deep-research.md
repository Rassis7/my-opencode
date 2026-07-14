---
description: Start a deep research investigation on a topic with source-verifiable claims, local ledgers, and optional delegation
---

Load the opencode-deep-research skill and execute the full 8-phase deep research workflow for the following topic: $ARGUMENTS

Follow these phases in order:
1. **Freeze scope** — clarify the research question, target audience, deliverable format, and report cutoff date
2. **Create file-backed workspace** — set up project root with workflow/, sources/, claims/, checks/, handoffs/, matrices/, deliverables/ using the templates from references/templates.md
3. **Decide delegation pattern** — use subagents only if the user explicitly asks for multi-agent work
4. **Collect sources** — build the source ledger (sources/source_registry.md) before the narrative; prioritize primary sources (Tier A)
5. **Build claims** — convert source notes into atomic claims in claims/claim_tracker.md with claim_id, source_id, claim class, confidence, date range
6. **Normalize comparisons** — build a comparison matrix if comparing entities; mark rows as comparable/partial/not_comparable
7. **Draft report** — write deliverables/report.md from verified claims only; include methods, limits, and open questions sections
8. **QA the report** — recheck numerical claims, dates, and evidence links; ensure no facts/inference blur

Non-negotiables:
- Every claim gets a claim_id and at least one source_id
- Use absolute dates, not relative timing
- Separate hard_fact, reported_fact, interpretation, comparison, forecast
- End the report with what is still uncertain

If $ARGUMENTS is empty, ask the user what topic they want to research.
