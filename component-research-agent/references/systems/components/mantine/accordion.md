---
system: Mantine
component: Accordion
url: https://mantine.dev/core/accordion/
last_verified: 2026-03-28
confidence: high
---

# Accordion

## Approach
Mantine's Accordion is a styled, feature-complete component that covers the full range of accordion use cases with a clean API. It supports multiple variants (default, contained, filled, separated) that map to different visual contexts — contained for cards, separated for spaced items, filled for full-background items. The component uses Mantine's style system for theme integration and supports chevron customization, icon placement, and control over animation duration. Mantine's accordion is notably easy to use for common cases while exposing enough customization for complex ones.

## Key Decisions
1. **variant prop for visual context** (HIGH) — Four built-in variants address the most common layout contexts without requiring CSS overrides. `"default"` uses bottom borders, `"contained"` adds a card border around the whole group, `"filled"` uses background fills, `"separated"` adds spacing between items. This covers 95% of real use cases with zero custom CSS.
2. **chevronPosition** (MEDIUM) — The chevron indicator can be placed `"left"` or `"right"` of the header text. Left placement is common in navigation drawers (macOS System Preferences style); right is common for FAQ sections. Mantine exposes this as a simple prop rather than requiring chevron replacement.
3. **Custom chevron via chevron prop** (MEDIUM) — The `chevron` prop accepts any ReactNode, so teams can replace the default chevron with a custom icon, +/- symbols, or animated SVG. This combines with `transitionDuration` for animation control.

## Notable Props
- `multiple`: boolean — allows multiple items open simultaneously
- `variant`: `"default" | "contained" | "filled" | "separated"`
- `chevronPosition`: `"left" | "right"`
- `chevron`: ReactNode — custom expand indicator
- `transitionDuration`: animation speed in ms (0 disables animation)
- `loop`: whether keyboard focus loops through items

## A11y Highlights
- **Keyboard**: Enter/Space toggles focused item; Arrow Up/Down navigate between controls (loop option); Tab/Shift+Tab standard focus
- **Screen reader**: `aria-expanded` on control; `aria-controls` references panel; panel has `role="region"` with `aria-labelledby`
- **ARIA**: Full ARIA disclosure pattern; loop navigation is an accessibility enhancement for keyboard users

## Strengths & Gaps
- **Best at**: Visual variant system; chevron customization; loop keyboard navigation; transitionDuration control
- **Missing**: No "expand all" control; no built-in icon slot for item headers beyond the chevron
