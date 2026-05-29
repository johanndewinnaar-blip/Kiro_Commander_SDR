# Commander SDR — Infrastructure Layer Strategy

**Version:** IL-1.0
**Status:** Authoritative. Operates under `PERFORMANCE_DOCTRINE.md` (PD-1.0).
**Tier strategy:** **Explicitly tiered T1 → T2 → T3.** Each tier has a designed topology, documented upgrade path, and explicit cost band. Tier promotion is a deployment event, not a code event.
**Authority:** This document is the deep authority for the AWS infrastructure substrate — compute, networking, storage, regions, availability zones, edge, observability, autoscaling, deployment strategy, cost discipline.

---

## 1. Scope

The Infrastructure Layer covers:

- AWS region and availability zone strategy
- Compute platform (application servers, worker pools, ingestion workers)
- Database deployment topology (RDS / Aurora / distributed)
- Caching layer deployment (ElastiCache)
- Search layer deployment (OpenSearch)
- Object storage and storage tiering (S3, Glacier)
- Networking (VPC, subnets, security groups, NAT, transit gateways)
- Edge and CDN (CloudFront)
- Observability stack (CloudWatch, X-Ray / OpenTelemetry, log aggregation)
- Autoscaling rules and policies
- Deployment strategy (blue-green, canary, rollback)
- Infrastructure as Code (Terraform / CDK)
- Cost discipline per tier
- Disaster recovery and failover

Not in scope: application code (Application Layer), database schema (Database Layer), data flow (Data Layer).

---

## 2. The explicit tiering principle

The Infrastructure Layer has the most cost variation per tier of any layer. The difference between a minimal T1 deployment and a full T3 deployment can be one to two orders of magnitude in monthly AWS spend.

Therefore: Infrastructure is **explicitly tiered**, with each tier's topology, capabilities, and cost band documented. T1 is minimum viable for demo and earliest customers. Promotion to T2 or T3 happens when business scale demands it, not before.

The discipline:
- **Don't deploy T2 patterns at T1** — wasteful spend on capabilities the business cannot yet use.
- **Don't build code that blocks promotion** — code-level decisions (workload classes, interface abstractions, IaC modularity) must support every tier from day one.

Tier promotion is a **deployment change, not a code change**.

---

## 3. Tier 1 (T1) — Bootstrap

### 3.1 Purpose

Demo environments, earliest customers, low-volume tenants. Minimum viable infrastructure to run Commander credibly. Single-tenant or small-multi-tenant deployments.

### 3.2 Scale band

- Up to ~10 tenants
- Up to ~1,000 cases per tenant
- Up to ~50,000 assets per tenant
- Up to ~100 connector signals per minute aggregate

### 3.3 Topology

```
Single AWS region (eu-west-2 or us-east-1 depending on customer location)
Single availability zone acceptable

Compute:
  Application servers: Vercel or AWS Fargate (single task family, 2-4 tasks)
  Worker pool: same Fargate cluster, separate task family for workers
  Auto-scaling: request-latency-based, conservative (2-8 instance ceiling)

Database:
  RDS PostgreSQL 16, db.t4g.medium or db.t4g.large
  Single AZ acceptable for non-paying tenants
  Multi-AZ for any paying customer
  20-100 GB gp3 storage
  Automated backups, 7-day retention

Caching:
  In-app LRU cache (no ElastiCache deployment)

Search:
  Postgres full-text search (no OpenSearch deployment)

Async work:
  In-process queue (no SQS deployment)

Object storage:
  S3 bucket for asset uploads, evidence attachments
  Standard tier; lifecycle to Glacier after 90 days

Networking:
  Single VPC, public + private subnets
  Application Load Balancer
  Single NAT gateway

CDN:
  CloudFront for static asset delivery
  ISR caching at the edge for cacheable routes

Observability:
  CloudWatch logs and metrics
  Basic dashboards, no distributed tracing yet
  AWS X-Ray opt-in for diagnostics

Deployment:
  Blue-green via Vercel preview deployments or Fargate task rotation
  Manual rollback acceptable; automated rollback aspirational

Disaster recovery:
  Daily automated snapshots
  Cross-region backup replication aspirational
  RTO 4 hours, RPO 24 hours
```

