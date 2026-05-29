# Commander SDR — Database Layer Strategy

**Version:** DBL-1.0
**Status:** Authoritative. Operates under `PERFORMANCE_DOCTRINE.md` (PD-1.0).
**Tier strategy:** Always **designed at T3** with technology-portability built in across the Postgres family. Deployment instantiation steps T1 → T2 → T3 without code change.
**Authority:** This document is the deep authority for the database engine, schema design, indexing, partitioning, query plans, engine-level configuration, and storage primitives. Data *at rest*.

---

## 1. Scope

The Database Layer covers:

- Schema design (tables, columns, types, constraints)
- Indexing strategy (B-tree, composite, partial, GIN, GiST)
- Partitioning rules and partition key choices
- Query patterns and query-plan compliance
- Cursor pagination discipline
- Tenant-isolation discipline at the schema level
- Connection context discipline (workload-class routing)
- Storage tiering (hot / warm / cold)
- Engine-level configuration (relevant Postgres parameters)
- Schema-level portability across the Postgres family

Not in scope: data flow (Data Layer), deployment topology (Infrastructure Layer), the application code that consumes the database (Application Layer).

---

## 2. The always-T3-design principle

Schema design and access patterns determine the product's scale ceiling. A schema designed without proper indexes, without tenant-leading composites, without cursor pagination, without partition-readiness, is *catastrophically expensive to fix at scale*. Index additions on multi-million-row tables under live load are operational events. Partitioning a table after it has grown to billions of rows can require migration projects of weeks.

Therefore: the Database Layer is **designed at T3 from inception**, regardless of current deployment tier. The schema you build at T1 is the schema you run at T3; only the engine, instance class, replicas, and partitioning instantiation change at promotion.

The cost discipline at this layer is about *what's deployed at the current tier* (instance class, replicas, storage type, IOPS provisioning) — not what's designed. The design is constant; the deployment varies.

---

## 3. Postgres-family portability

The Database Layer is technology-portable across the **Postgres family**:

- Vanilla PostgreSQL (open-source, RDS, self-managed)
- Amazon Aurora PostgreSQL (managed, cloud-native)
- Citus (distributed sharded Postgres)
- CockroachDB (Postgres-wire-compatible, distributed)
- YugabyteDB (Postgres-wire-compatible, distributed)
- Any future Postgres-compatible engine

Portability *outside* this family (e.g. to MySQL, SQL Server, MongoDB) is **not a goal**. The boundary is the Postgres family because it captures the realistic upgrade paths Commander would actually take — same SQL dialect, same client libraries, same tooling, same migration patterns.

### 3.1 What this permits

Within the family boundary, the following are permitted and used freely:

- Standard SQL (DDL and DML)
- Common Postgres data types (UUID, JSONB, ENUM, ARRAY, INET, RANGE)
- Standard index types (B-tree, GIN, GiST, partial, expression indexes)
- Common table expressions and recursive CTEs
- Window functions
- Postgres-compatible function definitions (PL/pgSQL within reason — see 3.2)

### 3.2 What this forbids

Engine-specific features that don't port cleanly across the family are **forbidden in application-facing code**. Specifically:

- **LISTEN/NOTIFY** — not supported uniformly across distributed Postgres-compatible engines. Use async messaging (Data Layer) for cross-process signalling.
- **Stored procedures with complex business logic** — application logic lives in application code, not the database.
- **Vendor-specific extensions** (e.g. Aurora-only features) outside the standard Postgres extension set.
- **Specific JSONB operators that vary across the family** — stick to the well-supported core operators (`->`, `->>`, `@>`, `?`, `?|`, `?&`, `||`).

Where a Postgres-specific extension is genuinely necessary (e.g. `pgcrypto`, `pg_trgm`, `uuid-ossp`), the dependency is documented in the schema migration and verified as available across the family targets.

### 3.3 Distributed-engine readiness

For eventual T3 promotion to a distributed Postgres engine (Citus, CockroachDB, Yugabyte) the schema honours additional constraints:

