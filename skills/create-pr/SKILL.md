---
name: create-pr
description: Gera o corpo de Pull Request com base nas mudancas da branch atual em relacao a branch de origem.
compatibility: opencode
---

# Create PR Body

## O que eu faco

- Identifico a branch base (origem) da branch atual.
- Analiso tudo que mudou na branch atual em relacao a base.
- Gero um corpo de PR no template definido, com foco em mudancas reais e validacao simples.

## Quando usar

Use esta skill quando voce precisar montar a descricao de um PR de forma consistente e baseada no diff real da branch.

## Regras obrigatorias

1. Ler o `AGENTS.md` na raiz do projeto antes de qualquer acao.
2. Descobrir branch atual com `git branch --show-current`.
3. Tentar inferir branch base por esta ordem:
   - upstream da branch atual (`@{upstream}` quando existir)
   - branch padrao remota (`origin/HEAD`)
   - fallback para `origin/main` e depois `origin/master`
4. Confirmar ponto de divergencia com `git merge-base <base> HEAD`.
5. Coletar mudancas completas da branch:
   - `git log --oneline <base>..HEAD` para contexto de commits
   - `git diff --name-status <base>...HEAD` para arquivos alterados
   - `git diff <base>...HEAD` para entender o conteudo alterado
6. Nao inventar alteracoes: listar apenas o que estiver no diff/log.
7. Se a branch base nao puder ser inferida com seguranca, pedir ao usuario a base correta antes de finalizar o texto.

## Formato de saida obrigatorio

Use exatamente este template:

## [Titulo do PR]

## Changes

- [tudo que foi alterado no PR]

## How to test?

[Uma forma simples de como testar o que foi criado]

## Observations

[Se tiver alguma observacao ou algo que julgue necessario colocar]

## Regras de escrita

- Titulo curto, claro e orientado ao valor entregue.
- Em `Changes`, usar bullets objetivos e agrupados por impacto funcional.
- Em `How to test?`, descrever passos simples e reproduziveis.
- Em `Observations`, incluir riscos, limitacoes, pendencias ou deixar explicito quando nao houver.
- Manter linguagem direta e profissional.
