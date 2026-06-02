# Requirements Document

## Platform Intelligence and IOC Distribution

**Spec ID:** `platform-intelligence-ioc-distribution`  
**Target version:** v1.4  
**Status:** Planned / Kiro-ready  
**Scope:** Foundational data-layer augmentation — canonical entities, contracts, schemas, fixtures and tests only.  
**Source doctrine:** Commander SDR baseline v2.6.2; Spec #59 Intelligence Layer Architecture; Spec #61 Universal Security Signal Connector Contract; Spec #29 Universal Risk Object and Case Binding; Spec #08 Case Management.

## Introduction

This specification defines the foundational platform intelligence and IOC distribution layer for Commander SDR. It introduces platform-owned intelligence catalogues (CISA KEV, CVE/vendor advisories, direct IOC feeds) and tenant-level intelligence evaluation. IOC is treated as a first-class intelligence object, not merely a child of CVE.

This is a Phase 1 data-layer-only specification. No UI pages, API endpoints, live external integrations or live push actions are authorised. All work is canonical entity, contract, schema, fixture and test work. Live CISA/NVD/vendor/STIX/TAXII integrations remain Phase 2-gated.

## Glossary

- **Platform_Intelligence_Source**: A platform-owned feed source definition (e.g. CISA KEV feed, NVD CVE feed, commercial IOC feed). Managed by the admin tenant.
- **Platform_Intelligence_Record**: A normalised intelligence record produced by a platform source (abstract parent for vulnerability and IOC records).
- **Vulnerability_Intelligence_Record**: A specific intelligence record representing a CVE or vulnerability advisory from platform sources.
- **Vendor_Advisory**: A vendor-issued security advisory that may map to one or many CVEs and may contain IOCs.
- **Indicator_Of_Compromise**: A first-class intelligence object representing a typed indicator (hash, domain, IP, URL, etc.) with independent lifecycle, confidence, severity, TLP marking, expiry and source attribution.
- **IOC_Relationship**: A stateful, typed relationship between an IOC and another entity (CVE, advisory, campaign, malware, actor, case, risk object, action).
- **Tenant_Intelligence_Subscription**: A tenant's subscription to specific platform intelligence sources, defining applicability and evaluation preferences.
- **Tenant_Intelligence_Evaluation**: The outcome of evaluating platform intelligence against a specific tenant's assets, identities, observables or telemetry.
- **Tenant_IOC_Match**: A confirmed or potential match between a platform IOC and a tenant observable, asset or telemetry record.
- **IOC_Case_Link**: A binding between an IOC match and a Commander case (via the existing case lifecycle).
- **Vulnerability_Case_Link**: A binding between a vulnerability evaluation and a Commander case.
- **Push_Action_Intent**: A declared intent to push an IOC block/allow action to an external system, represented as status only in Phase 1.
- **IOC_Category**: The exhaustive type taxonomy for IOC indicators used in security operations.
- **IOC_Relationship_State**: The stateful classification of an IOC's relationship to other entities.
- **Tenant_Exposure_State**: The evaluation outcome state for tenant exposure to platform intelligence.
- **Threat_Hunt_Status**: The lifecycle state of a threat hunt triggered by IOC intelligence.
- **Feed_Schedule**: The refresh cadence and health tracking model for a platform intelligence source.
- **TLP_Marking**: Traffic Light Protocol classification controlling intelligence sharing boundaries.
- **Commander**: The platform system performing intelligence operations.
- **Admin_Tenant**: The platform-level tenant that owns and manages intelligence sources, catalogues and distribution policy.
- **Customer_Tenant**: A customer tenant that subscribes to platform intelligence and stores evaluation/match outcomes.

## Requirements

### Requirement 1: Platform Intelligence Source Entity

**User Story:** As a platform administrator, I want to define and manage intelligence feed sources, so that the platform maintains a governed catalogue of threat intelligence origins.

#### Acceptance Criteria

