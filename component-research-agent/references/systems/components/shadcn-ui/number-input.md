---
system: shadcn/ui
component: Number Input (no dedicated component)
url: https://ui.shadcn.com
last_verified: 2026-03-28
confidence: high
---

# Number Input

## Approach
shadcn/ui does not have a dedicated Number Input component. Numeric input is handled through the Input component with type="number". For a more featured number input with +/- buttons, developers use community components or build their own with Input and Button components. This is a known gap in shadcn/ui's form component set.

## Key Decisions
1. **Input type="number"** (HIGH) — Standard approach; native number input with Tailwind styling.
2. **Community stepper components** (MEDIUM) — Community components provide +/- button stepper patterns following shadcn/ui conventions.
3. **No official stepper** (HIGH) — Reflects shadcn/ui's position that a custom stepper adds complexity (edge cases in controlled state, formatting) without clear enough benefit.

## Notable Props
- Input with `type="number"`, `min`, `max`, `step`

## A11y Highlights
- **Keyboard**: Native spinbutton arrow keys; type numeric value
- **Screen reader**: Native spinbutton; aria-valuemin/max/now
- **ARIA**: Native number input ARIA; developer adds aria-label/describedby

## Strengths & Gaps
- **Best at**: Simple native number input; zero extra dependencies
- **Missing**: No +/- stepper buttons; no formatted display; no official component
