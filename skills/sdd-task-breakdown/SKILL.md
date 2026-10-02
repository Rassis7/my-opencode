---
name: sdd-task-breakdown
description: >
  Realiza o breakdown de tarefas (task breakdown) a partir de uma spec SDD previamente
  gerada e aprovada (proposal.md + spec.md), transformando requirements e scenarios em um
  plano de execucao com disciplina TDD (Test Fails -> Code -> Green), usando a estrutura
  definida nesta propria skill, mapeia cada requirement em Tasks
  incrementais e independentes, define DoD por task e fecha com Checks Globais e Registro de
  Execucao. Nao implementa codigo e nao altera os artefatos da spec. Use quando o usuario
  pedir para quebrar/planejar as tarefas de uma spec SDD aprovada, gerar o plano de
  implementacao TDD, ou preparar o desenvolvimento de uma feature ja especificada.
---

# Skill: SDD Task Breakdown — Plano TDD a partir da Spec

Esta e uma skill de workflow que sucede a `sdd-code-review` no pipeline SDD:
`proposal -> spec -> code review -> TASK BREAKDOWN -> implementacao`.

## O — OBJETIVO

Voce transforma um **pacote de spec SDD aprovado** (`proposal.md` + `spec.md`) em um
**plano de execucao TDD** (Test Fails -> Code -> Green), seguindo a estrutura definida
nesta skill. O resultado e um `plan.md` com Tasks incrementais e independentes,
cada uma com DoD, e um bloco final de Checks Globais e Registro de Execucao.

Voce NAO implementa codigo: entrega apenas o plano pronto para o agente de implementacao.

---

## C — CONTEXTO

### Quando usar

- O usuario pede para "quebrar as tarefas da spec", "gerar o plano de implementacao",
  "planejar o desenvolvimento da feature SDD", "fazer o task breakdown do pacote".
- A spec foi aprovada (fluxo `sdd` + veredito `code-review`) e precisa de um plano TDD
  antes da implementacao.

### O que voce NAO faz

- Nao implementa codigo.
- Nao altera `proposal.md`/`spec.md`/`review.md` (artefatos sao somente leitura).
- Nao cria tasks em Jira e nao publica em Confluence.
- Nao salva arquivos sem confirmacao explicita do usuario.

### Entradas aceitas

- **Conversa**: pacote `proposal.md` + `spec.md` (e opcionalmente `review.md`) gerado
  anteriormente nesta conversa.
- **Caminho**: usuario informa `specs/<NNN>-<slug>/` contendo `proposal.md` e `spec.md`.

O plano TDD usa preferencialmente o `review.md` (se existir) para priorizar correcoes dos
achados CRITICAL/MAJOR.

### Recursos

- A estrutura canonica do plano esta definida na secao **Estrutura do plano** desta skill;
  nao depende de outra skill nem de arquivos externos.

---

## A — ACOES (Workflow)

```
[entrada: pacote proposal+spec (aprovado)]
   │
   ▼
[1] Inicializacao e leitura do pacote
   │
   ▼
[2] Mapeamento requirements -> Tasks
   │
   ▼
[3] Ordenacao e dependencias
   │
   ▼
[4] Preenchimento TDD por Task (Test Fails / Code / Green / Notas)
   │
   ▼
[5] DoD, Checks Globais e Registro de Execucao
   │
   ▼
[6] CHECKPOINT — revisao do plano
   │      sim | ajustar | cancelar
   ▼
[7] Entrega — plano completo + salvamento opcional
```

### STAGE 1 — Inicializacao

1. Identificar a fonte do pacote (conversa ou caminho). Se nao houver pacote: `NEEDS_INPUT`
   pedindo o pacote ou o caminho `specs/<NNN>-<slug>/`.
2. Ler `proposal.md` (capabilities, high-level changes, success criteria) e `spec.md`
   (requirements, scenarios). Ler `review.md` se existir.
3. Aplicar a estrutura canonica definida nesta skill, na secao **Estrutura do plano**.
4. Anunciar: `Iniciando task breakdown da spec: "<titulo da spec>"`.

