---
system: Radix UI (WorkOS)
component: Radio Group
url: https://www.radix-ui.com/primitives/docs/components/radio-group
last_verified: 2026-03-28
confidence: high
---

# Radio Group

## Approach
Radix RadioGroup is a headless primitive that implements the WAI-ARIA radio group pattern. It provides RadioGroup.Root and RadioGroup.Item as the composable parts. Like other Radix primitives, it separates interaction (keyboard navigation, ARIA, state) from visual appearance entirely. The component uses the roving tabindex pattern — only the selected radio is in the tab order, and arrow keys move between options. This is the correct ARIA pattern for radio groups.

## Key Decisions
1. **Roving tabindex pattern** (HIGH) — Only one radio in the group receives focus via Tab; arrow keys move between options. This is the correct ARIA radio group pattern (not tabbing through each radio). It reduces tab stops for keyboard users navigating complex forms.
2. **RadioGroup.Indicator** (MEDIUM) — Renders only when the radio is checked, similar to Checkbox.Indicator. Allows different visual content when checked vs. unchecked.
3. **Form integration via name** (MEDIUM) — `name` prop on RadioGroup.Root enables native form submission with radio group behavior, working with React Hook Form and other form libraries without custom adapters.

## Notable Props
- `value` / `onValueChange`: controlled selection
- `defaultValue`: uncontrolled initial selection
- `name`: form field name for native form submission
- `required`: native form validation
- `orientation`: `"horizontal" | "vertical"` — affects arrow key direction

## A11y Highlights
- **Keyboard**: Tab enters the group; Arrow Up/Down (vertical) or Left/Right (horizontal) navigate between radios; Space selects focused radio
- **Screen reader**: `role="radiogroup"` with `aria-labelledby` from a wrapping label; `role="radio"` on items with `aria-checked`
- **ARIA**: Roving tabindex ensures correct focus management; orientation affects arrow key direction

## Strengths & Gaps
- **Best at**: Correct roving tabindex; orientation-aware arrow navigation; form integration
- **Missing**: No visual styles; no RadioGroup.Label primitive; must compose with native `<label>` elements
