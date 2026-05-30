# Conformance Registry — Commander SDR

**Authority:** This is the single source of truth for what "conformant" means in Commander SDR. Every assertion here is enforceable and checked by the core testing pipeline.

**Purpose:** When the testing pipeline runs, it validates every unit against these assertions. Adding a new standard means adding an assertion here, not rewriting the pipeline.

**Debt Tracking:** Conformance violations are classified as Regression / Quick Debt / Structural Debt. Structural debt and failed quick debt are tracked in `docs/00_authority/debt-register.md`.

---

## Design System Contract Assertions

**Source:** `.kiro/steering/design-system-contract.md`

### DSC-001: PageContainer Usage
**Assertion:** All operational pages MUST use PageContainer for layout.  
**Exceptions:** Full-bleed emergency surfaces, master-detail views, auth screens (per DEC-pagecontainer-exceptions).  
**Check:** Grep for `export default function` in `apps/web/src/app/**/*.tsx` and verify PageContainer import.

### DSC-002: Square Corners
**Assertion:** All UI elements MUST have `border-radius: 0`.  
**Check:** No inline `borderRadius` or `border-radius` styles in components. Global enforcement in `globals.css`.

### DSC-003: Tabler Classes Only
**Assertion:** Use Tabler classes for cards, buttons, tables, badges, forms.  
**Check:** No custom CSS classes for structural elements. Use `card`, `btn`, `table`, `badge`, `form-control`.

### DSC-004: Vivid Semantic Colour (Data Only)
**Assertion:** Colour MUST carry semantic meaning. Use vivid colour ONLY for data elements (severity, status, health, trend).  
**Mapping:**
- Critical/P0/Breached → `bg-red`
- High/P1/Warning/At-Risk → `bg-orange`
- Healthy/Resolved → `bg-green`
- Info/P2/Medium → `bg-azure`
- Low/P3 → `bg-secondary`

**Check:** No decorative colour on chrome (sidebar, header, cards, borders).

### DSC-005: Gold Restriction
**Assertion:** Gold appears ONLY in COMMANDER logo wordmark.  
**Check:** No `#D4AF37`, `--tblr-gold`, or gold colour in buttons, badges, borders, text (except logo).

### DSC-006: Font Inheritance
**Assertion:** Inter inherited globally. NEVER override `font-family` per component.  
**Exception:** JetBrains Mono for telemetry, IDs, hashes, numeric values in Mission mode only.  
**Check:** No `fontFamily` overrides in component styles.

### DSC-007: Text Hierarchy
**Assertion:** Use correct Tabler classes for text hierarchy.  
**Mapping:**
- Page title → `page-title`
- Breadcrumb → `page-pretitle`
- Card title → `card-title`
- Section label → `subheader`
- Secondary text → `text-secondary`
- Muted text → `text-muted`

**Check:** No custom heading styles. Use Tabler classes.

### DSC-008: Card Structure
**Assertion:** Cards MUST follow Tabler structure: `card > card-header (card-title + card-actions) > card-body`.  
**Check:** No custom card markup. Use primitives or Tabler pattern.

### DSC-009: Button Variants
**Assertion:** Buttons MUST use Tabler variants: `btn-primary`, `btn-ghost-secondary`, `btn-danger`.  
**Check:** No custom button styles. Use Button primitive or Tabler classes.

### DSC-010: Table Classes
**Assertion:** Tables MUST use `table table-vcenter`. Add `card-table` when inside card. Add `table-hover` for interactive rows.  
**Check:** No custom table styles.

### DSC-011: Status Badges
**Assertion:** Status badges MUST map to semantic colours per DSC-004.  
**Check:** Use StatusBadge primitive or correct `badge bg-*` classes.

### DSC-012: Mode Support
**Assertion:** All components MUST work in light and dark mode via Tabler `data-bs-theme`.  
**Check:** No hardcoded colours that break in one mode. Use Tabler CSS variables.

---

## Token System Assertions

**Source:** `packages/ui/src/tokens/`

### TOK-001: Three-Layer Token System
**Assertion:** Tokens organized as primitives → semantic → components.  
**Check:** No skipping layers. Components reference semantic tokens, semantic tokens reference primitives.

### TOK-002: No Literal Hex in Charts
**Assertion:** Charts MUST use `--data-*` semantic tokens. NO literal hex values.  
**Check:** Grep chart specs for `#` hex values. Must be zero.

### TOK-003: Primitive Token Immutability
**Assertion:** Primitive tokens are immutable. Changes require decision record.  
**Check:** Git history shows no primitive token changes without corresponding DECISIONS.md entry.

---

## Performance Doctrine Assertions

**Source:** `docs/00_authority/PERFORMANCE_DOCTRINE.md` (PD-1.0)

### PERF-001: No Red Units
**Assertion:** No task may introduce a Red scorecard unit.  
**Check:** Run scorecard before/after. Reject if new Red unit appears.

### PERF-002: Regression Tolerance
**Assertion:** Regressions past tolerance (Green→Yellow, Yellow→Amber, Amber→Red) MUST be flagged and acknowledged.  
**Check:** Compare scorecards. Flag silent regressions.

### PERF-003: Workload Class Declaration
**Assertion:** Every database call MUST declare workload class: `operational-read`, `operational-write`, `ingestion-write`, `analytics-read`, `reporting-read`.  
**Check:** Grep database queries for workload class annotation.

