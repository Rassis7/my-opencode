---
name: aws-reliability-improvement
description: Deep-dive reliability assessment analyzing single points of failure, recovery procedures, scaling strategies, change management, and disaster recovery in IaC and application code. Aligned with the Well-Architected Reliability pillar (REL 1-13).
---

# Reliability Improvement Plan

## Step 1: Gather context

Workload name, code packages/directories, business criticality, RTO/RPO requirements if known. Proceed directly if context provided.

## Step 2: Infrastructure Discovery

Examine:
- VPC and subnet topology (Multi-AZ, NAT Gateway placement)
- Load balancer configs (ALB/NLB, cross-zone, health checks)
- Auto Scaling groups (min/max/desired, health check grace period)
- RDS/Aurora configs (Multi-AZ, read replicas, backup retention)
- DynamoDB configs (on-demand vs provisioned, auto-scaling, global tables)
- SQS/SNS/EventBridge (DLQ, retry policies, max receive count)
- ECS/EKS (service auto-scaling, deployment circuit breaker, task placement)
- Lambda (reserved concurrency, provisioned concurrency, DLQ for async)
- S3 (versioning, replication, lifecycle)
- ElastiCache (Multi-AZ, replication groups, backup)
- Backup plans and vaults

## Step 3: Application Architecture Discovery

Analyze for:
- Service coupling (sync vs async communication)
- Retry policies, exponential backoff, jitter
- Circuit breaker patterns
- Timeout configurations
- Idempotency keys
- Bulkhead patterns (partitioning, cell-based)
- Graceful degradation
- Health check endpoints

## Step 4: Evaluate against REL 1-13

REL 1: Service quotas and limits (monitoring, management)
REL 2: Network topology (multi-AZ, VPC design, bandwidth)
REL 3: Workload architecture (distributed best practices, loose coupling)
REL 4: Distributed systems (retries, backoff, circuit breakers)
REL 5: Monitoring and alerting (SLA-based alarms, composite alarms)
REL 6: Scaling (horizontal, predictive, scheduled)
REL 7: Change management (deployment rollback, feature flags, canary)
REL 8: Backup and restore (automated, tested, RPO-aligned)
REL 9: Fault isolation (cell-based, sharding, bulkheads)
REL 10: Disaster recovery (RTO/RPO, multi-region strategies)
REL 11: Testing reliability (chaos engineering, load testing)
REL 12: Incident response for reliability (runbooks, escalation)
REL 13: Evolution (learning from failures, continuous improvement)

## Step 5: Identify Single Points of Failure

For each component, classify SPOF risk:
- **No SPOF**: Multi-AZ, redundant instances, health checks, auto-recovery
- **Partial SPOF**: Single-AZ but redundant instances OR multi-AZ without health checks
- **Full SPOF**: Single instance, single AZ, no health checks

## Step 6: Risk Assessment

Impact x Likelihood matrix. Report:

```markdown
# Reliability Improvement: {Workload}
## Executive Summary
Criticality, RTO/RPO targets, findings count.
## SPOF Map
| Component | Type | Risk | Mitigation |
## Reliability Scorecard
| Domain | Score (1-5) | Key Strength | Key Gap |
## Critical/High Findings
ID | Domain | Description | Evidence | SPOF? | RTO/RPO Impact | Recommendation
## Prioritized Remediation
Quick Wins (< 1w) | Foundation (1-4w) | Strategic (1-3m)
## DR Strategy
Current vs recommended RTO/RPO per recovery strategy.
```

## Calibration
- Multi-AZ + health checks + auto-scaling + backups tested = MATURE
- A single-AZ production database is always Critical for critical workloads
- RTO/RPO non-compliance is High+
- Every finding needs evidence; "Cannot Determine" when runtime data needed
