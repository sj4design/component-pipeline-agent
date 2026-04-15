---
component: container
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — layout guidance via grid and scaffold
**Approach:** M3 has no dedicated Container component. Layout containment is handled by the Scaffold composable in Jetpack Compose (providing top-level content padding and slot structure) and by the responsive grid system with 4/8/12 column breakpoints. Content max-width is controlled by the grid column count and margin tokens, not by a reusable wrapper component. M3's `contentPadding` parameter on Scaffold and LazyColumn provides horizontal gutter behavior.
**Key Decisions:**
- [HIGH] Grid-based containment: responsive layout is governed by column count (compact=4, medium=8, expanded=12) and fixed margins — not a max-width wrapper
- [MED] Scaffold as top-level wrapper: provides content area padding, app bar slots, and FAB positioning — the closest analog to a page container
- [MED] Canonical margins per breakpoint: compact=16dp, medium=24dp, expanded=24dp — consistent horizontal gutters without a Container component
**Notable API:** `Scaffold(contentPadding)` in Compose; CSS grid with `--md-sys-layout-margin` tokens; no Container component.
**A11y:** Layout regions use `role="main"` via Scaffold; no Container-specific ARIA considerations since it relies on semantic landmark elements.
**Best at:** Mobile-first responsive grid with well-defined breakpoint/margin/column rules for native Android development.
**Missing:** A reusable max-width Container component for web — teams must compose grid + margin tokens manually.

---

## spectrum
**Component:** Absent — layout handled by Provider and responsive utilities
**Approach:** Spectrum does not ship a Container component. Layout containment comes from the Provider component (which establishes responsive context, theme, and locale) and Flex/Grid layout primitives. Max-width centering is left to application-level CSS. Spectrum's responsive utilities define breakpoints (S/M/L) but these influence component density rather than wrapping content in a centered container.
**Key Decisions:**
- [HIGH] Provider as context wrapper: wraps the app root to provide theme, locale, and breakpoint context — not a visual container but the nearest structural analog
- [MED] Flex/Grid for layout: Spectrum's layout primitives handle spacing and alignment; no max-width wrapper is provided
- [MED] Breakpoint-driven density: S/M/L breakpoints affect component sizing (compact/regular) rather than container width
**Notable API:** `<Provider>` for context; `<Flex>`, `<Grid>` for layout; responsive breakpoints via `@react-spectrum/utils`; no Container.
**A11y:** Provider passes down ARIA locale and color scheme; layout regions rely on semantic HTML landmarks (`<main>`, `<aside>`).
**Best at:** Context-driven layout where breakpoints affect component density rather than container width — well-suited to Adobe's dense application UIs.
**Missing:** Dedicated max-width Container — web teams building marketing pages or centered content layouts must create their own.

---

## carbon
**Component:** Grid + FluidForm as container primitives
**Approach:** Carbon provides a Grid component that acts as the primary content container. The Grid applies max-width constraints at each breakpoint (sm=320px, md=672px, lg=1056px, xl=1312px, max=1584px), centers content, and applies horizontal padding (gutters). `FlexGrid` is the modern API replacing the older `CSSGrid`. Carbon also provides a `FluidForm` for full-width form layouts. The Grid is the de facto Container — it constrains width, centers content, and provides column structure in one component.
**Key Decisions:**
- [HIGH] Grid = Container: Carbon's Grid handles max-width, centering, and gutters — no separate Container needed because Grid inherently provides containment
- [HIGH] 5 breakpoints with fixed max-widths: sm(320)/md(672)/lg(1056)/xl(1312)/max(1584) — tight control over content width at every viewport size
- [MED] `fullWidth` prop: removes max-width to create fluid layouts — the equivalent of a "fluid" Container variant
- [MED] `condensed` and `narrow` gutter modes: 1px and 16px gutters respectively for dense data UIs vs. standard content
**Notable API:** `<Grid fullWidth condensed narrow>`; `<Column>` children; 16px default gutter; `<FlexGrid>` as modern API.
**A11y:** Grid renders as `<div>` — teams must add landmark roles (`role="main"`) at the page level. No implicit ARIA from the Grid component.
**Best at:** Integrated grid-as-container with 5 well-defined max-widths — the most complete breakpoint coverage in Tier 1.
**Missing:** A standalone Container component decoupled from column grid — useful for simple centered content without column structure.

---

