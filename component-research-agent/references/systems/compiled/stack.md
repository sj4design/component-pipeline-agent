---
component: stack
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** No native M3 Stack component — MUI Stack (community/MUI layer)
**Approach:** M3 has no layout stack primitive in its component spec. MUI provides `Stack` as a convenience wrapper around CSS flexbox that handles direction, spacing, and dividers between children. It is a one-dimensional layout utility — it arranges children along a single axis (row or column) with uniform gaps, delegating two-dimensional layout to `Grid`. Stack is polymorphic via the `component` prop.
**Key Decisions:**
- [HIGH] One-dimensional only: Stack is explicitly for single-axis layout; two-dimensional arrangements use Grid — a clear separation of concerns that avoids overloading one component
- [HIGH] Divider integration: `divider` prop accepts a React element (typically `<Divider>`) inserted between every child — solves the "separator between items but not after the last" pattern without CSS hacks
- [MED] Responsive direction: `direction` accepts an object or array for responsive breakpoints (`direction={{ xs: 'column', sm: 'row' }}`), enabling mobile-first stacking that flips to horizontal on larger screens
**Notable API:** `direction: "row" | "column" | "row-reverse" | "column-reverse"` with responsive object; `spacing` using theme spacing scale; `divider` for inter-child separators; `useFlexGap` for native CSS gap vs. margin-based spacing
**A11y:** No specific ARIA behavior — Stack is a purely visual layout utility. Renders as `<div>` by default; polymorphic `component` prop allows semantic element (e.g., `<nav>`, `<ul>`) when needed.
**Best at:** Divider insertion between children and responsive direction switching — the divider prop is the most ergonomic inter-child separator API in Tier 1.
**Missing:** No wrap support in the base Stack (requires `flexWrap` via `sx`); no built-in density or spacing scale beyond theme values; no alignment shorthand — `alignItems` and `justifyContent` must be passed as style props.

---

