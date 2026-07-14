---
name: aws-wa-review
description: Perform a full AWS Well-Architected Framework Review (WAFR) across all 6 pillars (Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability). Analyze code, IaC, and architecture to produce evidence-backed findings with prioritized remediation.
---

# Well-Architected Review

## Step 1: Define the workload scope

Ask the user to describe the workload. If they have already provided details or you are in a codebase with IaC, proceed directly.

Determine if a specialized WA Lens applies: Serverless, SaaS, Data Analytics, ML, IoT, Containers, Games, Financial Services, Healthcare, GenAI, Hybrid Networking.

## Step 2: Infrastructure Discovery

Analyze all infrastructure-as-code and deployment configurations:
- CDK, CloudFormation, Terraform, SAM, Serverless Framework
- CI/CD pipeline definitions
- Monitoring and alarm configurations
- Deployment configurations (blue/green, canary, rollback)

Document: resource types, file paths, security configs (IAM, encryption, network), resilience configs (multi-AZ, backups, scaling), cost-relevant configs (instance types, capacity modes).

## Step 3: Application Architecture Discovery

Analyze application code for:
- Entry points (API handlers, event processors, scheduled tasks)
- Service communication (sync/async, retries, timeouts, circuit breakers)
- Data access (queries, caching, connection management)
- Error handling and resilience patterns
- AuthN/AuthZ logic
- Observability (logging, tracing, metrics)

## Step 4: Evaluate ALL 57 WA Framework questions

Assess against ALL 57 questions across 6 pillars. For each question: Status (Implemented/Partially Implemented/Not Implemented/Cannot Determine), Evidence with file:line, Gaps, Risk level.

### Operational Excellence (OPS 1-11)
Organization, priorities, CloudFormation/IaC, CI/CD pipelines, deployment strategies (blue/green, canary, rollback), change management, observability (metrics, logs, traces), incident response, operations runbooks, game days, post-mortems, evolution and continuous improvement, adoption of new services.

### Security (SEC 1-11)
IAM foundations, least privilege, permission boundaries, identity federation, credential management, CloudTrail, GuardDuty, Security Hub, detection and investigation, network protection (VPC, security groups, WAF, API Gateway), compute protection (Lambda, ECS, EC2), data classification, encryption at rest (KMS, S3, EBS, RDS, DynamoDB), encryption in transit (TLS 1.2+), secrets management (Secrets Manager, Parameter Store), incident response automation.

### Reliability (REL 1-13)
Service quotas and limits, network topology (VPC, multi-AZ), workload architecture (distributed systems, loose coupling), distributed system best practices (retries, exponential backoff, circuit breakers), monitoring and alerting for reliability, scaling (horizontal, auto-scaling, predictive), change management (deployment rollback, feature flags), backup and restore strategies, fault isolation (cell-based architecture, sharding), disaster recovery (RTO/RPO, multi-region, active/passive, Pilot Light, Warm Standby).

### Performance Efficiency (PERF 1-5)
Resource selection (compute, storage, database, network), compute optimization (Lambda, ECS, EC2 right-sizing), data and storage optimization (DynamoDB RCU/WCU, S3 performance, RDS Provisioned IOPS), network optimization (CloudFront, Global Accelerator, Direct Connect), performance monitoring and optimization process, experimentation and benchmarking.

### Cost Optimization (COST 1-11)
Financial management and governance (budgets, cost allocation tags), usage governance (AWS Organizations, SCPs), monitoring and anomaly detection (Cost Anomaly Detection, Cost Explorer), decommissioning resources (unused EBS, orphaned resources), service selection (appropriate service for workload), right-sizing (compute, storage, database), pricing models (Reserved Instances, Savings Plans, Spot), data transfer costs, demand management (auto-scaling, scheduled scaling), evolution and process improvement.

### Sustainability (SUS 1-6)
Region selection (carbon-sensitive regions), demand alignment (auto-scaling, serverless), architecture patterns (async, queue-based, event-driven), data management (lifecycle policies, compression, tiered storage), hardware and service selection (Graviton, managed services), organizational processes (carbon tracking, optimization reviews).

## Step 5: Risk Assessment

For each finding, assess Impact x Likelihood:

| Impact | Likelihood | Risk |
|--------|------------|------|
| Severe | High | Critical |
| Severe | Medium | High |
| Severe | Low | High |
| Moderate | High | High |
| Moderate | Medium | Medium |
| Moderate | Low | Medium |
| Minor | High | Medium |
| Minor | Medium | Low |
| Minor | Low | Low |

Identify cross-pillar conflicts (e.g., security controls impacting performance, cost optimizations reducing reliability).

## Step 6: Produce the report

```markdown
# Well-Architected Review: {Workload Name}

## Executive Summary
Date, workload, business criticality, packages analyzed, findings count, overall maturity score (1-5).

## Pillar Scorecard
| Pillar | Score (1-5) | Key Strength | Key Gap |

## Per-Question Assessment
| ID | Question | Status | Risk Level | Evidence |

## Critical and High Risk Findings
For each: ID, pillar, description, evidence (file:line), impact, recommendation, effort.

## Medium and Low Risk Findings
Condensed table format.

## Cross-Pillar Trade-offs
Conflicts identified and recommended resolutions.

## Prioritized Remediation Plan
### Quick Wins (< 1 week)
### Foundation (1-4 weeks)
### Strategic (1-3 months)

## Next Steps
Top 5 concrete actions to start this week.
```

## Step 7: Offer follow-up

Offer to deep-dive into a specific pillar, generate IaC for remediation, create a migration plan, compare against a specific WA Lens, or generate automated compliance checks.

## Calibration Guidance
- Multi-AZ + encryption + CI/CD with rollback + monitoring + auto-scaling = MATURE
- Do not manufacture findings for well-built workloads
- Every finding MUST have code evidence
- "Cannot Determine" is valid when static analysis is insufficient
- Acknowledge strengths prominently
