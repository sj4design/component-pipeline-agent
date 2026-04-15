---
system: Playbook (Power Home Remodeling)
component: Avatar
url: https://playbook.powerapp.cloud/kits/avatar
last_verified: 2026-03-28
confidence: medium
---

# Avatar

## Approach
Playbook's Avatar displays user and contact profiles in their CRM — sales rep photos, customer contact avatars, and team member identification. Dual React/Rails. Supports image with initials fallback.

## Key Decisions
1. **CRM contact display** (HIGH) — Represents sales reps and customer contacts in CRM records.
2. **Image + initials fallback** (MEDIUM) — Graceful fallback when no image is available.
3. **Dual React/Rails** (HIGH) — Both implementations for consistent display.

## Notable Props
- `name`: For initials generation
- `src`: Image URL
- `size`: Size variant

## A11y Highlights
- **Keyboard**: Non-interactive typically
- **Screen reader**: alt text from name; initials fallback readable
- **ARIA**: img alt; fallback text

## Strengths & Gaps
- **Best at**: CRM contact representation; dual framework
- **Missing**: Medium confidence; group/stack variant uncertain
