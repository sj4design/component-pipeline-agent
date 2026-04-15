---
system: REI Cedar
component: Tag
url: https://cedar.rei.com/components/tag
last_verified: 2026-03-28
confidence: medium
---

# Tag

## Approach
REI Cedar's Tag is used for product category labels, filter chips, and promotional indicators in REI's e-commerce context. Filter chip tags with remove functionality are used in REI's faceted search filter display (showing active filters like "Size: Large" as removable tags). Non-interactive tags label product categories and features.

## Key Decisions
1. **Active filter chip use case** (HIGH) — Removable tags display active filter selections in REI's product catalog filtering, with clear remove (×) button for each active filter.
2. **Product category labels** (HIGH) — Non-interactive tags for product category and feature labeling on product cards.
3. **Color variants for category** (MEDIUM) — Color or visual variants for different tag types (promotional, category, feature).

## Notable Props
- `label`: Tag text
- `removable`: Enable remove button
- `onRemove`: Remove callback

## A11y Highlights
- **Keyboard**: Remove button focusable; Tab to remove button
- **Screen reader**: Tag label + "remove" button announced
- **ARIA**: Remove button aria-label "Remove [label]"

## Strengths & Gaps
- **Best at**: Active filter display with removal; e-commerce product tagging
- **Missing**: Medium confidence; some Vue API details uncertain
