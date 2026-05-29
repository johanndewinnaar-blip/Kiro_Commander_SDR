# Commander SDR — Test and Tolerance Framework

**Version:** TTF-1.0
**Status:** Authoritative. Operates under `PERFORMANCE_DOCTRINE.md` (PD-1.0).
**Purpose:** Defines *how* performance is measured, scored, and enforced across the four layers. The engineering of the scorecard discipline.
**Authority:** This document is the deep authority for measurement methodology, the scorecard runner specification, the static analysis check engine, the tolerance bands and scoring formulas, and the integration of measurement into the build process.

---

## 1. Scope

This framework specifies:

- The four bands and per-unit scoring (canonical reference; bands defined in PD-1.0 §4 are restated here for completeness).
- Measurement methods per unit class.
- The scorecard runner — what it must do, inputs, outputs, integration points.
- Static analysis check engine — TypeScript AST traversal rules.
- Lighthouse runner configuration.
- Bundle analyser integration.
- Playwright interaction timing harness.
- EXPLAIN ANALYZE harness (when DB live).
- Synthetic data generators for representative volumes.
- Historical scorecard storage and regression comparison.
- Remediation guidance generation rules.
- Output format specifications.
- Integration with Hook 05 and the prompt templates.

Not in scope: the targets themselves (those live in the layer strategy documents), the philosophy (lives in PD-1.0).

---

## 2. The four bands (canonical)

| Band | Range | Meaning |
|---|---|---|
| **Green** | 95–100% | Above par — meets or exceeds target |
| **Yellow** | 85–94% | Slight drift — watch |
| **Amber** | 60–84% | Below par — remediation required |
| **Red** | under 60% | Failing — urgent remediation |

Bands are contiguous. There is no gap. Amber covers 60–84%. Red is everything below 60%.

---

## 3. Per-unit scoring formulas

### 3.1 Smaller-is-better metrics

For metrics where lower is better (latency, bundle size, render time, query duration, cost):

```
score = (target ÷ measured) × 100%
capped at 100% if measured ≤ target
```

Examples (target 1.0s LCP):
- Measured 0.8s → capped at 100% → Green
- Measured 1.0s → 100% → Green
- Measured 1.05s → 95% → Green
- Measured 1.15s → 87% → Yellow
- Measured 1.25s → 80% → Amber
- Measured 1.70s → 59% → Red
- Measured 2.00s → 50% → Red

### 3.2 Bigger-is-better metrics

For metrics where higher is better (throughput, cache hit rate, test coverage, uptime):

```
score = (measured ÷ target) × 100%
capped at 100% if measured ≥ target
```

Examples (target 90% cache hit rate):
- Measured 92% → capped at 100% → Green
- Measured 86% → 96% → Green
- Measured 80% → 89% → Yellow
- Measured 70% → 78% → Amber
- Measured 55% → 61% → Amber
- Measured 50% → 56% → Red

### 3.3 Boolean / categorical metrics

For pass/fail static-analysis checks (e.g. "all tenant-scoped tables have tenant_id"):

```
score = (passing units ÷ total units) × 100%
```

The score then maps to a band per the same thresholds.

---

## 4. Layer aggregation

The overall band for each layer is determined by **the proportion of units classified as Green**:

| Layer band | Green proportion |
|---|---|
| Green | 95–100% of units are Green |
| Yellow | 85–94% are Green |
| Amber | 60–84% are Green |
| Red | under 60% are Green |

**Override:** any layer with one or more Red units carries a "Red unit present — remediation required" flag, regardless of overall band.

---

## 5. Measurement readiness

Per PD-1.0 §4.5, every unit declares its readiness state:

- **`measurement_live`** — measurable now via runtime instrumentation
- **`measurement_static`** — measurable now via static analysis
- **`measurement_deferred`** — defined now, measured when its milestone arrives

Deferred units appear in scorecards but do not count toward the Green proportion calculation. They are reported in a separate "Deferred" section.

Each deferred unit specifies its `deferred_until` milestone explicitly.

---

## 6. The scorecard runner specification

