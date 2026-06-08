'use client';

/**
 * Estate Topology View — UC-221
 * Organisational hierarchy with compliance inheritance.
 * DEBT-015 resolution page 1/4.
 */

import { useMemo } from 'react';
import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedEstateNodes } from '../../../../../../packages/contracts/src/fixtures/seed-estate';
import { componentTokens } from '../../../../../../packages/ui/src/tokens/components';
import {
  primitiveSpacing,
  primitiveFontWeight,
  primitiveTypeScale,
} from '../../../../../../packages/ui/src/tokens/primitives';

export default function EstateTopologyPage() {
  const { tokens } = useMode();

  const hierarchy = useMemo(() => {
    const roots = seedEstateNodes.filter((n) => n.parentNodeId === null);
    const children = (parentId: string) => seedEstateNodes.filter((n) => n.parentNodeId === parentId);
    return roots.map((root) => ({
      ...root,
      children: children(root.nodeId).map((child) => ({
        ...child,
        children: children(child.nodeId),
      })),
    }));
  }, []);

  const nodeTypes = useMemo(() => {
    const counts: Record<string, number> = {};
    seedEstateNodes.forEach((n) => { counts[n.nodeType] = (counts[n.nodeType] ?? 0) + 1; });
    return Object.entries(counts);
  }, []);

  return (
    <PageContainer pretitle="Asset Architecture" title="Estate Topology View">
      {/* Summary */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: componentTokens.cardPadding, marginBottom: primitiveSpacing[6] }}>
        {[
          { label: 'Total Nodes', value: seedEstateNodes.length },
          { label: 'Active', value: seedEstateNodes.filter((n) => n.status === 'active').length },
          { label: 'Integrating', value: seedEstateNodes.filter((n) => n.status === 'integrating').length },
          { label: 'Node Types', value: nodeTypes.length },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4], textAlign: 'center' }}>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>{kpi.label}</div>
            <div style={{ fontSize: primitiveTypeScale.kpiValue, fontWeight: primitiveFontWeight.bold, color: tokens.text.primary }}>{kpi.value}</div>
          </div>
        ))}
      </section>

      {/* Hierarchy Tree */}
      <section style={{ background: tokens.surface.secondary, border: `1px solid ${tokens.border.default}`, borderRadius: '2px', padding: primitiveSpacing[4] }}>
        <h3 style={{ fontSize: primitiveTypeScale.h3, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, marginBottom: primitiveSpacing[3] }}>
          Organisation Hierarchy
        </h3>
        {hierarchy.map((root) => (
          <div key={root.nodeId} style={{ marginBottom: primitiveSpacing[4] }}>
            <div style={{ fontWeight: primitiveFontWeight.bold, color: tokens.text.primary, fontSize: primitiveTypeScale.h3 }}>
              {root.name} <span style={{ color: tokens.text.muted, fontSize: primitiveTypeScale.caption }}>({root.nodeType} · {root.geography ?? 'N/A'} · {root.status})</span>
            </div>
            <div style={{ fontSize: primitiveTypeScale.caption, color: tokens.text.muted, marginBottom: primitiveSpacing[2] }}>
              Compliance: {root.complianceScopes.length > 0 ? root.complianceScopes.join(', ') : 'None'} · Owner: {root.ownerTeam}
            </div>
            {root.children.map((child) => (
              <div key={child.nodeId} style={{ marginLeft: primitiveSpacing[5], marginBottom: primitiveSpacing[2] }}>
                <div style={{ fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, fontSize: primitiveTypeScale.body }}>
                  ├─ {child.name} <span style={{ color: tokens.text.muted, fontSize: primitiveTypeScale.caption }}>({child.nodeType} · {child.geography ?? 'N/A'} · {child.status})</span>
                </div>
                <div style={{ marginLeft: primitiveSpacing[4], fontSize: primitiveTypeScale.caption, color: tokens.text.muted }}>
                  Compliance: {child.complianceScopes.length > 0 ? child.complianceScopes.join(', ') : 'Inherited'} · Owner: {child.ownerTeam}
                </div>
                {child.children.map((env) => (
                  <div key={env.nodeId} style={{ marginLeft: primitiveSpacing[7], marginTop: primitiveSpacing[1] }}>
                    <div style={{ color: tokens.text.secondary, fontSize: primitiveTypeScale.caption }}>
                      └─ {env.name} ({env.nodeType} · {env.geography ?? 'N/A'} · {env.status})
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </section>
    </PageContainer>
  );
}
