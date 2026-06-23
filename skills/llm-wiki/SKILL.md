---
name: llm-wiki
description: Use when the user asks to ingest, create, update, or lint pages in the llm-wiki vault (~/llm-wiki). Covers memory logging, concept/entity page creation, index.md updates, log.md appends, and wiki linting. Follows the Karpathy LLM Wiki pattern with Obsidian-compatible markdown.
---

## Vault

`~/llm-wiki` — Obsidian-compatible markdown vault, tool-independent.

Read `SCHEMA.md` before any write to check current conventions.

## Structure

| Directory | Purpose |
|-----------|---------|
| `memory/` | Daily learning — `YYYY-MM-DD.md`, append-only |
| `concepts/` | Reusable techniques, patterns, and principles |
| `entities/` | Projects, services, people, teams, tools |
| `raw/` | Immutable sources (articles, notes, papers, transcripts) |
| `summaries/` | Source syntheses |
| `comparisons/` | Side-by-side analyses |
| `queries/` | Questions answered by the wiki |
| `index.md` | Catalog of all pages by type |
| `log.md` | Chronological append-only operation log |
| `SCHEMA.md` | Writing conventions (frontmatter, tags, wikilinks) |

## Conventions (from SCHEMA.md)

- File names: lowercase, hyphens, no spaces (`jest-mocking-monorepo.md`)
- Every page starts with YAML frontmatter
- Use `[[wikilinks]]` for cross-references (minimum 1 outbound link per page)
- When updating a page, always bump `updated` in frontmatter
- Every new page must be added to `index.md` under the correct section
- Every significant operation must be appended to `log.md`

### Frontmatter template

```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: concept | entity | summary | comparison | query
tags: [tag1, tag2]
sources: []
confidence: low | medium | high
---
```

### Tag taxonomy

- **Languages:** bash, zsh, python, javascript, typescript, go
- **Tools:** git, docker, nvm, node, nx, jest
- **Concepts:** shell, alias, variables, testing, mocking, architecture
- **Domains:** ai-ml, engineering, product, backend, frontend
- **Meta:** reference, tip, pitfall, pattern

### Page types

- **concept** — reusable technique, pattern, or principle
- **entity** — specific project, person, team, tool, or service
- **summary** — synthesis of a source or topic
- **comparison** — side-by-side analysis
- **query** — question answered by the wiki (can be promoted to concept/entity later)

## Operations

### Ingest

When the user provides a new source (article, doc, transcript):

1. Save the immutable source under `raw/<category>/`
2. Read the content and discuss takeaways with the user
3. Create/update pages in `concepts/` and `entities/` with extracted knowledge
4. Add new pages to `index.md`
5. Append the operation to `log.md`

### Memory

After ANY correction from the user:

1. Use `date` to get the current date
2. Open or create `memory/YYYY-MM-DD.md`
3. Append entry in format: `## HH:MM -- <title>` with the pattern learned
4. Never overwrite past entries

After non-trivial task completion:

1. Extract reusable patterns
2. Create or update pages in `concepts/` and `entities/`
3. Update `index.md` if there are new pages
4. Append to `log.md`

### Lint

When the user asks for `/lint` or a wiki review:

1. Read `index.md` for overview
2. Check for: contradictions between pages, orphan pages (no inbound links), concepts mentioned but lacking their own page, broken cross-references, gaps that could be filled
3. Report findings and suggest fixes
4. Append to `log.md`

### Query

When the user asks something the wiki might answer:

1. Read `index.md` first to find relevant pages
2. Read candidate pages
3. Synthesize the answer with citations (`[[wikilinks]]`)
4. If the answer is valuable, offer to file it as a new wiki page
