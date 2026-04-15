---
system: Dell Design System
component: Avatar
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Avatar

## Approach
Dell Design System's Avatar displays user profile images in enterprise management portals and Dell.com account areas. Enterprise B2B context means avatars are used for logged-in user identification and team member display in management consoles.

## Key Decisions
1. **Enterprise user display** (MEDIUM) — User account representation in enterprise management portals.
2. **Initials fallback** (LOW) — For enterprise accounts without profile photos.
3. **Size variants** (LOW) — Different sizes for navigation vs profile contexts.

## Notable Props
- `src`, `alt`, `name`, `size`

## A11y Highlights
- **Keyboard**: Non-interactive typically
- **Screen reader**: alt text
- **ARIA**: img alt

## Strengths & Gaps
- **Best at**: Enterprise user account display
- **Missing**: Low confidence — verify before use
