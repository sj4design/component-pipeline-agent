---
component: list
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** List (ListItem, ListItemButton, ListItemText, ListItemIcon, ListItemAvatar, ListSubheader)
**Approach:** M3 Lists are composition-heavy — a `List` container holds `ListItem` children, each composed from optional slots: leading visual (icon, avatar, image, video), headline, supporting text, and trailing element (icon, checkbox, switch, text). Three density variants (one-line, two-line, three-line) are defined by the number of text lines. MUI's implementation uses compound components where each slot is a separate React element nested inside `ListItem`.
**Key Decisions:**
- [HIGH] Composition over configuration: each slot (icon, avatar, text, trailing action) is a separate child component — no monolithic props API for content placement
- [HIGH] Three line-count variants: one-line (48dp), two-line (64dp), three-line (88dp) define the component's height and text layout rather than arbitrary sizing
- [MED] `ListItemButton` vs `ListItem`: interactive list items use a separate component with ripple and focus states, keeping display-only items lightweight
- [MED] Dividers and subheaders are sibling elements within the list, not props on list items
**Notable API:** `dense` prop reduces vertical padding; `disableGutters` removes horizontal padding; `ListItemSecondaryAction` for trailing interactive elements that need independent click handling; `ListSubheader` for group headings
**A11y:** List renders as `<ul>` with `role="list"`, items as `<li>`. `ListItemButton` renders as a focusable element with keyboard navigation. Selection uses `aria-selected`. No built-in `role="listbox"` — selection list requires manual ARIA wiring or use of separate Menu/Select.
**Best at:** Flexible composition for complex list items with mixed content types — the slot-based architecture handles everything from simple text lists to media-rich item layouts.
**Missing:** No built-in virtualization; no drag-and-drop reorder; no native selection management (single/multi-select requires external state); no `role="listbox"` mode for selectable lists.

---

## spectrum
**Component:** ListView / ListBox (two distinct components)
**Approach:** Spectrum separates display lists from interactive lists. `ListView` is a scrollable, virtualised list supporting selection (single, multiple, replace modes), drag-and-drop reorder, and async loading via `useAsyncList`. `ListBox` is the ARIA listbox pattern for form-style selection within pickers and combo boxes. Both use a collection API where items are declared via `<Item>` children with key-based identity.
**Key Decisions:**
- [HIGH] ListView vs ListBox separation: ListView is for browsable/actionable content (file explorer, asset panel); ListBox is for option selection within form controls — different ARIA roles and keyboard models
- [HIGH] Built-in virtualization: ListView virtualises by default for large collections — no separate windowing library needed
- [HIGH] Selection modes: `none`, `single`, `multiple`, `replace` — replace mode clears previous selection on new click, matching file-explorer behavior
- [MED] Drag-and-drop: native DnD support with `onDrop`, `onReorder`, `dragAndDropHooks` — covers reorder, cross-list move, and external drop targets
**Notable API:** `selectionMode`; `selectionStyle: "highlight" | "checkbox"`; `loadingState` + `onLoadMore` for async infinite scroll; `density: "compact" | "regular" | "spacious"`; `overflowMode: "truncate" | "wrap"` for item text
**A11y:** ListView uses `role="grid"` with `role="row"` per item for complex items or `role="listbox"` for simple items. ListBox uses `role="listbox"` with `role="option"`. Full keyboard navigation: arrow keys, Home/End, type-ahead, Shift+Click for range selection. Screen reader announces item count and selection state.
**Best at:** Enterprise-grade interactive lists — virtualization, async loading, drag-and-drop, and multi-selection mode in a single component with comprehensive ARIA.
**Missing:** No description list variant; no built-in dividers/sections within ListView (grouping requires sectioned collection API).

---

## carbon
**Component:** StructuredList / ContainedList / UnorderedList / OrderedList
**Approach:** Carbon splits list functionality across four components. `StructuredList` is a tabular-style list with rows and cells for comparing structured data, supporting row-level selection via radio buttons. `ContainedList` is a vertical stack of list items within a container, used for navigation or action menus. `UnorderedList` and `OrderedList` are typographic list components for content display. Each component targets a specific use case rather than being a general-purpose list.
**Key Decisions:**
- [HIGH] Four specialized components: StructuredList (data comparison), ContainedList (contained item groups), UnorderedList/OrderedList (content) — no general-purpose "List" component
- [HIGH] StructuredList uses `<table>` semantics: renders as a selection grid with `role="table"`, not `role="list"` — aligns with its data-comparison purpose
- [MED] ContainedList supports `kind: "on-page" | "disclosed"` — disclosed variant nests inside accordions or other expandable containers with adjusted styling
- [MED] StructuredList selection is radio-button based — single-select only, no multi-select mode
**Notable API:** `StructuredList` + `StructuredListRow` + `StructuredListCell` composition; `ContainedList` + `ContainedListItem` with `action` slot for trailing icon buttons; `isNested` on UnorderedList for indented sub-lists
**A11y:** StructuredList: `role="table"` with row/cell semantics; selection rows use radio button pattern with `role="radio"`. ContainedList: `role="list"` with `role="listitem"`. Focus management on selection rows with arrow key navigation.
**Best at:** Structured data comparison — StructuredList's tabular layout with single-select is purpose-built for settings panels and feature comparisons in enterprise dashboards.
**Missing:** No virtualization; no multi-select; no drag-and-drop reorder; no async loading pattern; ContainedList has no built-in selection mode.

---

