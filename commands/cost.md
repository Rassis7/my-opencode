---
description: Relatório de custos por provedor, modelo e período (mensal, semanal, diário)
agent: build
subtask: true
model: opencode-go/deepseek-v4-pro
---

Resumo financeiro dos provedores configurados no OpenCode.

Dados de modelos pagos (ignorando modelos com "free" no nome):

!`sqlite3 ~/.local/share/opencode/opencode.db "SELECT 'PERIODO: ' || datetime(MIN(time_created) / 1000, 'unixepoch', 'localtime') || ' até ' || datetime(MAX(time_created) / 1000, 'unixepoch', 'localtime') || ' (' || ROUND((MAX(time_created) - MIN(time_created)) / 86400000.0, 0) || ' dias)' FROM message WHERE json_extract(data, '$.role') = 'assistant' AND json_extract(data, '$.cost') > 0 AND json_extract(data, '$.modelID') NOT LIKE '%free%';"`

!`sqlite3 ~/.local/share/opencode/opencode.db "SELECT 'Provider: ' || json_extract(data, '$.providerID') || ' | Modelo: ' || json_extract(data, '$.modelID') || ' | Custo total: \$' || ROUND(SUM(json_extract(data, '$.cost')), 4) || ' | Mensagens: ' || COUNT(*) || ' | Input tokens: ' || SUM(json_extract(data, '$.tokens.input')) || ' | Output tokens: ' || SUM(json_extract(data, '$.tokens.output')) FROM message WHERE json_extract(data, '$.role') = 'assistant' AND json_extract(data, '$.cost') > 0 AND json_extract(data, '$.modelID') NOT LIKE '%free%' GROUP BY json_extract(data, '$.providerID'), json_extract(data, '$.modelID') ORDER BY SUM(json_extract(data, '$.cost')) DESC;"`

!`sqlite3 ~/.local/share/opencode/opencode.db "SELECT 'TOTAL GERAL (sem free): \$' || ROUND(SUM(json_extract(data, '$.cost')), 4) || ' | ' || COUNT(*) || ' msgs' FROM message WHERE json_extract(data, '$.role') = 'assistant' AND json_extract(data, '$.cost') > 0 AND json_extract(data, '$.modelID') NOT LIKE '%free%';"`

!`sqlite3 ~/.local/share/opencode/opencode.db "SELECT 'MENSAL: ' || strftime('%Y-%m', datetime(time_created / 1000, 'unixepoch', 'localtime')) || ' | \$' || ROUND(SUM(json_extract(data, '$.cost')), 4) || ' | ' || COUNT(*) || ' msgs' || ' | ' || ROUND(SUM(json_extract(data, '$.tokens.input')) / 1000000.0, 2) || 'M in | ' || ROUND(SUM(json_extract(data, '$.tokens.output')) / 1000.0, 1) || 'K out' FROM message WHERE json_extract(data, '$.role') = 'assistant' AND json_extract(data, '$.cost') > 0 AND json_extract(data, '$.modelID') NOT LIKE '%free%' GROUP BY strftime('%Y-%m', datetime(time_created / 1000, 'unixepoch', 'localtime')) ORDER BY strftime('%Y-%m', datetime(time_created / 1000, 'unixepoch', 'localtime')) DESC;"`

!`sqlite3 ~/.local/share/opencode/opencode.db "SELECT 'SEMANAL: ' || strftime('%Y-W%W', datetime(time_created / 1000, 'unixepoch', 'localtime')) || ' | \$' || ROUND(SUM(json_extract(data, '$.cost')), 4) || ' | ' || COUNT(*) || ' msgs' || ' | top: ' || MAX(json_extract(data, '$.modelID')) FROM message WHERE json_extract(data, '$.role') = 'assistant' AND json_extract(data, '$.cost') > 0 AND json_extract(data, '$.modelID') NOT LIKE '%free%' GROUP BY strftime('%Y-W%W', datetime(time_created / 1000, 'unixepoch', 'localtime')) ORDER BY strftime('%Y-W%W', datetime(time_created / 1000, 'unixepoch', 'localtime')) DESC LIMIT 12;"`

