# Design System Contract — Commander SDR

**Authority:** This is the complete build rulebook for all Commander SDR pages. Every rule documented here with exact Tabler classes and examples. This contract is binding for all future page work.

**Scope:** Universal design rules that apply to every page in all three application boundaries (Operational App, Tenant Admin, Commercial Control Plane).

---

## 1. Text Hierarchy

### Page Title
**Class:** `page-title`  
**Usage:** Main page heading, rendered by PageContainer  
**Example:**
```html
<h2 class="page-title">Case Management</h2>
```

### Breadcrumb / Pretitle
**Class:** `page-pretitle`  
**Usage:** Contextual path above page title, rendered by PageContainer  
**Example:**
```html
<div class="page-pretitle">Cases › Analytics</div>
```

### Card Title
**Class:** `card-title`  
**Usage:** Heading inside card-header  
**Example:**
```html
<div class="card-header">
  <h3 class="card-title">Priority Distribution</h3>
</div>
```

### Section Label
**Class:** `subheader`  
**Usage:** Section dividers, group labels  
**Example:**
```html
<div class="subheader">Operational Metrics</div>
```

### Body Text
**Class:** Default (no class needed)  
**Usage:** Standard paragraph and UI text  
**Colour:** `var(--tblr-body-color)` (inherited)  
**Example:**
```html
<p>This is standard body text.</p>
```

### Secondary Text
**Class:** `text-secondary`  
**Usage:** Supporting information, less prominent than body  
**Example:**
```html
<span class="text-secondary">Last updated 2 hours ago</span>
```

### Muted Text
**Class:** `text-muted`  
**Usage:** De-emphasized text, hints, placeholders  
**Example:**
```html
<span class="text-muted">No data available</span>
```

### Large Metric Value
**Class:** `h1` (or inline style for custom sizing)  
**Usage:** KPI values, dashboard metrics  
**Example:**
```html
<h1>87</h1>
<span class="h1">42</span>
```

### Font Rule
**CRITICAL:** Inter is inherited globally via `--tblr-font-sans-serif`. **NEVER override font-family per component.** JetBrains Mono is used ONLY for telemetry, IDs, hashes, and numeric values in Mission mode (via explicit class or inline style when needed).

---

## 2. Spacing & Padding

### Card Grids
**Classes:** `row row-deck row-cards`  
**Usage:** Equal-height card layouts  
**Example:**
```html
<div class="row row-deck row-cards">
  <div class="col-sm-6 col-lg-3">
    <div class="card">...</div>
  </div>
  <div class="col-sm-6 col-lg-3">
    <div class="card">...</div>
  </div>
</div>
```

### Standard Column Splits
**Classes:** `col-sm-6 col-lg-3`, `col-md-6 col-lg-4`, `col-12`, etc.  
**Usage:** Responsive grid columns  
**Example:**
```html
<div class="row">
  <div class="col-sm-6 col-lg-3">Quarter width on large</div>
  <div class="col-sm-6 col-lg-3">Quarter width on large</div>
  <div class="col-sm-6 col-lg-3">Quarter width on large</div>
  <div class="col-sm-6 col-lg-3">Quarter width on large</div>
</div>
```

### Card Internal Padding
**Class:** `card-body` (Tabler default padding)  
**Usage:** Content area inside cards  
**Rule:** Use Tabler's default padding. Do NOT override unless exceptional case documented in DECISIONS.md.

### Gap Conventions
- Between major sections: Use Tabler's default spacing utilities (`mb-3`, `mt-4`, etc.)
- Between cards in a grid: Handled automatically by `row row-deck row-cards`

### Page Content Container
**Component:** `PageContainer` (already built)  
**Usage:** ALL pages use PageContainer for consistent alignment  
**Rule:** See `.kiro/steering/page-layout-standard.md` for full details and exceptions

---

## 3. Cards

### Structure
**Pattern:**
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
    <div class="card-actions">
      <button class="btn btn-ghost-secondary">Action</button>
    </div>
  </div>
  <div class="card-body">
    Content goes here
  </div>