1. THE Platform_Intelligence_Source entity SHALL include source identity (name, vendor, type), connector class (D), feed URL/reference, schedule configuration, licence/use status, health state and source metadata conforming to CommonFields.
2. WHEN a Platform_Intelligence_Source is created, THE Commander SHALL assign a deterministic ID using the seedId pattern and associate it with the Admin_Tenant context.
3. THE Platform_Intelligence_Source entity SHALL support source types including cisa_kev, nvd_cve, vendor_advisory, commercial_ioc_feed, misp_feed, stix_taxii_feed, inbound_email and manual_submission.
4. WHEN a Platform_Intelligence_Source is validated, THE Commander SHALL verify that all required fields (name, sourceType, connectorClass, tenant) are present and that sourceType is a known constant value.

### Requirement 2: Feed Schedule and Health Tracking

**User Story:** As a platform administrator, I want to track feed refresh cadence and source health, so that I can ensure intelligence catalogues remain current and identify degraded sources.

#### Acceptance Criteria

1. THE Platform_Intelligence_Source entity SHALL include feed schedule fields: refreshCadenceMinutes, lastSuccessfulSync, nextScheduledSync, failureState, sourceFreshness and catalogueVersionHash.
2. WHEN a feed sync completes successfully, THE Commander SHALL update lastSuccessfulSync, compute nextScheduledSync from refreshCadenceMinutes and set failureState to null.
3. IF a feed sync fails, THEN THE Commander SHALL record the failure state including failure timestamp, error classification and consecutive failure count.
4. WHEN sourceFreshness is evaluated, THE Commander SHALL compute freshness as fresh, aging, stale or expired based on elapsed time since lastSuccessfulSync relative to refreshCadenceMinutes.
5. THE Commander SHALL NOT perform live external sync operations in Phase 1; feed schedule tracking operates against seed and mock data only.

### Requirement 3: Platform Intelligence Record Entity

**User Story:** As a platform administrator, I want normalised intelligence records in a canonical format, so that downstream evaluation and distribution operate against a consistent data model.

#### Acceptance Criteria

1. THE Platform_Intelligence_Record entity SHALL conform to CommonFields and include sourceId (reference to Platform_Intelligence_Source), recordType, severity, confidence, publishedAt, lastModifiedAt, catalogueVersion and rawReference.
2. WHEN a Platform_Intelligence_Record is created, THE Commander SHALL associate it with the Admin_Tenant and reference the originating Platform_Intelligence_Source by ID.
3. THE Platform_Intelligence_Record entity SHALL support recordType values including cve, kev_entry, vendor_advisory, ioc_entry and composite_advisory.
4. WHEN a Platform_Intelligence_Record is validated, THE Commander SHALL verify sourceId references a valid Platform_Intelligence_Source, severity is within the SourceSeverity model (informational through critical) and confidence is within 0-100.

### Requirement 4: Vulnerability Intelligence Record Entity

**User Story:** As a platform administrator, I want CVE and vulnerability advisory records stored with structured metadata, so that tenant exposure evaluation can reference authoritative vulnerability intelligence.

#### Acceptance Criteria

1. THE Vulnerability_Intelligence_Record entity SHALL extend Platform_Intelligence_Record and include cveId, cvssVector, cvssScore, cveState (published, rejected, reserved, disputed), cisaKevStatus (boolean), kevDateAdded, kevDueDate, epssScore, epssPercentile, affectedProducts and references.
2. WHEN a Vulnerability_Intelligence_Record has CISA KEV status, THE Commander SHALL record kevDateAdded and kevDueDate without creating tenant risk from KEV status alone.
3. WHEN EPSS enrichment is available, THE Commander SHALL record epssScore and epssPercentile as informational enrichment that may increase priority but SHALL NOT override case lifecycle engines.
4. THE Vulnerability_Intelligence_Record entity SHALL support one-to-many relationships with Vendor_Advisory records and zero-to-many relationships with Indicator_Of_Compromise records.

### Requirement 5: Vendor Advisory Entity

**User Story:** As a platform administrator, I want vendor advisories stored as distinct intelligence records, so that multi-CVE advisories and vendor-specific remediation guidance are preserved intact.

#### Acceptance Criteria

