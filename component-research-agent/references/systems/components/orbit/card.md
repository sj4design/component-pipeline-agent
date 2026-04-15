---
system: Orbit (Kiwi.com)
component: Card / Tile
url: https://orbit.kiwi/components/card/
last_verified: 2026-03-28
confidence: medium
---

# Card

## Approach
Orbit's Card component is used for trip summaries, booking options, and content grouping in the travel booking flow. It supports header, body, and footer sections, with flight/trip-specific content patterns. Cards in Kiwi.com's interface display flight options, price comparisons, and booking summaries — these are content-rich cards with specific information hierarchies.

## Key Decisions
1. **CardHeader with actions** (MEDIUM) — Header supports action buttons for card-level actions (expand, bookmark, share). Travel cards frequently have such actions.
2. **Expandable sections via CardSection** (MEDIUM) — Cards can have expandable sections (additional fare details, layover information).
3. **onClick for card selection** (HIGH) — Cards function as large click targets for flight/option selection, common in mobile booking flows.

## Notable Props
- `title`: card heading
- `description`: secondary header text
- `actions`: header action elements
- `onClick`: makes card interactive
- CardSection: sub-sections within card

## A11y Highlights
- **Keyboard**: Interactive cards are keyboard navigable
- **Screen reader**: Card heading and content announced
- **ARIA**: Interactive cards have appropriate role

## Strengths & Gaps
- **Best at**: Travel booking card patterns; expandable sections; mobile-friendly click target
- **Missing**: Image hero slot; limited customization
