# Design — Strategy Layer Runtime Surface

**Spec ID:** `43-strategy-layer-runtime-surface`  
**Version:** v1.3.1  
**Source authority:** Spec #32 Strategy Layer Runtime Surface Specification.

## Design intent

The Strategy Layer Runtime Surface is a mandatory, build-blocking configuration and governance surface. It provides the Strategy Centre and binds runtime strategy changes to recalculation across priority, routing, validation, closure, reopening and Fusion Map overlays.

## Kiro + Git execution posture

This design is a Kiro/Git planning artefact only. It does not implement application code, live strategy mutation, live AWS resources, external workflow orchestration or custom Kiro powers.

## Components

- Strategy Centre configuration surface.
- Simulation surface.
- Approval workflow.
- Audit history view.
- Effective-policy preview.
- Runtime binding contract for dependent recalculation.

## Dependencies

This spec must precede case management, routing, validation/closure, reopening and Fusion Map implementation tasks.