1. THE Vendor_Advisory entity SHALL conform to CommonFields and include advisoryId, vendor, title, publishedAt, lastModifiedAt, severity, affectedProducts, remediationGuidance, relatedCveIds (array) and containedIocIds (array).
2. WHEN a Vendor_Advisory maps to multiple CVEs, THE Commander SHALL preserve the one-to-many relationship between the advisory and each Vulnerability_Intelligence_Record.
3. WHEN a Vendor_Advisory contains IOCs, THE Commander SHALL extract and normalise each IOC as a distinct Indicator_Of_Compromise entity and create IOC_Relationship records with state linked_to_vendor_advisory.
4. WHEN a Vendor_Advisory is validated, THE Commander SHALL verify that advisoryId and vendor are non-empty strings and that relatedCveIds is an array.

### Requirement 6: Indicator of Compromise Entity (First-Class)

**User Story:** As a platform administrator, I want IOCs treated as first-class intelligence objects with independent lifecycle, so that IOC correlation, matching and action are not constrained by CVE relationships.

#### Acceptance Criteria

1. THE Indicator_Of_Compromise entity SHALL conform to CommonFields and include iocCategory (from the exhaustive IOC_Category taxonomy), value (raw indicator string), normalisedValue (normalised form), originalRawValue (preserved original), confidence (0-100), severity (SourceSeverity model), tlpMarking (white, green, amber, amber_strict, red), expiresAt (optional), sourceAttribution, firstSeenAt, lastSeenAt and active status (boolean).
2. THE Indicator_Of_Compromise entity SHALL support the exhaustive IOC_Category taxonomy: file_hash_md5, file_hash_sha1, file_hash_sha256, file_path, domain, fqdn, url, ip_address, cidr_range, email_address, email_subject, sender_domain, registry_key, process_name, mutex, certificate_thumbprint, user_agent, yara_rule, sigma_rule, snort_suricata_rule, cloud_resource_id, azure_ad_object_id, aws_account_id, container_image, package_name, other.
3. WHEN an Indicator_Of_Compromise is created, THE Commander SHALL preserve the originalRawValue separately from the normalisedValue so that analyst review can access the unmodified source indicator.
4. WHEN an Indicator_Of_Compromise is validated, THE Commander SHALL verify that iocCategory is a known taxonomy value, value is a non-empty string, confidence is 0-100, severity follows the SourceSeverity model and tlpMarking is a known TLP value.
5. THE Indicator_Of_Compromise entity SHALL support deduplication by normalisedValue plus iocCategory within the platform catalogue, preserving multiple source attributions for the same normalised indicator.

### Requirement 7: IOC Relationship Entity (Stateful)

**User Story:** As a platform administrator, I want IOC relationships to be stateful and typed, so that the connection between an IOC and other entities (CVE, campaign, malware, actor, case) is explicit and auditable.

#### Acceptance Criteria

1. THE IOC_Relationship entity SHALL include iocId, relatedEntityId, relatedEntityType, relationshipState, confidence, establishedAt, lastUpdatedAt and evidence reference.
2. THE IOC_Relationship entity SHALL support relationship states: linked_to_cve, not_linked_to_cve, suspected_cve_link, linked_to_vendor_advisory, linked_to_campaign, linked_to_malware, linked_to_actor, linked_to_case, linked_to_risk_object, linked_to_action, unclassified.
3. WHEN an IOC_Relationship state changes, THE Commander SHALL record the previous state, new state, change timestamp and reason for transition.
4. THE IOC_Relationship between an IOC and a CVE SHALL be optional; IOCs SHALL exist independently without requiring a CVE binding.
5. WHEN an IOC_Relationship is validated, THE Commander SHALL verify that relationshipState is a known state value, iocId and relatedEntityId are non-empty and confidence is 0-100.

### Requirement 8: IOC Normalisation and Deduplication

**User Story:** As a platform administrator, I want IOCs normalised and deduplicated across all ingestion paths, so that the platform catalogue contains canonical indicators without redundancy.

#### Acceptance Criteria