The scorecard runner is a package in the repository (likely `packages/perf-scorecard/`) that produces scorecard output by combining measurements across multiple instruments.

### 6.1 Required behaviour

The runner must:

1. **Read layer strategy documents** to discover the declared units, targets, tolerance bands, measurement methods, and readiness states. Strategy documents contain a structured units declaration section (format defined in §6.2) that the runner parses.

2. **Invoke the appropriate measurement instrument** per unit:
   - Lighthouse for route-level application metrics.
   - Bundle analyser for application bundle sizes.
   - Static analysis engine for code-level checks.
   - Playwright timing harness for interaction units (when wired).
   - EXPLAIN ANALYZE harness for query plan units (when wired).
   - Cache / queue / search metric collectors for data layer runtime units (when wired).
   - CloudWatch / AWS metrics for infrastructure units (when wired).

3. **Score each unit** per the formulas in §3.

4. **Classify each unit's band** per the thresholds in §2.

5. **Aggregate per layer** per §4.

6. **Produce scorecard output** in the canonical format (§7).

7. **Persist historical scorecards** for regression comparison (§9).

8. **Generate remediation guidance** for Red and Amber units per §8.

9. **Return a structured exit signal** that Hook 05 can interpret (pass / fail / flag).

### 6.2 Strategy document units declaration format

Each layer strategy document contains a structured section (YAML or similar) declaring its units. The runner parses this section. Example:

```yaml
units:
  - id: route-command-centre-lcp
    layer: application
    name: "Command Centre — LCP"
    type: smaller-is-better
    target: 1.0  # seconds
    target_unit: seconds
    measurement: lighthouse
    measurement_config:
      route: "/"
      viewport: 1920x1080
      throttling: broadband
      runs: 3
      aggregate: median
    readiness: live

  - id: schema-tenant-leading-composites
    layer: database
    name: "Tenant-scoped composite indexes lead with tenant_id"
    type: bigger-is-better
    target: 100  # percent
    target_unit: percent
    measurement: static
    measurement_config:
      check: tenant-leading-composites
    readiness: static

  - id: db-p95-list-query-latency
    layer: database
    name: "p95 query latency — operational list reads"
    type: smaller-is-better
    target: 100  # milliseconds
    target_unit: milliseconds
    measurement: explain_analyze
    readiness: deferred
    deferred_until: "T1 live database wired with representative volume"
```

The format is finalised when the runner is implemented; this is the indicative shape.

### 6.3 Inputs

- Layer strategy documents (read for units declarations).
- A built application (for Lighthouse and bundle analysis).
- A running application server (for interaction timing).
- A live database with representative seed data (for runtime DB units; absent at T1 until wired).
- Live AWS infrastructure (for runtime infra units; absent until first deployment).
- Previous scorecard runs (for regression comparison).

### 6.4 Outputs

- A structured scorecard JSON file: `docs/00_authority/scorecards/{timestamp}.json`
- A human-readable scorecard markdown file: `docs/00_authority/scorecards/{timestamp}.md`
- A summary suitable for Hook 05 to interpret (pass/fail/flag).
- Remediation guidance markdown per Red and Amber unit, embedded in the report.

### 6.5 Integration points

- Invoked by **Hook 05** on `postTaskExecution`.
- Invoked by **PHASE_RUNNER.md** template at task close.
- Invoked by **TWEAK_PASS.md** template at pass close.
- Invoked by **VERIFY_AND_CLOSE.md** template at session close.
- Invokable standalone via **PERF_AUDIT.md** template.

---

## 7. Canonical scorecard output format

Every scorecard report follows this structure:

