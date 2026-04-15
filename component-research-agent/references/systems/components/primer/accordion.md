---
system: GitHub Primer
component: Accordion (Details/Summary)
url: https://primer.style/components/details
last_verified: 2026-03-28
confidence: medium
---

# Accordion / Details

## Approach
GitHub Primer handles accordion-like disclosure using the native HTML `<details>` / `<summary>` element pattern, wrapped in a Details component. For grouped accordion behavior, Primer relies on composing multiple Details components rather than providing a dedicated Accordion container component. This reflects GitHub's philosophy of using semantic HTML where possible. Primer also provides a custom overlay-based variant for more complex disclosure needs.

## Key Decisions
1. **Native details/summary foundation** (HIGH) — Uses HTML `<details>`/`<summary>` as the base, leveraging native browser behavior and accessibility rather than ARIA-simulated disclosure, favoring semantic HTML over custom implementations.
2. **No grouped accordion container** (HIGH) — Primer does not enforce a grouped accordion container; developers compose multiple Details elements, giving flexibility at the cost of less built-in accordion-group behavior (like single-open enforcement).
3. **Open prop for controlled behavior** (MEDIUM) — Exposes the native `open` attribute as a React prop for controlled state when needed, keeping the API thin.

## Notable Props
- `open`: Controlled open state (mirrors native details[open])
- `onToggle`: Callback when detail disclosure state changes
- `overlay`: Boolean enabling overlay styling variant for more complex use cases

## A11y Highlights
- **Keyboard**: Enter/Space on summary element toggles; native browser behavior handles this
- **Screen reader**: Native details/summary provides built-in expanded/collapsed state announcement in supporting browsers
- **ARIA**: No custom ARIA needed when using native details; Primer adds role="button" on summary in some contexts

## Strengths & Gaps
- **Best at**: Semantic HTML disclosure; zero-ARIA overhead; works without JavaScript for basic cases
- **Missing**: No built-in single-open-at-a-time accordion group management; animation support limited by native details element
