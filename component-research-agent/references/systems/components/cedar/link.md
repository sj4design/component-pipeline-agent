---
system: REI Cedar
component: Link
url: https://cedar.rei.com/components/link
last_verified: 2026-03-28
confidence: medium
---

# Link

## Approach
REI Cedar's Link provides styled anchor elements for REI's e-commerce and content pages. Product links, category navigation, and content references use Cedar's Link styling with REI's brand colors and hover states. Cedar's accessibility standards require meaningful link text.

## Key Decisions
1. **E-commerce navigation** (HIGH) — Product and category links on REI.com.
2. **Brand-consistent styling** (HIGH) — REI link colors with appropriate hover/focus states.
3. **External link handling** (MEDIUM) — External links with appropriate visual indicator.

## Notable Props
- `href`, `target`, `modifier`: Style modifier

## A11y Highlights
- **Keyboard**: Native anchor activation; visible focus state
- **Screen reader**: Link text announced; external link indicator
- **ARIA**: Native anchor; meaningful text required

## Strengths & Gaps
- **Best at**: REI brand-consistent link styling; e-commerce navigation
- **Missing**: Medium confidence; some details uncertain
