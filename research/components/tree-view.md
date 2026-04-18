---
component: tree-view
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Tree View — Research Synthesis (--max)

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| Material Design 3 (core) | Hierarchical navigation is considered app-level, not a DS primitive; platform-specific patterns preferred | MUI X RichTreeView (commercial, outside M3 boundary) |
| Polaris (Shopify) | Merchant UIs avoid deep hierarchies by design; cognitive load reduction | `Navigation` with `subNavigationItems` (one-level only) |
| Atlassian (public ADS) | Tree requirements differ dramatically per product (Jira/Confluence/Bitbucket); no single component could serve all | Product-level implementations using `@atlaskit/primitives` |
| Radix UI | WAI-ARIA TreeView pattern complexity deferred; `aria-level`/`aria-setsize`/`aria-posinset` + keyboard navigation complexity | Nested `Collapsible` or `Accordion` composition |
| Chakra UI | No tree component; defers to composition | Nested Accordion or custom components with manual ARIA |
| GOV.UK | No generic tree; Step-by-step navigation is journey orchestration, not interactive tree | Step-by-step navigation (sequential only) |
| Gestalt (Pinterest) | Visual-grid product has no hierarchical tree navigation need | No equivalent |
| Playbook (eBay) | Flat lists and breadcrumb navigation for category hierarchies | Flat list + breadcrumb |
| REI Cedar | E-commerce focus; category navigation uses flat accordion patterns | Flat accordion |
| Wise Design | Financial product UI has flat navigation | Flat navigation |
| Orbit (Kiwi.com) | Travel booking UI doesn't require hierarchical trees; Itinerary is domain-specific | Domain-specific Itinerary component |
| Evergreen (Segment) | Analytics dashboard uses flat data tables | Flat tables |
| Nord (Nordhealth) | No generic tree; `nord-nav-group` provides one-level collapsible navigation only | `nord-nav-group` (one level) |

---

## How Systems Solve It

### Spectrum / React Aria (Tier 1)

Spectrum's TreeView is built on React Aria's collection API—the same foundation as ListBox, ComboBox, and Table. Items are declared via `<TreeViewItem>` children or dynamic collections with `items` prop. The component follows the WAI-ARIA TreeView pattern with full arrow key support plus type-ahead character navigation. A key distinction is the separation of `onAction` (primary item activation—open file, navigate) from `selectionMode` (checkbox or highlight selection)—most systems conflate these two distinct operations.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Collection API (React Aria foundation) | Automatic key management, virtualization support, and shared keyboard interaction model with other collection components | H | Use this as the reference for tree-as-data-collection (as opposed to tree-as-navigation) |
| Separation of `onAction` vs. selection | "Open file" (action) and "select file" (selection) are distinct; many users expect click = open, not click = select | H | Specify whether tree items are primarily navigated (action) or selected (for batch operations) before spec |
| `selectionStyle: "checkbox" | "highlight"` | Checkboxes for explicit multi-select (file backup, permission trees); highlight for single-item navigation focus | M | Checkboxes for batch operations; highlight for navigation trees |
| `expandedKeys` / `defaultExpandedKeys` | Controlled + uncontrolled patterns for expand state | M | Provide both controlled and uncontrolled for flexibility |

**Notable Props:** `selectionMode: "single" | "multiple" | "none"` · `selectionStyle: "checkbox" | "highlight"` · `expandedKeys` / `defaultExpandedKeys` · `onExpandedChange` · `onAction` · `disabledKeys` · item `textValue` for type-ahead

**Accessibility:** `role="tree"` / `role="treeitem"`. `aria-expanded` on expandable nodes. `aria-selected` for selection. Full WAI-ARIA TreeView keyboard pattern (Up/Down/Left/Right/Home/End). Type-ahead character navigation.

---

### Carbon / IBM (Tier 1)

Carbon's TreeView provides `TreeView` container + `TreeNode` children. Branch vs. leaf is structural (children present = branch; no children = leaf). Single selection only. Three sizes (xs/sm/default) at 24/32/40px—the densest tree in all tiers at xs. Designed for file system navigation and settings hierarchies in IBM Cloud products.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Explicit branch vs. leaf distinction | `TreeNode` with children = expandable branch; without = leaf; no separate component needed; structural | M | Structural inference is simpler than explicit `type` prop; children presence determines behavior |
| Single selection only (deliberate scope limit) | IBM's navigation use cases are single-select (navigate to a page/resource); multi-select adds complexity not needed for navigation trees | H | If you need checkbox/multi-select, look at Ant Design or Spectrum instead |
| Size scale: xs (24px) / sm (32px) / default (40px) | Matches Carbon's global density scale; xs is the densest tree anywhere in Tier 1 | M | Use xs for deeply nested file browsers or settings trees with many nodes visible simultaneously |
| `label` required + `value` on TreeNode | Clear API for the display text vs. the data value | M | Separate display label from data value in all tree node data models |

