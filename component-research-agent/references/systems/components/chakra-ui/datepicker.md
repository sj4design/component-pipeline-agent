---
system: Chakra UI
component: Date Picker (not in core — use community @chakra-ui/datepicker or Ark UI)
url: https://chakra-ui.com/docs/components
last_verified: 2026-03-28
confidence: medium
---

# Date Picker (via Ark UI integration)

## Approach
Chakra UI v2 and v3 do not ship a DatePicker in the core component library. Chakra v3 is built on top of Ark UI (headless components from the Park UI team), and Ark UI does include a full DatePicker primitive. In practice, Chakra UI teams either use Ark UI's DatePicker directly with Chakra's styling system or use the community `@ark-ui/react` DatePicker. The integration is smooth because Chakra v3's theming system is designed to style Ark UI components. This approach prioritizes composability and keeps the core bundle small.

## Key Decisions
1. **Ark UI as headless foundation** (HIGH) — Chakra v3's pivot to Ark UI means DatePicker logic (calendar state machine, date arithmetic, keyboard navigation) is provided by Zag.js state machines, which are thoroughly tested and cross-framework. This is more robust than Chakra building date logic in-house.
2. **Themeable via recipe system** (HIGH) — Chakra v3's recipe-based theming allows DatePicker parts (input, calendar, day-cell, month-header) to each receive semantic token overrides. This matches Chakra's philosophy of making every visual aspect tokenizable.
3. **Localization via Intl API** (MEDIUM) — The Ark UI DatePicker uses the native JavaScript Intl API for locale-aware date formatting and calendar systems (Gregorian, Hijri, etc.), avoiding a heavy date library dependency.

## Notable Props
- `value`: controlled date value as `DateValue` type from `@internationalized/date`
- `locale`: BCP 47 locale string for formatting and calendar system selection
- `min` / `max`: date range constraints
- `onValueChange`: callback with selected date(s)

## A11y Highlights
- **Keyboard**: Arrow keys navigate calendar grid; Page Up/Down change month; Home/End go to start/end of week
- **Screen reader**: Calendar grid uses `role="grid"` with `aria-label` for month/year; selected date announced via `aria-selected`
- **ARIA**: Input has `aria-haspopup="dialog"`; calendar dialog has `aria-modal="true"`

## Strengths & Gaps
- **Best at**: Token-based visual customization; Zag.js state machine provides reliable calendar logic
- **Missing**: Not in Chakra core docs — requires Ark UI dependency; range selection requires additional configuration
