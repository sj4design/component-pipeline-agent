---
system: GOV.UK Design System
component: Not available natively
url: https://design-system.service.gov.uk/styles/layout/
last_verified: 2026-03-29
confidence: high
---

# Divider

## Approach
GOV.UK Design System provides no dedicated divider or horizontal rule component. Visual separation between content sections is achieved through the spacing and layout system — specifically the GOV.UK Frontend spacing scale (`govuk-!-margin-bottom-*`, `govuk-!-padding-top-*`) combined with structural HTML elements. Where a semantic boundary is needed between groups of related form fields, GOV.UK's `<fieldset>` with a `<legend>` provides both visual grouping and screen reader semantics without requiring any decorative line. For page-level section breaks, the Summary List component renders its own borders as part of the component, and the Section Break utility class (`govuk-section-break`) does exist as a thin utility for adding an `<hr>` with optional visual weight — but it is documented under typography rather than components. This approach reflects GOV.UK's philosophy that decorative visual elements should not become reusable components: spacing and structure should do the work, not ornamental dividers.

## Key Decisions
1. **Spacing over decoration** (HIGH) — GOV.UK's layout philosophy holds that adequate whitespace communicates grouping more accessibly than lines, which can be ignored or misread by users with cognitive disabilities or low vision.
2. **`govuk-section-break` utility** (MEDIUM) — A CSS utility class does exist for `<hr>` elements with three visual weights (`govuk-section-break--visible`, `govuk-section-break--xl/l/m`), but it is scoped to long-form content pages (e.g., guidance articles) rather than UI components.
3. **Semantic HTML structure preferred** (HIGH) — `<fieldset>`, `<legend>`, heading hierarchy (`<h2>`, `<h3>`), and summary lists handle section separation in transactional forms — producing accessible grouping that a decorative line could never replicate.

## Notable Props
- No dedicated component exists
- Typography utility: `<hr class="govuk-section-break govuk-section-break--xl govuk-section-break--visible">`
- Modifier classes: `govuk-section-break--xl`, `govuk-section-break--l`, `govuk-section-break--m`
- `govuk-section-break--visible` toggles the visible border (default is invisible / spacing only)

## A11y Highlights
- **Keyboard**: Not applicable — purely visual/structural; no interactive element
- **Screen reader**: `<hr>` is announced as a "separator" in some screen readers; GOV.UK guidance recommends using heading hierarchy rather than `<hr>` for meaningful section delineation to ensure consistent SR behavior
- **ARIA**: No ARIA attributes; native `<hr>` semantics apply (`role="separator"` implicitly)

## Strengths & Gaps
- **Best at**: Enforcing structural clarity through spacing and semantic HTML, avoiding decorative patterns that add visual noise without semantic value
- **Missing**: No purpose-built divider component with design system tokens; teams needing styled separators in application UIs must compose from the section-break utility or apply custom CSS, with no Nunjucks macro available
