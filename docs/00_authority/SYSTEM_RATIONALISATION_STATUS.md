# Commander SDR System Rationalisation Status

**Authority:** Commander SDR – System Rationalisation, Knowledge Graph, Data-First Architecture & Build Rebaseline  
**Date:** 30 May 2026  
**Status:** IN PROGRESS - Phase 1 Understanding

---

## Executive Summary

**MAJOR DIRECTION CHANGE ACKNOWLEDGED** ✅

This system rationalisation supersedes all previous build assumptions. No further major build activity may proceed until the complete 11-phase rationalisation is complete and the data-first build mandate is established.

**Current Status:** Phase 1 - Understanding Commander SDR (IN PROGRESS)

---

## What Commander SDR Actually Is (Phase 1 Findings)

### Core Identity
- **Category:** Security Command and Control (Security C2) - NEW category above existing security tools
- **Discipline:** Security Drift Response (SDR) - Patented operational discipline  
- **Platform:** Commander - The SaaS platform that delivers both

### The Problem It Solves
**Security Drift:** Any deviation between intended and actual security posture across hybrid estates. Traditional security operates reactively; Commander operates as a closed-loop control system.

### Core Operational Model
**Security OODA Loop at Programme Level:**
- **Observe:** Signal intake across 4 intelligence streams via 4 connector classes
- **Orient:** Turn signal into understanding (drift detection, risk scoring, blast radius)
- **Decide:** Generate remediation, prioritisation, routing decisions  
- **Act:** Execute decisions and validate outcomes

### The Four Intelligence Streams
1. **External Threat Intelligence** - What's happening globally
2. **External Attack Intelligence** - What external adversaries are doing to THIS estate
3. **Internal Behavioural Intelligence** - What internal actors are doing
4. **Posture Intelligence** - Current security posture state

### Seven-Layer Architecture
1. **Connector Layer** - 4 classes: SOC Telemetry, Operational Verdict, Configuration State, Threat Intelligence
2. **Normalisation Layer** - Canonical entity model, verdict semantics, inverse discovery
3. **Engine Layer** - ~240 drift detection models, risk scoring, blast radius, architecture intelligence
4. **Intelligence Layer** - 4-stream integration, Estate Intelligence Picture
5. **Case Layer** - Closed-loop case lifecycle, routing, validation
6. **OODA Layer** - Programme-level OODA tempo, phase health metrics
7. **Surface Layer** - Workspaces, dashboards, Operating Pictures, Direction Boards

---

## Phase 1 Progress

### ✅ Completed
- Read Master Proposition v5.0 (partial - 287/1008 lines)
- Read Master Technical Specification v7.0 (partial - first 200 lines)
- Read Build Sequence v1.3.1
- Read Authority Model
- Identified 7-layer architecture
- Identified 4 intelligence streams
- Identified Security OODA Loop as core operational model

### 🔄 In Progress
- Complete reading of Master Proposition v5.0
- Complete reading of Master Technical Specification v7.0
- Review all 43+ Kiro specs
- Review all build packs
- Review existing seed data and implemented code

### ⏳ Pending
- Phases 2-11 of system rationalisation
- Knowledge graph creation
- Entity architecture derivation
- Function architecture derivation
- Data-first build mandate establishment

---

## Critical Findings So Far

### 1. Massive Scope Underestimation
The current build approach has been treating Commander as a dashboard/UI project. It is actually a **Security Command and Control platform** with:
- 4 intelligence streams
- 7 architectural layers  
- ~240 drift detection models
- 4 connector classes
- 12 case types
- 11 personas
- Closed-loop control system

### 2. Data-First Architecture Required
The system cannot be built UI-first. The operating model, entity architecture, function architecture, and data architecture must precede any UI implementation.

### 3. Missing System Understanding
Current specs and build packs appear to be treating individual domains (cases, assets, vulnerabilities) as separate systems. They are actually integrated streams in a unified Security C2 platform.

---

## Next Actions

### Immediate (Phase 1 Completion)
1. Complete reading Master Proposition v5.0 (remaining 721 lines)
2. Complete reading Master Technical Specification v7.0
3. Review all Kiro specs (.kiro/specs/00* through 43*)
4. Review all build packs (docs/04_build_packs/)
5. Review existing seed data (packages/contracts/src/fixtures/)
6. Review implemented code (apps/web/src/)

### Phase 2 (Knowledge Graph)
1. Identify all operational domains
2. Map domain relationships
3. Create SYSTEM_KNOWLEDGE_GRAPH.md
4. Create DOMAIN_REGISTER.md  
5. Create RELATIONSHIP_MAP.md

### Critical Dependencies
- **ALL BUILD ACTIVITY PAUSED** until rationalisation complete
- **NO UI COMPONENTS** may be considered complete without entity/data/function contracts
- **NO MOCK DATA** - must be replaced with seeded operational truth

---

## Authority Integration

This rationalisation will be integrated into the core testing pipeline as a mandatory pre-build check. The data-first build mandate will supersede all current build assumptions.

**Status:** SYSTEM RATIONALISATION IN PROGRESS - BUILD ACTIVITY PAUSED

---

**Last Updated:** 2026-05-30  
**Next Milestone:** Complete Phase 1 Understanding