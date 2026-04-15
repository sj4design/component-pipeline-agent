---
system: Gestalt (Pinterest)
component: SkeletonLoader
url: https://gestalt.pinterest.systems/web/skeletonloader
last_verified: 2026-03-29
confidence: high
---

# Skeleton

## Approach
Gestalt's SkeletonLoader is one of the most extensively used components across Pinterest's product, reflecting the platform's infinite scroll architecture and content-heavy nature. Pinterest's home feed, search results, and board views load content asynchronously in large batches; SkeletonLoader provides the shimmer placeholder states that fill grid positions while Pin images and metadata load. The component is designed to closely mirror the shape and proportions of the content it replaces — a Pin skeleton matches the aspect ratio of the actual pin card, ensuring that layout shift is minimized when real content arrives. Pinterest's visual-first, image-heavy experience makes skeleton states especially important: showing a rough content shape maintains the user's spatial orientation in the masonry grid while preventing jarring layout reflow. The component provides a subtle shimmer animation to communicate active loading without requiring spinners that would overwhelm a dense content grid.

## Key Decisions
1. **Shape-matched to content layout** (HIGH) — SkeletonLoader is built to replicate the specific shape of Pin cards, profile headers, and list items. Pinterest's masonry grid would have severe layout shift if skeletons used generic block shapes instead of content-matched proportions; shape matching preserves layout stability.
2. **Shimmer animation by default** (HIGH) — The shimmer (gradient sweep) animation communicates "loading" without requiring user interpretation of a spinner in every grid cell. A single shimmering background across a full grid of Pin skeletons is visually cohesive and less distracting than individual spinners.
3. **Composable primitive shapes** (HIGH) — SkeletonLoader exposes shape primitives (SkeletonLoader.Box, SkeletonLoader.Avatar, SkeletonLoader.Text) that can be composed into arbitrary loading state layouts. This composability ensures the component works not just for Pins but for any loading state across Pinterest's product.
4. **Accessible motion reduction support** (MEDIUM) — The shimmer animation is automatically disabled or slowed when the user's OS `prefers-reduced-motion` setting is active, ensuring the component is accessible to users sensitive to motion.
5. **No content flashing — smooth swap on load** (MEDIUM) — SkeletonLoader is designed to be replaced seamlessly by real content without a flash; consuming code is expected to conditionally render either the skeleton or the real content, keeping transitions clean.

## Notable Props
- `accessibilityLabel`: Required string for screen readers to announce the loading state (e.g., "Loading pins")
- `type`: Sub-component shape variant — used on SkeletonLoader.Box, SkeletonLoader.Avatar, SkeletonLoader.Text
- `width`: Width of the skeleton shape in pixels or percentage
- `height`: Height of the skeleton shape in pixels (for Box variant)
- `color`: `"default"` | `"secondary"` — controls background tone for different surface contexts (white vs. gray backgrounds)

## A11y Highlights
- **Keyboard**: SkeletonLoader is non-interactive and removed from the tab order; it is a presentational loading indicator only.
- **Screen reader**: The component uses `role="progressbar"` with `aria-label` (from `accessibilityLabel` prop) to communicate loading state to assistive technologies. Screen readers announce the loading state without describing individual skeleton shapes.
- **ARIA**: `role="progressbar"` with `aria-valuemin="0"`, `aria-valuemax="100"` — since the exact loading progress is unknown, `aria-valuenow` is omitted (indeterminate progress); `aria-label` is required to describe what is loading.

## Strengths & Gaps
- **Best at**: Masonry grid loading states that closely match Pin card proportions; shimmer animation with reduced motion support; composable primitives for diverse loading layouts; extensively battle-tested across Pinterest's high-traffic infinite scroll surfaces.
- **Missing**: No percentage-based or determinate progress variant (all states are indeterminate); no built-in transition animation between skeleton and loaded content (fade-in must be implemented by consuming code); limited built-in vertical rhythm matching for complex multi-column layouts; no dark mode specific shimmer color automatically — dark surface adaptations require manual color prop usage.
