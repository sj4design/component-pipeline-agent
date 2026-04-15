---
component: transfer
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — no transfer/dual-list pattern
**Approach:** MD3 has no Transfer or dual-list component. Material Design's selection model is individual-item-based (checkboxes in lists, chips for selected tags) rather than bulk-move-between-containers. The closest approximation is two `List` components with checkboxes and icon buttons to move items, but there is no standardized pattern for this. Google products that need assignment workflows (e.g., Google Admin assigning users to groups) implement custom solutions. Material's philosophy favors simpler selection patterns like multi-select chips or filtered dropdowns over the heavyweight dual-list paradigm.
**Key Decisions:**
- [HIGH] Absent: dual-list transfer is a dense enterprise pattern that conflicts with Material's consumer-focused simplicity — Google products prefer inline multi-select, chips, or autocomplete for item assignment
- [MED] List + Checkbox as building blocks: two vertical lists with `Checkbox` per item and `IconButton` arrows between them can be composed manually, but no guidance or layout pattern exists
- [MED] Chip-based selection preferred: for assigning items to groups, Material favors `ChipGroup` with autocomplete input, which is more compact and mobile-friendly than side-by-side lists
**Notable API:** No component. `List` + `Checkbox` + `IconButton` as manual composition.
**A11y:** No prescribed pattern. Custom implementations should use two `listbox` roles with `aria-multiselectable="true"`, transfer buttons with descriptive `aria-label` ("Move selected items to target list"), and live region announcements for moved items.
**Best at:** Nothing for this pattern — no transfer component or dual-list guidance exists.
**Missing:** Transfer component, dual-list layout, move-all/move-selected actions, search/filter within lists, pagination in lists, drag-and-drop reordering, and any transfer-specific a11y guidance.

---

## spectrum
**Component:** Absent — no transfer/shuttle pattern
**Approach:** Spectrum has no Transfer or dual-list component. Adobe's creative workflows use asset panels, layer management, and canvas-based selection rather than dual-list assignment. The closest Spectrum pattern is two `ListView` components with drag-and-drop (React Aria's `useDrag`/`useDrop`), but this requires full custom composition. React Aria provides robust `useListBox` and drag-and-drop primitives that could compose a transfer widget, but no assembled pattern or recipe exists.
**Key Decisions:**
- [HIGH] Absent: creative tool workflows use spatial selection (canvas, layers) rather than dual-list assignment — transfer is not a pattern in Adobe's product ecosystem
- [MED] React Aria primitives available but unassembled: `useListBox` with `selectionMode="multiple"` plus `useDrag`/`useDrop` provides the building blocks, but no composed Transfer pattern or documentation exists
- [MED] ListView drag-and-drop across containers: Spectrum's ListView supports drag-and-drop between lists, which is the closest technical capability to a transfer, but the dual-panel layout and action buttons are not provided
**Notable API:** No component. `useListBox` + `useDrag`/`useDrop` from React Aria as low-level primitives.
**A11y:** No prescribed transfer pattern. React Aria's `useListBox` provides full keyboard navigation and `aria-multiselectable` support; drag-and-drop includes keyboard-accessible DnD with live region announcements.
**Best at:** Nothing for this pattern — React Aria's composable primitives are strong building blocks but no transfer recipe exists.
**Missing:** Transfer component, dual-list layout, move buttons, search/filter per list, select-all, pagination, and any transfer-specific documentation.

---

## carbon
**Component:** Absent — no transfer/dual-list component
**Approach:** Carbon has no Transfer component despite IBM's enterprise context where user/role/permission assignment workflows are common. IBM Cloud's IAM (Identity and Access Management) interfaces use custom dual-list implementations for assigning users to access groups, but these have not been abstracted into Carbon. The closest Carbon patterns are `MultiSelect` with `filterable` for selecting from a flat list, and `StructuredList` with selection for displaying chosen items, but neither provides the source-to-target movement paradigm.
**Key Decisions:**
- [HIGH] Absent despite enterprise relevance: IAM user assignment, resource group management, and policy assignment are core IBM Cloud patterns that use dual-list UIs, but no standardized component exists — teams build bespoke solutions
- [MED] FilterableMultiSelect as alternative: Carbon's `FilterableMultiSelect` handles the "select multiple from many" use case in a more compact form factor, making a separate transfer component less urgent
- [MED] StructuredList with selection: selected items can be displayed in a `StructuredList` below the multi-select, creating a two-zone pattern that functionally resembles transfer without the side-by-side layout
**Notable API:** No component. `FilterableMultiSelect` for item selection; `StructuredList` with `selection` for displaying chosen items.
**A11y:** No prescribed transfer pattern. Custom implementations should use dual `listbox` roles with `aria-multiselectable`, and `aria-live` regions for announcing item movement.
**Best at:** Nothing for this pattern — `FilterableMultiSelect` is a pragmatic alternative but lacks the explicit source/target visual model.
**Missing:** Transfer component, dual-list layout, move-all/move-selected actions, drag-and-drop between lists, item count indicators, search per list.

---

