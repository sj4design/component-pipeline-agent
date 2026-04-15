---
component: grid
compiled: 2026-03-31
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Grid — All Systems Digest

## Material Design 3
**Approach**: Layout grid defines the overall page structure using columns, gutters, and margins that adapt across four breakpoints (compact/medium/expanded/large). Not a standalone component — it is a system-level layout contract. Columns scale from 4 (compact) to 12 (expanded), with fixed margins and fluid gutters. Material emphasizes a "body region" model where content panes occupy column spans within the grid.
**Key decisions**:
- Four breakpoint tiers (compact 0-599, medium 600-839, expanded 840-1199, large 1200+) with column counts of 4/8/12/12 — this matches the physical screen classes of phones, foldables, tablets, and desktops; fewer columns on small screens prevents content from becoming unreadably narrow
- Grid is a layout contract, not a component; Android Compose and Flutter use their own layout primitives (Row/Column/Box with weight modifiers) that natively express the same column math — wrapping a CSS-style grid component around native layout would fight platform idioms
- Margin and gutter values are fixed per breakpoint (not fluid); predictable whitespace at each breakpoint avoids the "slightly-off" spacing that occurs when margins scale proportionally on intermediate viewport widths
**Notable API**: No component API — implemented via platform layout primitives; CSS reference uses 12-column `grid-template-columns` with `var(--md-sys-layout-margin)` and `var(--md-sys-layout-gutter)` tokens
**A11y**: Grid is purely visual layout; no ARIA roles. Content order in DOM must match visual reading order. Landmark roles (`main`, `nav`, `aside`) applied to grid regions, not the grid itself.
**Best at**: Cross-platform layout contract — the only Tier 1 system that formally defines grid behavior across mobile, foldable, tablet, and desktop with platform-native implementations. **Missing**: No reusable grid component; every team must translate the spec into their platform's layout system.

## Spectrum (Adobe)
**Approach**: Provides a responsive Grid component built on CSS Grid. Uses a 12-column system with explicit `areas` prop for named grid template areas. Designed for application-level page layout (sidebars, toolbars, content areas) rather than content-level card grids. Spectrum's Grid works alongside Flex — Grid for 2D page layout, Flex for 1D component layout.
**Key decisions**:
- Named grid areas as the primary layout mechanism; Adobe applications have complex, stable page layouts (sidebar + toolbar + canvas + properties panel) — named areas make these layouts declarative and readable rather than relying on column span math
- Responsive props via breakpoint objects (`columns={{base: '1fr', M: '1fr 3fr'}}`); every Spectrum component accepts responsive prop objects at the same breakpoints — Grid's responsive API is consistent with the entire system, not a one-off
- Separate Grid and Flex components with clear guidance: Grid for 2D page structure, Flex for 1D alignment — prevents the common mistake of using CSS Grid for simple horizontal alignment where Flexbox is simpler
**Notable API**: `areas` (named grid template areas); `columns`/`rows` (track definitions, responsive); `gap`/`columnGap`/`rowGap`; `justifyContent`/`alignContent`/`alignItems`; `autoFlow`; `autoRows`/`autoColumns`
**A11y**: Grid is a layout primitive with no implicit ARIA semantics. DOM order must match visual order for screen reader coherence. Grid areas that represent landmarks should use appropriate landmark elements inside them.
**Best at**: Named grid areas as first-class API — most ergonomic approach for defining complex application layouts declaratively. **Missing**: No auto-fit/auto-fill card grid pattern; teams must use raw CSS Grid values in the `columns` prop.

## Carbon (IBM)
**Approach**: Traditional 12-column grid with explicit Grid > Row > Column component hierarchy. Provides three grid modes: Wide (32px gutter), Narrow (16px gutter, content flush to column edge), and Condensed (1px gutter for data-dense UIs). Subgrid support allows nested grids to align to the parent's column lines. The 2x Grid system (all spacing based on multiples of 8px/16px) is a foundational design principle.
**Key decisions**:
- Three gutter modes (Wide/Narrow/Condensed) as a first-class choice; enterprise applications range from marketing pages (generous whitespace) to dense data dashboards (minimal spacing) — one gutter size forces awkward compromises; explicit modes make the tradeoff intentional
- Grid > Row > Column hierarchy (not CSS Grid direct); Carbon predates widespread CSS Grid adoption and maintains backward compatibility — the component abstraction also enforces correct nesting patterns that raw CSS Grid does not
- Subgrid as a supported pattern; IBM products frequently nest forms inside dashboard panels inside page layouts — without subgrid, nested content drifts off the parent column lines creating misalignment that compounds at each nesting level
**Notable API**: `<Grid>` (container, accepts `narrow`/`condensed`/`fullWidth`); `<Row>` (flex row); `<Column>` (accepts `sm`/`md`/`lg`/`xlg`/`max` for responsive column spans + offsets); CSS Grid variant available
**A11y**: No ARIA roles on grid elements. Semantic structure via landmarks and headings within columns. Column reordering via CSS must not break logical reading order — Carbon documents this as a requirement.
**Best at**: Gutter mode system (Wide/Narrow/Condensed) — most intentional treatment of information density at the grid level. **Missing**: No auto-fit/auto-fill for dynamic card layouts; grid is strictly column-count based.

