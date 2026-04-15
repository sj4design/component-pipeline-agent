---
component: description-list
compiled: 2026-03-31
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Description List — All Systems Digest

## Material Design 3
**Approach**: No dedicated Description List or key-value pair component. M3 relies on List (one-line, two-line, three-line) for structured content display. A two-line list item with overline (term) and body (description) can approximate a vertical description list, but there is no semantic dl/dt/dd mapping or horizontal key-value layout pattern documented.
**Key decisions**:
- No key-value component; M3 treats structured metadata as a List variant — the two-line/three-line list item pattern handles label + value pairs within the existing list primitive, avoiding a separate component for what M3 considers a list specialization
- Overline text role serves as term label; M3's typography system assigns `labelSmall` or overline to secondary metadata text, which maps naturally to the "term" in a key-value pair — the type hierarchy IS the structural hierarchy
- No horizontal layout mode; M3's List is strictly vertical — horizontal "term: value" side-by-side layout requires custom composition from Grid + Typography tokens
**Notable API**: List item with `overline`, `headline`, `supportingText`; no description-list-specific props
**A11y**: List uses `role="list"` / `role="listitem"`; no guidance on mapping to `dl`/`dt`/`dd` semantics; teams must implement semantic HTML independently.
**Best at**: General-purpose list composition that can approximate vertical key-value displays. **Missing**: No description list component, no horizontal layout, no column control, no bordered variant, no action slot per row, no colon separator pattern.

## Spectrum (Adobe)
**Approach**: No dedicated Description List component. Adobe's detail panels (asset metadata in AEM, document properties in Acrobat) use internal patterns not published in Spectrum. The closest primitive is a two-column layout using Flex/Grid with label text (Body quiet) on the left and value text (Body) on the right. DetailList is an internal Adobe component not part of the public Spectrum library.
**Key decisions**:
- Metadata display is product-specific; Adobe's products each have unique metadata structures (EXIF data in Lightroom, paragraph styles in InDesign, asset tags in AEM) — a single Description List component would need to handle wildly different content shapes
- Typography weight differential for term vs value; Spectrum's Body `quiet` variant (lighter weight) for terms and standard Body for values creates visual hierarchy without structural markup — relies on weight contrast rather than layout
- No action slot pattern; Adobe's metadata panels sometimes include inline edit or copy buttons, but these are product-level additions, not prescribed by Spectrum
**Notable API**: No component API — teams compose using Flex, Typography (Body quiet for term, Body for value), Divider for row separation
**A11y**: No description list ARIA guidance; relies on teams using semantic `dl`/`dt`/`dd` HTML in their implementations.
**Best at**: Flexible typography-based term/value contrast via weight variants. **Missing**: No description list component, no horizontal/vertical toggle, no bordered variant, no column count, no responsive stacking, no colon separator.

## Carbon (IBM)
**Approach**: Carbon provides a "Structured List" component that serves as the closest equivalent to a description list. StructuredList renders a table-like layout with rows and columns, supporting header rows and selectable rows. For key-value metadata, IBM recommends using StructuredList in a two-column configuration (term | value) or composing with Tile + body text for simpler cases. The data table documentation includes key-value display patterns for detail panels.
**Key decisions**:
- StructuredList as the multi-purpose structured content container; IBM's enterprise apps frequently display configuration parameters, system properties, and audit metadata — StructuredList handles all of these with a consistent row-based layout that scales from 2 to N columns
- Header row optional; when used as a pure key-value display, the header row is suppressed and the first column visually acts as the "term" — StructuredList flex handles this without a separate component
- Selection variant for actionable rows; StructuredList supports radio/checkbox selection per row, which extends key-value display into settings panels where users can choose between configuration options
**Notable API**: `StructuredList`, `StructuredListWrapper`, `StructuredListHead`, `StructuredListBody`, `StructuredListRow`, `StructuredListCell`; `selection` prop for selectable rows
**A11y**: StructuredList uses `role="table"` with `role="row"` and `role="cell"` semantics; selectable variant adds `role="radiogroup"`; no native `dl`/`dt`/`dd` mapping.
**Best at**: Enterprise metadata display via StructuredList with selectable row variants and multi-column flexibility. **Missing**: No semantic description list, no horizontal key-value layout (always tabular), no bordered/borderless toggle, no action slot per row, no responsive stacking to vertical.