```
Commander SDR — Performance Scorecard
Generated: {ISO 8601 timestamp}
Branch: {git branch}
Commit: {git SHA}
Tier state: Application T3 / Database T3 design T{X} deploy / Data T3 design T{X} deploy / Infra T{X}

══════════════════════════════════════════════════════
Application Layer
══════════════════════════════════════════════════════
{N} units total — {live} live, {static} static, {deferred} deferred

Green   (95–100%)  : {count} units — {pct}
Yellow  (85–94%)   : {count} units — {pct}
Amber   (60–84%)   : {count} units — {pct}
Red     (<60%)     : {count} units — {pct}

Overall layer band: {BAND}
Red units present: {YES/NO}

Red units:
  {unit name} — {measurement}, score {score}%, target {target}
    Reference: {strategy doc section}
    Likely cause: {static analysis derived cause if any}
    Suggested remediation: {prompt template invocation}

Amber units (queue):
  ...

Deferred:
  ...

Delta from previous scorecard ({previous_timestamp}):
  + {N} new Green units
  - {N} units regressed
  Specific regressions:
    {unit name}: {previous band} → {new band} (score {prev}% → {new}%)

══════════════════════════════════════════════════════
Database Layer
══════════════════════════════════════════════════════
... (same structure)

══════════════════════════════════════════════════════
Data Layer
══════════════════════════════════════════════════════
... (same structure)

══════════════════════════════════════════════════════
Infrastructure Layer
══════════════════════════════════════════════════════
... (same structure)

══════════════════════════════════════════════════════
Cross-Layer Summary
══════════════════════════════════════════════════════
Overall product band: {WEAKEST LAYER BAND}
Layers with Red units: {LIST}
Highest-priority remediation queue (across layers): {TOP 5}

Build viability: {PASS / FAIL / FLAG}
  PASS — no Red units present, no Yellow regressions
  FLAG — Yellow regressions present but no Reds
  FAIL — Red units present or Red regressions introduced
```

The runner produces this exact structure every time. Tooling that consumes scorecards (Hook 05, CI dashboards) parses it deterministically.

---

## 8. Remediation guidance generation

For every Red and Amber unit, the runner generates remediation guidance combining:

1. **Reference to the strategy document section** that defines the unit's contract.
2. **Likely cause from static analysis** (where determinable).
3. **Suggested prompt template invocation** to remediate.

Guidance examples (illustrative):

```
Red unit: /cases/analytics — LCP 3.2s, score 31%
  Reference: APPLICATION_LAYER_STRATEGY.md §4.3 (Class C analytical routes)
  Likely cause (static analysis):
    - vega-embed loaded synchronously (large library on critical path)
    - Bundle size 380KB exceeds Class C cap of 200KB
  Suggested remediation:
    TWEAK_PASS.md invocation:
      Pass name: "/cases/analytics chart-loading optimisation"
      Scope:
        - Convert vega-embed import to dynamic import
        - Defer chart rendering until after first paint
        - Verify bundle size returns under 200KB cap
```

```
Red unit: Schema indexing — 0 indexes beyond primary keys
  Reference: DATABASE_LAYER_STRATEGY.md §5.1 (Standard composite indexes)
  Likely cause: No indexing pass has been run on the current Drizzle schema
  Suggested remediation:
    PHASE_RUNNER.md invocation:
      Phase: "Database Layer indexing pass — apply standard composite indexes per DBL-1.0 §5"
      Scope: Add (tenant_id, id), (tenant_id, created_at DESC), and per-query indexes
      to every tenant-scoped table in the schema.
```

The runner produces guidance for every Red and Amber unit, embedded in the scorecard report.

---

## 9. Historical scorecard storage

The runner persists every scorecard to `docs/00_authority/scorecards/`:

- `{ISO 8601 timestamp}-{branch}-{commit-short-sha}.json` (structured)
- `{ISO 8601 timestamp}-{branch}-{commit-short-sha}.md` (human-readable)

A symlink or pointer file `docs/00_authority/scorecards/LATEST.json` points to the most recent.

### 9.1 Regression comparison

When the runner produces a new scorecard, it loads `LATEST.json` (now the previous) and computes:

- Units that moved up a band (improvements).
- Units that moved down a band (regressions).
- Net change in each band's count.
- Specific unit-by-unit deltas.

These appear in the "Delta from previous scorecard" section of the report.

### 9.2 Trend reporting

Periodically (e.g. via PERF_AUDIT.md), the runner can produce a trend report across the last N scorecards, showing each layer's band history over time. Useful for understanding whether the build is trending toward or away from compliance.

