# Date Range Picker — Research
**Date:** 2026-04-17 | **Mode:** Max | **Systems:** 24 | **Scope:** All patterns

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Twilio Paste | No range picker; two separate DatePicker inputs (native input[type=date]) | Two DatePicker + application-level cross-validation |
| Salesforce Lightning | No dedicated range component; two Datepicker instances with cross-validation | Two Datepicker + cross-field validation |
| GitHub Primer | No DatePicker or DateRangePicker in Primer | Native input[type=date] via TextInput |
| REI Cedar | Single CdrDatePicker only; range requires custom composition | Custom composition |
| Atlassian | Deliberate non-implementation: two independent DatePickers with application-level coordination prevents "trapped start date" problem | Two DatePicker (`@atlaskit/datetime-picker`) + `disabledDateFilter` |
| Fluent 2 | No range mode; single DatePicker only | Two DatePicker instances + application coordination |
| Radix UI | No DateRangePicker primitive | Compose Popover + react-day-picker |
| Evergreen | No DateRangePicker in core | Two TextInputField[type=date] or third-party |
| Nord | Healthcare web component; single date only; range unsupported | Two instances + cross-validation |

**Systems WITH range picker:** M3 MaterialDateRangePicker, Spectrum DateRangePicker/RangeCalendar, Carbon DatePicker[range], Ant Design DatePicker.RangePicker, shadcn/ui Calendar[range], Playbook DatePicker[range], Wise Design, Dell DS, Chakra UI (Ark UI), Base Web Datepicker[range], Gestalt DateRange, Mantine DatePickerInput[type=range], Orbit InputDateRange — 13 of 24

---

## How Systems Solve It

### Spectrum DateRangePicker + RangeCalendar — "Segment spinbutton inputs with the best hover preview and non-contiguous range support"

Spectrum separates the input layer (DateRangePicker with segment-based spinbutton fields for start and end) from the calendar layer (RangeCalendar, usable standalone). Each date unit — month, day, year — is an independent spinbutton segment navigable by keyboard with its own min/max validation. No format-string parsing errors; no ambiguous date format interpretation.

The `allowsNonContiguousRanges` prop is a uniquely powerful feature: when unavailable dates fall within a selected range, the selection is still valid. This is critical for booking and scheduling UIs where weekends, holidays, or blocked periods should not break a range that spans over them.

The hover preview is Spectrum's most UX-forward decision: as the user moves the cursor over potential end dates, the tentative range is highlighted before committing. This dramatically reduces selection errors by making the consequence of a date choice visible before the click.

**Design Decisions:**
- **Segment spinbutton input for each date unit** → Why: eliminates format-string ambiguity ("01/02/03" is indeterminate across locales); each segment validates min/max independently → Impact: HIGH → Para tu caso: adopt segment inputs for any date picker serving multi-locale audiences
- **`allowsNonContiguousRanges`** → Why: booking/scheduling UIs often need to span over unavailable periods; blocking the range would force users to select non-ideal dates → Impact: HIGH → Para tu caso: required for hotel booking, calendar blocking, scheduling tools
- **Hover preview of tentative range** → Why: users can't know what a range looks like until they've committed both endpoints; preview reduces "I clicked the wrong end date" errors → Impact: HIGH → Para tu caso: implement hover preview for any range calendar; it's the #1 usability improvement for range selection

**Notable Props:** `allowsNonContiguousRanges`; `isDateUnavailable: (date) => boolean`; `value: {start: CalendarDate, end: CalendarDate}`; `visibleDuration` (multi-month); separate `RangeCalendar` usable standalone

**Accessibility:** Best-in-class — each segment has `role="spinbutton"` with `aria-valuemin/max/now`; calendar uses `role="grid"`; range start/end announced distinctly; `aria-describedby` links to range description

---

### Ant Design DatePicker.RangePicker — "Quarter-range, dynamic presets, and start-date-aware end-date restriction"

