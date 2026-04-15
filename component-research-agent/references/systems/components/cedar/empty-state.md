---
system: REI Cedar
component: Empty State
url: https://cedar.rei.com/components/empty-state
last_verified: 2026-03-28
confidence: medium
---

# Empty State

## Approach
REI Cedar's Empty State is used for no search results, empty wishlists, and first-time product listing views on REI.com. The e-commerce context means empty states often suggest alternative actions (try different search terms, browse a related category).

## Key Decisions
1. **Search no-results** (HIGH) — Primary empty state is product search returning no results — common in e-commerce.
2. **Alternative action guidance** (HIGH) — Guides users to broaden search, try different terms, or browse related categories.
3. **Brand-consistent illustration** (MEDIUM) — Cedar illustrations aligned with REI's outdoor brand visual language.

## Notable Props
- `heading`: Empty state heading
- `body`: Description text
- `action`: CTA button/link

## A11y Highlights
- **Keyboard**: CTA accessible
- **Screen reader**: Heading and description; action labeled
- **ARIA**: Heading hierarchy; accessible CTA

## Strengths & Gaps
- **Best at**: E-commerce search no-results patterns; REI brand alignment
- **Missing**: Medium confidence; illustration library details uncertain
