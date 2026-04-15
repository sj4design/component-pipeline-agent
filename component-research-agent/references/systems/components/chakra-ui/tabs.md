---
system: Chakra UI
component: Tabs
url: https://chakra-ui.com/docs/components/tabs
last_verified: 2026-03-28
confidence: high
---

# Tabs

## Approach
Chakra UI's Tabs provides a visually styled, accessible tab component with multiple visual variants for different design contexts. The system offers `"line"` (underline indicator), `"enclosed"` (bordered tabs), `"enclosed-colored"` (filled active tab), `"soft-rounded"`, and `"solid-rounded"` variants, covering the full range of tab visual treatments. This makes Chakra Tabs particularly practical — teams rarely need to build custom tab styles. The component integrates with Chakra's color scheme system so tab accent colors adapt to any palette.

## Key Decisions
1. **Five visual variants** (HIGH) — More tab variants than nearly any other system. This reflects Chakra's philosophy of covering common design patterns out of the box. The variant set was derived from the most common Figma tab designs in the community.
2. **Lazy mounting** (HIGH) — The `isLazy` prop delays rendering of inactive tab content until that tab is first visited. This is critical for performance in data-heavy dashboards where each tab might load a large table or chart. Combined with `lazyBehavior="keepMounted"`, content can be loaded once and cached.
3. **isFitted** (MEDIUM) — Makes each tab trigger take equal width, filling the container. Useful for mobile interfaces and navigation tabs where equal distribution prevents visual imbalance.

## Notable Props
- `variant`: `"line" | "enclosed" | "enclosed-colored" | "soft-rounded" | "solid-rounded" | "unstyled"`
- `colorScheme`: palette token for active tab color
- `isLazy`: delays inactive tab mounting
- `lazyBehavior`: `"unmount" | "keepMounted"` — controls if lazy tabs stay mounted after first visit
- `isFitted`: equal-width tabs
- `orientation`: `"horizontal" | "vertical"`

## A11y Highlights
- **Keyboard**: Arrow keys navigate tab list; Enter/Space activates focused tab; Tab moves to active panel
- **Screen reader**: `role="tablist"`, `role="tab"`, `role="tabpanel"`; `aria-selected` on active; panels labeled via `aria-labelledby`
- **ARIA**: Inactive panels are hidden with `hidden` attribute or not rendered when lazy

## Strengths & Gaps
- **Best at**: Visual variant breadth; isLazy for performance; isFitted for equal-width layouts; colorScheme integration
- **Missing**: No overflow handling for many tabs (horizontal scrolling); no tab closeable/removable pattern
