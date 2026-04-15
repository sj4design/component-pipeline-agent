---
system: Wise Design
component: Accordion
url: https://wise.design/components/accordion
last_verified: 2026-03-28
confidence: low
---

# Accordion

## Approach
Wise Design System uses Accordion for expanding FAQ sections, help content, and fee breakdowns in their financial transfer product. Wise's design philosophy prioritizes clarity and trustworthiness in financial contexts, so the Accordion is designed with clear visual boundaries and predictable expand/collapse behavior. The system's clean aesthetic means minimal decoration with focus on content legibility.

## Key Decisions
1. **Single-open mode default** (MEDIUM) — Financial product FAQs and help sections typically benefit from single-open mode to keep users focused on one answer at a time.
2. **Clean visual treatment** (MEDIUM) — Consistent with Wise's minimal design language, the accordion uses subtle borders and typography hierarchy without heavy background treatments.
3. **Smooth animation** (LOW) — Expansion animation is likely smooth and moderate-speed, consistent with Wise's polished product feel.

## Notable Props
- `expanded`: Controlled expansion state
- `onChange`: Toggle callback
- `title`: Header content

## A11y Highlights
- **Keyboard**: Standard Enter/Space toggle; Tab navigation between headers
- **Screen reader**: State announced via aria-expanded
- **ARIA**: Standard disclosure ARIA pattern expected

## Strengths & Gaps
- **Best at**: FAQ and help content disclosure in financial product contexts
- **Missing**: Limited public documentation — confidence low; details need verification
