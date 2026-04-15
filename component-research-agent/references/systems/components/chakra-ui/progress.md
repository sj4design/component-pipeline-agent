---
system: Chakra UI
component: Progress / CircularProgress
url: https://chakra-ui.com/docs/components/progress
last_verified: 2026-03-28
confidence: high
---

# Progress / CircularProgress

## Approach
Chakra provides two progress components: Progress (linear bar) and CircularProgress (circular ring indicator). Both support determinate and indeterminate states, integrate with the colorScheme token system, and support custom value labels. The separation between linear and circular follows the common design pattern where linear progress indicates steps in a sequence and circular indicates loading/waiting states.

## Key Decisions
1. **Two separate progress types** (HIGH) — Progress (linear) and CircularProgress (circular) are different enough in visual treatment and use case to warrant separate components.
2. **hasStripe and isAnimated** (MEDIUM) — `hasStripe` adds a striped pattern to the progress bar; `isAnimated` animates the stripes. This is a visual flourish common in dashboards and upload indicators.
3. **CircularProgressLabel** (HIGH) — A sub-component that positions a label (value, icon, text) centered inside the circular progress ring. Common for donut-chart-style progress indicators.

## Notable Props
- `value`: 0-100
- `isIndeterminate`: boolean
- `colorScheme`: fill color token
- Progress: `hasStripe`, `isAnimated`, `borderRadius`
- CircularProgress: `size`, `thickness`, CircularProgressLabel for centered content

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; aria-valuenow, aria-valuemin, aria-valuemax; isIndeterminate removes valuenow
- **ARIA**: Both Progress and CircularProgress implement progressbar ARIA correctly

## Strengths & Gaps
- **Best at**: Both linear and circular; CircularProgressLabel; hasStripe/isAnimated; colorScheme
- **Missing**: No stepped/segmented progress; no progress for multi-step workflows
