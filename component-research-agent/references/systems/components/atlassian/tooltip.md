---
system: Atlassian Design System
component: Tooltip
url: https://atlassian.design/components/tooltip/
last_verified: 2026-03-28
---

# Tooltip

## Approach
Atlassian's tooltip is designed for dense productivity interfaces — Jira boards, Confluence editors, Bitbucket code views — where information density is high and screen real estate is contested. The standout feature is the `position="mouse"` option, which makes the tooltip follow the cursor rather than anchoring to the trigger element. This exists because in Jira's Kanban boards and Confluence's page trees, trigger elements can be visually large (entire cards, table rows, or tree nodes), and a tooltip anchored to the element's center may appear far from where the user is looking. By following the mouse, the tooltip stays contextually close to the user's attention point. Atlassian also enforces a strong content guideline: tooltip text should never be truncated, because truncated supplemental text defeats the purpose of providing additional context.

## Key Decisions
1. **Mouse-following position mode** (HIGH) — The `position="mouse"` prop places the tooltip near the cursor instead of anchoring to the trigger element's bounding box. Combined with `mousePosition` (top, bottom, left, right), this gives fine control over cursor-relative placement. Atlassian built this because their products contain large interactive regions (Kanban cards, list items, code blocks) where element-anchored tooltips would appear distant from the user's gaze. The tradeoff is slightly more complex rendering logic, but the UX benefit in large-target scenarios is significant.

2. **Auto position as intelligent default** (MEDIUM) — When `position="auto"`, the tooltip calculates which side of the trigger has the most available space and places itself there. This is the default behavior, which means developers do not need to think about positioning for the majority of cases. Atlassian chose this because their products run in highly variable viewport configurations (sidebar panels in Jira, split views in Bitbucket), and hardcoded positions would frequently collide with UI boundaries.

3. **No text truncation — ever** (MEDIUM) — Atlassian explicitly states that tooltip text should never be truncated. If text is too long for a tooltip, the content should be shortened or moved to a different pattern. This is a content strategy decision: tooltips exist to clarify, and a truncated tooltip creates more confusion than it resolves. The `truncate` prop exists but the guidance recommends against using it except for very specific cases like long file paths or URLs.

4. **Component prop for custom tooltip containers** (LOW) — The `component` prop allows replacing the default tooltip wrapper with a custom component. Atlassian includes this for advanced use cases like custom animations, themed tooltips in different product sub-brands (Trello vs. Jira vs. Confluence), or tooltips that need to render in specific DOM locations for z-index stacking contexts.

## Notable Props
- `position`: Accepts `'auto' | 'top' | 'right' | 'bottom' | 'left' | 'mouse'` — the `mouse` value is unique among major design systems.
- `mousePosition`: Sub-position when using `position="mouse"` — controls which side of the cursor the tooltip appears on.
- `component`: Custom component replacement for the tooltip container — enables per-product theming within the Atlassian ecosystem.
- `truncate`: Boolean to truncate long text, but guidelines actively discourage its use.

## A11y Highlights
- **Keyboard**: Tooltip shows on focus and hides on blur or Escape. Keyboard users always see the tooltip anchored to the element (mouse mode does not apply to keyboard interaction, ensuring predictable placement).
- **Screen reader**: Tooltip content is associated with the trigger via `aria-describedby`. Content is announced as a description, not a separate region.
- **ARIA**: `role="tooltip"` on the container. The tooltip never receives focus — all interaction stays on the trigger element, consistent with the WAI-ARIA tooltip pattern.

## Strengths & Gaps
- **Best at**: The mouse-following mode is a genuinely unique solution for large trigger elements in dense productivity UIs — no other major design system offers this.
- **Missing**: No variant for interactive or rich tooltip content — like most systems, interactive overlays require a separate Popup or InlineDialog component. No global warmup/cooldown delay system for rapid sequential hovering.
