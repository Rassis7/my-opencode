---
name: llm-wiki
description: Use when the user asks to ingest, create, update, or lint pages in the llm-wiki vault (~/llm-wiki). Covers memory logging, concept/entity page creation, index.md updates, log.md appends, and wiki linting. Follows the Karpathy LLM Wiki pattern with Obsidian-compatible markdown.
---

## Vault

`~/llm-wiki` — Obsidian-compatible markdown vault, independente de ferramenta.

Leia `SCHEMA.md` antes de qualquer escrita para conferir as convencoes atualizadas.

## Estrutura

| Diretorio | Proposito |
|-----------|-----------|
| `memory/` | Aprendizado diario — `YYYY-MM-DD.md`, append-only |
| `concepts/` | Tecnicas, padroes e principios reutilizaveis |
| `entities/` | Projetos, servicos, pessoas, times, ferramentas |
| `raw/` | Fontes imutaveis (artigos, notas, papers, transcricoes) |
| `summaries/` | Sinteses de fontes |
| `comparisons/` | Analises lado a lado |
| `queries/` | Perguntas respondidas pela wiki |
| `index.md` | Catalogo de todas as paginas por tipo |
| `log.md` | Registro cronologico append-only de operacoes |
| `SCHEMA.md` | Convencoes de escrita (frontmatter, tags, wikilinks) |

## Convencoes (do SCHEMA.md)

- Nomes de arquivo: lowercase, hyphens, sem espacos (`jest-mocking-monorepo.md`)
- Toda pagina comeca com YAML frontmatter
- Usar `[[wikilinks]]` para cross-references (minimo 1 link de saida por pagina)
- Ao atualizar pagina, sempre atualizar `updated` no frontmatter
- Toda pagina nova deve ser adicionada ao `index.md` na secao correta
- Toda operacao significativa deve ser appendada ao `log.md`

### Frontmatter template

```yaml
---
title: Titulo da Pagina
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

- **concept** — tecnica, padrao ou principio reutilizavel
- **entity** — projeto, pessoa, time, ferramenta ou servico especifico
- **summary** — sintese de uma fonte ou topico
- **comparison** — analise comparativa lado a lado
- **query** — pergunta respondida pela wiki (pode ser promovida a concept/entity depois)

## Operacoes

### Ingest

Quando o usuario fornece uma nova fonte (artigo, doc, transcricao):

1. Salve a fonte imutavel em `raw/<categoria>/`
2. Leia o conteudo e discuta takeaways com o usuario
3. Crie/atualize paginas em `concepts/` e `entities/` com o conhecimento extraido
4. Adicione as novas paginas ao `index.md`
5. Appenda a operacao ao `log.md`

### Memory

Apos QUALQUER correcao do usuario:

1. Use `date` para obter a data atual
2. Abra ou crie `memory/YYYY-MM-DD.md`
3. Appenda entrada no formato: `## HH:MM -- <titulo>` com o padrao aprendido
4. Nunca sobrescreva entradas passadas

Apos tarefa nao-trivial:

1. Extraia padroes reutilizaveis
2. Crie ou atualize paginas em `concepts/` e `entities/`
3. Atualize `index.md` se houver paginas novas
4. Appenda ao `log.md`

### Lint

Quando o usuario pedir `/lint` ou revisao da wiki:

1. Leia `index.md` para visao geral
2. Verifique: contradicoes entre paginas, paginas orfas (sem inbound links), conceitos mencionados sem pagina propria, cross-references quebradas, gaps que poderiam ser preenchidos
3. Reporte os achados e sugira correcoes
4. Appenda ao `log.md`

### Query

Quando o usuario perguntar algo que a wiki possa responder:

1. Leia `index.md` primeiro para encontrar paginas relevantes
2. Leia as paginas candidatas
3. Sintetize a resposta com citacoes (`[[wikilinks]]`)
4. Se a resposta for valiosa, ofereca para arquiva-la como nova pagina na wiki
