---
inclusion: fileMatch
fileMatchPattern: ["apps/web/**/*", "packages/ui/**/*", "docs/06_ui_build_reference/**/*"]
---
# UI Design System Steering

Commander visual direction: military-intelligence, brutalist, precise, executive-grade.

## Stack Hierarchy

Tabler is the primary design and page system. shadcn/Radix is a fallback for interactive
primitives only. See `design-system-contract.md §0` for the full Tabler-first / shadcn-fallback
doctrine and decision gate.

## Design Cues

- Navy/ink backgrounds.
- Gold accent restricted to COMMANDER brand wordmark only.
- Steel/silver supporting tones.
- Sharp alignment and symmetry (square corners everywhere).
- Persistent left navigation and top dashboard navigation (Tabler shell).
- Scrollable operational surfaces.
- Command Centre as primary landing surface.
- Build-mode visibility for scaffold/build/stub routes.

## Shell and Layout

- Shell, sidebar, top bar, grid, PageContainer = Tabler-first. Non-negotiable.
- shadcn/Radix permitted only for interactive overlays (dialog, popover, command palette, etc.)
  where Tabler lacks the component.
- Tailwind supports shadcn component styling only — not page layout.

## Charts

- ApexCharts/react-apexcharts for standard charts.
- Recharts for Sankey/composable charts.
- Inline SVG for sparklines.
- All chart colours via `--data-*` semantic tokens. No literal hex.

Do not treat the shell HTML as feature authority; route/page registry and specs govern presence.