### 3.4 Cost band

Target T1 baseline cost per tenant per month (idle to light load):

| Component | Approximate monthly cost (USD) |
|---|---|
| Compute (Vercel/Fargate) | $50–$150 |
| Database (RDS) | $80–$200 |
| Storage (S3 + RDS) | $10–$30 |
| Networking | $30–$80 |
| CDN | $5–$20 |
| Observability | $20–$60 |
| **T1 total per tenant** | **$200–$540/month** |

At T1 with up to 10 tenants, total AWS spend should remain under ~$5,000/month. Any T1 deployment exceeding this is a Red unit on the cost scorecard.

### 3.5 What T1 cannot deliver

T1 deliberately omits capabilities that earn their place only at T2/T3:

- Sub-200ms LCP under burst load (would require edge caching investment)
- Multi-region failover
- High-concurrency ingestion (>1k signals/sec)
- Real-time search across millions of records
- Dedicated analytics workloads at scale

These are T2/T3 capabilities, not T1 failures.

---

## 4. Tier 2 (T2) — Mid-scale

### 4.1 Purpose

Production deployment with real customer load. Multiple paying customers across small-to-mid-market tenants. Sufficient infrastructure to deliver top-decile performance for the operational core under normal load.

### 4.2 Scale band

- Up to ~100 tenants
- Up to ~10,000 cases per tenant
- Up to ~500,000 assets per tenant
- Up to ~10,000 connector signals per minute aggregate

### 4.3 Topology — additions and changes from T1

```
Single AWS region with multi-AZ throughout

Compute:
  Application servers: Fargate cluster, 4-16 tasks
  Worker pool: separate Fargate cluster, 2-8 tasks
  Auto-scaling: latency-based, more aggressive ceilings
  Possible: separate ingestion worker pool

Database:
  Aurora PostgreSQL or RDS Multi-AZ
  db.r6g.large or db.r6g.xlarge primary
  1-2 read replicas for analytics/reporting workload classes
  Connection pooling via RDS Proxy or PgBouncer
  100-500 GB storage
  Automated backups, 14-day retention
  Performance Insights enabled

Caching:
  ElastiCache Redis (cluster mode disabled, single shard, multi-AZ)
  cache.r6g.large
  Used for: strategy cache, operational read cache, session cache

Search:
  OpenSearch cluster (3 nodes, t3.medium or r6g.large)
  CDC from operational database to OpenSearch via Lambda or DMS

Async work:
  SQS standard queues for general work
  SQS FIFO for ordering-sensitive work
  EventBridge for scheduled jobs

Object storage:
  Same as T1, with additional buckets for OpenSearch snapshots

Networking:
  Single VPC across multiple AZs
  Multiple NAT gateways (one per AZ)
  Internal traffic via PrivateLink where applicable

CDN:
  CloudFront with custom cache policies per route class
  WAF integration for security and rate limiting

Observability:
  CloudWatch + X-Ray distributed tracing
  Synthetic monitoring for key user flows
  Dashboards per workload class
  Alerting on Red unit thresholds

Deployment:
  Canary deployments via Fargate task rotation
  Automated rollback on canary performance regression
  IaC fully managed via Terraform or CDK

Disaster recovery:
  Cross-region backup replication active
  Standby region with cold-start capability
  RTO 1 hour, RPO 1 hour
```

### 4.4 Cost band

Target T2 cost per tenant per month (steady load):

| Component | Approximate monthly cost (USD) |
|---|---|
| Compute (Fargate) | $150–$400 |
| Database (Aurora + replicas) | $300–$800 |
| Caching (ElastiCache) | $60–$200 |
| Search (OpenSearch) | $200–$500 |
| Async / queueing | $20–$80 |
| Storage | $30–$100 |
| Networking | $80–$200 |
| CDN + WAF | $30–$120 |
| Observability | $80–$200 |
| **T2 total per tenant** | **$950–$2,600/month** |

