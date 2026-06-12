---
description: Run browser automation with evidence via playwright-cli
agent: command-router
---

Load the `playwright-cli` skill before you start.

Run browser automation for: $ARGUMENTS

Mandatory rules:

- Use the `playwright-cli` commands from the loaded skill to run the flow in the browser.
- Define or safely infer: goal, URL or base URL, mode (`anonymous`, `authenticated`, or `auto`), allowed domains, and success criteria.
- In authenticated mode, use credentials only if they are already available in context and never expose secrets in the output.
- Collect evidence during the run: initial snapshot, success/failure evidence, and console/network when it helps diagnosis.
- Stop the flow if CAPTCHA, MFA, unexpected SSO, out-of-scope redirect, or an unauthorized irreversible action appears.

Deliver:

- Final status: passed, failed, or inconclusive.
- Mode used, relevant URLs, and main steps executed.
- Evidence collected and what it proves.
- Blockers, risks, and the next concrete action.
