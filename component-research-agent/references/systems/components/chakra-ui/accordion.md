---
system: Chakra UI
component: Accordion
url: https://chakra-ui.com/docs/components/accordion
last_verified: 2026-03-28
confidence: high
---

# Accordion

## Approach
Chakra UI's Accordion is a styled, accessible component that provides both structure and default visuals. It wraps a disclosure pattern with Chakra's design token system, so spacing, colors, and typography adapt automatically to the active theme. The component ships with four sub-components — AccordionRoot, AccordionItem, AccordionButton, AccordionPanel — and in v3, these are unified under a cleaner recipe-based approach. Chakra's accordion is opinionated about visual defaults (border-bottom between items, padding, chevron icon) but allows full override through the theme.

## Key Decisions
1. **allowMultiple prop** (HIGH) — Controls whether multiple items can be open simultaneously. Chakra uses a single boolean flag rather than a `type` string, which is simpler but less type-safe than Radix's approach. This reflects Chakra's preference for ergonomic APIs over strict typing.
2. **allowToggle** (MEDIUM) — When only one item can be open at a time, `allowToggle` permits the current item to be closed. Without it, one item is always expanded. Chakra ships this as a separate prop from `allowMultiple` for clarity.
3. **Styled defaults with easy override** (MEDIUM) — Unlike Radix, Chakra ships a visually complete accordion. The default styling uses semantic tokens so it adapts between light/dark modes without any consumer effort, but every part can be overridden via `sx` or theme extension.

## Notable Props
- `allowMultiple`: boolean — enables multiple open items
- `allowToggle`: boolean — enables toggling the open item closed (single mode only)
- `defaultIndex` / `index` / `onChange`: uncontrolled/controlled state
- `reduceMotion`: respects `prefers-reduced-motion` when animating open/close

## A11y Highlights
- **Keyboard**: Enter/Space toggles focused item; Tab moves between trigger buttons
- **Screen reader**: `aria-expanded` on trigger button; `aria-controls` links trigger to panel; panel has `role="region"` with `aria-labelledby`
- **ARIA**: Full WAI-ARIA disclosure pattern; hidden panels use `hidden` attribute for display:none behavior

## Strengths & Gaps
- **Best at**: Out-of-the-box styled accordion with theme integration; reduced motion support
- **Missing**: No built-in icon animation API (must customize chevron rotation via CSS); no nested accordion example in docs
