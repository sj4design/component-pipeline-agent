---
system: GOV.UK Design System
component: Step by step navigation
url: https://design-system.service.gov.uk/patterns/step-by-step-navigation/
last_verified: 2026-03-29
confidence: high
---

# Steps / Step by Step Navigation

## Approach
GOV.UK implements a "step by step navigation" pattern specifically designed for guiding users through multi-stage government processes such as applying for a driving licence, registering to vote, or setting up a business. Unlike a wizard-style stepper embedded in a form, the GOV.UK step-by-step is a navigational pattern — each step links to a separate page or external service. This reflects GOV.UK's one-thing-per-page design principle: users are not guided through inline steps on a single page but instead navigate a sequence of pages, each handling one distinct task. The component renders as an expandable accordion-style list in the left sidebar, and a sidebar indicator on individual pages shows the user's position in the overall journey.

## Key Decisions
1. **Navigation pattern, not form wizard** (HIGH) — GOV.UK's step-by-step is not a traditional stepper/wizard with prev/next buttons on a single page. Instead, it organises a multi-page journey across GOV.UK content pages and external services. This distinction is fundamental: government journeys often span multiple departments and websites, making an embedded wizard technically impossible. The pattern acknowledges this by using links rather than controlled form progression.
2. **Expandable accordion structure** (HIGH) — Each step can be expanded to reveal sub-tasks within that step. This allows users to see all sub-steps (e.g., "1a. Check eligibility", "1b. Gather documents") without navigating away. The expanded state uses the same disclosure mechanism as the GOV.UK Accordion component.
3. **Completed state tracking** (MEDIUM) — Individual steps can be marked as "completed" via JavaScript, providing visual progress indication. However, this is client-side only — GOV.UK does not prescribe server-side progress persistence for the component itself, as different steps may involve external services.
4. **Page-level indicator** (MEDIUM) — On content pages that belong to a step-by-step journey, a small "Part of" indicator appears, showing the step number and linking back to the full step-by-step overview. This creates wayfinding across a distributed journey.

## Notable Props
- Nunjucks macro not yet standardised in core; implemented as a pattern with specific HTML structure
- `data-module="govuk-step-by-step-navigation"` triggers JavaScript enhancement
- Step items use `<li class="app-step-nav__step">` structure
- Optional `js-step-controls` for show/hide all toggle

## A11y Highlights
- **Keyboard**: Each step trigger is a `<button>` element; Tab navigates between steps; Enter/Space toggles expansion; Links within steps are standard anchor elements
- **Screen reader**: Expanded state communicated via aria-expanded on trigger button; step list uses ordered list (`<ol>`) for implicit step numbering
- **ARIA**: `aria-expanded` on each step trigger; content panels use `aria-hidden` when collapsed; completed steps can use `aria-label` to communicate status

## Strengths & Gaps
- **Best at**: Cross-department, cross-service journey navigation; communicating complex government processes that span multiple websites and organisations
- **Missing**: No inline progress tracking or form wizard functionality; no animated transitions; relies on external services correctly implementing the "Part of" indicator