</div>
```

### Square Corners
**Rule:** `border-radius: 0` everywhere. Enforced globally in `globals.css`.  
**No exceptions.**

### Borders & Shadows
**Rule:** Use Tabler default border (`var(--tblr-border-color)`). No custom shadows unless specified in design mockup and documented in DECISIONS.md.

---

## 4. Buttons

### Primary Action
**Class:** `btn btn-primary`  
**Usage:** Main call-to-action  
**Example:**
```html
<button class="btn btn-primary">Create Case</button>
```

### Secondary Action
**Class:** `btn btn-ghost-secondary`  
**Usage:** Secondary actions, less prominent  
**Example:**
```html
<button class="btn btn-ghost-secondary">Cancel</button>
```

### Danger Action
**Class:** `btn btn-danger`  
**Usage:** Destructive actions (delete, remove, etc.)  
**Example:**
```html
<button class="btn btn-danger">Delete</button>
```

### Square Corners
**Rule:** All buttons have `border-radius: 0`. Enforced globally.

### Focus Shadow Ring
**Rule:** No focus shadow ring. Enforced globally in `globals.css`.

### Icon Buttons
**Rule:** Use Lucide icons via `getIcon()` helper (from existing icon map)  
**Example:**
```tsx
import { getIcon } from '@/components/icons';
const PlusIcon = getIcon('Plus');
<button class="btn btn-primary">
  <PlusIcon className="icon" />
  Add Item
</button>
```

---

## 5. Tables

### Base Table
**Class:** `table table-vcenter`  
**Usage:** Standard data tables with vertical-centered cells  
**Example:**
```html
<table class="table table-vcenter">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item 1</td>
      <td><span class="badge bg-green">Active</span></td>
    </tr>
  </tbody>
</table>
```

### Table Inside Card
**Class:** `table table-vcenter card-table`  
**Usage:** When table is direct child of card-body  
**Example:**
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Cases</h3>
  </div>
  <div class="card-body">
    <table class="table table-vcenter card-table">
      ...
    </table>
  </div>
</div>
```

### Hover Effect
**Class:** `table-hover`  
**Usage:** Add when rows are interactive/clickable  
**Example:**
```html
<table class="table table-vcenter table-hover">
  ...
</table>
```

---

## 6. Badges

### Status Badges (Vivid Semantic Colour)
**Classes:** `badge bg-red`, `badge bg-orange`, `badge bg-yellow`, `badge bg-green`, `badge bg-azure`, `badge bg-blue`, `badge bg-purple`  
**Usage:** Severity, status, health indicators  
**Mapping:**
- Critical / Breached / P0 → `bg-red`
- High / Warning / At Risk / P1 → `bg-orange`
- Healthy / Pass / Resolved / Favourable → `bg-green`
- Informational / Medium / P2 → `bg-azure`
- Low / P3 → `bg-secondary` (muted)

**Example:**
```html
<span class="badge bg-red">Critical</span>
<span class="badge bg-orange">High</span>
<span class="badge bg-green">Resolved</span>
<span class="badge bg-azure">Info</span>
```

### Label Badges (Neutral)
**Class:** `badge bg-secondary-lt`  
**Usage:** Non-semantic labels (SCAFFOLD, PLANNED, FUTURE, etc.)  
**Example:**
```html
<span class="badge bg-secondary-lt">SCAFFOLD</span>
<span class="badge bg-secondary-lt">PLANNED</span>
```

### Text Colour
**Rule:** White text on coloured backgrounds (Tabler default). Do NOT override.

---

## 7. Status Indicators

### Status Dot
**Class:** `status-dot`  
**Usage:** Small coloured indicator dot  
**Example:**
```html
<span class="status-dot status-dot-animated bg-green"></span> Online
<span class="status-dot bg-red"></span> Offline
```

### Animated Status Dot
**Class:** `status-dot status-dot-animated`  
**Usage:** For live/active states  
**Example:**
```html
<span class="status-dot status-dot-animated bg-green"></span> Live
```

