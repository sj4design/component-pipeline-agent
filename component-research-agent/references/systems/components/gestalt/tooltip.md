---
system: Gestalt (Pinterest)
component: Tooltip
url: https://gestalt.pinterest.systems/web/tooltip
last_verified: 2026-03-28
confidence: medium
---

# Tooltip

## Approach
Gestalt's Tooltip is used extensively in Pinterest's pin-heavy, icon-dense interfaces where action buttons lack visible text labels. The component provides hover-triggered informational tooltips with Pinterest's dark surface styling (dark background, white text). Gestalt's tooltip guidance emphasizes that tooltips should supplement visible UI elements, not replace them — all interactive elements should have visible labels in addition to tooltips.

## Key Decisions
1. **Forced dark background** (MEDIUM) — Gestalt Tooltip uses a dark background regardless of the page theme. This reflects Pinterest's design language and ensures high contrast against any page background color.
2. **link prop for actionable tooltips** (MEDIUM) — Tooltips can include a `link` for "Learn more" type additional information. This makes the tooltip slightly interactive while keeping the main content as a non-interactive description.
3. **accessibilityLabel** (HIGH) — The `accessibilityLabel` prop provides the aria-label for the tooltip container, separate from the visible text. This allows the screen reader announcement to differ from visual text if needed.

## Notable Props
- `text`: tooltip content
- `idealDirection`: preferred placement direction
- `link`: optional link object `{ href, text }` for actionable tooltip
- `accessibilityLabel`: aria-label override

## A11y Highlights
- **Keyboard**: Opens on focus; no separate keyboard trigger
- **Screen reader**: role="tooltip"; aria-describedby on trigger
- **ARIA**: accessibilityLabel allows custom screen reader text distinct from visual content

## Strengths & Gaps
- **Best at**: Dark surface styling for Pinterest aesthetic; link in tooltip for additional context; accessibilityLabel override
- **Missing**: No rich tooltip with full interactive content; limited positioning control