## Polaris (Shopify)
**Approach**: Provides `Columns` (equal-width column grid) and `Grid` (CSS Grid wrapper with cell-level control) as separate components. Columns handles the 80% case of evenly-distributed content; Grid handles complex asymmetric layouts. Both are responsive via breakpoint props. Designed for merchant admin layouts where content density varies between mobile POS and desktop dashboards.
**Key decisions**:
- Two separate components (Columns and Grid) instead of one; the vast majority of Shopify admin layouts are simple equal-width columns (product cards, settings sections) — a full Grid API for these cases is unnecessary complexity; Columns makes the common case trivial
- `Columns` uses a count-based API (`columns={{xs: 1, md: 2, lg: 3}}`); merchants manage their admin on devices ranging from retail POS tablets to desktop monitors — the column count per breakpoint is the most intuitive mental model for responsive layout
- `Grid.Cell` with `columnSpan` for asymmetric layouts; complex pages (analytics dashboards, order detail) need cells that span different column counts — Cell-level control avoids the Row > Column nesting that adds unnecessary DOM depth
**Notable API**: `Columns`: `columns` (responsive count object), `gap` (token-based spacing); `Grid`: `columns`/`rows` (track definitions), `gap`; `Grid.Cell`: `columnSpan` (responsive object), `rowSpan`
**A11y**: No ARIA roles on layout components. Columns/Grid do not affect tab order. Responsive column reordering is discouraged — content order should match DOM order for screen reader users.
**Best at**: Dual-component strategy (Columns + Grid) that separates the simple common case from the complex — reduces API surface for 80% of layouts. **Missing**: No named grid areas; no gutter mode system; no subgrid support.

## Atlassian
**Approach**: Provides a responsive Grid component (part of the Design System primitives) with a traditional 12-column system. Uses `Grid` container with `Grid.Item` children. Breakpoint-responsive via `xxs`/`xs`/`sm`/`md`/`lg`/`xl` props on Grid.Item for column spans. Focused on Jira/Confluence page layouts — sidebar + main content patterns.
**Key decisions**:
- 12-column grid with Grid.Item span props per breakpoint; Atlassian products have relatively consistent page structures (navigation + sidebar + content) — a 12-column system provides enough granularity for these layouts without the complexity of CSS Grid template areas
- Token-based gap spacing (using Atlassian spacing tokens); all Atlassian components use the same spacing scale — grid gaps align with component internal spacing for visual consistency
- No Row component; Grid.Item wraps automatically; this simplifies the API compared to Grid > Row > Column systems — fewer nesting levels and the grid handles line wrapping automatically
**Notable API**: `<Grid>` (container, `maxWidth`, `gap`); `<Grid.Item>` (responsive column spans via `xxs`/`xs`/`sm`/`md`/`lg`/`xl` props); `testId` for integration testing
**A11y**: Grid is a purely visual layout component with no ARIA semantics. Content within grid items uses standard heading hierarchy and landmark roles. No visual reordering support — DOM order is always the visual order.
**Best at**: Simple flat Grid > Grid.Item model without Row nesting — cleanest API for standard page layouts. **Missing**: No named areas, no gutter modes, no subgrid, no auto-fit/auto-fill patterns.

## Ant Design
**Approach**: Traditional 12/24-column grid with Row + Col component hierarchy, heavily inspired by Bootstrap's grid. Uses a 24-column system by default (more granular than 12). Row handles gutters and alignment; Col handles span, offset, push/pull for reordering. `Flex` component added separately for simpler 1D layouts. Responsive via breakpoint props on Col (`xs`/`sm`/`md`/`lg`/`xl`/`xxl`).
**Key decisions**:
- 24-column system instead of 12; Chinese enterprise applications frequently need asymmetric layouts (form labels, data tables, sidebars) that require finer granularity — 24 columns allow 1/3, 1/4, 1/6, 1/8 splits without fractional values
- Row `gutter` prop accepts `[horizontal, vertical]` array; enterprise forms and dashboards need different horizontal and vertical spacing — a single gutter value forces equal spacing in both directions, which rarely matches the visual intent
- Push/pull props for visual reordering without changing DOM order; enterprise dashboards sometimes need to reorder content for visual hierarchy (KPI card first on desktop, sidebar first on mobile) while maintaining a logical DOM order for accessibility
**Notable API**: `<Row>` (`gutter` as number/array/responsive object, `align`, `justify`, `wrap`); `<Col>` (`span`, `offset`, `push`, `pull`, `order`, `flex` + responsive breakpoint objects for each); `useBreakpoint()` hook
**A11y**: No implicit ARIA roles on Row/Col. Push/pull reordering can create a mismatch between visual and DOM order — Ant documents this risk but does not prevent it. `useBreakpoint()` hook enables programmatic responsive behavior beyond layout.
**Best at**: 24-column granularity with push/pull reordering and array gutters — most flexible traditional grid system for complex enterprise form and dashboard layouts. **Missing**: No CSS Grid mode; no named areas; no subgrid; no auto-fit/auto-fill; the Row > Col model is fundamentally flexbox-based.