**Notable Props:** `selected` / `onSelect` on TreeView · `isExpanded` / `onToggle` on TreeNode · `label: string` (required) · `value: string` · `size: "xs" | "sm"` on TreeView · `renderIcon: ComponentType` for custom leading icon

**Accessibility:** `role="tree"` / `role="treeitem"`. `aria-expanded` on branches. Arrow key navigation (Up/Down to move, Left to collapse/go to parent, Right to expand/go to first child). `aria-selected` for active node.

---

### Ant Design (Tier 1)

Ant Design provides the most feature-complete tree in Tier 1. `Tree` supports expand/collapse, single/multiple selection, checkbox selection with optional `checkStrictly` (decouple parent-child cascading), drag-and-drop reorder, async loading via `loadData`, virtual scrolling for large datasets, and custom node rendering. `DirectoryTree` is a pre-configured variant for file browser UIs with expand-on-click for folders, single-click for files, and built-in file/folder icons. `showLine` toggles visual connector lines between nodes.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `checkable` + `checkStrictly` | Checkbox mode with opt-in independent parent/child checking—critical for permission trees where parent selection shouldn't force child selection | H | `checkStrictly: false` = cascade checking (files in folder); `checkStrictly: true` = independent checking (permissions) |
| `loadData` async children | Lazy-load children on expand with built-in loading spinner per node—essential for server-driven trees with thousands of nodes | H | Required for any tree backed by a server; eliminates manual loading state management |
| `DirectoryTree` variant | Pre-configured for file system UIs; expand-on-double-click for folders; single-click for files; built-in icons | H | Use `DirectoryTree` for any file/folder navigation; reduces configuration significantly |
| `draggable` + `onDrop` | Full drag-and-drop reorder with `dropPosition` (-1/0/1) indicating before/inside/after the drop target | M | Include only if tree reordering is an explicit product requirement |
| `showLine` prop | Toggle tree connector lines (vertical lines showing parent-child relationships visually) | M | Enable for trees with complex hierarchies; disable for compact navigation trees |
| `virtual` (windowed rendering) | Tree virtualization for large datasets (thousands of nodes) | H | Enable for any tree that may grow beyond ~200 visible nodes |
| `fieldNames` | Custom data field mapping (`{ title: 'name', key: 'id', children: 'items' }`) so your API response shape works directly | M | Use when your API response doesn't use `title`/`key`/`children` field names |

**Notable Props:** `checkable: boolean` · `checkStrictly: boolean` · `loadData: (node) => Promise<void>` · `draggable: boolean | { icon, nodeDraggable }` · `showLine: boolean` · `virtual: boolean` · `fieldNames: { title, key, children }` · `switcherIcon: ReactNode` · `treeData: DataNode[]` or `<TreeNode>` children

**Accessibility:** `role="tree"` / `role="treeitem"`. `aria-expanded`. Arrow key navigation. `aria-checked` for checkbox mode. Some community reports of incomplete screen reader announcements for drag-and-drop operations.

---

### Salesforce Lightning (Tier 2)

Lightning provides `Tree` for general-purpose hierarchical data display and `TreeGrid` for tabular hierarchical data (rows with columns). Tree supports expand/collapse and single selection with `metatext` per node. TreeGrid is notable—it renders a tree where each node is a row with multiple columns, combining the hierarchy of a tree with the data density of a table. Most appropriate for enterprise admin UIs where hierarchical data has multiple attributes.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `TreeGrid` variant (tree + table columns) | Enterprise admin hierarchies have multi-column data (name, status, last-modified, size); flat tree item cannot accommodate this | H | Use TreeGrid reference when tree items have 3+ attributes that need column alignment |
| Single selection only in Tree | Salesforce navigation trees are single-select (navigate to a record); multi-select is a separate concern | M | Match Carbon; single-select is sufficient for navigation-oriented trees |
| `metatext` per node | Secondary text per tree item without custom rendering; summary info below the label | M | Provide a `description` or `subtitle` slot per node as a near-universal need |

**Notable Props:** `items` (nested array) · `onselect` · `expanded`/`expand-all` · `metatext` per item

**Accessibility:** `role="tree"` / `role="treeitem"`. `aria-expanded`. Arrow key navigation. Lightning's tree follows the ARIA TreeView pattern.

---

### GitHub Primer (Tier 2)

