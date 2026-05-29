---
inclusion: always
name: performance-discipline
description: Performance is the third doctrinal pillar of Commander. Top-decile by design, measured continuously, cost-disciplined at every tier. Always-loaded standing rules.
---

# Performance Discipline (always-on)

Performance is doctrine in Commander, equal in standing to the functional doctrine (closed-loop case model, strategy-driven values, surface attribution) and the design doctrine (DS-1.0).

The full constitution lives at `docs/00_authority/PERFORMANCE_DOCTRINE.md` (PD-1.0). Read it for the philosophy, tier model, scorecard maths, layer strategy, workload separation principle, and authority lineage.

This file is the always-on reminder of what that doctrine *requires of every task*, regardless of which spec is being worked on.

## Standing rules (apply to every task)

1. **No Red units may be introduced.** Hook 05 (Performance Compliance) refuses any task that introduces a Red unit. If a task's scorecard returns a new Red unit, the task fails and must be reworked.

2. **No silent regression past tolerance.** Any unit moving Green → Yellow, Yellow → Amber, or Amber → Red on a commit must be flagged, acknowledged, and either accepted (with explicit recorded reason and remediation plan) or reverted. Silent acceptance is forbidden.

3. **Performance contracts are non-negotiable.** When a target cannot be met, the underlying *requirement* gets re-examined, not the target. Targets do not bend silently.

4. **Workload class must be declared on every database call.** Application code declares whether each database operation is `operational-read`, `operational-write`, `ingestion-write`, `analytics-read`, or `reporting-read`. At T1 all classes resolve to a single connection; at T2 and beyond they resolve to separate connections, replicas, or databases. The code does not change between tiers — only the deployment configuration. Tasks that route database calls without an explicit workload class fail Hook 05.

5. **No cross-workload foreign keys.** Tables that may eventually live in different physical databases (per the workload separation principle) must not have foreign keys between them. Referential integrity across workload boundaries is enforced at the application layer or through async messaging.

6. **Tier discipline cuts both ways.**
   - T1 deployment must not adopt T2/T3-only patterns prematurely (wasteful).
   - T1 code must not adopt T1-only shortcuts that block T2/T3 promotion (rewrite trap).
   Every architectural choice is pressure-tested against both directions.

7. **Database Layer is technology-portable across the Postgres family.** Vanilla Postgres, Aurora, Citus, CockroachDB-Postgres-mode, Yugabyte, and Postgres-compatible distributed engines are all valid deployment targets. The application does not depend on engine-specific features that prevent migration between these.

8. **Read models for analytical and reporting reads.** Analytical and reporting workloads route through read model abstractions, even when those read models are views or materialised views in the same database at T1. The abstraction is mandatory; the implementation tier-dependent.

9. **Charts use `--data-*` semantic tokens; no literal hex.** Carries forward from design doctrine but also affects bundle weight discipline — chart libraries must not contribute to bundles of routes that don't render charts.

10. **Strategy values from the strategy layer.** Carries forward from functional doctrine. Hardcoded SLA/routing/priority/threshold values are also performance-blind — they cannot be tuned without code change. Strategy consumption is performance discipline too.

## Mandatory scorecard reporting

Every phase or pass that touches a measurable layer must report scorecard impact in its closing report. The standard format:

```
Scorecard impact:
  Application Layer: {band} ({delta from prior}) — {flags}
  Database Layer:    {band} ({delta from prior}) — {flags}
  Data Layer:        {band} ({delta from prior}) — {flags}
  Infrastructure:    {band} ({delta from prior}) — {flags}
```

Where:
- `{band}` is the layer's overall band (Green/Yellow/Amber/Red, or N/A if no measurable units affected).
- `{delta from prior}` is the change since the previous scorecard for that layer.
- `{flags}` includes "new Red unit," "regression past tolerance," or "no change."

This must appear in every PHASE_RUNNER, TWEAK_PASS, and VERIFY_AND_CLOSE report. Reports without scorecard impact are non-compliant.

## When the scorecard runner is not yet wired

During the build-out of the performance discipline itself, some layers' scorecards may not be machine-runnable yet. During that interim:

- Use the scorecard *principle* — declare which units a task affects and what the expected impact would be.
- Identify Red and Amber units by reasoning against the strategy documents.
- Treat the absence of a runner as a deferral, not an exemption.
- Once the runner lands for a layer, the manual reasoning is replaced by the runner output.

This applies only during the doctrine build-out. Once a layer's scorecard is wired, manual substitution stops.

## Tier awareness

Every task must operate with awareness of the current tier deployment per layer:

| Layer | Current tier |
|---|---|
| Application | T3 (always) |
| Database | T3 design / T1 deployment (no live DB yet) |
| Data | T3 design / T1 deployment (no live pipelines yet) |
| Infrastructure | T1 design / no deployment yet |

Tasks must not assume infrastructure or measurements that don't exist at the current tier. They must also not produce code that blocks tier promotion. The strategy documents define what each tier requires.

## Authority precedence

When in doubt:

- **Functional doctrine** is invariant — never compromise the closed-loop model, surface attribution, or boundaries for performance.
- **Design doctrine** is the visual expression — performance gains that degrade design must be re-examined first.
- **Performance doctrine** is the runtime contract — functional and design choices that breach performance targets must be re-engineered, not exempted.

If a genuine conflict arises that cannot be resolved by re-engineering, stop and report — the conflict itself is a decision that requires owner adjudication.

## Where this discipline is enforced

- **At spec time:** EARS requirements in Spec 02 (Application Layer), Spec 16 (Database + Data Layers — new), Spec 18 (Infrastructure — new).
- **At task time:** Hook 05 (Performance Compliance) — runs the scorecard, refuses Red regressions.
- **At commit time:** the standard hooks plus the scorecard impact reporting requirement above.
- **At session close:** VERIFY_AND_CLOSE runs full scorecards across all four layers, records in CONVERSION_FINDINGS.

The full chain of enforcement is documented in `docs/00_authority/PERFORMANCE_DOCTRINE.md §7`.

## Related authority documents

- `docs/00_authority/PERFORMANCE_DOCTRINE.md` — the constitution.
- `docs/00_authority/APPLICATION_LAYER_STRATEGY.md` — Application Layer detail.
- `docs/00_authority/DATABASE_LAYER_STRATEGY.md` — Database Layer detail.
- `docs/00_authority/DATA_LAYER_STRATEGY.md` — Data Layer detail.
- `docs/00_authority/INFRASTRUCTURE_LAYER_STRATEGY.md` — Infrastructure Layer detail.
- `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` — measurement engineering.

When any of the above documents are referenced or updated, this discipline reflects the latest authoritative state — it does not need to be re-edited as the documents evolve.
