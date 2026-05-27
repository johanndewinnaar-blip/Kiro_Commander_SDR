import { describe, it, expect } from 'vitest';
import { colors, typography, spacing, radii, shadows } from '../../packages/ui/src/tokens/index';
import { getStatusBadgeStyles } from '../../packages/ui/src/components/status-badge';
import { getPriorityConfig, getPriorityStyles } from '../../packages/ui/src/components/priority-indicator';
import { getCardStyles } from '../../packages/ui/src/components/card';

/**
 * Design System Token Tests — Commander SDR
 *
 * Validates:
 * - Military-intelligence colour palette present
 * - Visual intensity levels defined
 * - OODA phase colours defined
 * - Priority indicators use colour + text + shape (accessibility)
 * - Status badges use colour + text (accessibility)
 * - Typography tokens present
 * - Spacing tokens present
 *
 * Source: Spec #11a, Spec #41, Spec #43, v1.3 Requirements 11-24
 */

describe('Design Tokens — Colours', () => {
  it('has navy/ink background hierarchy', () => {
    expect(colors.background.base).toBeDefined();
    expect(colors.background.surface).toBeDefined();
    expect(colors.background.elevated).toBeDefined();
    expect(colors.background.overlay).toBeDefined();
  });

  it('has gold primary accent', () => {
    expect(colors.accent.gold).toBe('#b8860b');
  });

  it('has steel/silver supporting tones', () => {
    expect(Object.keys(colors.steel).length).toBeGreaterThanOrEqual(5);
  });

  it('has three visual intensity levels (Spec #41 §5)', () => {
    expect(colors.intensity.standard).toBeDefined();
    expect(colors.intensity.tactical).toBeDefined();
    expect(colors.intensity.emergency).toBeDefined();
  });

  it('has OODA phase colours (Spec #41 §V2.6-2)', () => {
    expect(colors.ooda.observe).toBeDefined();
    expect(colors.ooda.orient).toBeDefined();
    expect(colors.ooda.decide).toBeDefined();
    expect(colors.ooda.act).toBeDefined();
  });

  it('has priority colours P0-P4', () => {
    expect(colors.priority.p0).toBeDefined();
    expect(colors.priority.p1).toBeDefined();
    expect(colors.priority.p2).toBeDefined();
    expect(colors.priority.p3).toBeDefined();
    expect(colors.priority.p4).toBeDefined();
  });

  it('has status colours for build states', () => {
    expect(colors.status.live).toBeDefined();
    expect(colors.status.build).toBeDefined();
    expect(colors.status.scaffold).toBeDefined();
    expect(colors.status.stub).toBeDefined();
    expect(colors.status.critical).toBeDefined();
  });
});

describe('Design Tokens — Typography', () => {
  it('has font families', () => {
    expect(typography.fontFamily.sans).toBeDefined();
    expect(typography.fontFamily.mono).toBeDefined();
  });

  it('has dense font sizes (13px base)', () => {
    expect(typography.fontSize.base).toBe('0.8125rem');
  });

  it('has font weights', () => {
    expect(typography.fontWeight.normal).toBe('400');
    expect(typography.fontWeight.bold).toBe('700');
  });
});

describe('Design Tokens — Spacing', () => {
  it('has spacing scale', () => {
    expect(Object.keys(spacing).length).toBeGreaterThanOrEqual(8);
  });

  it('has border radii', () => {
    expect(radii.sm).toBe('2px');
    expect(radii.md).toBe('4px');
  });

  it('has shadows including gold glow', () => {
    expect(shadows.glow.gold).toBeDefined();
    expect(shadows.glow.critical).toBeDefined();
  });
});

describe('Status Badge (v1.3 Req 24 — colour accessibility)', () => {
  it('returns styles with text label (not colour alone)', () => {
    const styles = getStatusBadgeStyles({ status: 'BUILD' });
    expect(styles.label).toBe('BUILD');
    expect(styles.backgroundColor).toBeDefined();
  });

  it('all build statuses have labels', () => {
    const statuses = ['LIVE', 'BUILD', 'SCAFFOLD', 'STUB', 'PLANNED'] as const;
    for (const status of statuses) {
      const styles = getStatusBadgeStyles({ status });
      expect(styles.label).toBeTruthy();
    }
  });
});

describe('Priority Indicator (v1.3 Req 24 — colour + text + shape)', () => {
  it('P0 has colour, label AND shape', () => {
    const config = getPriorityConfig('P0');
    expect(config.color).toBeDefined();
    expect(config.label).toContain('CRITICAL');
    expect(config.shape).toBeDefined();
  });

  it('all priorities have distinct shapes', () => {
    const priorities = ['P0', 'P1', 'P2', 'P3', 'P4'] as const;
    const shapes = priorities.map((p) => getPriorityConfig(p).shape);
    const unique = new Set(shapes);
    expect(unique.size).toBe(5);
  });

  it('P0 gets emergency styling (Spec #41 P0 visual rule)', () => {
    const styles = getPriorityStyles({ priority: 'P0' });
    expect(styles.boxShadow).not.toBe('none');
  });

  it('non-P0 priorities do not get emergency styling', () => {
    const styles = getPriorityStyles({ priority: 'P3' });
    expect(styles.boxShadow).toBe('none');
  });
});

describe('Card Component', () => {
  it('default card has elevated background and subtle border', () => {
    const styles = getCardStyles();
    expect(styles.backgroundColor).toBe(colors.background.elevated);
    expect(styles.border).toContain(colors.border.subtle);
  });

  it('interactive card has cursor pointer', () => {
    const styles = getCardStyles({ interactive: true });
    expect(styles.cursor).toBe('pointer');
  });

  it('outlined variant has transparent background', () => {
    const styles = getCardStyles({ variant: 'outlined' });
    expect(styles.backgroundColor).toBe('transparent');
  });
});