Primer's TreeView is explicitly a navigation component, designed for GitHub's file explorer, repository sidebar, and pull request file tree. The `current` prop indicates the active page in navigation context (`aria-current="page"`). `TreeView.SubTree` accepts a `state: "loading" | "done" | "error"` prop with built-in loading spinner and error retry affordance—the most explicit async loading pattern in any tier. Items support `href` for navigation and `onSelect` for selection.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `aria-current="page"` for navigation trees | Navigation trees indicate the active page; `aria-selected` is for data tree selection; `aria-current` is for navigation context | H | For navigation-oriented trees, use `aria-current`; for data selection trees, use `aria-selected` |
| `SubTree.state: "loading" | "done" | "error"` | Explicit async states per subtree; error with retry affordance; not just a loading spinner | H | This is the best async loading pattern for trees; adopt it directly |
| Purpose-built for file trees | `leadingVisual` (file/folder icon), `trailingVisual` (additional context), `onSelect` = open file | H | File/folder icons as the primary tree leading visual is near-universal for file browser trees |

**Notable Props:** `TreeView.SubTree state` · `current: boolean` · `leadingVisual` · `trailingVisual` · `href` · `onSelect`

**Accessibility:** `role="tree"` / `role="treeitem"`. `aria-expanded`. `aria-current="page"` for navigation. Full arrow key navigation.

---

### Twilio Paste (Tier 2)

Paste provides a collection-based tree using React Aria's foundation. `TreeItem` with expandable branches. Single/multi selection. Bridges navigation (with `href` on TreeItem) and data selection use cases. Inherits React Aria's complete keyboard navigation.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| React Aria collection model | Same foundation as Spectrum; full keyboard navigation and ARIA inherited | H | Use when already on the React Aria/Spectrum ecosystem |
| Dual-purpose: navigation + selection | `href` for navigation; `onSelect` for data; same component serves both | M | Define the primary use case explicitly to avoid ambiguity in tree item interaction |

---

### Base Web / Uber (Tier 3)

Base Web's TreeView uses the signature override model: every sub-element (TreeLabel, TreeNode, icon, toggle) is overridable via the `overrides` prop. Most customizable tree in T3 but requires the most configuration. Single selection; expand/collapse. Override-based customization allows deep visual control without forking the component.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Override model for customization | Uber's brand requirements vary across products; override model allows visual divergence without forks | M | Use override model for systems where deep visual customization is the primary requirement |
| Single selection | Navigation use case; consistent with Carbon/Lightning | M | |

**Notable Props:** `overrides: { Root, TreeLabel, TreeNode, IconContainer, ToggleButton }` · `getId` · `onToggle` · `isExpanded` · `getChildNodes`

**Accessibility:** `role="tree"` / `role="treeitem"`. `aria-expanded`. Arrow key navigation.

---

### Fluent 2 / Microsoft (Tier 3)

Fluent 2's Tree is the most production-tested T3 implementation, built for VS Code's file explorer, Outlook's folder tree, and Teams' channel navigation. Supports nested `TreeItem` composition with `itemType="branch" | "leaf"` distinction. Open/close state management. Automatic `aria-level`, `aria-setsize`, and `aria-posinset` based on tree structure—these positional ARIA attributes are critical for screen reader announcements ("item 3 of 5, level 2") and are missing from most other implementations.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `itemType: "branch" | "leaf"` | Explicit type vs. structural inference (Carbon); makes the intent clear in JSX | M | Either approach works; explicit type slightly clearer in static trees |
| Automatic positional ARIA (`aria-level`, `aria-setsize`, `aria-posinset`) | These are required by WAI-ARIA TreeView spec but complex to compute; Fluent handles automatically | H | This is a significant a11y advantage; most other trees leave these to consumers |
| Appearance tokens for density variants | Integrates with Fluent's token system for compact/default/spacious density | M | |

**Notable Props:** `Tree` · `TreeItem` with `itemType: "branch" | "leaf"` · `open` / `defaultOpen` · `selectionMode: "single" | "multiselect" | "none"` · `appearance: "subtle" | "transparent"`

**Accessibility:** Best T3 a11y. Automatic positional ARIA. Full WAI-ARIA TreeView keyboard pattern. `aria-current` for navigation trees.

---

### Mantine (Tier 3)

Mantine's Tree uses a data-driven approach: the entire tree is defined by a `data` prop (nested array of `{ label, value, children }` objects). Easy to render server-driven trees. Checkbox selection with `checkboxes` prop + parent-child cascading (matching Ant Design's `checkable`). Custom node rendering via `renderNode` escape hatch.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Data-driven `data` prop (not JSX children) | Server-driven trees are the norm; specifying tree shape via JSX requires manual recursion | H | Data-driven is simpler for API-backed trees; `renderNode` handles customization |
| `checkboxes` prop with parent-child cascading | Same feature as Ant Design's `checkable`; matching feature with simpler API | M | Use for permission trees, file selection |
| `renderNode` escape hatch | Custom node content when default label is insufficient | H | Always provide `renderNode` capability; production trees always need custom nodes |

**Notable Props:** `data: TreeNodeData[]` · `tree: UseTree` (hook for state management) · `renderNode: (payload) => ReactNode` · `checkboxes: boolean` · `expandedState` / `checkedState` via `useTree` hook

