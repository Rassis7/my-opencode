# Execution Plan Template (IA)

Estrutura reutilizavel para que agentes planejem tarefas complexas mantendo disciplina TDD (`Test Fails -> Code -> Green`) e rastreabilidade.

### IMPORTANTE

Sempre execute o `Playbook de Atualizacao` e os `Checks Globais`

## Contexto Rapido

- **Objetivo**: `<descricao do resultado esperado>`
- **Escopo**: `<componentes/servicos tocados>`
- **Restricoes**: `<tempo, dependencias, padroes>`
- **Definicao de Pronto**: `<metricas de sucesso, cobertura, validacoes>`

## Estagios Sequenciais

> Defina estagios granulares e ordenados. Cada estagio deve ser independente e concluido antes do proximo.

### Pre Tasks

> Execute o checklist abaixo antes de executar cada tarefa

- [ ] Obtenha contexto do projeto atraves do AGENTS.md e do contexto expandido se existir
- [ ] Verifique se a tarefa anterior foi concluída e teve seus checklists marcados
- [ ] Se necessário use os subagents e MCPs disponíveis para executar a tarefa

### Task `<n>` - `<nome da entrega>`

[Explicação detalhada do que será feita nessa task no formato de bullet points]

- [ ] **Test Fails** - `<quais suites/fixtures precisam falhar primeiro? quais cenarios exercitar?>`
- [ ] **Code** - `<implementacao necessaria, servicos/rotas/infra tocados>`
- [ ] **Green** - `<quais testes/comandos precisam passar antes de avancar?>`
- [ ] **Notas** - `<riscos, dados de seed, migracoes, feature flags>`

> Copie o bloco acima para cada estagio adicional (Task 1, Task 2, ...), renomeando o titulo para refletir a entrega incremental (ex.: "Contract Alignment", "HTTP Flow", "DX & Docs").

## Checks Globais

- [ ] **Regressao direcionada** - `<rodar suites completas? lint? type-check?>`
- [ ] **DX/Docs** - `<atualizar READMEs, colecoes de API, scripts>`
- [ ] **Observabilidade** - `<dashboards, metricas, alertas>`
- [ ] **Entrega** - `<revisar diff, preparar changelog, comunicacao ao solicitante>`

## Registro de Execucao (preencha durante a execucao)

| Estagio    | Hora de inicio | Resultado      | Observacoes           |
| ---------- | -------------- | -------------- | --------------------- |
| `<Task 0>` | `HH:MM`        | `<ok/pending>` | `<achados, blockers>` |
| `<Task 1>` | `HH:MM`        | `<ok/pending>` | `<achados, blockers>` |
| ...        | ...            | ...            | ...                   |

## Playbook de Atualizacao

1. Valide se o plano ainda e valido antes de executar cada estagio.
2. Atualize checkboxes logo apos completar cada passo para manter visibilidade.
3. Registre desvios (ex.: testes adicionais, hotfixes) na secao de notas do estagio correspondente.
4. Ao finalizar, consolide resultados e proximos passos no relatorio ao solicitante.
