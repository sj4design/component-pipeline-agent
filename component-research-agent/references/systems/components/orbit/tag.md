---
system: Orbit (Kiwi.com)
component: Tag / BadgeList
url: https://orbit.kiwi/components/tag/
last_verified: 2026-03-28
confidence: medium
---

# Tag

## Approach
Orbit's Tag component is used for filter chips and category labels in Kiwi.com's flight search and booking flow. Tags appear as filter chips (direct flights, specific airlines, time range filters) in the search results page. The component supports selected state and removal for filter interaction patterns.

## Key Decisions
1. **Selected state for filter chips** (HIGH) — Tags can be in selected/active state, used for active filter indicators. Toggling a tag filter on/off is a core interaction on Kiwi.com's search results page.
2. **Removable with onRemove** (HIGH) — Active filters can be removed. The X button removes the filter.

## Notable Props
- `selected`: boolean active state
- `onRemove`: optional remove callback
- `onClick`: selection toggle callback

## A11y Highlights
- **Keyboard**: Click/Enter to toggle; remove button keyboard accessible
- **Screen reader**: Selected state announced; remove button labeled
- **ARIA**: aria-pressed for toggle state; remove button aria-label

## Strengths & Gaps
- **Best at**: Filter chip pattern for travel search; selected state; remove functionality
- **Missing**: No size variants; limited color system
