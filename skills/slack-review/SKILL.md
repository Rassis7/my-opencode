---
name: slack-review
description: Revisa mensagens e threads do Slack de hoje ou ontem, por categoria fixa de canais, priorizando mencoes ao usuario.
---

# Objetivo

Centralizar a revisao diaria do Slack com foco em atividade recente e itens acionaveis.

# Escopo fixo

[
COLOQUE OS CANAIS AQUI SEPARADOS POR CATEGORIA, EX:

```
## Engenharia

- eng-team (CHANNEL ID HERE)
- eng-team2 (CHANNEL ID HERE)
```

]

# Fluxo

1. Use o shell para executar `date` e confirmar a data local atual.
2. Pergunte ao usuario se a revisao deve ser de `hoje` ou `ontem`.
3. Use o MCP do Slack para buscar somente nos canais listados acima.
4. Filtre todas as buscas pelo intervalo de data escolhido.
5. Coloque primeiro as mensagens e threads em que o usuario foi marcado, mencionado ou diretamente acionado.
6. Para cada categoria, percorra os canais na ordem recebida e produza um resumo curto das mensagens e threads relevantes.
7. Destaque decisoes, pedidos de acao, bloqueios, prazos e follow-ups.
8. Consolide mensagens repetidas entre mensagens e threads quando fizer sentido.

# Saida esperada

- Comece com uma secao de mencoes ao usuario.
- Depois apresente uma secao para cada categoria, mantendo a ordem original.
- Dentro de cada categoria, liste cada canal e um resumo curto das mensagens e threads.
- Finalize com observacoes gerais apenas quando houver algo realmente relevante.

# Regras

- Nao invente canais, mensagens ou threads.
- Nao faca busca ampla fora dos canais informados.
- Se nao houver atividade relevante, diga isso explicitamente.
- Resuma mensagens e threads de forma objetiva e acionavel.
