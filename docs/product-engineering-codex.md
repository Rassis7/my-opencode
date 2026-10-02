# Product Engineering no Codex

O workflow base permanece em `skills/product-engineering/SKILL.md` e `AGENTS.md` para OpenCode. A instalação Codex usa plugins upstream e um adaptador local em `~/.codex/skills/product-engineering/SKILL.md`; decisões de classificação, Fast/Full Path, TDD, simplicidade, delegação seletiva, registros e Git devem permanecer alinhadas entre as duas interfaces.

## Dependências instaladas

- Superpowers Codex: plugin oficial `superpowers@openai-curated-remote`, versão `6.4.2`.
- Ponytail Codex: marketplace `DietrichGebert/ponytail`, plugin `ponytail@ponytail`, versão `4.10.1`.
- Skills e lifecycle hooks são providos pelos plugins; não copie as skills upstream para `~/.codex/skills`.

Atualize o catálogo oficial no fluxo normal do Codex. Para Ponytail, rode `codex plugin marketplace upgrade ponytail` e reinstale/atualize o plugin conforme o `codex plugin add` do CLI instalado. Consulte `codex plugin list --json` para versões e estados. Superpowers pode ser atualizado pelo marketplace oficial do Codex. Reinicie sessões para carregar versões novas.

## Hooks Ponytail

O plugin registra três hooks Codex: SessionStart, SubagentStart e UserPromptSubmit. Depois da instalação, abra `/hooks`, inspecione os comandos e confie-os explicitamente. A instalação os deixa sob o mecanismo de confiança do Codex. As entradas globais de hooks existentes em `~/.codex/hooks.json` são mantidas; não copie hooks do Ponytail para esse arquivo.

## Sincronização

Ao mudar o workflow OpenCode, revise o adaptador Codex e este documento. Adapte somente a sintaxe de skills, caminhos e ferramentas. Não enfraqueça os gates: Fast Path sem plano formal nem subagentes, com RED significativo antes da mudança; Full Path com brainstorming, revisão de simplicidade Ponytail, plano proporcional e aprovado antes de implementar, TDD, revisão e evidência; bugs com systematic debugging. Skills de commit, PR, review e Playwright já existentes no Codex mantêm seus contratos.

Registros de execução Codex ficam sob `~/.codex/records/tasks/`; memória diária fica sob `~/.codex/records/memory/`. Git nunca recebe commit, push, merge ou descarte automático.
