---
system: Chakra UI
component: Avatar
url: https://chakra-ui.com/docs/components/avatar
last_verified: 2026-03-28
confidence: high
---

# Avatar

## Approach
Chakra UI's Avatar is a complete, styled avatar component with built-in fallback, size scale, status indicator, and AvatarGroup for stacking. The component handles image loading fallback (first tries image, falls back to initials derived from `name` prop, then falls back to a generic user icon). AvatarGroup stacks multiple avatars with overlap and a "+N" overflow indicator.

## Key Decisions
1. **AvatarGroup with max and overflow count** (HIGH) — `<AvatarGroup max={3}>` shows at most 3 avatars and a "+N" indicator for the rest. This is the standard social platform avatar group pattern, solving a common UI need natively.
2. **Name-to-initials derived fallback** (HIGH) — The `name` prop is used for both the `alt` attribute and to derive fallback initials. "Jane Doe" → "JD". This makes the fallback automatic without separate props.
3. **Status indicator dot** (MEDIUM) — `badge` prop (or `showBorder`) allows overlaying a status dot in the corner of the avatar. Used for online/offline presence indicators.

## Notable Props
- `src`: image URL
- `name`: user's name (for alt text and initials fallback)
- `size`: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"`
- `colorScheme`: background color for initials fallback
- AvatarGroup: `max`, `spacing` (negative value for overlap)
- `badge` / indicator slot: for status dots

## A11y Highlights
- **Keyboard**: Non-interactive by default
- **Screen reader**: `alt` text from `name` prop; fallback initials have same accessible name
- **ARIA**: Image alt derived from name; AvatarGroup excess "+N" should have accessible description

## Strengths & Gaps
- **Best at**: AvatarGroup with max/overflow; name-to-initials derivation; status badge slot; complete size scale
- **Missing**: Loading state shimmer; no avatar within other components (card header auto-styling)