**Accessibility:** `role="tree"` / `role="treeitem"`. `aria-expanded`. Keyboard navigation. Does not document positional ARIA attributes as thoroughly as Fluent 2.

---

### MUI X RichTreeView (outside M3 boundary)

The most feature-complete React tree implementation. `multiSelect`, `checkboxSelection`, `experimentalFeatures.labelEditing` for inline node label editing, drag-and-drop. Dual paradigm: `TreeView` (JSX children composition) and `RichTreeView` (data-driven `items` array API). Commercially licensed (MUI X). Not part of M3 design system but widely referenced.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `TreeView` (JSX) + `RichTreeView` (data-driven) | Two paradigms for different complexity levels; JSX for custom nodes; data-driven for standard trees | H | Offering both paradigms is valid; most teams choose one and stick with it |
| `experimentalFeatures.labelEditing` | Inline node label editing (rename files); not available in any other system | M | Include only if file renaming or node renaming is an explicit requirement |
| `checkboxSelection` | Checkbox mode for multi-select | M | |

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: Data-driven tree with JSX composition escape hatch**

Rationale: Production trees are almost always server-driven (API response → tree nodes). A `data` or `items` array API is the primary interface (Mantine, Ant Design, MUI X, Lightning). A JSX composition escape hatch (`<TreeNode>` children) handles custom node types and static trees (Ant Design, Carbon, Fluent 2). The component must support both. Single selection is the default; checkbox/multi-select is opt-in.

---

### Slot Consensus Table

| Slot | Consensus | Notes |
|------|-----------|-------|
| `label` / `title` | 11/11 systems | Required display text per node |
| `leadingIcon` / `icon` | 8/11 systems | Icon before the label (file/folder icon, status icon) |
| `expandToggle` / `switcherIcon` | 10/11 systems | The expand/collapse control (chevron, caret, +/- icon) |
| `trailingVisual` / `actions` | 5/11 systems | Content after the label (count badge, action button, metatext) |
| `children` / `subtree` | 11/11 systems | Nested child nodes |
| `checkbox` | 5/11 systems | Checkbox for multi-select mode |
| `loadingIndicator` | 4/11 systems | Spinner during async child loading |
| `errorState` | 2/11 systems | Error content for failed async loading (Primer, Fluent 2) |
| `connectorLine` | 3/11 systems | Visual lines connecting parent-child nodes (Ant `showLine`, Carbon, Fluent) |
| `description` / `metatext` | 3/11 systems | Secondary text below label (Lightning metatext, Carbon, Primer trailingVisual) |

---

### Property Consensus Table

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| `data` / `items` / `treeData` | `TreeNode[]` (nested) | 7/11 | Data-driven tree input |
| `defaultExpandedKeys` | `string[]` | 8/11 | Initially expanded node keys |
| `expandedKeys` | `string[]` | 6/11 | Controlled expanded state |
| `onExpandedChange` / `onToggle` | `(keys, node) => void` | 9/11 | Expand/collapse callback |
| `selectedKeys` / `selected` | `string[]` | 8/11 | Controlled selection |
| `defaultSelectedKeys` | `string[]` | 6/11 | Initial selection |
| `onSelect` | `(keys, node) => void` | 10/11 | Selection callback |
| `selectionMode` | `"single" \| "multiple" \| "none"` | 5/11 | Selection behavior |
| `checkable` / `checkboxes` | `boolean` | 4/11 | Enable checkbox mode |
| `checkStrictly` | `boolean` | 2/11 | Ant Design; decouple parent-child check cascading |
| `draggable` | `boolean` | 3/11 | Enable drag-and-drop reorder |
| `onDrop` | `({ dragNode, dropNode, dropPosition }) => void` | 2/11 | Drop callback |
| `loadData` | `(node) => Promise<void>` | 4/11 | Async children loading |
| `showLine` | `boolean` | 3/11 | Visual connector lines |
| `virtual` | `boolean` | 2/11 | Windowed rendering for large trees |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | 3/11 | Node height density |
| `fieldNames` | `{ title, key, children }` | 1/11 | Ant Design; custom field name mapping |
| `switcherIcon` / `expandIcon` | `ReactNode` | 5/11 | Custom expand/collapse icon |
| `renderNode` / `render` | `(node) => ReactNode` | 5/11 | Custom node rendering |
| `disabledKeys` | `string[]` | 6/11 | Non-interactable nodes |
| `onAction` | `(key, node) => void` | 2/11 | Spectrum; primary action separate from selection |
| `current` | `boolean` (per node) | 1/11 | Primer; marks active navigation page |

---

### Boolean Properties Table

| Property | Default | Systems |
|----------|---------|---------|
| `checkable` | `false` | Ant Design, Mantine |
| `checkStrictly` | `false` | Ant Design |
| `draggable` | `false` | Ant Design, MUI X |
| `showLine` | `false` | Ant Design |
| `virtual` | `false` | Ant Design |
| `multiple` / `multiSelect` | `false` | MUI X, Spectrum (via selectionMode) |
| `expandAll` | `false` | Some systems |
| `disabled` (node-level) | `false` | All |
| `checkboxSelection` | `false` | MUI X |