- **Tenant-leading primary keys and indexes** — facilitates clean horizontal sharding by tenant.
- **No cross-shard JOINs in the hot path** — application queries do not join across tenants. Cross-tenant aggregation runs in analytics workloads where eventual consistency is acceptable.
- **No serializable transactions across multiple tenant rows** — transactional scope is single-tenant by default.

These constraints cost almost nothing at T1 and unlock T3 migration when the time comes.

---

## 4. Measurable units

Every measurable unit in the Database Layer is declared here with its target, measurement method, and readiness.

### 4.1 Static structural units (measurable now)

These units are verifiable by static analysis of the schema and query code, with no live database required.

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| Tenant-scoped tables with `tenant_id` column | bigger-is-better | 100% | Schema inspection | Static |
| Tenant-scoped composite indexes leading with `tenant_id` | bigger-is-better | 100% | Schema inspection | Static |
| Cursor pagination on list endpoints | bigger-is-better | 100% | Query code static analysis | Static |
| Offset pagination on list endpoints | smaller-is-better | 0 occurrences | Query code static analysis | Static |
| Foreign keys crossing workload boundaries (per §6) | smaller-is-better | 0 occurrences | Schema inspection | Static |
| GIN indexes on queried JSONB columns | bigger-is-better | 100% of queried JSONB columns | Schema + query inspection | Static |
| Forbidden engine-specific features (per §3.2) | smaller-is-better | 0 occurrences | Static code analysis | Static |
| High-volume tables with partition-ready design | bigger-is-better | 100% of declared high-volume tables | Schema inspection | Static |
| Tables with tenant-leading primary key | bigger-is-better | 100% of tenant-scoped tables | Schema inspection | Static |
| Connection context discipline (workload class on every DB call) | bigger-is-better | 100% of DB calls | Static code analysis | Static |
| Domain schema segmentation (per §7) | bigger-is-better | 100% of tables in correct domain schema | Schema inspection | Static |

### 4.2 Live-runtime units (deferred until DB wired)

These units require a live Postgres instance with representative seed volumes to measure.

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| p95 query latency — operational list reads | smaller-is-better | < 100ms | EXPLAIN ANALYZE + load test | Deferred — T1 live DB wired with representative volume |
| p95 query latency — operational detail reads | smaller-is-better | < 50ms | EXPLAIN ANALYZE + load test | Deferred — same |
| p95 query latency — operational writes | smaller-is-better | < 30ms | Load test | Deferred — same |
| p95 query latency — aggregation queries (analytics) | smaller-is-better | < 250ms | Load test | Deferred — T1 live DB + analytics read paths active |
| Sequential scans on tables > 10,000 rows | smaller-is-better | 0 occurrences | `pg_stat_statements` | Deferred — same |
| Index usage on declared composite indexes | bigger-is-better | > 95% of qualifying queries | `pg_stat_user_indexes` | Deferred — same |
| Lock contention duration | smaller-is-better | < 5ms p95 | `pg_locks` monitoring | Deferred — same |
| Replication lag (when replicas exist) | smaller-is-better | < 200ms p95 | RDS metrics | Deferred — T2 replicas wired |
| Connection pool saturation | smaller-is-better | < 70% utilisation under normal load | Pool metrics | Deferred — T2 PgBouncer/RDS Proxy wired |

### 4.3 Schema discipline units (measurable now via static analysis)

Specific schema-level rules that map directly to scoreable units.

| Unit | Type | Target | Readiness |
|---|---|---|---|
| Tables in `public` schema (should be zero for domain tables) | smaller-is-better | 0 domain tables in `public` | Static |
| Cross-domain joins in operational queries | smaller-is-better | 0 occurrences | Static |
| Unindexed `WHERE` clause columns on tables > 1,000 expected rows | smaller-is-better | 0 occurrences | Static |
| Boolean columns indexed (almost always wrong) | smaller-is-better | 0 occurrences (allow only partial indexes) | Static |
| Text columns over 1KB unindexed but searched | smaller-is-better | 0 occurrences (use GIN/trigram) | Static |

