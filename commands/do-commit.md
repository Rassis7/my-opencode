---
description: Analisa mudancas no git e cria um commit no padrao Conventional Commits alinhado ao SEMVER, com titulo curto e descricao em bullets.
agent: command-router
---

# Do Commit

## O que eu faco

- Analiso as mudancas adicionadas no Git com `git status`.
- Escolho o tipo de commit seguindo Conventional Commits com impacto SEMVER.
- Gero e executo um commit com titulo curto e descricao em bullets no formato padrao do projeto.

## Quando usar

Use esta skill quando voce quiser criar um commit claro e consistente com SEMVER a partir das mudancas atuais da branch.

## Regras obrigatorias

1. Ler o `AGENTS.md` na raiz do projeto antes de qualquer acao.
2. Rodar `git status` para identificar:
   - arquivos modificados
   - arquivos novos
   - arquivos staged/unstaged
3. Se necessario para detalhar os bullets, inspecionar diffs (`git diff` e `git diff --staged`).
4. Definir o tipo do commit com base no impacto:
   - `fix`: correcao sem quebra (PATCH)
   - `feat`: nova funcionalidade sem quebra (MINOR)
   - `feat!` ou `BREAKING CHANGE`: mudanca com quebra (MAJOR)
   - `chore`, `docs`, `refactor`, `test`, `ci`, `build`, `perf`, `style` quando aplicavel
5. Montar mensagem no formato:

   `[branch-name] <type>: <frase curta>`

   Corpo com bullets objetivos:
   - o que foi adicionado/alterado
   - testes criados/ajustados
   - outros pontos relevantes

6. Exemplo de saida esperada:

   `[branch-name] feat: add new role`
   - added role to create user
   - created new tests in XXX.xx
   - anything else

7. Nao incluir arquivos com segredos (ex.: `.env`, `credentials.json`) no commit.
8. Rodar `git status` apos o commit para validar sucesso.

## Observacoes de qualidade

- A frase do titulo deve ser curta e direta.
- O corpo deve explicar o "por que" e o impacto, nao apenas listar arquivos.
- Manter consistencia com o historico de commits do repositorio quando possivel.
