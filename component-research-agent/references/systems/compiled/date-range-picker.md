---
component: date-range-picker
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** MaterialDateRangePicker
**Approach:** M3 provides a dedicated DateRangePicker component separate from DatePicker, displayed as a full-screen modal on mobile. The range selection uses a two-month calendar view with a visual "pill" connecting start and end dates. Text input mode allows manual entry of both dates. Uses UTC milliseconds for start/end values via `Pair<Long, Long>`.
**Key Decisions:**
- [HIGH] Full-screen modal for range: range selection demands more space than single date, so M3 uses a full-screen dialog rather than a compact popup
- [HIGH] Separate component from DatePicker: MaterialDateRangePicker is a distinct class, not a mode toggle on MaterialDatePicker — reflects the added complexity of range state
- [MED] CalendarConstraints shared with single picker: the same `CalendarConstraints.Builder` works for both single and range, enabling consistent unavailability rules across date components
**Notable API:** `CalendarConstraints.Builder` with `setValidator(DateValidator)` supporting `CompositeDateValidator`; `setOpenAt` to control initial visible month
**A11y:** Dialog has `role="dialog"` with `aria-modal`; calendar cells use `role="gridcell"` with `aria-selected`; range endpoints announced as "start date" and "end date" via content descriptions.
**Best at:** Mobile-native range selection with touch-friendly full-screen modal and locale-aware display.
**Missing:** No inline/embedded range calendar mode; no preset range shortcuts; no hover preview of tentative range during selection.

---

## spectrum
**Component:** DateRangePicker / RangeCalendar
**Approach:** Spectrum separates the input layer (DateRangePicker with segment-based spinbutton fields for start and end) from the calendar layer (RangeCalendar). Each date unit (month, day, year) is an independent segment navigable by keyboard. The calendar shows range highlighting between start and end dates with hover preview of the tentative range. `allowsNonContiguousRanges` lets selections skip over unavailable dates.
**Key Decisions:**
- [HIGH] Segment spinbutton input for both start and end: eliminates format-string parsing errors; each segment validates independently with min/max per unit
- [HIGH] `allowsNonContiguousRanges`: when unavailable dates fall within a selected range, the selection is still valid — critical for booking/scheduling UIs
- [HIGH] Hover preview: as the user hovers over the end date, the tentative range is visually highlighted before committing — reduces selection errors
- [MED] Separate RangeCalendar component: can be used standalone without DateRangePicker input fields for embedded calendar UIs
**Notable API:** `allowsNonContiguousRanges`; `isDateUnavailable: (date) => boolean`; `value: {start: CalendarDate, end: CalendarDate}`; `visibleDuration` to show multiple months
**A11y:** Best-in-class — each input segment has `role="spinbutton"` with `aria-valuemin/max/now`; calendar uses `role="grid"`; range start/end cells announced distinctly; `aria-describedby` links to range description.
**Best at:** Accessibility, composability, and the hover preview pattern — the segment model and separate RangeCalendar component provide maximum flexibility with full keyboard/screen reader support.
**Missing:** No built-in preset shortcuts (e.g., "Last 7 days"); presets require custom composition outside the component.

---

## carbon
**Component:** DatePicker (range mode)
**Approach:** Carbon uses the same DatePicker component with `datePickerType="range"` to enable range selection. Two DatePickerInput children represent start and end dates. The underlying Flatpickr instance handles dual-calendar rendering and range highlighting. The `onChange` callback receives an array of two Date objects.
**Key Decisions:**
- [HIGH] Single component, mode prop: `datePickerType="range"` avoids a separate component — keeps the API surface small but overloads one component with three distinct behaviors
- [MED] Two DatePickerInput children: start and end inputs are separate child components within the parent DatePicker, enabling individual labels, helpers, and error states
- [MED] Flatpickr range mode: relies on Flatpickr's built-in range behavior — fast implementation but limited customization of range highlight styling and hover behavior
**Notable API:** `datePickerType="range"`; `onChange: (dates: Date[]) => void`; `minDate` / `maxDate` as date-format strings
**A11y:** Flatpickr provides basic keyboard navigation within the calendar; each input has individual labels and `aria-describedby` for helper text. Calendar popup accessibility depends on Flatpickr's own ARIA output, which has known gaps in range announcement.
**Best at:** Form integration — start and end inputs inherit Carbon's full form validation, error state, and helper text system automatically with minimal setup.
**Missing:** No date unavailability callbacks (only min/max supported); no hover preview of tentative range; no preset range shortcuts; Flatpickr's calendar is difficult to fully theme with Carbon tokens.

---