Ant Design's RangePicker shares five picker modes with the single DatePicker (date/week/month/quarter/year). The quarter-range picker serves fiscal reporting use cases. The `disabledDate` callback with `info.from` context is the most powerful range constraint API across all systems: during range selection, the function receives the already-selected start date and which end is being picked, enabling "max 90 days from start" rules without external state management.

Presets via the `presets` prop accept both static date pairs and dynamic functions — "Last N business days" presets can compute their ranges at runtime. The `needConfirm` prop configures whether selecting an end date auto-closes or requires an explicit OK button, making both auto-close and apply-button workflows configurable per use case.

**Design Decisions:**
- **`disabledDate` with `info.from`** → Why: end-date constraints that depend on the chosen start date are extremely common (max stay, max reporting window) but require cross-field state otherwise → Impact: HIGH → Para tu caso: essential for any range picker with day-count limits
- **Five picker modes for ranges** → Why: business reporting needs month-range, quarter-range, and year-range pickers; these are not edge cases in enterprise → Impact: HIGH → Para tu caso: implement month-range and quarter-range as modes if your product has any reporting/analytics features
- **Dynamic preset callbacks** → Why: relative ranges ("Last 7 days") need to compute start/end relative to today at render time, not at definition time → Impact: MED → Para tu caso: always implement presets with functions (not static dates) for relative range shortcuts

**Notable Props:** `presets: [{label, value: [Dayjs, Dayjs] | () => [Dayjs, Dayjs]}]`; `disabledDate: (current, {from, type}) => boolean`; `picker: "date"|"week"|"month"|"quarter"|"year"`; `needConfirm: boolean`; `cellRender`

**Accessibility:** Calendar uses `role="grid"`; arrow-key navigation; Page Up/Down for months; range start/end have accessible descriptions; `aria-label` on cells

---

### Material Design 3 MaterialDateRangePicker — "Full-screen modal for mobile-first range selection"

M3's range picker uses a full-screen modal on mobile — reflecting the view that range selection requires more screen real estate than a small popup can provide, especially for the two-month dual calendar view. The shared `CalendarConstraints` system works identically for single and range pickers, enabling consistent availability rules across date components. The visual "pill" connecting start and end dates is M3's design signature for range display.

**Design Decisions:**
- **Full-screen modal** → Why: two-month range selection needs space; mobile bottom sheet or dropdown is too constrained for accurate tap targets on a range calendar → Impact: HIGH → Para tu caso: full-screen or large bottom sheet for mobile range pickers; never a small dropdown
- **Separate component from DatePicker** → Why: range state (tracking start-selected, end-in-progress, complete-range) is complex enough that a mode prop on the single picker would create a bloated state machine → Impact: MED → Para tu caso: implement as a separate component or with clearly distinct modes that never share state

---

### Mantine DatePickerInput[type="range"] — "Most ergonomic T3 range API with DatesProvider locale management"

Mantine's `type="range"` prop on `DatePickerInput` is the most ergonomic range API in T3. The same component serves single, range, and multiple selection modes. `DatesProvider` handles locale and timezone globally at the app root, eliminating per-component locale configuration. `numberOfColumns` controls multi-month display; `excludeDate` callback handles unavailability; `getDayProps` enables per-day customization (custom markers, price badges, dot indicators).

---

### Orbit InputDateRange — "Travel-specific range with price-per-day cells and sequential selection enforcement"

Orbit's InputDateRange is purpose-built for flight booking. The `renderDay` prop displays price-per-day data inside calendar cells — the flight booking use case where users need to see cost alongside dates. Sequential selection enforcing departure before return, with min/max stay validation at the component level, prevents invalid booking ranges from reaching the application code.

---

### GOV.UK anti-pattern — "Two groups of three text inputs for known date ranges"

GOV.UK explicitly does not provide a calendar range picker. Their user research finding: for date ranges where users know both dates (employment history, reporting periods, tax year), two groups of Day/Month/Year text inputs outperform any calendar picker for speed and accuracy. This is the most thoroughly researched argument against calendar range pickers in any tier — it applies whenever both dates are "known dates" (not exploratory).

---

