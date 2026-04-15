---
system: Fluent 2 (Microsoft)
component: Skeleton
url: https://fluent2.microsoft.design/components/web/react/skeleton/
last_verified: 2026-03-28
confidence: high
---

# Skeleton

## Approach
Fluent 2 provides Skeleton and SkeletonItem components for loading state placeholders. SkeletonItem renders individual placeholder shapes with configurable size and border radius. Multiple SkeletonItems are composed within a Skeleton container to approximate complex content layouts. The component uses Fluent's shimmer animation tokens for consistent loading visuals.

## Key Decisions
1. **SkeletonItem as building block** (HIGH) — Individual SkeletonItems take `size` (controlling height in pixels) and can be styled as rectangles or circles. This building-block approach requires composing multiple items to match content structure but provides full flexibility for complex skeleton layouts.
2. **animation prop on Skeleton container** (HIGH) — The `animation` prop on the Skeleton root sets the animation type (`"wave"` or `"pulse"`) for all child SkeletonItems, ensuring consistent animation across the entire loading state without per-item configuration.
3. **aria-busy pattern** (MEDIUM) — Fluent recommends wrapping skeleton screens in a container with `aria-busy="true"` aria-label describing what is loading, removing it when content loads. This communicates loading state to screen readers without exposing placeholder content.

## Notable Props
- `animation`: `"wave" | "pulse"` on Skeleton container
- SkeletonItem: `size` (height in px), `shape` ("rectangle" | "circle" | "square")
- `style`: width control via inline styles

## A11y Highlights
- **Keyboard**: No keyboard interaction
- **Screen reader**: Container with aria-busy="true" communicates loading; SkeletonItems themselves are hidden
- **ARIA**: aria-busy on container; aria-hidden on individual skeleton items

## Strengths & Gaps
- **Best at**: wave/pulse animation on container; shape prop for circles and squares; aria-busy guidance
- **Missing**: No isLoaded toggle; no SkeletonText with configurable lines; requires manual composition
