---
system: Orbit (Kiwi.com)
component: Tooltip
url: https://orbit.kiwi/components/tooltip/
last_verified: 2026-03-28
confidence: medium
---

# Tooltip

## Approach
Orbit's Tooltip provides hover and focus-triggered informational content for Kiwi.com's travel interfaces. Tooltips appear on icon-only buttons, fare condition indicators, and booking detail questions (e.g., "What is transfer protection?"). The component uses Orbit's design tokens and supports placement configuration with automatic collision detection.

## Key Decisions
1. **Preferred placement** (MEDIUM) — Orbit's Tooltip has a `preferredAlign` prop for positioning control. In travel interfaces with limited mobile screen space, tooltip placement needs careful control to avoid obscuring other content.
2. **enabled prop** (MEDIUM) — Tooltip can be conditionally enabled/disabled. Used to show tooltips only when an element is in a specific state (e.g., tooltip on a disabled baggage option explaining why it's unavailable).

## Notable Props
- `content`: tooltip text
- `preferredAlign`: placement preference
- `enabled`: boolean to conditionally show/hide tooltip

## A11y Highlights
- **Keyboard**: Opens on focus; closes on blur/Escape
- **Screen reader**: role="tooltip"; aria-describedby on trigger
- **ARIA**: Standard tooltip pattern

## Strengths & Gaps
- **Best at**: enabled prop for conditional tooltips; travel context explanatory tooltips
- **Missing**: No rich tooltip; limited visual customization
