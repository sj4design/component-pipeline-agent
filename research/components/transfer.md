---
component: transfer
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Transfer — Research Synthesis (--max)

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| Material Design 3 | Consumer-focused; chip-based multi-select preferred for mobile; dual-list conflicts with Material's simplicity | `List` + `Checkbox` + `IconButton` arrows; or `ChipGroup` with autocomplete |
| Spectrum (Adobe) | Creative workflows use spatial/layer-based selection, not dual-list | `ListView` + `useDrag`/`useDrop` (React Aria primitives, unassembled) |
| Carbon (IBM) | Enterprise gap despite IAM use cases; `FilterableMultiSelect` is the preferred compact alternative | `FilterableMultiSelect` + `StructuredList` for two-zone pattern |
| Polaris (Shopify) | Picker-modal pattern preferred; mobile-first; side-by-side impractical | `ResourcePicker` (modal) for selection + `ResourceList` for assigned items |
| Atlassian | Search-first selection (typeahead pickers) scale better for large user/group directories | `@atlaskit/select` with `isMulti` + async search |
| GitHub Primer | Search-first UX; autocomplete + tag list patterns preferred | Autocomplete + avatar-enriched tag list |
| Twilio Paste | Multi-select Combobox preferred; assignment workflows use modal pickers | Combobox with multi-select |
| shadcn/ui | No official component; community compositions exist | Two ScrollArea + Checkbox groups + Button actions (Radix primitives) |
| Playbook (eBay) | Multi-select tables with bulk actions preferred | Multi-select table with bulk action toolbar |
| REI Cedar | Outdoor retail context has limited bulk assignment use cases | Standard multi-select |
| Wise Design | Financial product uses step-based flows with selection screens | Step-based flow wizard |
| Dell Design System | Not in public docs; likely custom internally | Unknown |
| Radix UI | No primitive; dual-list composed from ScrollArea + Checkbox + Button | Compose from primitives; no recipe |
| Chakra UI | Multi-select handled via CheckboxGroup or Menu | CheckboxGroup pattern |
| GOV.UK | Government forms use checkbox lists with "select all"; multi-page flows for assignment | Checkbox list + multi-page form flow |
| Base Web (Uber) | Internal custom implementations; no abstraction | Custom dual-list |
| Fluent 2 | No dedicated component; admin assignment UIs use custom picker dialogs | Custom picker dialog |
| Gestalt (Pinterest) | Board management uses modal pickers with search | Modal picker |
| Orbit (Kiwi.com) | Single-selection booking flows; dual-list not needed | Not applicable |
| Evergreen (Segment) | Step-based wizard configuration instead of dual-list | Wizard steps |
| Nord (Nordhealth) | Search-based pickers within clinical workflow steps | Search picker |

---

## How Systems Solve It

### Ant Design (Tier 1)

Ant Design's Transfer is the definitive dual-list implementation and the primary reference for this pattern across all tiers. Two side-by-side panels (source and target) with checkboxes per item, bidirectional move buttons in the center, optional search per panel, optional pagination for large datasets, and fully customizable item rendering. The Table Transfer variant composes Transfer with Table, rendering each panel as a sortable, filterable data table—essential for enterprise scenarios where transferred items have multiple columns. One-way mode (`oneWay`) restricts movement to source→target with delete-from-target, simplifying "add to selection" use cases.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Dedicated dual-list component as first-class form control | Full source-target panel layout with center action buttons is the canonical transfer pattern; treating it as a form control (not a widget) means it integrates with form validation, disabled states, and data binding | H | Use as a controlled form field (`targetKeys` + `onChange`); not as a standalone widget |
| Table Transfer variant | Enterprise scenarios often transfer items with multiple columns (name, role, department); a list item per-row cannot show multi-column data | H | Use Table Transfer when items have 3+ attributes that affect selection decisions |
| `showSearch` per panel | Source lists with hundreds of items are unusable without search; finding "João Silva" in a 500-user list by scrolling is not viable | H | Always enable `showSearch` for source lists > 20 items |
| `pagination` for large datasets | Rendering 1000+ checkboxed items causes performance issues; pagination limits DOM nodes | H | Enable pagination when dataset > ~200 items per panel |
| `oneWay` mode | Many "add to selection" use cases only need source→target; the back arrow is a distraction and a potential accidental-remove risk | M | Use `oneWay` for "assign items to group" use cases; bidirectional for "configure two groups" use cases |
| Custom `render` per item | Production transfer lists show rich items (avatar + name + description); plain text labels are demo artifacts | H | Always implement custom `render` for production use |

