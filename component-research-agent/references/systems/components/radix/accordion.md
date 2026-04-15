---
system: Radix UI (WorkOS)
component: Accordion
url: https://www.radix-ui.com/primitives/docs/components/accordion
last_verified: 2026-03-28
confidence: high
---

# Accordion

## Approach
Radix Accordion is a fully accessible, headless accordion primitive that separates structure from style entirely. It ships as composable parts — Root, Item, Header, Trigger, Content — that map directly to WAI-ARIA disclosure widget requirements. The design philosophy is to own the interaction model (keyboard navigation, ARIA attributes, open/close state management) while letting consumers apply any CSS or CSS-in-JS solution for appearance. This means the component works equally well in a design token system, a utility-class framework, or a custom stylesheet.

## Key Decisions
1. **Single vs. multiple open items** (HIGH) — Controlled via the `type` prop (`"single"` or `"multiple"`). This is a structural decision because the two modes require different state shapes — single uses a string, multiple uses an array. Radix models this explicitly rather than using a boolean flag.
2. **Collapsible single mode** (MEDIUM) — When `type="single"`, the `collapsible` prop allows the open item to be toggled closed. Without it, one item is always open. This matches different UX needs: always-one-open for navigation panels, collapsible for FAQ sections.
3. **Animated content via CSS custom properties** (MEDIUM) — Radix exposes `--radix-accordion-content-height` as a CSS variable on the Content element, enabling smooth height animations without JavaScript measurement. This is a specifically Radix-idiomatic pattern.

## Notable Props
- `type`: `"single" | "multiple"` — determines state model; HIGH impact on implementation
- `collapsible`: `boolean` — only valid with `type="single"`; allows full collapse
- `defaultValue` / `value` / `onValueChange`: uncontrolled/controlled state management
- `disabled`: disables all items; can also be applied per-item

## A11y Highlights
- **Keyboard**: Enter/Space activates trigger; Tab moves between triggers; no arrow key navigation (per WAI-ARIA button disclosure pattern, not a composite widget)
- **Screen reader**: Trigger has `aria-expanded` reflecting open state; Content has `aria-labelledby` pointing to the Trigger
- **ARIA**: `role="region"` on Content when header is present; `role="button"` is implicit via `<button>` element on Trigger

## Strengths & Gaps
- **Best at**: Clean ARIA implementation, animation-ready CSS variable, flexible single/multiple modes
- **Missing**: No built-in animation, no icon slot (must be added by consumer), no nested accordion pattern guidance
