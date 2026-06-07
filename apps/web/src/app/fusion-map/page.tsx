'use client';

import { useMode } from '@/context/mode-context';
import { PageContainer } from '@/components/page-container';
import { seedTopology } from '../../../../../packages/contracts/src/fixtures/seed-topology';
import { componentTokens } from '../../../../../packages/ui/src/tokens/components';
import { primitiveTypeScale, primitiveSpacing, primitiveFontWeight, primitiveFonts, primitiveLetterSpacing, primitiveSignal } from '../../../../../packages/ui/src/tokens/primitives';
import { ReactFlow, Background, Controls, Node, Edge, Position } from '@xyflow/react';
import { Sankey, ResponsiveContainer, Tooltip } from 'recharts';
import { useMemo, useState } from 'react';

import '@xyflow/react/dist/style.css';

/**
 * Fusion Map — Relationship Graph
 * Data: TopologySnapshot nodes/edges from seed-topology
 * Route: /fusion-map | Status: BUILD
 */
{/* AI-PLACEMENT: AICAP-FUSION-001 — Commander AI relationship insight */}

export default function FusionMapPage() {
  const { tokens } = useMode();
  const { nodes, edges, blastRadiusResults } = seedTopology;
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // KPI calculations
  const criticalNodes = nodes.filter((n) => n.criticality <= 2).length;
  const uniqueTypes = new Set(nodes.map((n) => n.entityType)).size;
  const maxBlastRadius = blastRadiusResults.reduce((max, br) => Math.max(max, br.totalImpactScore), 0);
  const avgWeight = edges.reduce((sum, e) => sum + e.weight, 0) / edges.length;

  // Create lookup map for node resolution
  const nodeMap = useMemo(() => {
    const map = new Map();
    nodes.forEach(node => map.set(node.nodeId, node));
    return map;
  }, [nodes]);

  // Transform data for React Flow network graph
  const flowNodes: Node[] = useMemo(() => {
    return nodes.map((node, index) => ({
      id: node.nodeId,
      data: { 
        label: node.label,
        entityType: node.entityType,
        domain: node.domain,
        criticality: node.criticality
      },
      position: { 
        x: (index % 3) * 200 + 100, 
        y: Math.floor(index / 3) * 150 + 50 
      },
      style: {
        background: node.criticality <= 2 ? primitiveSignal.critical : tokens.surface.elevated,
        color: tokens.text.primary,
        border: `2px solid ${tokens.border.default}`,
        borderRadius: '4px',
        padding: primitiveSpacing[2],
        fontSize: primitiveTypeScale.micro,
        fontWeight: primitiveFontWeight.semibold
      }
    }));
  }, [nodes, tokens]);

  const flowEdges: Edge[] = useMemo(() => {
    return edges.map((edge) => ({
      id: edge.edgeId,
      source: edge.sourceNodeId,
      target: edge.targetNodeId,
      label: edge.relationshipType.replace(/_/g, ' '),
      style: {
        strokeWidth: Math.max(1, edge.weight * 4),
        stroke: tokens.border.default
      },
      labelStyle: {
        fontSize: primitiveTypeScale.micro,
        color: tokens.text.muted
      }
    }));
  }, [edges, tokens]);

  // Transform data for Sankey chart - simplified to prevent stack overflow
  const sankeyData = useMemo(() => {
    // Group relationships by type for clearer flow visualization
    const relationshipGroups = new Map<string, { source: string; target: string; weight: number }[]>();
    
    edges.forEach(edge => {
      const sourceNode = nodeMap.get(edge.sourceNodeId);
      const targetNode = nodeMap.get(edge.targetNodeId);
      if (sourceNode && targetNode) {
        const relType = edge.relationshipType.replace(/_/g, ' ');
        if (!relationshipGroups.has(relType)) {
          relationshipGroups.set(relType, []);
        }
        relationshipGroups.get(relType)?.push({
          source: sourceNode.entityType,
          target: targetNode.entityType,
          weight: edge.weight
        });
      }
    });

    // Create simplified flow: entity types -> relationship types -> entity types
    const flowNodes: Array<{ name: string }> = [];
    const flowLinks: Array<{ source: number; target: number; value: number }> = [];
    const nodeIndexMap = new Map<string, number>();
    
    let nodeIndex = 0;
    
    // Add source entity types
    const sourceTypes = new Set(Array.from(relationshipGroups.values()).flat().map(r => r.source));
    sourceTypes.forEach(type => {
      flowNodes.push({ name: `${type} (source)` });
      nodeIndexMap.set(`source_${type}`, nodeIndex++);
    });
    
    // Add target entity types
    const targetTypes = new Set(Array.from(relationshipGroups.values()).flat().map(r => r.target));
    targetTypes.forEach(type => {
      flowNodes.push({ name: `${type} (target)` });
      nodeIndexMap.set(`target_${type}`, nodeIndex++);
    });
    
    // Create links between source and target types
    relationshipGroups.forEach((relationships, relType) => {
      relationships.forEach(rel => {
        const sourceIdx = nodeIndexMap.get(`source_${rel.source}`);
        const targetIdx = nodeIndexMap.get(`target_${rel.target}`);
        if (sourceIdx !== undefined && targetIdx !== undefined) {
          flowLinks.push({
            source: sourceIdx,
            target: targetIdx,
            value: Math.round(rel.weight * 100)
          });
        }
      });
    });

    return { nodes: flowNodes, links: flowLinks };
  }, [edges, nodeMap]);

  // Selected node blast radius
  const selectedBlastRadius = selectedNodeId 
    ? blastRadiusResults.find(br => br.originNodeId === selectedNodeId)
    : blastRadiusResults[0]; // Default to first result

  return (
    <PageContainer pretitle="Fusion Map" title="Relationship Graph">
      {/* Enhanced KPI Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: componentTokens.gridGap, marginBottom: componentTokens.gridGap }}>
        <Kpi tokens={tokens} label="Nodes" value={String(nodes.length)} />
        <Kpi tokens={tokens} label="Edges" value={String(edges.length)} />
        <Kpi tokens={tokens} label="Critical Nodes" value={String(criticalNodes)} accent={primitiveSignal.warning} />
        <Kpi tokens={tokens} label="Entity Types" value={String(uniqueTypes)} />
        <Kpi tokens={tokens} label="Max Blast Impact" value={String(maxBlastRadius)} accent={primitiveSignal.critical} />
        <Kpi tokens={tokens} label="Avg Weight" value={avgWeight.toFixed(2)} />
      </section>

      {/* Visualization Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: componentTokens.gridGap, marginBottom: componentTokens.gridGap }}>
        {/* Network Graph Card */}
        <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}>
          <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>Network Graph</h3>
          <div style={{ height: '400px', border: `1px solid ${tokens.border.subtle}` }}>
            <ReactFlow
              nodes={flowNodes}
              edges={flowEdges}
              onNodeClick={(_, node) => setSelectedNodeId(node.id)}
              fitView
            >
              <Background color={tokens.border.subtle} />
              <Controls />
            </ReactFlow>
          </div>
        </div>

        {/* Blast Radius Card */}
        <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}>
          <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>
            Blast Radius {selectedBlastRadius && `(${nodeMap.get(selectedBlastRadius.originNodeId)?.label || selectedBlastRadius.originNodeId})`}
          </h3>
          {selectedBlastRadius && (
            <div style={{ display: 'grid', gap: primitiveSpacing[3] }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: primitiveSpacing[2] }}>
                <Kpi tokens={tokens} label="Affected" value={String(selectedBlastRadius.affectedNodes.length)} accent={primitiveSignal.warning} />
                <Kpi tokens={tokens} label="Depth" value={String(selectedBlastRadius.depth)} />
              </div>
              <Kpi tokens={tokens} label="Impact Score" value={String(selectedBlastRadius.totalImpactScore)} accent={primitiveSignal.critical} />
              <div>
                <h4 style={{ fontSize: primitiveTypeScale.caption, fontWeight: primitiveFontWeight.semibold, color: tokens.text.muted, margin: `0 0 ${primitiveSpacing[2]}`, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>Affected Nodes</h4>
                <div style={{ display: 'grid', gap: primitiveSpacing[1] }}>
                  {selectedBlastRadius.affectedNodes.map(nodeId => {
                    const node = nodeMap.get(nodeId);
                    return (
                      <div key={nodeId} style={{ 
                        fontSize: primitiveTypeScale.micro, 
                        color: tokens.text.secondary,
                        padding: primitiveSpacing[1],
                        background: tokens.surface.base,
                        border: `1px solid ${tokens.border.subtle}`
                      }}>
                        {node?.label || nodeId}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sankey Chart Card - Simplified to prevent stack overflow */}
      <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding, marginBottom: componentTokens.gridGap }}>
        <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>Entity Type Flow</h3>
        <div style={{ height: '300px' }}>
          {sankeyData.nodes.length > 0 && sankeyData.links.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <Sankey
                data={sankeyData}
                nodeWidth={15}
                nodePadding={25}
                iterations={6}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload as any;
                      return (
                        <div style={{
                          background: tokens.surface.elevated,
                          border: `1px solid ${tokens.border.default}`,
                          padding: primitiveSpacing[2],
                          fontSize: primitiveTypeScale.micro,
                          color: tokens.text.primary
                        }}>
                          <div>Entity Flow</div>
                          <div>Weight: {data.value}%</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </Sankey>
            </ResponsiveContainer>
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: tokens.text.muted,
              fontSize: primitiveTypeScale.caption
            }}>
              No flow data available
            </div>
          )}
        </div>
      </div>

      {/* Evidence Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: componentTokens.gridGap }}>
        <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}>
          <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>Topology Nodes (Evidence)</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
              <thead><tr>{['Label', 'Type', 'Domain', 'Criticality'].map((h) => <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, fontSize: primitiveTypeScale.micro }}>{h}</th>)}</tr></thead>
              <tbody>{nodes.map((n) => (
                <tr key={n.nodeId} style={{ borderBottom: `1px solid ${tokens.border.subtle}`, backgroundColor: selectedNodeId === n.nodeId ? tokens.surface.base : 'transparent' }}>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.primary, fontWeight: primitiveFontWeight.semibold, cursor: 'pointer' }} onClick={() => setSelectedNodeId(n.nodeId)}>{n.label}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary }}>{n.entityType}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.muted }}>{n.domain}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono, color: n.criticality <= 2 ? primitiveSignal.critical : tokens.text.secondary }}>{n.criticality}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
        <div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}>
          <h3 style={{ fontSize: primitiveTypeScale.h4, fontWeight: primitiveFontWeight.semibold, color: tokens.text.primary, margin: `0 0 ${componentTokens.cardHeaderMargin}` }}>Relationships (Evidence)</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: primitiveTypeScale.caption }}>
              <thead><tr>{['Source', 'Target', 'Type', 'Weight'].map((h) => <th key={h} style={{ textAlign: 'left', padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, borderBottom: `2px solid ${tokens.border.default}`, color: tokens.text.muted, fontWeight: primitiveFontWeight.semibold, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow, fontSize: primitiveTypeScale.micro }}>{h}</th>)}</tr></thead>
              <tbody>{edges.map((e) => (
                <tr key={e.edgeId} style={{ borderBottom: `1px solid ${tokens.border.subtle}` }}>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary, fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.micro }}>{nodeMap.get(e.sourceNodeId)?.label || e.sourceNodeId}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.secondary, fontFamily: primitiveFonts.mono, fontSize: primitiveTypeScale.micro }}>{nodeMap.get(e.targetNodeId)?.label || e.targetNodeId}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, color: tokens.text.primary }}>{e.relationshipType.replace(/_/g, ' ')}</td>
                  <td style={{ padding: `${primitiveSpacing[2]} ${primitiveSpacing[3]}`, fontFamily: primitiveFonts.mono }}>{e.weight}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function Kpi({ tokens, label, value, accent }: { tokens: ReturnType<typeof useMode>['tokens']; label: string; value: string; accent?: string }) {
  return (<div style={{ background: tokens.surface.elevated, border: `1px solid ${tokens.border.default}`, padding: componentTokens.cardPadding }}><span style={{ display: 'block', fontSize: primitiveTypeScale.micro, color: tokens.text.muted, textTransform: 'uppercase', letterSpacing: primitiveLetterSpacing.eyebrow }}>{label}</span><span style={{ fontSize: primitiveTypeScale.kpiValue, fontFamily: primitiveFonts.mono, fontWeight: primitiveFontWeight.bold, color: accent ?? tokens.text.primary }}>{value}</span></div>);
}
