---
system: Mantine
component: Avatar
url: https://mantine.dev/core/avatar/
last_verified: 2026-03-29
confidence: high
---

# Avatar

## Approach
Mantine's Avatar component renders a user representation as an image, initials, or fallback icon. It supports three sizes (xs through xl plus custom), circular or square shape via the `radius` prop, and an `AvatarGroup` sub-component for stacking multiple avatars with overlap. The image fallback chain is: image → initials (from `alt` text) → generic person icon. The component integrates fully with Mantine's theme for color, radius, and sizing tokens. It is commonly used in navigation headers, comment threads, and data table rows in SaaS applications.

## Key Decisions
1. **Fallback hierarchy** (HIGH) — Automatic fallback from image → initials → icon ensures avatars always render meaningfully even when profile images fail to load, which is critical for data-dense UIs.
2. **AvatarGroup for stacking** (HIGH) — The companion `AvatarGroup` component handles the overlap and "+N more" truncation pattern natively, avoiding the need for custom CSS hacks.
3. **Radius as shape control** (MEDIUM) — Using the standard `radius` prop (which accepts theme keys or pixel values) for circle/square shape keeps the API consistent with other Mantine components like Button and Card.

## Notable Props
- `src`: Image URL
- `alt`: Used as accessible label and as initials source for fallback
- `size`: `"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"` | number
- `radius`: Controls shape — `"xl"` or `9999` yields a circle
- `color`: Background color when showing initials fallback
- `component`: Polymorphic — can render as `<a>` or router `Link`

## A11y Highlights
- **Keyboard**: Not focusable by default unless rendered as a link/button via `component` prop
- **Screen reader**: `alt` prop is applied as `aria-label` when no `<img>` is rendered (initials mode), providing meaningful identification
- **ARIA**: Decorative images should pass `alt=""` to hide from screen readers

## Strengths & Gaps
- **Best at**: Clean initials fallback and grouped avatar stacking with minimal configuration; tight theme token integration
- **Missing**: No built-in status indicator (online/offline dot) — requires manual overlay composition
