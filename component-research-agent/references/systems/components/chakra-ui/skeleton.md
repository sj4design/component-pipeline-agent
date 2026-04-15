---
system: Chakra UI
component: Skeleton
url: https://chakra-ui.com/docs/components/skeleton
last_verified: 2026-03-28
confidence: high
---

# Skeleton

## Approach
Chakra UI provides Skeleton, SkeletonCircle, and SkeletonText for loading placeholder states. Skeleton renders a rectangular shimmer placeholder; SkeletonCircle renders a circular one (for avatars); SkeletonText renders multiple lines of text placeholder with configurable line count and spacing. The `isLoaded` prop allows the skeleton to fade out and show real content once loaded.

## Key Decisions
1. **isLoaded with fade transition** (HIGH) — `<Skeleton isLoaded>` fades from skeleton to real content when loading completes. This single prop makes Skeleton a wrapper that transparently shows/hides without restructuring component trees.
2. **SkeletonText with noOfLines** (HIGH) — `<SkeletonText noOfLines={4}>` creates a realistic multi-line text placeholder. The last line is shorter by default to mimic natural text endings.
3. **startColor / endColor shimmer customization** (MEDIUM) — The shimmer animation colors are customizable via these props, allowing skeleton colors to match the target content's background rather than using the default gray shimmer.

## Notable Props
- `isLoaded`: toggle between skeleton and real content
- `fadeDuration`: fade transition duration in seconds
- `speed`: shimmer animation speed
- `startColor` / `endColor`: shimmer gradient colors
- SkeletonText: `noOfLines`, `spacing`, `skeletonHeight`
- SkeletonCircle: `size`

## A11y Highlights
- **Keyboard**: No keyboard interaction
- **Screen reader**: Hidden from screen readers (aria-hidden); real content announced when loaded
- **ARIA**: Skeleton placeholders should not be announced; isLoaded content becomes visible to AT

## Strengths & Gaps
- **Best at**: isLoaded wrapper pattern; SkeletonText noOfLines; SkeletonCircle for avatars; shimmer color customization
- **Missing**: No skeleton for complex component shapes; no built-in delay before showing skeleton
