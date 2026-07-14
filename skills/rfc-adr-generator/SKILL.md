---
name: rfc-adr-generator
description: Generate RFCs (Request for Comments) and ADRs (Architecture Decision Records) from any input — files, documents, URLs, or free text. Uses the HashiCorp RFC template and the MADR (Markdown Architectural Decision Records) template. Use when the user asks to create, write, or draft an RFC or ADR.
license: MIT
compatibility: opencode
metadata:
  audience: engineers
  workflow: documentation
---

## What I do

Generate well-structured RFCs and ADRs based on input provided by the user (files, documents, URLs, text, or conversation context). I follow two battle-tested templates:

- **RFC**: HashiCorp's RFC template — for proposing changes that affect multiple stakeholders
- **ADR**: MADR (Markdown Architectural Decision Records) — for capturing individual architectural decisions

## When to use me

Use this skill when the user asks for any of the following:

- "cria uma RFC sobre..."
- "escreve uma ADR para..."
- "documenta essa decisao arquitetural"
- "generate an RFC for..."
- "create an ADR to..."

If the user does not specify which type, ask: **"Isso deve ser uma RFC (proposta ampla para stakeholders) ou uma ADR (decisao arquitetural pontual)?"**

## Workflow

### Step 1: Assess input

Read and understand whatever the user provides — files, documents, URLs, text snippets, or prior conversation context. Extract the key decisions, tradeoffs, constraints, and rationale.

### Step 2: Determine document type

Based on the user's intent or the nature of the content:

- **RFC**: When the decision impacts multiple stakeholders, involves a project-wide change, or follows a proposal → review → approval flow
- **ADR**: When documenting a single architectural decision with context, options, and rationale

### Step 3: Ask placement

Before writing the file:

> Onde devo salvar? Sugiro `docs/rfcs/<number>-<slug>.md` para RFCs ou `docs/decisions/<number>-<slug>.md` para ADRs.

Wait for confirmation.

### Step 4: Load the template

Read the appropriate template from the `assets/` folder:

- **RFC**: `assets/rfc-template.md`
- **ADR**: `assets/adr-template.md`

Copy the template verbatim and replace every `<placeholder>` with concrete content extracted from the input.

### Step 5: Confirm

After writing, report the file path and offer to adjust any section.

---

## File Naming Convention

| Document | Pattern | Example |
|---|---|---|
| RFC | `docs/rfcs/<NNNN>-<slug>.md` | `docs/rfcs/0001-costs-aws.md` |
| ADR | `docs/decisions/<NNNN>-<slug>.md` | `docs/decisions/0001-use-rds-for-postgres.md` |

- `<NNNN>` is a zero-padded sequential number. Check the existing files in the target directory to get the next number.
- `<slug>` is lowercase, hyphens for spaces, max 50 chars.

## Style Rules

- Write in the same language as the user's request
- Keep sections concise and factual
- Do not embellish or add commentary — the template speaks for itself
- Preserve Markdown formatting exactly as shown
- Do not invent content not grounded in the input — flag gaps to the user

## Resources

- `assets/rfc-template.md`: HashiCorp RFC template to copy and fill
- `assets/adr-template.md`: MADR template to copy and fill
