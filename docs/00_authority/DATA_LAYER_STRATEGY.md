# Commander SDR — Data Layer Strategy

**Version:** DL-1.0
**Status:** Authoritative. Operates under `PERFORMANCE_DOCTRINE.md` (PD-1.0).
**Tier strategy:** **Designed for T3, deployable at T1.** Architecture supports all tiers; deployment instantiation matches current scale. Code does not change between tiers — only deployment configuration.
**Authority:** This document is the deep authority for the data flow — connectors, ingestion pipelines, normalisation, transformation, queueing, caching, read models, search indices. Data *in motion*.

---

## 1. Scope

The Data Layer covers everything that moves data:

- Connector ingestion pipelines (the four connector classes A/B/C/D)
- Signal normalisation and verdict generation
- Workload-class routing in the application
- Queueing and async messaging
- Caching layers (operational cache, strategy cache, dashboard cache)
- Read model abstractions and materialisation
- Search indexing (Postgres FTS at T1, OpenSearch at T2/T3)
- Pipeline observability (throughput, latency, queue depth, error rate)
- Hot/warm/cold storage tier movement (operational mechanics; schema lives in Database Layer)
- Surface attribution preserved through the entire flow

Not in scope: the database engine itself (Database Layer), the application code that consumes data (Application Layer), the infrastructure underneath (Infrastructure Layer).

---

## 2. The designed-T3-deployable-T1 principle

The Data Layer has the most cost variation per tier of any layer in Commander. Ingestion pipelines, queueing, caching, search — each has dramatic cost differences between in-process T1 implementations and full-T3 managed services.

- In-process queue (zero infrastructure cost) vs SQS / Kinesis (per-message billed).
- In-app cache (free, in-memory) vs ElastiCache Redis (per-instance billed).
- Postgres FTS (free, included with database) vs OpenSearch (per-instance billed, often expensive).
- In-process scheduled jobs vs EventBridge / Step Functions.

Over-engineering this layer at T1 wastes money on customers who don't yet exist. Under-engineering it at T3 fails the product under load.

The discipline: **architecture is T3-aware**. Every Data Layer component is built with a deployment abstraction so the same code can run in-process at T1, queue-backed at T2, fully event-streamed at T3. **Code does not change at tier promotion** — only deployment configuration. This is the Data Layer's load-bearing discipline.

---

## 3. The four workload classes

Carrying from PD-1.0 §6 and the Database Layer Strategy §6: every operation against data declares its workload class.

1. **`operational-read`** — low-latency reads serving the application UI.
2. **`operational-write`** — low-latency writes from application UI flows.
3. **`ingestion-write`** — high-volume writes from connectors and signal sources.
4. **`analytics-read`** — heavy aggregation reads for dashboards and analytics.
5. **`reporting-read`** — scheduled / batch reads for extracts and exports.

The Data Layer is where workload-class routing is *resolved*. Application code passes the class as part of the call; the Data Layer routes to the appropriate physical resource based on current tier configuration.

---

## 4. Architecture

### 4.1 Ingestion pipeline

```
Connector → Adapter → Normaliser → Verdict Generator → Persistence → Surface Attribution → Audit
```