## Pipeline Hints

**Archetype recommendation:** composite-overlay (popover-based) or inline calendar
Rationale: Date range picker composites input fields (start/end date display) + a calendar popup overlay + optional preset panel. The calendar itself is a grid-tabular component. The composite overlay pattern applies.

**Slot consensus:** (13/24 systems with range picker)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| start-input | text | yes | 13/13 | Start date display/input; may be text field, segment spinbutton, or read-only |
| end-input | text | yes | 13/13 | End date display/input; same type as start-input |
| calendar-popup | container | yes | 12/13 | Popover containing the range calendar; Orbit uses inline (no popover) |
| calendar-grid | container | yes | 13/13 | Two-month (or single-month) calendar grid |
| month-nav | container | yes | 13/13 | Previous/next month navigation buttons |
| range-highlight | container | yes | 11/13 | Visual highlight across cells between start and end dates |
| hover-preview | container | no | 6/13 | Tentative range highlight during cursor hover before end-date selection |
| presets-panel | container | no | 5/13 | Shortcut buttons (Last 7 days, Last 30 days, This month, Custom) |
| apply-button | container | no | 3/13 | Explicit confirm button; Polaris pattern requires it; Ant Design `needConfirm` |
| clear-button | icon-action | no | 8/13 | Clears both dates |
| cell-badge | text | no | 1/13 | Orbit: price-per-day in calendar cells |
| picker-mode-tabs | container | no | 2/13 | Ant Design: date/week/month/quarter/year mode toggle |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Value | state | null/start-selected/complete | 13/13 | Three-state selection lifecycle |
| Size | variant | sm/md/lg | 6/13 | Input field size |
| State | state | default/open/disabled/error | 13/13 | Standard form control states |
| Picker mode | variant | date/week/month/quarter/year | 2/13 | Ant Design; date is universal default |
| Month columns | variant | 1/2 | 10/13 | 2-month side-by-side is the standard; 1-month on mobile |
| Confirmation | variant | auto-close/apply-button | 5/13 | Polaris requires apply; others auto-close |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| allowsNonContiguousRanges | 2/13 | false | Spectrum unique; range can span unavailable dates |
| showHoverPreview | 6/13 | true (when implemented) | Tentative range visual during hover |
| hasPresets | 5/13 | false | Shortcut preset range buttons |
| requiresConfirmation | 3/13 | false | Explicit apply button (Polaris enforces this) |
| showTwoMonths | 10/13 | true | Two-month side-by-side calendar |
| isDateUnavailable | 13/13 | — | Callback function, not boolean; but boolean hasUnavailableDates |
| hasMaxRange | 6/13 | false | Maximum number of days between start and end |
| hasMinRange | 4/13 | false | Minimum number of days between start and end |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default/closed | 13/13 | input fields showing placeholder or values | |
| open | 13/13 | calendar popup visible | |
| start-selected | 13/13 | start date highlighted; calendar awaiting end selection | |
| hover-preview | 6/13 | tentative range highlighted before end selection | |
| complete | 13/13 | both dates selected; range highlighted between them | |
| disabled | 10/13 | inputs grayed; no interaction | |
| error | 8/13 | input error border; error message below | |
| date-unavailable | 11/13 | calendar cells greyed/strikethrough | |
| date-in-range | 11/13 | visual fill/pill between start and end | |
| today | 9/13 | today's date indicated (dot or ring) | |
| focused-cell | 11/13 | focus ring on keyboard-navigated cell | |

**Exclusion patterns found:**
- disabled × open — disabled picker cannot be opened
- complete × start-selected — completing the range exits start-selected state
- error + date-unavailable — unavailable dates should visually differ from validation errors

**Building block candidates:**
- input-trigger → `.DateRangeInput` — start + end date display as the trigger for the calendar popup
- calendar → `.RangeCalendar` — standalone calendar grid with range selection (Spectrum exposes this separately)
- presets → `.DateRangePresets` — shortcuts panel that fires preset ranges at the calendar

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| pickerMode | date/week/month/quarter/year | 2/13 | Ant Design; most systems are date-only |
| calendarColumns | 1/2 | 10/13 | 2 for desktop; 1 for mobile |
| confirmationType | auto-close/apply-button | 5/13 | Polaris: always apply; others: configurable |

