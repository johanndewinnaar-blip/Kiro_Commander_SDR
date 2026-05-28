/**
 * Font Configuration — Commander SDR
 *
 * v1.3.2 Requirement 1: Bebas Neue as display font (brand wordmark, page headings)
 * v1.3.2 Requirement 2: Inter (400/500/600/700/800) as body font
 * v1.3.2 Requirement 3: 13px base font size
 *
 * Source: both shell references
 */

import { Inter, Bebas_Neue } from 'next/font/google';

const interFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const bebasNeueFont = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

/** Plain string CSS variable class names — safe for RSC serialization */
export const inter = { variable: interFont.variable };
export const bebasNeue = { variable: bebasNeueFont.variable };
