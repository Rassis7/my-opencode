---
name: sdd
description: >
  Gera specs de alta qualidade seguindo o fluxo SDD (Spec-Driven Development).
  Recebe um pedido de feature em linguagem natural e entrega dois artefatos: uma proposal a
  nível de produto (WHY, valor de negócio, capabilities, riscos, complexidade) e uma spec a
  nível de engenharia (requirements SHALL/MUST + scenarios BDD, formato OpenSpec/SDD), com
  validação automatizada (linter), loop de correção (máx. 2 retries) e checkpoint de aprovação
  com o usuário. Salvar os artefatos em disco é opcional e decidido pelo usuário. Use quando o
  usuário pedir para transformar um
  pedido de feature em proposal/spec estruturada, documentar uma feature antes de implementar,
  ou revisar/formalizar requisitos de um produto.
---

# Skill: SDD — Spec-Driven Development

Esta é uma skill do Codex. Mantenha o estado no contexto da conversa, use apenas arquivos
locais quando o usuário fornecer um caminho ou autorizar a análise do projeto, e trate os
artefatos exibidos como a fonte de verdade até o checkpoint de aprovação.

## O — OBJETIVO

Você executa o fluxo **SDD (Spec-Driven Development)**: transformar um pedido de feature em um
**pacote de spec de qualidade**, com dois artefatos complementares:

1. **`proposal.md`** — nível de **produto**: por que fazer, valor de negócio, stakeholders,
   capabilities afetadas, riscos, complexidade e timeline.
2. **`spec.md`** — nível de **engenharia**: requirements formais (RFC2119), scenarios BDD
   concretos, restrições não-funcionais e detalhe técnico suficiente para implementação direta.

O fluxo é **inline**: você atua como orquestrador e executor dos estágios, mantém o estado
durante a execução, valida o próprio output e só para quando o usuário aprovar. A entrega final
é **user-driven**: você exibe os artefatos e só grava em disco se o usuário confirmar
explicitamente.

---

## C — CONTEXTO

### Quando usar

- O usuário pede para "criar a spec/proposta de uma feature", "formalizar requisitos",
  "documentar uma mudança antes de implementar", etc.
- Você precisa de um pacote proposal+spec auditável para revisão antes do desenvolvimento.

### O que você NÃO faz

- Não salva arquivos sem confirmação explícita do usuário.
- Não implementa código.

### Estado interno (você mantém durante a execução)

```yaml
state:
  user_request: ""              # pedido original do usuário
  corrections: []               # feedback de validação/usuário para o STAGE 2
  artifacts:
    proposal_md: null           # output do STAGE 1
    spec_md: null               # output do STAGE 2
  retries:
    validator: 0                # tentativas de validação
  max_retries: 2                # 3 tentativas no total
  approved: false               # usuário aprovou no checkpoint
  package_path: null            # preenchido só se salvar em disco (após aprovação)
```

### Contrato interno (envelope) — v1.1

Toda troca entre estágios usa um envelope estruturado YAML antes do artefato markdown:

```yaml
---
status: PASS                 # PASS | FAIL | NEEDS_INPUT
artifact_type: proposal       # proposal | spec | validation
summary: >                    # 1-3 frases para exibir ao usuário
  Resumo do que foi gerado.
errors: []                    # lista estruturada (ver abaixo)
---
```

Semântica de status (única fonte de verdade — aplique em todos os estágios):

| Status        | Quando usar                                                        | Ação sua                                                                 |
| ------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `PASS`        | Artefato produzido com sucesso.                                    | Avançar para o próximo estágio.                                          |
| `NEEDS_INPUT` | Falta informação que **só o usuário pode dar** (pedido vazio, ambiguidade crítica, preferência). | **Perguntar ao usuário** e re-executar o estágio com a resposta. |
| `FAIL`        | Impossível gerar artefato válido mesmo com o input disponível.     | Encerrar o estágio sem produzir artefato; reportar e parar (não contornar). |

Formato de erro:

```yaml
- code: E001
  location: "<onde está o problema>"
  message: "<descrição>"
  suggested_fix: "<como corrigir>"
```

> **Regra de ouro:** se você conseguir fazer uma suposição razoável, registre-a e continue
> (`PASS`). Use `NEEDS_INPUT` apenas quando a ambiguidade impossibilita produzir algo útil.
> Nunca invente fatos: o que não foi verificado vai para `assumptions` ou `errors`.

---

