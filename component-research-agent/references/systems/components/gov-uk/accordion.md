---
system: GOV.UK Design System
component: Accordion
url: https://design-system.service.gov.uk/components/accordion/
last_verified: 2026-03-28
confidence: high
---

# Accordion

## Approach
GOV.UK's Accordion is designed for long-form government content pages where users need to scan topics and expand only what's relevant. It is opinionated about when to use the component — the guidance explicitly states it should only be used when users need to choose between multiple sections and the content is long enough to justify hiding it. It includes a "Show all sections" / "Hide all sections" control at the top, which is a signature GOV.UK pattern for accessibility and user control. The component is progressively enhanced — it renders as a fully visible page without JavaScript, and accordion behavior is added when JS is available.

## Key Decisions
1. **Progressive enhancement** (HIGH) — Without JavaScript, all accordion content is visible. The accordion behavior is added as an enhancement, ensuring content is never hidden from users with JS disabled or in error states. This reflects GOV.UK's commitment to universal access.
2. **"Show all" global toggle** (HIGH) — The single toggle at the top to expand/collapse all sections is tested as essential for power users (researchers, caseworkers) who need to see all information at once and for users who want to print the full page.
3. **Summary text per section** (MEDIUM) — Each accordion item optionally shows summary text below the heading while the item is collapsed. This helps users decide whether to open a section, reducing unnecessary interactions for users with motor impairments.

## Notable Props
- `id`: required for JavaScript targeting
- `heading.text`: the section heading
- `summary.text`: optional visible summary shown when collapsed
- `content.html`: expanded panel content
- `expanded`: initial open state per item
- `rememberExpanded`: uses sessionStorage to persist state across page navigation

## A11y Highlights
- **Keyboard**: Enter/Space toggles sections; "Show all" button is standard button
- **Screen reader**: `aria-expanded` on each button; `aria-controls` links to panel; panel `id` referenced; "Show all" announces state change
- **ARIA**: Uses `<h2>` inside each trigger for heading hierarchy; panel has `role="region"` with `aria-labelledby`

## Strengths & Gaps
- **Best at**: Long-form content pages; progressive enhancement; "show all" control for power users
- **Missing**: No animation — sections snap open (deliberate, for performance and reduced motion); not designed for navigation use cases
