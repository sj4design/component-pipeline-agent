---
component: tree-view
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** No native M3 spec — no TreeView component
**Approach:** M3 does not include a tree view in its component specification. MUI does not provide a TreeView in its core M3-themed package either. The MUI X library (separate, commercially licensed) offers `TreeView` and `RichTreeView` components built on M3 surface tokens, but these are not part of the M3 design system itself. RichTreeView adds checkbox selection, drag-and-drop, and async loading via `onItemExpansionToggle` callbacks.
**Key Decisions:**
- [HIGH] No M3 spec: hierarchical navigation is considered application-level, not a design system primitive — M3 delegates to platform-specific patterns (e.g., Navigation Drawer for mobile, side panel for desktop)
- [MED] MUI X RichTreeView: the commercial extension provides `multiSelect`, `checkboxSelection`, and `experimentalFeatures.labelEditing` — the most feature-rich React tree, but outside the M3 design boundary
- [MED] Composition model: MUI X offers both `TreeView` (JSX children composition) and `RichTreeView` (data-driven `items` array API) — dual paradigm for different complexity levels
**Notable API:** `RichTreeView`: `items` array with `id`/`label`/`children`; `multiSelect`; `checkboxSelection`; `onItemExpansionToggle`; `experimentalFeatures.labelEditing`
**A11y:** `role="tree"` on root, `role="treeitem"` on each node; `aria-expanded` on parent nodes; arrow key navigation following WAI-ARIA TreeView pattern; `aria-selected` for selection state.
**Best at:** Data-driven tree rendering with enterprise features (checkbox selection, inline editing, drag-drop) via MUI X — most complete React tree when commercial licensing is acceptable.
**Missing:** No M3 design guidance for tree visual language — spacing, indentation, expand/collapse iconography, and node density are undefined in M3 tokens.

---

## spectrum
**Component:** TreeView (React Spectrum)
**Approach:** Spectrum's TreeView is a fully accessible hierarchical list built on React Aria's collection API. Items are declared via `<TreeViewItem>` children or dynamic collections with `items` prop. Supports single and multiple selection, expand/collapse with animated height transitions, and static or dynamic (async) children loading. Emphasis on keyboard navigation following the WAI-ARIA TreeView pattern with full arrow key support including type-ahead.
**Key Decisions:**
- [HIGH] Collection API: uses React Aria's collection model — `<TreeView>` + `<TreeViewItem>` composition with automatic key management and virtualization support for large trees
- [HIGH] Selection modes: `selectionMode="single"` | `"multiple"` | `"none"` with `selectionStyle="checkbox"` | `"highlight"` — separates selection behavior from selection affordance
- [MED] Action support: `onAction` callback on individual items for primary actions (e.g., open file) separate from selection — distinguishes "select" from "activate"
**Notable API:** `selectionMode`; `selectionStyle`; `expandedKeys` / `defaultExpandedKeys`; `onExpandedChange`; `onAction`; `disabledKeys`; items support `textValue` for type-ahead
**A11y:** `role="tree"` / `role="treeitem"`; `aria-expanded` on expandable nodes; `aria-selected` for selection; full WAI-ARIA TreeView keyboard pattern (Up/Down/Left/Right/Home/End); type-ahead character navigation.
**Best at:** Separation of selection and action — `onAction` vs. selection state is a nuanced distinction most systems conflate. Also strongest type-ahead implementation in Tier 1.
**Missing:** No built-in drag-and-drop reorder — consumers must implement drag interactions separately using React Aria's drag-and-drop hooks.

---

## carbon
**Component:** TreeView / TreeNode
**Approach:** Carbon provides `TreeView` as a container with `TreeNode` children. Each node can be a branch (expandable with children) or a leaf. Supports single selection with controlled/uncontrolled patterns. Three sizes (xs, sm, default) control node height for density. The component is designed for file system navigation and settings hierarchies in IBM product UIs.
**Key Decisions:**
- [HIGH] Explicit branch vs. leaf: `TreeNode` with children renders as expandable branch; without children renders as leaf — no separate component needed, but the distinction is structural
- [HIGH] Single selection only: `onSelect` fires for individual node selection; no multi-select or checkbox selection built in — deliberate scope limit for IBM's navigation use cases
- [MED] Size scale: `xs` (24px), `sm` (32px), default (40px) node heights — matches Carbon's global density scale for compact-to-comfortable layouts
**Notable API:** `selected` / `onSelect` on TreeView; `isExpanded` / `onToggle` on TreeNode; `label` (required) and `value` on TreeNode; `size: "xs" | "sm"` on TreeView
**A11y:** `role="tree"` on container, `role="treeitem"` on nodes; `aria-expanded` on branch nodes; arrow key navigation (Up/Down to move, Left to collapse/go to parent, Right to expand/go to first child); `aria-selected` for active node.
**Best at:** Compact navigation trees in enterprise UIs — xs size at 24px is the densest tree in Tier 1, ideal for file browsers and deeply nested settings.
**Missing:** Multi-select, checkbox selection, drag-and-drop, and async loading — all are out of scope for Carbon's navigation-focused tree.

