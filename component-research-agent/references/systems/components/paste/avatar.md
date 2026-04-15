---
system: Twilio Paste
component: Avatar
url: https://paste.twilio.design/components/avatar
last_verified: 2026-03-28
confidence: high
---

# Avatar

## Approach
Twilio Paste's Avatar displays user/entity representation through image, initials, or icon fallback. Used in the Twilio console for account identifiers, user profile displays, and team member representations. Paste provides Avatar with size variants, image with fallback to initials, and an AvatarGroup for displaying multiple avatars with overlap.

## Key Decisions
1. **Image → initials → icon fallback chain** (HIGH) — Avatar automatically falls back to initials (from name prop) if image fails to load, then to a default entity icon, ensuring graceful degradation without broken images.
2. **AvatarGroup with +N overflow** (HIGH) — AvatarGroup handles overlapping avatar stacks with a "+N" count overflow badge when there are more avatars than the max display count, a standard multi-user representation pattern.
3. **Entity type variants** (MEDIUM) — Avatar supports "user" and "entity" (non-person object like a service or team) types, giving different default icon fallbacks appropriate to the entity type.

## Notable Props
- `name`: Generates initials for fallback display
- `src`: Image source URL
- `size`: Token-based size (sizeIcon30 through sizeIcon110)
- `variant`: "default" | "rounded"
- AvatarGroup `maxAvatars`: Max displayed before +N overflow

## A11y Highlights
- **Keyboard**: Not interactive unless wrapped in interactive element
- **Screen reader**: alt text on image derived from name prop; aria-label on AvatarGroup summarizes "X more users"
- **ARIA**: img alt from name; AvatarGroup has aria-label; icon fallback has aria-hidden

## Strengths & Gaps
- **Best at**: Graceful fallback chain; AvatarGroup with overflow count; entity vs user distinction
- **Missing**: No status indicator dot overlay on avatar; no clickable avatar without wrapping
