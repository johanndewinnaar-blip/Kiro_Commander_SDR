# PERF_AUDIT — Full Performance Scorecard Audit

**Purpose:** Run the complete performance scorecard across all four layers and produce a comprehensive report. Used for periodic deep audits, pre-release verification, post-rebuild verification, or on-demand investigation of performance concerns.

**Authority chain:** `docs/00_authority/PERFORMANCE_DOCTRINE.md` (PD-1.0) → `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` (TTF-1.0) → the four layer strategy documents.

**Steering:** Always-on `.kiro/steering/performance-discipline.md` applies.

---

## Template — paste this and parameterise as needed

```
Use docs/00_authority/prompts/PERF_AUDIT.md.

Audit scope: {full | application-only | database-only | data-only | infrastructure-only}
{Optional: focus on routes/components/queries — list them}
{Optional: comparison baseline scorecard timestamp}

Begin.
```

---

## What this template does

When invoked, executes the following standardised workflow:

### 1. Pre-audit checks

- Confirm working copy is clean (no uncommitted changes).
- Confirm branch is in sync with origin.
- Capture current HEAD commit SHA and branch name for the scorecard header.
- Record the current tier state per layer (Application T3, Database design T3 / deploy T{X}, Data design T3 / deploy T{X}, Infra T{X}).

### 2. Build the application for measurement

For Application Layer measurements to be valid, run a production build:

```
pnpm build
```

Confirm the build succeeds before proceeding. If the build fails, the audit cannot proceed — surface the build failure as the audit result.

### 3. Application Layer scorecard

Per APPLICATION_LAYER_STRATEGY.md (ALS-1.0):

**Lighthouse audits** (per route class targets in §4):
- Class A routes: `/war-room/p0` — target LCP <0.8s, score ≥98
- Class B routes: `/`, `/cases`, `/cases/my`, `/cases/[id]` (representative case) — target LCP <1.0s, score ≥95
- Class C routes: `/cases/analytics` — target LCP <1.5s, score ≥90
- Class D routes: any admin / control plane routes — target LCP <1.5s, score ≥90
- Class E routes: detail surfaces — target LCP <1.2s, score ≥93

For each route, run Lighthouse three times in production mode (1920×1080, broadband throttling), use the median.

**Bundle analysis** (per route caps):
- Per-route gzipped JS bundle against class cap
- Per-route gzipped CSS bundle < 20KB
- Shared chunks < 120KB
- Largest single chunk < 80KB
- Chart library presence on non-chart routes (must be zero)

**Static analysis** (per ALS-1.0 §5):
- `'use client'` boundary count per route
- Hardcoded styling values (zero tolerance)
- Memoisation discipline on expensive components
- Workload class declarations on API calls
- Unbounded list rendering patterns

**Component-level** (manual or Profiler-assisted):
- Signature component initial render times
- Re-render counts on live data components

**Interaction timing** (if Playwright suite is wired):
- Route navigation, mode toggle, sidebar collapse, expandable row toggle, filter apply, search

For each measurable unit, compute score via TTF-1.0 §3 formula, classify per §2 bands. Tally per-band counts. Determine overall layer band per §4.

### 4. Database Layer scorecard

Per DATABASE_LAYER_STRATEGY.md (DBL-1.0):

**Static structural units** (always measurable):
- Tenant-scoped tables with `tenant_id` column — every table inspected
- Tenant-leading composite indexes — every tenant-scoped table inspected
- Cursor pagination compliance — every paginated query inspected
- Offset pagination occurrences — scan for any offset/limit pagination patterns
- Cross-workload foreign keys — schema inspection
- GIN indexes on queried JSONB columns — schema + query inspection
- Forbidden engine-specific features — query and migration code inspection
- High-volume tables with partition-ready design — schema inspection
- Connection context discipline — application code inspection
- Domain schema segmentation — schema inspection

**Live-runtime units** (deferred unless DB is live):
- p95 query latencies — mark as deferred and identify the milestone
- Sequential scans — deferred
- Index usage rates — deferred
- Lock contention, replication lag, connection pool saturation — all deferred

For static units, compute scores. For deferred units, list with their `deferred_until` milestone. Compute layer band over measurable units only.

