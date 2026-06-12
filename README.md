# OpenCode Config

Personal configuration repository for [OpenCode](https://opencode.ai/docs). Centralizes agents, skills, commands, and integrations used by the CLI.

## Layout

| Folder / file   | Purpose                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `AGENTS.md`     | Workflow rules and principles for agents working in this repository                                         |
| `opencode.json` | Main config: tools, MCPs, agents, commands, and permissions                                                  |
| `agents/`       | Custom agent definitions with prompts and metadata ([doc](https://opencode.ai/docs/agents))                  |
| `skills/`       | Reusable skills that encapsulate specific workflows ([doc](https://opencode.ai/docs/skills))                 |
| `commands/`     | Custom slash commands that orchestrate agents by domain ([doc](https://opencode.ai/docs/commands))            |
| `tasks/`        | Temporary planning files and lessons learned (generated at runtime)                                          |
| `plugins/`      | Local `opencode-skills` plugin that registers available skills ([doc](https://opencode.ai/docs/plugins))     |

## Configured MCPs

Active integrations via `opencode.json` ([doc](https://opencode.ai/docs/mcp)):

- **langchain** — LangChain documentation (remote)
- **context7** — Library documentation via Context7
- **notion** — Read and write in Notion
- **fetch** — HTTP requests via Docker converted to Markdown
- **duckduckgo** — Web search via Docker
- **postgres** — PostgreSQL database access via Docker
