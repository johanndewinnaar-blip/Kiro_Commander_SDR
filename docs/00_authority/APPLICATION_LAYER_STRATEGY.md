# Commander SDR — Application Layer Strategy

**Version:** ALS-1.0
**Status:** Authoritative. Operates under `PERFORMANCE_DOCTRINE.md` (PD-1.0).
**Tier strategy:** Always T3. No tier variation. Built top-end once, measured continuously, regressions never tolerated.
**Authority:** This document is the deep authority for everything user-facing about Commander — front-end code, application servers, routes, components, bundles, assets, runtime browser behaviour.

---

## 1. Scope

The Application Layer covers everything from the HTTP edge to the user's screen:

- All Next.js routes (operational, control plane, tenant admin)
- All React components (shell chrome, page composition, signature components, primitives)
- Bundle composition per route
- Asset weight (fonts, images, icons, charts)
- Runtime browser behaviour (render times, re-render counts, interaction latency, scroll performance)
- Server Component vs Client Component discipline
- API client patterns (batching, caching, optimistic UI)
- Code-splitting and prefetching strategy
- Edge caching and CDN behaviour at the application boundary

Not in scope: database queries (Database Layer), data pipelines (Data Layer), deployment topology (Infrastructure Layer).

---

## 2. The always-T3 principle

Application code runs once for every user, regardless of tenant size or deployment tier. The same React bundle that serves a 10-seat customer serves a 10,000-seat customer. There is no "T1 Application Layer" — the code itself is built to top-decile performance from inception.

This means every line of application code, every component, every route is held to the same standard from day one. Tier promotion does not change Application Layer code; only the deployment substrate (Infrastructure Layer) changes around it.

The cost discipline at this layer is therefore about *what's shipped per session* (bundle weight, asset weight, render cost) — every byte and every millisecond justified.

---

## 3. Measurable units

Every measurable unit in the Application Layer is declared here with its target, tolerance band (per PD-1.0 §4.1), measurement method, and measurement readiness.

### 3.1 Route-level units (Lighthouse metrics)

Every route in the application has six measurable units. Targets vary by route class (defined in §4).

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| LCP (Largest Contentful Paint) | smaller-is-better | per route class §4 | Lighthouse | Live |
| FCP (First Contentful Paint) | smaller-is-better | per route class §4 | Lighthouse | Live |
| TTI (Time to Interactive) | smaller-is-better | per route class §4 | Lighthouse | Live |
| CLS (Cumulative Layout Shift) | smaller-is-better | < 0.05 (all routes) | Lighthouse | Live |
| TBT (Total Blocking Time) | smaller-is-better | < 100ms (all routes) | Lighthouse | Live |
| Lighthouse Performance Score | bigger-is-better | per route class §4 | Lighthouse | Live |

### 3.2 Bundle units (per route)

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| Per-route JS bundle (gzipped) | smaller-is-better | per route class §4 | `@next/bundle-analyzer` or equivalent | Live |
| Per-route CSS bundle (gzipped) | smaller-is-better | < 20KB all routes | Build output inspection | Live |
| Shared chunks (gzipped) | smaller-is-better | < 120KB (rare exceptions) | Build output inspection | Live |
| Largest single chunk | smaller-is-better | < 80KB (any single chunk) | Build output inspection | Live |

### 3.3 Component units

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| Initial render time | smaller-is-better | < 100ms (signature components), < 50ms (primitives) | React DevTools Profiler / synthetic | Live |
| Re-render count per minute (live data components) | smaller-is-better | < 10/min | Profiler observation | Live |
| Component memo discipline | bigger-is-better | 100% of expensive components memoised | Static analysis | Static |

