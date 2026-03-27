---
description: Diagnosticar incidente com RCA e prevencao
agent: command-router
---

Investigue e resolva o incidente: $ARGUMENTS

Regras obrigatorias:
- Chame `debugger` para reproducao e isolamento tecnico.
- Chame `error-detective` para correlacao de erros e efeito cascata.
- Se houver mudancas de codigo, aplique TDD para o fix.

Entregue:
- Causa raiz (RCA), evidencias, correcao proposta/aplicada e validacao.
- Acoes preventivas (monitoramento, alertas, testes de regressao, runbook).