**A11y consensus:**
- Primary role: `role="grid"` on calendar; `role="gridcell"` on day cells
- Required ARIA: `aria-selected` on selected range endpoints ONLY (not intermediate cells — they get visual highlight only); `aria-disabled` on unavailable days; `aria-label` with full date on each cell
- Keyboard: arrow keys between days; Page Up/Down for months; Home/End for week boundaries; Enter/Space to select date
- Focus: Keyboard focus moves through calendar cells; Tab exits the calendar
- Screen reader announcement: range start cell: "March 5, 2026, range start"; range end cell: "March 12, 2026, range end"; intermediate cells: no aria-selected (visual only)
- Input labels: "Start date" and "End date" (never generic labels)
- GOV.UK approach: for known dates, two fieldset+legend groups of three text inputs outperform calendar pickers
- Sequential selection: Orbit announces "Select departure date" then "Select return date" — state-driven SR guidance
- Month navigation buttons: must include accessible names with month+year ("Next month, May 2026") not just arrows

---

## What Everyone Agrees On

1. **Intermediate cells in a range are NOT aria-selected**: Only start and end cells carry `aria-selected="true"`. Intermediate cells get visual highlighting only. Screen readers should announce the endpoints, not every day in between.

2. **Month navigation needs accessible labels**: Arrow buttons for previous/next month must include the destination month+year in their accessible name: "Previous month, February 2026". Icon-only chevrons without this context are inaccessible.

3. **Two-month display is the desktop standard**: 10/13 systems show two months side-by-side for desktop. Single-month layout is for mobile viewports. No system shows more than two months simultaneously in a standard picker.

4. **Start and end inputs must have distinct labels**: "Start date" and "End date" — never just "Date" or "From/To" without screen-reader-visible labels.