1. WHEN an IOC is ingested from any source (direct feed, vendor advisory, email submission, manual entry, commercial feed), THE Commander SHALL normalise the indicator value according to its iocCategory (case folding for domains, defanging reversal for URLs/IPs, whitespace trimming, hash lowercasing).
2. WHEN a normalised IOC matches an existing catalogue entry by normalisedValue plus iocCategory, THE Commander SHALL merge source attributions rather than creating a duplicate record.
3. THE Commander SHALL preserve the originalRawValue for every ingestion event regardless of deduplication outcome.
4. WHEN multiple sources report the same IOC with different confidence or severity values, THE Commander SHALL retain per-source confidence and severity and compute an aggregate confidence using a defined aggregation function.

### Requirement 9: IOC Ingestion Path Support

**User Story:** As a platform administrator, I want IOCs ingested from multiple source types, so that the platform catalogue captures indicators from all relevant intelligence channels.

#### Acceptance Criteria

1. THE Commander SHALL model ingestion paths for: direct IOC feeds, vendor advisories containing IOCs, CISA/NVD/vendor intelligence containing CVEs with embedded IOCs, inbound email IOC submissions, manual analyst IOC submissions, commercial threat intelligence feeds and MISP/STIX/TAXII-style future feeds.
2. WHEN an IOC is ingested from any path, THE Commander SHALL apply the same normalisation, deduplication, relationship creation and tenant-evaluation flow regardless of ingestion source.
3. WHEN an inbound email IOC submission is modelled, THE Commander SHALL preserve sender/source, received timestamp, attachment/reference, parsed IOC values, parser confidence and raw text reference.
4. THE Commander SHALL NOT perform live mailbox integration in Phase 1; inbound email is modelled as a future feed source type with seed/mock data only.

### Requirement 10: Tenant Intelligence Subscription Entity

**User Story:** As a customer tenant administrator, I want to subscribe to platform intelligence sources, so that my tenant receives relevant intelligence evaluation without duplicating the full platform catalogue.

#### Acceptance Criteria

1. THE Tenant_Intelligence_Subscription entity SHALL conform to CommonFields and include tenantId, sourceId (reference to Platform_Intelligence_Source), subscriptionState (active, paused, cancelled), applicabilityFilters (array of criteria), evaluationPreferences and subscribedAt.
2. WHEN a Customer_Tenant subscribes to a Platform_Intelligence_Source, THE Commander SHALL create a Tenant_Intelligence_Subscription without duplicating the full raw catalogue into the tenant's data store.
3. THE Commander SHALL support tenant-specific IOC allow/block lists as part of the Tenant_Intelligence_Subscription configuration.
4. WHEN a Tenant_Intelligence_Subscription is validated, THE Commander SHALL verify that tenantId and sourceId are non-empty, subscriptionState is a known value and applicabilityFilters is a valid array structure.

### Requirement 11: Tenant Intelligence Evaluation Entity

**User Story:** As a customer tenant, I want platform intelligence evaluated against my assets, identities and observables, so that I receive exposure outcomes specific to my environment.

#### Acceptance Criteria

1. THE Tenant_Intelligence_Evaluation entity SHALL conform to CommonFields and include tenantId, platformRecordId (reference to Platform_Intelligence_Record or Indicator_Of_Compromise), evaluationType (vulnerability_exposure, ioc_match, advisory_applicability), evaluationState, matchedAssets (array), matchedIdentities (array), matchedObservables (array), evidenceReferences (array) and evaluatedAt.
2. THE Tenant_Intelligence_Evaluation entity SHALL support evaluation states: matched, not_matched, potentially_matched, exposed, not_exposed, remediated, accepted_risk, unknown.
3. WHEN a Tenant_Intelligence_Evaluation determines exposure, THE Commander SHALL preserve evidence references and source attribution linking the evaluation to specific platform intelligence and tenant assets.
4. WHEN a Tenant_Intelligence_Evaluation is validated, THE Commander SHALL verify that evaluationState is a known value, tenantId and platformRecordId are non-empty and evidenceReferences is a valid array.
5. THE Commander SHALL create tenant risk only after tenant exposure evaluation confirms a match; CISA KEV status or EPSS enrichment alone SHALL NOT create tenant risk.

### Requirement 12: Tenant IOC Match Entity

