---
name: render-router
description: Classify Render requests and route them to the Render MCP or official docs.
---

## Purpose
Use this skill when the user mentions Render and you need to decide whether to execute an action or research or document it.

## Decision rules
- If the user wants to run, inspect, update, deploy, query, or otherwise operate on Render resources, use Render MCP tools.
- If the user wants a doubt answered, docs searched, a topic explained, or a task planned, use the official Render docs at `https://render.com/docs`.
- If the request is mixed, split the response into execution and research.
- If the intent is still unclear, ask one focused clarifying question.

## Execution mode
Use the smallest safe Render MCP call first.
Typical read and ops tools include:
- `render_list_services`
- `render_get_service`
- `render_list_deploys`
- `render_get_deploy`
- `render_get_metrics`
- `render_list_logs`
- `render_query_render_postgres`

## Research mode
- Start with the official docs at `https://render.com/docs`.
- Prefer the most relevant page for the topic before summarizing.
- Summarize only what is needed to answer the user.

## Safety
- Confirm destructive or irreversible actions before proceeding.
- Prefer read-only checks before making changes.
