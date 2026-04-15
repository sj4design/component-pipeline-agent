---
system: REI Cedar
component: ButtonGroup (Segmented Control)
url: https://cedar.rei.com/components/button-group
last_verified: 2026-03-28
confidence: medium
---

# ButtonGroup / Segmented Control

## Approach
REI Cedar's ButtonGroup or a dedicated segmented control pattern is used for filter mode selection and view toggles on REI.com (e.g., Online/In-Store availability toggle, List/Map view selector). Mobile-touch-friendly sizing applies.

## Key Decisions
1. **Filter and view mode toggles** (HIGH) — Primary use for product listing view and filter toggles.
2. **Touch-friendly sizing** (HIGH) — Segments sized for mobile tap interaction.
3. **Vue implementation** (MEDIUM) — Vue-based with Cedar's accessibility standards.

## Notable Props
- `value`, `onChange`, button options

## A11y Highlights
- **Keyboard**: Group keyboard navigation
- **Screen reader**: Appropriate group and selection announcement
- **ARIA**: Radio or button group semantics

## Strengths & Gaps
- **Best at**: E-commerce view and filter toggles; mobile sizing
- **Missing**: Medium confidence; exact Cedar implementation uncertain