## spectrum
**Component:** Flex
**Approach:** Spectrum's `Flex` is a layout primitive that wraps CSS flexbox with Spectrum's dimension and spacing tokens. It exposes every standard flexbox property (`direction`, `wrap`, `justifyContent`, `alignItems`, `alignContent`) as first-class props, using Spectrum's DimensionValue type for spacing. Unlike most systems, Flex does not provide a divider prop — separation is achieved through spacing alone. `Flex` is the primary layout building block alongside `Grid` for two-dimensional layouts.
**Key Decisions:**
- [HIGH] Full flexbox parity: every standard flexbox property is exposed as a prop, making Flex a thin typed wrapper rather than an opinionated abstraction — teams familiar with CSS flexbox have zero learning curve
- [MED] DimensionValue spacing: `gap`, `rowGap`, `columnGap` accept Spectrum dimension tokens (`"size-100"`, `"size-200"`) ensuring spacing always aligns to the 4px grid
- [MED] No separate Stack/Inline: a single `Flex` component with `direction="column"` replaces Stack and `direction="row"` replaces Inline — reduces API surface but loses semantic naming
**Notable API:** `direction`, `wrap`, `gap`, `rowGap`, `columnGap`, `justifyContent`, `alignItems`, `alignContent`; `UNSAFE_className` / `UNSAFE_style` escape hatches
**A11y:** No ARIA behavior — purely visual layout. Renders as `<div>` by default. Semantic element choice is the consumer's responsibility.
**Best at:** Full flexbox property coverage with token-typed spacing — the most complete CSS flexbox wrapper in Tier 1 with zero abstraction gap.
**Missing:** No divider support; no responsive prop syntax (responsive behavior deferred to Spectrum's `@media` breakpoint tokens in CSS); no polymorphic element prop.

---

## carbon
**Component:** Stack
**Approach:** Carbon's `Stack` arranges child elements vertically or horizontally with consistent spacing from Carbon's spacing scale. It is intentionally minimal — direction and gap are the primary concerns. Carbon also provides `FlexGrid` and `Grid` for two-dimensional layouts, keeping Stack focused on one-dimensional stacking. The `orientation` prop controls vertical vs. horizontal stacking.
**Key Decisions:**
- [HIGH] Spacing scale integration: `gap` accepts Carbon spacing token indices (1-13) mapping to the 2px-based Carbon spacing scale, enforcing design consistency at the API level
- [MED] Orientation over direction: uses `orientation: "vertical" | "horizontal"` rather than CSS flexbox `direction` terminology — more semantic but unfamiliar to developers used to flexbox
- [MED] Minimal API surface: no wrap, no alignment, no justify — Stack does one thing (spacing in one direction) and defers everything else to CSS or FlexGrid
**Notable API:** `orientation: "vertical" | "horizontal"`; `gap: 1-13` (Carbon spacing scale index)
**A11y:** No ARIA behavior — layout utility only. Renders as `<div>`. Consumer must choose semantic elements when content requires them.
**Best at:** Enforcing Carbon's spacing scale through constrained gap values — impossible to use off-scale spacing without escaping to CSS.
**Missing:** No wrap support; no alignment props; no divider support; no responsive direction; no polymorphic element. The most constrained Stack API in Tier 1.

---

## polaris
**Component:** HorizontalStack / VerticalStack (deprecated) → InlineStack / BlockStack
**Approach:** Polaris provides two separate components: `InlineStack` (horizontal/inline axis) and `BlockStack` (vertical/block axis) rather than a single Stack with a direction prop. This follows CSS logical properties terminology (inline = horizontal in LTR, block = vertical). Both components use Polaris spacing tokens and support alignment and wrapping. The rename from HorizontalStack/VerticalStack to InlineStack/BlockStack reflects Polaris's shift to logical property naming for RTL support.
**Key Decisions:**
- [HIGH] Two components over one: `InlineStack` and `BlockStack` as separate components rather than `Stack direction="column"` — each has a focused API without unused props (e.g., `wrap` only on InlineStack since vertical wrapping is rare)
- [HIGH] Logical property naming: `InlineStack` / `BlockStack` aligns with CSS logical properties, making RTL/bidi support implicit — no direction-dependent assumptions in component names
- [MED] `gap` with Polaris tokens: accepts Polaris spacing scale values (`"100"`, `"200"`, ..., `"1600"`) or responsive objects for breakpoint-aware spacing
**Notable API:** `BlockStack`: `gap`, `align` (cross-axis), `inlineAlign` (main-axis); `InlineStack`: `gap`, `align` (cross-axis), `blockAlign` (main-axis), `wrap`; both support responsive `gap` objects
**A11y:** No ARIA behavior — layout utilities. Render as `<div>`. Polaris documentation emphasizes using semantic elements as children rather than relying on the stack for semantics.
**Best at:** RTL-ready logical property naming and focused per-axis APIs — the two-component split avoids the "direction + alignment confusion" problem where `alignItems` means different things in row vs. column mode.
**Missing:** No divider support; no polymorphic element; cannot switch direction responsively (must conditionally render InlineStack vs. BlockStack, or use CSS).

---

## atlassian
**Component:** Stack / Inline / Flex
**Approach:** Atlassian DS provides three layout primitives: `Stack` (vertical), `Inline` (horizontal), and `Flex` (full flexbox control). Stack and Inline are opinionated wrappers with constrained spacing tokens, while Flex is a lower-level escape hatch exposing full flexbox properties. Stack and Inline use the `space` prop with Atlassian spacing tokens. A `separator` prop on Stack inserts dividers between children. All three support the `as` prop for polymorphic rendering.
**Key Decisions:**
- [HIGH] Three-tier architecture: Stack (vertical) / Inline (horizontal) for common cases with constrained APIs; Flex for full flexbox control when needed — progressive disclosure of complexity
- [HIGH] `separator` prop: Stack accepts a separator element inserted between children (similar to MUI's `divider` prop) — acknowledges the common "items with dividers" pattern
- [MED] `spread` prop: on Inline, distributes children with space-between — a named shorthand for the most common justify-content use case in horizontal layouts
**Notable API:** `Stack`: `space`, `alignInline`, `alignBlock`, `separator`, `grow`; `Inline`: `space`, `alignInline`, `alignBlock`, `spread`, `shouldWrap`; `Flex`: full flexbox props; all support `as` for polymorphic rendering
**A11y:** No ARIA behavior — layout utilities. `as` prop enables semantic element rendering (`as="nav"`, `as="ul"`). Documentation recommends choosing semantic elements for content structure.
**Best at:** The three-tier progressive-disclosure architecture (Stack → Inline → Flex) that matches developer intent: most layouts use Stack/Inline, edge cases drop to Flex. Separator support and the `spread` shorthand reduce boilerplate.
**Missing:** No responsive direction switching on Stack/Inline (must switch components or drop to Flex); `separator` only on Stack, not Inline.

---

## ant-design
**Component:** Space / Flex
**Approach:** Ant Design provides two layout components: `Space` (the original spacing utility, now partially deprecated in favor of Flex) and `Flex` (a full CSS flexbox wrapper added in v5). Space arranges children with consistent gaps and supports a `split` prop for inter-child dividers. Flex is a thin wrapper over CSS flexbox, similar to Spectrum's approach. Both use Ant's design token system for spacing values. Space was Ant's first layout primitive and remains widely used, though Flex is recommended for new code.
**Key Decisions:**
- [HIGH] Two components with overlapping scope: `Space` (original, simpler) and `Flex` (newer, more powerful) coexist — Space is not deprecated but Flex is the recommended path forward, creating a migration burden
- [HIGH] `split` prop on Space: accepts a React node inserted between children — equivalent to MUI's `divider` and Atlassian's `separator`, confirming divider insertion as a cross-system pattern
- [MED] `Space.Compact`: a specialized variant that removes gaps between children and merges borders — unique to Ant and designed for grouped buttons/inputs where items should appear as a single visual unit
**Notable API:** `Space`: `direction`, `size` (small/middle/large or number), `wrap`, `split`, `align`; `Space.Compact`: `direction`, `size`, `block`; `Flex`: `vertical`, `gap`, `wrap`, `justify`, `align`
**A11y:** No ARIA behavior — layout utilities. Render as `<div>`. No polymorphic element support on Space; Flex supports `component` prop in some configurations.
**Best at:** `Space.Compact` for merged-border grouped controls (button groups, input addons) — a unique pattern not found in other Tier 1 systems. The `split` prop on Space provides clean divider insertion.
**Missing:** Flex has a confusing `vertical` boolean rather than `direction` prop; no responsive props on either component; Space and Flex overlap creates API surface confusion for new users.
