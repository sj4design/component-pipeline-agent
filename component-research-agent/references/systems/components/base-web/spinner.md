---
system: Base Web (Uber)
component: Spinner
url: https://baseweb.design/components/spinner/
last_verified: 2026-03-28
confidence: medium
---

# Spinner

## Approach
Base Web's Spinner is a circular loading indicator following the Overrides pattern. It uses SVG animation and supports size control through the `$size` prop. The spinner integrates with Base Web's theme colors.

## Key Decisions
1. **Overrides pattern** (HIGH) — Even the simple spinner follows the Overrides customization approach.
2. **$size for responsive sizing** (MEDIUM) — Size can be a fixed value or relative to context.

## Notable Props
- `$size`: size value (pixels or string)
- `$color`: color override
- `overrides`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar" with aria-label; indicates loading state
- **ARIA**: Should include accessible label

## Strengths & Gaps
- **Best at**: Overrides customization; consistent with Base Web theme
- **Missing**: No built-in accessible label by default; multiple spinner styles not available
