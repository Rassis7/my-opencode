---
name: aws-sustainability
description: Deep-dive sustainability review analyzing carbon efficiency, resource utilization, architecture patterns, data management, and hardware/service selection in IaC and application code. Aligned with the Well-Architected Sustainability pillar (SUS 1-6).
---

# Sustainability Optimization

## Step 1: Gather context

Workload name, code directories, region(s), sustainability goals if stated. Proceed if context provided.

## Step 2: Infrastructure Discovery

Examine:
- Compute: Graviton vs x86 instances, Lambda ARM64, ECS Fargate vs EC2, serverless vs provisioned
- Storage: S3 storage classes, lifecycle policies, compression, deduplication
- Database: Serverless vs provisioned (Aurora Serverless, DynamoDB on-demand), read replicas vs caching
- Architecture patterns: Event-driven vs polling, async vs sync, batch processing vs real-time
- Region selection: carbon-sensitive regions, data gravity, edge vs regional

## Step 3: Evaluate against SUS 1-6

SUS 1: Region selection (choose regions with lower carbon intensity, optimize data transfer)
SUS 2: Demand alignment (auto-scaling, serverless, scheduled scaling to match demand)
SUS 3: Architecture patterns (async, queue-based, batch, event-driven to minimize idle)
SUS 4: Data management (lifecycle policies, compression, tiered storage, data retention)
SUS 5: Hardware and service selection (Graviton, ARM64, managed services, right-sizing)
SUS 6: Process and culture (carbon tracking, optimization reviews, sustainability KPIs)

## Step 4: Report

```markdown
# Sustainability: {Workload}
## Executive Summary
Region, compute architecture, findings count.
## Sustainability Scorecard
| Domain | Score (1-5) | Key Strength | Key Gap |
## Findings
ID | Domain | Description | Evidence | Carbon Impact | Recommendation
## Quick Wins
- Graviton migration, lifecycle policies, compression
## Strategic
- Re-architecture to event-driven, region strategy
```

## Calibration
- Graviton + serverless + auto-scaling + lifecycle policies = MATURE
- Migrating from x86 to Graviton reduces carbon ~60% with minimal effort
- Every finding backed by code evidence