---

### State Coverage Table

| State | Systems | Notes |
|-------|---------|-------|
| `default` | All | Resting state |
| `expanded` | All | Node children visible |
| `collapsed` | All | Node children hidden |
| `selected` | All | Node highlighted/active |
| `checked` | 5/11 | Checkbox checked (multi-select mode) |
| `indeterminate` | 4/11 | Partial child selection (checkbox mode) |
| `focused` | All | Keyboard focus ring |
| `hover` | All | Mouse hover |
| `disabled` | 8/11 | Non-interactable node |
| `loading` | 4/11 | Async children being fetched |
| `error` | 2/11 | Async loading failed (Primer, Fluent 2) |
| `dragging` | 3/11 | Node being dragged |
| `dragOver` | 2/11 | Drop target highlighted |
| `current` / `active-page` | 2/11 | Navigation tree active page (Primer `aria-current`) |
| `leaf` | All | Node with no children (cannot expand) |
| `branch` | All | Node with children (expandable) |

---

### Exclusion Patterns

- **Do not use TreeView for flat lists.** If your hierarchy is only 1 level deep, a standard list or accordion is simpler and better. Tree overhead (ARIA roles, keyboard navigation) is not justified for flat data.
- **Do not use TreeView for sequential processes.** Steps (ProgressIndicator, Wizard) are the correct component for ordered sequential tasks. TreeView implies an explorable hierarchy, not a linear path.
- **Do not use TreeView for large datasets without virtualization.** Rendering 2000+ tree nodes causes significant DOM performance issues. Enable `virtual` scrolling for any tree that may grow beyond ~300 visible nodes.
- **Do not use TreeView for primary mobile navigation.** Tree keyboard navigation is designed for desktop; the touch target density of tree nodes at small sizes is challenging on mobile. Consider flat accordion navigation on mobile viewports.
- **Do not conflate "navigate to" with "select."** If clicking a tree item both navigates AND selects it, users with AT will encounter confusing compound behavior. Separate `onAction` (navigate, open) from `onSelect` (multi-select, batch operation).

---

### Building Block Candidates

- `TreeRoot` / `Tree` — the container with `role="tree"` and keyboard navigation handler
- `TreeItem` / `TreeNode` — individual node with `role="treeitem"`
- `TreeNodeContent` — the visual content of a node (icon + label + trailing elements)
- `TreeToggle` — the expand/collapse trigger (chevron button)
- `TreeGroup` / `SubTree` — the child container with `role="group"`
- `TreeConnectorLine` — decorative vertical line (CSS pseudo-element or explicit element)
- `TreeLoadingState` — per-node loading spinner for async children
- `TreeErrorState` — per-node error with retry action (Primer pattern)

---

### Enum / Configuration Properties