---

## 8. Forms

### Form Control
**Class:** `form-control`  
**Usage:** Text inputs, textareas  
**Example:**
```html
<input type="text" class="form-control" placeholder="Enter value" />
```

### Form Label
**Class:** `form-label`  
**Usage:** Labels for form fields  
**Example:**
```html
<label class="form-label">Case Title</label>
<input type="text" class="form-control" />
```

### Form Select
**Class:** `form-select`  
**Usage:** Dropdown selects  
**Example:**
```html
<select class="form-select">
  <option>All</option>
  <option>Critical</option>
  <option>High</option>
</select>
```

### Square Corners
**Rule:** All form controls have `border-radius: 0`. Enforced globally.

---

## 9. Colour Rules

### VIVID SEMANTIC COLOUR (Data Only)

**Rule:** Use vivid colour ONLY for data elements that carry semantic meaning: severity, status, health, trend, charts, gauges, progress bars.

**Mapping:**
- **Critical / Breached / P0** → Red (`bg-red`, `--data-1`)
- **High / Warning / At Risk / P1** → Amber/Orange (`bg-orange`, `--data-6`)
- **Healthy / Pass / Resolved / Favourable** → Green (`bg-green`, `--data-2`)
- **Informational / Medium / P2** → Blue/Azure (`bg-azure`, `--data-3`)
- **Low / P3** → Grey/Muted (`bg-secondary`, `--data-8`)

**Chart Colours:** Use DS-1.0 §13 semantic `--data-*` tokens. NO literal hex values in chart specifications.

### RESTRAINED CHROME (Neutral)

**Rule:** Sidebar, header, cards, borders, body text stay Tabler default neutral. No colour on furniture.

**Elements:**
- Sidebar background
- Top bar background
- Card backgrounds
- Card borders
- Body text
- Section dividers

**Colour:** Tabler defaults only. Do NOT add colour to chrome.

### Gold Restriction

**Rule:** Gold (`#D4AF37` or `--tblr-gold`) appears ONLY in the COMMANDER logo wordmark. Nowhere else.

**Forbidden:** Gold buttons, gold badges, gold borders, gold text (except logo).

### Colour Carries Meaning

**Rule:** Colour must carry semantic meaning. Never colour for decoration.

**Example:**
- ✅ Red badge for "Critical" severity
- ✅ Green progress bar for "Healthy" status
- ❌ Blue card border for visual variety
- ❌ Purple button because it looks nice

---

## 10. Square Corners Rule

**Rule:** `border-radius: 0` everywhere. No exceptions.

**Applies to:**
- Cards
- Buttons
- Inputs
- Badges
- Dropdowns
- Charts
- Modals
- Popovers
- Any UI element with a border

**Enforcement:** Global CSS override in `apps/web/src/app/globals.css`.

---

## 11. Mode Support

### Light and Dark Mode
**Rule:** All rules work in both light and dark mode via Tabler's `data-bs-theme` attribute.

**Implementation:**
- Tabler handles mode switching automatically
- Use Tabler CSS variables (e.g., `var(--tblr-body-color)`, `var(--tblr-border-color)`)
- Do NOT hardcode colours that break in one mode

### Sidebar Mode
**Rule:** Sidebar is ALWAYS dark, regardless of page mode.

**Implementation:** Sidebar has `data-bs-theme="dark"` attribute.

---

## Usage

This contract is the single reference for all future page work. When building a page:

1. Use PageContainer for layout
2. Follow text hierarchy classes
3. Use row row-deck row-cards for card grids
4. Use Tabler card structure
5. Use btn variants for buttons
6. Use badge bg-* for status
7. Use table table-vcenter for tables
8. Apply vivid semantic colour to data only
9. Keep chrome restrained and neutral
10. Enforce square corners everywhere
11. Ensure light/dark mode compatibility

**Primitives:** Use the universal primitive components in `apps/web/src/components/primitives/` to encode these rules in reusable code.

**Exceptions:** Any deviation from this contract requires a decision record in `DECISIONS.md`.
