---
component: datepicker
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Date Picker
**Approach:** M3 offers three variants — modal calendar, modal text input, and docked — primarily targeting Android. The INPUT_MODE toggle lets users switch between calendar and text entry within one component. Values use UTC milliseconds; CalendarConstraints defines valid ranges via a builder pattern.
**Key Decisions:**
- [HIGH] Modal-first design: calendar displays as a dialog to maximize tap targets on mobile, not inline
- [HIGH] CalendarConstraints builder: validator/bounds/open-at config separated from the component itself for reuse across date fields
- [MED] UTC milliseconds as the value type: avoids timezone-naive date objects and aligns with Android's time APIs
**Notable API:** `CalendarConstraints.Builder` for range/validator; `INPUT_MODE_CALENDAR` / `INPUT_MODE_TEXT` to set default entry mode
**A11y:** Dialog has `role="dialog"` and `aria-modal`; calendar cells use `role="gridcell"` with `aria-selected` and `aria-label` for the full date string.
**Best at:** Touch-optimized modal date selection with locale-aware formatting across Android surfaces.
**Missing:** No inline/embedded calendar mode; date range picker requires separate `MaterialDateRangePicker` with manual coordination.

---

## spectrum
**Component:** DatePicker / DateRangePicker / Calendar / RangeCalendar
**Approach:** Spectrum uses the same segment-based spinbutton input as TimeField — each date unit is an independent interactive segment. Four separate components (DatePicker, DateRangePicker, Calendar, RangeCalendar) serve distinct composition needs, with `granularity` controlling which segments appear.
**Key Decisions:**
- [HIGH] Segment spinbutton input: per-unit keyboard navigation with per-segment validation; no format string parsing errors
- [HIGH] `isDateUnavailable` callback: arbitrary unavailability logic (weekends, holidays, booked slots) as a function returning boolean
- [MED] `allowsNonContiguousRanges`: lets RangePicker selections skip unavailable dates rather than blocking the entire range
**Notable API:** `granularity` prop (`"day"` | `"month"` | `"year"` | `"hour"`); `isDateUnavailable: (date) => boolean`
**A11y:** Best-in-class — each segment has `role="spinbutton"` with `aria-valuemin/max/now`; calendar uses `role="grid"` with `aria-current="date"` on today.
**Best at:** Accessibility and composability — the segment model and separate Calendar component enable both form-field and standalone calendar use cases with full keyboard/screen reader support.
**Missing:** No built-in preset shortcuts (e.g., "Last 7 days") for range pickers; presets require custom composition.

---

## carbon
**Component:** DatePicker (Flatpickr-based)
**Approach:** Carbon wraps Flatpickr for calendar rendering. The `datePickerType` prop selects between three modes: `simple` (text-only, no calendar), `single` (one date with calendar), and `range` (two-date range with calendar). The Flatpickr engine handles locale and calendar UI.
**Key Decisions:**
- [HIGH] Three types via `datePickerType`: simple/single/range are distinct configurations, not separate components
- [MED] Flatpickr dependency: rapid calendar implementation but introduces a non-Carbon styling dependency that is difficult to fully theme
- [MED] Locale via Flatpickr's locale system: first-day-of-week and month names follow Flatpickr locale objects, separate from Carbon's i18n system
**Notable API:** `datePickerType: "simple" | "single" | "range"`; `minDate` / `maxDate` as strings in the configured date format
**A11y:** Flatpickr provides basic keyboard navigation within the calendar; Carbon layers accessible labels on the input but screen reader behavior of the calendar popup depends on Flatpickr's own ARIA output, which has known gaps.
**Best at:** Form integration — DatePickerInput inherits Carbon's full form validation, error state, and helper text system automatically.
**Missing:** Date unavailability callbacks (only min/max supported); the Flatpickr calendar rendering is difficult to style to match Carbon tokens precisely.

---