**Notable Props:** `dataSource: TransferItem[]` · `targetKeys: string[]` · `onChange: (targetKeys, direction, moveKeys) => void` · `showSearch: boolean` · `filterOption: (inputValue, item) => boolean` · `pagination: boolean | { pageSize }` · `oneWay: boolean` · `render: (item) => ReactNode` · `selectAllLabels: [ReactNode, ReactNode]` · `footer: (props, { direction }) => ReactNode` · `listStyle: CSSProperties | (style) => CSSProperties` · per-item `disabled: boolean`

**Accessibility:** Each panel renders as a checkbox group. Search inputs lack explicit `aria-label` by default. Transfer buttons are icon-only (arrows) without `aria-label`—a common failure. Selected count displayed visually in panel headers but not announced. No `listbox` role—uses checkbox pattern. Custom `aria-label` required on container and each panel for screen reader context.

---

### Salesforce Lightning DualListbox (Tier 2)

Lightning's DualListbox is the only dedicated transfer component in Tier 2 and one of the two strongest enterprise implementations (alongside Ant Design). Two panels ("Available Options" / "Selected Options") with bidirectional arrow buttons, search filter for the source list, and up/down reorder buttons in the target list. The reorder capability is Lightning's key differentiator: in many enterprise scenarios (field ordering, column arrangement, priority assignment), the sequence of selected items matters as much as the selection itself. Full form integration: `required`, `disabled`, field-level help text, validation errors, and `max` (maximum selectable count).

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Up/down reorder buttons in target list | In Salesforce, the order of selected fields/columns/priorities has semantic meaning; sequence of selected items is part of the data | H | Include reorder if your use case produces ordered outputs (column order, priority ranking, step sequence) |
| `max` (maximum selection count) | License/role/permission assignment often has hard limits ("assign max 5 roles"); enforced in component, not just validation | M | Implement `max` constraint for quota-limited assignment scenarios |
| Full form integration (`required`, help text, validation) | DualListbox is a form field, not a widget; it participates in form submission, validation, and reset | H | Spec the transfer as a form control with `name`, `required`, and error state |
| Search in source only | Target list is typically short enough to read; search in source only is sufficient | M | If target list can also grow large, add search to target panel (Ant Design does this) |
| Fixed panel names ("Available" / "Selected") | Semantic clarity; users know which panel is the source and which is the target without reading context | M | Provide accessible panel label props; do not rely on visual position alone |

**Notable Props:** `options` · `value` · `onChange` · `requiredOptions` (always selected, cannot remove) · `max: number` · `required: boolean` · `disabled: boolean` · `size: number` (visible items per panel)

**Accessibility:** `role="listbox"` + `aria-multiselectable="true"` on each panel; reorder buttons labeled ("Move up", "Move down"); `aria-describedby` for help text; Lightning's DualListbox meets WCAG AA. Transfer buttons need `aria-label` for icon-only arrows.

---

### Mantine TransferList (Tier 3)

