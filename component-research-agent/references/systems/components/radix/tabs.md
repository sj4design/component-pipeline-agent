---
system: Radix UI (WorkOS)
component: Tabs
url: https://www.radix-ui.com/primitives/docs/components/tabs
last_verified: 2026-03-28
confidence: high
---

# Tabs

## Approach
Radix Tabs is a headless primitive implementing the ARIA Tabs pattern with full WAI-ARIA compliance. It composes as Tabs.Root, Tabs.List, Tabs.Trigger, and Tabs.Content, cleanly separating the tab list (navigation) from the content panels. The component handles all keyboard navigation and ARIA relationships, leaving visual design entirely to the consumer. Radix specifically implements the "automatic" activation pattern by default (focus + activate on arrow key), with an option to switch to "manual" activation (focus separately from activation).

## Key Decisions
1. **activationMode: automatic vs manual** (HIGH) — The `activationMode` prop on Tabs.Root controls whether arrow key focus automatically activates the tab or requires a separate Enter/Space press. Automatic is better for most UIs; manual is needed when tab switching triggers expensive data loads (prevents loading on every arrow key press during keyboard navigation).
2. **Tabs.Content always rendered** (MEDIUM) — By default, all content panels are mounted in the DOM (only hidden via display:none). This means all panel content is available to search engines and assistive technologies. The `forceMount` prop per panel allows even unmounted panels to stay in DOM for animation.
3. **orientation support** (MEDIUM) — The `orientation` prop supports `"horizontal"` and `"vertical"` tabs. Vertical tabs use Up/Down arrow keys rather than Left/Right, which is important for sidebar navigation patterns in dashboards.

## Notable Props
- `activationMode`: `"automatic" | "manual"` — critical for async content tabs
- `orientation`: `"horizontal" | "vertical"`
- `defaultValue` / `value` / `onValueChange`: controlled/uncontrolled state
- `Tabs.Content > forceMount`: keeps panel in DOM when inactive

## A11y Highlights
- **Keyboard**: Arrow keys navigate triggers (per orientation); Home/End jump to first/last; Tab moves to content panel; Shift+Tab moves back to trigger list
- **Screen reader**: `role="tablist"`, `role="tab"`, `role="tabpanel"`; `aria-selected` on active tab; `aria-controls` links tab to panel
- **ARIA**: Tab panels have `aria-labelledby` pointing to their trigger; inactive panels are hidden from AT unless `forceMount` is used

## Strengths & Gaps
- **Best at**: Manual activation mode for async tabs; vertical orientation; correct ARIA without any configuration
- **Missing**: No visual styles (tab line, active indicator, overflow scrolling for many tabs)
