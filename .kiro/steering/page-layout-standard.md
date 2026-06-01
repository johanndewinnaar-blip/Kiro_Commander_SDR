---
inclusion: fileMatch
fileMatchPattern: "apps/web/**"
---

# Page Layout Standard Steering

Authority: DEC-pagecontainer-shared-standard, DEC-pagecontainer-exceptions (DECISIONS.md).

## The standard

Every page in `apps/web` renders its header and body through the shared
`PageContainer` component (`apps/web/src/components/page-container.tsx`).

```tsx
import { PageContainer } from '@/components/page-container';

export default function SomePage() {
  return (
    <PageContainer
      pretitle="Workspace › Section"
      title="Page Title"
      headerActions={/* optional right-aligned pill/actions */}
    >
      {/* page body: cards, rows, tables, charts */}
    </PageContainer>
  );
}
```

`PageContainer` owns the `page-wrapper > page-header > container-xl` structure
and the horizontal gutter. Combined with the shell's `scrollbar-gutter: stable`
on both `<header>` and `<main>`, this guarantees the top-nav, breadcrumb and
page content share one left edge at every viewport width.

## Standing rules

1. **WHEN a new operational page is created THE SYSTEM SHALL render it through `PageContainer`.** Do not hand-roll `page-wrapper`/`page-header`/`container-xl` per page, and do not add per-page horizontal padding — `PageContainer` owns it.

2. **Shell `layout.tsx` files provide chrome only.** Sidebar, top bar and brand lockup live in the layout. Layouts MUST NOT render a page-header — the page-header belongs to `PageContainer` so it is consistent and not duplicated.

3. **The three-application boundary is preserved.** Operational App, Tenant Admin and Commercial Control Plane keep distinct sidebars, top bars, brand lockups and route trees (Commander doctrine Assertion 3). Only the page-body structural standard is shared.

4. **Cards have square corners, Tabler text colours, no stray gold.** Carries the existing global overrides in `globals.css`. Gold is permitted only on the COMMANDER brand wordmark.

## Documented exceptions (do NOT use PageContainer)

These are recorded in DECISIONS.md (DEC-pagecontainer-exceptions). Any NEW exception requires its own decision record before it ships.

- **Full-bleed emergency surfaces** that force Mission mode — e.g. `/war-room/p0` (DS-1.0 §9.3). These keep their dark emergency chrome; align horizontally via `container-xl` only.
- **Master-detail / right-rail views** without a breadcrumb header — e.g. `/cases/:id`.
- **Authentication / onboarding screens** (login, MFA, tenant-select) — these render outside the operational shell entirely and have their own minimal chrome.

## When adding a route

Per build-pack discipline, when a new page is built also confirm it is registered
in the route registry (`apps/web/src/registry/`) and uses `PageContainer` unless it
is a documented exception above.
