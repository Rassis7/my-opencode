---
description: Revisao de codigo com plano de correcao
agent: review
---

Revise o codigo para: $ARGUMENTS

Esta operacao ira:

1. Analisar a branch atual via `git branch --show-current`
2. Examinar o diff com `git diff main...HEAD` para identificar stacks
3. Executar analise em paralelo via especialistas apropriados:
   - code-reviewer (sempre)
   - frontend-developer (se arquivos frontend detectados)
   - backend-developer (se arquivos backend detectados)
   - ai-engineer (se arquivos AI/ML detectados)
4. Consolidar achados e gerar plano de correcao via skill create-plan
5. Retornar resultados no formato padrao
