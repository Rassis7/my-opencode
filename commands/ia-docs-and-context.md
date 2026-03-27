---
description: Ajustar documentacao e contexto de IA com Mermaid
agent: command-router
---

Atualize documentacao e contexto de IA para: $ARGUMENTS

Regras obrigatorias:
- Chame `documentation-engineer` para estrutura e texto.
- Chame `software-architect` ou `architect-reviewer` para consistencia de arquitetura.
- Se houver componentes LLM/RAG/agentes, chame tambem `llm-architect`.

Entregue:
- Documentacao atualizada com secoes de contexto para IA (objetivo, limites, fluxos, decisoes).
- Pelo menos 1 diagrama Mermaid util (arquitetura, sequencia, fluxo ou decisao).
- Checklist de manutencao para manter docs sincronizadas com codigo.
