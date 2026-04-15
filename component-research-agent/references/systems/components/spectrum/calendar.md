---
system: Spectrum (Adobe)
component: Calendar + RangeCalendar (both standalone)
url: https://react-spectrum.adobe.com/react-spectrum/Calendar.html
last_verified: 2026-03-28
---

# Calendar + RangeCalendar

## Approach

Spectrum is the design system that most explicitly and deliberately separates Calendar from DatePicker. `<Calendar />` and `<RangeCalendar />` are fully independent, first-class components that can be used entirely without any input field. DatePicker and DateRangePicker are separate components that compose Calendar internally — but the calendar grid itself is never locked inside the picker. The reason Adobe made this architectural decision is product-driven: Adobe's own applications (Analytics, Experience Platform, Lightroom, Creative Cloud dashboards) frequently need calendar grids embedded as persistent filter panels or timeline views, where there is no input field wrapper and no trigger button. If Calendar lived only inside DatePicker, every one of those use cases would require a workaround.

The architectural philosophy follows a strict composition pattern: build the smallest useful primitive first, then compose larger patterns from it. Calendar is the primitive. DatePicker is Calendar + DateField (text input) + Popover + Button. Because Calendar is independently usable, Adobe can also maintain two separate range-capable components — `<RangeCalendar />` handles the range selection logic as a standalone widget, while `<DateRangePicker />` composes it with two input fields and a popover. This separation means single-date and range use cases are handled by distinct components with clean APIs, rather than one Calendar component that becomes complex with an `allowRange` prop toggle.

Spectrum's Calendar is built on React Aria, meaning the accessible behavior layer — keyboard navigation, ARIA roles, screen reader announcements — is inherited from a rigorously tested, widely used primitive library. This is important context: the accessibility quality of Spectrum's Calendar is not incidental, it is the result of a dedicated accessibility architecture (React Aria) that powers every Spectrum component.

## Key Decisions

1. **Calendar is standalone, DatePicker composes it** (HIGH) — Adobe explicitly chose not to embed Calendar inside DatePicker. The rationale: Adobe's own product portfolio requires calendar grids in dashboard panels, scheduling views, and timeline filters where no text input exists. Building Calendar as a standalone primitive first prevents the painful refactor that occurs when an inline calendar use case inevitably appears. Any team building admin dashboards, analytics filters, or booking UIs will encounter this need within months of launching. Spectrum solved it preemptively.

2. **RangeCalendar as a separate component, not a prop on Calendar** (HIGH) — Rather than adding `allowRange={true}` to Calendar, Spectrum creates a completely separate `<RangeCalendar />` component. The reason: range selection fundamentally changes the interaction model — selection state tracks a `{start, end}` pair rather than a single value, hover logic needs to show the range preview, and unavailability constraints become more complex (is a date unavailable as a start, as an end, or anywhere in the range?). A single Calendar component with an `allowRange` prop would accumulate enormous conditional complexity. Separate components keep each API clean and each implementation focused.

3. **`isDateUnavailable` as a callback, not an array** (HIGH) — Spectrum uses `isDateUnavailable: (date: DateValue) => boolean` instead of a `disabledDates: Date[]` array. The rationale is performance and flexibility: a callback avoids building and passing a potentially large array of disabled dates. It also enables dynamic unavailability — a booking system can compute availability in real time based on the date being evaluated (checking against a fetched availability map, computing business days, etc.). An array approach requires pre-computing every disabled date across the visible range.

4. **`visibleMonths` prop (1–3 months)** (MEDIUM) — Calendar supports displaying 1–3 months simultaneously via `visibleMonths`. The primary use case is range selection across month boundaries — showing January and February side by side means a user selecting Jan 28 – Feb 5 can see both endpoints without navigating. The secondary use case is scheduling dashboards that want a broader date view. The maximum of 3 was chosen as a practical limit — beyond 3 months the UI becomes too wide for most viewports.

5. **`pageBehavior` controls how navigation advances** (MEDIUM) — When `visibleMonths={2}`, pressing "next" can either advance by 2 months (showing months 3–4) or advance by 1 month (showing months 2–3). The prop `pageBehavior` (`'visible'` vs `'single'`) gives the developer explicit control. The reason this matters: a booking UI may want the user to always advance by a full visible set (so they never lose context of a range endpoint), while a scheduling dashboard may want smooth single-month scrolling.

6. **`allowsNonContiguousRanges` on RangeCalendar** (MEDIUM) — By default, a range cannot span unavailable dates. This prop relaxes that constraint, allowing a range like Jan 5 – Jan 20 even if Jan 12 is unavailable. The application is then responsible for splitting the range around unavailable dates. The reason this is configurable rather than always-on is that most booking systems need hard boundaries (you can't book across a blocked period), while some scheduling tools need flexible ranges (you want to see a multi-week span even if some days are blocked).

## Notable Props

- `isDateUnavailable`: Callback `(date: DateValue) => boolean` — more powerful than a disabled array because it supports dynamic/computed availability.
- `visibleMonths`: Number 1–3 — enables multi-month layout for range selection context.
- `pageBehavior`: `'visible' | 'single'` — controls whether next/prev advances by visible months or one month.
- `focusedValue` / `onFocusChange`: Controls which date has keyboard focus, which also controls which month is displayed — decouples the visible month from the selected date.
- `createCalendar`: Accepts custom calendar system (Hebrew, Islamic, Buddhist, Indian) — enables true internationalized calendar rendering, not just locale text formatting.
- `firstDayOfWeek`: `'sun' | 'mon' | 'sat' | ...` — explicit locale customization for week start day.

## A11y Highlights

- **Keyboard**: Arrow keys navigate between days; Page Up/Page Down navigate months; Shift+Page Up/Down navigate years; Home/End navigate to start/end of week; Enter/Space select a date. For RangeCalendar, keyboard selection sets start date on first Enter, end date on second Enter. RTL keyboards automatically flip left/right arrow directions.
- **Screen reader**: CalendarGrid renders as an HTML `<table>` element with React Aria managing all ARIA roles. The calendar heading (month/year) is an `aria-live` region — screen readers announce the new month/year whenever navigation occurs. Localized screen reader messages confirm date selection and announce visible date range changes.
- **ARIA**: `aria-label` or `aria-labelledby` is required on every Calendar instance. Individual day cells use `aria-selected`, `aria-disabled`. The table uses `role="grid"` semantics via React Aria's implementation. `data-selected`, `data-disabled`, `data-invalid` data attributes power visual styling states.

## Strengths & Gaps

- **Best at**: Composability and accessibility — the standalone Calendar + RangeCalendar architecture with React Aria's a11y foundation is the most flexible and most accessible calendar implementation among Tier 1 systems.
- **Missing**: No built-in week number display (no `showWeekNumbers` prop equivalent exists on Calendar or RangeCalendar in Spectrum's React implementation).
