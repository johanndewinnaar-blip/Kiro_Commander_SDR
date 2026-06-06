---
inclusion: always
name: build-artefact-maintenance
description: Maintain governance artefacts after each build. Validate against canonical model.
---

# Build Artefact Maintenance

## After Every Spec / Build Package:

1. UPDATE USE_CASE_REGISTER.md:
   - Add new use cases from this build
   - VALIDATE: every use case cites a REAL entity/fixture/resolver
   - Classify: SYSTEM or AICAP
   - Assign RBAC (or UNASSIGNED)

2. UPDATE PAGE_SCHEDULE.md:
   - New page built → move from SCAFFOLD/PROPOSED to BUILT
   - New outputs → add to page section
   - VALIDATE: every system output references a REAL data source
   - New data gaps identified → add to Data Gaps section
   - New use case without page → add as PROPOSED

3. IF capability diverges from Proposition:
   - Add to PROPOSITION_EVOLUTION.md
   - IF REDIRECTED/SUPERSEDED → FLAG for owner review

4. VALIDATION RULE:
   - NEVER reference an entity that doesn't exist in packages/contracts/src/entities/
   - NEVER reference a fixture that doesn't exist in packages/contracts/src/fixtures/
   - NEVER reference a resolver that doesn't exist in packages/contracts/src/resolvers/
   - If something is NEEDED but doesn't exist → mark as "Data Gap" with what's required
   - The canonical data model IS the source of truth for what the system can do

5. AI MARKERS:
   - Place `{/* AI-PLACEMENT: AICAP-XXX — [desc] */}` in code for each AICAP item


## Connection to Existing Build System

The following existing artefacts remain authoritative for their purpose:

- `REBASELINED_BUILD_SEQUENCE.md` → build unit ORDER and DEPENDENCIES
- `ARCHITECTURAL_DEBT_REGISTER.md` → structural/governance DEBT
- `FEATURE_FUNCTION_BACKLOG.md` → absent CAPABILITIES
- `debt-register.md` → code CONFORMANCE debt
- `score-register.md` → conformance SCORES

The new artefacts (USE_CASE_REGISTER + PAGE_SCHEDULE) COMPLEMENT these. They do NOT replace them.

The relationship:

- Build unit completed → USE_CASE_REGISTER updated with new use cases
- Feature backlog item resolved → USE_CASE_REGISTER shows it as BUILT
- New page proposed → check REBASELINED_BUILD_SEQUENCE for which unit delivers it
- Architectural debt affecting a page → noted in PAGE_SCHEDULE
- PAGE_SCHEDULE PROPOSED items without a build unit → candidates for NEW units in REBASELINED_BUILD_SEQUENCE (flag for owner decision)


## Navigation Hierarchy Rule

- PAGE_SCHEDULE mirrors nav-groups.ts structure
- Every new page MUST declare which nav node it belongs under
- If no nav node exists → either add to existing group or propose new group
- Detail views (reached by item click) don't need nav items but appear in schedule
- When a new spec surfaces new capability → it must find its nav home
  (existing child link OR new child link under existing node OR new node)
- New pages that "float" without a nav path are flagged ORPHAN
