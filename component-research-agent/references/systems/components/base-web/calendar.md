---
system: Base Web (Uber)
component: Calendar (via Datepicker)
url: https://baseweb.design/components/datepicker/
last_verified: 2026-03-28
confidence: medium
---

# Calendar

## Approach
Base Web's Calendar is exposed via the Datepicker component. The calendar grid can be rendered inline (without the input wrapper) by using the Datepicker in controlled mode and rendering only the Calendar sub-component. This follows Base Web's pattern of separating concerns via Overrides. A standalone Calendar usage is possible but not the primary documented pattern.

## Key Decisions
1. **Calendar via Datepicker extraction** (MEDIUM) — The calendar grid is part of the Datepicker component's Overrides system, accessible but not designed as a first-class standalone component.

## Notable Props
- Uses Datepicker props in inline mode

## A11y Highlights
- **Keyboard**: Arrow navigation; standard calendar grid keyboard behavior
- **Screen reader**: role="grid" calendar ARIA
- **ARIA**: Via Datepicker implementation

## Strengths & Gaps
- **Best at**: Available via Datepicker when needed
- **Missing**: No dedicated standalone Calendar component; must extract from Datepicker
