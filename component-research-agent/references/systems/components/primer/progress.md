---
system: GitHub Primer
component: ProgressBar
url: https://primer.style/components/progress-bar
last_verified: 2026-03-28
confidence: high
---

# ProgressBar

## Approach
GitHub Primer's ProgressBar is a horizontal progress indicator used throughout GitHub for showing language breakdown percentages, repository storage usage, and workflow progress. Primer's ProgressBar notably supports multiple colored segments in a single bar — for example, showing code language composition as multiple colored portions within one bar (green for Ruby, orange for JavaScript, etc.).

## Key Decisions
1. **Multi-segment progress bar** (HIGH) — ProgressBar supports multiple colored segments in one bar, enabling GitHub's signature language composition bars that show percentage breakdown across multiple categories simultaneously.
2. **Color per segment** (HIGH) — Each segment in a multi-segment bar has its own bg color (using Primer color tokens or custom hex for language colors), enabling the rich language visualization GitHub uses.
3. **Inline vs full-width** (MEDIUM) — Progress bar supports thin inline variant for compact display within text or table cells alongside full-width display.

## Notable Props
- `progress`: Percentage for single-segment bar
- `segments`: Array of {percentage, bg} for multi-segment display
- `barSize`: "small" | "default" | "large" size variant
- `animated`: CSS animation for fill

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; aria-valuenow/min/max; aria-label describing what's being measured
- **ARIA**: role="progressbar"; multi-segment bars require careful aria-label describing the full breakdown

## Strengths & Gaps
- **Best at**: Multi-segment progress for language/category breakdowns; GitHub-specific visualization patterns; small inline variant
- **Missing**: No circular/ring variant; aria for multi-segment requires careful implementation for screen reader comprehension