**User Story:** As a customer tenant, I want IOC matches recorded with full provenance, so that matched indicators are traceable to platform intelligence and tenant observables.

#### Acceptance Criteria

1. THE Tenant_IOC_Match entity SHALL conform to CommonFields and include tenantId, iocId (reference to Indicator_Of_Compromise), matchedObservableId (reference to existing Observable entity), matchType (exact, partial, heuristic), matchConfidence (0-100), matchedAt, matchSource and evidenceReferences (array).
2. WHEN a Tenant_IOC_Match is created, THE Commander SHALL reference the existing Observable entity (COIM-D) where the match was identified, preserving the deduplication model.
3. WHEN a Tenant_IOC_Match is validated, THE Commander SHALL verify that iocId and matchedObservableId are non-empty, matchType is a known value, matchConfidence is 0-100 and tenantId is present.

### Requirement 13: IOC Case Handling Integration

**User Story:** As a customer tenant, I want IOC matches to integrate with the existing case lifecycle, so that IOC-driven actions consume Commander's closed-loop case model.

#### Acceptance Criteria

1. WHEN an IOC match is actioned, THE Commander SHALL support outcomes: enrich evidence, create or update a verdict, create or update a risk object, create or update a case, trigger a threat hunt, recommend an action/sub-action, create a push-action intent.
2. THE Commander SHALL NOT bypass the existing case lifecycle, routing, SLA, validation or closure engines for IOC-driven cases.
3. WHEN an IOC match creates a case, THE Commander SHALL use the existing case lifecycle (12-state) and case type taxonomy (threat-intelligence-estate-match or appropriate type).
4. WHEN a vulnerability evaluation creates a case, THE Commander SHALL use the existing vulnerability case type and vulnerability-specific SLA/treatment logic.
5. THE IOC_Case_Link entity SHALL include tenantId, iocMatchId, caseId, linkType (created_by, enriched_by, triggered_by), linkedAt and status.

### Requirement 14: Threat Hunt Workflow Model

**User Story:** As a security analyst, I want IOC-triggered threat hunts represented as structured workflow intents, so that hunting activities are tracked and integrated with case lifecycle.

#### Acceptance Criteria

1. WHEN an IOC triggers a threat hunt, THE Commander SHALL create a threat hunt record with status lifecycle: proposed, queued, running, completed, no_match, match_found, escalated.
2. THE threat hunt record SHALL include tenantId, triggeringIocId, triggeringMatchId, huntType, huntScope, status, assignedTo, proposedAt, startedAt, completedAt and findings reference.
3. WHEN a threat hunt status is match_found, THE Commander SHALL link the hunt findings to the case lifecycle through existing case creation or enrichment paths.
4. WHEN a threat hunt is escalated, THE Commander SHALL create or enrich a case using the existing case lifecycle and routing engine.

### Requirement 15: Push-Action Intent Model

**User Story:** As a security operations team, I want push-action intents modelled by IOC type and target system, so that future automated blocking is planned against the correct enforcement points.

#### Acceptance Criteria

1. THE Push_Action_Intent entity SHALL include tenantId, iocId, iocCategory, targetSystemType, actionType (block, allow, alert, quarantine), intentStatus, requestedBy, requestedAt, approvedBy, approvedAt and executionReference.
2. THE Push_Action_Intent entity SHALL support intentStatus values: recommended, requires_approval, approved, queued, pushed_mock, failed_mock, live_push_deferred.
3. THE Commander SHALL model push capability mapping by IOC category to target system: file hashes to EDR/AV/SIEM/SOAR, domains/URLs to proxy/DNS/email_security/SOAR, IPs/CIDRs to firewall/NDR/SIEM/SOAR, email senders/subjects to email_security/SIEM/SOAR, YARA/Sigma/Snort/Suricata rules to detection_engineering/SIEM/NDR/EDR, cloud resource IDs to cloud_security_tooling.
4. THE Commander SHALL NOT perform live push to EDR, proxy, firewall, SIEM or SOAR in Phase 1; all push actions are represented as intent/status only with mock execution states.
5. WHEN a Push_Action_Intent is validated, THE Commander SHALL verify that iocCategory is a known taxonomy value, targetSystemType is non-empty, actionType is a known value and intentStatus is a known status.

