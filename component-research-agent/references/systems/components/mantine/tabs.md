---
system: Mantine
component: Tabs
url: https://mantine.dev/core/tabs/
last_verified: 2026-03-28
confidence: high
---

# Tabs

## Approach
Mantine Tabs provides a clean, flexible tab component with multiple visual variants and strong keyboard navigation including loop mode. It uses a value-based API (string IDs, not index-based) for tab identity, which is more robust for dynamic tab lists. The component supports both horizontal and vertical orientations, and the `inverted` option places the tab indicator on the opposite side — useful for bottom tabs in mobile app patterns.

## Key Decisions
1. **inverted prop for bottom tabs** (MEDIUM) — When `inverted`, the tab underline appears at the top instead of bottom (for horizontal tabs), allowing the component to be used for bottom navigation patterns where the indicator should be above the tab strip rather than below.
2. **loop keyboard navigation** (HIGH) — The `loop` prop enables keyboard focus to wrap from the last tab to the first. This is an accessibility enhancement that reduces the number of key presses to cycle through tabs, important for power keyboard users.
3. **variant breadth** (HIGH) — `"default"` (underline), `"outline"` (bordered tabs), `"pills"` (rounded filled), `"unstyled"` — four variants cover different UI contexts without custom CSS.

## Notable Props
- `value` / `onChange`: controlled by string value (not index)
- `defaultValue`: uncontrolled initial tab
- `orientation`: `"horizontal" | "vertical"`
- `variant`: `"default" | "outline" | "pills" | "unstyled"`
- `inverted`: flips indicator side
- `loop`: keyboard navigation wraps around
- `activateTabWithKeyboard`: boolean to control manual vs automatic activation

## A11y Highlights
- **Keyboard**: Arrow keys navigate; Enter/Space activates (configurable); Home/End jump to ends; loop option for wrap-around
- **Screen reader**: `role="tablist"`, `role="tab"`, `role="tabpanel"`; `aria-selected`; panels labeled via `aria-labelledby`
- **ARIA**: Standard ARIA tabs; inactive panels hidden via `display:none`

## Strengths & Gaps
- **Best at**: Value-based API; inverted mode for bottom tabs; loop keyboard navigation; pills variant
- **Missing**: No tab close/remove pattern; no overflow scrolling for many tabs
