---
system: Gestalt (Pinterest)
component: Spinner
url: https://gestalt.pinterest.systems/web/spinner
last_verified: 2026-03-28
confidence: medium
---

# Spinner

## Approach
Gestalt's Spinner is a simple loading indicator for Pinterest's async content loading (pin feeds, board loading, search results). It follows Gestalt's required accessibility label pattern.

## Key Decisions
1. **accessibilityLabel required** (HIGH) — Enforced accessible label. Default is "Loading".
2. **show prop** (MEDIUM) — Controls visibility, allowing the spinner to animate in/out with a controlled boolean.

## Notable Props
- `accessibilityLabel`: required label
- `show`: boolean visibility control
- `size`: `"sm" | "md"` (or similar)
- `color`: color variant

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; accessibilityLabel announced when shown
- **ARIA**: Required label prevents unlabeled spinner

## Strengths & Gaps
- **Best at**: show prop for animation control; required accessibilityLabel
- **Missing**: No label position options; single spinner style
