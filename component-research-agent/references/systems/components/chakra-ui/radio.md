---
system: Chakra UI
component: Radio / RadioGroup
url: https://chakra-ui.com/docs/components/radio
last_verified: 2026-03-28
confidence: high
---

# Radio / RadioGroup

## Approach
Chakra UI's Radio and RadioGroup provide a complete styled radio button system. RadioGroup manages the selected value and provides it to child Radio components via context, avoiding prop drilling. The components use Chakra's colorScheme system for the selected fill color and size props for density. A Stack-based layout is commonly combined with RadioGroup for horizontal or vertical orientation.

## Key Decisions
1. **Context-based value propagation** (HIGH) — RadioGroup passes `value` and `onChange` to children via React context, so individual Radio components don't need their own checked/onChange props. This is more ergonomic than passing props to every Radio.
2. **colorScheme for selection color** (HIGH) — The selected radio uses the colorScheme palette, making it easy to color-match with the surrounding UI or indicate semantic meaning (green for "accept", red for "decline").
3. **Stack layout pattern** (MEDIUM) — The combination of RadioGroup with `<Stack direction="row">` or `<Stack>` for vertical is the standard pattern in Chakra docs. This is idiomatic Chakra layout, not a built-in orientation prop.

## Notable Props
- RadioGroup: `value`, `onChange`, `name`, `defaultValue`
- Radio: `value` (the radio's value), `isDisabled`, `isReadOnly`, `colorScheme`, `size`
- `size`: `"sm" | "md" | "lg"`

## A11y Highlights
- **Keyboard**: Arrow keys navigate within RadioGroup; Tab enters/exits the group
- **Screen reader**: `role="radiogroup"` via native fieldset; `role="radio"` on each item; `aria-checked`
- **ARIA**: RadioGroup renders a `<fieldset>` when given a label; roving tabindex within the group

## Strengths & Gaps
- **Best at**: Context-based value propagation; colorScheme integration; ergonomic API
- **Missing**: No RadioCard variant in core; no visual variant system for different radio appearances
