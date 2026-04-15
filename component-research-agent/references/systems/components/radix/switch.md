---
system: Radix UI (WorkOS)
component: Switch
url: https://www.radix-ui.com/primitives/docs/components/switch
last_verified: 2026-03-28
confidence: high
---

# Switch

## Approach
Radix Switch is a headless toggle switch primitive implementing the WAI-ARIA switch role. It composes as Switch (the button element) and Switch.Thumb (the sliding indicator). The component uses `role="switch"` with `aria-checked`, which is distinct from `role="checkbox"` — a switch represents an immediate on/off action (like toggling dark mode immediately), while a checkbox represents a form selection that takes effect on submit. Radix models this semantic distinction explicitly.

## Key Decisions
1. **role="switch" over role="checkbox"** (HIGH) — Switches are semantically distinct from checkboxes. A switch fires its effect immediately (turn on notifications now), while a checkbox is a form selection. Using `role="switch"` is more semantically correct and communicates immediate effect to screen reader users.
2. **Switch.Thumb as separate element** (HIGH) — The thumb (the sliding circle) is a separate composable part that can be styled and animated independently. It receives `data-state="checked" | "unchecked"` for CSS-based animations.
3. **checked prop with boolean** (MEDIUM) — Unlike Checkbox which has a `"indeterminate"` third state, Switch only has boolean checked state — a switch has no meaningful intermediate state.

## Notable Props
- `checked` / `onCheckedChange`: controlled boolean state
- `defaultChecked`: uncontrolled initial state
- `name` / `value`: form integration
- `required`: form validation

## A11y Highlights
- **Keyboard**: Space toggles the switch; no arrow key navigation (switch is a single control)
- **Screen reader**: `role="switch"` with `aria-checked="true/false"`; label required via `<label>` or `aria-label`
- **ARIA**: `role="switch"` clearly communicates immediate action semantics; distinct from checkbox

## Strengths & Gaps
- **Best at**: Correct role="switch" semantics; Switch.Thumb for animation; form integration
- **Missing**: No label primitive; must compose with external `<label>` element; no size variants
