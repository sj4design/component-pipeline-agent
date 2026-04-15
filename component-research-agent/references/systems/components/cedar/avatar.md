---
system: REI Cedar
component: Avatar
url: https://cedar.rei.com/components/avatar
last_verified: 2026-03-28
confidence: medium
---

# Avatar

## Approach
REI Cedar's Avatar displays member and user profile images for REI's account management and community features. REI Co-op membership identity is displayed via avatar in account contexts. Cedar provides image with initials fallback consistent with Cedar's WCAG 2.1 AA standards.

## Key Decisions
1. **Member identity display** (HIGH) — REI Co-op membership profile display is primary use case.
2. **Image + initials fallback** (MEDIUM) — Graceful fallback for accounts without profile photos.
3. **WCAG compliance** (HIGH) — Proper alt text per Cedar's accessibility standards.

## Notable Props
- `src`: Profile image URL
- `alt`: Accessible description
- `size`: Size variant

## A11y Highlights
- **Keyboard**: Non-interactive unless linked
- **Screen reader**: alt text on image
- **ARIA**: img alt required; decorative aria-hidden when context provides name

## Strengths & Gaps
- **Best at**: REI member profile display; Cedar accessibility compliance
- **Missing**: Medium confidence; group variant uncertain
