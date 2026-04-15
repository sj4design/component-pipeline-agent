---
system: GOV.UK Design System
component: Select
url: https://design-system.service.gov.uk/components/select/
last_verified: 2026-03-28
confidence: high
---

# Select

## Approach
GOV.UK uses the native HTML `<select>` element for its Select component. This is a principled decision: native selects work on all devices, require no JavaScript, are keyboard accessible by default, and use the platform's native UI (iOS wheel picker, Android dropdown, desktop OS dropdown). GOV.UK's guidance explicitly states that custom dropdowns are harder to use and less accessible than native selects in most cases. The component adds GOV.UK's styling conventions while preserving native behavior entirely.

## Key Decisions
1. **Native select always** (HIGH) — GOV.UK has found through user research that custom select implementations consistently perform worse than native selects for government services, particularly on mobile and for users with accessibility needs. The native select is the deliberate choice.
2. **Error state and hint text** (HIGH) — The Select component integrates with GOV.UK's form error pattern: a red border, error message above the select, and an error summary at the top of the page. Clear, consistent error communication is central to GOV.UK's form design.
3. **Conditional reveal** (MEDIUM) — GOV.UK provides a pattern where selecting a value reveals additional form fields. This is built into the forms pattern (not the select component itself) but is tightly associated with select usage.

## Notable Props
- No JavaScript component — Nunjucks macro
- `id`, `name`: form binding
- `items[]`: option text, value, selected, disabled
- `label.text`: visible label
- `hint.text`: help text below label
- `errorMessage.text`: validation error message

## A11y Highlights
- **Keyboard**: Native browser select behavior — full keyboard operation
- **Screen reader**: Native select semantics; label, hint, and error associated via id/for and aria-describedby
- **ARIA**: No custom ARIA needed; native select is most accessible option

## Strengths & Gaps
- **Best at**: Universal accessibility; no-JS operation; mobile platform-native picker
- **Missing**: Cannot style option elements (platform limitation); no search/filter within options; no grouped visual hierarchy
