# OpenCode Config

Personal configuration repository for [OpenCode](https://opencode.ai/docs). Centralizes agents, skills, commands, and integrations used by the CLI.

## Layout

| Folder / file   | Purpose                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `AGENTS.md`     | Workflow rules and principles for agents working in this repository                                         |
| `opencode.json` | Main config: tools, MCPs, agents, plugins, and permissions                                                  |
| `agents/`       | Custom agent definitions with prompts and metadata ([doc](https://opencode.ai/docs/agents))                  |
| `skills/`       | Reusable skills that encapsulate specific workflows ([doc](https://opencode.ai/docs/skills))                 |
| `commands/`     | Custom slash commands that orchestrate agents by domain ([doc](https://opencode.ai/docs/commands))            |
| `records/tasks/`  | Task plans and execution records                                                                            |
| `records/memory/` | Append-only memory notes and their local writing rules                                                      |
| `plugins/`      | Local plugins loaded by OpenCode, including `rtk.ts` and `notifications.js` ([doc](https://opencode.ai/docs/plugins)) |

## Configured MCPs

Enabled MCP integrations via `opencode.json` ([doc](https://opencode.ai/docs/mcp)):

- **duckduckgo** — Web search via Docker
- **cloudflare-docs** — Cloudflare documentation (remote)

Configured but disabled: `sentry`, `context7`, `notion`, `postgres`, and `render`.

Third-party plugins are listed separately in the `plugin` array in `opencode.json`.
