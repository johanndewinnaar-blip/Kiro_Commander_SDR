# Commander SDR v2.5.1 — Shell Reference vs Build Authority Doctrine, Pre-Build Editorial Increment

## Status
Committed baseline update. Supersedes v2.5 authority and register documents. Retains all v2.5 product doctrine.

## Purpose
v2.5.1 is an editorial pre-build increment that formalises the relationship between the active HTML shell references and the binding specification set, route/menu registry, feature registry and build packs. It removes the ambiguity that the HTML shell drawing might be read as an inventory of features, menus, routes, consoles or admin surfaces.

The Operational Consoles, expanded Tenant Admin groups, expanded Platform menu items and full Commercial Control Plane structure shall be built per the specification set, irrespective of HTML shell drawing.

## Added
- **Spec #56** — Shell Reference vs Build Authority Doctrine. New binding doctrine spec.
- `00_AUTHORITY_AND_PRECEDENCE_v2_5_2.md` — supersedes v2.5 authority file.
- `00_SPECIFICATION_REGISTER_v2_5_1.md` — supersedes v2.5 register.
- `CURRENT_BASELINE_MANIFEST_v2_5_1.md` — supersedes v2.5 manifest.
- `RELEASE_NOTES_v2_5_1.md` — this document.

## Amended
- **Spec #35** — v2.5.1 supersession addendum. Required Primary Navigation list is superseded by Spec #54. Required Consoles list is retained and route-placed via Spec #47/#54 addenda.
- **Spec #47** — v2.5.1 active-shell correction addendum. Body references to `commander-sdr-shell-v10-p0-zero-day.html` and `commander-control-plane-shell-v2-p0-zero-day.html` corrected to the v11 / v3 active shells. Operational Console routes registered under their owning domains.
- **Spec #48** — v2.5.1 scope narrowing addendum. Shell authority narrowed to geometry, layout, usability and application-boundary visual treatment. Shell is no longer authoritative for menu, route, console, panel or admin inventory.
- **Spec #54** — v2.5.1 Operational Console route registration addendum. Ten consoles registered as sub-routes with build-pack ownership.
- `SDR_Feature_Registry_FR001_v1_0.md` — v2.5.1 canonical-source declaration. Registry is confirmed as the canonical feature inventory consumed by `BP-VIS-00`.

## Locked
All v2.5 lock items are carried forward and reaffirmed:

- Build mode shows all registered menu items.
- Runtime suppresses menus by RBAC, entitlement, feature flag, environment and policy state.
- Search appears before Commander AI and is not cramped.
- Sidebar scroll is visible and supports deep menus.
- Expand/collapse is structurally represented in the shell and must be dynamically implemented during frontend build.
- Baseline configuration profiles cover risk, controls frameworks, SLA, routing, validation, P0, automation, AI, RBAC, rule packs and models.
- Tenant Admin applies/customises baselines; Commercial Control Plane owns/version-controls templates and allocations.

v2.5.1 additionally locks:

- The HTML shell references are reference, not inventory.
- The spec set, route/menu registry, feature registry and approved build packs supersede the HTML shell.
- A feature, menu item, route, console or admin surface specified in the binding set shall be built irrespective of HTML shell drawing.
- No build pack may decline a specified item on the grounds that it is "not in the shell".
- The Ten Operational Consoles are formally registered as sub-routes with build-pack ownership.
- The full Tenant Admin twelve-group menu tree per Spec #49 is binding irrespective of shell drawing.
- The full thirteen-item Platform menu per Spec #54 is binding irrespective of shell drawing.
- The full Commercial Control Plane menu per Spec #54 and Spec #49 is binding irrespective of shell drawing.

## Not Changed
- Closed-loop case doctrine.
- P0 as priority overlay.
- No manual case creation.
- Three-application model.
- Military-intelligence UI doctrine.
- Shell geometry.
- Top navigation restraint (7 items per Spec #54).
- Baseline Configuration Profile coverage.
- Master Proposition.
- Master Technical Specification.

## Retired
- `00_AUTHORITY_AND_PRECEDENCE_v2_5.md` — replaced.
- `00_SPECIFICATION_REGISTER_v2_5.md` — replaced.
- `CURRENT_BASELINE_MANIFEST_v2_5.md` — replaced.

## Next Stage Alignment
The Next Stage Approach Pack v1.2 binds to this baseline. All build-pack streams (BP-VIS, BP-ADMIN, BP-RULE, BP-MODEL, BP-BASE, BP-MISSION, BP-CCP, BP-SHELL and the core BP-00 through BP-13 sequence) read from this baseline. A companion Next Stage Approach Pack v1.3 alignment note will be issued to reflect the v2.5.1 increment; no build-pack stream definitions change.
