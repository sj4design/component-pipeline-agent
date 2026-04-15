---
system: Fluent 2 (Microsoft)
component: TabList / Tab
url: https://fluent2.microsoft.design/components/web/react/tablist/usage
last_verified: 2026-03-28
confidence: high
---

# TabList / Tab

## Approach
Fluent 2's tab component is called TabList (container) and Tab (individual item). It is designed for the Office and Teams tab patterns where tabs can be horizontal or vertical, and content panels are separately managed by the consumer. Fluent uses a "controlled" approach where content rendering is the consumer's responsibility — TabList manages selection state and provides the visual tab strip, but does not render associated content panels directly. This is more flexible for complex layouts where the tab content might be in a different part of the page.

## Key Decisions
1. **Content panel not managed by TabList** (HIGH) — Unlike most tab components, Fluent's TabList is purely a navigation strip. Content rendering is fully the consumer's responsibility using the `selectedValue` to decide what to render. This is appropriate for Teams and Office patterns where the "panel" might be the entire main content area, not a div below the tabs.
2. **appearance prop for visual style** (HIGH) — `"subtle"` (no background) and `"transparent"` appearances in addition to the default. In Office, subtle tabs appear inside panels with their own background; transparent tabs appear on colored surfaces. These named appearances encode the design intent.
3. **Small size for toolbar tabs** (MEDIUM) — `size="small"` enables compact tabs for use in toolbars (Office ribbon, Teams compact mode). This is specifically needed for the high-density Office UI.

## Notable Props
- `selectedValue` / `onTabSelect`: controlled selection state
- `defaultSelectedValue`: uncontrolled initial selection
- `appearance`: `"subtle" | "transparent"` (in addition to default)
- `size`: `"small" | "medium" | "large"`
- `vertical`: boolean for vertical tab orientation

## A11y Highlights
- **Keyboard**: Arrow keys navigate tabs; Home/End jump to first/last; Tab moves to associated content panel
- **Screen reader**: `role="tablist"` and `role="tab"`; `aria-selected` on active tab; tabs have `aria-controls` referencing content panels
- **ARIA**: Full ARIA tabs pattern; Tab component uses `role="tab"` regardless of render element

## Strengths & Gaps
- **Best at**: Decoupled content management; vertical tabs; compact size for toolbars; Office pattern encodings
- **Missing**: No built-in content panel management makes simple cases more verbose; no overflow/scroll built-in
