---
component: calendar
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Calendar — All Systems Digest

## Material Design 3
**Approach**: No standalone Calendar component — the calendar grid exists exclusively inside DatePicker variants (Docked, Modal, Modal Date Input). Range selection uses two-month side-by-side layout inside the Modal dialog. Optimized for form-completion flows, not persistent display surfaces.
**Key decisions**:
- No standalone Calendar; M3 targets Android/mobile where date selection is always a task-completion action, not a persistent view — inline calendar grids were not in M3's reference product scope
- Three picker variants (Docked/Modal/Modal Date Input) each serve distinct UX contexts; forcing one pattern onto mobile and desktop degrades UX for one of them
- `setDayViewDecorator()` decorator pattern for disabled dates enables arbitrary visual decoration alongside disablement (e.g., price indicators in booking UIs)
**Notable API**: `datePickerType` (docked|modal|modal-input); `setTitleText()`; `setSelection()`; `app:rangeFillColor`
**A11y**: Modal dialog traps focus on open; calendar heading is an aria-live region; Modal Date Input mode allows full keyboard text entry as alternative to grid navigation.
**Best at**: Comprehensive picker patterns for form-completion flows with clear variant guidance. **Missing**: No standalone Calendar widget for dashboards or scheduling views.

## Spectrum (Adobe)
**Approach**: Calendar and RangeCalendar are fully standalone first-class components — DatePicker composes Calendar internally, not vice versa. `isDateUnavailable` is a callback (not an array) for dynamic availability. `visibleMonths` (1–3) enables multi-month layout. Built on React Aria for accessibility.
**Key decisions**:
- Standalone Calendar; Adobe's own products (Analytics, Experience Platform) need calendar grids in dashboard panels without text field triggers — building Calendar as a primitive prevents a forced refactor
- RangeCalendar as separate component (not `allowRange` prop); range selection changes state shape, hover logic, and unavailability constraints so fundamentally that one component would accumulate unmanageable conditional complexity
- `isDateUnavailable` callback vs. array; enables dynamic/computed availability (booking system checking an availability map) without pre-computing every disabled date across the visible range
**Notable API**: `isDateUnavailable`; `visibleMonths` (1-3); `pageBehavior` (visible|single); `allowsNonContiguousRanges`; `createCalendar` (custom calendar systems: Hebrew, Islamic, Buddhist); `firstDayOfWeek`
**A11y**: Arrow keys + Page Up/Down + Shift+Page Up/Down (years); role="grid" via React Aria; aria-live region on heading; RTL arrow keys auto-flip; aria-label required on every Calendar instance.
**Best at**: Composability and accessibility — standalone Calendar+RangeCalendar with React Aria's a11y foundation. **Missing**: No week number display (no `showWeekNumbers` prop).

## Carbon (IBM)
**Approach**: No standalone Calendar — grid is embedded inside DatePicker (Simple/Single/Range variants). Powered by Flatpickr (third-party), which creates an accessibility ceiling; v12 refactor plans to drop the dependency and build a first-party implementation.
**Key decisions**:
- Flatpickr as calendar engine; pragmatic decision to ship faster — Flatpickr handles month navigation, range logic, and keyboard behavior, but Carbon inherits Flatpickr's a11y limitations (keyboard navigation gaps, inconsistent SR announcements)
- Simple variant (text input only, no calendar) for power users who know their date without needing to navigate a grid — one of the few systems that makes text-entry a first-class option
- Three variants (Simple/Single/Range) map to the full spectrum of enterprise form date inputs with explicit guidance on which to use
**Notable API**: `datePickerType` (simple|single|range); `minDate`/`maxDate`; `disable` (array or Flatpickr callback); `locale` (Flatpickr locale object)
**A11y**: Inherited from Flatpickr — documented issues with Page Up/Down month navigation and SR announcement quality; v12 refactor targets resolving these gaps; role="dialog" on open calendar.
**Best at**: Enterprise form variant coverage (simple/single/range) with clear selection guidance. **Missing**: No standalone Calendar; Flatpickr dependency is an active a11y ceiling being removed in v12.