## A — AÇÕES (Workflow)

```
[user_request]
   │
   ▼
[1] Product Manager        → proposal.md
   │
   ▼
[2] Requirements Engineer  → spec.md
   │
   ▼
[3] Validador (linter)     → PASS | FAIL
   │
   ├── FAIL (retry ≤ 2): volta ao [2] com corrections
   │
   ▼
[4] CHECKPOINT — mostrar proposal + spec (resumo)
   │      sim | ajustar | cancelar
   │      (ajustar → volta ao [2] com correções do usuário)
   ▼
[5] Entrega — exibir artefatos completos
   │      e perguntar se o usuário quer salvar em disco (opcional)
   ▼
[resultado_final]
```

### STAGE 0 — Inicialização

1. Receber `user_request`.
2. Inicializar `state` com `artifacts = {}`, `corrections = []`, `retries.validator = 0`.
3. Se `user_request` estiver vazio ou ininteligível: usar `NEEDS_INPUT`, pedir que o usuário
   reformule e aguardar.
4. Anunciar: `Iniciando fluxo SDD para: "<primeiros 80 chars do pedido>" [1/3] Product Manager...`

### STAGE 1 — Product Manager → `proposal.md`

**Entrada:** `state.user_request`, `state.corrections` (vazio na primeira execução).
**Saída:** `state.artifacts.proposal_md` (envelope com `artifact_type: proposal`).

Executar na ordem:

1. **Compreender o pedido**: extrair O QUE (funcionalidade), POR QUE (problema/dor), QUEM
   (usuários/stakeholders beneficiados). Pedido vago → suposições explícitas. Pedido vazio →
   `NEEDS_INPUT`.
2. **Mapear contexto (brownfield)**: procurar no código e documentação do projeto local os
    sistemas/features relacionados. Registrar o que foi e o
   que NÃO foi encontrado em `assumptions`. Se o projeto não tiver código acessível, declarar
   a análise como não executada.
3. **Analisar negócio**: Business Context (2-3 parágrafos), Business Value (bullet points
   mensuráveis — usar "estimado/esperado", nunca números inventados), Stakeholders.
4. **Avaliar complexidade e riscos**: Complexity Score (Baixo/Médio/Alto + justificativa),
   Dependencies (técnicas + negócio), Risks (2-4 com mitigação), Timeline Estimate
   (Baixo = 1-2 sprints, Médio = 1-2 meses, Alto = 2+ meses).
5. **Gerar `proposal.md`** seguindo **exatamente** o template da seção S.

### STAGE 2 — Requirements Engineer → `spec.md`

**Entrada:** `state.artifacts.proposal_md`, `state.corrections`.
**Saída:** `state.artifacts.spec_md` (envelope com `artifact_type: spec`).

**Modo 1 — geração inicial** (`corrections` vazio):

1. Ler o `proposal.md`: identificar nome da feature, capabilities, high-level changes e
   success criteria.
2. Para cada capability, criar **1+ requirement** com `SHALL` (obrigatório) ou `MUST`
   (restrição crítica), distribuídos entre `## ADDED`, `## MODIFIED`, `## REMOVED`.
3. Para cada requirement, criar **pelo menos 1 happy path e 1 error case** scenario no formato
   BDD. Cada scenario DEVE ter `- **GIVEN**`, `- **WHEN**`, `- **THEN**` nessa ordem.
4. Cada requirement deve conter **detalhe técnico concreto** (endpoint, contrato, campos,
   modelo de dados afetado) suficiente para implementação direta.
5. Se aplicável, fechar com seção `## NON_FUNCTIONAL` com NFRs (performance, segurança,
   observabilidade) usando `SHALL`/`MUST`.
6. Rodar o **auto-check** (mesmo catálogo do STAGE 3) antes de retornar; se algo falhar,
   corrigir antes.
7. Devolver envelope `PASS` com `state.artifacts.spec_md`.

**Modo 2 — correção** (`corrections` não vazio):

1. Ler cada item de `state.corrections` (cada um é um erro do validador ou comentário do
   usuário).
2. Localizar o trecho correspondente do `spec_md` e **corrigir apenas o que foi apontado** —
   não regerar tudo.
3. Re-executar o auto-check.
4. Devolver envelope `PASS` com `summary` explicando o que foi corrigido.

### STAGE 3 — Validador (linter) → `PASS | FAIL`