## polaris
**Component:** Absent — no transfer/dual-list pattern
**Approach:** Polaris has no Transfer component. Shopify's merchant workflows that involve assignment (adding products to collections, assigning tags to orders) use `ResourcePicker` modals with search and checkbox selection rather than side-by-side dual lists. The picker-modal pattern is more mobile-friendly and aligns with Shopify's responsive-first design philosophy. For displaying already-assigned items, Polaris uses `ResourceList` with remove actions.
**Key Decisions:**
- [HIGH] Absent: Shopify's assignment workflows use modal pickers with search rather than dual-list transfer — the modal pattern is more compact and mobile-compatible for merchant use
- [MED] ResourcePicker modal as functional equivalent: modal with search input + checkbox list + "Add" button achieves the same outcome (selecting items from a source) in a pattern more suited to e-commerce product/collection assignment
- [MED] ResourceList for "already assigned" display: after selection via picker, assigned items appear in a `ResourceList` with individual remove actions — this two-step pattern (picker → list) replaces the simultaneous dual-list view
**Notable API:** No component. `ResourcePicker` (modal) for selection; `ResourceList` for displaying assigned items with remove actions.
**A11y:** No prescribed transfer pattern. `ResourcePicker` modal follows standard dialog a11y (focus trap, `aria-modal`); checkbox selection within uses standard checkbox semantics.
**Best at:** Nothing for this pattern — the picker-modal alternative is well-suited for e-commerce but is not a true transfer component.
**Missing:** Transfer component, dual-list layout, bidirectional move, drag-and-drop, item count per list, select-all, and side-by-side comparison of source vs. target.

---

## atlassian
**Component:** Absent — no transfer/dual-list component
**Approach:** Atlassian has no Transfer component in the public design system. Jira's user/group picker for permissions, Confluence's space permission assignment, and Bitbucket's repository access management all use custom implementations. The closest ADS pattern is `Select` with `isMulti` for multi-selection, or the internal `UserPicker`/`GroupPicker` components that provide typeahead search with avatar-enriched results. Atlassian's preference is for search-first selection (type to find, add incrementally) rather than browse-and-move dual lists.
**Key Decisions:**
- [HIGH] Absent: Atlassian products use search-first selection (typeahead pickers) rather than dual-list browse-and-move — this scales better for large user/group directories where browsing a list is impractical
- [MED] Multi-select with search as alternative: `@atlaskit/select` with `isMulti` and async search provides the core selection capability without dual-list overhead
- [MED] Permission UIs are product-specific: Jira, Confluence, and Bitbucket each implement permission assignment differently, with custom layouts tailored to their permission models
**Notable API:** No component. `@atlaskit/select` with `isMulti`, `isSearchable`, and async loading for selection from large datasets.
**A11y:** No prescribed transfer pattern. Multi-select follows standard combobox a11y with `aria-multiselectable`; selected items shown as removable tags with clear button semantics.
**Best at:** Nothing for this pattern — search-first multi-select is Atlassian's preferred alternative to dual-list transfer.
**Missing:** Transfer component, dual-list layout, move buttons, select-all, drag-and-drop between lists, item count indicators.

---

## ant-design
**Component:** Transfer (most complete Tier 1 reference — dual-list with search, pagination, custom render)
**Approach:** Ant Design's Transfer is the definitive dual-list implementation and one of the few major design systems to offer a dedicated Transfer component. Two side-by-side panels (source and target) with checkboxes per item, "move left"/"move right" buttons in the center, optional search/filter per list, optional pagination for large datasets, and fully customizable item rendering. The component supports one-way mode (source to target only, with remove in target), custom footer actions per panel, and a `Table Transfer` variant that renders items as data tables with sorting and filtering.
**Key Decisions:**
- [HIGH] Dedicated dual-list component: full source-target panel layout with center action buttons is the canonical transfer pattern — Ant Design treats this as a first-class data entry component alongside Select, Cascader, and TreeSelect
- [HIGH] Table Transfer variant: `Transfer` composed with `Table` renders each panel as a sortable, filterable data table — essential for enterprise scenarios where transferred items have multiple columns (name, role, department, status)
- [HIGH] Search/filter per panel: `showSearch` enables a search input in each panel header, critical for usability when source lists contain hundreds or thousands of items
- [MED] Pagination support: `pagination` prop enables paginated panels for large datasets, avoiding performance issues with rendering thousands of checkboxed items
- [MED] One-way mode: `oneWay` prop restricts movement to source→target only, with items removable from target via delete action — simplifies the UI for "add to selection" use cases where bidirectional transfer is unnecessary
- [MED] Custom render per item: `render` function allows rich item display (avatar + name + description) while maintaining checkbox selection — items are not limited to plain text
**Notable API:** `dataSource: TransferItem[]`; `targetKeys: string[]`; `onChange: (targetKeys, direction, moveKeys) => void`; `showSearch: boolean`; `filterOption: (inputValue, item) => boolean`; `pagination: boolean | { pageSize: number }`; `oneWay: boolean`; `render: (item) => ReactNode`; `selectAllLabels: [ReactNode, ReactNode]`; `footer: (props, { direction }) => ReactNode`; `listStyle: CSSProperties | ((style) => CSSProperties)`; per-item `disabled: boolean`
**A11y:** Each panel renders as a checkbox group. Search inputs have placeholder text but no explicit `aria-label` by default. Transfer buttons use icon-only buttons (left/right arrows) that need `aria-label` for screen readers ("Move selected to target", "Move selected to source"). Selected count displayed visually in panel headers. No `listbox` role — uses checkbox pattern instead. Custom `aria-label` should be added to the container and each panel for screen reader context.
**Best at:** Feature completeness and enterprise data scenarios — the Table Transfer variant, pagination, search/filter, one-way mode, and custom render cover virtually every transfer use case from simple list assignment to complex multi-column data movement.
**Missing:** Drag-and-drop between panels (checkbox + button only); horizontal/vertical orientation toggle (horizontal-only); keyboard shortcut for bulk move (no Ctrl+A → Enter pattern); tree-structured source (use TreeSelect instead); virtualization for extremely large lists (pagination is the alternative); `aria-label` defaults on transfer buttons and panels.
