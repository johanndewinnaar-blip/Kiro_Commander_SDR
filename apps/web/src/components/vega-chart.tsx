'use client';

import { useRef, useEffect } from 'react';
import embed from 'vega-embed';

/**
 * VegaChart — Commander SDR
 *
 * Renders a Vega-Lite spec using vega-embed.
 * DS-1.0 §13: Charts use --data-* semantic tokens, never literal hex.
 * All chart specs are declarative JSON; this component handles rendering.
 */

interface VegaChartProps {
  spec: Record<string, unknown>;
  className?: string;
}

export function VegaChart({ spec }: VegaChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const embedResult = embed(containerRef.current, spec as any, {
      actions: false,
      renderer: 'svg',
      theme: undefined,
    });

    return () => {
      embedResult.then((result) => result.finalize()).catch(() => {});
    };
  }, [spec]);

  return <div ref={containerRef} style={{ width: '100%', minHeight: '200px' }} />;
}