Mantine's TransferList is the third canonical implementation alongside Ant Design and Lightning. Two searchable lists with checkboxes, bidirectional move buttons, `nothingFound` empty state per list, `transferAll` and `transferAllMatchingFilter` for bulk moves, and `itemComponent` for custom item rendering. The data model is a `[left, right]` tuple: `value` is `[sourceData, targetData]`, `onChange` returns the updated tuple. This tuple approach avoids Ant Design's key-based indirection.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `[left, right]` tuple data model | State is simply two arrays; no key-mapping indirection; `onChange([newLeft, newRight])` is unambiguous | H | The tuple model is simpler than Ant Design's `dataSource` + `targetKeys` for most use cases |
| `transferAllMatchingFilter` | When search is active, "move all" only moves filtered items; prevents accidental bulk transfer of hidden items | H | This is a critical UX safeguard; implement for any transfer with search enabled |
| `nothingFound` per panel | Each panel needs distinct empty state messaging ("No users available" vs "No items selected") | M | Specify empty state content as a prop for both panels separately |
| `itemComponent` for custom rendering | Production transfer lists need rich items; plain text is insufficient | H | Match Ant Design's `render` prop; custom rendering is mandatory for production |
| Built-in search by default | Unlike Ant Design's opt-in `showSearch`, Mantine always includes search per panel | M | Search as default is correct for most use cases; add `searchable={false}` escape hatch |

**Notable Props:** `value: [TransferListData[], TransferListData[]]` · `onChange: ([left, right]) => void` · `titles: [string, string]` · `searchPlaceholder: string` · `nothingFound: ReactNode` · `itemComponent: React.FC<ItemComponentProps>` · `filter: (query, item) => boolean` · `breakpoint: string` (responsive stacking)

**Accessibility:** Checkbox groups per panel; search inputs labeled; `aria-live` for filtered counts. Transfer buttons need `aria-label`.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: Controlled dual-panel list with external state**