### STAGE 2 — Mapeamento requirements -> Tasks

1. Para cada `### Requirement:` do `spec.md`, decidir se vira **uma** Task ou se agrupa
   com requirements do mesmo modulo/fronteira (agrupar apenas quando fizer sentido e o
   resultado continuar incremental).
2. Cada Task deve rastrear para o requirement e para a capability da proposal (matriz
   `capability -> requirement -> task`).
3. Sucess criteria da proposal e achados do `review.md` (se existir) viram checks dentro
   das Tasks correspondentes.

### STAGE 3 — Ordenacao e dependencias

1. Ordenar Tasks em sequencia que respeite dependencias tecnicas (contratos antes de
   fluxos, infra antes de UX, etc.).
2. Declarar dependencias explicitas entre Tasks.

### STAGE 4 — Preenchimento TDD por Task

Para cada Task, preencher seguindo o template:

- [ ] **Test Fails** - suites/fixtures que devem falhar primeiro e cenarios a exercitar
  (derivados dos scenarios BDD da spec).
- [ ] **Code** - implementacao necessaria (servicos/rotas/infra) derivada do technical
  detail do requirement.
- [ ] **Green** - testes/comandos que devem passar antes de avancar.
- [ ] **Notas** - riscos, seed data, migracoes, feature flags.

### STAGE 5 — DoD, Checks Globais e Registro de Execucao

1. Definir **Definicao de Pronto (DoD)** por Task derivada dos scenarios e success
   criteria.
2. Preencher blocos finais do template: Pre Tasks, Checks Globais (regressao, DX/Docs,
   observabilidade, entrega) e Registro de Execucao.

### STAGE 6 — CHECKPOINT

Apresentar resumo do plano (lista de Tasks, dependencias, quantas, TDD cadence):

```
================================================
TASK BREAKDOWN CONCLUIDO — Revisao

SPEC: <titulo da spec.md>
Tasks: N tasks (ordem e dependencias)
TDD: <sim — cada task com Test Fails/Code/Green>
DoD: <resumo da Definicao de Pronto global>

================================================
Aprovar este plano?
- "sim"      → entrega (e eventual salvamento em disco)
- "ajustar"  → diga o que mudar (refaz o estagio apontado)
- "cancelar" → encerra o fluxo
================================================
```

- `sim` → avancar ao STAGE 7.
- `ajustar` → refazer o estagio apontado e re-emitir o plano.
- `cancelar` → encerrar com status `CANCELED`, sem gravar nada.

### STAGE 7 — Entrega + salvamento opcional

1. Exibir o **plano completo** (`plan.md`).
2. **Perguntar** se o usuario quer salvar em disco:

   ```
   Salvar este plano em disco?
   Estrutura proposta:
     specs/<NNN>-<slug>/plan.md   (junto do pacote da sdd)
   - "sim"            → salvar
   - "caminho:/..."   → informar outra pasta raiz
   - "nao"            → apenas exibir, nao gravar nada
   ```

3. Se `sim`, gravar `plan.md` junto do pacote (ou no caminho informado). Se falhar,
   reportar erro sem fingir sucesso; o plano segue disponivel na conversa.
4. Resultado final:

   ```
   Task breakdown concluido
   Spec: <titulo>
   Tasks: <N> (TDD: Test Fails -> Code -> Green por task)
   (Plano salvo em: <path> | Plano nao salvo — disponivel apenas na conversa)
   Pronto para implementacao.
   ```

---

## N — NORMAS (inviolaveis)

### N1. Fidelidade a spec

- Toda Task deriva de um requirement da spec. Nao invente requisitos fora do escopo.
- Registre em `assumptions` o que nao foi verificado no codigo (brownfield nao executado).

### N2. Disciplina TDD

- Toda Task tem os 4 passos do template: Test Fails, Code, Green, Notas.
- Green sempre e verificavel (suite/comando concreto).

### N3. Nao alterar artefatos

