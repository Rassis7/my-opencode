# OpenCode Config

Repositorio de configuracao do OpenCode. Aqui ficam agentes, skills, comandos e a configuracao principal usada pela CLI.

## Estrutura do projeto

- `AGENTS.md`: regras e workflow locais para agentes.
- `opencode.json`: configuracao principal (tools, plugins, agentes, comandos, MCPs, permissoes).
- `agents/`: definicoes de agentes (prompts e metadados em front matter).
- `skills/`: skills reutilizaveis (templates e regras de execucao).
- `commands/`: comandos customizados (prompts de comandos).
- `package.json`: dependencias do plugin do OpenCode.
- `bun.lock`: lockfile do Bun (quando usado).
- `node_modules/`: dependencias instaladas.
- `.gitignore`: arquivos ignorados pelo Git.

## Configuracao principal (`opencode.json`)

Resumo do que esta habilitado:

- **Tools**: `write`, `bash`, `webfetch`, `skill`.
- **Plugin**: `opencode-skills`.
- **Agentes**:
  - `review`: descricao customizada.
  - `debug`: descricao customizada e `maxSteps: 20`.
  - `command-router`: subagent leve para executar fluxos definidos em comandos.
- **Comandos**:
  - Estrategia principal via arquivos em `commands/` (command-first routing por dominio).
- **MCPs** (integracoes): `langchain`, `context7`, `notion`, `fetch`, `duckduckgo`, `playwright`, `sequential-thinking`.
- **Permissoes**: `skill` permitido para `*`, `pr-review`, `internal-*` e `experimental-*` em modo `ask`.

## Agentes (`agents/`)

Cada arquivo tem front matter com `description`, `mode`, `model` e regras. Lista de agentes e descricoes:

- `agents/ask.md`: Project questions, ideas, and clarifications.
- `agents/browser-automator.md`: Browser automation specialist for Playwright MCP runs with evidence capture and safety guardrails.
- `agents/review.md`: Reviews code for quality and best practices.
- `agents/command-router.md`: Lightweight command executor that follows command workflows and delegates to subagents.
- `agents/ai-engineer.md`: Use this agent when architecting, implementing, or optimizing end-to-end AI systems-from model selection and training pipelines to production deployment and monitoring.
- `agents/architect-reviewer.md`: Use this agent when you need to evaluate system design decisions, architectural patterns, and technology choices at the macro level.
- `agents/backend-developer.md`: Use this agent when building server-side APIs, microservices, and backend systems that require robust architecture, scalability planning, and production-ready implementation.
- `agents/business-analyst.md`: Use when analyzing business processes, gathering requirements from stakeholders, or identifying process improvement opportunities to drive operational efficiency and measurable business value.
- `agents/code-reviewer.md`: Use this agent when you need to conduct comprehensive code reviews focusing on code quality, security vulnerabilities, and best practices.
- `agents/debugger.md`: Use this agent when you need to diagnose and fix bugs, identify root causes of failures, or analyze error logs and stack traces to resolve issues.
- `agents/documentation-engineer.md`: Use this agent when you need to create, architect, or overhaul comprehensive documentation systems including API docs, tutorials, guides, and developer-friendly content that keeps pace with code changes.
- `agents/error-detective.md`: Use this agent when you need to diagnose why errors are occurring in your system, correlate errors across services, identify root causes, and prevent future failures.
- `agents/llm-architect.md`: Use when designing LLM systems for production, implementing fine-tuning or RAG architectures, optimizing inference serving infrastructure, or managing multi-model deployments.
- `agents/product-manager.md`: Use this agent when you need to make product strategy decisions, prioritize features, or define roadmap plans based on user needs and business goals.
- `agents/python-pro.md`: Use this agent when you need to build type-safe, production-ready Python code for web APIs, system utilities, or complex applications requiring modern async patterns and extensive type coverage.
- `agents/software-architect.md`: Software architecture and system design specialist (strict), focused on simplicity, flexibility, reusability, and engineering best practices.
- `agents/test-automator.md`: Use this agent when you need to build, implement, or enhance automated test frameworks, create test scripts, or integrate testing into CI/CD pipelines.

## Skills (`skills/`)

- `skills/create-plan/`:
  - `SKILL.md`: regras para gerar plano usando template fixo com disciplina TDD.
  - `assets/plan-template.md`: template de plano (pt-BR) com checklist, tasks e execucao.
- `skills/test-generator/`:
  - `SKILL.md`: regras para gerar testes com pytest, plano previo e aprovacao explicita.

## Comandos (`commands/`)

Todos os comandos de workflow usam `agent: command-router` e delegam para subagents especializados.

- `commands/skills.md`: comando para listar skills disponiveis.
- `commands/product-business.md`: descoberta de negocio e produto usando `business-analyst` + `product-manager`.
- `commands/browser-automation.md`: automacao de browser com evidencias via `browser-automator`.
- `commands/build-tdd.md`: implementacao por TDD (teste falha -> codigo minimo -> verde -> checks).
- `commands/ia-docs-and-context.md`: melhoria de docs e contexto de IA com Mermaid.
- `commands/ia-specialist.md`: consultoria tecnica de IA (arquitetura + implementacao).
- `commands/debug.md`: RCA de incidentes com `debugger` + `error-detective`.
- `commands/review-architecture.md`: revisao arquitetural com recomendacao objetiva.
- `commands/qa-final.md`: gate final de qualidade antes de merge/release.

## Roteamento recomendado de comandos

- `/product-business`: `business-analyst` + `product-manager` (opcional `software-architect`).
- `/browser-automation`: `browser-automator`.
- `/build-tdd`: `test-automator` -> (`backend-developer` ou `python-pro` ou `ai-engineer`) -> `review`/`code-reviewer`.
- `/ia-docs-and-context`: `documentation-engineer` + (`software-architect` ou `architect-reviewer`) + opcional `llm-architect`.
- `/ia-specialist`: `llm-architect` + `ai-engineer`.
- `/debug`: `debugger` + `error-detective`.
- `/review-architecture`: `software-architect` + `architect-reviewer`.
- `/qa-final`: `review`/`code-reviewer` + `test-automator` (+ opcional `architect-reviewer`).

## MCPs e variaveis de ambiente

As integracoes locais/remotas configuradas em `opencode.json` usam os seguintes pontos:

- `langchain`: remoto (`https://docs.langchain.com/mcp`).
- `context7`: local via `npx` com `CONTEXT7_API_KEY`.
- `notion`: local via `npx` com `NOTION_TOKEN`.
- `fetch`: local via Docker (`mcp/fetch`).
- `duckduckgo`: local via Docker (`mcp/duckduckgo`).
- `playwright`: local via `npx`.
- `sequential-thinking`: local via `npx`.

## Dependencias

- `@opencode-ai/plugin`: definido em `package.json`.

## Notas

- Consulte sempre `AGENTS.md` antes de executar qualquer acao no repo.
- `.gitignore` ignora `node_modules`, `package.json`, `bun.lock` e o proprio `.gitignore`.
