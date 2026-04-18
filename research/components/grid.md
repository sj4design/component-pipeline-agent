# Grid — Research
**Date:** 2026-04-17 | **Mode:** Max | **Systems:** 24 | **Scope:** All patterns

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | Layout grid is a system-level contract, not a component; platform-native layout primitives are the implementation | CSS `grid-template-columns` with `--md-sys-layout-*` tokens |
| shadcn/ui | Explicit choice not to abstract CSS Grid; Tailwind `grid-cols-*` utilities provide sufficient expressiveness | Tailwind CSS grid utilities (grid-cols-*, gap-*) |
| Fluent 2 | CSS Grid and Flexbox are expressive enough; component wrapper adds overhead without value | `makeStyles` CSS-in-JS with CSS Grid; Stack for 1D |
| Evergreen | Layout via `Pane` with `display="grid"` and inline CSS Grid props | `Pane display="grid"` composition |
| Nord | No formal grid component; page-level layouts use CSS Grid directly | `nord-stack` for 1D; CSS Grid for 2D page layouts |
| GitHub Primer | No Grid component; uses CSS utility classes and PageLayout component | Box display="grid" + PageLayout for sidebar+content |

**Systems WITH dedicated Grid component:** M3 (spec), Spectrum Grid, Carbon Grid/Row/Column, Polaris Columns+Grid, Atlassian Grid/Grid.Item, Ant Design Row/Col, Twilio Paste Grid/Column, Salesforce Lightning layout/layout-item, Playbook Layout, REI Cedar CdrGrid/CdrRow/CdrCol, Wise Design Grid, Dell Grid/Row/Col, Radix UI Grid, Chakra UI Grid+SimpleGrid, GOV.UK grid-row/grid-column, Base Web FlexGrid, Gestalt Masonry/Module, Mantine Grid+SimpleGrid, Orbit Grid/LayoutColumn — 19 of 24

---

## How Systems Solve It

### Carbon Grid — "Three gutter modes (Wide/Narrow/Condensed) as a first-class design decision"

Carbon's 12-column Grid is built around the 2x Grid system (all spacing based on multiples of 8px/16px) and provides three explicit gutter modes: Wide (32px), Narrow (16px, content flush to column edge), and Condensed (1px, for data-dense dashboards). These are first-class named variants, not arbitrary numbers — teams must intentionally choose the information density of their layout.

The Grid > Row > Column hierarchy predates widespread CSS Grid adoption and maintains backward compatibility while enforcing correct nesting patterns. Subgrid support allows nested grids to align to parent column lines — critical for IBM products that frequently nest forms inside panels inside page layouts.

**Design Decisions:**
- **Three gutter modes (Wide/Narrow/Condensed)** → Why: enterprise applications range from marketing pages (generous whitespace) to dense data dashboards (minimal spacing); one gutter size forces awkward compromises → Impact: HIGH → Para tu caso: expose gutter modes as named design decisions, not arbitrary spacing values; help teams choose intentionally
- **Subgrid support** → Why: without subgrid, nested content drifts off parent column lines at each nesting level — visual misalignment that compounds across deep component trees → Impact: MED → Para tu caso: support subgrid for design systems with deeply nested component hierarchies; especially important for form layouts nested inside panels
- **CSS Grid variant available alongside Row/Column** → Why: modern teams prefer CSS Grid syntax; backward compatibility maintained for existing codebases → Impact: LOW → Para tu caso: provide both Row/Column and CSS Grid modes if your system has legacy and modern consumers

**Notable API:** `<Grid>` (container, `narrow`/`condensed`/`fullWidth`); `<Row>`; `<Column>` (`sm`/`md`/`lg`/`xlg`/`max` responsive spans + offsets); CSS Grid variant

**Accessibility:** No ARIA roles on grid elements; column reordering via CSS must not break logical reading order (Carbon documents this as a requirement)

---

