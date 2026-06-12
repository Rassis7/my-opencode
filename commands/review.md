---
description: Code review with remediation plan
agent: review
---

Review the code for: $ARGUMENTS

This operation will:

1. Analyze the current branch via `git branch --show-current`
2. Inspect the diff with `git diff main...HEAD` to identify stacks
3. Run analysis in parallel with the appropriate specialists:
   - code-reviewer (always)
   - frontend-developer (if frontend files detected)
   - backend-developer (if backend files detected)
   - ai-engineer (if AI/ML files detected)
4. Consolidate findings and generate a remediation plan via the create-plan skill
5. Return results in the standard format