### 5. Data Layer scorecard

Per DATA_LAYER_STRATEGY.md (DL-1.0):

**Static structural units**:
- Workload class declarations on data access (100% target)
- Cache interface adoption (zero direct cache impls in app code)
- Search interface adoption
- Read model interface for analytics
- Queue interface for async work
- Surface attribution preservation through transformations
- No direct operational-table reads for analytics
- Cache invalidation rules declared per key prefix

**Live-runtime units**: ingestion throughput, queue depths, cache hit rates, search latency, read model freshness, end-to-end signal latency, backpressure activations — all deferred until pipelines and instrumentation are live.

### 6. Infrastructure Layer scorecard

Per INFRASTRUCTURE_LAYER_STRATEGY.md (IL-1.0):

**Static structural units**:
- IaC coverage for the current tier
- Environment-agnostic application code
- Externalised configuration
- Secrets via secrets manager / parameter store
- Tier promotion path documentation

**Live-runtime units**: application server response times, autoscaling response, deploy time, rollback time, cost per tenant, uptime, tracing coverage — all deferred until live AWS deployment.

### 7. Cross-layer summary

Combine the four layer reports into a single document. Compute:

- Overall product band (weakest layer wins).
- Layers with Red units (full list).
- Top 5 highest-priority remediation items across layers.
- Comparison to previous scorecard if `docs/00_authority/scorecards/LATEST.json` exists.

### 8. Persist the scorecard

Write the structured JSON and human-readable markdown to `docs/00_authority/scorecards/`:

- `{ISO 8601 timestamp}-{branch}-{commit-short-sha}.json`
- `{ISO 8601 timestamp}-{branch}-{commit-short-sha}.md`

Update the `LATEST.json` pointer.

### 9. Report

Output the scorecard in the canonical format (TTF-1.0 §7), embedded in the chat response. Include the file paths where it has been persisted.

If any Red units are present, surface them prominently. If regressions from the previous scorecard are detected, name them explicitly.

### 10. Build viability signal

Conclude with a build viability signal:

- **PASS** — no Red units across any layer.
- **FLAG** — Yellow regressions or Amber units present, no Reds.
- **FAIL** — any Red unit present on any layer.

---

## Execution discipline

The standard execution-discipline rules apply:

- Main agent execution.
- No sub-agent.
- No application code modifications during the audit (read-only operation).
- Static analysis and measurement only.
- Stop and report if any instrument is missing or fails to run; do not skip silently.
- Authority documents are the source of truth for targets, units, and bands.

---

## Output requirements

The audit MUST produce:

1. A complete scorecard report in canonical format.
2. Both the JSON and markdown artefacts persisted in `docs/00_authority/scorecards/`.
3. A build viability signal (PASS / FLAG / FAIL).
4. Remediation references for every Red and Amber unit.
5. Delta-from-previous summary if a previous scorecard exists.

Reports without all five elements are non-compliant audits.

---

## When to invoke this template

- **Pre-release verification** — before any production deployment.
- **Periodic deep audits** — monthly or quarterly.
- **Post-rebuild / post-migration** — after significant infrastructure or schema changes.
- **External performance concerns** — when a customer or stakeholder raises a specific concern.
- **Pre-tier-promotion** — before promoting any layer between tiers.
- **Investigative** — when scorecard hooks have flagged patterns worth examining holistically.

Not for routine task validation — that's Hook 05's job. PERF_AUDIT is for the deep, full-coverage view.

---

## Authority

This template references and operates under:
- `docs/00_authority/PERFORMANCE_DOCTRINE.md` (PD-1.0)
- `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` (TTF-1.0)
- `docs/00_authority/APPLICATION_LAYER_STRATEGY.md` (ALS-1.0)
- `docs/00_authority/DATABASE_LAYER_STRATEGY.md` (DBL-1.0)
- `docs/00_authority/DATA_LAYER_STRATEGY.md` (DL-1.0)
- `docs/00_authority/INFRASTRUCTURE_LAYER_STRATEGY.md` (IL-1.0)
- `.kiro/steering/performance-discipline.md` (always-on steering)
