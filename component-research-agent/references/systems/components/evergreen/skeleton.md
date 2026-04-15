---
system: Evergreen (Segment/Twilio)
component: Not available natively
url: https://evergreen.segment.com/components/
last_verified: 2026-03-29
confidence: high
---

# Skeleton

## Approach
Evergreen does not include a Skeleton loader component. Segment's design system uses Spinner (an animated circular loading indicator) as the primary loading state pattern across its dashboards. This choice reflects Evergreen's minimalist philosophy and the nature of Segment's data loading patterns: API responses for sources, destinations, and event data either load quickly (sub-second) or require a longer processing job (minutes), with few intermediate cases where skeleton screens would provide meaningful layout preview. For fast loads, a brief spinner is less visually disruptive than a skeleton screen that flashes in and out. For slow loads (e.g., generating a large audience computation), a progress indicator with status messaging is more informative than a content-shaped placeholder. The absence of skeleton loaders is also consistent with Evergreen's decision to avoid adding components that its product team has not shipped in production.

## Key Decisions
1. **Spinner as the default loading pattern** (HIGH) — Evergreen's product team standardized on the Spinner component for all async loading states; having both Spinner and Skeleton would create ambiguity about when to use each.
2. **Fast loads vs. slow jobs** (HIGH) — Segment's API responses tend toward bimodal latency: quick reads (< 500ms, where a spinner is fine) and background jobs (> 5s, where a progress status message is more useful than a skeleton). Skeleton screens are most valuable in the middle range, which is less common in Segment's product.
3. **Escape hatch via CSS** (LOW) — Teams who need skeleton effects can achieve them with CSS animation on Box components using Evergreen's color tokens for the pulse color, without requiring a named component.

## Notable Props
- N/A — component not present in Evergreen. Use `Spinner` for loading states.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A (Spinner uses `role="progressbar"` with `aria-label="Loading"`).
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A Skeleton loader. Teams needing content-shaped loading placeholders should use CSS animation (shimmer keyframe) applied to Box components with Evergreen's neutral color tokens, or import a standalone skeleton library.
