---
system: Mantine
component: Divider
url: https://mantine.dev/core/divider/
last_verified: 2026-03-29
confidence: high
---

# Divider

## Approach
Mantine's Divider renders a horizontal or vertical line used to separate content sections. It supports an optional label that can be positioned left, center, or right along the line, making it useful for section headings within forms or grouped lists. The divider respects the theme's color scheme and supports color customization via the `color` prop. Orientation is controlled by the `orientation` prop (`"horizontal"` or `"vertical"`), and vertical dividers are useful in flex toolbars or button groups. The component is intentionally minimal, serving a pure visual separation role.

## Key Decisions
1. **Label support** (HIGH) — The `label` prop with `labelPosition` allows inline section labeling without requiring a separate heading element, useful for form sections and settings pages.
2. **Orientation prop** (MEDIUM) — Supporting both horizontal and vertical orientations in one component reduces the need for separate components or orientation-specific CSS workarounds in toolbars.
3. **Color token integration** (MEDIUM) — The `color` prop maps to theme colors, ensuring dividers adapt automatically to light/dark mode without custom CSS overrides.

## Notable Props
- `label`: React node rendered centered on the divider line
- `labelPosition`: `"left"` | `"center"` | `"right"`
- `orientation`: `"horizontal"` (default) | `"vertical"`
- `color`: Theme color key or CSS color value
- `size`: Line thickness (`"xs"` through `"xl"` or number in px)
- `variant`: `"solid"` | `"dashed"` | `"dotted"`

## A11y Highlights
- **Keyboard**: Non-interactive; not in tab order
- **Screen reader**: Renders as `<hr>` (horizontal rule) which has implicit `role="separator"` — semantically correct
- **ARIA**: For vertical dividers or decorative use, `role="none"` may be appropriate to suppress the separator semantics

## Strengths & Gaps
- **Best at**: Clean section separation with optional inline labels and full theme color/dark mode support
- **Missing**: No automatic spacing normalization — surrounding elements need margin management externally
