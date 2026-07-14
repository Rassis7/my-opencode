---
name: aws-performance-efficiency
description: Deep-dive performance efficiency review analyzing resource selection, compute optimization, data/storage patterns, networking, and monitoring in IaC and application code. Aligned with the Well-Architected Performance Efficiency pillar (PERF 1-5).
---

# Performance Efficiency Review

## Step 1: Gather context

Workload name, code directories, performance requirements (latency, throughput, concurrency), known bottlenecks. Proceed if context provided.

## Step 2: Infrastructure and Architecture Discovery

Examine:
- Compute: Lambda memory/timeout, ECS/EC2 instance types and sizes, Fargate vs EC2, GPU instances
- Storage: EBS volume types (gp3, io2), S3 performance best practices (multipart upload, byte-range fetches), DynamoDB partition design, RCU/WCU, RDS Provisioned IOPS, ElastiCache node types
- Database: Query patterns, indexes, connection pooling, read replicas, Aurora vs RDS
- Networking: CloudFront distribution, Global Accelerator, Direct Connect bandwidth, NAT Gateway throughput
- Caching: ElastiCache, DAX, CloudFront, API Gateway caching, application-level caching
- Async: SQS FIFO vs standard, Kinesis shards, EventBridge event buses, Lambda async invocations

## Step 3: Application Architecture Discovery

Analyze:
- Cold start mitigation (Lambda SnapStart, provisioned concurrency, warmers)
- Connection pooling and reuse
- Pagination and streaming patterns
- Lazy loading vs eager loading
- Compression (gzip, brotli)
- Parallel processing (SQS batch, S3 event notification batching, Step Functions parallel state)
- Query optimization (DynamoDB query vs scan, index usage, composite keys)

## Step 4: Evaluate against PERF 1-5

PERF 1: Resource selection (fit-for-purpose compute, storage, database, networking)
PERF 2: Compute performance (Lambda memory, Graviton, right-sizing)
PERF 3: Data/storage performance (DynamoDB partitioning, S3 multipart, RDS IOPS)
PERF 4: Network performance (CloudFront, Global Accelerator, TCP vs UDP)
PERF 5: Monitoring and optimization (performance metrics, load testing, benchmarking)

## Step 5: Report

```markdown
# Performance Efficiency: {Workload}
## Executive Summary
Latency/throughput requirements, findings count.
## Performance Scorecard
| Domain | Score (1-5) | Key Strength | Key Gap |
## High Impact Findings
ID | Domain | Description | Evidence | Performance Impact | Recommendation
## Quick Wins
## Strategic Improvements
```

## Calibration
- Lambda with SnapStart + provisioned concurrency + <100ms p99 = well-optimized
- DynamoDB with hot partitions + no DAX + inefficient queries = high-impact finding
- Every finding must have specific resource evidence
