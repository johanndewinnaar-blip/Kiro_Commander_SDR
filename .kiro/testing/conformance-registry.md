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

## Secure-Coding Assertions

**Source:** `.kiro/steering/security-and-testing.md`; `.kiro/hooks/secure-coding-rbac-enforcement.kiro.hook`.

**Scope note:** During Phase 0 documentation-only work these assertions describe the gate that activates the moment any application code is authorised. They are enforced by the `Secure-Coding and RBAC Enforcement` hook on every postTaskExecution.

### SEC-001: No Hardcoded Secrets
**Assertion:** No source file MAY contain hardcoded credentials, API keys, tokens, passwords, private keys, OAuth client secrets, HMAC signing keys, or connection strings carrying credentials.
**Exception:** Documentation snippets that are clearly examples must use placeholders (`<your-key-here>`, `xxxx`, `EXAMPLE_KEY`).
**Check:** Pattern scan for high-entropy strings, AWS-style `AKIA…`, Bearer tokens, `password=`, `secret=`, `apikey=`, `BEGIN PRIVATE KEY`, real-looking connection strings. Hard FAIL on detection.

### SEC-002: Input Validation on User-Facing and API Inputs
**Assertion:** Every endpoint, form handler, message processor, or queue consumer MUST validate inputs (type, length, format, allowed values) before use.
**Check:** New routes / handlers without schema validation, allowlist, or type validation are rejected.

### SEC-003: Authentication on Protected Routes
**Assertion:** Every route, endpoint, or sensitive read/write operation that is not explicitly public MUST enforce authentication via middleware before reaching handler logic.
**Check:** Routes lacking auth middleware are rejected. Hard FAIL when introducing a protected route without auth.

### SEC-004: No Secrets or PII in Logs
**Assertion:** Logging MUST NOT emit secrets, tokens, full request bodies containing credentials, or PII without redaction.
**Check:** Log calls printing known-sensitive fields (`password`, `token`, `apikey`, `authorization`, `set-cookie`, full request bodies) are flagged.

### SEC-005: Parameterised Queries Only
**Assertion:** Database operations MUST use parameterised queries or query builders. String-concatenated SQL with user input is forbidden.
**Check:** Hard FAIL on detection of string-built SQL where the input includes user-derived values.

### SEC-006: Dependency Hygiene
**Assertion:** New dependencies MUST use exact or pinned versions. Open ranges are flagged. Names that resemble typosquatting variants of well-known packages are flagged.
**Check:** Manifest changes inspected at addition; unpinned and suspect names raise warnings.

---

## RBAC and Tenant-Isolation Assertions

**Source:** Spec #19 v2.6 (Full RBAC Permission Matrix); Spec #50 (RBAC, Entitlement, Feature Flag Menu Visibility); Spec #75 (Internal Risk Investigation Sub-Lifecycle); Spec #17 §Acceptance Criteria; Spec #29 v2.0 patch §2 No.10. Enforced by the `Secure-Coding and RBAC Enforcement` hook.

### RBAC-001: Backend / API Permission Enforcement Authoritative
**Assertion:** Per Spec #50 §Backend Enforcement Rule, frontend visibility is presentation, not security. Every privileged operation MUST enforce permission server-side.
**Check:** Hard FAIL on patterns where a privileged action gates only on UI visibility without backend / API authorisation.

### RBAC-002: Tenant Isolation at Every Layer
**Assertion:** Per Spec #17 §Acceptance Criteria, tenant isolation MUST be enforced at API, service, repository, worker, and UI layers. Cross-tenant reads are forbidden. Every query, every cache key, every storage path scoped by `tenant_id`.
**Check:** Hard FAIL on tenant-id-as-user-input patterns where the caller could spoof tenant; on queries lacking tenant scope; on shared cache keys without tenant prefix.

### RBAC-003: Internal Risk Authority Gate on Identity-Level Surfaces
**Assertion:** Per Spec #75 §4 and Spec #19 v2.6, any code path surfacing identity-level detail on the Internal Operating Picture, Identity Intelligence Surface (behavioural section), Verdict Pattern case full detail, or verdict drill-through MUST require Internal Risk authority and emit audit-of-access events.
**Check:** Hard FAIL on identity-level surface code without authority gate or without audit-of-access emission.

### RBAC-004: Audit-First Operation
**Assertion:** Per Spec #29 v2.0 patch §2 No.10, every privileged action MUST emit an audit event with actor, tenant, action, target, and timestamp.
**Check:** Hard FAIL on new privileged operations lacking audit-event emission.

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

### ARCH-005: Data Dictionary Completeness
**Assertion:** An entity in `packages/contracts/src/entities` or `packages/db/src/schema` with no corresponding DATA_DICTIONARY.md entry = INCOMPLETE.  
**Check:** Cross-reference entity files against `docs/knowledge/DATA_DICTIONARY.md` catalogue. Flag missing entries.  
**Source:** `docs/knowledge/DATA_DICTIONARY.md` maintenance rules.

