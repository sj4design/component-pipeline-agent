---
component: Grid
tier: 3
last_verified: 2026-03-31
---

# Grid — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Grid | CSS Grid wrapper with `columns`, `rows`, `gap`, `flow`, `align`, `justify` props; responsive via breakpoint objects; minimal abstraction over native CSS Grid. | high |
| Chakra UI | Grid / SimpleGrid | Two components: Grid (full CSS Grid control) and SimpleGrid (auto-responsive equal columns via `minChildWidth` or `columns`); responsive props via breakpoint objects. | high |
| GOV.UK | Grid row / Grid column | Traditional 12-column grid with `govuk-grid-row` + `govuk-grid-column-*` CSS classes; fixed breakpoints (mobile/tablet/desktop); content-first responsive approach. | high |
| Base Web (Uber) | FlexGrid / FlexGridItem | Flexbox-based responsive grid; 12-column system; `flexGridColumnCount` on container; `flexGridItemIndex`/`overrides` for per-cell control; no CSS Grid mode. | high |
| Fluent 2 (Microsoft) | Not available — use CSS utilities | No Grid layout component in Fluent 2 React; layout achieved via CSS Grid/Flexbox utilities or Fluent's `makeStyles`; Stack component for 1D layouts only. | high |
| Gestalt (Pinterest) | Masonry / Module | No traditional grid; Masonry component for Pinterest's variable-height card layout; items positioned absolutely with dynamic height calculation; purpose-built for pin layouts. | high |
| Mantine | Grid / Grid.Col / SimpleGrid | 12-column Grid with Grid.Col (responsive span/offset/order); SimpleGrid for equal-width auto-responsive columns via `cols` + `breakpoints`; `grow` prop fills remaining space. | high |
| Orbit (Kiwi.com) | Grid / LayoutColumn | Responsive grid for travel booking layouts; desktop/tablet/mobile column definitions; `mediumMobile`/`largeMobile`/`tablet`/`desktop`/`largeDesktop` breakpoint props. | medium |
| Evergreen (Segment) | No Grid component | No dedicated grid; layout via `Pane` with `display="grid"` and inline CSS Grid properties; analytics dashboard layouts composed from primitives. | medium |
| Nord (Nordhealth) | nord-stack / Layout | No formal grid component; `nord-stack` handles 1D layout; page-level layouts use CSS Grid directly in application code; healthcare dashboard patterns documented as recipes. | low |

## Key Decision Patterns

The Tier 3 grid landscape splits into three clear philosophies: dedicated Grid components (Radix, Chakra, Mantine, Base Web, GOV.UK, Orbit), dual simple/complex components (Chakra SimpleGrid + Grid, Mantine SimpleGrid + Grid), and no grid component at all (Fluent 2, Evergreen, Nord). The "no component" camp is growing — Fluent 2's omission is notable given Microsoft's scale; the position is that CSS Grid is expressive enough that a component wrapper adds overhead without adding value.

Chakra's `SimpleGrid` with `minChildWidth` is the standout pattern for auto-responsive card grids. Instead of specifying column counts per breakpoint, you specify the minimum width of each child — the grid automatically calculates how many columns fit. This eliminates the breakpoint-by-breakpoint column count specification that every other system requires. Mantine's SimpleGrid takes a similar but different approach: you specify `cols` (default column count) plus `breakpoints` that override column count at specific widths.

Gestalt's Masonry component is architecturally unique — it is not a grid at all but a layout engine that absolutely positions variable-height items in columns, recalculating on resize. This is purpose-built for Pinterest's pin layout where items have unknown heights. No other Tier 3 system attempts this pattern; it represents a fundamentally different layout model than column-span grids.

GOV.UK's grid is the most conservative: pure CSS classes, no JavaScript, no component abstraction, fixed column fractions (one-quarter, one-third, two-thirds, one-half, full). This reflects the government mandate for progressive enhancement — the grid works without JavaScript, without a framework, and degrades gracefully on legacy browsers.

Base Web's FlexGrid is the only Tier 3 system still using Flexbox as its grid foundation (rather than CSS Grid). This reflects Uber's need for broad browser support across global markets where older mobile browsers are common.

## A11y Consensus

- Grid layout components are purely visual and carry no ARIA semantics — no `role="grid"` (which is reserved for interactive data grids, not layout grids).
- Content within grid cells relies on heading hierarchy and landmark roles for screen reader navigation — the grid itself is invisible to assistive technology.
- Responsive column reordering (via `order` prop or CSS `order`) must not cause DOM order and visual order to diverge — WCAG 1.3.2 requires meaningful sequence; GOV.UK explicitly prohibits visual reordering.
- Masonry layouts (Gestalt) where items are absolutely positioned must ensure focus order follows a logical reading sequence, not the DOM insertion order dictated by the layout algorithm.
- Auto-responsive grids (SimpleGrid patterns) that change column count at breakpoints do not introduce a11y issues as long as content order remains stable.

## Recommended Use

Reference Chakra SimpleGrid's `minChildWidth` for auto-responsive card grids that avoid manual breakpoint column counts. Use Mantine Grid for a full-featured 12-column system with grow, offset, and order control. Use Radix Grid for a minimal CSS Grid wrapper in headless UI contexts. Reference GOV.UK's grid for progressive-enhancement-first layouts that must work without JavaScript. Reference Gestalt Masonry only for variable-height card layouts (Pinterest-style); it is not a general-purpose grid. Avoid wrapping CSS Grid in a component if the system already provides `makeStyles` or utility-class patterns (Fluent 2, Evergreen, Nord approach).
