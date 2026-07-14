---
name: aws-operational-excellence
description: Deep-dive operational excellence review analyzing CI/CD pipelines, IaC practices, observability, incident response, deployment strategies, and operations runbooks. Aligned with the Well-Architected Operational Excellence pillar (OPS 1-11).
---

# Operational Excellence Review

## Step 1: Gather context

Workload name, code directories, team size, deployment frequency, incident response process. Proceed if context provided.

## Step 2: Infrastructure and Process Discovery

Examine:
- **IaC**: CloudFormation/CDK/Terraform, all resources defined as code, code reviews, version control
- **CI/CD**: CodePipeline, GitHub Actions, build stages, test stages, approval gates
- **Deployment strategies**: Blue/green, canary, rolling, feature flags, rollback automation
- **Change management**: Change requests, approval workflows, change windows
- **Observability**: CloudWatch dashboards, structured JSON logging, X-Ray tracing, metric filters, composite alarms, SLO/SLI tracking
- **Incident management**: Runbooks linked to alarms, PagerDuty/OpsGenie integration, escalation policies, severity definitions
- **Operations procedures**: Runbooks stored in Git, blameless post-mortems, game days
- **Business metrics**: Deployment frequency, MTTR, change failure rate, lead time

## Step 3: Evaluate against OPS 1-11

OPS 1: Organization priorities (business goals, operational priorities, team structure)
OPS 2: Organization structure (team ownership, shared responsibility, clear accountability)
OPS 3: IaC and automation (all resources defined as code, configuration management)
OPS 4: CI/CD pipelines (build, test, deploy automation, approval gates)
OPS 5: Deployment risk (blue/green, canary, feature flags, instant rollback)
OPS 6: Change management (change process, approvals, communication, change windows)
OPS 7: Observability (metrics, logs, traces, dashboards, alarming, SLOs)
OPS 8: Incident response (runbooks, escalation, on-call, severity levels, post-mortems)
OPS 9: Operations readiness (runbooks, playbooks, pre-launch checklists)
OPS 10: Event management (scheduled events, capacity events, maintenance windows)
OPS 11: Evolution (continuous improvement, learning from incidents, experimentation)

## Step 4: Report

```markdown
# Operational Excellence: {Workload}
## Executive Summary
Deployment frequency, MTTR, findings count.
## Ops Scorecard
| Domain | Score (1-5) | Key Strength | Key Gap |
## Critical/High Findings
ID | Domain | Description | Evidence | Operational Impact | Recommendation
## Quick Wins (< 1 week)
- Enable structured logging, composite alarms, runbook URLs in alerts
## Foundation (1-4 weeks)
- CI/CD pipeline, deployment automation, Game Day scheduling
## Strategic (1-3 months)
- SLO/SLI framework, chaos engineering, automated rollback
```

## Calibration
- IaC + CI/CD + blue/green + runbooks + post-mortems + game days = MATURE
- Manual deployments in production are always a High finding
- Missing runbooks are High+ when alarms exist without remediation procedures
- Every finding must have code evidence; "Cannot Determine" when runtime data needed