### ARCH-006: Build-Stream Sequencing
**Assertion:** A unit tagged 'Team 2' in `REBASELINED_BUILD_SEQUENCE.md` MUST NOT be built until `USE_CASE_SCHEDULE.md` and `PAGE_INVENTORY.md` exist AND `PAGE_INVENTORY.md` contains an entry for that unit. Only 'Foundational' units are buildable now.  
**Check:** MECHANICAL file-existence + grep check:
1. Read `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` and extract the unit's schedule tag
2. If tag is 'Team 2':
   - Check if `docs/knowledge/USE_CASE_SCHEDULE.md` exists → FAIL if absent
   - Check if `docs/knowledge/PAGE_INVENTORY.md` exists → FAIL if absent
   - Grep `PAGE_INVENTORY.md` for the unit's ID or name → FAIL if no match found
   - If all checks pass, allow build
3. If tag is 'Foundational', allow build (no prerequisites)
**Source:** `DEC-build-stream-sequencing-enforced` (DECISIONS.md); `.kiro/steering/execution-discipline.md` §Build-stream sequencing.  
**Debt Type:** Sequencing violations are classified as Structural Debt (cannot be auto-fixed; requires prerequisite documents to be created first).

### ARCH-007: Blocking-Debt Prerequisite (Readiness State Machine)
**Assertion:** A unit MUST NOT be built unless its computed `Status` in `REBASELINED_BUILD_SEQUENCE.md` is READY. A unit is READY iff (a) every dependency unit is DONE, AND (b) every ARCH-DEBT item mapped to the unit or any unit in its dependency chain has Status RESOLVED. Building a unit whose `Status` is BLOCKED — whether blocked by an unbuilt dependency OR by open chain debt — is a sequencing violation.  
**Check:** MECHANICAL file-existence + grep check, covering BOTH the unbuilt-dependency case AND the open-debt case:
1. Read `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md`; locate the unit being built and read its `Status` and `Blocked by` lines.
2. If `Status` is `BLOCKED` → FAIL with the `Blocked by` contents (names the blocking dependency units and/or ARCH-DEBT IDs).
3. **Dependency case:** for each dependency unit named in the unit's `Dependencies`/`Blocked by`, grep its `Status` in the sequence → FAIL if any dependency is not `DONE`.
4. **Open-debt case:** for each ARCH-DEBT ID named in the unit's `Blocked by` (or mapped to its dependency chain), grep that ID's `Status` in `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md` → FAIL if any is `OPEN` (not `RESOLVED`).
5. If `Status` is `READY` (all deps DONE, all chain debt RESOLVED), allow build.
6. A unit's own resolving debt (the ARCH-DEBT the unit exists to close) is excluded from the chain-debt check (it does not self-block).
**Source:** `DEC-build-readiness-state-machine` (DECISIONS.md); `.kiro/steering/execution-discipline.md` §Build-readiness state machine. Extends ARCH-006 (build-stream sequencing).  
**Debt Type:** Readiness violations are Structural Debt (cannot be auto-fixed; require the blocking dependency to be built or the blocking debt to be resolved first).  
**Enforcement:** Wired into `.kiro/testing/core-testing-pipeline.md` (Stage 2 conformance checks) and auto-run via the `Post-Task Review` hook (postTaskExecution).

### ARCH-008: Readiness-Machine Integrity
**Assertion:** The readiness state machine in `REBASELINED_BUILD_SEQUENCE.md` and `ARCHITECTURAL_DEBT_REGISTER.md` MUST remain internally consistent. Three mechanical checks enforce this:

