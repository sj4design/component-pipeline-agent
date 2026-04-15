---
system: Fluent 2 (Microsoft)
component: Accordion
url: https://fluent2.microsoft.design/components/web/react/accordion/usage
last_verified: 2026-03-28
confidence: high
---

# Accordion

## Approach
Fluent 2's Accordion component follows Fluent's cross-platform design language and is built to work in both web applications and native contexts through Fluent's multi-platform approach. The component uses Fluent's token system for spacing, color, and typography, and adheres to Microsoft's accessibility standards (which go beyond WCAG 2.1 to include their own Accessibility Insights guidelines). Fluent's accordion renders with subtle motion animations that respect the user's reduced-motion preference and uses Fluent's elevation and surface tokens for visual depth.

## Key Decisions
1. **Multiple open items by default** (HIGH) — Fluent's Accordion allows multiple panels open simultaneously by default, reflecting Microsoft's research that users in productivity applications (Teams channels, Settings panels) expect to compare content across expanded sections. Single-item mode requires explicit `collapsible` configuration.
2. **Panel navigation panel pattern** (HIGH) — Fluent uses Accordion heavily in navigation panels (Teams left sidebar, Office settings). This shapes the component to support header-with-icon patterns and nested list rendering inside panels, not just text content.
3. **Token-based elevation** (MEDIUM) — Accordion items use Fluent's surface and elevation tokens, so they visually integrate with different background surfaces (page, card, pane). This prevents the accordion from looking out of place when used inside a panel or card.

## Notable Props
- `openItems`: controlled set of open item values
- `onToggle`: callback when an item is toggled
- `collapsible`: when true with single-item mode, allows closing the last open item
- `multiple`: allows multiple items open simultaneously
- `as`: polymorphic rendering (e.g., render header as h2, h3)

## A11y Highlights
- **Keyboard**: Enter/Space on AccordionHeader toggles panel; Tab navigates between headers
- **Screen reader**: `aria-expanded` on header button; `aria-controls` references panel `id`; panel has `role="region"` with `aria-labelledby`
- **ARIA**: Full ARIA disclosure widget pattern; heading level is configurable to maintain document outline

## Strengths & Gaps
- **Best at**: Navigation panel patterns; heading level configurability; cross-surface token integration
- **Missing**: No "expand all" control built-in; animation customization requires token overrides
