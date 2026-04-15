---
system: Base Web (Uber)
component: Accordion
url: https://baseweb.design/components/accordion/
last_verified: 2026-03-28
confidence: medium
---

# Accordion

## Approach
Base Web's Accordion follows the same Overrides customization philosophy as all Base Web components. It provides a clean, functional accordion with sensible defaults that work within Uber's design language. The component supports both single and multiple expanded panels, and like all Base Web components, every internal element can be replaced via the `overrides` prop. The visual defaults are minimal and neutral, intended to be a starting point rather than a final design.

## Key Decisions
1. **Overrides for all sub-components** (HIGH) — The Root, Header, Content, and toggle icon can all be replaced. This is Base Web's answer to the prop-explosion problem: instead of adding new props for every visual variant, expose the internals for direct replacement.
2. **renderAll prop for SEO/print** (MEDIUM) — When `renderAll` is true, all accordion content is rendered in the DOM even when collapsed (hidden via CSS). This ensures content is indexable by search engines and available when printing, at the cost of a larger initial DOM.
3. **Accordion vs. StatefulAccordion** (MEDIUM) — Base Web provides both a controlled (`Accordion`) and uncontrolled (`StatefulAccordion`) version, following their stateful component pattern across the library. This makes both use cases ergonomic without one version being more complex than necessary.

## Notable Props
- `accordion`: boolean — when true, only one panel can be open at a time
- `renderAll`: boolean — renders all content regardless of open state
- `overrides`: customize Root, Header, Content, ToggleIcon, PanelContainer
- `expanded` / `onChange`: controlled state for `Accordion` variant

## A11y Highlights
- **Keyboard**: Enter/Space on header button; Tab navigation between items
- **Screen reader**: `aria-expanded` on trigger; panel referenced via `aria-controls`
- **ARIA**: Standard disclosure pattern; header uses native button element

## Strengths & Gaps
- **Best at**: Deep customization via overrides; renderAll for SEO use cases
- **Missing**: No animation built-in (must be added via overrides); visual defaults are very minimal
