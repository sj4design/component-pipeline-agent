---
component: Avatar
tier: 2
last_verified: 2026-03-28
---

# Avatar — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Avatar | Image/initials/icon variants; color variants for initials; size scale | high |
| Salesforce Lightning | Avatar | Image/initials variants; circle/square shapes; presence indicator option | high |
| GitHub Primer | Avatar | User image avatar; size variants; AvatarStack for groups | high |
| shadcn/ui | Avatar | Radix UI Avatar; image with fallback (initials); graceful fallback on error | high |
| Playbook | Avatar | User/contact display; dual React/Rails | medium |
| REI Cedar | CdrAvatar (not present) | Not present; use Image component | medium |
| Wise Design | Avatar | User profile display | low |
| Dell Design System | Avatar | Enterprise user display | low |

## Key Decision Patterns

**Image fallback:** Radix/shadcn Avatar's key feature is graceful image fallback — if the image fails to load, it automatically shows the AvatarFallback content (initials or icon). This prevents broken image icons. Lightning and Paste handle fallback via conditional rendering.

**AvatarStack:** Primer provides an AvatarStack component for rendering a horizontal stack of overlapping avatars (e.g., showing multiple contributors). Lightning's HasAvatar utility covers similar use cases. shadcn/ui requires custom composition.

**Presence indicator:** Lightning supports an optional presence indicator (online/offline/away) overlay on the avatar — important for chat and collaboration features in Salesforce.

**Decorative vs. informative:** Avatar images are decorative when accompanied by a visible user name. They are informative when used alone (icon-only contexts). The alt attribute should be empty ("") for decorative avatars.

## A11y Consensus
- Decorative avatar (next to visible name): `alt=""` (empty alt)
- Informative avatar (alone): `alt="[user name]"`
- Initials avatars: aria-label="[user name]" on the container
- AvatarStack: aria-label on group listing the users, or aria-label on each avatar
- Presence indicator: visually hidden text "Online" or aria-label update

## Recommended Use
Use Radix/shadcn Avatar for graceful image-to-initials fallback. Use Primer AvatarStack for grouped contributor displays. Use Lightning Avatar when presence indicators are needed. Always set alt="" for decorative avatars accompanied by visible text.