---

## 10. Measurement methods — per instrument

### 10.1 Lighthouse runner

Configuration:
- Production build (`pnpm build && pnpm start`)
- Lighthouse CI v0.13+ or equivalent
- Form factor: desktop
- Viewport: 1920×1080
- Throttling: simulated broadband (10 Mbps down, 5 Mbps up, 40ms RTT)
- Runs: 3 per route
- Aggregate: median value used
- Categories: performance (others optional)

Output captured per route:
- LCP, FCP, TTI, CLS, TBT
- Performance score
- JavaScript execution time
- Total bytes
- Render-blocking resources

### 10.2 Bundle analyser

Uses `@next/bundle-analyzer` or equivalent. Configuration:

- Run during a build with `ANALYZE=true`.
- Output gzipped sizes per chunk per route.
- Identify which packages contribute to each chunk.
- Flag any chunk > 80KB gzipped.
- Flag any route bundle exceeding its class cap.

### 10.3 Static analysis engine

TypeScript AST traversal. Implementation is part of the scorecard runner package.

Checks performed:
- Hardcoded styling values (carries from design doctrine enforcement)
- `'use client'` boundary counts per route
- Memoisation discipline (React.memo on expensive components)
- Workload class declarations on database / data calls
- Unbounded list rendering patterns
- Chart library imports on non-chart routes
- Cache interface adoption (vs direct cache implementations)
- Search interface adoption
- Read model abstraction usage
- Pagination patterns (cursor vs offset)
- Foreign key boundary crossing
- Engine-specific Postgres feature usage
- Index coverage against query patterns
- Surface attribution preservation through code paths

Each check produces a pass/fail per file/per query, aggregated into a percentage score per unit.

### 10.4 Playwright interaction timing

Test specs in `apps/web/perf/interactions.spec.ts` (or equivalent path). Each named interaction:

```
test('mode toggle latency', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const measurements = [];
  for (let i = 0; i < 5; i++) {
    const start = performance.now();
    await page.click('[data-testid="mode-toggle"]');
    await page.waitForSelector('[data-mode="mission"]');
    const end = performance.now();
    measurements.push(end - start);
  }

  const median = measurements.sort()[2];
  // report median for scorecard
});
```

Runs against a production build. Median of 5 runs used.

### 10.5 EXPLAIN ANALYZE harness (deferred)

Activated when T1 live database is wired with representative seed volume.

Harness:
1. Loads the seed-generated representative dataset (per §11).
2. For each catalogued query in the application:
   - Captures the query SQL via Drizzle introspection.
   - Runs `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)`.
   - Parses the plan.
   - Checks: no sequential scans on tables > 10k rows; expected index used; execution time within target.
3. Reports per-query: plan summary, execution time, index usage, scorecard band.

### 10.6 Live runtime metrics collectors (deferred per category)

- **Cache metrics**: ElastiCache CloudWatch metrics + application-side hit/miss instrumentation.
- **Queue metrics**: SQS CloudWatch metrics + queue depth probes.
- **Search metrics**: OpenSearch CloudWatch metrics + query latency tracking.
- **Infrastructure metrics**: CloudWatch dashboards + custom metrics where needed.

Each collector activates when the corresponding infrastructure component is deployed.

---

## 11. Synthetic data generators

For meaningful database and data layer testing, representative seed volumes are required. The scorecard runner depends on a synthetic data generator that produces:

| Volume profile | Tenants | Cases per tenant | Assets per tenant | Activity events |
|---|---|---|---|---|
| T1 representative | 10 | 1,000 | 50,000 | 500,000 |
| T2 representative | 100 | 10,000 | 500,000 | 5,000,000 |
| T3 representative | 50 (large) | 50,000 | 5,000,000 | 50,000,000 |

The generator produces data that:
- Honours the canonical data model (Spec 04).
- Has realistic distributions (case priorities skewed toward P3/P4, ages skewed toward recent, ownership skewed across multiple analysts).
- Preserves surface attribution on every record.
- Validates against contract.