### Requirement 16: Action/Sub-Action Integration

**User Story:** As a security operations team, I want IOC actions mapped to existing COIM-H Action/Sub-Action patterns, so that IOC-driven responses integrate with Commander's action framework.

#### Acceptance Criteria

1. WHEN an IOC action is created, THE Commander SHALL map the action to existing COIM-H Action/Sub-Action types where a mapping exists.
2. THE Commander SHALL include D3FEND alignment metadata where applicable on IOC action records.
3. THE Commander SHALL model action follow-ups for IOC actions: validate_block, verify_no_business_impact, rescan_requery, monitor_for_recurrence, close_or_reopen_case, capture_evidence.
4. WHEN an IOC action follow-up completes, THE Commander SHALL feed the outcome back into the case lifecycle through existing validation and closure paths.

### Requirement 17: Admin vs Tenant Data Architecture

**User Story:** As a platform architect, I want clear separation between platform-owned intelligence catalogues and tenant evaluation outcomes, so that multi-tenancy is preserved without unnecessary data duplication.

#### Acceptance Criteria

1. THE Admin_Tenant SHALL own: Platform_Intelligence_Source records, Platform_Intelligence_Record records, Vulnerability_Intelligence_Record records, Vendor_Advisory records, Indicator_Of_Compromise catalogue records, IOC_Relationship records, distribution policy and catalogue version metadata.
2. THE Customer_Tenant SHALL own: Tenant_Intelligence_Subscription records, Tenant_Intelligence_Evaluation records, Tenant_IOC_Match records, IOC_Case_Link records, Vulnerability_Case_Link records, Push_Action_Intent records, exception/accepted_risk records and action intent history.
3. THE Commander SHALL NOT duplicate full raw catalogues into every Customer_Tenant by default; tenants reference platform records and store evaluation/match outcomes only.
4. WHEN a Customer_Tenant queries intelligence, THE Commander SHALL resolve references to platform records from the Admin_Tenant catalogue without materialising copies.

### Requirement 18: CVE/Advisory/IOC Relationship Model

**User Story:** As a platform architect, I want the relationships between CVEs, advisories and IOCs modelled with correct cardinality, so that intelligence correlation reflects real-world intelligence structures.

#### Acceptance Criteria

1. THE Commander SHALL support Vendor_Advisory to CVE relationships as one-to-many (one advisory may reference multiple CVEs).
2. THE Commander SHALL support CVE to IOC relationships as zero-to-many (a CVE may have zero, one or many associated IOCs).
3. THE Commander SHALL support IOC existence independent of any CVE (IOCs exist as first-class objects without requiring a CVE parent).
4. WHEN CISA KEV status is present on a Vulnerability_Intelligence_Record, THE Commander SHALL treat it as risk enrichment that informs priority but SHALL NOT create tenant risk from KEV status alone.

### Requirement 19: Compliance and Control Framework Integration

**User Story:** As a platform architect, I want intelligence results to enrich compliance evidence without creating compliance state directly, so that the ControlRequirement/ControlEvaluation model remains authoritative for compliance.

#### Acceptance Criteria

1. THE Commander SHALL NOT treat CVE, KEV or IOC intelligence as compliance state by itself.
2. WHEN vulnerability or IOC results are relevant to compliance, THE Commander SHALL make results available as enrichment evidence for ControlEvaluation records through the existing evidence binding model.
3. THE Commander SHALL preserve the existing authority model: compliance state is produced only through ControlRequirement plus ControlEvaluation evaluation.

### Requirement 20: Existing Entity Integration Patterns

**User Story:** As a platform architect, I want new intelligence entities to integrate with existing Commander patterns, so that the data layer remains consistent and interoperable.

#### Acceptance Criteria

