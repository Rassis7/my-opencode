---
name: repo-reverse-engineering
description: Analyzes repositories to reconstruct their architecture, behavior, and technical understanding through systematic reverse engineering workflow.
license: MIT
compatibility: opencode
metadata:
  audience: engineers, architects, analysts
  workflow: repository-analysis
---

## What I do

I perform systematic reverse engineering of repositories to understand their technical architecture, behavior patterns, and generate actionable insights for any business context you specify.

## How I work

I execute a 4-phase analysis using specialized subagents:

**Phase 1: Recognition** (repo-scout)
- Clone or analyze local repository structure
- Identify technology stack, entry points, build systems
- Map file organization and naming conventions

**Phase 2: Architecture Mapping** (architecture-mapper) 
- Identify core modules and their responsibilities
- Map dependencies between components
- Understand data flow and control patterns

**Phase 3: Behavior Analysis** (behavior-tracer)
- Trace execution flows and use cases
- Identify side effects (database, files, network, external services)
- Understand business logic and algorithmic patterns

**Phase 4: Evidence Validation** (evidence-auditor)
- Cross-check findings with tests, documentation, examples
- Validate hypotheses against actual code behavior
- Separate confirmed facts from working assumptions

## When to use me

Use this when you need to understand:
- How an existing system works internally
- What technologies and patterns are used
- How different parts interact and depend on each other
- Key behaviors, risks, and architectural decisions
- Any aspect needed for refactoring, migration, or new implementation

## What you need to provide

**Repository:** GitHub URL or local path
**Context:** Your specific goal - what you want to achieve with this understanding

Examples of contexts:
- "Decompose the knowledge to create a similar system"
- "Identify core patterns to generate a new repository"
- "Find specific files/patterns for migration"
- "Understand the architecture for refactoring"
- "Extract business logic for analysis"

## Output

I provide a structured technical report with:
- **Executive Summary**: High-level system understanding
- **Technical Stack**: Identified technologies and frameworks
- **Architecture Overview**: Core modules and relationships  
- **Entry Points**: How the system starts and is invoked
- **Main Flows**: Key execution pathways and use cases
- **External Integrations**: APIs, databases, services, side effects
- **Business Context**: How this relates to your specific goals
- **Confidence Levels**: Facts vs hypotheses for each finding
- **Next Steps**: Recommended actions based on your context