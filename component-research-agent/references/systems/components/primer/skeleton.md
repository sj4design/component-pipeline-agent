---
system: GitHub Primer
component: SkeletonBox / SkeletonText
url: https://primer.style/components/skeleton-box
last_verified: 2026-03-28
confidence: medium
---

# SkeletonBox / SkeletonText

## Approach
GitHub Primer provides SkeletonBox (rectangular placeholder) and SkeletonText (text line placeholder with appropriate line height sizing) as separate skeleton components. SkeletonText includes size variants matching Primer's typography scale, enabling accurate text-height skeletons for different heading and body text levels. Primer uses a gradient shimmer animation.

## Key Decisions
1. **SkeletonText with typography scale** (HIGH) — SkeletonText sizes match Primer's typography scale (bodySmall, bodyMedium, heading1, etc.), creating accurate text placeholders that match the actual text height when content loads, minimizing layout shift.
2. **SkeletonBox for non-text content** (HIGH) — Flexible box placeholder for images, avatars, and other non-text content, with configurable width/height.
3. **prefers-reduced-motion** (MEDIUM) — Animation disabled when user has prefers-reduced-motion enabled.

## Notable Props
- SkeletonBox: `width`, `height`, `borderRadius`
- SkeletonText: `size` (matches typography token sizes)

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: aria-hidden on skeleton; container aria-busy during loading
- **ARIA**: aria-hidden; aria-busy on loading container; reduced motion support

## Strengths & Gaps
- **Best at**: Typography-scale-aware SkeletonText for accurate line placeholders; minimized layout shift
- **Missing**: Medium confidence on exact API; no pre-built complex skeleton layouts
