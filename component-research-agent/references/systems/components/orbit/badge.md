---
system: Orbit (Kiwi.com)
component: Badge / BadgeList
url: https://orbit.kiwi/components/badge/
last_verified: 2026-03-28
confidence: medium
---

# Badge

## Approach
Orbit's Badge is used for status labels and category indicators in the travel booking context: flight type (direct/1 stop), fare class, booking status (Confirmed, Cancelled, Pending refund). The component supports Orbit's semantic types and is used in FlightCard and ticket components.

## Key Decisions
1. **type for travel status** (HIGH) — Semantic types (success, warning, info, critical, neutral) map to booking status categories. Critical is important for travel (flight cancelled, payment failed).
2. **icon support** (MEDIUM) — Badges can include an icon for flight-type indicators (plane icon for flight type, clock for departure time category).

## Notable Props
- `type`: `"neutral" | "info" | "success" | "warning" | "critical"`
- `icon`: Orbit icon element
- `size`: `"small" | "normal"`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Badge text is accessible name
- **ARIA**: Icon is decorative; text conveys meaning

## Strengths & Gaps
- **Best at**: Travel status communication; critical type for flight disruptions; icon support
- **Missing**: No count badge; no removable badge