At each step, surface attribution (`internal_attack_surface` / `external_attack_surface` per Spec #60) is preserved as a first-class field. Loss of surface attribution at any step is a doctrinal violation.

**T1 deployment:**
- Ingestion runs in-process within the application server.
- Connector polling on a schedule (cron-like).
- Normalisation and verdict generation synchronous within the polling tick.
- Persistence to the single Postgres instance.
- Queueing internal to the process (in-memory queue).

**T2 deployment:**
- Ingestion runs in dedicated worker pool, separated from application servers.
- Connector polling on a scheduled job runner (e.g. EventBridge).
- Normalisation and verdict generation may run async via SQS.
- Persistence to ingestion-class connection pool (potentially separate from operational).
- Queueing via SQS or equivalent managed queue service.

**T3 deployment:**
- Ingestion is a full event-streamed pipeline (Kinesis / Kafka).
- Connector polling distributed across worker pools.
- Normalisation and verdict generation stream-processed.
- Persistence to dedicated ingestion database, with CDC to operational database for state derived from ingestion.
- Queueing via the event stream itself; SQS used for control plane events only.

### 4.2 Cache abstraction

A `Cache` interface is mandatory for any cacheable read. Application code calls `cache.get(key)` and `cache.set(key, value, ttl)`; the implementation behind the interface varies by tier:

- **T1:** in-process LRU cache (e.g. `node-lru-cache`). No external service.
- **T2:** ElastiCache Redis with a connection pool. Same `Cache` interface, different backing.
- **T3:** ElastiCache Redis cluster with multi-AZ failover, regional replicas if needed.

Application code is identical at every tier. Cache invalidation rules are declared per-key-prefix in a single registry.

### 4.3 Search abstraction

A `Search` interface for any text-search or cross-entity search query. The interface accepts a query and returns matching IDs.

- **T1:** Postgres full-text search using `tsvector` columns and GIN indexes. No external service.
- **T2/T3:** OpenSearch cluster. Same `Search` interface, different backing. Data ingestion to OpenSearch via CDC from the operational database.

The application calls the interface. The implementation routes based on tier configuration.

### 4.4 Read models

Analytics and reporting workloads route through **read models** — purpose-built data shapes optimised for query patterns. Even at T1, the discipline is enforced:

- **T1:** read models are Postgres views or materialised views in the same operational database. The application queries them via the `analytics-read` workload class.
- **T2:** read models may live in a dedicated analytics replica, populated via Postgres replication.
- **T3:** read models may live in a columnar analytics store (Redshift, ClickHouse) populated via CDC.

The application code calls `readModel.casesByMonth()` (for example). The implementation routes to the appropriate physical store. Never does the application query the operational tables directly for analytics workloads — always through the read model interface.

### 4.5 Queue abstraction

For async work (deferred ingestion, scheduled re-evaluations, batch jobs), a `Queue` interface:

- **T1:** in-process queue. Jobs run in the same Node process as the application.
- **T2:** SQS-backed queue. Worker pool consumes from SQS.
- **T3:** Kinesis or Kafka stream for high-throughput cases; SQS for control plane.

Application code calls `queue.enqueue(jobName, payload)`. The implementation routes based on tier configuration.

---

## 5. Connector classes

Per Spec #61, connectors are classified A/B/C/D by integration depth and signal volume:

- **Class A** — direct API integration, high-volume real-time-ish signals (e.g. cloud provider APIs).
- **Class B** — webhook-driven, event-based signals.
- **Class C** — scheduled batch fetch, periodic state updates.
- **Class D** — manual upload, low-volume one-off imports.

The Data Layer handles all four classes through the same ingestion pipeline. Class-specific behaviour (polling cadence, payload size expectations, normalisation rules) is configured per connector at registration time, not hardcoded in the pipeline.

---

## 6. Measurable units

### 6.1 Static structural units (measurable now)

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| Workload class declared on every data access | bigger-is-better | 100% | Static code analysis | Static |
| Cache interface used for all cacheable reads (no direct cache impl in app code) | bigger-is-better | 100% | Static code analysis | Static |
| Search interface used for all text searches (no direct DB FTS calls in app code) | bigger-is-better | 100% | Static code analysis | Static |
| Read model interface used for analytics queries | bigger-is-better | 100% | Static code analysis | Static |
| Queue interface used for async work | bigger-is-better | 100% | Static code analysis | Static |
| Surface attribution preserved through pipeline | bigger-is-better | 100% | Static code analysis | Static |
| No direct operational-table reads for analytics workloads | smaller-is-better | 0 occurrences | Static code analysis | Static |
| Cache invalidation rules declared per key-prefix | bigger-is-better | 100% of cache keys | Static code analysis | Static |

### 6.2 Live-runtime units (deferred until pipelines live)

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| Ingestion throughput | bigger-is-better | per connector class | Pipeline metrics | Deferred — first live connector |
| Ingestion p95 latency (signal in → verdict persisted) | smaller-is-better | < 5s for Class A/B, < 30s for Class C | Pipeline metrics | Deferred — same |
| Queue depth (steady state) | smaller-is-better | < 100 messages | Queue metrics | Deferred — first async work wired |
| Queue depth (peak) | smaller-is-better | < 10,000 messages | Queue metrics | Deferred — same |
| Cache hit rate (operational reads) | bigger-is-better | > 90% | Cache metrics | Deferred — cache instrumentation wired |
| Cache hit rate (strategy reads) | bigger-is-better | > 98% | Cache metrics | Deferred — same |
| Search query p95 latency | smaller-is-better | < 200ms | Search metrics | Deferred — search wired with representative volume |
| Read model freshness (lag from source) | smaller-is-better | < 60s for T1 views | Read model instrumentation | Deferred — first live analytics workload |
| End-to-end signal latency (connector → application visible) | smaller-is-better | < 30s for Class A/B | Distributed tracing | Deferred — observability wired |
| Backpressure activation count | smaller-is-better | 0 in steady state | Pipeline metrics | Deferred — first connector live at volume |

### 6.3 Connector-class-specific units (deferred)

Each connector class has its own throughput and latency targets, evaluated independently:

| Class | Throughput target | Latency target (p95) |
|---|---|---|
| A | 10k signals/min sustained per tenant | < 5s signal → verdict |
| B | webhook event rate per source | < 2s event → verdict |
| C | full batch completion within poll window | < poll window |
| D | best effort | best effort |

---

## 7. Cache strategy

### 7.1 What gets cached

- **Strategy resolver outputs** — read on every request, change rarely. Cache aggressively (TTL hours, invalidate on strategy version change).
- **Operational reference data** — tenant configuration, user metadata, role mappings. Cache 5-15 minutes.
- **Recent case lists** (within a user's session) — cache short (30s) with stale-while-revalidate.
- **Dashboard data** — cache with explicit TTL and background refresh.

### 7.2 What does not get cached

- **Live state of an active case** — always read fresh; staleness is a doctrinal hazard.
- **P0 War Room data** — always read fresh.
- **Audit log** — never cached for read.

### 7.3 Cache invalidation

Every cache key prefix declares its invalidation rule:
- TTL-based (most common)
- Event-driven (e.g. invalidate strategy cache on policy update event)
- Manual (rare; explicit invalidation calls)

Invalidation rules are scorecard-checked. Missing invalidation declaration is an Amber unit.

---

## 8. Read model strategy

### 8.1 T1 read models

At T1, read models are Postgres views or materialised views in the operational database:

- `analytics.case_metrics_daily` — materialised view, refreshed nightly
- `analytics.case_volume_by_surface` — materialised view, refreshed hourly
- `analytics.connector_health_summary` — view (live calculation, light enough)
- `analytics.posture_score_trend` — materialised view, refreshed hourly

The application calls the read model interface; the implementation queries these views via the `analytics-read` workload class.

### 8.2 Read model freshness

Each read model declares its expected freshness (lag from source). The scorecard tracks freshness against target.

### 8.3 T2/T3 evolution

At T2, read models may move to dedicated read replicas. At T3, they may move to a columnar analytics store. The interface remains; the implementation changes.

---

## 9. Surface attribution preservation

Per Spec #60, every signal entering Commander carries surface attribution (`internal_attack_surface` / `external_attack_surface`). Through the entire data flow — ingestion, normalisation, verdict generation, persistence, indexing, caching, analytics — surface attribution is preserved as a first-class field.

The scorecard verifies:
- Every signal-bearing data structure has the surface attribution field.
- Every transformation pipeline preserves it.
- Every read model includes it where downstream consumers may filter or aggregate by it.

Loss of surface attribution at any point is a doctrinal violation.

---

## 10. Scorecard composition

The Data Layer scorecard reports the band of every measurable unit declared in §6, classified per PD-1.0 §4.

Typical scorecard output (early stage, pre-live-pipeline):

```
Data Layer Compliance Report — {timestamp}
============================================
{N} units total ({static} static-scoreable, {live} live, {deferred} deferred)

Static checks:
Green   (95–100%)  : {count} units — {pct}
Yellow  (85–94%)   : {count} units — {pct}
Amber   (60–84%)   : {count} units — {pct}
Red     (<60%)     : {count} units — {pct}

Overall layer band (measured units only): {BAND}
Red units present: {YES/NO}

Red units:
  Read model abstraction — analytics queries hit operational tables directly (target: read model interface only)

Amber units:
  Cache invalidation rules — 3 of 12 cache key prefixes lack declared invalidation rules

Deferred ({count}):
  All live pipeline metrics — deferred until first connector live
  All cache hit rate metrics — deferred until cache instrumentation wired
  ...
```

---

## 11. Remediation guidance

Static-check remediation references:

- **Direct cache implementation in app code** → reference §4.2; suggest cache interface wrapping.
- **Direct DB FTS calls in app code** → reference §4.3; suggest search interface adoption.
- **Operational-table reads for analytics** → reference §4.4; suggest read model creation.
- **Synchronous async work in app code** → reference §4.5; suggest queue interface adoption.
- **Missing cache invalidation rule** → reference §7.3; suggest declaring rule per key prefix.
- **Surface attribution loss in pipeline** → reference §9; identify the lossy step; suggest preservation fix.

Live-runtime remediation (post-pipelines-live):

- **Low cache hit rate** → identify the key prefix; review TTL and invalidation; consider warmup strategy.
- **High queue depth** → identify the backpressure cause; scale workers or examine producer rate.
- **High ingestion latency** → identify the slow pipeline step via distributed tracing; optimise.
- **Slow search queries** → identify query pattern; review search index configuration.

---

## 12. Tier deployment progression

### 12.1 T1 deployment

- All pipelines in-process.
- All caches in-process LRU.
- Search via Postgres FTS.
- Read models as Postgres views.
- Single Node process per application server.

### 12.2 T2 deployment

- Ingestion in dedicated worker pool, separate from app servers.
- ElastiCache Redis for cache.
- OpenSearch for search.
- Read models on a read replica of the operational database.
- SQS for async work.

### 12.3 T3 deployment

- Event-streamed ingestion (Kinesis or Kafka).
- ElastiCache Redis cluster, possibly multi-region.
- OpenSearch cluster, possibly multi-region.
- Read models in a columnar store with CDC from operational.
- Per-workload-class physical separation if needed.

---

## 13. Standing rules specific to the Data Layer

Carrying from PD-1.0 §9 and the performance steering, with Data-Layer-specific additions:

1. No data access in the application without a declared workload class.
2. No cache use in the application without going through the `Cache` interface.
3. No search use in the application without going through the `Search` interface.
4. No analytics query against operational tables. Read models only.
5. No async work without going through the `Queue` interface.
6. No transformation pipeline without surface-attribution preservation.
7. No cache key prefix without a declared invalidation rule.
8. No new connector added without its connector class declared and its expected throughput/latency targets specified.

---

## 14. Authority and lineage

This strategy operates under `PERFORMANCE_DOCTRINE.md` (PD-1.0). It is referenced by:

- `.kiro/steering/performance-discipline.md` (always-on steering)
- Spec 04 (Canonical Data Model) — schema, which this layer flows data through
- Spec 16 (Data Layer Performance) — new spec, EARS requirements for Database + Data Layers
- `docs/00_authority/DATABASE_LAYER_STRATEGY.md` — sibling, the storage layer this layer moves data to and from
- `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` — measurement engineering
- `.kiro/hooks/05-performance-compliance.kiro.hook` — enforcement
- Baseline Spec #16 (Performance, Scaling and Operational) — source content
- Baseline Spec #05 (Data Connector Normalisation) — source for verdict storage tiering and raw payload strategy
- Spec #60 (Surface Attribution) — preservation requirement
- Spec #61 (Connector Classes) — class-specific behaviour

This document is the deep authority for Data Layer matters. Where any other document conflicts on Data Layer specifics, this one wins.
