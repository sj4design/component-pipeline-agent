---
system: Ant Design
component: Tooltip / Popover / Popconfirm
url: https://ant.design/components/tooltip/
last_verified: 2026-03-28
---

# Tooltip / Popover / Popconfirm

## Approach
Ant Design organizes overlay content into a three-tier hierarchy: Tooltip (simple text), Popover (rich content with title and body), and Popconfirm (confirmation dialog with action buttons). All three share the same underlying positioning engine and prop API, forming an inheritance chain where Popover extends Tooltip and Popconfirm extends Popover. This matters because Ant is designed for Chinese enterprise applications where confirmation workflows are pervasive — deleting records, changing statuses, and approving actions all benefit from inline confirmation rather than modal dialogs. By creating Popconfirm as a first-class component (not just a Popover with buttons), Ant signals that this is a primary interaction pattern, not an edge case. The shared API means developers learn the positioning and trigger system once and apply it across all three tiers.

## Key Decisions
1. **Three-tier component inheritance** (HIGH) — Tooltip is the base, Popover extends it with `title` and `content`, Popconfirm extends Popover with `onConfirm`/`onCancel` actions. This inheritance model means all three components share `placement`, `trigger`, `open`, `arrow`, and `destroyTooltipOnHide` props. The benefit is API consistency: once you know Tooltip's API, Popover and Popconfirm feel familiar. The risk is that the inheritance can be confusing — Popconfirm is technically a Tooltip with extra layers, which muddies the conceptual model of what a "tooltip" is.

2. **12-position placement system** (MEDIUM) — Ant provides 12 placement options (top, topLeft, topRight, bottom, bottomLeft, bottomRight, left, leftTop, leftBottom, right, rightTop, rightBottom). This is more granular than most systems that offer 4-5 positions. Ant does this because Chinese enterprise UIs are information-dense and components often live in tight grid layouts where edge-aligned tooltips (like `topLeft`) prevent content from overflowing screen boundaries. The placement system also supports automatic flipping when screen space is insufficient but only does flipping without shifting for edge-aligned positions.

3. **Trigger is hover-only by default — accessibility opt-in** (HIGH) — By default, Ant Design tooltips only respond to hover, not focus. Keyboard accessibility requires explicitly setting `trigger={['hover', 'focus']}` per component or using `ConfigProvider` to enable it globally. This is a significant accessibility gap: keyboard and screen reader users cannot access tooltip content out of the box. Ant provides the mechanism to fix it, but the default is not accessible. This reflects Ant's origin as a Chinese enterprise framework where WCAG compliance was not a primary design driver initially.

4. **`destroyTooltipOnHide` for performance** (MEDIUM) — When true, the tooltip's DOM nodes are removed when hidden instead of just being visually hidden. Ant includes this because in data-heavy enterprise dashboards with hundreds of rows, keeping hundreds of hidden tooltip DOM nodes in memory degrades performance. Most systems keep tooltip DOM mounted for faster re-show, but Ant recognizes that at scale, cleanup matters more than transition speed.

5. **`color` prop with preset palette** (LOW) — Ant provides a set of preset color options for tooltip backgrounds. This enables semantic color-coding (red for warnings, green for success) without custom CSS. It is a pragmatic feature for enterprise dashboards where tooltips may carry urgency signals beyond just informational text.

## Notable Props
- `trigger`: Accepts `'hover' | 'focus' | 'click' | 'contextMenu'` or arrays — uniquely flexible but defaults to hover-only.
- `destroyTooltipOnHide`: Performance optimization for large-scale UIs with many tooltips.
- `arrow`: Controls arrow visibility and positioning with `{ pointAtCenter: true }` option — the `pointAtCenter` sub-option adjusts the arrow to point at the trigger's center regardless of edge alignment.
- `fresh`: When true, forces tooltip content to re-render on each show rather than caching — useful for dynamic content that changes between views.
- `zIndex`: Explicit z-index control, critical in deeply nested enterprise modal/drawer/panel layouts.

## A11y Highlights
- **Keyboard**: Not accessible by default. Requires `trigger={['hover', 'focus']}` per component or global ConfigProvider setup. Once enabled, tooltip shows on focus and dismisses on blur.
- **Screen reader**: Trigger is associated via `aria-describedby` when accessibility triggers are enabled. Without focus trigger, screen readers cannot access tooltip content at all.
- **ARIA**: `role="tooltip"` on the container. The tooltip infrastructure supports accessibility, but the defaults do not enforce it — teams must actively opt in.

## Strengths & Gaps
- **Best at**: The three-tier Tooltip/Popover/Popconfirm inheritance gives teams a complete overlay content system with a consistent API, making Popconfirm a first-class citizen rather than a hack built on top of tooltips.
- **Missing**: Hover-only default trigger is a significant accessibility failure out of the box — keyboard users are excluded unless developers explicitly configure focus triggers at the component or app level.
