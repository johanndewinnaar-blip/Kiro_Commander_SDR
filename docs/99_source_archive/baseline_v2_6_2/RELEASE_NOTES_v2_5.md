# Commander SDR v2.5 — Pre-Build Navigation, Admin and Baseline Configuration Alignment

## Status
Committed baseline update.

## Purpose
v2.5 is the final pre-build alignment pass before build-pack generation. It preserves the core v2.4 product doctrine while adding the missing admin/control surface architecture, menu visibility model, rule/model governance surfaces, structured mission binding, baseline configuration profiles and shell usability corrections.

## Added
- Spec #49 Admin Control Surface Information Architecture.
- Spec #50 RBAC / Entitlement / Feature Flag Menu Visibility.
- Spec #51 Rule, Model and Decision Governance Surface.
- Spec #52 Structured Mission Objective Binding Model.
- Spec #53 Shell UI Usability Correction.
- Spec #54 Pre-Build UI Navigation and Route Baseline v2.5.
- Spec #55 Baseline Configuration, Framework, Model and Defaults.
- Active shell reference: `commander-sdr-shell-v11-admin-navigation.html`.
- Active shell reference: `commander-commercial-control-plane-shell-v3-admin-navigation.html`.

## Locked
- Build mode shows all registered menu items.
- Runtime suppresses menus by RBAC, entitlement, feature flag, environment and policy state.
- Search appears before Commander AI and is no longer cramped.
- Sidebar scroll is visible and supports deep menus.
- Expand/collapse is structurally represented in the shell and must be dynamically implemented during frontend build.
- Baseline configuration profiles cover risk, controls frameworks, SLA, routing, validation, P0, automation, AI, RBAC, rule packs and models.
- Tenant Admin applies/customises baselines; Commercial Control Plane owns/version-controls templates and allocations.

## Not Changed
- Closed-loop case doctrine.
- P0 as priority overlay.
- No manual case creation.
- Three-application model.
- Military-intelligence UI doctrine.
