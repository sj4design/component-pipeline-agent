---
component: TreeView
tier: 3
last_verified: 2026-03-31
---

# TreeView — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | No Tree primitive | Radix does not include a Tree component; hierarchical UIs are composed from nested Collapsible or Accordion primitives. No ARIA tree pattern built in. | high |
| Chakra UI | No dedicated Tree component | Chakra UI does not ship a tree view; developers compose from Accordion or custom components with manual ARIA tree roles. | high |
| GOV.UK | Tree view (step-by-step navigation pattern) | GOV.UK does not have a generic tree component; the Step by Step Navigation pattern provides a sequential hierarchy for government service journeys but is not an interactive tree. | medium |
| Base Web (Uber) | TreeView | Override-based tree with expand/collapse and single selection; uses Base Web's override pattern for deep customization of node rendering, indentation, and icons. | high |
| Fluent 2 (Microsoft) | Tree / TreeItem | Full-featured tree built on Fluent's token system; supports nested items, expand/collapse, selection, and custom content per node; designed for file explorers and settings panels in Microsoft products. | high |
| Gestalt (Pinterest) | No Tree component | Pinterest's visual-grid product has no need for hierarchical tree navigation; no tree component exists in Gestalt. | medium |
| Mantine | Tree | Data-driven tree with `data` prop (nested array); built-in expand/collapse, checkbox selection, and custom node rendering via `renderNode`; supports `checkboxes` prop for multi-select with parent-child cascading. | high |
| Orbit (Kiwi.com) | No dedicated Tree component | Kiwi.com's travel booking UI does not require hierarchical trees; no tree component exists. Itinerary component handles flight segment hierarchies but is domain-specific. | medium |
| Evergreen (Segment) | No dedicated Tree component | Segment's analytics dashboard uses flat data tables rather than hierarchical trees; no tree component exists in Evergreen. | medium |
| Nord (Nordhealth) | nord-nav-group (partial) | Nord does not have a generic tree component; `nord-nav-group` provides one-level collapsible navigation groups in sidebars, but does not support deep nesting or tree ARIA patterns. | low |

## Key Decision Patterns

The T3 systems show the starkest divide between "tree as essential component" and "tree as unnecessary complexity" of any tier. Only three systems — Base Web, Fluent 2, and Mantine — ship a dedicated tree component. The remaining seven either lack it entirely or offer only tangential patterns (GOV.UK's step-by-step, Nord's nav-group). This 3-out-of-10 ratio (compared to 4-out-of-8 in T2 with dedicated trees) confirms that tree views are a specialized component most relevant to developer tools, file management, and enterprise administration.

Fluent 2's Tree is the most significant implementation in T3, reflecting Microsoft's product needs — VS Code's file explorer, Outlook's folder tree, and Teams' channel navigation all require robust tree interactions. Fluent 2's tree supports nested `TreeItem` composition with `itemType="branch"` | `"leaf"` distinction, open/close state management, and integration with Fluent's appearance tokens for density variants. It is the closest T3 equivalent to Ant Design's feature completeness.

Mantine's Tree takes a data-driven approach — the entire tree is defined by a `data` prop (array of `{ label, value, children }` objects) rather than JSX composition. This makes it easy to render server-driven trees but harder to customize individual node rendering without the `renderNode` escape hatch. Mantine also adds checkbox selection with parent-child cascading, matching Ant Design's `checkable` feature.

Base Web's TreeView follows Uber's signature override pattern — every sub-element (TreeLabel, TreeNode, icon, toggle) is overridable via the `overrides` prop. This makes it the most customizable tree in T3 but requires the most code to configure. Base Web is the only T3 tree that uses an override object model rather than component composition or data-driven rendering.

The absence pattern is instructive. Radix, the most popular headless library, deliberately omits Tree — its maintainers have noted the WAI-ARIA TreeView pattern's complexity (aria-level, aria-setsize, aria-posinset, plus keyboard navigation with directional arrow keys) as a reason for deferring the component. Chakra similarly omits it, pointing developers to manual composition. This suggests tree views represent a complexity threshold that headless/utility libraries often choose not to cross.

## A11y Consensus

- Fluent 2 and Base Web implement the full WAI-ARIA TreeView pattern: `role="tree"` on root, `role="treeitem"` on nodes, `role="group"` on child containers, `aria-expanded` on branch nodes.
- Keyboard navigation follows the standard pattern: Up/Down between visible nodes, Right to expand/enter children, Left to collapse/return to parent, Home/End for first/last visible node, asterisk (*) to expand all siblings.
- Fluent 2 adds `aria-level`, `aria-setsize`, and `aria-posinset` automatically based on tree structure — these positional attributes are critical for screen reader announcements ("item 3 of 5, level 2").
- Mantine relies on native HTML semantics with `role="tree"` and keyboard handlers but does not document positional ARIA attributes as thoroughly.
- Systems without tree components (Radix, Chakra, Evergreen) offer no tree-specific a11y guidance — developers composing trees from primitives must implement the full ARIA pattern manually.

## Recommended Use

Reference Fluent 2 Tree for the most production-tested tree implementation in T3, particularly for file explorer and settings panel patterns. Mantine Tree for data-driven trees with checkbox selection. Base Web TreeView when deep visual customization via overrides is the priority. For systems without a tree component, the consistent recommendation is to evaluate whether the hierarchy can be flattened (breadcrumbs + flat list) before building a custom tree — the absence in 7 of 10 T3 systems reflects a genuine product decision, not a gap.