## polaris
**Component:** Layout + Page as container primitives
**Approach:** Polaris does not have a standalone Container component. The `Page` component provides top-level content containment with a max-width of 998px (narrow) or 1440px (default), horizontal padding, and vertical spacing. `Layout` provides column-based structure within a Page. For simpler containment, `Box` with `maxWidth` and `padding` props can approximate a container. Polaris's opinionated approach ties containment to the Page-level structure of Shopify admin.
**Key Decisions:**
- [HIGH] Page as primary container: `Page` provides max-width (default 1440px), horizontal padding, and title/action slots — containment is coupled with page-level semantics
- [HIGH] `narrowWidth` prop: constrains Page to 998px for focused flows (settings, forms) — two width modes rather than a continuous scale
- [MED] Box as escape hatch: `<Box maxWidth="800px" paddingInline="400">` provides ad-hoc containment without Page semantics
- [MED] Layout for column structure: 2-column and 3-column patterns within Page for admin dashboard layouts
**Notable API:** `<Page narrowWidth>`; `<Layout>` with `<Layout.Section>` children; `<Box maxWidth paddingInline>` as a generic container.
**A11y:** Page renders landmark structure with `<main>` and title as `<h1>`. Layout sections use semantic grouping.
**Best at:** Opinionated admin page containment — Page + Layout covers 90% of Shopify admin patterns without teams needing a generic Container.
**Missing:** A flexible, standalone Container component for non-admin contexts (marketing pages, embedded apps).

---

## atlassian
**Component:** Absent — Box and xcss for containment
**Approach:** Atlassian DS does not provide a dedicated Container component. Layout containment is achieved through the `Box` primitive with `xcss` (Atlassian's constrained CSS-in-JS) applying max-width and padding tokens. The `Grid` component provides column-based layouts. Page-level containment patterns are documented in the Page layout pattern but not abstracted into a reusable Container component. Teams compose `Box` + token-based spacing for centered content regions.
**Key Decisions:**
- [HIGH] Box + xcss as container primitive: `<Box xcss={containerStyles}>` where `containerStyles` applies `maxWidth`, `marginInline: 'auto'`, and `paddingInline` — composable but not pre-built
- [MED] Grid for structured layouts: column-based containment within pages, but Grid is not a max-width wrapper
- [MED] Token-constrained widths: `space.1200`, `space.1600` tokens for max-width — prevents arbitrary width values
**Notable API:** `<Box xcss={...}>` with `maxWidth`, `marginInline: 'auto'`, `paddingInline` tokens; `<Grid>` for columns; no Container component.
**A11y:** Box renders generic `<div>` — teams must apply landmark roles. No implicit containment semantics.
**Best at:** Token-constrained composability — Atlassian teams build custom containers from Box + tokens, ensuring all widths and paddings are from the design token vocabulary.
**Missing:** A pre-built Container component — teams repeatedly compose the same Box + xcss patterns for page containment.

---

## ant-design
**Component:** Absent — Layout.Content and Flex for containment
**Approach:** Ant Design provides `Layout.Content` as the main content area within its Layout system (Header/Sider/Content/Footer). Content does not impose a max-width — it fills the remaining space after Sider and Header. For max-width centered containment, teams use `Flex` or raw CSS with Ant's token system. The `Space` and `Flex` components provide spacing/alignment but not width-constrained containment. Chinese enterprise apps typically use full-width fluid layouts, which explains the absence of a max-width Container.
**Key Decisions:**
- [HIGH] Layout.Content as fluid content area: fills remaining viewport width — no max-width constraint by default, reflecting full-width enterprise dashboard patterns
- [MED] Flex component for alignment: `<Flex justify="center" style={{ maxWidth: 1200 }}>` approximates a centered container but requires manual width styling
- [MED] Row/Col grid for structured containment: 24-column grid provides responsive column layouts, but Row does not constrain max-width
- [MED] Token-based spacing: `token.paddingLG` and `token.marginLG` for consistent gutters in custom containers
**Notable API:** `<Layout.Content>`; `<Flex>`; `<Row>` with `<Col>` grid; `token.screenXL` for breakpoint tokens; no Container component.
**A11y:** Layout.Content renders `<main>` when used within Layout — provides implicit landmark. No ARIA considerations for containment itself.
**Best at:** Full-width enterprise layout system — Layout.Content + Sider covers the dominant Chinese enterprise admin panel pattern.
**Missing:** A max-width centered Container for marketing pages, documentation sites, or Western-style centered content layouts.
