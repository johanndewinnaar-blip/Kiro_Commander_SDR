
# Build Pack Discipline Steering

## No-MVP doctrine

Commander SDR must be treated as a full product build programme. Kiro may stage implementation, but it must not remove or hide committed domains merely because they are not in the first implementation slice.

## Prerequisite chain rule

- BP-00, BP-01 and BP-02 must govern authority, shell, route registry and design before feature implementation.
- BP-03 canonical data model must precede domain features that consume canonical entities.
- BP-13 connector framework must precede real connector work.
- Mock data must be used until Phase 2 approves real connector readiness.
- Push governance remains dry-run until separately approved.

## Version-staged commitment model

v1.1 establishes foundation, shell, canonical contracts, seed data, Command Centre, case lifecycle and Commander AI core grounding. v1.2 adds core domain surfaces. v1.3 adds connector framework, admin, rules, audit and communication depth. v1.4 adds Security C2/OODA/Direction Board depth. Later phases validate AWS/runtime and real connector readiness.

## Task discipline

WHEN a build task is proposed THE SYSTEM SHALL identify owning spec, owning build pack, prerequisite packs, affected routes, affected canonical entities and required tests before implementation.
