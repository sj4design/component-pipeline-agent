---
system: Twilio Paste
component: Input[type=number]
url: https://paste.twilio.design/components/input
last_verified: 2026-03-28
confidence: medium
---

# Number Input

## Approach
Twilio Paste handles numeric input through its standard Input component with type="number", rather than providing a dedicated Number Input component with custom increment/decrement buttons. The native number input provides browser-native spinner controls and numeric keyboard on mobile. Paste's form field wrapper applies consistently.

## Key Decisions
1. **Native type="number"** (HIGH) — Native number input for consistent mobile numeric keyboard behavior, which is important for Twilio's console where users enter counts, timeouts, and configuration values.
2. **min/max/step pass-through** (MEDIUM) — Native attributes pass through for range constraint and step configuration.
3. **No custom stepper buttons** (MEDIUM) — No custom +/- increment buttons; browser handles native spinner controls.

## Notable Props
- `type="number"`: Native numeric input
- `min` / `max` / `step`: Native constraints
- `hasError`: Error state

## A11y Highlights
- **Keyboard**: Arrow keys increment/decrement; type numeric value directly
- **Screen reader**: Announced as spinbutton; current value, min, max communicated
- **ARIA**: Native spinbutton role; aria-valuemin/max/now; aria-describedby for help/error

## Strengths & Gaps
- **Best at**: Native mobile keyboard; standard form integration; no extra dependencies
- **Missing**: No custom +/- buttons; no formatted number display (currency, percentage); native number input quirks (no precise step on floats)
