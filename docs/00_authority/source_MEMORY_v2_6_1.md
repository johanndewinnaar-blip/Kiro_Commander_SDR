# Commander SDR Project Memory — Baseline Pack v2.6.1

**Status:** Working memory / context file  
**Applies to:** Commander SDR Final Baseline Document Pack v2.6.1  
**Important:** This file is **not** the formal source of truth. If this file conflicts with the formal baseline, the formal baseline wins.

## 1. Why this file exists

This file gives humans and AI agents a short project memory before they work with the Commander SDR baseline. It exists to reduce repeated context loading and prevent old decisions being reopened accidentally.

The core build model remains simple:

```text
Source Docs → Build Packs → Code
```

## 2. What Commander SDR is

Commander SDR is a Seiertech SaaS platform for Security Drift & Response. It is intended to sit above security tooling and correlate exposure, control coverage, configuration state, architecture drift, security debt, risk, case workflow and governance signals.

It is not a SOC case-triage replacement and it does not directly run incident response operations.

## 3. Current baseline state

This pack remains the product and technical baseline. v2.6.1 is a light handover/control update only. It does not change the product scope, doctrinal boundaries, UI baseline, master proposition, master technical specification, child specs, connector model or case-management design.

## 4. Settled decisions to remember

- The formal baseline remains v2.6.
- The v2.6.1 update adds handover memory and agent-read sequencing only.
- Commander SDR follows the three-layer coherence model: Security Command and Control, Security Drift Response, and Commander as the platform brand.
- The SOC boundary and Insider Risk boundary remain binding.
- The Command Centre is the primary landing/dashboard surface.
- The active shell, navigation hierarchy and military/brutalist design doctrine remain protected.
- Build execution should be driven by build packs generated from source documents.

## 5. How agents should use this memory file

Agents may use this file to orient themselves quickly, but must not treat it as authority.

Minimum read sequence for baseline work:

```text
1. docs/00_master/00_AUTHORITY_AND_PRECEDENCE_v2_6.md
2. MEMORY.md
3. AGENTS.md
4. CURRENT_BASELINE_MANIFEST_v2_6.md
5. Relevant master or child spec for the assigned task
6. Relevant build pack, if supplied from the next-stage pack
```

## 6. What not to do

- Do not rewrite the v2.6 baseline because v2.6.1 exists.
- Do not treat this file as a new technical specification.
- Do not collapse the product into a generic SaaS dashboard.
- Do not reintroduce DeepSeek/Ollama/Zapier as required build-stack components.
- Do not use Microsoft Lists as the required source of build truth.
- Do not bypass build packs when moving from docs to code.

## 7. Current handover relationship

The companion next-stage pack v1.7 is the practical handover/build-pipeline pack. This baseline pack defines **what** Commander SDR is. The next-stage pack defines **how** the build moves from source docs to build packs to code.
