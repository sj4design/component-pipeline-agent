---
system: Evergreen (Segment/Twilio)
component: Not available natively
url: https://evergreen.segment.com/components/
last_verified: 2026-03-29
confidence: high
---

# Divider

## Approach
Evergreen does not include a Divider or Separator component. This absence reflects Evergreen's design philosophy of achieving visual separation through spacing and layout composition rather than explicit border elements. Segment's dashboard UI uses generous whitespace, card-based layouts, and background color variation to create visual hierarchy between sections, which means horizontal rules are rarely needed. The `Box` component (Evergreen's low-level layout primitive, built on the `ui-box` library) can be given a `borderBottom` or `borderTop` prop to create a dividing line when genuinely needed, providing the visual effect without requiring a dedicated component abstraction. This approach keeps the component API surface smaller and forces intentional design decisions rather than defaulting to a visual separator.

## Key Decisions
1. **Spacing-first visual separation** (HIGH) — Evergreen's design system relies on whitespace and card backgrounds to create section boundaries, avoiding the "add a divider when confused about hierarchy" anti-pattern that explicit divider components can encourage.
2. **`Box` as escape hatch** (MEDIUM) — Teams that need a border line can use `<Box borderBottom="default" />` with a single line of code, achieving the divider effect without a named abstraction.
3. **Menu component has built-in dividers** (LOW) — Within Evergreen's `Menu` component, `Menu.Divider` is available for separating menu item groups — the one context where dividers are consistently needed is handled within the context-specific component rather than as a standalone primitive.

## Notable Props
- N/A — no standalone Divider component. See `Box` with border props or `Menu.Divider` for menu contexts.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A (when implemented via `Box`, teams should add `role="separator"` manually if the visual division is semantically meaningful).
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A named Divider component with `<hr>` semantics. Teams that need explicit dividers with accessibility semantics must compose from `Box` and manually add `role="separator"` and `aria-orientation`.
