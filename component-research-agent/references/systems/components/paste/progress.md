---
system: Twilio Paste
component: Progress Bar
url: https://paste.twilio.design/components/progress-bar
last_verified: 2026-03-28
confidence: high
---

# Progress Bar

## Approach
Twilio Paste's Progress Bar displays the completion percentage of a determinate process. Paste distinguishes between Progress Bar (determinate, shows specific percentage) and Spinner (indeterminate). The component uses the native HTML progress element as a foundation or equivalent ARIA role="progressbar" semantics, and integrates with Paste's color token system for the fill color.

## Key Decisions
1. **Determinate only** (HIGH) — Progress Bar is for processes with known completion percentage; Spinner handles indeterminate loading, creating a clear semantic split between the two loading indicators.
2. **Label + value display** (HIGH) — Progress Bar includes a label and optional value display (e.g., "75% complete" or "3 of 4 steps") to communicate progress textually alongside the visual bar.
3. **Color variants** (MEDIUM) — Progress fill color uses semantic tokens (default, success, error) enabling progress bars to communicate state (uploading, completed, failed).

## Notable Props
- `value`: Current progress value (0-100)
- `label`: Accessible label describing what is progressing
- `valueLabel`: Human-readable value description (e.g., "75%")
- `variant`: Color variant (default/success/error)
- `isAnimated`: Striped animation for active progress

## A11y Highlights
- **Keyboard**: Not interactive; no keyboard behavior
- **Screen reader**: role="progressbar"; aria-valuenow, aria-valuemin, aria-valuemax; aria-label from label prop; aria-valuetext from valueLabel
- **ARIA**: role="progressbar"; aria-valuenow/min/max; aria-valuetext for meaningful description

## Strengths & Gaps
- **Best at**: Semantic determinate/indeterminate split; value text for screen readers; color variants for state
- **Missing**: No stepped progress bar variant; no animated progress simulation