At T2 with up to 100 tenants, AWS spend should scale roughly linearly with shared infrastructure costs partially absorbed. Total spend target: $40k-$120k/month across all customers.

---

## 5. Tier 3 (T3) — Enterprise / hyper-scale

### 5.1 Purpose

Top-end deployment. Multi-region operations. Hyper-scale tenants (enterprise customers with millions of assets). Full capability for any expected operational load.

### 5.2 Scale band

- Unlimited tenants
- ~50,000+ cases per tenant
- ~5,000,000+ assets per tenant
- Connector signal rates limited only by source systems

### 5.3 Topology — additions and changes from T2

```
Multi-region (active-active or active-passive depending on tenant data residency)

Compute:
  Per-region Fargate or EKS cluster
  Aggressive autoscaling, latency-target SLOs
  Workload-class-separated worker pools

Database:
  Aurora cluster with multi-region replication, OR
  Distributed Postgres (Citus, CockroachDB-PG mode, YugabyteDB)
  Per-region read replicas
  Dedicated ingestion database physically separate from operational
  Connection pooling per workload class

Caching:
  ElastiCache Redis cluster (cluster mode enabled, multiple shards)
  Per-region cache nodes
  Cache warming pipelines

Search:
  OpenSearch cluster, multi-AZ within region, with cross-region replication
  Possibly per-region OpenSearch
  Hot-warm-cold tiering within OpenSearch

Analytics:
  Columnar analytics store (Redshift, ClickHouse) populated via CDC from operational
  Possibly Athena over S3 data lake for unbounded analytics

Async work:
  Kinesis or Kafka for high-throughput event streaming
  SQS for control plane events
  Step Functions for complex workflows

Object storage:
  Multi-region S3 with intelligent tiering
  Glacier Deep Archive for long-term audit retention

Networking:
  Multi-region VPC with transit gateways
  PrivateLink for service-to-service
  Global Accelerator for low-latency global edge

CDN:
  CloudFront global edge
  Lambda@Edge for personalisation at the edge
  Per-route cache strategies

Observability:
  Full distributed tracing (X-Ray or OpenTelemetry)
  Centralised log aggregation
  Per-tenant dashboards
  Anomaly detection on scorecard metrics
  SLO-based alerting

Deployment:
  Multi-region rolling deployments
  Automated rollback on regional performance regression
  Chaos engineering exercises
  Per-region feature flags

Disaster recovery:
  Active-active or hot-standby across regions
  RTO 5 minutes, RPO 1 minute
  Automated failover for region-level outages
```

### 5.4 Cost band

Target T3 cost per tenant per month is more variable due to tenant scale variance. For enterprise tenants:

| Component | Approximate monthly cost (USD) |
|---|---|
| Compute (per region) | $500–$2,000 |
| Database (Aurora/distributed) | $1,000–$5,000 |
| Caching | $200–$800 |
| Search | $500–$2,000 |
| Analytics (columnar) | $500–$2,000 |
| Async / streaming | $200–$1,000 |
| Storage | $200–$1,000 |
| Networking | $200–$800 |
| CDN + edge | $100–$500 |
| Observability | $200–$800 |
| **T3 total per enterprise tenant** | **$3,600–$15,900/month** |

T3 economics rely on dedicated billing per enterprise tenant. The cost model is consumption-based and explicitly defended in the customer contract.

---

## 6. Measurable units

### 6.1 Static structural units (measurable now)

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| IaC coverage for the current tier's topology | bigger-is-better | 100% of infrastructure in IaC | Repository inspection | Static (currently 0% — no IaC yet) |
| Environment-agnostic application code | bigger-is-better | 100% (no hardcoded endpoints, regions, etc.) | Static code analysis | Static |
| Configuration externalised from code | bigger-is-better | 100% | Static code analysis | Static |
| Secrets management via parameter store / secrets manager | bigger-is-better | 100% | Static code analysis | Static |
| Tier promotion path documented for current tier | bigger-is-better | yes | Document inspection | Static |

