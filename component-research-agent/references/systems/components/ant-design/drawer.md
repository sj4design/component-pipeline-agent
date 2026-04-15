---
system: Ant Design
component: Drawer
url: https://ant.design/components/drawer/
last_verified: 2026-03-28
---

# Drawer

## Approach

Ant Design's Drawer is the most fully-featured standalone Drawer component among the Tier 1 systems — all four edges are supported, size is configurable, multi-level nesting is documented, and the component is not deprecated. Ant Design's enterprise audience (Chinese internet companies, large-scale management systems, multi-panel dashboards) regularly needs edge-anchored panels that display supplementary context without the full interruption of a Modal. The design philosophy distinguishes Drawer from Modal by the nature of the interaction: Drawer is for supplementary context that users may want to reference while still seeing the underlying page, while Modal is for blocking flows requiring immediate action.

The four-directional placement support (`top`, `right`, `bottom`, `left`) is distinctive. Most systems anchor drawers to one edge (Atlassian: left, typical convention: right). Ant Design's decision to support all four reflects the diversity of enterprise dashboard layouts: some applications use top drawers for filter panels in data-dense tables, bottom drawers for mobile-style action sheets in hybrid web/mobile apps, and lateral drawers for detail panels in split-view layouts. The swipe-to-open affordance (`dragger`) with its 4px touch target also signals that mobile contexts are a first-class consideration, not an afterthought.

## Key Decisions

1. **Four-directional placement** (HIGH) — Supporting all four edges (`placement: 'top' | 'right' | 'bottom' | 'left'`) reflects Ant Design's recognition that different dashboard layouts require different panel anchoring strategies. A notification panel belongs on top or right; a filter panel belongs on left; a mobile action sheet belongs at the bottom. Rather than prescribing one layout, Ant Design treats direction as a legitimate design variable that teams should control.

2. **Multi-level Drawer nesting** (MEDIUM) — Ant Design explicitly documents and supports multiple drawers open simultaneously in a stacked/nested fashion. This addresses a real enterprise use case: opening a record detail panel (Drawer 1), then from within it opening an edit form for a related record (Drawer 2). Most systems either silently break or produce visual artifacts in this scenario. Ant Design's explicit support and documentation of multi-level nesting makes complex detail-flow scenarios reliable.

3. **Optional backdrop with configurable mask** (MEDIUM) — The `mask` prop controls whether a backdrop (scrim) is shown. Setting `mask={false}` creates a non-blocking panel — the user can still interact with the underlying page. This is the "true non-blocking panel" mode that Polaris removed (by deprecating Sheet) and that Carbon lacks entirely. For dashboards where comparing Drawer content against page content is a core use case, non-blocking mode is essential.

4. **`getContainer` for portal target** (MEDIUM) — Like Ant Design's Popover, Drawer allows specifying the container element for portal rendering. This is important for scroll containers and CSS isolation contexts common in enterprise dashboards built with micro-frontend architectures.

5. **Touch dragger affordance** (LOW) — The `--ant-drawer-dragger-size: 4px` token and the `push` prop (for nudging background content) reflect mobile-first thinking. The dragger provides a swipe-to-open/close affordance that is important for mobile web applications. This level of touch consideration is absent from most Tier 1 system drawers.

## Notable Props

- `placement`: `'top' | 'right' | 'bottom' | 'left'` — the only system with all four directions as first-class options.
- `mask`: Boolean. Set to `false` for a non-blocking panel that does not prevent interaction with background content.
- `push`: Whether to push sibling content when Drawer opens. Enables the side-push layout rather than overlay-over-content.
- `extra`: Slot for actions in the header area — standard Ant Design pattern for placing primary actions adjacent to the close button.

## A11y Highlights

- **Keyboard**: Escape closes the Drawer by default (`keyboard` prop, defaults to `true`). Focus should be trapped within the Drawer when `mask` is `true`. When `mask={false}`, focus trap may not be appropriate since background is still interactive.
- **Screen reader**: Drawer uses `role="dialog"` semantics. When `mask={true}`, `aria-modal="true"` prevents screen readers from accessing background content.
- **ARIA**: The `title` prop populates an accessible heading inside the Drawer. Drawers without a title should use `aria-label` on the root element. The `closable` close button includes a default accessible label.

## Strengths & Gaps

- **Best at**: The most configurable Drawer in any Tier 1 system — four directions, optional non-blocking mode, multi-level nesting support, and touch dragger all make it the best fit for complex enterprise dashboards.
- **Missing**: The optional `mask={false}` mode creates an accessibility edge case where focus trap logic must be carefully considered — the documentation does not provide explicit guidance on accessibility behavior when background content remains interactive.
