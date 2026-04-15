---
system: Orbit (Kiwi.com)
component: Loading Bar / ProgressBar
url: https://orbit.kiwi/components/loading-bar/
last_verified: 2026-03-28
confidence: medium
---

# Loading Bar / Progress

## Approach
Orbit provides a Loading Bar component for page-level loading indication, primarily for use during route transitions in the booking flow. The component shows a thin progress bar at the top of the page, similar to nprogress pattern. For more granular progress, Orbit may use other patterns. The travel context means most "progress" is either page loading or booking step completion.

## Key Decisions
1. **Top-of-page loading bar** (HIGH) — Page-level loading indicator for navigation between booking steps is more appropriate than inline progress bars in travel apps.
2. **Booking step progress** (MEDIUM) — Kiwi.com's multi-step booking flow shows step completion via the stepper/steps pattern rather than a percentage progress bar.

## Notable Props
- Loading Bar: likely `loading` boolean, progress percentage
- Verify exact API at orbit.kiwi

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Loading state should be announced
- **ARIA**: role="progressbar" or similar

## Strengths & Gaps
- **Best at**: Top-of-page loading for travel app navigation
- **Missing**: Standard linear progress for other use cases; verify exact API
