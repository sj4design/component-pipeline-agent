---
system: Nord (Nordhealth)
component: Date Picker (nord-date-picker web component)
url: https://nordhealth.design/components/date-picker/
last_verified: 2026-03-28
confidence: low
---

# Date Picker

## Approach
Nord Design System provides a DatePicker as a custom web component (`<nord-date-picker>`), reflecting Nordhealth's commitment to framework-agnostic, web standards-based components. The component is designed for healthcare applications — clinical scheduling, patient appointment booking, and medical record date entry. Healthcare contexts require reliable, error-free date input, which shapes Nord's approach: clear validation feedback, support for restricted date ranges (past-only for historical data, future-only for appointments), and unambiguous date formatting.

## Key Decisions
1. **Web component (Custom Element)** (HIGH) — Nord uses the Web Components standard, making the DatePicker usable in any framework (React, Vue, Angular, vanilla JS) without adapter packages. This reflects Nordhealth's need to support multiple product teams using different tech stacks.
2. **Healthcare-appropriate constraints** (HIGH) — The component has strong support for min/max dates and disabled date ranges. In healthcare, booking a procedure date in the past or scheduling beyond coverage dates are critical errors to prevent at the UI layer.
3. **Inline validation** (MEDIUM) — Like all Nord form components, the DatePicker provides inline validation with clear error messages as part of the component API, not requiring external validation libraries. Healthcare forms require clear, immediate feedback on date format errors.

## Notable Props
- `value`: ISO date string (YYYY-MM-DD)
- `min` / `max`: ISO date strings for constraints
- `label`: visible label (required for accessibility)
- `helper-text`: additional context/instructions
- `error`: error message string
- `disabled`: disabled state

## A11y Highlights
- **Keyboard**: Standard input and calendar navigation; focus management between input and calendar
- **Screen reader**: Label, helper text, and error messages are all properly associated; calendar grid is labeled
- **ARIA**: Web component internals use appropriate ARIA; label and error associations follow WCAG requirements

## Strengths & Gaps
- **Best at**: Web component portability; healthcare constraint patterns; inline validation integration
- **Missing**: Limited documentation compared to React-based alternatives; custom event API differs from React event patterns; verify exact API at nordhealth.design