## Polaris (Shopify)
**Approach**: Polaris provides `DescriptionList` as a dedicated first-class component. It renders semantic `dl`/`dt`/`dd` HTML and supports two layout variants: the default vertical stack (term above description) and a horizontal layout via `gap` prop (term and description side by side). Used extensively in Shopify admin for order details, customer metadata, and product properties.
**Key decisions**:
- Dedicated component with semantic HTML; Shopify's admin is fundamentally a metadata display product — every order, customer, product, and discount page is a series of key-value pairs, so a first-class `DescriptionList` eliminates the repeated composition pattern
- Vertical default, horizontal option; vertical layout (term stacked above description) is the default because it handles long merchant-entered values (product descriptions, custom metafields) better than constrained horizontal columns
- Simple items API; the component takes an `items` array of `{term: string, description: ReactNode}` objects — description accepts ReactNode for rich content (links, badges, formatted text) within values
**Notable API**: `items` (array of `{term, description}`); `gap` (spacing between items); renders semantic `dl > dt + dd`
**A11y**: Renders semantic `dl`/`dt`/`dd` HTML natively; term-description association is built into the markup; no additional ARIA attributes needed because the native HTML semantics are sufficient.
**Best at**: Clean semantic implementation with simple items-based API and ReactNode descriptions for rich content. The reference for minimal-but-correct description list implementation. **Missing**: No horizontal side-by-side layout mode (only gap control), no column count, no bordered variant, no colon separator, no action slot per row, no responsive stacking configuration.

## Atlassian
**Approach**: No dedicated Description List component in the public Atlassian Design System. Jira issue detail panels (Reporter, Assignee, Priority, Labels) display key-value metadata using internal layout patterns. The closest public primitive is a two-column grid using `@atlaskit/primitives` Inline/Stack components with Label and Text. Confluence page metadata and Jira issue fields both use similar but product-specific implementations.
**Key decisions**:
- Issue detail patterns are product-level, not DS-level; Jira's field display needs (custom fields, field configuration schemes, permission-based visibility) are too complex for a generic description list — Atlassian keeps field rendering in Jira's codebase rather than abstracting into the DS
- Lozenge and Badge inline with values; Jira's key-value displays embed Lozenge (status), Badge (count), and Avatar (assignee) within the "value" position — the description slot must accept any component, which is better served by composition than a rigid component API
- No semantic dl/dt/dd in practice; Atlassian's implementations use divs with visual styling rather than semantic description list markup, relying on label + value text association through proximity
**Notable API**: No component API — teams compose using Inline, Stack, Label, Text from @atlaskit/primitives; Heading for section titles
**A11y**: No dl/dt/dd semantics in standard implementations; relies on visual proximity and label text for association; no documented ARIA pattern for key-value metadata display.
**Best at**: Rich inline content (Lozenge, Badge, Avatar) within value slots through flexible composition. **Missing**: No description list component, no semantic HTML, no horizontal/vertical toggle, no bordered variant, no column count, no responsive configuration.

## Ant Design
**Approach**: The most feature-complete description list component across all Tier 1 systems. `Descriptions` (plural) renders a bordered or borderless key-value grid with configurable column count, sizes, layout direction (horizontal/vertical), and optional colon separator. Each `Descriptions.Item` takes a `label` and children (value). Supports responsive column configuration via breakpoint object. Pairs naturally with Card for visual containment. Used as the standard detail/summary view in Ant's enterprise admin template.
**Key decisions**:
- Dedicated component with rich layout API; Chinese enterprise admin panels display dense metadata tables (user profiles, order details, system configurations) — Descriptions handles 3-4 column grids with colSpan control, enabling complex metadata layouts without custom CSS grid
- `bordered` prop toggles between table-like bordered grid and clean borderless list; bordered mode renders actual `<table>` HTML with `<th>` for terms and `<td>` for values — enterprise users expect both styles depending on data density and formality
- `column` prop accepts number or responsive object `{xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1}`; responsive column count is the key feature for description lists that must work across dashboard layouts
- `colon` prop adds ":" after labels; common in Chinese and many enterprise UI conventions — a small detail that eliminates manual colon insertion across hundreds of description items
- `Descriptions.Item` supports `span` for items that should occupy multiple columns — an address field spanning 2 columns while name and email each take 1 column
**Notable API**: `title`; `bordered`; `column` (number|responsive object); `size` (default|middle|small); `layout` (horizontal|vertical); `colon`; `extra` (action slot in header); `Descriptions.Item` with `label`, `span`, `children`
**A11y**: Bordered mode renders `<table>` with `<th>`/`<td>` providing native table semantics; borderless mode renders `<div>` structure without semantic dl/dt/dd; no explicit ARIA roles documented; label-value association relies on visual proximity in borderless mode.
**Best at**: Most complete implementation — bordered grid, responsive columns, colSpan, colon separator, size variants, title + extra action slot. The gold standard reference for any DS building a Description List component. **Missing**: No action slot per individual row (only header-level `extra`), no inline editing mode, no loading/skeleton state for individual values, no expandable/collapsible sections within the list.