### Spectrum Grid — "Named grid areas as primary layout mechanism for 2D application layout"

Spectrum's Grid uses CSS Grid with the `areas` prop for named template areas — making complex application layouts (sidebar + toolbar + canvas + properties panel) declarative and readable rather than relying on column span math. Every Spectrum component accepts responsive prop objects at the same breakpoints, so Grid's responsive API is consistent with the entire system. Spectrum provides explicit guidance on the Grid vs. Flex choice: Grid for 2D page structure, Flex for 1D component alignment.

**Design Decisions:**
- **Named grid areas as primary API** → Why: Adobe applications have complex but stable page layouts; named areas make layouts readable ("sidebar" is clearer than `grid-column: 1 / 2; grid-row: 1 / 3`) → Impact: HIGH → Para tu caso: expose `areas` prop for complex application layouts; it's the most readable API for 2D layout
- **Separate Grid and Flex** → Why: prevents the common antipattern of using CSS Grid for simple horizontal alignment where Flexbox is simpler and more semantically appropriate → Impact: MED → Para tu caso: provide distinct Grid (2D) and Flex/Stack (1D) components with clear guidance on when to use each

---

### Ant Design Row/Col — "24-column granularity with push/pull reordering and array gutters"

Ant Design uses 24 columns (vs. the universal 12) — more granular for Chinese enterprise applications that frequently need 1/3, 1/4, 1/6, 1/8 splits without fractional values. Row's `gutter` prop accepts `[horizontal, vertical]` arrays for independent horizontal and vertical spacing. `push`/`pull` props enable visual reordering without changing DOM order. The `useBreakpoint()` hook enables programmatic breakpoint detection.

---

### Polaris Columns + Grid — "Dual-component strategy separating common case from complex case"

Polaris provides two separate components: `Columns` for the 80% case of evenly-distributed content (count-based API: `{xs: 1, md: 2, lg: 3}`) and `Grid` for complex asymmetric layouts (CSS Grid with `Grid.Cell` + `columnSpan`). The vast majority of Shopify admin layouts are simple equal-width columns — a full Grid API for these cases would be unnecessary complexity. `Columns` makes the common case trivial while `Grid` handles analytics dashboards and complex detail pages.

---

### Chakra UI Grid + SimpleGrid — "SimpleGrid's `minChildWidth` for auto-responsive card grids"

Chakra provides two grid components: `Grid` (full CSS Grid control) and `SimpleGrid` (auto-responsive equal columns). `SimpleGrid`'s `minChildWidth` is the standout pattern — instead of specifying column counts per breakpoint, you specify the minimum width of each child; the grid automatically calculates how many columns fit. This eliminates the breakpoint-by-breakpoint column count specification that every other system requires.

**Design Decisions:**
- **`minChildWidth` on SimpleGrid** → Why: designers think "I want cards to be at least 300px wide, and I want as many as will fit" — this is the mental model, and `minChildWidth` expresses it directly → Impact: HIGH → Para tu caso: implement `minChildWidth` (or equivalent auto-fill pattern) for card grid layouts; it's more intuitive than specifying column counts at every breakpoint

---

### Mantine Grid — "12-column with grow, offset, and order control"

Mantine's Grid provides 12-column layout with `Grid.Col` supporting responsive span/offset/order. `SimpleGrid` provides equal-width auto-responsive columns via `cols` + `breakpoints`. The `grow` prop fills remaining space. Mantine's implementation is complete and well-documented — a reliable reference for a 12-column grid with all standard features.

---

### Gestalt Masonry — "Variable-height Pinterest-style card layout (not a grid)"

Gestalt's Masonry is architecturally unique — it is not a grid at all but a layout engine that absolutely positions variable-height items in columns, recalculating positions on resize. Purpose-built for Pinterest's pin layout where items have unknown heights. No other system attempts this pattern. It represents a fundamentally different layout model than column-span grids and should only be considered for variable-height card layouts.