### 3.4 Interaction units

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| Route navigation (warm) | smaller-is-better | < 200ms perceived | Playwright timing | Live |
| Mode toggle (Standard ↔ Mission) | smaller-is-better | < 100ms | Playwright timing | Live |
| Sidebar collapse | smaller-is-better | < 200ms (animation tolerance) | Playwright timing | Live |
| Expandable row toggle | smaller-is-better | < 100ms | Playwright timing | Live |
| Filter / sort apply | smaller-is-better | < 150ms perceived | Playwright timing | Live |
| Search input → first result | smaller-is-better | < 250ms | Playwright timing | Live |

### 3.5 Server Component discipline units

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| Proportion of routes using RSC by default | bigger-is-better | 100% (client only where required) | Static analysis | Static |
| `'use client'` boundary count per route | smaller-is-better | < 5 boundaries per route | Static analysis | Static |
| Server data fetch round-trips per route | smaller-is-better | ≤ 3 per initial render | Static analysis | Static |

### 3.6 Asset discipline units

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| Total font weight per route | smaller-is-better | < 100KB (subsetted, all weights combined) | Network inspection | Live |
| Largest image per route | smaller-is-better | < 200KB optimised | Build output inspection | Live |
| Total icon weight per route (Lucide SVGs) | smaller-is-better | < 15KB (tree-shaken) | Build output inspection | Live |
| Chart library load on non-chart routes | smaller-is-better | 0 bytes | Bundle analysis | Static |

### 3.7 API client units

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| N+1 query patterns in client code | smaller-is-better | 0 occurrences | Static analysis | Static |
| Optimistic UI on mutation operations | bigger-is-better | 100% of mutations | Static analysis | Static |
| Stale-while-revalidate on read operations | bigger-is-better | 100% of read operations | Static analysis | Static |
| Client-side caching hit rate (warm session) | bigger-is-better | > 80% | Runtime instrumentation | Deferred until instrumentation wired |

---

## 4. Route classes and per-class targets

Different routes have different performance bars. The strictest bar is P0 War Room — the operational moment where slowness is most damaging.

### 4.1 Class A — P0 / Emergency surfaces

Routes: `/war-room/p0`, any future P0-class surface.

| Metric | Target |
|---|---|
| LCP | < 0.8s |
| FCP | < 0.5s |
| TTI | < 1.5s |
| Lighthouse Score | ≥ 98 |
| Per-route JS bundle | < 120KB gzipped |

### 4.2 Class B — Operational core surfaces

Routes: `/` (Command Centre), `/cases`, `/cases/my`, `/cases/[id]`, any future operational hot-path surface.

| Metric | Target |
|---|---|
| LCP | < 1.0s |
| FCP | < 0.7s |
| TTI | < 2.0s |
| Lighthouse Score | ≥ 95 |
| Per-route JS bundle | < 150KB gzipped |

### 4.3 Class C — Analytical surfaces

Routes: `/cases/analytics`, `/dashboards/*`, any future chart-heavy surface.

| Metric | Target |
|---|---|
| LCP | < 1.5s |
| FCP | < 0.9s |
| TTI | < 2.5s |
| Lighthouse Score | ≥ 90 |
| Per-route JS bundle | < 200KB gzipped (charts excluded from initial bundle via lazy import) |

### 4.4 Class D — Administrative / configuration surfaces

Routes: Tenant Admin routes, Control Plane routes, settings, integrations.

| Metric | Target |
|---|---|
| LCP | < 1.5s |
| FCP | < 1.0s |
| TTI | < 2.5s |
| Lighthouse Score | ≥ 90 |
| Per-route JS bundle | < 180KB gzipped |

### 4.5 Class E — Detail / drill-down surfaces

Routes: Individual entity detail pages, audit log views, evidence inspectors.

| Metric | Target |
|---|---|
| LCP | < 1.2s |
| FCP | < 0.8s |
| TTI | < 2.0s |
| Lighthouse Score | ≥ 93 |
| Per-route JS bundle | < 170KB gzipped |

---

## 5. Architectural discipline

The following principles govern how application code is written. Violations are caught by Hook 05 static analysis.

### 5.1 Server Components first