**(a) No orphan build-debt:** Every OPEN item in `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md` with `Debt class: build-debt` MUST map to at least one unit in `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` (either as the unit's own resolving debt, or named in a `Blocked by` line). An OPEN build-debt item that appears in no unit's `Blocked by` and is not the resolving target of any unit = orphan build-debt → FAIL. Items with `Debt class: governance-debt` are excluded from this mapping requirement (they are tracked open but resolved by reconciliation/decision, not by building a unit).
**Check:** Grep `ARCHITECTURAL_DEBT_REGISTER.md` for all `### ARCH-DEBT-NNN` entries with `Status: OPEN` AND `Debt class: build-debt`. For each, grep `REBASELINED_BUILD_SEQUENCE.md` for that ID. If zero matches → FAIL ("orphan build-debt: ARCH-DEBT-NNN has no mapped unit").

**(b) No unstatused units:** Every `### Unit N:` header in `REBASELINED_BUILD_SEQUENCE.md` MUST be followed (within 4 lines) by a `**Status:**` line containing one of `BLOCKED`, `READY`, or `DONE`. A unit header without a status line = unstatused → FAIL.
**Check:** Grep `REBASELINED_BUILD_SEQUENCE.md` for `### Unit \d+:` headers. For each, read the next 4 lines and confirm a `**Status:** (BLOCKED|READY|DONE)` line exists. If absent → FAIL ("unstatused unit: Unit N").

**(c) Built-but-blocked detection:** If a unit's `Status` is `BLOCKED` but the unit's primary deliverable file exists on disk (untracked or modified), flag "built-but-blocked — do not commit as done." This catches the case where code was produced for a BLOCKED unit before the readiness gate was enforced.
**Check:** For each unit with `Status: BLOCKED`, extract the first deliverable path from the unit's `Deliverables` section (the `packages/db/src/schema/` or `packages/contracts/src/` path). If that file exists on disk (tracked or untracked) → FLAG ("built-but-blocked: Unit N has code on disk at [path] but Status is BLOCKED — do not commit as DONE until status flips READY→DONE through the gate").

**Source:** `DEC-readiness-integrity-check` (DECISIONS.md). Extends ARCH-007 (Blocking-Debt Prerequisite) and `DEC-build-readiness-state-machine`.
**Debt Type:** Integrity violations are classified as Structural Debt (require manual reconciliation — either map the orphan debt to a unit, add the missing status, or resolve the blocking condition before committing the built code).
**Enforcement:** Wired into `.kiro/testing/core-testing-pipeline.md` (Stage 2 conformance checks) and auto-run via the `Post-Task Review` hook (postTaskExecution).

### ARCH-009: Verification-Before-Done
**Assertion:** A unit MUST NOT be marked DONE, and a debt item MUST NOT be marked RESOLVED, without a recorded **Verification** line that cites: (a) the baseline spec #N the deliverable was checked against, and (b) the evidence (test result, grep output, diff output, or explicit review reference). Status (RESOLVED/DONE) is TRUSTED only when a verification record exists; without it, the status is unproven.

**Ceiling (stated explicitly):** This check enforces that verification was **recorded with evidence** — NOT that the verification was correct. Correctness of the evidence remains human review. The check is mechanical: grep for the verification record tied to the unit/debt ID; FAIL if absent.

**Check:** MECHANICAL grep-based:
1. **For units marked DONE:** grep `REBASELINED_BUILD_SEQUENCE.md` for the unit's section. Confirm a `**Verification:**` line exists within the unit's section containing both (a) a baseline spec citation (pattern: `#\d+` or `Spec #\d+`) and (b) an evidence reference (pattern: one of `test`, `grep`, `diff`, `review`, `typecheck`, `migration`, `pipeline`). If absent → FAIL ("Unit N marked DONE without verification record").
2. **For debt items marked RESOLVED:** grep `ARCHITECTURAL_DEBT_REGISTER.md` for the debt item's section. Confirm a `**Verification:**` line exists (or a History line containing `RESOLVED` with evidence citation). Pattern: the History line for the RESOLVED transition must contain both a baseline/source citation and an evidence type. If absent → FAIL ("ARCH-DEBT-NNN marked RESOLVED without verification record").
3. **Unverified status:** items that fail this check are re-statused to `RESOLVED-unverified` (debt) or `DONE-unverified` (units) until a verification line is added. This is a flag, not a revert — the work may be correct but the proof is missing.

**Retroactive application:** On first run, audit all existing RESOLVED/DONE statuses. Any lacking a verification record are flagged and re-statused per rule 3 above.

**Source:** `DEC-verification-before-done` (DECISIONS.md). Extends ARCH-007 (Blocking-Debt Prerequisite) and ARCH-008 (Readiness-Machine Integrity).
**Debt Type:** Verification-gap violations are classified as Quick Debt (the fix is adding the verification line with evidence — a documentation operation, not a code change).
**Enforcement:** Wired into `.kiro/testing/core-testing-pipeline.md` (Stage 2 conformance checks) and auto-run via the `Post-Task Review` hook (postTaskExecution).

---

## Decision Record Assertions

**Source:** `DECISIONS.md`

### DEC-001: PageContainer Exceptions
**Assertion:** Only documented exceptions may skip PageContainer.  
**Exceptions:** Full-bleed emergency surfaces, master-detail views, auth screens.  
**Check:** Any page not using PageContainer MUST have decision record.

### DEC-002: Command Centre Deferred (scoped to Unit 16b)
**Assertion:** The Command Centre **aggregate/posture rollup (Unit 16b)** full build is deferred until functional pages built. The **operational entry-point surface (Unit 16a)** is NOT deferred.  
**Check:** No Unit 16b aggregate/posture-metric implementation until the data-point-to-metric mapping artifact exists (resume trigger). Unit 16a (operational entry-point surface) is unaffected by this assertion.  
**Authority:** `DEC-command-centre-split-16a-16b` (DECISIONS.md, 2026-06-02), resolving ARCH-DEBT-026; supersedes the prior single-Command-Centre scope of this assertion.

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