---

## 5. Indexing strategy

### 5.1 Standard composite indexes

Every tenant-scoped table has the following baseline indexes, beyond its primary key:

```
PRIMARY KEY: (tenant_id, id) -- composite, tenant-leading
INDEX: (tenant_id, created_at DESC) -- recent-records access
INDEX: (tenant_id, status, created_at DESC) -- status-filtered list views
```

Additional indexes are added per the query patterns the application uses against the table. Index design is *query-pattern-led*, not speculative — every index justifies its cost against a query that uses it.

### 5.2 GIN indexes on JSONB

Every JSONB column that participates in a `WHERE` clause has a GIN index. Where specific JSONB paths are repeatedly queried, expression indexes on those paths are preferred over a generic GIN to reduce write cost.

### 5.3 Partial indexes

For columns with strongly skewed distributions (e.g. `is_active` mostly true), partial indexes on the rare value are used in preference to full indexes on the column.

### 5.4 Index audit cadence

The Database Layer scorecard checks index coverage on every commit that touches schema or queries. Index drift (declared indexes no longer used; queries lacking required indexes) surfaces as Amber or Red units.

---

## 6. Workload-class discipline

Carrying from PD-1.0 §6 and the performance steering rules: every database operation declares its workload class. The four classes:

1. `operational-read` — low-latency reads serving the application UI.
2. `operational-write` — low-latency writes from application UI flows.
3. `analytics-read` — heavy aggregation reads, latency-tolerant.
4. `reporting-read` — scheduled / batch reads for extracts and exports.
5. `ingestion-write` — high-volume writes from connectors and signal sources.

### 6.1 Connection contexts

The application maintains separate connection contexts per workload class. At T1, all contexts resolve to the same connection pool against the same Postgres instance. At T2 and beyond, contexts resolve to different pools, different replicas, or different physical databases.

The application code does not change between tiers. Only the configuration of which connection context resolves to which physical endpoint changes.

### 6.2 No cross-workload foreign keys

Tables that may eventually live in different physical databases (per the workload separation principle) must not have foreign keys between them. Referential integrity across workload boundaries is enforced at the application layer or through async messaging (Data Layer).

Specifically:
- **Operational tables** (cases, assets, identities, controls, exposures) may have foreign keys among themselves.
- **Ingestion tables** (raw connector payloads, signal events, audit log entries) may have foreign keys among themselves.
- **Analytics tables** (aggregated views, materialised dashboards) may have foreign keys among themselves.
- **No foreign keys cross these groups.**

### 6.3 Audit log isolation

Audit log entries are a separate workload-class concern. They are append-only, high-volume, never read in the operational hot path. They live in their own table family with their own retention and partition strategy. No operational query reads from the audit log.

---

## 7. Domain schema segmentation

Per baseline `CHANGE-ARCH-002`, the Database Layer organises tables into 17 domain schemas (not a single flat `public` schema):

```
core         -- shared primitives (tenants, users, sessions)
asset        -- asset domain
identity     -- identity domain
exposure     -- exposure / vulnerability domain
control      -- security control domain
case_mgmt    -- case management
communication -- communication threads (data model only at T1)
connector    -- connector configuration and run history
normalisation -- normalisation rules and history
rule_engine  -- detection rules and run history
push         -- push notification / messaging
compliance   -- compliance frameworks and mappings
architecture -- architecture / topology entities
tooling      -- tool registry and integrations
audit        -- audit log entries (high-volume, append-only)
admin        -- tenant admin entities
ai           -- AI assistance models and prompts
```

Domain segmentation provides:
- Clean access control boundaries (Postgres schema-level GRANT/REVOKE)
- Faster query planning (smaller catalog per query)
- Cleaner mental model for cross-domain operations
- Migration boundaries — domain schemas can move to separate physical databases at T2/T3 without table-rename gymnastics

