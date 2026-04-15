---
system: Mantine
component: Skeleton
url: https://mantine.dev/core/skeleton/
last_verified: 2026-03-29
confidence: high
---

# Skeleton

## Approach
Mantine's Skeleton component is a loading placeholder that renders a pulsing gray shape in the dimensions of the expected content. It supports height, width, radius (for circular avatar placeholders), and an `animate` toggle to enable/disable the pulse animation. Skeleton is intentionally simple — a single element with configurable dimensions and animation — rather than a complex component. Teams compose multiple Skeleton elements to replicate the rough layout of loading content (e.g., a card with a circular avatar skeleton, two text-height skeletons for title and body, and a rectangle for an image). This explicit composition approach gives teams full control over the loading state layout without a complex "skeleton template" system.

## Key Decisions
1. **Single element, explicit composition** (HIGH) — Mantine doesn't provide skeleton variants for "text", "avatar", "image" automatically. Each Skeleton is sized by the consumer. This makes the API simple but requires teams to manually match skeleton dimensions to the actual content layout. The trade-off is accepted because skeleton layouts are inherently content-specific.
2. **`visible` prop for wrapper pattern** (HIGH) — The `visible` prop enables a common pattern: wrap actual content in Skeleton with `visible={isLoading}`. When `visible` is true, the skeleton is shown; when false, the actual children are rendered. This avoids conditional rendering (showing skeleton OR content) and instead overlays the skeleton on top of content. The result is seamless transitions without layout shift.
3. **CSS pulse animation** (MEDIUM) — The shimmer animation uses a CSS keyframe on background-color, cycling between two gray shades. It respects `prefers-reduced-motion` by disabling animation when the media query is active. The `animate={false}` prop provides manual control for cases where animation is not desired (e.g., static screenshots, print views).
4. **No automatic size matching** (LOW) — Skeleton does not automatically measure and match the size of its children. Teams must specify `height` and `width` or let the skeleton fill its container. For responsive layouts, percentage-based widths or container-relative heights work better than fixed pixel values.

## Notable Props
- `height`: height of the skeleton (CSS value or number in px)
- `width`: width of the skeleton (default 100%)
- `radius`: border-radius (`"sm"`, `"md"`, `"xl"`, `"100%"` for circle, number)
- `animate`: boolean — enable pulse animation (default true)
- `visible`: boolean — show skeleton (true) or render children (false)
- `circle`: shorthand for `radius="100%" height=width`

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard interaction
- **Screen reader**: Should be hidden from AT during loading (`aria-hidden="true"` or `aria-busy="true"` on the containing region); announce content availability via live region when loading completes
- **ARIA**: Skeleton itself has no ARIA role; parent container pattern: `aria-busy="true"` while loading, `aria-live="polite"` to announce when content is ready

## Strengths & Gaps
- **Best at**: `visible` wrapper pattern for seamless loading/loaded transitions; circle shorthand for avatar placeholders; respects reduced motion; simple API
- **Missing**: No pre-built composite skeletons for common layouts (card, list item, table row); no shimmer animation option (only pulse); no automatic size detection from children
