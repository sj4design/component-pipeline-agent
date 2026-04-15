---
system: Base Web (Uber)
component: ProgressBar
url: https://baseweb.design/components/progress-bar/
last_verified: 2026-03-28
confidence: medium
---

# ProgressBar

## Approach
Base Web's ProgressBar is a linear progress indicator following the Overrides pattern. It supports determinate and infinite (indeterminate) modes. Uber uses progress bars in file upload indicators, step completion tracking, and loading states in operational dashboards.

## Key Decisions
1. **infinite prop for indeterminate** (HIGH) — `infinite` mode cycles the fill animation for loading states where progress percentage is unknown.
2. **Overrides for styling** (HIGH) — Standard Base Web customization pattern.

## Notable Props
- `value`: 0-100
- `infinite`: boolean for indeterminate
- `successValue`: threshold at which success styling applies
- `overrides`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; aria-valuenow, aria-valuemin, aria-valuemax
- **ARIA**: Infinite mode handles aria correctly for indeterminate state

## Strengths & Gaps
- **Best at**: successValue threshold; infinite mode; Overrides
- **Missing**: No circular progress; no stepped/segmented progress
