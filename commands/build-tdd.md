---
description: Escrever software com fluxo TDD completo
agent: command-router
---

Execute TDD para: $ARGUMENTS

Regras obrigatorias:

- Chame `test-automator` para propor/escrever testes primeiro.
- Se for uma tarefa sobre back-end, chame `backend-developer`, `python-pro`, `typescript-pro` ou `ai-engineer` para implementacao (escolha por stack).
- Se for uma tarefa sobre front-end, chame `frontend-developer`, `typescript-pro` para implementacao (escolha por stack e se for front-end).
- Chame `code-reviewer` no final para validacao de qualidade.
- Chame `ai-context-documentation-engineer` no final para documentar e atualizar o contexto do projeto sobre o que foi feito

Fluxo estrito:

1. Planejar mudanca minima.
2. Escrever/ajustar testes.
3. Rodar testes e provar que falham.
4. Implementar codigo minimo para passar.
5. Rodar testes e provar que passaram.
6. Rodar checks relevantes e reportar resultado.

Saida:

- O que foi testado, evidencias de falha -> verde, arquivos alterados e riscos residuais.
