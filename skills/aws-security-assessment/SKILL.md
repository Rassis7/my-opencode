---
name: aws-security-assessment
description: Deep-dive security posture assessment by analyzing IAM policies, encryption configs, network rules, compute protection, and detection/response controls in IaC and application code. Aligned with the Well-Architected Security pillar (SEC 1-11).
---

# Security Assessment

## Step 1: Gather context

Ask the user for the workload name, code directories to analyze, and compliance requirements (SOC2, HIPAA, PCI-DSS, FedRAMP, GDPR). Proceed directly if context is already provided.

## Step 2: Identity and Access Management Discovery

Examine all IAM configurations:
- IAM role definitions (trust + permission policies)
- Permission boundaries and service-linked roles
- Resource-based policies (S3, KMS, SQS)
- Cognito/Identity Center, API Gateway authorizers, Lambda execution roles

Flag as HIGH RISK:
- `"Action": "*"` or `"Resource": "*"` on mutating actions
- Cross-account trust without conditions
- Missing permission boundaries on privileged roles
- Long-lived credentials (access keys in code)

## Step 3: Encryption and Data Protection Discovery

Examine:
- KMS key definitions, key policies, rotation settings
- Encryption at rest on S3, EBS, RDS, DynamoDB, EFS, Secrets Manager
- Encryption in transit (TLS versions, security policies, listeners)
- Certificate management (ACM)
- Secrets management (Secrets Manager vs env vars vs hardcoded)

Flag as HIGH RISK:
- Storage without encryption at rest
- TLS < 1.2 on any endpoint
- Secrets in env vars, config files, or hardcoded strings
- KMS keys without rotation

## Step 4: Network Protection Discovery

Examine:
- VPC, subnets, route tables, Internet/NAT Gateways
- Security group rules (ingress/egress)
- Network ACLs, WAF web ACLs
- VPC endpoints (interface + gateway)
- Load balancer security (listeners, security policies)
- API Gateway endpoint types

Flag as HIGH RISK:
- SG ingress `0.0.0.0/0` on non-443/80 ports
- `0.0.0.0/0` on SSH (22) or RDP (3389)
- Public subnets with databases or internal services
- No WAF on internet-facing endpoints
- Missing VPC endpoints for S3/DynamoDB

## Step 5: Detection and Response Discovery

Examine:
- CloudTrail trails and log file validation
- GuardDuty detector and findings export
- Security Hub standards and insights
- Config Rules for security compliance
- VPC Flow Logs
- CloudWatch security alarms (root login, unauthorized API calls)
- Automated remediation (Lambda, Step Functions)

## Step 6: Compute Protection Discovery

Examine:
- Lambda runtime, VPC config, reserved concurrency
- ECS/EKS task definitions (privileged mode, user, capabilities)
- EC2 launch templates (IMDSv2, security groups)
- Container image scanning
- SSM Session Manager vs SSH

Flag as HIGH RISK:
- Privileged containers without justification
- IMDSv1 enabled
- No container image scanning
- SSH enabled where SSM suffices

## Step 7: Evaluate against SEC 1-11

SEC 1: Secure operation (baselines, account separation, threat detection)
SEC 2: Identity management (centralized identity, role separation, MFA)
SEC 3: Permission management (least privilege, boundaries, analysis)
SEC 4: Detection and investigation (CloudTrail, GuardDuty, Security Hub)
SEC 5: Network protection (VPC segmentation, SGs, WAF)
SEC 6: Compute protection (patching, scanning, runtime)
SEC 7: Data classification (tags, Macie, catalog)
SEC 8: Data at rest protection (encryption everywhere)
SEC 9: Data in transit protection (TLS 1.2+, HTTPS)
SEC 10: Incident response (automation, forensics, containment)

## Step 8: Risk Assessment

Same Impact x Likelihood matrix as wa-review. Report format:

```markdown
# Security Assessment: {Workload}
## Executive Summary
Findings: X Critical, Y High, Z Medium, W Low. Compliance scope.
## Security Scorecard
| Domain | Score (1-5) | Key Strength | Key Gap |
## Critical/High Findings
ID | Domain | Description | Evidence | Impact | Recommendation | Effort
## Medium/Low Findings
Condensed table.
## Compliance Mapping
If compliance specified: Finding ID -> SOC2 | HIPAA | PCI-DSS
## Prioritized Remediation
Quick Wins (< 1w) | Foundation (1-4w) | Strategic (1-3m)
```

## Calibration
- Encryption everywhere + least-privilege IAM + VPC segmentation + GuardDuty + Security Hub = MATURE
- TLS < 1.2 is always Critical, weak ciphers always High
- Every finding needs code evidence
- "Cannot Determine" is valid when runtime data is needed
