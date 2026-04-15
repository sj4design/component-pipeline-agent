---
system: Radix UI (WorkOS)
component: Tooltip
url: https://www.radix-ui.com/primitives/docs/components/tooltip
last_verified: 2026-03-28
confidence: high
---

# Tooltip

## Approach
Radix Tooltip is a headless tooltip primitive that handles the core interaction complexity: hover/focus triggering, delay timing, pointer tracking, flip/collision detection, and the WAI-ARIA tooltip pattern. The component uses a Provider at the root level to share hover delay settings across all tooltips in the application, which is an important UX detail — users who have hovered one tooltip should see subsequent tooltips with reduced delay (they've "warmed up" their cursor).

## Key Decisions
1. **Provider for shared delay state** (HIGH) — `Tooltip.Provider` with `delayDuration` and `skipDelayDuration` manages the delay state globally. `skipDelayDuration` is the time after a tooltip closes during which the next tooltip opens immediately. This mirrors native OS tooltip behavior (macOS/Windows) where rapid scanning shows tooltips immediately.
2. **disableHoverableContent** (MEDIUM) — By default, users can move their cursor into the tooltip content without it closing (for tooltips with links or interactive content). `disableHoverableContent` forces the tooltip to close on cursor leave, which is more appropriate for non-interactive informational tooltips.
3. **Tooltip.Content side and align** (MEDIUM) — Precise positioning control with collision detection. The tooltip automatically flips sides when it would overflow the viewport, with `avoidCollisions` and `collisionBoundary` for fine-grained control.

## Notable Props
- `delayDuration`: hover delay in ms (on Provider or per-tooltip override)
- `skipDelayDuration`: reduced delay after close
- `open` / `onOpenChange` / `defaultOpen`: controlled/uncontrolled state
- `disableHoverableContent`: closes on cursor leave
- `Tooltip.Content > side`: `"top" | "right" | "bottom" | "left"`
- `Tooltip.Content > align`: `"start" | "center" | "end"`

## A11y Highlights
- **Keyboard**: Tooltip opens when trigger receives focus (keyboard or mouse); Escape closes
- **Screen reader**: `role="tooltip"` on content; trigger has `aria-describedby` pointing to tooltip
- **ARIA**: Tooltip content is announced as a description, not as a separate navigable element — correct for non-interactive tooltips

## Strengths & Gaps
- **Best at**: Shared delay state via Provider; hoverable content support; collision detection
- **Missing**: No rich tooltip variant with interactive content (use Popover instead); no dark/light mode built-in
