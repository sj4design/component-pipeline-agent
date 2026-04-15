---
system: Spectrum
component: DatePicker / DateRangePicker / Calendar / RangeCalendar
url: https://react-aria.adobe.com/DateRangePicker
last_verified: 2026-03-28
---

# DatePicker / DateRangePicker

## Approach
Adobe started with accessibility-first architecture and built the visual UI on top. Calendar is a standalone component (separate from DatePicker) because Adobe's products (Lightroom, Analytics, Experience Platform) frequently need calendar grids in dashboards without an input wrapper. The segmented date input is Spectrum's boldest decision: instead of one text field for "03/28/2026", each unit (month, day, year) is independently focusable and editable. This eliminates format ambiguity entirely — no "MM/DD vs DD/MM" confusion because each segment is labeled. The cost is implementation complexity; the benefit is the best keyboard and accessibility experience for date entry in any major design system. Internationalization is baked in via `@internationalized/date`, supporting non-Gregorian calendars (Islamic, Buddhist, Hebrew, Japanese, etc.) natively.

## Key Decisions
1. **Calendar as standalone component** (HIGH) — Calendar and RangeCalendar are independent from DatePicker. Adobe's products need calendar grids in dashboards and filters without input wrappers. Architecture decision: build Calendar first, then DatePicker wraps it with input+popover.
2. **Segmented date input (per-unit editing)** (HIGH) — Each date unit is an independently focusable spinbutton segment. Arrow Up/Down increments, typing fills the segment, Tab advances. Eliminates format ambiguity and makes impossible-to-enter invalid months. Best a11y approach available.
3. **`isDateUnavailable` + `allowsNonContiguousRanges`** (HIGH) — Callback for dynamic disabled dates. `allowsNonContiguousRanges` lets ranges span unavailable dates (e.g., Mon-Fri when weekends are disabled). No other system offers this granularity.
4. **`validationBehavior`: native vs ARIA** (MEDIUM) — Developer chooses HTML5 form validation or ARIA-based error messaging. Respects that apps have different form architectures instead of forcing one.

## Notable Props
- `granularity`: "day" or "minute" — one prop switches from date-only to date+time, changing the entire component complexity level.
- `maxVisibleMonths`: Responsive calendar sizing — shows N months "if screen space permits."
- `startName`/`endName`: Separate form submission names for range endpoints — zero serialization code needed.
- `shouldForceLeadingZeros`: Overrides locale formatting — acknowledges real-world formatting conflicts.

## A11y Highlights
- **Keyboard**: Segments use `role="spinbutton"` with `aria-valuenow/min/max`. Arrow Up/Down increments. Left/Right moves segments. Calendar grid uses arrow keys, Enter to select.
- **Screen reader**: Each segment announces label + value. Range endpoints identified distinctly. Validation errors linked via `aria-describedby`.
- **ARIA**: `role="group"` on input container. `necessityIndicator` for required fields (icon or text). The segmented spinbutton is unique to Spectrum — no other major DS has this.

## Strengths & Gaps
- **Best at**: Accessibility (gold standard), composability (Calendar standalone), internationalization (multi-calendar systems), segmented input.
- **Missing**: No built-in preset ranges (explicitly out of scope). Steeper learning curve. Requires `@internationalized/date` dependency.
