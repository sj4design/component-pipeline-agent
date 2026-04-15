---
system: Evergreen (Segment/Twilio)
component: Avatar
url: https://evergreen.segment.com/components/avatar
last_verified: 2026-03-29
confidence: high
---

# Avatar

## Approach
Evergreen's Avatar serves the identity representation needs of a B2B analytics platform: user profile images in navigation headers, team member identifiers in workspace settings, and commenter avatars in activity feeds. The component follows Evergreen's composable philosophy — it is intentionally lean and relies on the consuming application to provide user data, without building in user-fetching logic or complex state management. Color-coded initials fallback (generated deterministically from the user's name) allows Segment's dashboards to maintain visual consistency in workspaces where many users have not uploaded profile photos.

## Key Decisions
1. **Deterministic color from name** (HIGH) — When no image is available, the avatar background color is derived from the user's name hash, ensuring the same person always appears in the same color across different views, creating a recognizable identity even without a photo.
2. **Size tokens** (MEDIUM) — Ships with a predefined size scale (16, 20, 24, 28, 32, 36, 40) that aligns with Evergreen's spacing tokens, making it easy to fit the avatar into any layout density from dense data tables to spacious profile headers.
3. **`forceShowInitials` prop** (MEDIUM) — Allows teams to bypass image loading and always render initials, useful in components like data table rows where image loading could cause layout shifts.

## Notable Props
- `src`: image URL
- `name`: used for initials generation and accessible alt text
- `size`: numeric size in pixels from the defined scale
- `color`: manual color override for the initials background
- `forceShowInitials`: boolean to skip image and show initials only
- `isSolid`: uses solid background rather than lighter tint for initials

## A11y Highlights
- **Keyboard**: Non-interactive by default; when wrapped in a link or button, inherits that element's keyboard behavior.
- **Screen reader**: `alt` attribute set to `name` value when image is present; initials version uses `aria-label` derived from `name`.
- **ARIA**: `role="img"` on the container; purely decorative instances should receive `aria-hidden="true"` from the consuming component.

## Strengths & Gaps
- **Best at**: Consistent user identity in B2B dashboards with deterministic color-coded initials fallback; tight integration with Evergreen's size token scale.
- **Missing**: No badge/status indicator slot; no group/stacked avatars component; no built-in tooltip for name-on-hover.
