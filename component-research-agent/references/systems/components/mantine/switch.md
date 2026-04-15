---
system: Mantine
component: Switch
url: https://mantine.dev/core/switch/
last_verified: 2026-03-28
confidence: high
---

# Switch

## Approach
Mantine's Switch has a notable distinction: it supports `thumbIcon` and custom thumb content. The switch thumb (the sliding circle) can contain a small icon that changes based on checked state — showing a sun/moon for light/dark mode, a play/pause icon, or custom indicators. This makes Mantine's Switch among the most visually expressive toggle implementations.

## Key Decisions
1. **thumbIcon for state visualization** (HIGH) — The `thumbIcon` prop renders an icon inside the thumb. A dark mode toggle can show a moon icon when checked and sun when unchecked. This encodes the toggle's meaning directly into the component's visual state.
2. **labelPosition** (MEDIUM) — `"right"` (default) or `"left"` — consistent with Checkbox's labelPosition for settings panel layouts.
3. **Switch.Group for multiple switches** (MEDIUM) — Manages multiple related switches with array value state, useful for feature permission grids.

## Notable Props
- `checked` / `onChange`: controlled state
- `thumbIcon`: icon inside the sliding thumb
- `label`: built-in label prop
- `description`: secondary text
- `color`: active track color token
- `size`: `"xs" | "sm" | "md" | "lg" | "xl"`
- `labelPosition`: `"left" | "right"`

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses
- **Screen reader**: role="switch" with aria-checked; label and description associated
- **ARIA**: Correct switch semantics; thumbIcon is decorative (not announced separately)

## Strengths & Gaps
- **Best at**: thumbIcon for expressive visual states; description prop; Switch.Group; full size scale
- **Missing**: No Switch-within-card pattern like Checkbox.Card
