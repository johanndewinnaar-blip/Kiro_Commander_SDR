/**
 * Commander SDR — Component Tokens (Layer 3)
 *
 * Per-component pinned dimensions.
 * Source: docs/06_ui_build_reference/DESIGN_SYSTEM.md §4
 */

import { primitiveSpacing, primitiveRadii } from './primitives';

export const componentTokens = {
  topbarHeight: '56px',
  sidebarWidth: '248px',
  sidebarRail: '68px',
  cardPadding: primitiveSpacing[4],    // 16px
  cardRadius: primitiveRadii.md,        // 2px (sharp corners per Tweak Pass A)
  gridGap: primitiveSpacing[4],         // 16px
  gridColumns: 12,                      // 12-column grid system
  contentPadding: primitiveSpacing[5],  // 24px
  pageheaderPadding: primitiveSpacing[5], // 24px
  tableRowHeight: '36px',
  tableHeaderHeight: '40px',
  buttonHeight: '32px',
  buttonHeightEmphasis: '36px',
  inputHeight: '34px',
  itemHeight: '36px',
  searchWidth: '440px',
  avatarSize: '32px',
  cardHeaderMargin: primitiveSpacing[3], // 12px — consistent card header bottom margin
} as const;

export type ComponentTokens = typeof componentTokens;
