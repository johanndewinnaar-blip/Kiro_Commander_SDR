# 24 — Connector API Reference Framework Specification

## Status
ACTIVE BASELINE PLACEHOLDER AND TEMPLATE.

## Purpose
Defines the required structure for future per-connector API reference documents. This document intentionally does not enumerate every vendor endpoint.

## Per-Connector API Document Template
Each connector API reference must include:
- connector name;
- vendor/source system;
- authentication model;
- permissions/scopes required;
- rate limits;
- pagination model;
- primary objects ingested;
- canonical object mappings;
- risk object mappings;
- case binding behaviour;
- validation freshness behaviour;
- tool health behaviour;
- Fusion Map node/edge emission;
- error handling;
- retry/dead-letter behaviour;
- security considerations;
- test-data fixtures;
- MVP support status.

## Baseline Rule
No production connector should be implemented without a connector API reference derived from this framework.