!`sqlite3 ~/.local/share/opencode/opencode.db "SELECT 'DIARIO: ' || date(time_created / 1000, 'unixepoch', 'localtime') || ' | \$' || ROUND(SUM(json_extract(data, '$.cost')), 4) || ' | ' || COUNT(*) || ' msgs' || ' | top: ' || MAX(json_extract(data, '$.modelID')) FROM message WHERE json_extract(data, '$.role') = 'assistant' AND json_extract(data, '$.cost') > 0 AND json_extract(data, '$.modelID') NOT LIKE '%free%' GROUP BY date(time_created / 1000, 'unixepoch', 'localtime') ORDER BY date(time_created / 1000, 'unixepoch', 'localtime') DESC LIMIT 14;"`

!`sqlite3 ~/.local/share/opencode/opencode.db "SELECT 'OpenCode Go (fixo): \$' || ROUND(SUM(json_extract(data, '$.cost')), 4) || ' | ' || SUM(json_extract(data, '$.tokens.input')) || ' in | ' || SUM(json_extract(data, '$.tokens.output')) || ' out | ' || COUNT(*) || ' msgs' FROM message WHERE json_extract(data, '$.providerID') = 'opencode-go' AND json_extract(data, '$.role') = 'assistant';"`

!`sqlite3 ~/.local/share/opencode/opencode.db "SELECT 'OpenAI: \$' || ROUND(SUM(json_extract(data, '$.cost')), 4) || ' | ' || SUM(json_extract(data, '$.tokens.input')) || ' in | ' || SUM(json_extract(data, '$.tokens.output')) || ' out | ' || COUNT(*) || ' msgs' FROM message WHERE json_extract(data, '$.providerID') = 'openai' AND json_extract(data, '$.role') = 'assistant' AND json_extract(data, '$.cost') > 0 AND json_extract(data, '$.modelID') NOT LIKE '%free%';"`

!`sqlite3 ~/.local/share/opencode/opencode.db "SELECT 'OpenRouter: \$' || ROUND(SUM(json_extract(data, '$.cost')), 4) || ' | ' || SUM(json_extract(data, '$.tokens.input')) || ' in | ' || SUM(json_extract(data, '$.tokens.output')) || ' out | ' || COUNT(*) || ' msgs' FROM message WHERE json_extract(data, '$.providerID') = 'openrouter' AND json_extract(data, '$.role') = 'assistant' AND json_extract(data, '$.cost') > 0 AND json_extract(data, '$.modelID') NOT LIKE '%free%';"`

!`sqlite3 ~/.local/share/opencode/opencode.db "SELECT 'Ultimas 10 (pagos): ' || substr(json_extract(data, '$.providerID'), 1, 10) || ' | ' || substr(json_extract(data, '$.modelID'), 1, 30) || ' | \$' || ROUND(json_extract(data, '$.cost'), 6) || ' | ' || json_extract(data, '$.tokens.input') || ' in | ' || json_extract(data, '$.tokens.output') || ' out | ' || datetime(time_created / 1000, 'unixepoch', 'localtime') FROM message WHERE json_extract(data, '$.role') = 'assistant' AND json_extract(data, '$.cost') IS NOT NULL AND json_extract(data, '$.modelID') NOT LIKE '%free%' ORDER BY time_created DESC LIMIT 10;"`

Com base nesses dados, apresente um relatório com TODAS as seções abaixo (não pule nenhuma):

## 1. 📅 Período da análise
Mostre a data inicial e final dos dados. Se estiver vazio, avise.

## 2. 📊 Resumo por provedor
Tabela: provider | custo total | msgs | input tokens | output tokens | $/msg

## 3. 🏆 Top modelos por custo
Ranking: posição | modelo | provider | custo | msgs | input tokens | % do total
Destaque o top 3 com 🔴, 🟡, 🟢 conforme gravidade.

## 4. 💰 Custo-fantasma do Go
Valor registrado vs custo fixo de $10/mês. Projeção se o mesmo volume fosse precificado nos outros provedores.

## 5. 📆 Evolução mensal
Tabela mês a mês: mês | custo | msgs | tokens (M in / K out) | tendência (⬆/⬇)

## 6. 📊 Últimas 12 semanas
Tabela: semana | custo | msgs | modelo mais usado

## 7. 📆 Últimos 14 dias
Tabela: data | custo | msgs | modelo mais usado
Destaque o dia mais caro se houver.

## 8. 💡 Recomendações
- Top 3 ações de economia com valor estimado
- Modelos com input tokens inflados (>20K/msg em média)
- O que está funcionando bem