Tables are placed in the correct domain schema from inception. The `public` schema holds only cross-cutting infrastructure (e.g. migration tracking).

---

## 8. Partitioning strategy

### 8.1 Tables declared high-volume

The following tables are designed for partitioning from inception, regardless of current row count:

- `audit.audit_entries` — by `created_at` (monthly partitions)
- `connector.raw_signals` — by `created_at` (monthly partitions)
- `rule_engine.rule_execution_history` — by `created_at` (monthly partitions)
- `push.email_messages` — by `created_at` (monthly partitions)
- `connector.connector_run_records` — by `created_at` (monthly partitions)
- `core.telemetry_events` — by `created_at` (monthly partitions)

At T1, these tables may be deployed as single tables (declarative partitioning prepared but not yet instantiated). At T2 promotion, partitions are activated; at T3, additional partitioning by tenant may be introduced for hyper-scale tenants.

### 8.2 Retention rules

Each high-volume table has explicit retention rules. The scorecard verifies retention rules are declared per table; missing retention is an Amber unit.

---

## 9. Storage tiering

Verdict semantics carry from MTS §11.1 and baseline Spec #05:

- **Hot tier (0–72 hours):** Full verdict detail, in the operational database, queried directly by application.
- **Warm tier (3–30 days):** Verdict summaries with key fields, in the operational database, queried less frequently.
- **Cold tier (30 days+):** Compressed summaries in object storage, restored on demand for audit / forensic queries.

The schema is designed with tier-aware columns and partitions from inception. Tier movement is automated via scheduled jobs at the Data Layer; the Database Layer holds the schema, indexes, and storage primitives to support it.

---

## 10. Tier deployment progression

The Database Layer's *design* is constant across tiers. Deployment varies:

### 10.1 T1 deployment

- Single Postgres instance (RDS or self-managed)
- Single AZ
- Single connection pool
- All workload classes resolve to the same connection pool
- No read replicas
- No external caching layer (in-app caching at the Data Layer)
- Single-region

### 10.2 T2 deployment

- Multi-AZ Postgres (RDS Multi-AZ, or Aurora)
- Read replica for analytics and reporting workload classes
- Connection pooling via RDS Proxy or PgBouncer
- Workload classes resolve to different pools / replicas
- Single-region with disaster recovery to second region
- High-volume tables partitioned (activate from declarative)

### 10.3 T3 deployment

- Aurora cluster with multi-AZ writers and multiple read replicas, OR distributed Postgres (Citus, CockroachDB-PG mode, Yugabyte)
- Per-region read replicas
- Workload classes may resolve to physically separate databases (e.g. ingestion DB separate from operational DB)
- Multi-region with active-active or active-passive depending on tenant requirements
- Partitioning on both date and tenant for the largest tables
- Analytics workload may move to a columnar store (Redshift, ClickHouse) via CDC

### 10.4 Promotion criteria

Tier promotion happens by deployment configuration change, not code change. Promotion criteria are documented in the `INFRASTRUCTURE_LAYER_STRATEGY.md`. Each promotion is recorded as a decision.

---

## 11. Scorecard composition

The Database Layer scorecard reports the band of every measurable unit declared in §4, classified per PD-1.0 §4. Static units are scored from day one; live units are scored after their deferral milestones arrive.

Typical scorecard output (early-stage, before live DB):

```
Database Layer Compliance Report — {timestamp}
================================================
{N} units total ({static} static-scoreable, {live} live, {deferred} deferred)

Static checks:
Green   (95–100%)  : {count} units — {pct}
Yellow  (85–94%)   : {count} units — {pct}
Amber   (60–84%)   : {count} units — {pct}
Red     (<60%)     : {count} units — {pct}

Overall layer band (measured units only): {BAND}
Red units present: {YES/NO}

Red units:
  Schema indexing — 0 indexes beyond PKs (target: composite indexes on all tenant-scoped tables)
  Domain schema segmentation — all tables in public (target: 17 domain schemas)

Amber units:
  ...

Deferred ({count}):
  All p95 query latency units — deferred until T1 live database wired with seed-equivalent volume
  ...
```

