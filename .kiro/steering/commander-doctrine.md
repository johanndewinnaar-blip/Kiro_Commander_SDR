
# Commander Doctrine Steering

Commander SDR is not an MVP, not a dashboard-only tool and not a thin SIEM/SOAR wrapper. It is a full Security Command and Control product programme delivered through staged versions.

## Eleven doctrinal assertions

1. **Closed-loop case model:** Cases must be created, routed, closed and reopened through system-owned lifecycle rules; manual case creation, status edit and closure are forbidden unless a future authority explicitly changes this.
2. **P0 priority overlay:** P0 and zero-day conditions must propagate reason, scope, owner, expiry/review and evidence across relevant surfaces.
3. **Three-application boundary:** Operational App, Tenant Admin and Commercial Control Plane are distinct surfaces and must not be merged casually.
4. **Shell as reference, not inventory:** HTML shell references guide layout only and cannot delete committed features or routes.
5. **Registry-driven runtime:** Routes, menus, page status, feature visibility and build state are registry-driven.
6. **Reference-input boundary:** Vendor docs, API references and external material are reference inputs until converted through Commander authority.
7. **Baseline immutability:** Archived baseline material is retained for lineage and must not be silently rewritten.
8. **SOC boundary:** Commander may consume SOC signal read-only but must not write SOC detections, rules, playbooks or case triage actions.
9. **Four-stream intelligence integrity:** External Threat, External Attack, Internal Behavioural and Posture streams must remain distinct.
10. **Surface attribution:** Relevant records must preserve internal_attack_surface or external_attack_surface attribution.
11. **Connector and verdict doctrine:** Connector classes are A/B/C/D only, and verdicts must preserve semantic disposition rather than becoming binary pass/fail.

## Product commitment

The whole Commander journey is committed from day one. Implementation is version-staged; scope is not discarded.
