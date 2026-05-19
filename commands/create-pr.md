---
description: Abre e cria Pull Requests com base no diff real da branch atual.
---

Crie um Pull Request a partir da branch atual seguindo estas regras exatamente.

## Objetivo

- Identificar a branch base correta da branch atual.
- Analisar todas as mudancas reais em relacao a base.
- Encontrar o template de PR do repositorio quando existir.
- Gerar um titulo descritivo em ingles.
- Gerar um corpo de PR fiel ao diff real.
- Adicionar labels apropriadas quando fizer sentido.
- Criar o Pull Request com `gh pr create`.
- Retornar o link do Pull Request criado.

## Regras obrigatorias

- Leia o `AGENTS.md` na raiz do projeto antes de qualquer outra acao, se ele existir.
- Descubra a branch atual com `git branch --show-current`.
- Tente inferir a branch base nesta ordem:
  1. upstream da branch atual
  2. branch padrao remota via `origin/HEAD`
  3. fallback para `origin/main`
  4. fallback para `origin/master`
- Confirme o ponto de divergencia com `git merge-base <base> HEAD`.
- Colete o contexto completo da branch:
  - `git log --oneline <base>..HEAD`
  - `git diff --name-status <base>...HEAD`
  - `git diff <base>...HEAD`
- Nao invente alteracoes, motivacoes, testes ou impactos. Use apenas o que estiver suportado pelo diff, logs e arquivos do repositorio.
- Procure um template de PR antes de montar o corpo. Verifique, quando existirem:
  - `.github/pull_request_template.md`
  - `.github/PULL_REQUEST_TEMPLATE.md`
  - `.github/pull_request_template/*.md`
  - `.gitlab/merge_request_templates/default.md`
- Se a branch base nao puder ser inferida com seguranca, pare e pergunte ao usuario qual e a base correta antes de criar o PR.
- Se nao houver mudancas em relacao a base, nao crie PR. Explique o motivo ao usuario.
- Se `gh` nao estiver autenticado ou a criacao falhar, explique o erro objetivamente e pare.

## Titulo do PR

- Escreva o titulo em ingles.
- O titulo deve descrever a mudanca principal da branch.
- Seja conciso e especifico.
- Nao use titulos genericos como `update code` ou `fix stuff`.

## Labels

- Adicione labels apropriadas apenas se conseguir inferi-las com seguranca a partir das mudancas e se o repositorio aceitar labels no fluxo com `gh`.
- Nao invente nomes de labels se nao houver evidencia suficiente.
- Se nao for possivel aplicar labels com seguranca, crie o PR sem labels e informe isso no final.

## Corpo do PR

Monte o corpo usando o template do repositorio quando existir.
Se nao existir template, use exatamente esta estrutura:

```
## 🆕 Describe what changed and why

- Liste as principais mudancas reais da branch.
- Explique as motivacoes com base no diff e no contexto dos commits.

## 🧪 How to test

- Liste apenas formas de validacao suportadas pelas mudancas encontradas.
- Se nao houver evidencia suficiente para passos de teste, escreva `Not specified in the branch changes.`

## 📸 Images/Videos

- Informe `Not applicable.` quando nao houver evidencia de mudancas visuais.
```

## Execucao

- Verifique o estado atual da branch e se ela possui remoto.
- Se necessario, publique a branch remota com upstream antes de abrir o PR.
- Crie o PR com `gh pr create`, definindo:
  - base correta
  - titulo em ingles
  - corpo final
- Se houver labels confiaveis e suporte no fluxo escolhido, aplique-as.
- Ao final, responda com:
  - titulo final
  - branch base usada
  - resumo curto do que entrou no PR
  - link do Pull Request criado

## Restricoes

- Nao faca suposicoes sem evidencia.
- Nao omita incertezas: explicite quando algo nao puder ser determinado com confianca.
- Nao abrir issue, nao fazer merge, nao fazer push forcado.
- Nao alterar o conteudo do branch alem do que for estritamente necessario para publicar a branch e criar o PR.