## polaris
**Component:** ResourceList / ResourceItem / ActionList / DescriptionList / List
**Approach:** Polaris offers multiple list components for distinct merchant contexts. `ResourceList` is the primary component for displaying collections of merchant objects (orders, products, customers) with bulk actions, filtering, sorting, and selection. `ActionList` is for menu-style lists of actions within popovers. `DescriptionList` is for term-definition pairs. `List` is a simple typographic bullet/number list. ResourceList is the most complex, acting as a mini data-management surface.
**Key Decisions:**
- [HIGH] ResourceList as a data surface: includes bulk selection bar, filter/sort integration, pagination awareness, and loading states — far beyond a simple list component
- [HIGH] ResourceItem media slots: `media` prop for leading thumbnail/avatar, `shortcutActions` for trailing quick-actions that collapse into a kebab menu on mobile
- [MED] ActionList supports sections with titles and separators, plus `destructive` and `disabled` item states — designed for popover action menus
- [MED] `selectable` boolean on ResourceList enables checkbox-based multi-select with a bulk action bar at the top
**Notable API:** `ResourceList`: `items`, `renderItem`, `selectable`, `bulkActions`, `sortValue`, `filterControl`; `ResourceItem`: `media`, `shortcutActions`, `persistActions`; `ActionList`: `items` array with `content`, `icon`, `destructive`, `disabled`, `active`
**A11y:** ResourceList: `role="list"` container; ResourceItem: `role="listitem"` with optional checkbox for selection (`aria-checked`). Bulk selection bar announces selected count. ActionList: `role="list"` or `role="menu"` depending on context, items are focusable with arrow key navigation.
**Best at:** Merchant data management — ResourceList's built-in bulk actions, filtering, and responsive shortcut actions are tailored for Shopify admin list views.
**Missing:** No virtualization for large collections; no drag-and-drop reorder; ResourceList is tightly coupled to Polaris's resource model (requires `renderItem` rather than declarative children).

---

## atlassian
**Component:** No dedicated List component in current ADS — use primitives or Menu
**Approach:** Atlassian's design system does not ship a general-purpose List component. Teams compose lists from `Box`, `Stack`, and `Pressable` primitives. For interactive/action lists, the `Menu` component (Dropdown Menu) serves as the closest equivalent. Jira's issue lists, Confluence's page trees, and Bitbucket's file lists are all product-level implementations built on primitives rather than a shared list component. The team's position is that list requirements vary too significantly across products for a single component.
**Key Decisions:**
- [HIGH] No general-purpose list component: product teams build custom list implementations from `@atlaskit/primitives` — validates the "list context is too varied" argument
- [MED] Menu component covers action list needs: `MenuGroup`, `MenuItem`, `MenuItemCheckbox`, `MenuItemRadio` for interactive option lists within dropdowns
- [MED] Product implementations (Jira issue list, Confluence page list) use virtualization via `react-window` or `react-virtualized` at the product level, not at the DS level
**Notable API:** Menu: `MenuGroup` (with `title`), `MenuItem`, `MenuItemCheckbox`, `MenuItemRadio`. Primitives: `Stack` with `space` for vertical spacing, `Box` with `xcss` for item styling, `Pressable` for interactive items.
**A11y:** Menu follows WAI-ARIA menu pattern with `role="menu"`, `role="menuitem"`, arrow key navigation, and type-ahead. Composed lists use `role="list"` and `role="listitem"` per Atlassian a11y guidelines. Product-level implementations are required to pass a11y audits.
**Best at:** Flexibility — product teams get exactly the list behavior their context requires without fighting a generic component's assumptions.
**Missing:** A formal reusable list component — acknowledged gap leading to duplicated effort across Jira, Confluence, Trello, and Bitbucket. No shared virtualization, selection, or drag-and-drop patterns.

---

## ant-design
**Component:** List / List.Item / List.Item.Meta / Descriptions
**Approach:** Ant Design's List is a data-driven component that accepts a `dataSource` array and `renderItem` function, handling pagination, loading states, grid layout, and header/footer sections. `List.Item.Meta` provides a structured slot layout with avatar, title, and description. `Descriptions` is a separate component for key-value pair display (description list). The List component is designed as a lightweight alternative to Table for simpler data presentations.
**Key Decisions:**
- [HIGH] Data-driven API: `dataSource` + `renderItem` pattern — the component owns iteration, pagination, and loading, not the consumer
- [HIGH] Built-in pagination: `pagination` prop accepts Ant's Pagination config directly — integrated rather than composed separately
- [MED] Grid mode: `grid` prop with `gutter`, `column`, and responsive breakpoint config transforms the list into a responsive card grid — bridging list and grid layout
- [MED] Four `size` options: `default`, `small`, `large` control item padding density; `itemLayout: "vertical"` stacks content and actions vertically for card-style items
**Notable API:** `dataSource`, `renderItem`, `pagination`, `loading` (boolean or Spin config), `grid`, `size`, `itemLayout: "horizontal" | "vertical"`, `header`, `footer`; `List.Item`: `actions` array for trailing action links, `extra` for side content (image/chart); `List.Item.Meta`: `avatar`, `title`, `description`
**A11y:** List renders as `<div>` with `role="list"` (configurable); items as `<div>` with `role="listitem"`. No built-in keyboard navigation for selection — List is display-oriented. Pagination component handles its own a11y with `aria-label` and keyboard support.
**Best at:** Rapid data list UI — the `dataSource` + `renderItem` + `pagination` + `loading` combination creates a functional list view with minimal code.
**Missing:** No selection mode (single or multi); no virtualization (recommended to use `react-virtual` externally); no drag-and-drop reorder; no action list variant for menu-style interactive lists.