## polaris
**Component:** Pattern documentation only (DateRangePicker)
**Approach:** Polaris provides no DateRangePicker component but offers detailed pattern documentation for range selection. The recommended layout is a three-zone structure: text inputs for start/end dates, a dual-month calendar for visual selection, and an optional presets panel with shortcuts like "Last 7 days" or "Last 30 days." An explicit "Apply" button is required — no auto-close on second date pick.
**Key Decisions:**
- [HIGH] Explicit confirmation required: "Apply" button prevents accidental range submission when merchants are still exploring calendar months — based on merchant research
- [HIGH] Preset shortcuts panel: Shopify's merchant workflows (order filtering, sales reporting) demand quick access to common relative ranges; this is a first-class zone in the layout
- [HIGH] No component — pattern only: date range needs vary too much across Shopify merchant contexts for a single component to serve all use cases
- [MED] Responsive collapse: dual-month calendar collapses to single-month on narrow viewports; documented as mandatory responsive behavior
**Notable API:** None (pattern documentation only); recommended to compose `TextField` + custom calendar + presets panel styled with Polaris tokens
**A11y:** No prescribed ARIA pattern; custom implementations must apply `role="grid"`, `aria-current`, keyboard navigation, and range announcement manually.
**Best at:** UX guidance for merchant-facing range selection — the three-zone layout with presets and explicit confirmation is the most thoroughly documented range selection pattern in any Tier 1 system.
**Missing:** Any implemented component — Shopify app developers must build entirely from scratch using pattern docs.

---

## atlassian
**Component:** No DateRangePicker (use two DatePickers)
**Approach:** Atlassian deliberately does not provide a DateRangePicker component. Based on product research from Jira and Confluence, range selection is handled by two independent DatePicker instances with cross-field validation. The rationale is that a single range picker creates "trapped" selection states where correcting the start date after setting the end date is awkward.
**Key Decisions:**
- [HIGH] No DateRangePicker — by design: two independent DatePickers with application-level coordination avoids the "trapped start date" problem and allows independent validation per field
- [HIGH] Cross-field validation in application code: the consumer validates that end >= start, not the component — keeps each DatePicker simple and composable
- [MED] `disabledDateFilter` enables range constraint: the end-date picker's filter function can reference the selected start date to prevent invalid ranges
**Notable API:** Two instances of `DatePicker` from `@atlaskit/datetime-picker`; `disabledDateFilter: (date: string) => boolean` used on end-date picker to enforce start-date constraint
**A11y:** Each DatePicker independently accessible with `role="grid"` calendar, `aria-selected` on selected date, `aria-disabled` on disabled dates. No range announcement since the two pickers are independent form fields.
**Best at:** Simplicity and composability — avoiding a dedicated range picker reduces API surface and avoids complex range selection state machines.
**Missing:** No range highlighting between start and end dates; no hover preview; no preset shortcuts; no visual connection between the two date fields indicating they form a range.

---

## ant-design
**Component:** DatePicker.RangePicker
**Approach:** Ant Design provides `DatePicker.RangePicker` as a dedicated export that shares the same five picker modes (date, week, month, quarter, year) as the single DatePicker. The `disabledDate` callback receives `{from, type}` context during range selection, enabling start-date-aware end-date restriction. A `presets` prop supports both static and dynamic (callback-based) range shortcuts displayed as chips above the calendar.
**Key Decisions:**
- [HIGH] `disabledDate` with `info.from`: during range selection, the function receives the already-selected start date and which end is being picked, enabling "max N days from start" rules — unique capability
- [HIGH] `presets` with callback values: preset ranges can be dynamic functions (e.g., "Last N business days") not just static date pairs
- [HIGH] Five picker modes for ranges: `picker="month"` creates a month-range picker, `picker="quarter"` a quarter-range picker — serves fiscal/business reporting use cases
- [MED] `needConfirm` prop: controls whether selecting an end date auto-closes or requires explicit OK button — configurable per use case
**Notable API:** `presets: [{label, value: [Dayjs, Dayjs] | () => [Dayjs, Dayjs]}]`; `disabledDate: (current, {from, type}) => boolean`; `picker: "date" | "week" | "month" | "quarter" | "year"`; `cellRender` for custom cell content
**A11y:** Calendar uses `role="grid"` with `aria-label` on cells; keyboard navigation with arrow keys between cells and Page Up/Down for months; range start/end have accessible descriptions.
**Best at:** Range mode breadth — quarter-range picker, callback-based range restriction with `info.from`, dynamic presets, and `needConfirm` toggle are capabilities not found together in any other Tier 1 system.
**Missing:** No time zone-aware value parsing; Day.js values do not carry zone information. No hover preview of tentative range during selection.