---

### GOV.UK grid-row/grid-column — "Progressive enhancement: pure CSS, no JavaScript, no component abstraction"

GOV.UK's grid is the most conservative: pure CSS classes, no JavaScript, no framework abstraction, fixed column fractions (one-quarter/one-third/two-thirds/one-half/full-width). This reflects the government mandate for progressive enhancement — the grid works without JavaScript on legacy browsers. Visual reordering is explicitly prohibited (GOV.UK mandates that content order matches DOM order).

---

## Pipeline Hints

**Archetype recommendation:** container (layout primitive)
Rationale: Grid is a layout container component that positions child items in a column-based structure. It has no interactive states and carries no semantic ARIA role. Its job is purely visual layout.

**Slot consensus:** (19/24 systems with grid component)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| children / cells | container | yes | 19/19 | The items positioned in the grid |
| column (Col/Item) | container | yes | 14/19 | Individual grid cell with span/offset/order props |
| row (Row) | container | no | 10/19 | Row wrapper in hierarchical Grid>Row>Col systems; not needed in flat Grid>Col models |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Columns | variant | 1–12 (or 1–24 for Ant) | 17/19 | 12-column is universal; Ant Design uses 24 |
| Gap / Gutter | variant | token-based spacing | 15/19 | Horizontal and/or vertical gutter between columns |
| Responsive spans | variant | breakpoint objects | 17/19 | xs/sm/md/lg/xl per Col item |
| Orientation | variant | row/column | 5/19 | Flow direction; most systems default to row |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isFullWidth | 8/19 | false | Grid container spans full viewport width |
| isCondensed | 3/19 | false | Carbon condensed gutter mode |
| isNarrow | 3/19 | false | Carbon narrow gutter mode |
| hasSubgrid | 3/19 | false | Nested grid aligns to parent column lines |
| wrap | 8/19 | true | Columns wrap to next row when they exceed total span |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 19/19 | columns laid out horizontally | |
| mobile (xs) | 17/19 | stacked 1-column layout | responsive breakpoint behavior |
| tablet (md) | 17/19 | 2-column or configured layout | responsive breakpoint behavior |
| desktop (lg) | 17/19 | full-column-count layout | responsive breakpoint behavior |

**Exclusion patterns found:**
- Grid layout components have no interactive states; all "states" are responsive breakpoint changes

**Building block candidates:**
- row → `Row` — 10/19 systems have explicit Row wrapper (Carbon, Ant Design, Cedar, Dell)
- column → `Col`/`Grid.Item`/`Column` — 17/19 have individual column components with span props

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| columns | 1–12 / 1–24 | 17/19 | total column count; 12 is universal default |
| gutter | token scale / [horizontal, vertical] | 15/19 | Ant Design array gutter for independent H/V; others single value |
| gutterMode | wide/narrow/condensed | 3/19 | Carbon named density modes |

**A11y consensus:**
- Grid layout components carry NO ARIA semantics — do NOT use `role="grid"` (that is reserved for interactive data grids)
- Content within grid cells uses standard heading hierarchy and landmark roles (`<main>`, `<nav>`, `<aside>`)
- DOM source order MUST match visual reading order — CSS reordering (order, push/pull) that creates DOM/visual mismatch violates WCAG 1.3.2 (Meaningful Sequence)
- GOV.UK explicitly prohibits visual reordering — the grid's column layout should never reverse content sequence
- Responsive layouts that change column count at breakpoints do not introduce a11y issues as long as content order remains stable
- Masonry/absolute-position layouts: focus order must follow logical reading sequence, not DOM insertion order dictated by layout algorithm

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template | Same component set |
| 40–70% | Extension | `layoutType` prop |
| < 40% | Separate component | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| 12-column standard grid | 100% | Template | Default column count | Carbon, Atlassian, Paste, Cedar |
| 24-column grid | 90% | Template | `columns=24`; finer granularity | Ant Design |
| CSS Grid wrapper | 85% | Template | Exposes CSS Grid properties directly | Radix, Spectrum, Polaris Grid |
| Auto-responsive (SimpleGrid) | 70% | Template | `minChildWidth` or `cols` + auto | Chakra SimpleGrid, Mantine SimpleGrid |
| Named areas grid | 70% | Template | `areas` prop for template area names | Spectrum |
| Equal-columns shorthand | 80% | Template | Count-based API without span math | Polaris Columns |
| Masonry layout | 20% | Separate component | Variable-height absolute positioning | Gestalt Masonry |
| Page layout | 30% | Separate component | Semantic sidebar+content+footer structure | Primer PageLayout, Orbit LayoutColumn |