### PERF-004: No Cross-Workload Foreign Keys
**Assertion:** Tables in different workload classes MUST NOT have foreign keys between them.  
**Check:** Schema analysis. Referential integrity across workloads enforced at application layer.

### PERF-005: Tier Discipline
**Assertion:** T1 code MUST NOT adopt T1-only shortcuts that block T2/T3 promotion.  
**Check:** Architecture review. No hardcoded assumptions about single-database deployment.

---

## Commander Doctrine Assertions

**Source:** `.kiro/steering/commander-doctrine.md`

### DOC-001: Closed-Loop Case Model
**Assertion:** Cases MUST be created, routed, closed, reopened through system-owned lifecycle rules. Manual case creation/status edit/closure forbidden.  
**Check:** No manual case creation UI. No direct status manipulation.

### DOC-002: P0 Priority Overlay
**Assertion:** P0 and zero-day conditions MUST propagate reason, scope, owner, expiry/review, evidence across relevant surfaces.  
**Check:** P0 cases have all required metadata. Emergency styling applied.

### DOC-003: Three-Application Boundary
**Assertion:** Operational App, Tenant Admin, Commercial Control Plane are distinct surfaces. MUST NOT be merged.  
**Check:** Separate route files, sidebars, top bars, brand lockups per boundary.

### DOC-004: Registry-Driven Runtime
**Assertion:** Routes, menus, page status, feature visibility, build state are registry-driven.  
**Check:** All routes defined in `apps/web/src/registry/`. No hardcoded navigation.

### DOC-005: Four-Stream Intelligence Integrity
**Assertion:** External Threat, External Attack, Internal Behavioural, Posture streams MUST remain distinct.  
**Check:** No invented fifth stream. Stream attribution preserved on records.

### DOC-006: Surface Attribution
**Assertion:** Relevant records MUST preserve `internal_attack_surface` or `external_attack_surface` attribution.  
**Check:** Assets, exposures, cases carry surface attribution where applicable.

### DOC-007: Connector Classes A/B/C/D Only
**Assertion:** Connector classes are A (SOC Telemetry), B (Operational Verdict), C (Configuration State), D (Threat Intelligence). No invented classes.  
**Check:** All connectors map to one of these four classes.

### DOC-008: Verdict Semantics
**Assertion:** Verdicts MUST preserve identity, time, disposition, policy reference, source. Not binary pass/fail.  
**Check:** Verdict records have all required fields.

---

## Architectural Assertions

**Source:** `docs/00_authority/APPLICATION_LAYER_STRATEGY.md`, `DATABASE_LAYER_STRATEGY.md`, etc.

### ARCH-001: Local-First Development
**Assertion:** No live AWS resources during initial conversion.  
**Check:** No AWS SDK calls, no live credentials, no provisioning scripts executed.

### ARCH-002: No Real Vendor APIs Before Phase 2
**Assertion:** Real vendor API integrations forbidden until Phase 2 approval.  
**Check:** All connectors use mock data. No real API keys in code.

### ARCH-003: No n8n, No Custom Kiro Powers
**Assertion:** n8n and custom Kiro powers forbidden during initial conversion.  
**Check:** No n8n workflows, no custom power definitions.

### ARCH-004: Postgres Family Portability
**Assertion:** Database layer MUST be portable across Postgres family (vanilla, Aurora, Citus, CockroachDB, Yugabyte).  
**Check:** No engine-specific features that prevent migration.

---

## Decision Record Assertions

**Source:** `DECISIONS.md`

### DEC-001: PageContainer Exceptions
**Assertion:** Only documented exceptions may skip PageContainer.  
**Exceptions:** Full-bleed emergency surfaces, master-detail views, auth screens.  
**Check:** Any page not using PageContainer MUST have decision record.

### DEC-002: Command Centre Deferred
**Assertion:** Command Centre full build is deferred until functional pages built.  
**Check:** No Command Centre implementation until data-point-to-metric schedule complete.

---

## Adding New Assertions

To add a new conformance standard:

1. Add assertion to this registry with unique ID (e.g., `DSC-013`, `PERF-006`)
2. Document: assertion text, source authority, check method
3. Pipeline automatically enforces on next run
4. No pipeline code changes required

---

## Enforcement

The core testing pipeline (`core-testing-pipeline.md`) validates every unit against these assertions. Failures are classified as:

- **Regression:** New failure introduced by current change → BLOCK and auto-fix (4-attempt halt)
- **Quick Debt:** Pre-existing, low-risk in-place fix → Auto-fix (4-attempt halt), downgrade to structural if fails
- **Structural Debt:** Pre-existing, part of larger unmigrated unit → Register immediately (no auto-fix)

Structural debt and failed quick debt are tracked in `docs/00_authority/debt-register.md` with full scope and scheduled resolution. Debt never blocks commit — it's tracked and scheduled for resolution.

**Status:** ACTIVE — enforced on every "run core testing" invocation.

**Related Documents:**
- `.kiro/testing/core-testing-pipeline.md` — Pipeline execution
- `docs/00_authority/debt-register.md` — Tracked debt
- `.kiro/steering/core-testing-commands.md` — Command invocation