| Property | Values |
|----------|--------|
| `selectionMode` | `"single"` \| `"multiple"` \| `"none"` |
| `selectionStyle` | `"checkbox"` \| `"highlight"` |
| `size` | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` |
| `itemType` | `"branch"` \| `"leaf"` |
| `dropPosition` | `"-1"` (before) \| `"0"` (inside) \| `"1"` (after) |
| `subtreeState` | `"loading"` \| `"done"` \| `"error"` |
| `appearance` | `"subtle"` \| `"transparent"` \| `"outline"` |

---

### A11y Consensus

| Attribute | Value | Rationale |
|-----------|-------|-----------|
| Root container | `role="tree"` + `aria-label="[Tree name]"` | Required; identifies the tree region |
| Each node | `role="treeitem"` | WAI-ARIA specification |
| Child group | `role="group"` wrapping children of a branch node | Groups children under their parent in AT |
| Expandable node | `aria-expanded="true | false"` | Required on all branch nodes |
| Selected node | `aria-selected="true"` | Data selection trees |
| Active page node | `aria-current="page"` | Navigation trees only; not `aria-selected` |
| Checked node (checkbox) | `aria-checked="true | false | mixed"` | Checkbox mode; `mixed` for indeterminate |
| Disabled node | `aria-disabled="true"` | Non-interactable node |
| Level | `aria-level: N` (auto on Fluent; manual elsewhere) | Required by WAI-ARIA; announces depth |
| Position | `aria-setsize: N` + `aria-posinset: N` (auto on Fluent) | Required; announces "item 3 of 5" |
| Keyboard Up/Down | Move to previous/next visible node | WAI-ARIA TreeView pattern |
| Keyboard Right | Expand collapsed branch OR move to first child | |
| Keyboard Left | Collapse expanded branch OR move to parent | |
| Keyboard Home | Move to first visible node | |
| Keyboard End | Move to last visible node | |
| Keyboard Enter/Space | Activate/select focused node | |
| Type-ahead | Alphabetical jump to next matching node | Spectrum + Atlassian spec require this |
| Connector lines | `aria-hidden="true"` | Decorative |
| APG pattern | WAI-ARIA Authoring Practices TreeView Pattern | Official specification reference |

---

## What Everyone Agrees On

1. **WAI-ARIA TreeView keyboard pattern is non-negotiable.** Every system that implements a tree (Carbon, Spectrum, Ant Design, Fluent 2, Primer, Paste, Base Web) follows the WAI-ARIA keyboard pattern: Up/Down between nodes, Right to expand/enter, Left to collapse/return to parent, Home/End for first/last node. This is a specification, not a convention.
2. **`role="tree"` + `role="treeitem"` + `aria-expanded` are the minimum required ARIA.** No system omits these. All others (`aria-level`, `aria-setsize`, `aria-posinset`, `aria-current`) are additional.
3. **Async loading per node is a first-class requirement.** Any tree backed by a server needs `loadData` with a loading spinner per node. Carbon, Ant Design, Primer, and Fluent 2 all support this. Building a tree without async loading support is building for demo only.
4. **Custom node rendering is universally needed.** Every system provides `renderNode`, `render`, custom children, or override patterns. Tree nodes without custom rendering cannot display file icons, status badges, action buttons, or metadata—all of which appear in every real-world tree implementation.
5. **Separate navigation trees from data selection trees.** Primer's `aria-current="page"` for navigation trees and `aria-selected` for data selection trees reflect a real semantic difference. These two use cases have different ARIA requirements and should not be conflated.
6. **Connector lines (`showLine`) are optional and context-dependent.** Dense data trees (settings panels) typically omit lines for cleaner appearance. Complex deeply-nested trees (file browsers with 5+ levels) benefit from connector lines for orientation. No system forces connector lines on by default.

---

## Where They Disagree

### 1. Single selection vs. checkbox multi-select as default
- **Option A — Single selection default (Carbon, Lightning, Primer):** Click a node = select it; only one node active at a time.
  - Adopters: Carbon, Lightning, Primer, Base Web
  - Upside: Simpler; matches navigation tree mental model; avoids accidental multi-selection
  - Downside: Cannot support batch operations (delete multiple files) without mode switching
  - Para tu caso: Default for navigation-oriented trees (settings sidebar, file navigation)

- **Option B — Selection mode as configuration (Spectrum, Ant Design, Mantine, MUI X):** `selectionMode: "single" | "multiple" | "none"` or `checkable: boolean` as explicit config.
  - Upside: Same component serves both navigation and batch-operation use cases
  - Downside: More complex API; risk of wrong defaults
  - Para tu caso: Configurable selection mode with `"single"` as default; add `checkable` for explicit checkbox mode

### 2. Data-driven vs. JSX composition as primary API
- **Option A — Data-driven `items`/`treeData` array (Ant Design, Mantine, MUI X RichTreeView, Lightning):** Entire tree defined by nested data array.
  - Upside: Server-driven trees are trivial; no JSX iteration code; data-binding natural
  - Downside: Custom node rendering requires `renderNode` callback; harder to compose heterogeneous node types
  - Para tu caso: Better for API-driven trees with uniform node structure

- **Option B — JSX composition (Carbon, Spectrum, Fluent 2, Base Web):** `<Tree><TreeNode><TreeNode /></TreeNode></Tree>`
  - Upside: Per-node JSX customization is natural; heterogeneous node types are easy; static trees are readable
  - Downside: Dynamic/server-driven trees require explicit iteration; verbose for large trees
  - Para tu caso: Better for static trees and trees with complex per-node custom content

- **Recommend:** Offer both. Data-driven `data` prop as primary; `<TreeItem>` children as JSX escape hatch. Ant Design and MUI X both support both paradigms.

### 3. Independent parent-child checkbox cascading (`checkStrictly`)
- **Option A — Cascade check by default (Ant Design `checkStrictly: false`, Mantine):** Checking a parent checks all children; checking all children checks the parent.
  - Upside: Natural "select a folder selects all files" behavior for file trees
  - Downside: Wrong for permission trees where parent grant doesn't imply all child grants
  - Para tu caso: Default for file/category trees where hierarchy = containment

- **Option B — Independent check (Ant Design `checkStrictly: true`):** Parent and child checked states are fully independent.
  - Upside: Required for permission trees, taxonomy trees, or any hierarchy where parent-child relationship is organizational, not inclusive
  - Downside: Loses the convenience of "check parent to select all children"
  - Para tu caso: Expose `checkStrictly` as a prop; default to cascade (more common); allow override for permission trees

### 4. Async loading model
- **Option A — `loadData` callback (Ant Design, Carbon `onToggle`):** Called when a node is expanded; returns a Promise; node shows spinner until resolved.
  - Adopters: Ant Design (most complete)
  - Upside: Component manages loading state; spinner built in; simple contract
  - Downside: All async state managed in the component; harder to integrate with query libraries

- **Option B — External `state: "loading" | "done" | "error"` per subtree (Primer):** Consumer passes state to each SubTree; full control including error with retry.
  - Adopters: Primer only
  - Upside: Full consumer control; integrates cleanly with React Query, SWR, etc.; built-in error state with retry
  - Downside: More verbose; consumer must manage per-node state
  - Para tu caso: Primer's model is more architecturally correct for modern React data-fetching patterns; Ant Design's `loadData` is simpler for non-query-library use cases

### 5. Drag-and-drop reorder
- **Option A — Built-in drag-and-drop (Ant Design `draggable`, MUI X):** Component handles all DnD logic; `dropPosition` indicates before/inside/after.
  - Upside: Zero custom DnD code; works out of the box; dropPosition semantics are well-defined
  - Downside: Less composable with external DnD libraries; may not support all DnD use cases
  - Para tu caso: Use if tree reorder is needed and you don't have an existing DnD library

- **Option B — No built-in DnD (most systems):** Consumer must implement DnD using a library (react-dnd, @dnd-kit, etc.).
  - Adopters: Carbon, Spectrum, Primer, Mantine, Fluent 2
  - Upside: Full composability with existing DnD infrastructure
  - Downside: Significant implementation work; a11y for DnD is complex (keyboard-accessible DnD requires specific ARIA patterns)
  - Para tu caso: Default; only include built-in DnD if tree reorder is a confirmed product requirement

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Standard expand/collapse | Chevron toggle + label; children indented | Any hierarchical navigation or data | All systems |
| File/folder icons | File icon for leaves; open/closed folder for branches | File browser, asset management | Ant DirectoryTree, Primer, Fluent 2 |
| Connector lines | Vertical lines showing parent-child relationships | Deeply nested trees (5+ levels), data hierarchies | Ant Design (`showLine`), Carbon, Fluent 2 |
| Checkbox selection | Per-node checkbox; cascade or independent | Permission trees, file selection, batch operations | Ant Design, Mantine, MUI X |
| Inline edit (rename) | Click-to-edit node label inline | File managers with rename capability | MUI X (`labelEditing`) |
| Trailing actions | Action buttons/menus on each node | File browsers (add/delete/rename per node) | Primer, Fluent 2, custom |
| Status badges | Count or status indicator trailing the label | Issue hierarchies (Jira Epic > Story > Subtask), alert counts | Lightning, custom |
| Async per-node loading | Spinner inside node while children load | Server-driven trees with large datasets | Ant Design, Primer, Fluent 2 |
| Dense xs size | 24px node height for maximum data density | Settings panels, IDE file explorers | Carbon `size="xs"` |

### ASCII Wireframes

**Standard file tree (left-icon expand, connector lines off):**
```
┌──────────────────────────────────────┐
│  Files                               │
│                                      │
│  ▶ 📁 src/                          │
│  ▼ 📁 components/                   │
│    ▶ 📁 Button/                     │
│    ▼ 📁 Modal/                      │
│      📄 Modal.tsx    ← selected     │
│      📄 Modal.test.tsx              │
│      📄 index.ts                    │
│    📄 index.ts                      │
│  ▶ 📁 hooks/                        │
│  📄 App.tsx                         │
│                                      │
└──────────────────────────────────────┘
  ▶ = collapsed branch
  ▼ = expanded branch