### 6.2 Live-runtime units (deferred until deployment)

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| Application server p95 response time | smaller-is-better | < 200ms | CloudWatch | Deferred — first deployment |
| Auto-scaling response time | smaller-is-better | < 60s scale-out | CloudWatch | Deferred — first deployment under load |
| Database replication lag (T2+) | smaller-is-better | < 200ms p95 | RDS metrics | Deferred — T2 |
| Deploy time (commit to production) | smaller-is-better | < 15 minutes | CI/CD metrics | Deferred — CI/CD wired |
| Rollback time (regression detection to rollback complete) | smaller-is-better | < 5 minutes | CI/CD metrics | Deferred — automated rollback wired |
| Monthly AWS spend per tenant | smaller-is-better | within tier band (§3.4 / §4.4 / §5.4) | AWS Cost Explorer | Deferred — first paying tenant |
| Region availability (uptime) | bigger-is-better | 99.9% T1, 99.95% T2, 99.99% T3 | AWS Service Health | Deferred — first deployment |
| Distributed tracing coverage | bigger-is-better | 100% of operational hot paths | Trace inspection | Deferred — tracing wired |
| Synthetic monitoring pass rate | bigger-is-better | > 99% | CloudWatch Synthetics | Deferred — synthetics wired |

### 6.3 Cost discipline units (deferred until cost tracking wired)

| Unit | Type | Target | Measurement | Readiness |
|---|---|---|---|---|
| Cost per workload class per tenant per month | smaller-is-better | within tier band | Cost Explorer + tagging | Deferred |
| Unused capacity (compute idle time) | smaller-is-better | < 25% | CloudWatch | Deferred |
| Cost regression per release | smaller-is-better | < 5% per release | Cost Explorer | Deferred |
| Storage tier compliance (hot/warm/cold) | bigger-is-better | 100% of data in correct tier | S3 lifecycle inspection | Deferred — storage tiering active |

---

## 7. Tier promotion criteria

### 7.1 T1 → T2 promotion triggers

Promotion to T2 is appropriate when *any* of:

- Production paying customers exceed ~10.
- A single tenant's case volume exceeds ~5,000 active cases.
- A single tenant's asset volume exceeds ~250,000 assets.
- Aggregate connector signal rate exceeds ~1,000/minute.
- T1 scorecard shows sustained Amber or Red units on application or database layers.
- A paying customer's SLA requires multi-AZ availability.

### 7.2 T2 → T3 promotion triggers

Promotion to T3 is appropriate when *any* of:

- Customer count exceeds ~50 paying tenants.
- Enterprise tenants with data residency requirements across multiple regions.
- A single tenant's case volume exceeds ~25,000 active cases.
- A single tenant's asset volume exceeds ~2,000,000 assets.
- Aggregate signal rate exceeds ~10,000/minute.
- T2 scorecard shows sustained pressure on database or data layers under normal load.
- An enterprise customer's SLA requires multi-region failover.

### 7.3 Promotion process

Each promotion is a deliberate decision with:

1. Decision record in `DECISIONS.md` (`DEC-tier-promotion-{date}`) with rationale.
2. Updated IaC committed to repo (T1 → T2 introduces new modules; T2 → T3 expands them).
3. Migration plan documented in `docs/00_authority/migrations/`.
4. Cost impact projection.
5. Rollback plan.
6. Observability and alerting refreshed for the new tier.

Promotion happens via deployment — no application code changes.

---

## 8. IaC discipline

All infrastructure is managed via Infrastructure as Code, from T1 onwards. Options:

- **Terraform** — preferred for multi-cloud portability and broad community support.
- **AWS CDK** — preferred for AWS-specific deployments with TypeScript familiarity.

Either is acceptable; the choice is a recorded decision (`DEC-iac-tool`). Once chosen, the entire infrastructure lives in IaC. No click-ops production resources.

### 8.1 IaC structure