Every route renders as a Server Component by default. Client Components are introduced only at the boundary of genuine client-side need (interaction state, browser APIs, event handlers, real-time subscriptions). Each `'use client'` directive is a deliberate boundary, not a default.

The principle: server work happens on the server (where it's cheaper and faster); client work happens on the client (where it must). The line between them is drawn at the smallest possible perimeter.

### 5.2 Code-splitting by default

Heavy dependencies are lazy-loaded. Charts, rich text editors, complex form components, and any library over 30KB gzipped is dynamically imported, not statically bundled. Tree-shaking is verified per route by bundle analyser inspection.

### 5.3 No render-blocking work

No synchronous work on the critical render path. Charts load after first paint. Data fetches resolve in parallel where possible. Long-running computations move to web workers if they exceed 50ms.

### 5.4 Stable component identity

Components do not re-render unnecessarily. Expensive components use `React.memo`. Lists use stable keys. Selectors are memoised. Re-render counts are an audited metric, not a tolerated cost.

### 5.5 Token-driven styling, zero hardcoded values

Carries from design doctrine: no hardcoded colours, spacing, radii, typography values in component code. All styling references the three-layer token system. This is performance discipline too — token-driven styling enables global perf-aware adjustments without per-file edits.

### 5.6 Charts opt-in

The chart library is loaded only on routes that render charts. Routes without charts must not contribute to or depend on the chart bundle. Verified by static bundle analysis.

### 5.7 No unbounded lists

Lists rendering more than 100 items use virtualisation (e.g. `react-window`, `react-virtuoso`). Unbounded `.map()` rendering is a static-analysis violation.

### 5.8 Optimistic UI on mutation

Every user-initiated mutation provides immediate optimistic feedback. The UI does not wait for server confirmation before showing the user that their action registered. Rollback on failure is explicit.

### 5.9 Stale-while-revalidate on reads

Read operations serve cached data immediately and revalidate in the background. The user never waits for a fetch when stale data is acceptable. Freshness rules per-resource are explicit.

### 5.10 Workload class declaration on API calls

Carries from PD-1.0 §6 and the performance steering rule: every API call originating from client code declares its workload class (operational-read, analytics-read, reporting-read). The application doesn't need to know about server-side routing of these classes — but the calls must be tagged so server-side routing can resolve them.

---

## 6. Tier behaviour

Tier promotion does not change Application Layer code. The same React bundle runs at T1, T2, and T3. The Application Layer's tier is permanently T3.

What does change at tier promotion is the **infrastructure around** the application code:

- **T1:** Single-region Vercel or equivalent edge platform. Single application server pool. No edge caching beyond Vercel defaults.
- **T2:** Multi-AZ application server pool. Aggressive edge caching for static and ISR routes. CDN configured for asset delivery.
- **T3:** Multi-region edge. Active-active application server pools. Full CDN with cache invalidation pipelines. Possible per-region read replica for SSR fetches.

These are Infrastructure Layer concerns documented in `INFRASTRUCTURE_LAYER_STRATEGY.md`. The Application Layer code is identical at every tier; the deployment around it scales.

---

## 7. Scorecard composition

The Application Layer scorecard reports the band of every measurable unit declared in §3, classified per PD-1.0 §4. Layer aggregation per PD-1.0 §4.4.

Typical scorecard output (illustrative):

```
Application Layer Compliance Report — {timestamp}
==================================================
{N} units assessed ({live} live, {static} static, {deferred} deferred)

Green   (95–100%)  : {count} units — {pct}
Yellow  (85–94%)   : {count} units — {pct}
Amber   (60–84%)   : {count} units — {pct}
Red     (<60%)     : {count} units — {pct}

Overall layer band: {BAND}
Red units present: {YES/NO}

Red units:
  /cases/analytics — LCP 3.2s, score 31%, target <1.5s
  /cases/analytics — Bundle 380KB, score 53%, target <200KB
  LiveActivityFeed — Re-renders 47/min, score 21%, target <10/min

Amber units (queue):
  /cases — LCP 1.25s, score 80%, target <1.0s
  KPIStrip — Initial render 120ms, score 83%, target <100ms

Deferred (1):
  Client-side cache hit rate — deferred until runtime instrumentation wired
```

---

## 8. Remediation guidance

The scorecard runner produces remediation guidance for every Red and Amber unit by combining static analysis with the standing patterns documented here. Examples:

- **LCP failures on chart routes** → likely synchronous chart library load. Reference §5.2 (code-splitting), §5.6 (charts opt-in).
- **Bundle cap breaches** → identify heaviest contributors via bundle analyser; reference §5.2.
- **High re-render counts** → reference §5.4 (stable component identity), suggest memoisation audit.
- **High `'use client'` boundary counts** → reference §5.1 (Server Components first), suggest boundary review.
- **Unbounded list renders** → reference §5.7, suggest virtualisation.

Each remediation guidance references a specific section of this strategy as the contract, identifies the likely cause from static analysis, and suggests a `TWEAK_PASS.md` invocation to remediate.

---

## 9. Measurement methods

### 9.1 Lighthouse

Lighthouse runs against each route in a production build (`pnpm build && pnpm start`). The runner uses Lighthouse CI configuration to ensure consistent results. Mobile emulation off; viewport 1920×1080; throttling set to "broadband" simulation; runs three times per route, median used.

### 9.2 Bundle analysis

Next.js's `ANALYZE=true` mode produces per-route bundle composition. The scorecard runner parses the output, computes gzipped sizes per route and per chunk, classifies chunks by source library.

### 9.3 Static analysis

Custom static analysis (TypeScript AST traversal) checks:
- Hardcoded styling values (carrying from design doctrine)
- `'use client'` boundary counts
- Memoisation discipline
- Workload class declarations on API calls
- Unbounded list rendering patterns
- Chart imports on non-chart routes

Implementation lives in the scorecard runner package.

### 9.4 Interaction timing

Playwright scripts time named interactions (route navigation, mode toggle, sidebar collapse, etc.) against a production build. Each interaction measured five times; median used. Scripts live in `apps/web/perf/interaction-timing.spec.ts` or equivalent.

### 9.5 Component profiling

React DevTools Profiler or equivalent for component render time and re-render count measurement. Manual today; automation deferred to runner maturity.

---

## 10. Deferred units and their milestones

The following units are deferred from immediate measurement, with explicit milestones:

| Unit | Deferred until |
|---|---|
| Client-side cache hit rate | Runtime instrumentation (e.g. SWR / React Query) wired with reporting |
| Component re-render count automation | Runner maturity Phase 2 — currently manual via Profiler |
| Interaction timing automation | Playwright suite wired in CI |

Until milestones arrive, these units appear in scorecards as "Deferred — measurement awaits {milestone}." They do not count toward the layer's Green proportion.

---

## 11. Standing rules specific to the Application Layer

Carrying from PD-1.0 §9, with Application-Layer-specific additions:

1. No new route ships without a declared route class and confirmed compliance with that class's targets.
2. No new dependency over 30KB gzipped is statically imported. Dynamic import is mandatory.
3. No regression of any route's Lighthouse score below its class target on commit.
4. No new `'use client'` boundary without explicit justification in the component file.
5. No unbounded list rendering. Lists over 100 items use virtualisation.
6. No new synchronous render-blocking work introduced on operational hot-path routes (Class A, B).

---

## 12. Authority and lineage

This strategy operates under `docs/00_authority/PERFORMANCE_DOCTRINE.md` (PD-1.0). It is referenced by:

- `.kiro/steering/performance-discipline.md` (always-on steering)
- Spec 02 (Design System) — EARS requirements for Application Layer compliance
- `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` — measurement engineering
- `.kiro/hooks/05-performance-compliance.kiro.hook` — enforcement

This document is the deep authority for Application Layer performance. Where any other document conflicts with this one on Application Layer matters, this one wins; the other must be updated explicitly.