```

**Tree with connector lines (showLine=true):**
```
┌──────────────────────────────────────┐
│  Settings                            │
│                                      │
│  ▼ Account                          │
│  │ ├── Profile                      │
│  │ ├── Security        ← active     │
│  │ └── Notifications                │
│  ▶ Billing                          │
│  ▼ Organization                     │
│  │ ├── Members                      │
│  │ ├── Roles                        │
│  │ └── Integrations                 │
│  ▶ Developer                        │
│                                      │
└──────────────────────────────────────┘
  │ ├ └ = connector lines
```

**Checkbox tree (permission assignment):**
```
┌──────────────────────────────────────┐
│  Permissions                         │
│                                      │
│  ▣ Content Management               │
│  │ ▼ ☑ Articles                     │
│  │   ├ ☑ Read                       │
│  │   ├ ☑ Write                      │
│  │   └ ☐ Delete                     │
│  │ ▼ ☐ Media                        │
│  │   ├ ☐ Read                       │
│  │   └ ☐ Write                      │
│                                      │
│  ▣ = indeterminate (mixed children)  │
│  ☑ = checked  ☐ = unchecked         │
└──────────────────────────────────────┘
```

**Async loading per node (server-driven tree):**
```
┌──────────────────────────────────────┐
│  Organization                        │
│                                      │
│  ▼ Engineering                       │
│    ▼ Frontend (loading...)           │
│      ⟳ Loading...                    │
│    ▶ Backend                         │
│    ▶ Infrastructure                  │
│  ▶ Design                           │
│  ▼ Product                           │
│    ● Error loading children [Retry] │
│                                      │
└──────────────────────────────────────┘
  ⟳ = loading spinner per node
  ● Error + Retry = Primer pattern
