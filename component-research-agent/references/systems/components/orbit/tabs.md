---
system: Orbit (Kiwi.com)
component: Tabs (not available as a standalone component)
url: https://orbit.kiwi/components/
last_verified: 2026-03-28
confidence: medium
---

# Tabs

## Approach
Orbit does not have a dedicated Tabs component. Kiwi.com's primary navigation patterns use the `NavigationBar` for top-level navigation and the `Itinerary`/card patterns for content organization. For in-page content switching, Orbit provides `Tile` and `TileGroup` components that can function like tab-like selections, and the `ButtonGroup` with `selected` state for segmented control patterns. The absence of a traditional Tabs component reflects Orbit's travel-domain specificity — mobile booking flows rarely use desktop tab patterns.

## Key Decisions
1. **No tabs component** (HIGH) — Travel booking apps on mobile use bottom navigation and card-based flow rather than horizontal tab bars. The decision reflects Orbit's focus on native-feeling mobile travel UI.
2. **Segmented control via ButtonGroup** (MEDIUM) — For content switching that looks like tabs, Orbit uses `ButtonGroup` with toggle buttons, which provides a more mobile-native feel than a traditional tab bar.

## Notable Props
- N/A — component does not exist in Orbit

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: General-purpose tab component for web application use cases
