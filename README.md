# OpenCode Config

Repositorio de configuracao pessoal do [OpenCode](https://opencode.ai/docs). Centraliza agentes, skills, comandos e integrações usados pela CLI.

## Estrutura

| Pasta / Arquivo | O que faz                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `AGENTS.md`     | Regras de workflow e principios para os agentes seguirem neste repositorio                                   |
| `opencode.json` | Configuracao principal: tools, MCPs, agentes, comandos e permissoes                                          |
| `agents/`       | Definicoes de agentes customizados com prompts e metadados ([doc](https://opencode.ai/docs/agents))          |
| `skills/`       | Skills reutilizaveis que encapsulam workflows especificos ([doc](https://opencode.ai/docs/skills))           |
| `commands/`     | Comandos customizados de slash que orquestram agentes por dominio ([doc](https://opencode.ai/docs/commands)) |
| `tasks/`        | Arquivos temporarios de planejamento e licoes aprendidas (gerados em runtime)                                |
| `plugins/`      | Plugin local `opencode-skills` que registra as skills disponiveis ([doc](https://opencode.ai/docs/plugins))  |

## MCPs configurados

Integracoes ativas via `opencode.json` ([doc](https://opencode.ai/docs/mcp)):

- **langchain** — documentacao LangChain (remoto)
- **context7** — documentacao de libs via Context7
- **notion** — leitura e escrita no Notion
- **fetch** — requisicoes HTTP via Docker convertidas em Markdown
- **duckduckgo** — busca web via Docker
- **postgres** — acesso a banco PostgreSQL via Docker