## polaris
**Component:** Pattern documentation only (no standalone DatePicker component)
**Approach:** Polaris provides no DatePicker component. Instead, pattern documentation describes a three-zone layout for range selection: a text-input zone for typed dates, a calendar zone for visual selection, and an optional presets zone. Polaris recommends an explicit confirmation button for range selections rather than auto-closing on second date pick.
**Key Decisions:**
- [HIGH] No component — pattern only: Shopify's merchant research found that date picking needs vary too much across contexts (order filtering, scheduling, reporting) for a single component
- [HIGH] Explicit confirmation for ranges: "Apply" button prevents accidental range submission when merchants are still browsing calendar months
- [MED] Responsive collapse: the dual-month range calendar collapses to single-month on narrow viewports; documented as a required responsive behavior in custom implementations
**Notable API:** None (pattern documentation only); recommended to use `TextField` + custom calendar library styled with Polaris tokens
**A11y:** No prescribed ARIA pattern; custom implementations must apply `role="grid"`, `aria-current`, and keyboard navigation manually.
**Best at:** Contextual guidance on range selection UX (explicit confirmation, preset shortcuts for merchant date-filtering workflows).
**Missing:** Any implemented component — merchants building Shopify apps must implement from scratch using the pattern docs.

---

## atlassian
**Component:** DatePicker (from @atlaskit/datetime-picker)
**Approach:** Atlassian's DatePicker uses a calendar popup triggered by a text input. Critically, there is no DateRangePicker — a deliberate decision based on Atlassian product research finding that range selection in Jira and Confluence is better served by two independent DatePickers with cross-field validation rather than a single constrained range component.
**Key Decisions:**
- [HIGH] No DateRangePicker: two independent DatePickers for ranges avoids "trapped" selection states and allows independent validation
- [HIGH] `disabledDateFilter` callback: function receiving a date and returning boolean, enabling context-specific unavailability (e.g., non-working days in Jira sprint planning)
- [MED] `shouldShowCalendarButton`: controls whether the calendar icon trigger is shown; some Atlassian UIs prefer keyboard-only text entry without a calendar popup
**Notable API:** `disabledDateFilter: (date: string) => boolean`; `dateFormat` for display format control; `defaultIsOpen` for auto-open on render
**A11y:** Calendar uses `role="grid"` with `role="gridcell"` per day; `aria-selected` on selected date; `aria-disabled` on disabled dates. Keyboard navigation within calendar via arrow keys.
**Best at:** Single date selection with context-aware disabling via callback — well-integrated into Atlassian's form system with Final Form compatibility.
**Missing:** No DateRangePicker component; time zone handling requires the separate DateTimePicker from the same package.

---

## ant-design
**Component:** DatePicker (5 modes)
**Approach:** A single DatePicker component supports five picker modes via the `picker` prop: `date`, `week`, `month`, `quarter`, `year`. RangePicker is a separate export. The `disabledDate` callback receives `{from, type}` in range context, enabling start-date-aware end-date restriction. `presets` supports callbacks for dynamic preset ranges.
**Key Decisions:**
- [HIGH] Five picker modes: `picker="quarter"` is unique to Ant Design — serves Alibaba's fiscal/business reporting use cases
- [HIGH] `disabledDate` with `info.from` and `info.type`: during range selection, the function receives which end is being picked and the already-selected start, enabling "max 30-day range" rules
- [MED] `needConfirm` prop: controls whether selecting a date auto-closes or requires an explicit OK button — mirrors Carbon's range confirmation but as an opt-in prop
**Notable API:** `picker: "date" | "week" | "month" | "quarter" | "year"`; `presets: [{label, value: Dayjs | () => Dayjs}]`; `cellRender` for custom day cell content
**A11y:** Calendar uses `role="grid"`; `aria-label` on cells with full date descriptions; keyboard navigation with arrow keys between cells and Page Up/Down for month navigation.
**Best at:** Date mode breadth — quarter picker, callback-based range restriction with `info.from`, and dynamic presets are unique capabilities not found in any other Tier 1 system.
**Missing:** No time zone-aware value parsing; the Day.js value model does not carry zone information, leaving time zone handling entirely to the application.
