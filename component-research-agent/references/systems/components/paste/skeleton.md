---
system: Twilio Paste
component: Skeleton Loader
url: https://paste.twilio.design/components/skeleton-loader
last_verified: 2026-03-28
confidence: high
---

# Skeleton Loader

## Approach
Twilio Paste's Skeleton Loader provides pulse-animated placeholder shapes for content that is loading asynchronously. Paste provides SkeletonLoader as a single flexible component that can be configured via width/height to represent different content types (text lines, images, headings). Used in the Twilio console for loading states of data tables, resource cards, and detail panels.

## Key Decisions
1. **Flexible shape via width/height** (HIGH) — A single SkeletonLoader component configured with different dimensions represents any content type (narrow for text lines, square/circle for avatar, wider for headings), rather than specific "SkeletonText" and "SkeletonAvatar" variants.
2. **Pulse animation** (HIGH) — CSS pulse animation (opacity fade in/out) communicates loading state dynamically; the animation is disabled for users with prefers-reduced-motion.
3. **aria-busy + aria-live pattern** (HIGH) — Container element gets aria-busy="true" during loading, and when content loads, the change is communicated via aria-live region, ensuring screen reader users are informed of loading completion.

## Notable Props
- `width`: Token-based or pixel width for the placeholder shape
- `height`: Token-based or pixel height
- `borderRadius`: For circular (avatar) skeletons

## A11y Highlights
- **Keyboard**: Non-interactive; not in tab order
- **Screen reader**: Container has aria-busy="true"; loading completion communicated via aria-live; animation disabled via prefers-reduced-motion
- **ARIA**: aria-busy on loading container; aria-live for content ready; aria-hidden on skeleton shapes themselves

## Strengths & Gaps
- **Best at**: Flexible single-component approach; aria-busy/aria-live pattern for screen readers; prefers-reduced-motion respect
- **Missing**: No pre-built layouts (card skeleton, table row skeleton); all shapes must be manually composed