---

## 12. Remediation guidance

Static-check Red and Amber units have direct remediation references:

- **Missing tenant-leading composite indexes** → reference §5.1; suggest a schema migration phase to add them per table.
- **Offset pagination** → reference §4.1; suggest a query refactor phase.
- **Domain schema gaps** → reference §7; suggest a schema reorganisation phase.
- **Cross-workload foreign keys** → reference §6.2; suggest replacing with application-layer integrity or async messaging.
- **Forbidden engine-specific features** → reference §3.2; suggest a portability fix.
- **Unindexed `WHERE` clauses** → reference §4.3; suggest index addition with query-pattern justification.

Live-runtime Red and Amber units (post-DB-wire) reference live measurements:

- **High p95 query latency** → identify the query via `pg_stat_statements`, run EXPLAIN ANALYZE, suggest index or query refactor.
- **Sequential scans on large tables** → identify offending queries; suggest index addition.
- **Lock contention** → identify the locking pattern; suggest transaction-scope reduction or isolation-level review.

---

## 13. Measurement methods

### 13.1 Schema inspection (static)

Drizzle schema files parsed via TypeScript AST. Tables, columns, indexes, foreign keys catalogued. Compliance checks run against the catalog.

### 13.2 Query code static analysis

TypeScript AST traversal of application code. Identifies:
- Pagination patterns (cursor vs offset)
- Workload-class declarations on database calls
- Cross-domain joins in operational queries
- JSONB query patterns and matching indexes
- Forbidden engine-specific features

### 13.3 EXPLAIN ANALYZE harness (deferred)

A test harness that, given a live database with representative seed data, runs every catalogued query under EXPLAIN ANALYZE and checks the plan against expectations (no sequential scans on large tables, expected index usage, row count estimates within tolerance).

Activated when T1 live database is wired and seed volume is loaded.

### 13.4 `pg_stat_statements` and `pg_stat_user_indexes` (deferred)

Standard Postgres extensions for query-pattern and index-usage statistics. Activated on the live database. Periodic scorecard runs read these views to compute index usage rates and surface high-latency queries.

### 13.5 Load test runner (deferred)

A load-test runner (e.g. k6, Locust) that exercises every catalogued query pattern at representative concurrency. Activated when T1 live database is wired.

---

## 14. Standing rules specific to the Database Layer

Carrying from PD-1.0 §9 and the performance steering rules, with Database-Layer-specific additions:

1. No table is added to the schema without its expected query patterns documented and indexes designed for them.
2. No tenant-scoped table is added without `tenant_id` and a tenant-leading composite index.
3. No new query is shipped without confirming it has matching index coverage (verified by static analysis pre-merge).
4. No foreign keys are added that cross workload-class boundaries.
5. No engine-specific features (per §3.2) are introduced without an explicit decision record naming the dependency and verifying family-wide support.
6. No offset pagination is introduced. Cursor pagination is mandatory for list endpoints.
7. No production deployment occurs against a database that has not had its scorecard run and confirmed compliant.

---

## 15. Authority and lineage

This strategy operates under `PERFORMANCE_DOCTRINE.md` (PD-1.0). It is referenced by:

- `.kiro/steering/performance-discipline.md` (always-on steering)
- Spec 04 (Canonical Data Model) — existing, the schema definition
- Spec 16 (Data Layer Performance) — new spec, EARS requirements for Database + Data Layers
- `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` — measurement engineering
- `.kiro/hooks/05-performance-compliance.kiro.hook` — enforcement
- Baseline `Spec #16 Performance, Scaling and Operational Specification` — source content, now active doctrine
- Baseline `CHANGE-ARCH-002 Domain-Segmented PostgreSQL and Performance Baseline` — source for domain schema strategy

This document is the deep authority for Database Layer matters. Where any other document conflicts on Database Layer specifics, this one wins; the other must be updated.
