---
component: List
tier: 3
last_verified: 2026-03-31
---

# List — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | No List primitive | Radix does not provide a list primitive; list-like behavior is achieved through composition of Select, DropdownMenu, or custom implementations. Radix focuses on overlay/trigger patterns, not static or scrollable lists. | high |
| Chakra UI | List / UnorderedList / OrderedList | Semantic list wrappers with `ListItem` and `ListIcon` sub-components; `spacing` prop controls gap between items; no built-in selection, action, or interactive list patterns — purely presentational. | high |
| GOV.UK | Summary List / Task List | Summary List for key-value description pairs with optional "Change" action links (used across all government service forms); Task List for multi-step task tracking with status tags; both are highly specific to form/service patterns; no generic interactive list. | high |
| Base Web (Uber) | List / ListItem | ListItem with `artwork` (leading visual), `endEnhancer` (trailing action/badge), and `sublist` for nested children; ListItemLabel for primary/secondary text; focused on ride/delivery content rows with clear slot architecture. | high |
| Fluent 2 (Microsoft) | List / ListItem | Virtualized list for performance with large datasets (thousands of items in Teams/Outlook); selection modes (single, multiselect, extended); drag-and-drop reordering; column layouts for detail views; navigable and selectable list patterns for Office productivity. | high |
| Gestalt (Pinterest) | List / List.Item | Compound component with `label`, `text`, and `type` (ordered/unordered) props; List.Item supports `text` as string or custom node; spacing="condensed"/"regular" for density control; focused on content display (pin descriptions, board lists) not interactive selection. | medium |
| Mantine | List / List.Item | Ordered and unordered lists with `icon` prop on List.Item for custom bullet replacement; `spacing`, `size`, `withPadding` props; `center` prop to vertically center icon with text; purely presentational — no selection or interactive patterns. | high |
| Orbit (Kiwi.com) | List / ListChoice | List for static informational items (flight details, baggage rules) with icon + text; ListChoice for selectable options with checkbox/radio behavior, `selected` state, `onClick` handler — travel booking selection pattern (seat selection, ancillary services). | high |
| Evergreen (Segment) | UnorderedList / OrderedList / List.Item | Semantic list with `icon` and `iconColor` props on List.Item for status indicators; `size` prop for text sizing; focused on data pipeline documentation and status lists; no interactive selection patterns. | medium |
| Nord (Nordhealth) | DescriptionList / NavList | DescriptionList for patient record key-value pairs (diagnosis, medication, dosage); NavList for sidebar navigation with active state and grouping; clinical domain shapes both components toward scan-and-find efficiency; verify at nordhealth.design. | low |

## Key Decision Patterns

The T3 set crystallizes the presentational-vs-interactive list split more sharply than T2. Chakra, Mantine, Gestalt, and Evergreen all provide lists that are purely semantic HTML wrappers — they handle typography, spacing, icons, and bullet styling but have zero interactive behavior (no selection, no keyboard navigation beyond tab, no aria-selected). These components exist because raw `<ul><li>` elements need consistent spacing, icon alignment, and density variants, but they are fundamentally a styling concern, not a behavior concern. The interactive list is a completely different component with different ARIA roles, keyboard patterns, and state management.

Orbit's split between List and ListChoice is the cleanest architectural expression of this divide in the T3 set. List is for displaying information (flight details: "1 checked bag included", "Wi-Fi available"). ListChoice is for making selections (seat type, meal preference, insurance addon). They share visual structure (icon + label + description) but differ in every behavioral dimension: ListChoice has `selected` state, `onClick` handler, checkbox/radio affordance, and `role="option"`. This two-component pattern maps directly to the HTML distinction between `<ul>` (display) and `<select>`/`<listbox>` (interaction).

Fluent 2's List is the most feature-rich interactive list in the T3 set, designed for Outlook's message list, Teams' conversation list, and OneDrive's file list — all of which require virtualization (rendering only visible items for lists of thousands), selection modes (click to select one, Ctrl+click for multi, Shift+click for range), drag-and-drop reordering, and column-based detail views. This level of complexity is specific to productivity applications and should not be the default list pattern for simpler use cases. Most design systems need the simpler presentational list as their base and add interactive capabilities as a separate, opt-in component.

Base Web's slot architecture (artwork + content + endEnhancer) provides the cleanest slot model in the T3 set for list items that need leading visuals and trailing actions. The `artwork` slot accepts any node (icon, avatar, thumbnail), `endEnhancer` accepts any trailing content (badge, action button, switch), and `sublist` enables nesting. This three-slot pattern (leading + content + trailing) is the consensus list item anatomy across all systems that support interactive or content-rich lists.

## A11y Consensus

- Presentational lists must use semantic HTML (`<ul>`, `<ol>`, `<dl>`) so screen readers announce "list, X items" — all T3 systems that provide presentational lists use semantic elements rather than `role="list"` on divs.
- Interactive/selectable lists require `role="listbox"` with `role="option"` children; `aria-selected` tracks selection state; `aria-multiselectable="true"` when multiple selection is supported — Fluent 2 and Orbit ListChoice implement this correctly.
- Keyboard navigation for interactive lists: Up/Down arrow moves focus between items; Home/End jump to first/last; Space toggles selection; type-ahead jumps to matching items by first character — Fluent 2 implements the full pattern.
- Nested lists must maintain parent-child relationship in the accessibility tree; screen readers should announce nesting depth — Base Web's `sublist` prop handles this.
- GOV.UK Summary List's "Change" action links include visually hidden text identifying which field they modify (e.g., "Change name") so screen reader users know what each link does without visual context.
- Description lists use `<dl>`, `<dt>`, `<dd>` semantic elements; screen readers announce term-description pairs — GOV.UK Summary List and Nord DescriptionList follow this pattern.

## Recommended Use

Reference T3 list approaches when deciding between presentational and interactive list components, slot architecture for list items, and virtualization requirements. Orbit's List/ListChoice split is the clearest model for separating display lists from selection lists. Base Web ListItem is the reference for the three-slot (artwork + content + endEnhancer) item anatomy. Fluent 2 List is the reference for virtualized, multi-select, drag-and-drop productivity lists. GOV.UK Summary List is the reference for accessible description list patterns with inline actions.