---

## What Everyone Agrees On

1. **12 columns is the universal standard**: Every system that provides a grid uses 12 columns (or 24, a superset). The 12-column system provides sufficient granularity for common page layouts — 1/2, 1/3, 2/3, 1/4, 3/4 splits all work with whole numbers.

2. **Grid carries no ARIA semantics**: Grid layout components are purely visual. No `role="grid"` (reserved for data grids), no `role="region"`, no `aria-label`. Landmarks go inside grid cells, not on the grid itself.

3. **DOM order must match visual order**: WCAG 1.3.2 requires meaningful sequence. GOV.UK explicitly prohibits visual reordering. CSS `order` property and push/pull are documented risks in every system.

4. **Responsive breakpoint objects are the standard API**: `columns={{xs: 1, md: 2, lg: 3}}` or equivalent — every system uses this pattern for per-breakpoint column configuration.

5. **Grid vs. Flex are different tools**: Spectrum, Polaris, and Fluent 2 all provide explicit guidance: Grid for 2D layouts; Flex/Stack for 1D layouts. Using Grid for simple horizontal alignment is an antipattern documented by multiple systems.

---

## Where They Disagree

**"¿12 columns or 24 columns?"**
→ 12 (universal): sufficient for most layouts; simpler mental model → 24 (Ant Design): finer granularity for 1/3, 1/4, 1/6, 1/8 splits without fractions; needed for dense Chinese enterprise layouts
→ Para tu caso: 12 columns for general-purpose systems; 24 if your product has dense multi-column form layouts or dashboards requiring irregular column splits

**"¿Grid > Row > Col hierarchy or flat Grid > Col?"**
→ Hierarchical (Carbon, Ant Design, Cedar): explicit row structure; matches mental model of "rows of columns" → Flat (Atlassian, Polaris, Paste): simpler; grid handles row wrapping automatically; fewer nesting levels
→ Para tu caso: flat Grid > Col is the modern approach; Row wrappers are a legacy pattern from before CSS Grid

**"¿Named areas or column spans?"**
→ Named areas (Spectrum): more readable for complex stable layouts; `"sidebar main"` vs. `grid-column: 1 / 2` → Column spans (everyone else): more flexible; works for any layout without pre-defining area names; familiar to most developers
→ Para tu caso: expose both; named areas for complex application layouts; column spans for responsive card grids

**"¿Auto-responsive `minChildWidth` or explicit column counts?"**
→ Auto-responsive (Chakra SimpleGrid `minChildWidth`): "I want cards to be at least 300px wide" — mental model match; no breakpoint specification → Explicit counts (most systems): more predictable; designer has exact control; easier to document
→ Para tu caso: both; expose `minChildWidth` for card grid use cases and explicit breakpoint columns for page layout use cases