Rationale: Transfer is a form control that manages two synchronized data sets. The canonical data model is controlled (consumer owns `sourceData`/`targetData` or `targetKeys`); the component renders the panels and move controls. Tuple model (`[left, right]`) is simpler than key-based model (`dataSource + targetKeys`) for most use cases. The component must be controlled rather than uncontrolled because the selection state (what's in source vs. target) is the primary output of the form field.

---

### Slot Consensus Table

| Slot | Consensus | Notes |
|------|-----------|-------|
| `sourcePanel` | 3/3 (all implementations) | Left panel; "Available" items; source list |
| `targetPanel` | 3/3 | Right panel; "Selected" / "Assigned" items; target list |
| `moveToTargetButton` | 3/3 | Center right-arrow button; moves selected source items to target |
| `moveToSourceButton` | 3/3 | Center left-arrow button; moves selected target items back to source |
| `moveAllToTargetButton` | 2/3 | "Move all right" (Ant Design, Mantine) |
| `moveAllToSourceButton` | 2/3 | "Move all left" (Ant Design, Mantine) |
| `sourceSearch` | 3/3 | Filter input in source panel header |
| `targetSearch` | 2/3 | Filter input in target panel header (Ant Design, Mantine) |
| `panelHeader` | 3/3 | Panel title + selection count display |
| `panelFooter` | 1/3 | Custom footer per panel (Ant Design `footer` prop) |
| `itemLabel` | 3/3 | Each item's primary text |
| `itemCheckbox` | 3/3 | Per-item selection checkbox |
| `itemCustomContent` | 2/3 | Custom rich rendering per item (Ant Design `render`, Mantine `itemComponent`) |
| `emptyState` | 2/3 | "No items" content per panel (Ant Design, Mantine `nothingFound`) |
| `reorderUpButton` | 1/3 | Lightning only; moves item up within target list |
| `reorderDownButton` | 1/3 | Lightning only; moves item down within target list |
| `pagination` | 1/3 | Ant Design; paginator per panel |
| `tableHeader` | 1/3 | Ant Design Table Transfer; column headers |

---

### Property Consensus Table

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| `dataSource` / `value` | `TransferItem[] | [left[], right[]]` | 3/3 | Controlled data; either flat array+targetKeys (Ant) or tuple (Mantine) |
| `targetKeys` | `string[]` | 1/3 | Ant Design; keys of items in target panel |
| `onChange` | `(targetKeys, direction, moveKeys) => void` or `([left, right]) => void` | 3/3 | State update callback |
| `showSearch` / `searchable` | `boolean` | 3/3 | Enable search/filter per panel |
| `filterOption` / `filter` | `(inputValue, item) => boolean` | 3/3 | Custom filter function |
| `titles` | `[string, string]` | 3/3 | Panel header labels ("Available", "Selected") |
| `render` / `itemComponent` | `(item) => ReactNode` | 2/3 | Custom item rendering |
| `disabled` | `boolean` | 3/3 | Disable entire component |
| `oneWay` | `boolean` | 1/3 | Ant Design; source→target only |
| `pagination` | `boolean | { pageSize }` | 1/3 | Ant Design |
| `max` | `number` | 1/3 | Lightning; maximum selected count |
| `required` | `boolean` | 1/3 | Lightning; form field requirement |
| `selectAllLabels` | `[ReactNode, ReactNode]` | 1/3 | Ant Design; custom "select all" text per panel |
| `footer` | `(props, { direction }) => ReactNode` | 1/3 | Ant Design; custom footer per panel |
| `listStyle` | `CSSProperties | (style) => CSSProperties` | 1/3 | Ant Design; panel style override |
| `operations` | `[ReactNode, ReactNode]` | 1/3 | Ant Design; custom move button content |
| `nothingFound` | `ReactNode` | 1/3 | Mantine; empty state per panel |
| `breakpoint` | `string` | 1/3 | Mantine; responsive stacking breakpoint |
| `reorderable` | `boolean` | 1/3 | Lightning; enable up/down reorder in target |

---

### Boolean Properties Table

| Property | Default | Systems |
|----------|---------|---------|
| `showSearch` | `false` | Ant Design (opt-in); Mantine (always on) |
| `disabled` | `false` | All |
| `oneWay` | `false` | Ant Design |
| `required` | `false` | Lightning |
| `reorderable` | `false` | Lightning |
| `pagination` | `false` | Ant Design |
| `showSelectAll` | `true` | All |

---

### State Coverage Table

| State | Systems | Notes |
|-------|---------|-------|
| `default` | 3/3 | Resting state |
| `disabled` (item-level) | 3/3 | Per-item `disabled: boolean`; non-transferable items |
| `disabled` (component-level) | 3/3 | Entire component disabled |
| `checked` / `selected` | 3/3 | Item checkbox checked state |
| `checkedAll` | 3/3 | Panel-level select-all state |
| `indeterminate` (select all) | 3/3 | Some but not all items selected in panel |
| `empty` | 2/3 | Panel is empty; `nothingFound` / empty state shown |
| `filtered` | 3/3 | Search/filter applied; filtered count visible |
| `filtered-empty` | 2/3 | Search returns no matches |
| `loading` | 1/3 | Ant Design; items loading asynchronously |
| `max-reached` | 1/3 | Lightning; maximum selection count reached |
| `error` / `invalid` | 1/3 | Lightning; form validation error state |
| `required-but-empty` | 1/3 | Lightning; required field with no selection |

---

### Exclusion Patterns

- **Do not use Transfer for datasets > ~500 items per panel without virtualization or pagination.** Rendering 1000 checkboxed items causes serious performance degradation. Use pagination (Ant Design) or virtualization for large datasets.
- **Do not use Transfer when a multi-select combobox (typeahead) would be more usable.** For large datasets (users, resources) where browsing is impractical and search-first is natural, multi-select combobox is typically more usable and accessible.
- **Do not use Transfer on mobile viewports.** Side-by-side panels require minimum ~600px width. Below that, the pattern degrades significantly. Mantine's `breakpoint` prop stacks panels vertically as a compromise, but the UX is significantly worse.
- **Do not use Transfer for single-select scenarios.** A single-select list or combobox is appropriate; the dual-panel overhead is not justified.
- **Do not use Transfer as the only way to assign critical permissions.** For security-sensitive assignment (admin roles, financial access), consider a step-based confirmation flow rather than a single drag-or-click operation.

---

### Building Block Candidates

- `TransferPanel` — a single panel (source or target) with header, search, item list, and footer
- `TransferItem` — individual row with checkbox + custom content
- `TransferControls` — the center column with move buttons
- `TransferSearch` — the filter input within a panel header
- `TransferPanelHeader` — panel title + selection count indicator
- `TransferEmpty` — empty state for a panel with zero items or zero filtered results

---

### Enum / Configuration Properties

| Property | Values |
|----------|--------|
| `direction` (in onChange) | `"left"` \| `"right"` |
| `size` | `"sm"` \| `"md"` \| `"lg"` |
| `listHeight` | `number` (px; defaults vary: Ant=200, Mantine=230) |
| `status` (form field) | `"default"` \| `"error"` \| `"warning"` |

---

### A11y Consensus

| Attribute | Value | Rationale |
|-----------|-------|-----------|
| Source panel | `role="listbox"` + `aria-multiselectable="true"` + `aria-label="Available options"` | Panel must be identified and role declared |
| Target panel | `role="listbox"` + `aria-multiselectable="true"` + `aria-label="Selected options"` | Distinct label from source panel |
| Transfer buttons | `aria-label="Move selected to target"` / `aria-label="Move selected to source"` | Icon-only arrows are a critical a11y failure without labels |
| Move-all buttons | `aria-label="Move all to target"` / `aria-label="Move all matching filter to target"` | Distinct label when filter is active |
| Selected count | `aria-live="polite"` announce after move: "3 items moved. 12 available, 8 selected." | Screen readers cannot see visual count changes |
| Search input | `aria-label="Search available options"` / `aria-label="Search selected options"` | Each panel's search needs a distinct label |
| Search result count | `aria-live="polite"`: "5 matching items" | Announce filter results |
| Reorder buttons | `aria-label="Move up"` / `aria-label="Move down"` + announce position after move | Standard button labels; position feedback via live region |
| Disabled items | `aria-disabled="true"` + `aria-describedby` with reason | Reason for non-transferability should be available |
| Keyboard navigation | Tab between panels and buttons; Arrow keys within panel; Space to check; Enter to activate button | Two-panel layout requires clear tab order: source → buttons → target |
| APG pattern | No specific "Transfer" APG pattern; closest is dual Listbox + Button pattern | Use `role="listbox"` per panel per WAI-ARIA spec |

---

## What Everyone Agrees On

1. **Transfer is an enterprise/power-user pattern.** Only 3 of 24 systems implement it (Ant Design, Lightning, Mantine). The extreme rarity reflects that the dual-list pattern is a specialized tool suited to specific scenarios, not a general-purpose selection component.
2. **Search/filter is mandatory for source lists > 20 items.** All three implementations either enable search by default (Mantine) or prominently feature it (Ant Design `showSearch`, Lightning always-on). Without search, the transfer component is only usable for very short lists.
3. **Custom item rendering is essential for production use.** All three implementations provide `render` / `itemComponent` / override capability. Plain text transfer lists are demos; production use requires rich items with metadata.
4. **The source list must show what has NOT been selected.** This is the fundamental value proposition of transfer over multi-select combobox: users can see all available items and all selected items simultaneously. This simultaneous visibility is when the pattern is worth its visual complexity.
5. **Select-all per panel is universally required.** All three implementations provide a panel-level "select all" checkbox. For bulk operations (move all users from department X), select-all is the primary time-saving feature.
6. **Disabled items (non-transferable) must be visually differentiated.** Items that cannot be moved (system defaults, required items, permission restrictions) must be visually distinct from movable items and explained via `aria-describedby`.

---

## Where They Disagree

### 1. Data model: key-based vs. tuple
- **Option A — `dataSource` + `targetKeys` (Ant Design):** A flat array of all items + an array of keys for items in the target panel.
  - Adopters: Ant Design
  - Upside: Standard React list-with-selection pattern; clear separation of "all items" from "selected items"
  - Downside: Mental indirection—you must cross-reference `dataSource` with `targetKeys` to know what's in each panel; key uniqueness required
  - Para tu caso: Best when the "full catalog" is fetched once from an API and "selection" is a subset

- **Option B — `[left, right]` tuple (Mantine):** Two separate arrays; `onChange` returns the updated tuple.
  - Adopters: Mantine
  - Upside: No indirection; each panel's data is immediately available; simpler mental model
  - Downside: Moving an item requires removing from one array and adding to the other; consumer manages this in `onChange`
  - Para tu caso: Best when both panels can grow/shrink independently and "source" items are not fixed

### 2. One-way vs. bidirectional
- **Option A — Bidirectional (default for all systems):** Items can move in both directions.
  - Upside: Full flexibility; user can correct mistakes; matches classic "shuttle" UX
  - Downside: Back-arrow is a risk if accidental removal has consequences

- **Option B — One-way mode (Ant Design `oneWay`):** Source→target only; remove from target via delete action.
  - Upside: Simpler UX for "add to collection" use cases; no accidental bulk-remove risk
  - Downside: Removing all items from target requires deleting one by one unless "remove all" is added
  - Para tu caso: Use `oneWay` for "add items to group/collection" scenarios; bidirectional for "configure two groups" scenarios

### 3. Reordering within target
- **Option A — Reorderable target list (Lightning DualListbox):** Up/down buttons allow changing sequence of selected items.
  - Adopters: Lightning only
  - Upside: Essential when the ORDER of selected items matters (column order, priority sequence, step order)
  - Downside: Additional UI complexity; not needed for most selection scenarios
  - Para tu caso: Include if your use case produces an ordered output (column configuration, form field order, workflow sequence)

- **Option B — No reorder (Ant Design, Mantine):** Items appear in order they were added.
  - Upside: Simpler; sufficient when order doesn't matter
  - Downside: Users cannot easily adjust sequence without removing and re-adding items
  - Para tu caso: Default choice; add reorder only when explicitly needed

### 4. Table Transfer variant
- **Option A — Table Transfer (Ant Design):** Each panel renders as a data table with column headers, sorting, and filtering.
  - Adopters: Ant Design only
  - Upside: Essential for multi-column items (users with name/role/department); sortable and filterable
  - Downside: Significantly more complex; column configuration required; performance with large tables
  - Para tu caso: Use for enterprise scenarios where items have 3+ attributes that affect selection decisions

- **Option B — List Transfer only (Mantine, Lightning):** Each panel is a simple list with optional custom item rendering.
  - Upside: Simpler; sufficient when items have 1–2 display attributes
  - Downside: Multi-column data is cramped in a single-line list item
  - Para tu caso: Default; implement custom `render` for multi-attribute items before resorting to Table Transfer

### 5. Transfer vs. multi-select combobox (architectural decision)
- **Option A — Transfer (dual-list):** Side-by-side source and target with explicit move actions.
  - Upside: Simultaneous visibility of available and selected items; clear "what's left" vs. "what's chosen"
  - Downside: Space-intensive; fails on mobile; impractical for large datasets; complex a11y
  - Para tu caso: Use when: source is browsable (< ~200 items), users need to see "what hasn't been selected" to make decisions, and ordering of selected items matters

- **Option B — Multi-select combobox/autocomplete with tag display:** Search-first selection; selected items shown as tags.
  - Upside: Space-efficient; mobile-friendly; scales to unlimited dataset size; well-understood UX pattern
  - Downside: No simultaneous visibility of remaining unselected items; harder to "survey" what's available
  - Para tu caso: Use when dataset is large (> 200 items), mobile support is needed, or "scan remaining options" is not a decision requirement

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Classic dual-list with center buttons | Two panels side by side; arrow buttons in center; checkboxes per item | General-purpose assignment | Ant Design, Mantine, Lightning |
| Search-per-panel header | Filter input in each panel header; real-time filtering | Any source list > 20 items | Ant Design, Mantine, Lightning |
| Table Transfer | Each panel as sortable data table | Multi-column enterprise items | Ant Design only |
| Reorderable target | Up/down buttons in target panel | Ordered output (columns, priorities) | Lightning only |
| One-way with item delete | Source→target only; ✕ to remove from target | "Add to collection" scenarios | Ant Design (`oneWay`) |
| Modal picker alternative | Selection in modal overlay; assigned items in card/list | Mobile-first, large datasets | Polaris ResourcePicker |
| Multi-select combobox + tags | Type-to-search; selected as removable tags | Large datasets, mobile-friendly | Most systems without Transfer |

### ASCII Wireframes

**Standard dual-list transfer:**
```
┌──────────────────────────────────────────────────────────────┐
│  Assign Users to Group                                       │
│                                                              │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │ Available (12)        │       │ Selected (3)          │  │
│  │ ┌───────────────────┐ │       │ ┌───────────────────┐ │  │
│  │ │ 🔍 Search...      │ │       │ │ 🔍 Search...      │ │  │
│  │ └───────────────────┘ │       │ └───────────────────┘ │  │
│  │ ☑ Select all (4 sel) │  [▶]  │ ☑ Select all          │  │
│  │ ──────────────────── │  [▶▶] │ ──────────────────── │  │
│  │ ☐  Alice Chen        │  [◀]  │ ☑  Bob Martinez       │  │
│  │ ☑  Carol Davis       │  [◀◀] │ ☐  David Kim          │  │
│  │ ☑  Emma Wilson       │       │ ☐  Fiona Taylor       │  │
│  │ ☑  George Brown      │       │                       │  │
│  │ ☐  Helen Jones       │       │                       │  │
│  └───────────────────────┘       └───────────────────────┘  │
│  ▶ = Move selected right    ▶▶ = Move all right             │
│  ◀ = Move selected left     ◀◀ = Move all left              │
└──────────────────────────────────────────────────────────────┘
```

**One-way mode (source → target, delete from target):**
```
┌──────────────────────────────────────────────────────────┐
│  Add Permissions                                         │
│                                                          │
│  ┌───────────────────┐       ┌───────────────────────┐  │
│  │ Available         │  [▶]  │ Assigned              │  │
│  │ ☐  Read           │       │  Read files       [✕] │  │
│  │ ☑  Write          │       │  Write files      [✕] │  │
│  │ ☐  Delete         │       │                       │  │
│  │ ☐  Admin          │       │                       │  │
│  └───────────────────┘       └───────────────────────┘  │
│  (no ◀ button; remove via [✕] in target)                 │
└──────────────────────────────────────────────────────────┘
```

**Table Transfer (multi-column items):**
```
┌────────────────────────────────────────────────────────────────┐
│  Configure Report Columns                                      │
│                                                                │
│  ┌──────────────────────────┐       ┌───────────────────────┐ │
│  │ Available Columns (8)    │  [▶]  │ Selected (3)          │ │
│  │ Name ▲   Type   Width    │  [▶▶] │ Name ▲   Type   Width │ │
│  │ ──────   ────   ─────    │  [◀]  │ ──────   ────   ───── │ │
│  │ ☐ Status  text  120px    │  [◀◀] │ ☑ ID      num  60px   │ │
│  │ ☐ Owner   text  200px    │       │ ☑ Name    text  200px  │ │
│  │ ☑ Priority num  80px     │       │ ☑ Created date  120px  │ │
│  └──────────────────────────┘       └───────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

**Reorderable target list (Lightning DualListbox):**
```
┌──────────────────────────────────────────────────────────┐
│  Field Order                                             │
│                                                          │
│  ┌───────────────────┐       ┌───────────────────────┐  │
│  │ Available         │  [▶]  │ Selected (ordered)    │  │
│  │ ☐  Status         │  [▶▶] │  1. First Name  [↑][↓]│  │
│  │ ☐  Priority       │  [◀]  │  2. Last Name   [↑][↓]│  │
│  │ ☑  Email          │  [◀◀] │  3. Department  [↑][↓]│  │
│  └───────────────────┘       └───────────────────────┘  │
│  [↑][↓] = Up/Down reorder in target                     │
└──────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

**RISK 1 — Missing aria-labels on transfer buttons (HIGH)**
Icon-only arrow buttons (▶ ◀ ▶▶ ◀◀) without `aria-label` are the most common accessibility failure in transfer implementations. All three canonical implementations (Ant Design, Lightning, Mantine) have varying degrees of this problem. A screen reader user pressing Tab to reach the center buttons hears only "button" with no context.
*Mitigation:* Require `aria-label` on all four move buttons as non-optional props or default to descriptive values ("Move selected items to target", "Move all items to target", "Move selected items to source", "Move all items to source"). When `oneWay` mode is active, hide the back-direction buttons from the DOM entirely.

**RISK 2 — Mobile unusability (HIGH)**
Side-by-side panels require minimum ~600px viewport width. On mobile, the Mantine `breakpoint` stacking fallback (panels stack vertically) still results in a poor UX: the user must scroll down past the entire source panel to see the target, with buttons in between. No system has solved this gracefully.
*Mitigation:* Do not use Transfer on primary mobile UX. Define a responsive breakpoint below which the component renders a mobile-friendly picker modal instead (ResourcePicker-style, Polaris approach). Document this breakpoint explicitly in the spec.

**RISK 3 — Performance with large datasets (MEDIUM)**
Rendering 500+ checkboxed items in the DOM causes reflow, memory pressure, and slow scrolling. Ant Design's `pagination` is a workaround, not a solution—paginating a list the user is trying to scan defeats the "see all available items" value proposition of the transfer pattern.
*Mitigation:* Implement virtual scrolling for lists > 200 items (none of the canonical implementations do this natively; it requires custom integration). Set a practical limit in the spec: "Transfer is recommended for source lists under 300 items. For larger datasets, use a searchable multi-select combobox."

**RISK 4 — Accidental bulk transfer with active filter (MEDIUM)**
If the user has filtered the source list to show 5 of 300 items and clicks "Move all", they may expect to move only the 5 visible items. If "Move all" moves all 300 items (including hidden ones), it is a destructive surprise. Mantine's `transferAllMatchingFilter` solves this correctly; Ant Design's behavior must be verified.
*Mitigation:* Specify that "Move all" when a filter is active ONLY moves filtered/visible items. Rename the button to "Move all visible" or "Move matching" when filter is active. Test this edge case explicitly in implementation.

---

## Next Steps

1. **Decide on data model: key-based (Ant Design) vs. tuple (Mantine).** Key-based is better for "select from a fixed catalog" use cases; tuple is better for "split items between two groups." This decision drives the entire component API.
2. **Determine if reordering is required.** If the use case produces an ordered output (column order, role priority, step sequence), Lightning's reorder model must be included. This significantly increases component complexity.
3. **Define the mobile strategy.** Either document "Transfer is desktop-only" or specify a responsive mobile alternative (picker modal) with a breakpoint toggle.
4. **Specify Table Transfer vs. list-only.** If items have multiple columns, decide whether to compose Transfer + DataGrid (Ant Design pattern) or implement richer list item rendering only.
5. **Implement virtual scrolling boundary.** Set the maximum recommended item count in the spec; document what to use instead for larger datasets (multi-select combobox reference).
6. **Audit aria-labels on all action buttons.** Define the default `aria-label` strings for all four move buttons as part of the spec; do not leave them to implementors.