---

## polaris
**Component:** No TreeView component
**Approach:** Polaris does not provide a tree view component. Shopify's admin UI uses flat navigation patterns (sidebar with collapsible sections via `Navigation` component) and flat resource lists rather than hierarchical tree structures. For category hierarchies (e.g., product categories), Shopify recommends breadcrumb navigation + flat list rather than an interactive tree. The `Collapsible` utility could theoretically be composed into a tree, but no guidance or pattern exists.
**Key Decisions:**
- [HIGH] No tree component: Shopify's merchant-facing UIs avoid deep hierarchies — product categories, collections, and navigation are intentionally flattened to reduce cognitive load for non-technical merchants
- [MED] Navigation component: sidebar navigation supports one level of nesting via `subNavigationItems` — this is the closest Polaris comes to hierarchical display, but it is navigation-specific, not a general tree
**Notable API:** N/A — no component exists. `Navigation.Item.subNavigationItems` provides one-level nesting in the sidebar.
**A11y:** N/A
**Best at:** N/A — Polaris's deliberate absence of tree view reflects a product philosophy that deep hierarchies should be flattened for merchant usability.
**Missing:** Entire component. No tree, no multi-level hierarchy, no expand/collapse node pattern.

---

## atlassian
**Component:** No dedicated TreeView component in Atlassian Design System
**Approach:** Atlassian does not ship a formal TreeView component in its public design system. However, Jira and Confluence use tree-like patterns extensively — Jira's issue hierarchy (Epic > Story > Subtask), Confluence's page tree sidebar, and Bitbucket's file browser all implement custom tree views. These are product-level implementations using `@atlaskit/primitives` and custom ARIA wiring. Atlassian has internal tree components but they have not been promoted to the shared design system.
**Key Decisions:**
- [HIGH] No shared component: validated across products that tree requirements differ significantly — Confluence's page tree needs drag-drop reorder, Jira's hierarchy needs inline status badges, Bitbucket's file tree needs lazy loading. A single component could not serve all three without excessive configuration
- [MED] Product-level implementations: each product team builds tree views using Atlassian's primitives (Box, Stack, Pressable) with custom keyboard navigation and ARIA attributes
- [MED] Confluence page tree: the most sophisticated internal implementation — supports drag-drop reorder, async child loading, multi-select, and keyboard navigation
**Notable API:** No formal API. Internal implementations vary per product.
**A11y:** Atlassian's accessibility guidelines mandate `role="tree"` / `role="treeitem"`, `aria-expanded`, `aria-level`, `aria-setsize`, `aria-posinset`, and full arrow key navigation for any tree implementation. Guidelines are enforced via accessibility audits even without a shared component.
**Best at:** Enforcing comprehensive tree a11y guidelines across products — their a11y specification for tree views is among the most detailed in Tier 1, even without a shared component.
**Missing:** A formal reusable TreeView component — acknowledged as a gap, with each product maintaining separate implementations.

---

## ant-design
**Component:** Tree / DirectoryTree
**Approach:** Ant Design provides the most feature-complete tree component in Tier 1. `Tree` supports expand/collapse, single/multiple selection, checkbox selection (with `checkStrictly` for independent parent/child checking), drag-and-drop reorder, async loading via `loadData`, virtual scrolling for large datasets, and custom node rendering. `DirectoryTree` is a pre-configured variant optimized for file browser UIs with default expand-on-click and built-in file/folder icons.
**Key Decisions:**
- [HIGH] `checkable` + `checkStrictly`: checkbox mode with option to decouple parent-child check cascading — critical for permission trees where parent selection should not force child selection
- [HIGH] `loadData` async: lazy-load children on expand with built-in loading spinner per node — essential for server-driven trees with thousands of nodes
- [HIGH] DirectoryTree variant: pre-configured tree optimized for file system UIs — expand-on-double-click for folders, select-on-click for files, built-in file/folder icons
- [MED] `draggable` + `onDrop`: full drag-and-drop reorder with `dropPosition` (-1, 0, 1) indicating before, inside, or after the drop target
**Notable API:** `checkable`; `checkStrictly`; `loadData` (async); `draggable`; `showLine` (toggle tree connector lines); `virtual` (windowed rendering); `fieldNames` (custom data field mapping); `switcherIcon`; `treeData` array API or `<TreeNode>` children
**A11y:** `role="tree"` / `role="treeitem"`; `aria-expanded`; arrow key navigation; `aria-checked` for checkbox mode. Some community reports note incomplete screen reader announcements for drag-and-drop operations.
**Best at:** Feature completeness — checkbox cascading with `checkStrictly`, async `loadData`, `DirectoryTree` preset, virtual scrolling, and drag-drop cover nearly every tree use case in a single component.
**Missing:** Refined a11y for drag-and-drop (drop announcements are not fully voiced); no built-in inline editing of node labels; `checkStrictly` naming is unintuitive (means "do NOT cascade", not "strict checking").