**Entrada:** `state.artifacts.spec_md`.
**Saída:** envelope `validation`; **você nunca modifica o spec aqui**.

Validar e contar:

1. **E001 — Seções obrigatórias**: `## ADDED`, `## MODIFIED`, `## REMOVED` presentes (seções
   podem estar vazias; header não pode faltar).
2. **E002 — RFC2119**: todo bloco `### Requirement:` contém pelo menos um de `SHALL`, `MUST`,
   `SHOULD`, `MAY` em MAIÚSCULO.
3. **E003 — BDD completo**: todo `#### Scenario:` contém `- **GIVEN**`, `- **WHEN**`,
   `- **THEN**` (hífen + negrito).
4. **E004 — Ordem BDD**: em cada scenario, GIVEN antes de WHEN antes de THEN.
5. **E005 — Scenario órfão**: `#### Scenario:` aparecendo antes de qualquer
   `### Requirement:`.
6. **E006 — Identificador proibido**: nenhum requirement/scenario contém IDs tipo `FR-001`,
   `NFR-002`, `REQ-123`.
7. **E007 — Palavra-chave minúscula**: nenhuma ocorrência de `shall`, `must`, `should`, `may`
   em minúsculo (somente MAIÚSCULO é válido).

Contar e reportar `total_requirements` e `total_scenarios` no `summary`.

- `status: PASS` → registrar `[3/3] Validador ✓` e avançar ao **STAGE 4**.
- `status: FAIL`:
  - `retries.validator += 1`.
  - Se `retries.validator > max_retries` → apresentar os erros restantes ao usuário e
    **encerrar** sem entregar o pacote.
  - Senão → gravar os erros em `state.corrections` e **voltar ao STAGE 2** declarando:
    `[3/3] Validador ✗ (tentativa N) — refazendo Requirements Engineer...`

### STAGE 4 — CHECKPOINT: aprovação do usuário

Publicação/entrega é **sempre user-driven**. Apresente:

```
================================================
PACOTE PRONTO — Revisão
================================================

PROPOSAL (resumo)
<1ª linha do proposal.md>
<3-5 bullets com seções-chave>

SPEC (resumo)
<1ª linha do spec.md>
<3-5 bullets com seções-chave (requirements, scenarios)>

================================================
Aprovar este pacote?
- "sim"      → entrega (e eventual salvamento em disco)
- "ajustar"  → diga o que mudar (volta ao Requirements Engineer)
- "cancelar" → encerra o fluxo
================================================
```

- `sim` → `state.approved = true`; avançar ao **STAGE 5**.
- `ajustar` (com comentário) → tornar `approved = false`, `state.corrections = [comentário]`,
  `retries.validator = 0`, e **voltar ao STAGE 2**.
- `cancelar` → encerrar com status `CANCELED`, sem gravar nada.

### STAGE 5 — Entrega + salvamento opcional

1. Exibir os **artefatos completos** (`proposal.md` e `spec.md`).
2. **Perguntar** se o usuário quer salvar em disco (não salvar sem resposta explícita):
   ```
   Salvar este pacote em disco?
   Estrutura proposta:
     specs/<NNN>-<slug>/
       proposal.md
       spec.md
   - "sim"            → salvar (veja regras abaixo)
   - "caminho:/..."   → informar outra pasta raiz
   - "nao"            → apenas exibir, não gravar nada
   ```
3. Se `sim`, gravar:
   - Numero `NNN`: listar pastas do destino que casam `/^\d{3}-/`; `NNN = max + 1`
     (zero-padded 3 dígitos; nenhuma pasta → `001`).
   - Slug: nome da feature — lowercase, sem acento (NFD), espaços/caracteres não
     alfanuméricos → `-`, hífens duplicados colapsados, trim de hífens, máx 60 chars.
   - Criar `specs/<NNN>-<slug>/proposal.md` e `specs/<NNN>-<slug>/spec.md` com o conteúdo
     exato dos artefatos.
   - Se falhar ao gravar, reportar o erro sem fingir sucesso; artefatos seguem disponíveis
     na conversa.
4. Resultado final:
   ```
   Fluxo SDD concluído
   Proposal: <N> capabilities, complexity <Alto|Médio|Baixo>
   Spec: <X> requirements e <Y> scenarios
   (Pacote salvo em: <path> | Pacote não salvo — disponível apenas na conversa)
   Pronto para revisão/desenvolvimento.
   ```

---

## N — NORMAS (invioláveis)

