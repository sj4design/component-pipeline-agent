---
system: Salesforce Lightning Design System
component: Progress Bar / Progress Ring
url: https://lightningdesignsystem.com/components/progress-bar/
last_verified: 2026-03-28
confidence: high
---

# Progress Bar / Progress Ring

## Approach
Lightning provides both Progress Bar (linear) and Progress Ring (circular) variants. Progress Ring is notable — a circular progress indicator showing completion percentage, used in Salesforce for record completion scores, profile completeness indicators, and step completion. Lightning also has a Progress Indicator (step tracker) component as a distinct component for multi-step wizard progress.

## Key Decisions
1. **Progress Ring variant** (HIGH) — Circular progress ring is unique to Lightning among this system set — used for CRM record completion scores and profile/record health indicators, providing a more compact visualization than a full-width bar.
2. **Progress Bar value display** (HIGH) — Progress bar shows percentage value within or alongside the bar, important for CRM processes where users need to know exact completion state.
3. **Circular fill animation** (MEDIUM) — Ring uses SVG stroke-dashoffset animation for smooth circular fill, providing visually polished progress display.

## Notable Props
- `value`: Completion percentage (0-100)
- `variant`: "circular" for Progress Ring vs default linear
- `label`: Accessible description
- `size`: Size variant for Progress Ring

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; aria-valuenow/min/max; aria-label; value communicated
- **ARIA**: Full progressbar ARIA on both linear and ring variants

## Strengths & Gaps
- **Best at**: Progress Ring (circular) variant for compact completion display; CRM completion score patterns
- **Missing**: No indeterminate animation on Progress Bar (Spinner handles that); Progress Indicator (steps) is a separate component
