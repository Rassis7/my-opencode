---
name: aws-cost-optimization
description: Deep-dive cost optimization review analyzing waste, right-sizing opportunities, pricing models, data transfer costs, and resource utilization across IaC and architecture. Aligned with the Well-Architected Cost Optimization pillar (COST 1-11).
---

# Cost Optimization Review

## Step 1: Gather context

Workload name, code directories, monthly AWS spend range if known, budget constraints. Proceed if context provided.

## Step 2: Infrastructure Discovery

Examine:
- Compute: EC2 instance types (right-sizing, Graviton), Lambda memory/CPU, ECS/EKS capacity providers, Fargate vs EC2
- Storage: EBS volumes (gp2 vs gp3, IOPS, size), S3 storage classes (Standard vs IA vs Glacier), lifecycle policies, orphaned EBS/snapshots
- Database: RDS instance classes, Provisioned vs Serverless, DynamoDB RCU/WCU utilization, reserved capacity
- Networking: Data transfer costs (NAT Gateway, DX, inter-AZ), CloudFront data transfer, Global Accelerator
- Serverless: Lambda invocations and duration, API Gateway caching, Step Function state transitions

## Step 3: Financial Management Discovery

Examine:
- Cost allocation tags (defined and applied)
- Budget definitions and alerts
- Cost anomaly detection
- AWS Organizations and SCPs for governance
- Decommissioning processes

## Step 4: Evaluate against COST 1-11

COST 1: Financial management (budgets, cost allocation tags, governance)
COST 2: Usage governance (Organizations, SCPs, preventive controls)
COST 3: Monitoring (Cost Anomaly Detection, Cost Explorer, anomaly alerts)
COST 4: Decommissioning (unused resources, orphaned resources, cleanup)
COST 5: Service selection (appropriate service, managed vs unmanaged)
COST 6: Right-sizing (compute, storage, database)
COST 7: Pricing models (RI, Savings Plans, Spot, capacity reservations)
COST 8: Data transfer (minimize inter-AZ, CloudFront, Direct Connect)
COST 9: Demand management (auto-scaling, scheduled scaling, event-driven)
COST 10: Evolution (continuous optimization, new pricing models)

## Step 5: Waste Identification

Flag as HIGH:
- Running non-production instances 24/7
- Over-provisioned RDS/EC2 (idle CPU/memory)
- gp2 volumes when gp3 would save cost
- No lifecycle policies on S3
- NAT Gateway data transfer costs without VPC endpoints
- No RIs or Savings Plans for steady-state workloads
- Unattached EBS volumes, unused EIPs, stale snapshots

## Step 6: Report

```markdown
# Cost Optimization: {Workload}
## Executive Summary
Estimated monthly spend, potential savings, findings count.
## Cost Scorecard
| Domain | Score (1-5) | Key Waste | Savings Opportunity |
## High Impact Findings
ID | Domain | Description | Evidence | Monthly Waste | Savings | Recommendation
## Quick Wins (implement this week)
| Finding | Action | Monthly Savings | Effort |
## Strategic (1-3 months)
| Finding | Action | Monthly Savings | Effort |
```

## Calibration
- A startup MVP spending $50/mo needs different advice than a $50k/mo enterprise
- Right-sizing RDS and EC2 is often the highest-ROI quick win
- Every savings estimate must be backed by specific resource configs
