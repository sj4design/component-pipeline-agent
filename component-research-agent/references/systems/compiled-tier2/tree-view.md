---
component: TreeView
tier: 2
last_verified: 2026-03-31
---

# TreeView — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Tree | Collection-based tree using React Aria; TreeItem with expandable branches; single/multi selection | high |
| Salesforce Lightning | Tree / TreeGrid | Full tree with expand/collapse, single selection, and metatext per node; TreeGrid adds column support for tabular hierarchies | high |
| GitHub Primer | TreeView | Accessible tree navigation component; designed for file trees and sidebar navigation; built-in loading states per node | high |
| shadcn/ui | No dedicated tree — compose from Accordion/Collapsible | No tree component in shadcn/ui; developers compose hierarchical UIs from nested Accordion or Collapsible primitives; Radix has no Tree primitive | medium |
| Playbook | No dedicated tree component | eBay Playbook does not offer a tree view; product UIs use flat lists and breadcrumb navigation for category hierarchies | low |
| REI Cedar | No dedicated tree component | Cedar focuses on e-commerce UI patterns (product cards, filters); no hierarchical tree component; category navigation uses flat accordion patterns | low |
| Wise Design | No dedicated tree component | Wise's financial product UI has no tree view; navigation is flat with minimal nesting | low |
| Dell Design System | Tree View | Enterprise tree for product configuration hierarchies and system administration navigation; supports expand/collapse and single selection | low |

## Key Decision Patterns

**Purpose split — navigation vs. data:** Primer's TreeView is explicitly a navigation component (file trees, repo sidebars) with `current` state for active page indication. Lightning's Tree is a general-purpose data display component, while TreeGrid extends it into tabular hierarchical data (rows with columns). Paste's Tree bridges both — selection for data, `href` on TreeItem for navigation.

**Async loading:** Primer has the most explicit async pattern — `TreeView.SubTree` accepts a `state` prop (`"loading"` | `"done"` | `"error"`) with built-in loading spinner and error retry affordance. Lightning supports lazy loading via `onToggle` with manual loading state management. Paste delegates async to React Aria's collection model.

**Selection model:** Lightning enforces single selection only. Primer supports single selection with `aria-current` for navigation context. Paste supports single and multi-select via React Aria's selection model. None of the T2 systems with tree components offer checkbox selection — this is a Tier 1 feature (Ant Design, MUI X).

**Missing systems pattern:** Four of eight T2 systems (shadcn/ui, Playbook, Cedar, Wise) lack a tree component entirely. This reflects that tree views are specialized components — most needed in developer tools, file management, and enterprise administration UIs rather than general product design.

## A11y Consensus
- Root container: `role="tree"` with accessible label
- Each node: `role="treeitem"` with `aria-expanded` on expandable nodes
- Nesting: `role="group"` wrapping child nodes, or nested `role="tree"` (Primer uses group)
- Keyboard: Up/Down to move between visible nodes, Right to expand or move to first child, Left to collapse or move to parent, Home/End for first/last node
- Primer adds `aria-current="page"` for navigation trees indicating active page
- All implementations use `aria-level`, `aria-setsize`, `aria-posinset` for position context

## Recommended Use
Primer TreeView is the canonical reference for navigation-oriented trees with async loading states and error handling. Lightning Tree/TreeGrid for enterprise hierarchical data display with column support. Paste Tree when building on React Aria's collection model. For systems without a tree, nested Accordion or Collapsible composition is the standard workaround.
