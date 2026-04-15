---
system: GOV.UK Design System
component: Tag (used as Badge/Status indicator)
url: https://design-system.service.gov.uk/components/tag/
last_verified: 2026-03-28
confidence: high
---

# Badge (via Tag component)

## Approach
GOV.UK's "Tag" component serves the badge use case. GOV.UK uses Tag/Badge for status indicators on service listings and case management tools. The design strictly avoids using color as the sole meaning carrier — every status is communicated through text. The color coding is standardized across government services.

## Key Decisions
1. **Text over color** (HIGH) — Status text is always present; color supplements but never replaces text meaning. This is critical for color-blind users and high-contrast mode users.

## Notable Props
- See `gov-uk/tag.md` for full details

## A11y Highlights
- Same as Tag component

## Strengths & Gaps
- **Best at**: Text-over-color accessibility; standardized government status colors
- **Missing**: No count badge; no notification dot
