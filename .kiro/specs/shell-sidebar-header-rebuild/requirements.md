# Requirements Document

## Introduction

This spec covers the rebuild of the Commander SDR application shell, sidebar and header. The current shell has a single overloaded top bar that combines brand, full navigation, search, AI action, mode toggle and user profile — causing logo clipping, navigation wrapping, search compression and header overcrowding as the product grows.

The rebuild introduces a clean three-zone layout: a persistent vertical sidebar that owns primary navigation, a dedicated horizontal header that owns section navigation, search and utility actions, and a main workspace content area that is unchanged. This is a shell and navigation refactoring task only. No routes, application functionality, data models, page content, dashboard logic, charting, case logic or table data logic may change.

The rebuild must comply with Commander SDR design doctrine (DS-1.0), the three-layer token system (primitive → semantic → component), the registry-driven navigation model (Spec #56), and the Commander v2.6 authority hierarchy.

## Glossary

- **Shell**: The persistent application chrome that wraps all pages. Composed of the Sidebar, the Header and the Workspace.
- **Sidebar**: The persistent vertical navigation panel on the left edge of the Shell. Primary navigation authority.
- **Header**: The persistent horizontal bar at the top of the content area (to the right of the Sidebar). Owns section navigation, search and utility actions.
- **Workspace**: The scrollable main content area below the Header and to the right of the Sidebar. Page content lives here.
- **Brand_Block**: The top section of the Sidebar containing the Commander SDR wordmark and Seiertech attribution.
- **Scrollable_Menu**: The vertically scrollable navigation list in the Sidebar, between the Brand_Block and the Collapse_Footer.
- **Collapse_Footer**: The fixed bottom section of the Sidebar containing the collapse/expand control.
- **Nav_Group**: A labelled, expandable group of navigation items within the Scrollable_Menu.
- **Nav_Item**: A single navigation link within a Nav_Group.
- **Top_Nav**: The short horizontal navigation strip in the Header showing section-level destinations.
- **Icon_Map**: The central registry of Lucide icon assignments for all navigation modules and header utilities, located at `packages/ui/src/icons/index.ts`.
- **Theme_Toggle**: The single-icon button in the Header that switches between light (standard) and dark (mission) workspace modes.
- **Notification_Bell**: The Lucide Bell icon button in the Header that surfaces user-routed unread notifications.
- **Commander_AI_Action**: The compact button in the Header that opens the Commander AI surface. Renders one Lucide icon and the visible text label "Commander AI".
- **User_Profile_Block**: The user identity block at the right end of the Header showing initials or avatar, name and role.
- **Token_System**: The three-layer design token system: primitive → semantic → component. No hardcoded values permitted in component or page code.
- **Build_Status_Badge**: A compact text label (SCAFFOLD, PLANNED, BUILD, ADMIN, or NEW) rendered on Nav_Groups to indicate build-mode visibility.
- **Lucide**: The `lucide-react` icon library (already installed as a dependency). All icons must be sourced from this library.
- **Gold**: The brand accent colour `#ffd21f` (primitive token `primitiveBrand.gold`). Usage is restricted to two contexts only: the COMMANDER wordmark in the Brand_Block and the active Top_Nav underline.
- **Near_Black_Navy**: The sidebar background colour `#040a11` or equivalent near-black navy token. Not pure `#000000`.
- **Sidebar_Active_Background**: The semantic token `semanticTokens.sidebar.activeBackground` — a subtly lifted surface applied to the active Nav_Group or Nav_Item. Non-Gold value.
- **Sidebar_Active_Indicator**: The semantic token `semanticTokens.sidebar.activeIndicator` — the colour of the 2px left border on the active Nav_Item. Non-Gold value.
- **Sidebar_Width_Expanded**: The tokenised expanded sidebar width, target 264px (component token key `sidebarWidth`).
- **Sidebar_Width_Collapsed**: The tokenised collapsed sidebar width (icon rail), target 72px (component token key `sidebarRail`).

---

## Requirements

### Requirement 1: Three-Zone Shell Layout

**User Story:** As a Commander SDR user, I want a stable three-zone application shell so that the sidebar, header and workspace are always present and correctly composed on every page.

#### Acceptance Criteria

1. THE Shell SHALL render three distinct zones on every page: the Sidebar on the left, the Header above the Workspace, and the Workspace as the scrollable content area.
2. THE Shell SHALL position the Sidebar as a fixed vertical panel occupying the full viewport height on the left edge.
3. THE Shell SHALL position the Header as a fixed horizontal bar at the top of the area to the right of the Sidebar.
4. THE Shell SHALL position the Workspace below the Header and to the right of the Sidebar, occupying the remaining viewport area.
5. WHEN the Sidebar state changes to collapsed, THE Header left-offset SHALL equal the Sidebar_Width_Collapsed token value and THE Workspace width SHALL equal the viewport width minus the Sidebar_Width_Collapsed token value, with the transition duration matching `primitiveMotion.standard`.
6. WHEN the Sidebar state changes to expanded, THE Header left-offset SHALL equal the Sidebar_Width_Expanded token value and THE Workspace width SHALL equal the viewport width minus the Sidebar_Width_Expanded token value, with the transition duration matching `primitiveMotion.standard`.
7. IF a sidebar width token resolves to a non-positive or non-numeric dimension, THEN THE Shell SHALL apply a fallback layout in which each of the three zones renders with non-zero width and height and no zone is hidden or overlapping another.
8. THE Shell SHALL apply all layout dimensions exclusively through Token_System values, with no hardcoded pixel or colour values in Shell component code.

---

### Requirement 2: Sidebar Structure

**User Story:** As a Commander SDR user, I want a well-structured sidebar so that the brand, navigation and collapse control are always in predictable positions and the navigation never obscures the brand or collapse control.

#### Acceptance Criteria

1. THE Sidebar SHALL be composed of three vertically stacked sections in order from top to bottom: Brand_Block, Scrollable_Menu, Collapse_Footer.
2. THE Brand_Block SHALL be fixed at the top of the Sidebar and SHALL NOT scroll with the menu.
3. THE Scrollable_Menu SHALL scroll independently when its navigation content exceeds the available height between the bottom edge of the Brand_Block and the top edge of the Collapse_Footer.
4. THE Collapse_Footer SHALL be fixed at the bottom of the Sidebar and SHALL NOT scroll with the menu.
5. WHILE the Sidebar is expanded, THE Scrollable_Menu SHALL display Nav_Groups with their labels, icons and Build_Status_Badges, where a Build_Status_Badge is a visual indicator of the build or scaffold state of a Nav_Group.
6. WHEN icons for Nav_Groups have not yet loaded, THE Sidebar SHALL render the icon placeholder within 200 ms of the Scrollable_Menu becoming visible, without waiting for labels or Build_Status_Badges to be ready.
7. WHILE the Sidebar is collapsed, THE Scrollable_Menu SHALL display Nav_Group icons only, with no visible labels.
8. THE Sidebar SHALL apply a custom scrollbar to the Scrollable_Menu using the semantic scrollbar thumb token, the semantic scrollbar thumb hover token, and a transparent track, with no literal colour values applied directly.

---

### Requirement 3: Sidebar Width Tokens

**User Story:** As a developer maintaining Commander SDR, I want sidebar widths defined as central tokens so that any future width adjustment propagates consistently across the Shell, Header and Workspace without patching individual components.

#### Acceptance Criteria

1. THE Token_System SHALL define `componentTokens.sidebarWidth` as a component-layer token with a value of 264px, replacing the existing 248px value which is outside the required 260–280px range.
2. THE Token_System SHALL define `componentTokens.sidebarRail` as a component-layer token with a value of 72px, replacing the existing 68px value which is outside the required 72–80px range.
3. THE Shell SHALL reference `componentTokens.sidebarWidth` and `componentTokens.sidebarRail` exclusively through Token_System values.
4. THE Sidebar SHALL reference `componentTokens.sidebarWidth` and `componentTokens.sidebarRail` exclusively through Token_System values.
5. THE Header SHALL reference `componentTokens.sidebarWidth` and `componentTokens.sidebarRail` exclusively through Token_System values to compute its left offset.
6. IF a hardcoded pixel value for sidebar width is found in Shell, Sidebar or Header component code, THEN that value SHALL be moved to the component-layer token definition and the hardcoded value removed.
7. IF any token definition is missing, any token value is outside its specified range, or any token key name deviates from the naming convention in the component-layer token file, THEN THE Token_System SHALL be treated as non-compliant and the deviation must be corrected before implementation proceeds.

---

### Requirement 4: Sidebar Brand Block

**User Story:** As a Commander SDR user, I want a clear brand identity at the top of the sidebar so that the product name and company attribution are always visible and correctly styled.

#### Acceptance Criteria

1. WHILE the Sidebar is expanded, THE Brand_Block SHALL render the wordmark on two lines: line 1 containing "COMMANDER" in Gold and "SDR" in white using the `typography.role.logoText` token (22px, weight 700, letter-spacing `primitiveLetterSpacing.display`); line 2 containing "Seiertech ®" using the `typography.fontSize.sm` token (12px, weight 400) with the registered trademark symbol.
2. THE Brand_Block SHALL use the Inter font exclusively for all wordmark text, sourced from the `primitiveFonts.body` token.
3. THE Brand_Block SHALL NOT use any Lucide icon as a logo or brand mark.
4. THE Brand_Block SHALL NOT use any image asset for the logo (image asset is a future replacement).
5. WHILE the Sidebar is expanded, THE Brand_Block SHALL render the full wordmark. WHILE the Sidebar is collapsed, THE Brand_Block SHALL render a single Gold "C" glyph at `typography.role.logoText` size. IF the compact representation produces zero visible pixels or a render error, THEN THE Brand_Block SHALL be hidden completely rather than showing a broken state.
6. THE Brand_Block SHALL apply Gold exclusively to the "COMMANDER" text and to no other element within the Brand_Block.

---

### Requirement 5: Sidebar Navigation — Primary Authority

**User Story:** As a Commander SDR user, I want all primary navigation to live in the sidebar so that I can reach any module without the header becoming overcrowded.

#### Acceptance Criteria

1. THE Sidebar SHALL be the primary navigation authority for all operational modules registered in `OPERATIONAL_NAV_GROUPS`, including: Command Centre, Case Management, Mission Control, Fusion Map, Vulnerability Management, Exposure Management, Identity & Access, Architecture, Assets, Controls, Coverage, Tool Health, Team Pulse, Domain Pulse, and System Pulse.
2. IF the Sidebar is the primary navigation authority, THEN THE Sidebar SHALL render each module as a Nav_Group with expandable sub-items matching the existing registry entries in `OPERATIONAL_NAV_GROUPS`.
3. THE Sidebar SHALL preserve all existing Nav_Group IDs, labels, paths and Build_Status_Badges from the current registry without modification.
4. WHEN the current route path starts with a Nav_Group's base path, THE Sidebar SHALL render that Nav_Group with a subtly lifted background (using `semanticTokens.sidebar.activeBackground`) and increased label contrast to indicate the active group state.
5. WHEN the current route path exactly matches a Nav_Item's path, THE Sidebar SHALL render that Nav_Item with a subtly lifted background (using `semanticTokens.sidebar.activeBackground`) and a 2px left border using `semanticTokens.sidebar.activeIndicator` to indicate the active item state.
6. THE Sidebar SHALL NOT duplicate the full primary navigation in the Header.
7. THE Sidebar SHALL render Build_Status_Badges (SCAFFOLD, PLANNED, BUILD, ADMIN, NEW) as compact text labels on applicable Nav_Groups.
8. WHEN a Nav_Group is in its default state, THE Sidebar SHALL render it collapsed. WHEN the user activates a Nav_Group header via pointer click or keyboard Enter/Space, THE Sidebar SHALL toggle the group's expanded state and persist that state for the current session.
9. WHILE the Sidebar is collapsed to the icon rail, THE Sidebar SHALL render Nav_Group icons only and SHALL NOT render Nav_Group labels, sub-items or Build_Status_Badges.

---

### Requirement 6: Sidebar Navigation Labels — No Clipping

**User Story:** As a Commander SDR user, I want all sidebar navigation labels to be fully readable so that long module names are never truncated or wrapped in the expanded state.

#### Acceptance Criteria

1. WHILE the Sidebar is expanded, THE Scrollable_Menu SHALL render all Nav_Group labels with `white-space: nowrap` and `overflow: visible`, including labels of 25 characters or more such as "Vulnerability Management", "Exposure Management", "Identity & Access" and "Mission Control", at 14px/500 weight.
2. THE `componentTokens.sidebarWidth` token SHALL be set to a value wide enough to accommodate the longest Nav_Group label at 14px/500 weight plus all horizontal padding, icon width and chevron width without truncation. The minimum derived value is 256px; the token SHALL be set to at least this value.
3. WHILE the Sidebar is collapsed, THE Scrollable_Menu SHALL NOT render label text nodes for any Nav_Group.

---

### Requirement 7: Sidebar Collapse Control

**User Story:** As a Commander SDR user, I want a clear and stable collapse/expand control at the bottom of the sidebar so that I can adjust the sidebar width without losing my place in the navigation.

#### Acceptance Criteria

1. THE Collapse_Footer SHALL render a Lucide ChevronLeft icon (20px) as the collapse/expand trigger, oriented pointing left when the Sidebar is expanded and rotated 180° (pointing right) when the Sidebar is collapsed.
2. WHILE the Sidebar is expanded, THE Collapse_Footer SHALL display the label "Collapse" alongside the icon. IF the sidebar state cannot be read from storage on initialisation, THEN THE Collapse_Footer SHALL default to the expanded state and display the label.
3. WHILE the Sidebar is collapsed, THE Collapse_Footer SHALL display the ChevronLeft icon rotated 180° with no label.
4. WHEN the collapse trigger is activated, THE Sidebar SHALL transition between expanded and collapsed states using the existing motion token (`primitiveMotion.standard`).
5. THE Collapse_Footer SHALL remain fixed at the bottom of the Sidebar at all times, regardless of Scrollable_Menu scroll position.
6. THE Collapse_Footer icon and label SHALL use `standardTokens.chrome.navText` colour and SHALL NOT use Gold.

---

### Requirement 8: Sidebar Colour and Surface Tokens

**User Story:** As a Commander SDR user, I want the sidebar to maintain its dark brand identity in both light and dark workspace modes so that the navigation chrome is always visually distinct from the workspace content.

#### Acceptance Criteria

1. THE Sidebar SHALL apply the `semanticTokens.sidebar.background` token as its background colour in both light (standard) and dark (mission) workspace modes, where that token resolves to `#040a11` or a near-black navy equivalent.
2. THE Sidebar background SHALL have an HSL lightness value at least 10 percentage points lower than the Workspace background and at least 10 percentage points lower than the Header background in both workspace modes.
3. THE Sidebar background SHALL NOT be pure `#000000` (HSL lightness 0%).
4. THE Token_System SHALL define `semanticTokens.sidebar.background`, `semanticTokens.sidebar.scrollbarThumb`, `semanticTokens.sidebar.scrollbarThumbHover`, `semanticTokens.sidebar.scrollbarTrack`, `semanticTokens.sidebar.activeBackground` and `semanticTokens.sidebar.activeIndicator` as named semantic tokens.
5. THE Token_System SHALL define `semanticTokens.sidebar.background` in the light (standard) mode token set as the near-black navy value so that the Sidebar retains its dark brand identity in light mode.
6. THE Sidebar SHALL reference all colour values exclusively through Token_System tokens, with no hardcoded hex values in Sidebar component code.

---

### Requirement 9: Sidebar Icon Map

**User Story:** As a developer maintaining Commander SDR, I want all sidebar icons sourced from a single central icon map so that icon assignments are consistent, auditable and easy to update.

#### Acceptance Criteria

1. THE Icon_Map SHALL be defined as a single central module at `packages/ui/src/icons/index.ts`, mapping each navigation module identifier to a Lucide icon component.
2. THE Icon_Map SHALL assign icons from the following approved semantic mappings:
   - Command Centre: LayoutDashboard, Home or Gauge
   - Case Management: FolderKanban, Briefcase or Inbox
   - Mission Control: Radar, Crosshair or Goal
   - Fusion Map: Network, GitBranch or Map
   - Vulnerability Management: ShieldAlert, Bug or TriangleAlert
   - Exposure Management: ScanSearch, Radar or Globe2
   - Identity & Access: Users, UserCog or KeyRound
   - Architecture: Blocks, Network or Building2
   - Assets: Server, Boxes or HardDrive
   - Controls: ShieldCheck, ListChecks or ClipboardCheck
   - Coverage: Radar, Scan or CircleDot
   - Tool Health: Activity, PlugZap or HeartPulse
   - Team Pulse: UsersRound, Activity or HeartPulse
   - Domain Pulse: Globe, Building2 or Network
   - System Pulse: Activity, ServerCog or Cpu
3. THE Sidebar SHALL source all navigation icons exclusively from the Icon_Map.
4. WHILE a navigation icon is in its default state, THE Icon_Map SHALL render it with `fill="none"` and `stroke="currentColor"` (monochrome line/outline style) with a `strokeWidth` of 1.75.
5. WHILE a navigation icon is in its hover or active state, THE Icon_Map SHALL render it with `fill="none"` and `stroke="currentColor"` (monochrome line/outline style) with a `strokeWidth` of 1.75, with no Gold fill or stroke applied.
6. THE Sidebar SHALL render navigation icons at a size within the strict inclusive range of 18–20px.
7. THE Icon_Map SHALL NOT assign the Gold token to any navigation icon in any state.
8. IF a module identifier is not present in the Icon_Map, THEN THE Icon_Map SHALL return a fallback Lucide Circle icon rather than throwing an error or rendering nothing.

---

### Requirement 10: Horizontal Header Structure

**User Story:** As a Commander SDR user, I want a dedicated horizontal header so that section navigation, search and utility actions are clearly separated from the primary sidebar navigation and never overcrowded.

#### Acceptance Criteria

1. THE Header SHALL be a fixed horizontal bar positioned above the Workspace and to the right of the Sidebar.
2. THE Header SHALL contain exactly five functional groups in order from left to right: (1) Top_Nav, (2) Search, (3) Commander_AI_Action and Theme_Toggle combined, (4) Notification_Bell, (5) User_Profile_Block.
3. THE Header SHALL render exactly four 1px vertical separators — one between each adjacent pair of functional groups — using the `semanticTokens.chrome.separator` token.
4. THE Header SHALL apply all dimensions, colours and spacing exclusively through Token_System values.
5. THE Header SHALL NOT contain a duplicate of the full primary navigation that is already present in the Sidebar.
6. THE Header bar height SHALL be defined by the `componentTokens.topbarHeight` token and SHALL render at the value of that token.

---

### Requirement 11: Header Top Navigation

**User Story:** As a Commander SDR user, I want a short section navigation strip in the header so that I can quickly jump between the most-used top-level surfaces without opening the sidebar.

#### Acceptance Criteria

1. THE Top_Nav SHALL contain exactly the following items in order: Command Centre, Fusion Map, Vulnerabilities, Identity, Architecture, CISO.
2. THE Top_Nav SHALL NOT contain a "Cases" item.
3. THE Top_Nav item for the CISO surface SHALL be labelled "CISO" (not "CISO Dashboard").
4. WHILE a Top_Nav item's route path exactly matches the current route, THE Top_Nav SHALL render a Gold underline on that item using the `semanticTokens.brand.gold` border token at the thickness defined by `componentTokens.topNavUnderline`.
5. THE Top_Nav SHALL NOT apply Gold to any item whose route path does not exactly match the current route, including in hover and focus states.
6. THE Top_Nav SHALL render item text at 14px with font weight 500 using the `typography.role.navText` token.
7. THE Top_Nav item height SHALL be defined by the `componentTokens.topNavItemHeight` token. WHEN the Token_System provides a value for `componentTokens.topNavItemHeight`, THE Top_Nav SHALL use that token value.
8. WHEN no Top_Nav item's route path matches the current route, THE Top_Nav SHALL render all items without a Gold underline.

---

### Requirement 12: Header Search

**User Story:** As a Commander SDR user, I want a properly sized search field in the header so that I can search cases, assets, CVEs and identities without the field being compressed by surrounding elements.

#### Acceptance Criteria

1. THE Header search field SHALL render at exactly the `componentTokens.searchWidth` token value (defined in the range 360–480px), and no adjacent header element SHALL reduce the rendered width below that token value.
2. THE Header search field SHALL include a monochrome Lucide Search icon with `fill="none"`, `stroke="currentColor"`, size 18–20px and `strokeWidth` 1.75–2.
3. THE Header search field SHALL apply its border colour from `semanticTokens.input.border`, its background from `semanticTokens.input.background`, and its text colour from `semanticTokens.input.text` in both workspace modes. IF a token fails to resolve, THEN THE search field SHALL fall back to the dark mode token values.
4. THE Header search field SHALL display a static "⌘K" keyboard hint at the trailing edge of the field interior.
5. THE `componentTokens.searchWidth` token SHALL be defined with a value in the range 360–480px.

---

### Requirement 13: Header Theme Toggle

**User Story:** As a Commander SDR user, I want a single-icon theme toggle in the header so that I can switch between light and dark workspace modes without visual clutter.

#### Acceptance Criteria

1. THE Theme_Toggle SHALL render a single Lucide icon with no accompanying label text.
2. WHILE the workspace is in dark (mission) mode, THE Theme_Toggle SHALL render the Lucide Moon icon.
3. WHILE the workspace is in light (standard) mode, THE Theme_Toggle SHALL render the Lucide Sun icon.
4. THE Theme_Toggle SHALL NOT render both the Sun and Moon icons simultaneously under any condition.
5. WHEN the Theme_Toggle is activated via pointer click or keyboard Enter/Space, THE Shell SHALL switch the workspace mode between light (standard) and dark (mission), and THE Theme_Toggle aria-label SHALL update to reflect the mode that will be activated on the next interaction.
6. THE Theme_Toggle SHALL NOT render a bordered box, background fill or text label (removing the previous Mission-mode toggle box styling).
7. THE Theme_Toggle icon SHALL be rendered with a single fill colour from `currentColor` (no gradient or multi-colour fill) at a rendered SVG width and height within the strict inclusive range of 18–20px.

---

### Requirement 14: Header Commander AI Action

**User Story:** As a Commander SDR user, I want a compact Commander AI button in the header so that I can access Commander AI quickly without the button wrapping or dominating the header.

#### Acceptance Criteria

1. THE Commander_AI_Action SHALL render as a button containing exactly one Lucide icon chosen from the permitted set (Sparkles, Bot, BrainCircuit, Command or WandSparkles) followed by the visible text label "Commander AI", with horizontal padding of no more than 12px per side.
2. THE Commander_AI_Action SHALL NOT use emoji or colourful AI graphics.
3. THE Commander_AI_Action SHALL NOT wrap its content across multiple lines.
4. THE Commander_AI_Action SHALL NOT apply the Gold token to the button background, border or icon in any interactive state (default, hover, focus or active).
5. THE Commander_AI_Action icon SHALL be rendered in monochrome using `currentColor` at a size within the strict inclusive range of 18–20px.
6. THE Commander_AI_Action SHALL have an accessible name derived from the visible text label "Commander AI", satisfying screen-reader identification without requiring a separate aria-label.

---

### Requirement 15: Header Notification Bell

**User Story:** As a Commander SDR user, I want a notification bell in the header that shows my unread notification count so that I am aware of items assigned to me without being distracted by platform-wide event counters.

#### Acceptance Criteria

1. THE Notification_Bell SHALL render a Lucide Bell icon in monochrome using `currentColor` with an accessible label identifying it as the notification bell.
2. WHEN the current user has one or more unread notifications, THE Notification_Bell SHALL render a red badge displaying the unread count, capped at 99 (displaying "99+" for counts above 99).
3. WHEN the current user has zero unread notifications, THE Notification_Bell SHALL render without a badge, regardless of whether user-routed notifications exist in a read state.
4. THE Notification_Bell unread count SHALL reflect only notifications routed to the current user through: direct assignment, team membership, role, permission group, asset/case/control/tool ownership, escalation path or explicit mention.
5. THE Notification_Bell SHALL NOT display a count of global platform events unrelated to the current user.
6. IF a backend notification service does not yet exist, THEN THE Notification_Bell SHALL use a mock/placeholder interface with static or seed data that satisfies criteria 1–5. THE Notification_Bell SHALL continue using the mock interface until the backend service is explicitly configured.
7. WHEN the notification data source updates, THE Notification_Bell SHALL re-render the badge count to reflect the current unread count without requiring a full page reload.

---

### Requirement 16: Header User Profile Block

**User Story:** As a Commander SDR user, I want my identity clearly shown in the header so that I can confirm which account I am operating under without the block wrapping or being crushed by adjacent elements.

#### Acceptance Criteria

1. THE User_Profile_Block SHALL render the current user's display name (maximum 30 characters, truncated with ellipsis if longer) and an initials block (maximum 3 characters derived from the display name).
2. IF an avatar image is available for the current user, THEN THE User_Profile_Block SHALL render the avatar image in place of the initials block.
3. THE User_Profile_Block SHALL NOT wrap its content across multiple lines.
4. THE User_Profile_Block SHALL render with a minimum width of 120px and a minimum height equal to the `componentTokens.topbarHeight` token value, and no adjacent header element SHALL reduce the rendered width below 120px.
5. THE Header SHALL render a 1px vertical separator immediately to the left of the User_Profile_Block using the `semanticTokens.chrome.separator` token.
6. IF a user role is available, THEN THE User_Profile_Block SHALL display the role below the display name. IF no role is available, THEN THE User_Profile_Block SHALL render without a role line and SHALL NOT show a placeholder or empty line.

---

### Requirement 17: Light and Dark Mode Shell Surface Tokens

**User Story:** As a Commander SDR user, I want the shell surfaces to adapt correctly to light and dark workspace modes so that the application is readable and visually consistent in both modes.

#### Acceptance Criteria

1. THE Token_System SHALL define the following dark (mission) mode shell surface tokens:
   - Sidebar background: `#040a11` or near-black navy
   - Header background: `#0d1b2a`
   - Page background: `#040a11` or near-black navy family
   - Card/panel background: `#0e1722` or `#182433`
   - Border: `#25384f`
   - Body text: `#dce1e7`
   - Secondary text: `rgba(220, 225, 231, 0.75)`
2. THE Token_System SHALL define the following light (standard) mode shell surface tokens:
   - Page background: `#f6f8fb`
   - Card/panel background: `#ffffff`
   - Card border: `#dce1e7`
   - Body text: `#182433`
   - Secondary text: `rgba(24, 36, 51, 0.75)`
   - Header background: `#ffffff`
   - Sidebar background: near-black navy (defined as a named semantic token so the Sidebar retains its dark brand identity in light mode)
3. WHILE the workspace is in light (standard) mode, THE Sidebar SHALL retain its near-black navy background by referencing the light mode `semanticTokens.sidebar.background` token.
4. THE Shell, Sidebar, Header and Workspace SHALL reference all surface colours exclusively through Token_System semantic tokens.
5. IF a component references a hardcoded hex value, `rgba()`, `hsl()` or named CSS colour literal for a shell surface, THEN that value SHALL be moved to the Token_System and the hardcoded reference removed.

---

### Requirement 18: Navigation Sizing Tokens

**User Story:** As a developer maintaining Commander SDR, I want all navigation text sizes, weights and row heights defined as tokens so that sizing is consistent and adjustable without patching individual components.

#### Acceptance Criteria

1. THE Token_System SHALL define the following navigation sizing tokens with these exact values:
   - `componentTokens.topNavTextSize`: 14px, weight 500, line height 1.2
   - `componentTokens.sidebarNavTextSize`: 14px, weight 500, line height 1.2
   - `componentTokens.sidebarSubNavTextSize`: 12px, weight 500, line height 1.2
   - `componentTokens.sidebarGroupHeaderTextSize`: 12px, weight 700, line height 1.2
   - `componentTokens.topNavItemHeight`: 44px
   - `componentTokens.sidebarRowHeight`: 40px
   - `componentTokens.sidebarSubRowHeight`: 36px
2. THE Sidebar SHALL reference all text sizes, weights and row heights exclusively through the Token_System values defined in criterion 1, with no hardcoded sizing literals in Sidebar component code.
3. THE Header Top_Nav SHALL reference all text sizes, weights and row heights exclusively through the Token_System values defined in criterion 1, with no hardcoded sizing literals in Header component code.

---

### Requirement 19: Gold Usage Restriction

**User Story:** As a Commander SDR designer, I want Gold used only in its two authorised contexts so that the brand accent retains its premium signal value and is not diluted by overuse.

#### Acceptance Criteria

1. THE Shell SHALL apply Gold exclusively to: (1) the "COMMANDER" text in the Brand_Block wordmark, and (2) the active Top_Nav item underline.
2. THE Shell SHALL NOT apply Gold to: general navigation icons, buttons, card accents, hover states (including the hover state of the active Top_Nav item), decorative accents, sidebar active icons, the Collapse_Footer icon, the Commander_AI_Action, the Theme_Toggle or the Notification_Bell.
3. THE Sidebar active Nav_Item state SHALL use a non-Gold visual treatment composed of: (1) a subtly lifted background via `semanticTokens.sidebar.activeBackground` producing a minimum luminance delta of 10% against the default sidebar background, and (2) a 2px left border via `semanticTokens.sidebar.activeIndicator`. THE Token_System SHALL define both `semanticTokens.sidebar.activeBackground` and `semanticTokens.sidebar.activeIndicator` as named semantic tokens with non-Gold values.

---

### Requirement 20: Lucide Icon System

**User Story:** As a developer maintaining Commander SDR, I want all icons sourced from lucide-react through a central map so that the icon system is consistent, auditable and does not introduce random per-page imports.

#### Acceptance Criteria

1. THE Icon_Map module at `packages/ui/src/icons/index.ts` SHALL be the single import source for all Lucide icons used in the Shell, Sidebar and Header.
2. THE Shell, Sidebar and Header SHALL NOT import Lucide icons directly from `lucide-react` outside the Icon_Map module.
3. THE Icon_Map SHALL cover: all Sidebar navigation module icons for every Nav_Group registered in `OPERATIONAL_NAV_GROUPS`, all Header utility icons (Search, Sun, Moon, Bell, and the Commander_AI_Action icon), and the Collapse_Footer icon (ChevronLeft).
4. THE Icon_Map SHALL render all icons with `fill="none"` and `stroke="currentColor"` (monochrome line/outline style).
5. THE Icon_Map SHALL define icon sizes as: Sidebar navigation icons within the strict inclusive range of 18–20px, Header utility icons within the strict inclusive range of 18–20px, small inline icons (used within body text or table cells) within the strict inclusive range of 14–16px.
6. THE Icon_Map SHALL define `strokeWidth` as the unitless SVG prop with a default value of 1.75 for all icons.
7. THE Icon_Map SHALL expose a typed accessor function that enforces size and stroke constraints, preventing consumers from bypassing these constraints via raw Lucide component props.

---

### Requirement 21: Route Registry and Workspace Content Preservation

**User Story:** As a Commander SDR developer, I want the shell rebuild to leave all routes, page content and application functionality completely unchanged so that the refactoring introduces no regressions in any existing surface.

#### Acceptance Criteria

1. THE Shell rebuild SHALL NOT modify any entry in the route registry: `operationalRoutes`, `OPERATIONAL_NAV_GROUPS`, `TOP_NAV_WORKSPACES`, `CONTROL_PLANE_NAV_ITEMS`, `tenantAdminRoutes`, `controlPlaneRoutes` or `CONTROL_PLANE_TOP_NAV`.
2. THE Shell rebuild SHALL NOT modify any file under `apps/web/src/app/` (page components, layouts, route segments) or any named component under `apps/web/src/components/` that is not a shell, sidebar, header or icon-map component.
3. THE Shell rebuild SHALL NOT remove or rename any existing route path.
4. WHEN the Workspace renders a page, THE Workspace SHALL pass `{children}` to the `<main>` element without adding, removing or reordering any wrapper elements between `<main>` and `{children}`.
5. IF the Shell rebuild requires changes to `apps/web/src/app/layout.tsx`, THEN those changes SHALL be limited to: `SidebarProvider` wiring, `ModeProvider` wiring, `Shell` composition, font declarations and `metadata` export. No other modifications to `layout.tsx` are permitted.
6. THE Shell rebuild SHALL preserve the `SidebarProvider` wrapping `ModeProvider` wrapping `Shell` nesting order as defined in the current `apps/web/src/app/layout.tsx`.
