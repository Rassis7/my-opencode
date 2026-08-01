---
description: Executa tarefa delegada ao codex como slave
---

## Tarefa: $ARGUMENTS

## Procedimento

### 1. Detecte o modo atual da sessão

- Se o contexto contém **"Plan mode ACTIVE"** → codex deve operar em **modo plan**. Prefixe a task assim:
  ```
  You are in plan mode. Only plan, analyze, and research. Do NOT make any edits or execute changes. Task:
  ```
- Caso contrário (ask ou qualquer outro modo) → codex opera em **modo ask**. Prefixe a task assim:
  ```
  You are in ask mode. Task:
  ```

### 2. Detecte o modelo a ser usado

Analise `$ARGUMENTS` para identificar o modelo desejado:

- Se o usuário não informar nenhum, deve pedir para ele escolher um dos abaixo:
  1. gpt-5.6-sol --> Latest frontier agentic coding model.
  2. gpt-5.6-terra --> Balanced agentic coding model for everyday work.
  3. gpt-5.6-luna --> Fast and affordable agentic coding model.
  4. gpt-5.5 --> Frontier model for complex coding, research, and real-world work.
  5. gpt-5.4 --> Strong model for everyday coding.
  6. gpt-5.4-mini --> Small, fast, and cost-efficient model for simpler coding tasks.

### 3. Detecte o nível de esforço de raciocínio

Analise `$ARGUMENTS` para identificar o nível de esforço desejado:

- O usuário deve enviar dos três valores a seguir: **high**, **low**, **medium**
- Caso não seja informado, deve perguntar para ele qual dos três ele deseja

### 4. Execute o codex via bash

```
codex exec '<modo_prefix> $ARGUMENTS' -m <MODEL> -c 'model_reasoning_effort="<EFFORT>"'
```

### 5. Retorne o output

Retorne o output do codex **exatamente como ele veio**, sem modificações, comentários ou explicações adicionais.
