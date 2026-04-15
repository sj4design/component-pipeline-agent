---
system: Base Web (Uber)
component: Divider
url: https://baseweb.design/components/divider/
last_verified: 2026-03-29
confidence: high
---

# Divider

## Approach
Base Web's Divider is a simple horizontal or vertical rule used to separate content sections visually. It renders a semantic `<hr>` element styled via Styletron, respecting Base Web's theme border tokens to ensure consistent separator color in both light and dark mode. The component is intentionally minimal — its role is purely structural and decorative — and carries no interactive or state behavior. This simplicity reflects Uber's operational interface context, where dividers appear between form sections, list items, and card regions to reduce visual noise in dense layouts.

## Key Decisions
1. **Semantic `<hr>` element** (HIGH) — Using the native HTML element ensures screen readers interpret the separator correctly without additional ARIA, aligning with Base Web's accessibility-first approach.
2. **Theme token integration** (HIGH) — Color pulls from `borderOpaque` or equivalent theme tokens so dividers adapt automatically when teams switch between light and dark themes.
3. **Override system** (MEDIUM) — The Root element is overridable for the rare cases where spacing, color, or style need to deviate from the system default.

## Notable Props
- `overrides`: object — allows Root element style/component replacement

## A11y Highlights
- **Keyboard**: Not interactive; no keyboard behavior.
- **Screen reader**: Rendered as `<hr>` which is announced as a thematic break by screen readers.
- **ARIA**: No additional ARIA needed; native `<hr>` semantics are sufficient.

## Strengths & Gaps
- **Best at**: Clean, token-aware horizontal separation in forms, lists, and cards with zero configuration.
- **Missing**: No label/text-in-divider variant (common in form sections); vertical orientation not supported in the base API without overrides.