1. THE Commander SHALL apply CommonFields (id, tenant, createdAt, updatedAt, source) to every new entity in this specification.
2. THE Commander SHALL apply TenantContext on every new record.
3. THE Commander SHALL apply SourceMetadata for provenance on every new record.
4. THE Commander SHALL use deterministic IDs (seedId pattern) for all fixtures.
5. THE Commander SHALL implement structural validation functions for each new entity following the existing validateX pattern (e.g. validateObservable, validateEvidence).
6. THE Commander SHALL define type constants as arrays following the existing pattern (e.g. OBSERVABLE_TYPES, EVIDENCE_TYPES).
7. THE Commander SHALL respect the COIM ownership model: source-owned fields are immutable after write; Commander-owned fields are mutable.

### Requirement 21: Governance and Registration

**User Story:** As a programme architect, I want this specification registered as a foundational augmentation unit, so that build sequencing and debt resolution are governed.

#### Acceptance Criteria

1. WHEN this specification is implemented, THE Commander SHALL register it as a new Foundational augmentation unit in REBASELINED_BUILD_SEQUENCE.md.
2. WHEN relevant ARCH-DEBT items exist for missing platform intelligence or IOC distribution model, THE Commander SHALL log and resolve those debt items.
3. WHEN entities are implemented, THE Commander SHALL update DATA_DICTIONARY.md with entries for each new entity.
4. THE Commander SHALL NOT build UI pages, Unit 16b pages, or Team 2 surfaces until PAGE_INVENTORY exists.
5. THE Commander SHALL NOT call live APIs, send or push live IOCs to real systems, or use live customer data.
6. THE Commander SHALL use seed/mock data only for all fixtures and tests in Phase 1.

### Requirement 22: IOC Confidence, Severity and Marking Model

**User Story:** As a threat intelligence analyst, I want IOC metadata (confidence, severity, TLP, expiry, source) captured with full fidelity, so that downstream evaluation and action can make informed risk decisions.

#### Acceptance Criteria

1. THE Indicator_Of_Compromise entity SHALL include confidence (0-100) following the existing SourceConfidence model.
2. THE Indicator_Of_Compromise entity SHALL include severity following the existing SourceSeverity model (informational, low, medium, high, critical with numeric severityId 1-5).
3. THE Indicator_Of_Compromise entity SHALL include tlpMarking with values: white, green, amber, amber_strict, red.
4. THE Indicator_Of_Compromise entity SHALL include optional expiresAt timestamp for time-bound indicators.
5. THE Indicator_Of_Compromise entity SHALL include sourceAttribution identifying the originating feed, analyst or system that reported the indicator.

### Requirement 23: Tenant IOC Allow/Block Lists

**User Story:** As a customer tenant administrator, I want tenant-specific IOC allow/block lists, so that my organisation can suppress known-good indicators and enforce known-bad indicators regardless of platform catalogue state.

#### Acceptance Criteria

1. THE Commander SHALL model tenant-specific IOC allow lists (indicators that SHALL NOT trigger matches or actions for that tenant).
2. THE Commander SHALL model tenant-specific IOC block lists (indicators that SHALL always be treated as malicious for that tenant regardless of platform confidence).
3. WHEN a platform IOC matches a tenant allow list entry, THE Commander SHALL suppress the match and record the suppression with allow-list reference.
4. WHEN a platform IOC matches a tenant block list entry, THE Commander SHALL treat the IOC as confirmed malicious for that tenant regardless of platform confidence score.
5. THE tenant allow/block list entries SHALL include tenantId, iocCategory, value, listType (allow or block), addedBy, addedAt, reason and expiresAt (optional).

### Requirement 24: Inbound Email IOC Parsing Model

**User Story:** As a security analyst, I want inbound email IOC submissions modelled as a structured ingestion path, so that emailed threat intelligence follows the same normalisation and evaluation flow.

#### Acceptance Criteria

1. WHEN an inbound email IOC submission is modelled, THE Commander SHALL preserve: sender address, source organisation, received timestamp, attachment references, parsed IOC values (array), parser confidence per IOC, raw text/body reference and submission metadata.
2. WHEN parsed IOCs are extracted from an email submission, THE Commander SHALL route each parsed IOC through the standard normalisation, deduplication, IOC_Relationship creation and tenant-evaluation flow.
3. THE Commander SHALL model parser confidence per extracted IOC to reflect uncertainty in automated extraction.
4. THE Commander SHALL NOT perform live mailbox integration in Phase 1; the email IOC parsing model uses seed/mock fixtures only.