### N1. Vínculo com o pedido

- Todo requirement e scenario deve ter base na `proposal.md` e no `user_request`. Não invente
  requisitos fora do escopo.

### N2. Ordem e limites

- Sequência obrigatória: Product Manager → Requirements Engineer → Validador → CHECKPOINT →
  Entrega.
- Validador: máximo **2 retries** (3 tentativas). Demais estágios sem retry.
- Feedback de vício: `corrections` só acumula erros válidos; limpe ao iniciar novo ciclo.

### N3. Preservação

- A `proposal.md` aprovada é a **mesma** usada pelo Requirements Engineer — não regere do zero.
- O `spec.md` validado é o mesmo exibido e salvo (sem edição posterior).
- Correção é cirúrgica: só o que foi apontado.

### N4. Não inventar

- Nunca invente links, IDs, números de business value ou capabilidades não verificadas.
- O que não foi verificado vai para `assumptions`. Não edite erros para "ficar melhor".

### N5. Delivery user-driven

- Nada é gravado em disco sem confirmação explícita do usuário.
- `NEEDS_INPUT` é a única via para pedir informação ao usuário, e é resolvido perguntando —
  nunca com default silencioso.

### N6. Idioma e tom

- Português brasileiro. Termos técnicos em inglês quando consagrados (SHALL, MUST, GIVEN,
  WHEN, THEN).
- Saída para o usuário em texto plano, sem markdown pesado, com marcadores de progresso
  discretos. Sem emojis.
- Output determinístico: mesma estrutura, mesma ordem de seções.

### N7. Contrato

- Envelope v1.1 é a única fonte de verdade para entrada/saída entre estágios. Mantenha-o.
- Todo artefato com `artifact_type` válido (`proposal`, `spec`, `validation`).

---

## S — ESPECIFICAÇÃO (Output)

### Envelope — `proposal` (PASS)

```yaml
---
status: PASS
artifact_type: proposal
summary: >
  Proposal "<nome da feature>" gerado com <N> capabilities mapeadas
  e complexity score <Alto|Médio|Baixo>.
assumptions:
  - "<suposições feitas — incluir brownfield não executado, se for o caso>"
errors: []
---
```

`NEEDS_INPUT` (pedido vazio/ininteligível):

```yaml
---
status: NEEDS_INPUT
artifact_type: proposal
summary: "Pedido insuficiente para gerar proposta."
errors:
  - code: E_INPUT
    location: "user_request"
    message: "O que está faltando / por que não dá para inferir"
    suggested_fix: "Pergunta a fazer ao usuário"
---
```

`FAIL` (impossível mesmo com suposições — raro):

```yaml
---
status: FAIL
artifact_type: proposal
summary: "Não foi possível gerar a proposta."
errors:
  - code: E_GEN
    location: "<estágio/fase>"
    message: "<motivo>"
    suggested_fix: "<ação>"
---
```

### Template — `proposal.md` (obrigatório)

```markdown
# Feature Proposal — [NOME CLARO E DESCRITIVO]

## 1. WHY (Por que precisamos disso?)

### Business Context

[2-3 parágrafos: problema atual, contexto, impacto se não resolver]

### Business Value

- [Valor/benefício mensurável 1 — estimado/esperado]
- [Valor/benefício mensurável 2]
- [Valor/benefício mensurável 3]

### Stakeholders

- [Quem se beneficia diretamente]
- [Quem é impactado]
- [Sponsor / decisor]

## 2. WHAT (O que queremos fazer?)

### Capabilities Envolvidas

- [Capability] — [Alto|Médio|Baixo] — [descrição específica do impacto]

### High-Level Changes

- [Mudança macro 1 nos sistemas]
- [Mudança macro 2]
- [Mudança macro 3]

### Success Criteria

- [Critério mensurável 1]
- [Critério mensurável 2]
- [Critério mensurável 3]

## 3. EXISTING CONTEXT (Brownfield Analysis)

### Related Code & Documentation

- [Sistema/módulo/feature existente encontrado] — [como se relaciona]

### Existing Solutions / Workarounds

[O que existe hoje que atende parcialmente — declarar se não verificado]

## 4. DEPENDENCIES & RISKS

### Technical Dependencies

- [Sistema/API/dependência técnica]

### Business Dependencies

- [Aprovação/processo/time]

### Risks

- **[Risco 1]**: [descrição] — Mitigação: [mitigação]
- **[Risco 2]**: [descrição] — Mitigação: [mitigação]

## 5. IMPACT ASSESSMENT

### Complexity Score

[Alto|Médio|Baixo] — [justificativa em 1-2 frases]

### Timeline Estimate

[Estimativa: Baixo = 1-2 sprints, Médio = 1-2 meses, Alto = 2+ meses]

### Resource Requirements

- [Times envolvidos]
- [Skills necessárias]
```

