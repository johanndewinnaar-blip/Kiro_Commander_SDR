# Commander SDR Authority Model for Kiro

## Purpose

This file converts the Commander SDR baseline authority doctrine into a practical Kiro execution model.

## Precedence stack

| Tier | Source | Treatment |
|---|---|---|
| 1 | Baseline authority and precedence source | Supreme product/build authority. |
| 2 | Master proposition and master technical specification | Governs product category, architecture, boundaries and major capability scope. |
| 3 | Binding child specifications #01–#75 | Govern specific domains and override master docs on their subject matter. |
| 4 | Feature registry and route/menu registry | Govern feature presence, availability, flags, menus and routes. |
| 5 | Kiro steering and specs generated in this pack | Execution translation layer; must remain consistent with tiers 1–4. |
| 6 | Build packs | Implementation slices derived from specs; cannot invent or remove scope. |
| 7 | HTML shells and design examples | Visual/layout references only. No veto over specified features. |
| 8 | External docs, Kiro powers, MCP tools, AI output | Advisory only unless explicitly reconciled into Commander authority. |

## Kiro authority rules

1. Steering files are persistent workspace guidance, not independent source authority.
2. Kiro specs are executable delivery specs derived from Commander baseline docs.
3. Build packs translate Kiro specs into ordered work slices.
4. Prompt-library files are operational aids only.
5. Generated code is never authority; it must conform back to source, spec and build pack.

## Source-to-Kiro conversion rule

The conversion pattern is:

```text
Commander Baseline Authority → Kiro Steering → Kiro Specs → Build Packs → Code Tasks → Tests → Review → Change Control
```

No layer may bypass the layer above it.
