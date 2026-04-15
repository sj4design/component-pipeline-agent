---
system: Base Web (Uber)
component: Skeleton
url: https://baseweb.design/components/skeleton/
last_verified: 2026-03-28
confidence: medium
---

# Skeleton

## Approach
Base Web's Skeleton component provides rectangular loading placeholders with an animated shimmer effect. It is a basic building block for constructing skeleton screens — individual Skeleton elements are composed to approximate the layout of the loading content. There is no SkeletonText or SkeletonCircle variant; all shapes are handled by sizing the Skeleton component with width, height, and borderRadius.

## Key Decisions
1. **Single generic component, shaped by props** (HIGH) — Rather than providing SkeletonText, SkeletonCircle etc., Base Web provides one Skeleton component that takes `width`, `height`, and can be styled with `overrides` to any shape (circle via borderRadius: 50%). This fits Base Web's primitive philosophy.
2. **animation prop** (MEDIUM) — The `animation` prop enables the shimmer pulse animation. Disabling it is useful for reduced-motion preferences or print layouts.
3. **Overrides for Root** (MEDIUM) — The single Root element is overridable for custom animation or background colors.

## Notable Props
- `width`: skeleton width
- `height`: skeleton height
- `animation`: enable/disable shimmer (default true)
- `rows`: number of rows (for text-like skeletons)
- `overrides`: Root

## A11y Highlights
- **Keyboard**: No keyboard interaction
- **Screen reader**: Should be aria-hidden; real content replaces skeleton on load
- **ARIA**: aria-busy on parent containers while loading is a common pattern

## Strengths & Gaps
- **Best at**: Primitive approach; single component handles all shapes; overrides for customization
- **Missing**: No SkeletonCircle or SkeletonText shortcuts; no isLoaded wrapper prop