```
infrastructure/
├── tier-1/                # T1 modules
├── tier-2/                # T2 module additions
├── tier-3/                # T3 module additions
├── shared/                # cross-tier shared modules (VPC, IAM, secrets)
└── environments/
    ├── demo/              # references tier-1 modules
    ├── production-t1/     # T1 production
    ├── production-t2/     # T2 production
    └── production-t3/     # T3 production
```

Tier promotion is a configuration change in the environment definition, applying the appropriate modules.

---

## 9. Observability and alerting

### 9.1 What gets observed

At every tier, observability covers:

- Application server performance (response times, error rates, throughput)
- Database performance (query times, connection pool utilisation, replication lag)
- Cache performance (hit rate, eviction rate, memory usage)
- Async pipeline performance (queue depth, processing latency, error rate)
- Search performance (query latency, index size, ingestion lag)
- Infrastructure health (CPU, memory, network)
- Cost (spend per workload class, per tenant)

### 9.2 Alerting

Alerting is **scorecard-band-driven**:

- **Red unit appears or persists** → page on-call.
- **New Amber unit** → notify channel, ticket for next cycle.
- **Yellow drift** → log only, surface in weekly review.

Alerting fatigue is itself a scorecard concern (count of alerts per week is a unit; too many is Red).

---

## 10. Deployment strategy

### 10.1 T1

- Vercel or Fargate task rotation.
- Manual rollback acceptable.
- Daily deployment cadence acceptable.

### 10.2 T2

- Canary deployment: 5% traffic to new version, monitor scorecard impact, expand or rollback.
- Automated rollback on canary performance regression.
- Multi-times-per-day deployment cadence.

### 10.3 T3

- Multi-region rolling deployment.
- Per-region canary, region-by-region promotion.
- Automated regional rollback.
- Continuous deployment cadence.

---

## 11. Scorecard composition

The Infrastructure Layer scorecard reports the band of every measurable unit declared in §6, classified per PD-1.0 §4. At the current state (no live deployment yet), most units are deferred; scorecard primarily reflects static IaC coverage and code environment-agnosticism.

Typical scorecard output (current, pre-deployment):

```
Infrastructure Layer Compliance Report — {timestamp}
=====================================================
{N} units total ({static} static-scoreable, {live} live, {deferred} deferred)

Static checks:
Green   (95–100%)  : {count} units
Yellow  (85–94%)   : {count} units
Amber   (60–84%)   : {count} units
Red     (<60%)     : {count} units

Overall layer band (measured units only): {BAND}
Red units present: {YES/NO}

Red units:
  IaC coverage — 0% (no IaC modules defined yet)

Amber units:
  ...

Deferred ({count}):
  All live infrastructure metrics — deferred until first AWS deployment
  All cost discipline metrics — deferred until first paying tenant
  ...
```

---

## 12. Standing rules specific to the Infrastructure Layer

Carrying from PD-1.0 §9 and the performance steering, with Infrastructure-Layer-specific additions:

1. No production resource exists outside IaC.
2. No hardcoded region, endpoint, or environment-specific value in application code.
3. No secrets in environment variables; secrets manager or parameter store mandatory.
4. No tier promotion without a recorded decision and migration plan.
5. No production deployment without canary or equivalent safe-deploy mechanism active.
6. No monthly AWS spend exceeding the current tier's cost band without explicit cost-band revision decision.

---

## 13. Authority and lineage

This strategy operates under `PERFORMANCE_DOCTRINE.md` (PD-1.0). It is referenced by:

- `.kiro/steering/performance-discipline.md` (always-on steering)
- Spec 18 (Infrastructure Performance) — new spec, EARS requirements
- `docs/00_authority/DATABASE_LAYER_STRATEGY.md` — sibling, describes the database engine this layer hosts
- `docs/00_authority/DATA_LAYER_STRATEGY.md` — sibling, describes the data flow this layer hosts
- `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` — measurement engineering
- `.kiro/hooks/05-performance-compliance.kiro.hook` — enforcement
- Baseline Spec #16 (Performance, Scaling and Operational) — capacity and SLO source content
- Future: AWS architecture diagram (`docs/00_authority/diagrams/`) when produced

This document is the deep authority for Infrastructure Layer matters.
