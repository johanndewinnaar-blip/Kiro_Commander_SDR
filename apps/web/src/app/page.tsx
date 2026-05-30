'use client';

import { useMode } from '@/context/mode-context';
import { seedCases } from '../../../../packages/contracts/src/fixtures/seed-cases';
import { seedAssets } from '../../../../packages/contracts/src/fixtures/seed-assets';
import { seedIdentities } from '../../../../packages/contracts/src/fixtures/seed-identities';
import { seedConnectors } from '../../../../packages/contracts/src/fixtures/seed-connectors';
import { primitiveTypeScale } from '../../../../packages/ui/src/tokens/primitives';
import { getTrendIndicator } from '../../../../packages/ui/src/components/kpi-tile';
import { getSeverityColor } from '../../../../packages/ui/src/components/live-feed';
import { PageContainer } from '@/components/page-container';

/**
 * Command Centre — Primary Landing Surface (DS-1.0 Tabler reskin)
 *
 * Source: Spec 05, Route Registry (path: /)
 * DS-1.0 §8 Workspace structure: Header → KPI Strip → Content Grid → Detail
 *
 * Tabler PoC: structural markup converted to Tabler CSS classes.
 * All data logic, hooks, seed data, and business logic unchanged.
 *
 * Boundary: Operational App
 * Status: BUILD (v1.1)
 */

export default function CommandCentrePage() {
  const { mode, tokens } = useMode();

  // ── Data — unchanged ──────────────────────────────────────────────────────
  const openCases = seedCases.filter((c) => c.status === 'open' || c.status === 'in-progress');
  const totalAssets = seedAssets.length;
  const totalIdentities = seedIdentities.length;
  const activeConnectors = seedConnectors.filter((c) => c.state === 'active').length;
  const errorConnectors = seedConnectors.filter((c) => c.state === 'error').length;

  const kpis = [
    { label: 'Open Cases',         value: openCases.length,    trend: 'up'   as const, delta: 2  },
    { label: 'Total Assets',       value: totalAssets,         trend: 'flat' as const            },
    { label: 'Identities',         value: totalIdentities,     trend: 'flat' as const            },
    { label: 'Active Connectors',  value: activeConnectors,    trend: 'up'   as const, delta: 1  },
    { label: 'Connector Errors',   value: errorConnectors,     trend: 'down' as const, delta: -1 },
    { label: 'Posture Score',      value: '72%',               trend: 'up'   as const, delta: 3  },
    { label: 'SLA Compliance',     value: '94%',               trend: 'down' as const, delta: -2 },
    { label: 'Coverage',           value: '87%',               trend: 'up'   as const, delta: 1  },
  ];

  const liveActivity = [
    { id: '1', timestamp: '14:32', severity: 'critical' as const, message: 'P0 case escalated to CISO',              entityRef: 'CASE-2026-0003' },
    { id: '2', timestamp: '14:28', severity: 'warning'  as const, message: 'SLA breach approaching on CASE-2026-0001', entityRef: 'CASE-2026-0001' },
    { id: '3', timestamp: '14:15', severity: 'info'     as const, message: 'Connector sync completed',               entityRef: 'connector-0001' },
    { id: '4', timestamp: '14:02', severity: 'success'  as const, message: 'Validation passed for asset PROD-WEB-01', entityRef: 'asset-0001'    },
  ];

  return (
    <PageContainer
      pretitle="Command Centre › Security Posture Overview"
      title="Command Centre"
      headerActions={
        <span className="badge bg-green-lt">
          <span className="status-dot bg-green me-1" style={{ display: 'inline-block' }} />
          Last updated 5 min ago
        </span>
      }
    >
          {/* ── KPI Metric Row ── */}
          <div className="row row-deck row-cards mb-3">
            {kpis.map((kpi) => {
              const trend = getTrendIndicator(kpi.trend, kpi.label !== 'Connector Errors');
              return (
                <div key={kpi.label} className="col-sm-6 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="subheader mb-1">{kpi.label}</div>
                      <div className="h1 mb-1">
                        {kpi.value}
                      </div>
                      {kpi.delta !== undefined && (
                        <div style={{ fontSize: primitiveTypeScale.caption, color: trend.color }}>
                          {trend.arrow} {kpi.delta > 0 ? '+' : ''}{kpi.delta} vs 24h
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Content Grid — 3 columns ── */}
          <div className="row row-deck row-cards mb-3">

            {/* Recent Cases Card */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Cases</h3>
                  <div className="card-actions">
                    <a href="/cases" className="btn btn-sm">View all</a>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-vcenter card-table">
                      <tbody>
                        {seedCases.map((c) => (
                          <tr key={c.id}>
                            <td style={{ width: '40px' }}>
                              <span
                                className={`badge badge-sm ${c.priority === 'P0' ? 'bg-red' : c.priority === 'P1' ? 'bg-orange' : 'bg-secondary'}`}
                              >
                                {c.priority}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: primitiveTypeScale.body, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', maxWidth: '200px' }}>
                                {c.title}
                              </span>
                            </td>
                            <td className="text-muted" style={{ whiteSpace: 'nowrap', fontSize: primitiveTypeScale.caption }}>
                              12m ago
                            </td>
                            <td>
                              <span className={`badge badge-sm ${
                                c.status === 'open' ? 'bg-blue-lt' :
                                c.status === 'in-progress' ? 'bg-yellow-lt' :
                                c.status === 'closed' ? 'bg-secondary' : 'bg-orange-lt'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Summary Card */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Asset Summary</h3>
                  <div className="card-actions">
                    <a href="/assets" className="btn btn-sm">View all</a>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-vcenter card-table">
                      <tbody>
                        {seedAssets.map((a) => (
                          <tr key={a.id}>
                            <td>
                              <span style={{ fontSize: primitiveTypeScale.body }}>{a.name}</span>
                            </td>
                            <td className="text-muted text-end" style={{ fontSize: primitiveTypeScale.caption }}>
                              {a.classification}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Activity Feed Card */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Live Activity</h3>
                  <div className="card-actions">
                    <span className="status-dot status-dot-animated bg-green me-1" />
                    <span className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>Live</span>
                  </div>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {liveActivity.map((event) => (
                      <li key={event.id} className="list-group-item d-flex align-items-start gap-3 py-3">
                        <span
                          className="status-dot mt-1"
                          style={{
                            background: getSeverityColor(event.severity),
                            flexShrink: 0,
                          }}
                        />
                        <div className="flex-fill">
                          <div style={{ fontSize: primitiveTypeScale.body }}>{event.message}</div>
                          <div className="text-muted" style={{ fontSize: primitiveTypeScale.caption }}>{event.timestamp}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* ── Data Source Status Card ── */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Data Source Status</h3>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-0" style={{ fontSize: primitiveTypeScale.body }}>
                    Displaying seed/mock data. Real connector integration requires Phase 2 approval.
                    Scaffold metrics will populate as domain specs are implemented.
                  </p>
                </div>
              </div>
            </div>
          </div>

    </PageContainer>
  );
}
