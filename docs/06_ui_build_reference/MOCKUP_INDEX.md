# Commander SDR — UI Mockup Index (Authoritative Visual References)

**Status:** Authoritative. These mockups are the visual target for their surfaces, equal in standing to the shell reference HTMLs and the written DESIGN_SYSTEM.md.

**How to use:** The written `DESIGN_SYSTEM.md` provides the exact token values (colours, spacing, fonts, dimensions). These mockups provide the visual composition and layout target. When building a surface, use the tokens for values and the mockup for composition. Where a mockup shows a colour or spacing that differs slightly from a token, the token wins — the mockup shows intent, the token is the precise value.

**Location:** `docs/06_ui_build_reference/mockups/`

---

## Mockup → surface → mode → spec mapping

| Mockup file | Surface | Mode | Governing spec |
|---|---|---|---|
| `command-centre-standard.png` | Command Centre | Standard (Light) | Spec 05 |
| `command-centre-mission.png` | Command Centre | Mission (HUD/Dark) | Spec 05 |
| `ciso-dashboard.png` | CISO Dashboard | Standard (Light) | Spec for CISO Dashboard surface |
| `code-supply-chain-dashboard.png` | Code & Supply Chain (Exposure) | Standard (Light) | Vulnerability/Exposure spec |
| `case-handling-dashboard.png` | Case Management | Mission (HUD/Dark) | Spec 06 (Phase C target) |
| `blast-radius-command-mission.png` | Fusion Map / Blast Radius | Mission (HUD/Dark) | Fusion Map spec |
| `blast-radius-command-detailed.png` | Fusion Map / Blast Radius (detailed) | Mission (HUD/Dark) | Fusion Map spec |
| `architecture-dashboard.png` | Architecture | Mission (HUD/Dark) | Architecture Intelligence spec |

---

## Signature patterns the mockups establish (apply across all surfaces)

These recurring patterns are observed across the mockups and are now design law:

### 1. KPI strip
Every dashboard opens with a horizontal strip of ~8–10 metric tiles directly under the page header. Each tile: small label, large value, delta/trend with up/down arrow and "vs last 30 days" / "vs 24h", optional tiny sparkline. This is the standard top-of-dashboard pattern.

### 2. Instrument gauges (signature element)
Circular instrument gauges are a Commander signature. Used for scored metrics: Exposure Level, Remediation Velocity, Control Stability, Posture Score, Drift Pressure, SLA Pressure, Triage Velocity, etc. Two visual treatments:
- **Standard mode:** clean arc gauge with value, /100, label, threshold colour.
- **Mission mode:** dark instrument-cluster gauge with tick marks, needle, glow on active range — the "instrument panel" aesthetic.
Gauges always show value + label + meaning without colour alone.

### 3. Strategic Heading compass (bespoke signature instrument)
A literal compass rose (N/S/E/W) with a needle pointing to a heading (e.g. "126° SE") — represents strategic/operational direction. Bespoke component, Mission mode. Distinctive to Commander.

### 4. Closed-loop lifecycle pipeline
The Case Handling dashboard renders the case lifecycle as a horizontal stepper: New → Triage → Investigating → Awaiting Feedback → Actioning → Validation → Closure, each with a count and the active stage highlighted (gold ring). This is the visual form of the closed-loop case model. Named component for Spec 06.

### 5. Network topology / blast graph
The Blast Radius and Architecture surfaces render network graphs: origin node → spreading paths across zones (Internet → DMZ → Core → Restricted → Crown Jewel), nodes coloured by risk, edges showing exposed/contained/blocked paths, a contamination-spread visual from the origin. This is the Fusion Map visualisation — @xyflow/react (React Flow).

### 6. Multi-column dense card grid
Below the KPI strip and insight row, dashboards use a dense multi-column grid of cards (donuts, trend lines, ranked tables with inline bar indicators, finding lists). 4–6 columns on wide screens. Each card has an uppercase eyebrow title + info icon + "View all →" link.

### 7. Ranked table with inline bar/score indicators
Tables (Business Unit Posture, Top Risk Repositories, etc.) pair a value with an inline horizontal bar and a trend arrow. Score + bar + trend is the standard table-row metric pattern.

### 8. Right-rail action/insight column
Detail surfaces (Blast Radius) use a right rail for Path Explorer, Containment Summary, Recommended Actions, Case & Action Center — a persistent insight/action column beside the main visual.

### 9. Live activity feed
A recurring bottom-right card: timestamped live events with severity dots and entity references.

---

## Colour observations from mockups (reconcile with DESIGN_SYSTEM.md tokens)

The mockups confirm and slightly enrich the pinned palette:
- **Mission backgrounds** are deep navy-black, layered by contrast (matches `--hud-bg-*`).
- **Gold** is the primary accent and active-state indicator throughout (matches `--brand-gold #ffd21f`).
- **Severity ramp** in use: critical red, high orange, medium amber, low blue/green — maps to priority P0–P4 and signal tokens.
- **Gauges** use a red→amber→green arc for threshold scoring.
- **Charts** use multi-hue series consistent with the 8-colour data palette.
- **Donut charts** (Risk Distribution, Risk Mix, Environment Distribution) are a recurring composition chart — confirm donut as an approved ApexCharts type.

Where the written DESIGN_SYSTEM.md token differs from a mockup pixel, the token is authoritative.

---

## Build rule

When building any surface:
1. Read DESIGN_SYSTEM.md for the exact token values.
2. Read the governing mockup from this index for the visual composition.
3. Build to match the mockup's layout using the design system's tokens.
4. Apply the signature patterns above.
5. Do not invent compositions the mockups don't show; do not improvise values the design system has pinned.
