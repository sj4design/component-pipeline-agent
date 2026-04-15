---
system: Salesforce Lightning Design System
component: Empty State (Illustration)
url: https://lightningdesignsystem.com/components/illustration/
last_verified: 2026-03-28
confidence: high
---

# Empty State / Illustration

## Approach
Lightning calls this the "Illustration" component, using SVG illustrations with heading and body text to communicate zero-data and error states. Lightning has a rich set of illustrations specifically designed for CRM contexts — no results in a filtered list, no records assigned, search found nothing, first-time use of a feature. The system provides both "small" and "large" illustration sizes.

## Key Decisions
1. **CRM-specific illustration library** (HIGH) — Lightning's illustrations are tailored to CRM scenarios (fishing hook for "no results," desert with cacti for "no data found") providing memorable branded empty states across Salesforce products.
2. **Heading + body text** (HIGH) — Illustration is always paired with heading and descriptive text explaining the empty state and guiding the user to the next action.
3. **Small vs large variant** (MEDIUM) — Small illustrations for inline empty sections (empty related list); large illustrations for full-page empty states (first-time feature use).

## Notable Props
- `svg`: The SVG illustration content
- `heading`: Primary heading text
- `messageBody`: Descriptive explanation text
- `size`: "small" | "large"

## A11y Highlights
- **Keyboard**: Action links/buttons within empty state are accessible
- **Screen reader**: Heading provides state context; SVG illustration has aria-hidden or title for decoration vs informative
- **ARIA**: Heading hierarchy; SVG aria-hidden for decorative illustrations; action CTAs labeled

## Strengths & Gaps
- **Best at**: CRM-specific illustration library; heading + body text structure; small/large variants for different context sizes
- **Missing**: Illustrations are Salesforce brand-specific; limited to the provided SVG set