Generator implementation lives in `packages/perf-scorecard/seed/` or similar. Activated when live DB measurements become relevant.

---

## 12. Hook 05 integration

Hook 05 (`.kiro/hooks/05-performance-compliance.kiro.hook`) invokes the runner on `postTaskExecution`. The hook flow:

1. Detect which files the task modified.
2. Determine which layer(s) those files affect.
3. Run the runner scoped to affected layers (full run for high-impact changes).
4. Compare to the previous scorecard.
5. Make a decision:
   - **PASS** — no new Red units, no Yellow regressions, no band downgrades. Hook approves.
   - **FLAG** — Yellow regressions or new Amber units. Hook approves with warning surfaced to operator.
   - **FAIL** — new Red unit or Green → Amber/Red regression. Hook refuses; task must address before commit.

Hook output is appended to the task report.

---

## 13. Integration with prompt templates

### 13.1 PHASE_RUNNER.md

Adds a step at the end of every phase:

```
After the phase's work is complete and tests pass:
- Invoke the scorecard runner against affected layers.
- Append the scorecard summary to the phase report.
- If new Red units appear, do NOT commit; surface them as remediation required.
- If Yellow regressions appear, commit with explicit acknowledgement in the report.
- The phase report MUST include the scorecard summary block.
```

### 13.2 TWEAK_PASS.md

Adds a similar step at pass close:

```
After the tweak pass is complete:
- Run the scorecard against the layers the pass touched.
- Compare to the pre-pass scorecard.
- Report deltas: improvements, regressions, no-change.
- Refuse to close the pass if it introduced a new Red unit.
```

### 13.3 VERIFY_AND_CLOSE.md

Runs full scorecard across all four layers as part of close-out. Output written to `CONVERSION_FINDINGS.md` as part of the session entry.

### 13.4 PERF_AUDIT.md (new)

Standalone template for full-scorecard runs. Invoked when:
- Periodic deep audits.
- Before significant releases.
- After a major rebuild or migration.
- When investigating performance concerns raised externally.

---

## 14. Interim discipline (before runner is fully wired)

During the build-out of the scorecard runner itself, full automated runs may not yet be possible for every unit. During the interim:

- **Manual scorecard reasoning** is acceptable, per the performance steering file.
- Every phase report still includes a scorecard impact block, even if the assessments are reasoned manually against strategy documents.
- The runner is built incrementally — Application Layer first (Lighthouse + bundle analyser, fastest to wire), then static checks, then live database checks when DB is wired.
- The discipline applies from day one; the tooling matures session-by-session.

Once the runner is fully wired for a layer, the manual reasoning is replaced by runner output. The discipline does not weaken — it only becomes easier to enforce.

---

## 15. Standing rules for the framework itself

1. **No measurement without a target.** Every unit measured must have a declared target in its strategy document. Untargeted measurement is observability, not scorecard.
2. **No target without a measurement method.** Every target declared must have a documented measurement method. Untestable targets are aspirations, not contracts.
3. **No band assignment without scoring.** Every band classification must trace to a score computed by the formulas in §3. Subjective band assignment is forbidden.
4. **No silent unit retirement.** Removing a unit from the framework requires an explicit decision record. Quiet removal is forbidden.
5. **No exemption without recorded rationale.** A unit that consistently fails for defensible reasons (third-party dependency limits, hardware constraints, etc.) may be exempted only via an explicit decision in DECISIONS.md with a review date.
6. **Historical scorecards are append-only.** No editing or deleting past scorecards. The trend record is the audit trail.

---

## 16. Authority and lineage

This framework operates under `PERFORMANCE_DOCTRINE.md` (PD-1.0). It is referenced by:

- All four layer strategy documents (which declare units in the format this framework parses).
- `.kiro/steering/performance-discipline.md` (always-on steering).
- `.kiro/hooks/05-performance-compliance.kiro.hook` (invokes the runner specified here).
- All updated prompt templates (which require scorecard reporting per this framework).

This document is the deep authority for measurement methodology and scorecard discipline. Where any other document conflicts on measurement specifics, this one wins.