**"¿Component or CSS utilities?"**
→ Component (Carbon, Polaris, Mantine): enforces consistent gutters, column counts, responsive behavior → CSS utilities (shadcn/ui Tailwind, Fluent 2 makeStyles, GOV.UK classes): maximum flexibility; no component overhead; progressive enhancement compatible
→ Para tu caso: component for design systems that need enforced tokens and consistent gutters; utilities for systems that prefer composition over abstraction

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| 12-column responsive | Page structure adapts from 1-column (mobile) to 12 (desktop) | Standard page layouts | Most systems |
| Equal-width columns | All columns identical width; count changes per breakpoint | Card grids, settings rows | Polaris Columns, Chakra SimpleGrid |
| Named areas | CSS Grid template areas for complex application layouts | App shells: sidebar+toolbar+content+panel | Spectrum |
| Auto-fill/minChildWidth | Minimum child width determines column count | Product card grids, gallery grids | Chakra SimpleGrid |
| Masonry | Variable-height items absolutely positioned in columns | Pinterest-style image/content boards | Gestalt |
| Three gutter modes | Wide/Narrow/Condensed for density control | Enterprise dashboard vs. admin vs. data table | Carbon |

**Wireframe — 12-column page structure (3-column desktop):**
```
┌──────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────┐   │
│  │                   Header / Nav                   │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌─────────┐  ┌──────────────────────┐  ┌─────────┐   │
│  │         │  │                      │  │         │   │
│  │ Sidebar │  │   Main Content       │  │  Panel  │   │
│  │  (3/12) │  │       (6/12)         │  │  (3/12) │   │
│  │         │  │                      │  │         │   │
│  └─────────┘  └──────────────────────┘  └─────────┘   │
└──────────────────────────────────────────────────────────┘
```

**Wireframe — auto-responsive card grid (SimpleGrid / minChildWidth=300px):**
```
Large viewport (3 cols):     Mobile (1 col):
┌─────┐ ┌─────┐ ┌─────┐    ┌───────────┐
│     │ │     │ │     │    │           │
│Card │ │Card │ │Card │    │   Card    │
└─────┘ └─────┘ └─────┘    └───────────┘
┌─────┐ ┌─────┐ ┌─────┐    ┌───────────┐
│     │ │     │ │     │    │           │
│Card │ │Card │ │Card │    │   Card    │
└─────┘ └─────┘ └─────┘    └───────────┘
```

---

## Risks to Consider

**CSS `order` + screen reader reading order mismatch** (HIGH) — the most serious grid a11y issue; visual order and DOM order diverge when using CSS order/push/pull; screen reader users navigate in DOM order while sighted users follow visual order; mitigation: never use CSS order for content reordering; if content must appear in different visual order at breakpoints, change DOM order too (not just CSS order)

**Masonry layout focus order** (MEDIUM) — absolutely positioned items in masonry layouts are in DOM insertion order (oldest first), which may not match visual column order; mitigation: do not use masonry for content where reading sequence matters; masonry is appropriate only for browsing contexts (image galleries) not reading contexts (articles, forms)

**Naming collision with role="grid" (data grid)** (LOW) — calling your layout component "Grid" creates confusion with the ARIA role="grid" used by data tables; both teams and screen reader users may misinterpret the component's purpose; mitigation: document clearly that layout Grid components have no role="grid" ARIA semantics; add explicit commentary in documentation

---

## Dimension Scores

| Dimension | Carbon | Spectrum | Ant Design | Polaris | Chakra | Mantine |
|-----------|--------|----------|-----------|---------|--------|---------|
| Feature coverage | 4/5 | 4/5 | 5/5 | 4/5 | 5/5 | 4/5 |
| API ergonomics | 3/5 | 5/5 | 3/5 | 5/5 | 5/5 | 5/5 |
| Documentation | 5/5 | 5/5 | 4/5 | 5/5 | 4/5 | 5/5 |
| Token integration | 5/5 | 5/5 | 4/5 | 5/5 | 4/5 | 5/5 |

---

## Next Steps

```
/spec grid      → outputs/grid-config.json
/enrich grid    → a11y tokens + interaction spec
/build grid     → full pipeline in one command
/build grid --max  → use pre-generated config
```
