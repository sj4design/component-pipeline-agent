---
system: REI Cedar
component: InputNumber
url: https://cedar.rei.com/components/input-number
last_verified: 2026-03-28
confidence: medium
---

# InputNumber (Number Input)

## Approach
REI Cedar provides an InputNumber component for quantity selection in e-commerce — product quantity for cart, number of rental days, group size for events. The e-commerce context motivates a +/- stepper button pattern for easy quantity adjustment without typing.

## Key Decisions
1. **+/- stepper buttons** (HIGH) — Increment/decrement buttons alongside the number input for easy quantity adjustment in cart and rental contexts — more usable for mobile touch than native spinbutton.
2. **Mobile-touch-friendly** (HIGH) — Stepper buttons sized for touch interaction, critical for mobile e-commerce quantity selection.
3. **Min/max constraint display** (MEDIUM) — Visual indication when min (0) or max quantity is reached.

## Notable Props
- `value`: Controlled quantity
- `min` / `max`: Quantity bounds
- `step`: Increment step
- `onChange`: Value change callback

## A11y Highlights
- **Keyboard**: Arrow keys or +/- buttons; input also directly editable
- **Screen reader**: Spinbutton or stepper buttons labeled; current value, min, max announced
- **ARIA**: aria-label on increment/decrement buttons; aria-valuemin/max/now; disabled state on buttons at limits

## Strengths & Gaps
- **Best at**: E-commerce quantity selection; mobile-touch stepper buttons; min/max visual feedback
- **Missing**: Medium confidence; exact Vue API details uncertain
