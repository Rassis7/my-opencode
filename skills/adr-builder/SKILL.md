---
name: adr-builder
description: Guide the user through creating an ADR (Architecture Decision Record) using a guided 4-step flow "interactive brainstorm to deeply understand the task, a summarized audit for user approval, writing a simple ADR with the Alexandrian-pattern template, and a final review. Use when the user asks to create or draft an ADR, or to brainstorm/document an architectural decision."
license: MIT
metadata:
  audience: engineers
  workflow: documentation
---

## What I do

This is a Codex skill. Treat the current conversation as the interaction state and use
relative resources from this skill directory, especially `assets/adr-template.md`.

Help you create an ADR (Architecture Decision Record) through a guided, interactive 4-step flow. I never guess or jump to writing — I build understanding with you first, so the final ADR is grounded in what you actually want.

The four steps:

1. **Brainstorm** — I ask questions to deeply understand the task before writing anything.
2. **Audit of the summary** — I summarize what I understood and ask you to confirm or correct it.
3. **Write the ADR** — I write a simple ADR using the Alexandrian-pattern template.
4. **Final review** — I present the ADR and ask for your last review before finishing.

## When to use me

Use this skill when the user asks to do any of the following:

- "quero criar uma ADR para..."
- "me ajuda a documentar uma decisão arquitetural"
- "vamos brainstormar/documentar essa decisão"
- "create an ADR for..."
- "help me document this architectural decision"

## Workflow

Follow the steps below **in order**. Never skip a step, and never write the ADR file before Step 4 is approved.

### Step 1 — Brainstorm

My goal here is to reach a deep understanding of what the user wants to build or decide. I ask questions one at a time (or in small focused batches), covering:

- The **context/problem**: what is the situation, and what problem needs solving?
- The **use case / scope**: where does this decision apply, and what is in/out of scope?
- The **concern / forces**: what constraints, tradeoffs, or pressures matter (technical, political, social, project)?
- The **options**: what candidate solutions are being considered?
- The **quality goal**: what outcome/quality are we trying to achieve?
- The **accepted downside**: what tradeoff is the user willing to accept?

**Gauge sufficiency**: I must assess whether the user has given enough information to proceed. If any of the core fields (context/problem, options, chosen option, quality goal, accepted downside) is missing or vague, I keep asking focused follow-up questions until I have enough to move on. I say clearly which piece is missing and ask for it.

### Step 2 — Audit of the summary

Once the brainstorm yields enough information:

- I produce a concise summary of what I understood, structured around the ADR fields (context, concern/forces, options, chosen option, quality goal, accepted downside).
- I ask the user to **audit and confirm** the summary, or tell me what to correct.
- I do **not** proceed to Step 3 until the user confirms the summary is accurate.

### Step 3 — Write the ADR

After the summary is confirmed:

- I write a **simple ADR** using the Alexandrian-pattern template (see `assets/adr-template.md`).
- I keep the language the same as the user's.
- I do not embellish or add content beyond what was confirmed in Step 2; if something is genuinely missing, I flag it instead of inventing it.
- I do **not** save/write the file yet — I show the content inline for review.

### Step 4 — Final review

- I present the drafted ADR to the user and ask for a last review.
- Only after the user confirms do I write the ADR file to the agreed location (see file naming below) and report the path.

## File Naming Convention

- Default location: `docs/decisions/<NNNN>-<slug>.md`
- `<NNNN>` is a zero-padded sequential number. Check existing files in the target directory for the next number.
- `<slug>` is lowercase, with hyphens for spaces, max 50 chars.
- Confirm the target path with the user before writing.

## Style Rules

- Match the user's language.
- Keep the ADR succinct and factual.
- Only use content confirmed in the audit (Step 2).
- Ask before writing the file — never write before final approval.

## Resources

- `assets/adr-template.md`: Alexandrian-pattern ADR template to copy and fill.