## Polaris (Shopify)
**Approach**: DatePicker IS the calendar grid — renders inline by default with no trigger required. Range selection via `allowRange` prop on the same component. Month/year state is fully controlled (required props). Inline-first architecture reflects merchant need for always-visible calendars in filter panels and dashboards.
**Key decisions**:
- Inline-first design; Shopify merchants interact heavily with date ranges for campaigns and order filtering — always-visible calendar reduces steps vs. popup picker for frequent date-selection tasks
- `allowRange` as prop vs. separate component; Shopify products frequently evolve from single-date to range requirements — one prop change instead of component swap
- Fully controlled month/year state; Shopify Admin often needs calendar navigation synchronized with surrounding data (analytics update when month changes) — internal state would cause desync bugs
**Notable API**: `month`/`year` (required controlled); `onMonthChange`; `allowRange`; `multiMonth`; `disableDatesBefore`/`disableDatesAfter`; `disableSpecificDates` (array)
**A11y**: Arrow keys navigate day cells; table semantics with aria-label per cell; text input pairing is developer responsibility (not automatic) — creating an easy-to-miss a11y gap.
**Best at**: Inline always-visible calendar for e-commerce with controlled state synchronization. **Missing**: No function callback for disabled dates (arrays only); text input alternative is not automatic.

## Atlassian
**Approach**: Fully standalone Calendar primitive; DatePicker is a separate package that wraps it. Dual disabled date model: `disabled` array for simple cases + `disabledDateFilter` callback for computed cases. Single-month display only (no built-in range selection or multi-month layout). `previouslySelected` prop enables range UI composition.
**Key decisions**:
- Standalone Calendar; Jira, Confluence, Trello all need date grids in contexts without text inputs (issue cards, sprint boards, page properties) — Calendar must be a primitive independent of DatePicker
- Dual disabled model (array + callback); avoids forcing developers to wrap a simple list of holidays in a function, while still handling dynamic availability from APIs — more ergonomic than callback-only or array-only approaches
- `previouslySelected` building block instead of built-in range; keeps Calendar API simple and lets product teams compose range logic appropriate to their specific interaction model
**Notable API**: `disabled` (array); `disabledDateFilter` (callback); `minDate`/`maxDate` (also restricts navigation); `weekStartDay` (0-6, explicit override); `previouslySelected`; `onSelect` (returns `{day, month, year, iso}`)
**A11y**: role="grid" with table semantics; aria-label per day cell with full date string; aria-selected, aria-disabled; navigation buttons labeled; live region on heading.
**Best at**: Ergonomic dual disabled date API and standalone primitive architecture. **Missing**: No built-in range selection or multi-month display — range composition is developer responsibility.

## Ant Design
**Approach**: Explicit Calendar vs. DatePicker separation — Calendar is a persistent data display surface, DatePicker is a form input tool. `fullscreen` prop toggles between full-page and card-scale. `dateCellRender`/`cellRender` for arbitrary React content in cells. Month/year modes. `showWeek` for ISO week numbers. Uses Dayjs.
**Key decisions**:
- Architectural separation; enterprise admin dashboards need both dedicated calendar pages (leave management) and embedded calendar widgets (sidebar next to data table) — conflating them forces API compromises
- `fullscreen` toggle (default true); one component that handles both full-page and card-panel scale eliminates two components or layout hacks for the same enterprise use case
- `dateCellRender` for arbitrary cell content; enterprise users need to display task counts, event names, revenue figures inside cells — a calendar showing only date numbers cannot serve these data-display use cases
**Notable API**: `fullscreen` (boolean); `mode` (month|year); `dateCellRender`/`cellRender`; `headerRender`; `disabledDate` (Dayjs callback); `validRange` ([Dayjs, Dayjs]); `showWeek`; `onSelect` (with `info.source`)
**A11y**: Arrow keys + Page Up/Down navigation; aria-selected, aria-disabled; ARIA live region on heading not explicitly documented — potential SR announcement gap for month navigation.
**Best at**: Rich data-driven calendar displays — cell rendering, fullscreen/card toggle, week numbers, explicit Calendar vs DatePicker separation. **Missing**: No range selection in Calendar (lives in DatePicker's RangePicker); ARIA live region for heading not explicitly spec'd.
