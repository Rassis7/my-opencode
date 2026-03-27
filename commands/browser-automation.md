---
description: Executar automacao de browser com evidencias via Playwright MCP
agent: command-router
---

Execute automacao de browser para: $ARGUMENTS

Regras obrigatorias:

- Chame `browser-automator` para executar o fluxo no browser.
- Defina ou infira com seguranca: objetivo, URL ou base URL, modo (`anonymous`, `authenticated` ou `auto`), dominios permitidos e criterio de sucesso.
- Em modo autenticado, use credenciais apenas se elas ja estiverem disponiveis no contexto e nunca exponha segredos na saida.
- Colete evidencias durante a execucao: snapshot inicial, evidencias de sucesso/falha e console/network quando ajudar no diagnostico.
- Interrompa o fluxo se surgir CAPTCHA, MFA, SSO inesperado, redirecionamento fora do escopo ou uma acao irreversivel nao autorizada.

Entregue:

- Status final: aprovado, reprovado ou inconclusivo.
- Modo usado, URLs relevantes e passos principais executados.
- Evidencias coletadas e o que elas comprovam.
- Bloqueadores, riscos e proxima acao objetiva.