- `proposal.md`, `spec.md` e `review.md` sao somente leitura. O plano e um artefato novo.

### N4. Delivery user-driven

- Nada e gravado em disco sem confirmacao explicita do usuario.

### N5. Idioma e tom

- Portugues brasileiro; termos tecnicos consagrados em ingles (TDD, DoD, Test Fails,
  Code, Green).
- Saida em texto plano, marcadores de progresso discretos, sem emojis.
- Output deterministico: mesma estrutura, mesma ordem de secoes (base no template).

### N6. Estrutura do plano

- A estrutura do `plan.md` segue a secao **Estrutura do plano** desta skill; nao remova
  secoes obrigatorias e nao deixe `<placeholder>`.

---

## S — ESPECIFICACAO (Output)

### Envelope — `plan` (PASS / FAIL / NEEDS_INPUT)

```yaml
---
status: PASS
artifact_type: plan
summary: >
  Task breakdown de "<titulo da spec>" gerado com <N> tasks em ordem TDD
  (Test Fails -> Code -> Green), <M> dependencias declaradas.
tasks: []                 # lista de tasks (id, requirement, capability, DoD)
approved: false           # usuario aprovou no checkpoint
save_path: null           # preenchido so se salvar em disco
---
```

### Estrutura do plano — `plan.md`

Use esta estrutura independente de arquivos externos e preencha cada `<placeholder>` com
conteudo derivado da spec:

```markdown
# Plano: <titulo da spec>

## Contexto Rapido
## Pre Tasks
## Task 1 - <nome>
### Test Fails
### Code
### Green
### Notas
### Definicao de Pronto (DoD)
## Checks Globais
## Registro de Execucao
## Playbook de Atualizacao
```

Repita o bloco `Task` para cada entrega incremental, mantendo a ordem e dependencias:

- **Contexto Rapido**: Objetivo (success criteria da proposal), Escopo (capabilities
  afetadas), Restricoes (ameaca da spec/tech stack), Definicao de Pronto (cobertura,
  validacoes, veredito do review).
- **Estagios Sequenciais -> Pre Tasks**: checklist de readiness.
- **Task <n> - <nome>**: bloco com Test Fails / Code / Green / Notas, mapeado a um ou
  mais requirements. Copiar o bloco para cada task, renomeando o titulo para a entrega
  incremental.
- **Checks Globais**: regressao direcionada, DX/Docs, observabilidade, entrega.
- **Registro de Execucao**: tabela estagio/resultado/observacoes (preenchida durante
  execucao).
- **Playbook de Atualizacao**: validar plano antes de cada estagio, atualizar checkboxes,
  registrar desvios, consolidar relatorio.

### Exemplo de fluxo

Entrada: pacote `specs/001-notificacao-push-entrega/` (proposal + spec + review) aprovado.

1. **STAGE 1**: pacote lido (3 requirements, 5 scenarios, veredito APPROVED).
2. **STAGE 2**: 3 Tasks mapeadas — T1 (contrato da notificacao), T2 (disparo apos
   `EM_TRANSITO`), T3 (fluxo de entrega/fallback).
3. **STAGE 3**: T2 depende de T1; T3 depende de T2.
4. **STAGE 4**: cada task com Test Fails (derivados dos scenarios BDD), Code e Green.
5. **STAGE 5**: DoD global + checks globais preenchidos.
6. **STAGE 6**: usuario revisa e responde `sim`.
7. **STAGE 7**: plano exibido e salvo em `specs/001-notificacao-push-entrega/plan.md`.

---

## Versionamento

- **v1.0** — Skill de task breakdown para o pipeline SDD.
  - Entrada: pacote SDD aprovado (proposal + spec [+ review]).
  - Saida: plano TDD (Test Fails -> Code -> Green) seguindo a estrutura definida nesta
    skill, sem dependencia externa de template.
  - Artefatos da spec sao somente leitura; plano e artefato novo.
  - Entrega user-driven: salvamento em disco opcional e explicito.
- Contrato interno: **v1.0**.
