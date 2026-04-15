---
system: Radix UI (WorkOS)
component: Skeleton (via Radix Themes)
url: https://www.radix-ui.com/themes/docs/components/skeleton
last_verified: 2026-03-28
confidence: high
---

# Skeleton

## Approach
Radix Themes provides a Skeleton component as a loading placeholder. The Skeleton can wrap any element, converting it to a placeholder by setting width, height, and the shimmer animation. The approach of wrapping actual content elements (not separate layout placeholder elements) means the skeleton maintains the same dimensions as the real content.

## Key Decisions
1. **Wrapper approach** (HIGH) — `<Skeleton>content</Skeleton>` shows a skeleton that matches the content's dimensions. This avoids maintaining separate skeleton-layout and content-layout code.
2. **loading prop** (HIGH) — When `loading={false}`, the skeleton disappears and shows the actual content. The transition is handled by the component.

## Notable Props
- `loading`: boolean (true = show skeleton)
- Width/height from content dimensions automatically

## A11y Highlights
- **Keyboard**: Non-interactive placeholder
- **Screen reader**: Content hidden from AT while loading; `aria-busy="true"` on container during skeleton display
- **ARIA**: `aria-busy` on the loading container communicates the loading state; content is not announced until loaded

## Strengths & Gaps
- **Best at**: Wrapper approach maintains content dimensions; loading prop toggle
- **Missing**: No explicit skeleton shape primitives (rectangle, circle); no shimmer color customization
