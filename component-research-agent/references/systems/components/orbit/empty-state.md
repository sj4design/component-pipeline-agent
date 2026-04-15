---
system: Orbit (Kiwi.com)
component: EmptyState
url: https://orbit.kiwi/components/information/empty-state/
last_verified: 2026-03-29
confidence: high
---

# Empty State

## Approach
Orbit's EmptyState component handles the no-results and no-content scenarios that are critically important in a travel search product. When a flight search returns zero results (due to overly restrictive filters or no available routes), the empty state must clearly communicate why results are missing and offer a concrete recovery action — "Adjust filters" or "Try different dates." A poor empty state in this context leads to user abandonment, so Orbit treats it as a first-class UI concern rather than an afterthought. The component combines an illustration (from Orbit's travel-themed illustration set), a title, a descriptive body, and an action slot, following the standard empty-state content hierarchy while ensuring the illustration is always travel-contextually appropriate.

## Key Decisions
1. **Illustration slot** (HIGH) — Travel-themed illustrations (empty suitcase, no-flights icon) make the empty state feel crafted rather than generic, maintaining brand consistency at a moment of user frustration.
2. **Action slot** (HIGH) — A primary CTA is always available within the component (e.g., "Clear filters", "Search again"), reducing the number of steps a user must take to recover from the empty state.
3. **Flexible body content** (MEDIUM) — Accepts both a simple description string and richer React children in the body slot, allowing teams to render links or formatted text explaining why results are empty.

## Notable Props
- `illustration`: Orbit Illustration component reference for the visual
- `title`: short heading summarizing the empty state
- `description`: supporting text explaining the situation or suggesting actions
- `action`: slot for a primary Button or TextLink

## A11y Highlights
- **Keyboard**: Any action button inside is keyboard-accessible; the illustration is decorative and not focusable.
- **Screen reader**: Title and description are read in order; illustration carries `aria-hidden="true"` to avoid announcing decorative SVG content.
- **ARIA**: No landmark role needed; content is self-describing within the page context.

## Strengths & Gaps
- **Best at**: Flight search no-results states with travel-themed illustrations and integrated recovery CTAs; strong brand voice at a high-frustration moment.
- **Missing**: No variant for "first use" empty states (onboarding prompts); no support for multiple action options (primary + secondary).
