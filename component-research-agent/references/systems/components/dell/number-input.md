---
system: Dell Design System
component: Number Input
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Number Input

## Approach
Dell Design System's Number Input is used for quantity selection in e-commerce (product quantities) and numeric configuration values in enterprise management (timeout values, resource counts, port numbers).

## Key Decisions
1. **Quantity and configuration values** (MEDIUM) — Used for both e-commerce quantity and enterprise numeric config.
2. **Stepper buttons** (LOW) — +/- buttons likely for quantity selection.
3. **Constraint validation** (LOW) — Min/max for configuration values.

## Notable Props
- `value`, `min`, `max`, `step`, `onChange`

## A11y Highlights
- **Keyboard**: Spinbutton or stepper button interaction
- **Screen reader**: Value and constraints announced
- **ARIA**: Standard spinbutton ARIA

## Strengths & Gaps
- **Best at**: E-commerce and enterprise numeric input
- **Missing**: Low confidence — verify before use
