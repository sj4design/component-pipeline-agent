---
system: REI Cedar
component: Activity Indicator (Spinner)
url: https://cedar.rei.com/components/activity-indicator
last_verified: 2026-03-28
confidence: medium
---

# Activity Indicator (Spinner)

## Approach
REI Cedar's spinner/activity indicator is used for loading states during product search, checkout processing, and account data loading on REI.com. The Vue component follows Cedar's accessibility standards for loading state communication.

## Key Decisions
1. **E-commerce loading states** (HIGH) — Used for product search results loading, checkout processing, and page data fetching.
2. **Accessible label** (HIGH) — Cedar's accessibility commitment requires meaningful loading context communicated to screen readers.
3. **Size variants** (MEDIUM) — Multiple sizes for inline vs full-section loading contexts.

## Notable Props
- `size`: Size variant
- `label`: Accessible loading description

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Loading state announced with label
- **ARIA**: Appropriate status/live region announcement

## Strengths & Gaps
- **Best at**: E-commerce loading states; Cedar accessibility compliance
- **Missing**: Medium confidence; exact API details uncertain
