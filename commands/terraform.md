---
description: Assistencia especializada em Terraform, modulos, testes e providers
agent: command-router
---

Carregue a skill Terraform mais adequada antes de responder para: $ARGUMENTS

Regras obrigatorias:
- Interprete a intencao do usuario e carregue a skill Terraform mais especifica disponivel antes de responder.
- Quando o pedido combinar dominios complementares, carregue todas as skills relevantes e entregue uma resposta unificada.
- Prefira skills especificas sobre skills gerais. Use `terraform-style-guide` como fallback para pedidos amplos de HCL, estrutura de codigo e boas praticas.
- Se nenhuma skill Terraform cobrir o pedido com boa precisao, use a documentacao oficial em `https://developer.hashicorp.com/terraform/docs` como fallback antes de responder.
- No fallback de documentacao, pesquise primeiro a pagina mais relevante da doc oficial do Terraform e baseie a resposta nela; se necessario, complemente com paginas oficiais adjacentes da mesma documentacao.
- Se o pedido estiver claramente fora do escopo Terraform, diga isso explicitamente e nao carregue skill Terraform sem necessidade.

Roteamento por intencao:
- HCL, escrever Terraform, revisar `.tf`, convencoes, estrutura de arquivos, naming, variables, outputs, `terraform fmt`, `terraform validate` -> `terraform-style-guide`
- `.tftest.hcl`, `terraform test`, mocks, run blocks, asserts, CI/CD de testes Terraform -> `terraform-test`
- Azure Verified Modules, AVM, certificacao de modulos Azure -> `azure-verified-modules`
- Terraform Search, bulk import, descoberta de recursos existentes, importacao assistida -> `terraform-search-import`
- Refatorar configuracao monolitica em modulo reutilizavel, extrair modulo, design de modulo -> `refactor-module`
- Terraform Stacks, multi-environment, multi-region, orchestracao entre stacks, linked stacks -> `terraform-stacks`
- Novo provider Terraform, scaffold inicial, plugin framework, bootstrap de provider -> `new-terraform-provider`
- Acceptance tests de provider, `TF_ACC=1`, debug de testes, cleanup, sweepers -> `run-acceptance-tests`
- Provider actions, lifecycle operations, custom actions, operacoes assicronas -> `provider-actions`
- Resources e data sources de provider, CRUD, schema, state, import, plan modifiers -> `provider-resources`
- Patterns de teste para providers, `terraform-plugin-testing`, state checks, plan checks, recursos ephemeral -> `provider-test-patterns`
- Documentacao de provider, `tfplugindocs`, Terraform Registry docs, templates em `docs/` -> `provider-docs`

Combinacoes esperadas:
- Escrever Terraform + criar testes -> carregue `terraform-style-guide` e `terraform-test`.
- Refatorar modulo + validar padrao de codigo -> carregue `refactor-module` e `terraform-style-guide`.
- Modulo Azure + requisitos AVM -> carregue `azure-verified-modules` e `terraform-style-guide`.
- Search/import + configuracao HCL final -> carregue `terraform-search-import` e `terraform-style-guide`.
- Novo provider + resources/data sources -> carregue `new-terraform-provider` e `provider-resources`.
- Provider resource + acceptance tests -> carregue `provider-resources`, `run-acceptance-tests` e `provider-test-patterns`.
- Mudanca em provider + docs -> carregue `provider-resources` ou `provider-actions` junto com `provider-docs`.
- Terraform Stacks + modulos compartilhados -> carregue `terraform-stacks` e `refactor-module`.

Fallbacks:
- Se o pedido mencionar Terraform genericamente sem indicar dominio claro, use `terraform-style-guide`.
- Se o pedido for sobre desenvolvimento de provider sem detalhe suficiente, combine `new-terraform-provider` com a skill mais proxima entre `provider-resources`, `provider-actions`, `run-acceptance-tests` e `provider-docs`.
- Se o pedido for sobre Terraform mas estiver fora do alcance claro das skills importadas, nao invente uma resposta: consulte a documentacao oficial do Terraform em `https://developer.hashicorp.com/terraform/docs` e responda a partir dela.
- Se o pedido misturar uma skill conhecida com uma duvida geral de Terraform, carregue a skill relevante e use a documentacao oficial como apoio complementar.
- Se duas skills parecerem igualmente relevantes, carregue ambas em vez de pedir esclarecimento, exceto se houver risco operacional claro.

Entregue:
- Resposta objetiva e pratica, usando a skill carregada como base principal de orientacao.
- Quando cair no fallback, deixe claro qual parte veio da documentacao oficial do Terraform e cite os conceitos ou comandos corretos daquela referencia.
- Quando houver multiplas skills, una as recomendacoes em um fluxo unico e coerente.
- Proximos passos concretos, comandos, exemplos HCL/Go e verificacoes quando isso ajudar a execucao.