5. **Max/min range constraints belong in the component, not just application code**: Multiple systems (Orbit's min/max stay, Spectrum's `isDateUnavailable`, Ant's `disabledDate` with `info.from`) handle range constraints at the component level. Pushing all constraints to `onValidate` creates unavailable UX states before the user discovers them.

---

## Where They Disagree

**"¿Separate component or mode prop on DatePicker?"**
→ Separate component (M3, Gestalt, Orbit, Atlassian two-singles): avoids state machine complexity; cleaner component boundary → Mode prop (Carbon `datePickerType="range"`, Chakra `selectionMode="range"`, Mantine `type="range"`): one component covers all selection modes; fewer components to learn
→ Para tu caso: separate component if range is a rare use case; mode prop if your product uses range selection in most date inputs

**"¿Auto-close or require Apply button on end-date selection?"**
→ Auto-close (shadcn/ui, Mantine, most systems): faster for users who know what they want → Require Apply button (Polaris): prevents accidental submission while browsing calendar months; based on Shopify merchant research
→ Para tu caso: apply button for reporting date ranges where users browse before committing; auto-close for booking flows where the end date is the final action

**"¿Hover preview of tentative range?"**
→ With hover preview (Spectrum, shadcn/ui, Mantine): dramatically reduces selection errors; shows consequences before commitment → Without (M3, Carbon): simpler implementation; avoids visual noise on touch devices
→ Para tu caso: implement hover preview for all desktop range pickers; disable for touch-only or mobile-primary contexts

**"¿Preset range shortcuts?"**
→ With presets (Ant Design, Polaris pattern, Mantine): essential for analytics/reporting (Last 7 days, Last 30 days, This quarter) → Without (Spectrum, M3, Carbon): leaves preset implementation to consumers; keeps component scope minimal
→ Para tu caso: include presets if your product has any reporting or analytics features; a date range picker without "Last 30 days" forces extra clicks for the most common selection

**"¿Calendar picker or text inputs for known dates?"**
→ Calendar picker (13/13 systems): visual, discoverable, no format ambiguity → Text inputs with fieldset+legend (GOV.UK): faster for known dates; more accessible for users unfamiliar with calendar widgets
→ Para tu caso: calendar picker for exploratory range selection (analytics, booking); text inputs for known/historical date ranges (employment history, tax year)

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Dual-month side-by-side | Two calendar months shown simultaneously | Desktop range selection | shadcn/ui, Mantine, Gestalt, Ant, Orbit |
| Preset shortcuts panel | Column of preset range buttons beside calendar | Analytics/reporting | Ant Design, Polaris pattern, Mantine |
| Segment spinbutton inputs | Each date unit (M/D/Y) is a separate keyboard-spinnable field | Multi-locale input | Spectrum |
| Visual pill/fill | Continuous filled background between start and end cells | Clear range visualization | M3, all calendar-based systems |
| Price-per-day cells | Secondary text in each calendar cell showing cost | Travel booking | Orbit |
| Apply button | Explicit confirm before closing | High-stakes range selection | Polaris, configurable in Ant Design |

**Wireframe — standard dual-month with presets:**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│  📅 Mar 1, 2026  →  Mar 15, 2026                              [×] [Apply]  │
├─────────────────┬────────────────────────────────────────────────────────────┤
│  PRESETS        │   March 2026          │    April 2026                     │
│  Last 7 days    │  Su Mo Tu We Th Fr Sa │  Su Mo Tu We Th Fr Sa            │
│  Last 30 days   │   1  2  3  4  5  6  7 │        1  2  3  4               │
│  This month     │●══8══9══10═11═12═13=14│   5  6  7  8  9 10 11           │
│  Last month     │  15═16═17 18 19 20 21 │  12 13 14 15 16 17 18           │
│  Custom range   │  22 23 24 25 26 27 28 │  19 20 21 22 23 24 25           │
│                 │  29 30 31             │  26 27 28 29 30                  │
└─────────────────┴────────────────────────────────────────────────────────────┘
  ● = range start (Mar 8)  ═ = in-range highlight  → = range end (Mar 14)
```

---

## Risks to Consider

**Timezone handling is the most common range picker bug** (HIGH) — ranges selected in one timezone interpreted in another (e.g., UTC midnight crossing date boundaries) are the #1 source of "off by one day" bugs; only Base Web has explicit `timezone` prop; mitigation: always test range pickers with UTC ±n timezone offsets; use a date library that carries timezone information (date-fns-tz, Temporal API)

**Touch + hover preview conflict** (MEDIUM) — hover preview works on desktop; on touch devices, hover events don't exist before tap, so the tentative highlight never shows; mitigation: disable hover preview on touch targets; for mobile, show a "Tap to set end date" instruction after start selection

**Max/min stay violations discovered after commit** (MEDIUM) — if constraints are only validated on submit (not in the calendar), users can select invalid ranges and receive an error after clicking Apply; mitigation: disable end-date cells that violate `minStay`/`maxStay` constraints inside the calendar component itself (Orbit's approach)

---

## Dimension Scores

| Dimension | Spectrum | Ant Design RangePicker | Mantine DatePickerInput | Orbit InputDateRange | shadcn/ui DatePickerWithRange |
|-----------|----------|----------------------|------------------------|---------------------|------------------------------|
| A11y depth | 5/5 | 3/5 | 4/5 | 4/5 | 4/5 |
| Feature coverage | 4/5 | 5/5 | 5/5 | 4/5 | 4/5 |
| Composability | 5/5 | 3/5 | 4/5 | 2/5 | 5/5 |
| API ergonomics | 4/5 | 4/5 | 5/5 | 4/5 | 4/5 |
| Domain fit | General | Enterprise/reporting | General | Travel/booking | General |

---

## Next Steps

```
/spec date-range-picker      → outputs/date-range-picker-config.json
/enrich date-range-picker    → a11y tokens + interaction spec
/build date-range-picker     → full pipeline in one command
/build date-range-picker --max  → use pre-generated config
```
