---
description: Gate final de qualidade antes de merge/release
agent: command-router
---

Execute QA final para: $ARGUMENTS

Regras obrigatorias:

- Chame `code-reviewer` para revisao tecnica.
- Chame `test-automator` para estrategia de testes e lacunas.
- Quando houver risco arquitetural, chame `architect-reviewer`.

Entregue:

- Lista de bloqueadores e nao-bloqueadores.
- Status de qualidade: aprovado, aprovado com ressalvas, ou reprovado.
- Proximas acoes objetivas para liberar com seguranca.
