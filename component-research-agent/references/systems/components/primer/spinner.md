---
system: GitHub Primer
component: Spinner
url: https://primer.style/components/spinner
last_verified: 2026-03-28
confidence: high
---

# Spinner

## Approach
GitHub Primer's Spinner is a simple circular loading indicator used throughout GitHub for async operations — loading pull request diffs, processing repository actions, waiting for CI results. Clean SVG animation consistent with GitHub's minimal aesthetic. Supports size variants and can be paired with descriptive text.

## Key Decisions
1. **SVG animation** (HIGH) — SVG stroke-dashoffset animation for the spinner ring, providing clean vector-based animation without GIF or complex CSS keyframes.
2. **Size variants** (MEDIUM) — Small, medium, large sizes for different contexts from inline button loading to full-page loading states.
3. **sr-only label pattern** (HIGH) — Primer recommends using visually hidden text alongside the Spinner to provide a loading context for screen readers, rather than only aria-label on the spinner itself.

## Notable Props
- `size`: "small" | "medium" | "large"
- `aria-label`: Accessible label for screen readers

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: aria-label on the SVG container communicates what is loading
- **ARIA**: aria-label required for meaningful announcement; Primer recommends co-locating with visible loading text where possible

## Strengths & Gaps
- **Best at**: Clean SVG animation; GitHub's visual style; accessible with aria-label; co-locating with text pattern
- **Missing**: No overlay loading pattern; no dot/alternative animation style