### Requirement 25: Commander Outputs Supported

**User Story:** As a platform architect, I want the intelligence data layer to support all planned Commander output surfaces, so that downstream consumers can resolve intelligence data without additional transformation layers.

#### Acceptance Criteria

1. THE intelligence data layer SHALL support consumption by: Case Management (IOC-driven cases), VM case workflow (vulnerability evaluation cases), External/Internal Operating Pictures (intelligence posture), Tenant Admin intelligence/feed management, future Admin intelligence-feed page, Unit 16b metrics, and Commander AI explanation and recommendations.
2. WHEN Commander AI requires intelligence context for explanation or recommendation, THE Commander SHALL provide access to platform intelligence records, tenant evaluations, IOC matches and relationship state through the data layer.
3. THE intelligence data layer SHALL NOT require UI pages or API endpoints to be functional; data layer contracts and fixtures are sufficient for Phase 1.

### Requirement 26: Phase 1 Boundary Enforcement

**User Story:** As a programme governor, I want Phase 1 boundaries explicitly enforced, so that no live integrations, external calls or production data leak into the foundational data-layer work.

#### Acceptance Criteria

1. THE Commander SHALL NOT perform live external sync operations (CISA, NVD, vendor feeds, STIX/TAXII) in Phase 1.
2. THE Commander SHALL NOT send or push live IOCs to real EDR, proxy, firewall, SIEM or SOAR systems in Phase 1.
3. THE Commander SHALL NOT use live customer data in Phase 1.
4. THE Commander SHALL NOT build UI pages or API endpoints in Phase 1.
5. THE Commander SHALL use seed/mock fixtures that preserve the canonical entity shape and avoid real customer secrets or vendor credentials.
6. WHEN live integrations are required, THE Commander SHALL defer to Phase 2 gating approval per the existing connector readiness model.

## Acceptance Criteria (Specification-Level)

- All new entities conform to CommonFields, TenantContext and SourceMetadata patterns.
- IOC is modelled as a first-class entity independent of CVE.
- IOC-to-CVE relationship is optional and stateful with the full relationship state taxonomy.
- All 26 IOC categories are represented in the type taxonomy.
- Tenant evaluation produces exposure/match states without duplicating platform catalogues.
- IOC-driven cases consume the existing 12-state case lifecycle.
- Push actions are intent/status only with no live execution.
- All entities have structural validation functions.
- All entities have seed/mock fixtures with deterministic IDs.
- No live API calls, UI pages or production data in Phase 1.
- Specification is registered as a Foundational augmentation unit.

## Resolved Design Decisions

### DEC-allowblock-block-wins

**Decision:** For allow/block conflicts, block wins by default.

**Rationale:** Security-deny precedence is the binding rule. An allow entry must not override a matching block entry unless a future explicitly approved exception workflow is introduced. No exception workflow exists in Phase 1.

**Impact on Requirements:** Requirement 23 acceptance criteria 3 and 4 are unambiguous — block-list entries override allow-list entries when both match the same indicator for the same tenant. The suppression path (criterion 3) is bypassed when a matching block entry exists.

**Status:** Owner confirmed.

### DEC-confidence-aggregation-properties

**Decision:** No baseline-defined formula exists for `aggregateConfidence`. The design's bounded and monotonic properties are the Phase 1 authority.

**Rationale:** The implementation must satisfy:
1. Output bounded 0–100.
2. Higher-confidence corroborating sources must not reduce confidence.
3. Lower-confidence weak sources must not inflate confidence beyond a configured ceiling.
4. Source freshness affects confidence.
5. Direct tenant observation weighs more than generic feed presence.
6. Manual analyst confirmation has explicit weighting.
7. Deterministic output for same inputs.

The exact constants and combiner shape are implementation choices, not baseline-mandated.

**Impact on Requirements:** Requirement 8 acceptance criterion 4 ("compute an aggregate confidence using a defined aggregation function") is satisfied by any implementation meeting the seven constraints above.

**Status:** Owner confirmed.
