---
system: Gestalt (Pinterest)
component: ProgressBar
url: https://gestalt.pinterest.systems/web/progressbar
last_verified: 2026-03-28
confidence: medium
---

# ProgressBar

## Approach
Gestalt's ProgressBar is used in Pinterest's advertising platform for campaign completion, budget consumption, and impression delivery progress. It's a simple linear progress bar with a straightforward API. Pinterest's ad platform needs to show budget pacing (how fast you're spending your daily budget) as a common metric.

## Key Decisions
1. **accessibilityLabel required** (HIGH) — Like other Gestalt components, the accessibility label is required. Progress bars without labels are meaningless to screen reader users.
2. **Color variants for status** (MEDIUM) — Different colors for different progress states (on-target, at-risk, overspent) map to Pinterest's advertising status communication.

## Notable Props
- `accessibilityLabel`: required accessible description
- `value`: 0-100
- `color`: status-based color

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; required accessibilityLabel; aria-valuenow
- **ARIA**: Enforced accessible label via required prop

## Strengths & Gaps
- **Best at**: Required accessibilityLabel enforcement; advertising progress patterns
- **Missing**: No indeterminate state; no segmented/multi-part progress
