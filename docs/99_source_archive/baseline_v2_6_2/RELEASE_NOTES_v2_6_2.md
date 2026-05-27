# Commander SDR Final Baseline Document Pack — Release Notes v2.6.2

**Release type:** Control note only
**Baseline relationship:** Additive to v2.6.1
**Product scope impact:** None

## 1. Purpose

v2.6.2 is a single control note added to the v2.6.1 baseline to flag one stale historical document so it is not consumed during current build work.

This release does **not** modify the Commander SDR product proposition, master technical specification, child specifications, UI doctrine, connector model, case workflow, or security boundaries.

## 2. What changed

Updated:

```text
AGENTS.md                            # added the "v2.6.2 Stale Document Notice" section
CURRENT_BASELINE_MANIFEST_v2_6.md    # version markers bumped to v2.6.2
RELEASE_NOTES_v2_6_2.md              # this file (new)
```

No file was added or removed. No file under `docs/02_child_specs/` was modified. No master spec under `docs/00_master/` was modified.

## 3. Why this was added

`docs/01_active_build/Commander_SDR_AI_Build_Playbooks_v1_7.md` predates the v2.6 baseline. Its content references master specification versions that have since been superseded (Master Proposition v4.7 instead of v5.0, Master Technical Specification v6.7 instead of v7.0, Schedule v1.8 instead of v1.9). It also lists child Specs #02 and #03 as "Not Done" when both ship at v1.0 final under v2.6.

The file was not deleted because three other baseline documents reference it by path (the baseline manifest, the Folder Structure spec at v1.9, and Spec #05). Deletion would create broken cross-references.

Instead, the v2.6.2 update adds a single notice in `AGENTS.md` directing humans and agents to treat the file as historical lineage only and to use `AGENTS.md` itself as the entry point into the baseline.

## 4. Authority

The v2.6.2 update is a control note within the v2.6 baseline; it does not constitute a new doctrinal increment. The v2.6.1 baseline tag and all v2.6.0 doctrine remain in force. The next material baseline change will be issued under its own increment (v2.7.0 or v3.0.0 as appropriate).