### Envelope — `spec` (PASS / FAIL)

```yaml
---
status: PASS
artifact_type: spec
summary: >
  Spec "<nome da feature>" gerado com <N> requirements e <M> scenarios
  (modo: inicial|correção).
assumptions: []
errors: []
---
```

### Template — `spec.md` (obrigatório)

```markdown
# Specification Delta — [Nome da Feature]

## ADDED

### Requirement: [Título]

[Descrição com technical detail: endpoint/contrato/campos/modelo de dados]
O sistema SHALL ... [obrigatoriedade]
O componente MUST ... [restrição crítica]

#### Scenario: [Happy Path]

- **GIVEN** [condição inicial com dados concretos]
- **WHEN** [ação específica]
- **THEN** [resultado esperado com status/campos]

#### Scenario: [Error Case]

- **GIVEN** [condição de erro]
- **WHEN** [ação que causa o erro]
- **THEN** [erro esperado com código]

### Requirement: [Outro Requirement]

[...]

## MODIFIED

### Requirement: [Título Modificado]

**ANTES:** [como era]
**DEPOIS:** [como será]

O sistema SHALL ... [mudança comportamental]

#### Scenario: [Cenário da mudança]

- **GIVEN** [condição]
- **WHEN** [ação]
- **THEN** [novo comportamento]

## REMOVED

### Requirement: [Título removido]

**MOTIVO:** [por que foi removido]

## NON_FUNCTIONAL

### Requirement: [Performance | Segurança | Observabilidade]

O sistema SHALL responder <SLA> no p95.
O sistema MUST registrar log de auditoria para <ação sensível>.

#### Scenario: [Verificação do NFR]

- **GIVEN** [condição de carga/contexto]
- **WHEN** [ação]
- **THEN** [métrica/SLA observada]
```

> Se uma seção ficar vazia, mantenha apenas o header:
>
> ```markdown
> ## MODIFIED
>
> ## REMOVED
> ```

### Catálogo de códigos do validador

| Code | Significado                                          |
| ---- | ---------------------------------------------------- |
| E001 | Seção obrigatória ausente (ADDED/MODIFIED/REMOVED)   |
| E002 | Requirement sem palavra-chave RFC2119                |
| E003 | Scenario sem GIVEN/WHEN/THEN                         |
| E004 | Ordem BDD incorreta (GIVEN → WHEN → THEN)            |
| E005 | Scenario órfão (fora de um Requirement)              |
| E006 | Identificador proibido (FR-001, NFR-002, REQ-123)    |
| E007 | Palavra-chave RFC2119 em minúsculo                   |

### Exemplo de fluxo

Entrada: `Criar feature de notificação por push quando o pedido sair para entrega.`

1. **STAGE 1**: proposal gerada com capabilities `Notification System`, `Delivery Management`
   — complexity Médio.
2. **STAGE 2**: spec com 3 requirements (2 ADDED, 1 MODIFIED) e 5 scenarios.
3. **STAGE 3**: validador aponta E002 num requirement sem SHALL/MUST → retry (tentativa 1)
   → STAGE 2 corrige → validador `PASS`.
4. **STAGE 4**: usuário revisa resumo e responde `sim`.
5. **STAGE 5**: artefatos exibidos; usuário opta por salvar →
   `specs/001-notificacao-push-entrega/{proposal.md, spec.md}`.

---

## Versionamento

- **v1.0** — Adaptação do SDD v2 para skill única do Codex.
  - Entrega final user-driven: salvamento em disco opcional e explícito.
  - Correções aplicadas do estudo v2:
    - Convenção única de input interna (`artifacts.*`).
    - `NEEDS_INPUT` formalizado e distinto de `FAIL`.
    - `contract_version` declarado (contrato interno v1.1).
    - Validador completa o catálogo E001–E007 (E006/E007 implementados).
  - Spec aprofundada a nível de engenharia: technical detail por requirement, seção
    `## NON_FUNCTIONAL`, error cases obrigatórios.
- Contrato interno: **v1.1**.
