---
system: Wise Design
component: Avatar
url: https://wise.design/components/avatar
last_verified: 2026-03-28
confidence: low
---

# Avatar

## Approach
Wise's Avatar displays user profile images and contact representations in their financial product — account owner display, transfer recipient identification, and user settings. Clean circular avatar consistent with Wise's minimal aesthetic.

## Key Decisions
1. **Transfer recipient identification** (MEDIUM) — Avatars identify frequent transfer recipients for quick re-use.
2. **Account display** (MEDIUM) — User account avatar in navigation and settings.
3. **Initials fallback** (LOW) — Fallback for accounts without photos.

## Notable Props
- `src`, `alt`, `name`, `size`

## A11y Highlights
- **Keyboard**: Non-interactive unless linked
- **Screen reader**: alt text from name/alt prop
- **ARIA**: img alt

## Strengths & Gaps
- **Best at**: Financial product user/recipient display
- **Missing**: Low confidence — limited documentation
