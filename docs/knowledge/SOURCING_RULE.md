# Knowledge Workspace — Binding Sourcing Rule

**Status:** LOCKED  
**Established:** 30 May 2026  
**Applies to:** Every artefact in `docs/knowledge/` (excluding `_superseded/`).

---

## The rule

Everything produced in this workspace derives **ONLY** from baseline source authority:

```
docs/99_source_archive/baseline_v2_6_2/
```

Specifically:

- **Masters** — `docs/99_source_archive/baseline_v2_6_2/docs/00_master/`
- **Child specs #01–#75** — `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/`

No other location may be read or cited as source for knowledge work in this directory.

## The prohibition (non-negotiable)

The Kiro translation layer at **`.kiro/specs/` (folders `00`–`43`)** is **NOT authority**.

- It MUST NEVER be read as a source for knowledge work.
- It MUST NEVER be cited as a source for knowledge work.
- Its folder numbers (00–43) MUST NEVER be conflated with baseline spec numbers (#01–#75).

The `.kiro/specs` layer is a derived, separately-numbered translation of the baseline. Treating it as source is what contaminated the previous Phase 1-6 outputs (now in `_superseded/`). That failure mode is closed here by rule.

## Citation discipline

1. Every claim cites a **baseline filename** and, where possible, a section (e.g. `62_Verdict_Semantics_Specification.md §3`).
2. Baseline spec numbers are written with the `#` prefix and the **real baseline title** — verified against the file, never recalled from memory.
3. If a fact cannot be traced to a baseline file, it is recorded as an explicit GAP, not asserted.
4. No quantitative claim (counts, percentages, latencies) is stated unless it appears verbatim in a baseline file.

## Verification gate

Before any knowledge artefact is written:

- The source file is opened and read in-session (not assumed from a summary).
- The title on line 1 is confirmed to match the cited number.
- A read that was partial is recorded as partial, never reported as complete.

## Authority precedence (unchanged)

This workspace sits beneath the programme authority order in `AGENTS.md`. The baseline v2.6.2 archive is the top source. This rule does not override that order; it operationalises it for knowledge work.
