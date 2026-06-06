---
inclusion: always
name: development-mode
description: Controls which governance checks run during active development vs branch completion.
---

# Development Mode Governance

## Active Development (Default During Feature Work)

During active feature development, the following governance applies:

### ACTIVE (always run):
- Authority preflight (read authority before changes)
- Doctrinal assertions (case ownership, SOC boundary, system-first) — via steering awareness, not post-task hook
- Secure coding / RBAC enforcement — via steering awareness, not post-task hook
- Pre-commit hook (secrets, sourcing rules) — this is `.githooks/pre-commit`, unchanged

### SUSPENDED (run manually or at branch completion):
- Post-task review hook
- Docs change control hook
- Performance compliance hook (05)
- Arch-debt auto-propose hook
- Data dictionary generation hook
- Knowledge workspace sourcing rule hook (pre-commit already catches this)
- Translation layer leak prevention hook (pre-commit already catches this)
- Unified post-task governance hook

### FAST CHECK (run after every commit instead of full pipeline):
```bash
pnpm tsc --noEmit && pnpm build
```

This gives type-safety and build verification without the full governance sweep.

---

## Governance Mode (Branch Completion / Pre-Merge)

When the branch is ready for merge, invoke full governance:

### Trigger Command:
```
run governance mode
```

### What This Does:
1. Re-enables all suspended hooks temporarily
2. Runs `run core testing all` (full conformance sweep)
3. Runs the unified post-task governance check on all uncommitted work
4. Generates run log, updates score register and debt register
5. Reports PASS/FLAG/FAIL for the branch

### Manual Invocation of Individual Checks:
- `run core testing [scope]` — full pipeline on specified scope
- `test my last build` — pipeline on last commit only
- `show audit scores` — current conformance scores
- `show debt register` — tracked debt status

---

## Switching Modes

### Development Mode (default):
Active feature building. Fast iteration. Pre-commit hook catches secrets and sourcing violations. Type-check and build verify correctness. Doctrinal awareness is via steering (Kiro reads the doctrine), not via per-task hook overhead.

### Governance Mode (explicit invocation):
Branch completion. Full conformance. All hooks fire. Score register updated. Debt register reconciled. Run log created. Use before merge to main.

---

## Rationale

The pre-commit hook (`.githooks/pre-commit`) already catches:
- ARCH-DEBT-001 (translation-layer citations in knowledge/authority files)
- Forbidden source citations in docs/knowledge/
- SEC-001 hardcoded secrets (AWS keys, private keys, JWTs, credential patterns)
- Governance runner integrity checks (if `scripts/governance-check.cjs` exists)

Duplicating these checks via Kiro hooks during active development adds latency without catching additional issues. The hooks are valuable at branch completion for the full conformance review.

---

## What Remains Active During Development

| Check | Mechanism | When |
|---|---|---|
| Authority preflight | Kiro hook (promptSubmit) | Every prompt |
| Secrets detection | `.githooks/pre-commit` | Every commit |
| Sourcing rule | `.githooks/pre-commit` | Every commit |
| Translation-layer leak | `.githooks/pre-commit` | Every commit |
| Type safety | `pnpm tsc --noEmit` | Fast check |
| Build integrity | `pnpm build` | Fast check |
| Doctrinal awareness | Steering files (always loaded) | Every prompt |

## What Activates at Branch Completion

| Check | Mechanism | When |
|---|---|---|
| Unified post-task governance | Kiro hook | `run governance mode` |
| Performance compliance | Kiro hook / scorecard | `run governance mode` |
| Docs change control | Kiro hook | `run governance mode` |
| Data dictionary generation | Kiro hook | `run governance mode` |
| Arch-debt auto-propose | Kiro hook | `run governance mode` |
| Full conformance pipeline | Core testing commands | `run core testing all` |