```

**Dense xs size (settings sidebar):**
```
┌────────────────────────┐
│ General                │ ← 24px height
│ ▼ Account              │
│   Profile              │
│   Password             │
│   API keys             │
│ ▼ Team                 │
│   Members              │
│   Roles                │
│ ▶ Billing              │
│ ▶ Integrations         │
└────────────────────────┘
  Each row = 24px (Carbon xs)
```

---

## Risks to Consider

**RISK 1 — Missing positional ARIA (`aria-level`, `aria-setsize`, `aria-posinset`) (HIGH)**
The WAI-ARIA TreeView specification requires `aria-level`, `aria-setsize`, and `aria-posinset` on every treeitem. These attributes tell screen reader users "you are on item 3 of 5 at level 2." Most tree implementations (Ant Design, Carbon, Mantine) do not compute these automatically. Without them, AT users lose positional context in deep trees. Only Fluent 2 computes these automatically.
*Mitigation:* Implement automatic computation of positional ARIA attributes from the tree's structure. This requires knowing the parent node, sibling count, and depth. Build this into the tree's rendering logic, not the consumer's responsibility. Reference Fluent 2's implementation.

**RISK 2 — Keyboard navigation not matching WAI-ARIA spec (HIGH)**
The tree keyboard interaction model (Up/Down to navigate, Right to expand/enter, Left to collapse/go to parent, Home/End for first/last) is complex and differs from all other common keyboard patterns. Many tree implementations miss edge cases: Left on a leaf should go to parent; Right on a leaf should do nothing; Home/End should consider only visible (not collapsed) nodes. These failures make trees unusable for keyboard-only users.
*Mitigation:* Implement a keyboard navigation handler that passes the full WAI-ARIA TreeView keyboard test suite. Test with VoiceOver (macOS), NVDA (Windows), and JAWS against the official APG TreeView examples. Do not rely on native browser behavior—the tree keyboard pattern requires explicit JavaScript.

**RISK 3 — Performance with large trees (MEDIUM)**
Rendering 500+ tree nodes in the DOM causes significant reflow and memory usage. Without virtual scrolling, deep expansion of a large tree causes noticeable lag. Only Ant Design provides first-class virtual scrolling (`virtual` prop). Mantine and others render all nodes in the DOM.
*Mitigation:* Implement virtual windowed rendering for trees expected to grow beyond ~300 visible nodes. Combine with `loadData` (async) to limit initial node count. Document the performance boundary in the spec: "For trees with > 300 simultaneous visible nodes, virtual rendering is required."

**RISK 4 — Drag-and-drop a11y is not solved (MEDIUM)**
Every system that implements DnD (Ant Design, MUI X) has documented a11y gaps for drag-and-drop operations. Screen reader users cannot easily accomplish DnD reordering because the grabbing/dropping pattern requires custom ARIA live region announcements, explicit keyboard-accessible drag mode, and position context ("moving item from position 3 to position 1"). This is an unsolved problem in most tree implementations.
*Mitigation:* If drag-and-drop reorder is required, always provide a keyboard-only alternative: up/down reorder buttons (Lightning DualListbox pattern) or a "Move to" menu. Document that the DnD interaction is mouse/touch-only in the spec; the keyboard-only path must be provided separately.

---

## Next Steps

1. **Determine the primary use case: navigation tree vs. data selection tree.** This drives whether `aria-current` (navigation) or `aria-selected` (data) is the default selection ARIA, and whether single-select or multi-select is the default mode.
2. **Decide on async loading model: `loadData` callback vs. external state prop (Primer pattern).** For products using React Query or SWR, Primer's `state` prop model integrates more naturally. For simpler implementations, Ant Design's `loadData` is easier.
3. **Define the `checkable` / checkbox mode requirements.** If permission trees or file selection are use cases, specify whether `checkStrictly` (independent parent-child) is needed.
4. **Plan positional ARIA computation (`aria-level`, `aria-setsize`, `aria-posinset`).** This must be implemented in the tree's rendering logic. Evaluate whether to use Fluent 2's automatic computation approach.
5. **Specify the size/density scale.** Carbon's xs (24px) is the densest; decide if the design system needs a size scale or a single default size. xs is only needed for very dense information-dense contexts (file browsers, IDE sidebars).
6. **Define drag-and-drop scope.** If tree node reorder is required, specify whether DnD is built-in (Ant Design approach) or keyboard-only reorder buttons are sufficient (Lightning approach). Do not implement DnD without a keyboard-accessible alternative.
