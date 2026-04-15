---
system: Polaris (Shopify)
component: DatePicker (IS the calendar grid — inline by default)
url: https://polaris.shopify.com/components/date-picker
last_verified: 2026-03-28
---

# DatePicker (Inline Calendar Grid)

## Approach

Polaris takes a unique architectural position among Tier 1 systems: the `DatePicker` component IS the calendar grid. It renders inline by default — not behind an input trigger, not inside a dialog. When you use `<DatePicker />` in Polaris, you get a visible, always-rendered month grid immediately, with no activation mechanism required. This makes Polaris's DatePicker semantically equivalent to what other systems would call a standalone Calendar component. If you want the popup/trigger behavior (showing the calendar when a user clicks an input field), Polaris's documented pattern is to wrap `DatePicker` inside a `Popover` component yourself. The calendar is the primitive; the popup pattern is composed on top of it.

This inline-first architecture reflects Shopify's e-commerce context. Merchants on Shopify Admin interact heavily with date ranges — setting discount periods, scheduling campaigns, filtering orders by date, reporting on sales windows. Many of these interactions happen in side panels, filter drawers, and dashboard widgets where showing the calendar immediately (without requiring a click to open it) reduces the number of steps to task completion. An always-visible calendar is faster to interact with because the user doesn't need to first discover and activate a hidden picker. Shopify's UX research found that for frequent date-selection tasks, inline calendar grids outperform popup pickers in task completion speed.

Range selection is built directly into the core `DatePicker` component via the `allowRange` prop — it is not a separate component. This is a different approach from Spectrum's separate `RangeCalendar` component. Polaris chose to keep range logic inside a single component because in Shopify's product context, nearly every calendar context where a user selects a single date might eventually need range selection (e.g., a campaign start date becomes a campaign date range). Keeping both capabilities in one component reduces the cognitive overhead of choosing which component to use and makes it easier to toggle between single and range modes.

## Key Decisions

1. **DatePicker renders inline — it IS the calendar, not a wrapper around one** (HIGH) — The fundamental architectural decision: Polaris's `DatePicker` is a calendar grid primitive that renders directly in the layout. There is no separate `Calendar` component name, but functionally this is a standalone calendar. This is the most inline-first calendar implementation among Tier 1 systems. The reason is Shopify's merchant workflow — merchants frequently need to see and interact with calendar grids embedded in filter panels, analytics dashboards, and scheduling forms without the friction of opening a popup.

2. **Range selection is a prop on DatePicker, not a separate component** (HIGH) — `allowRange` toggles range mode on the same component. When active, the first click/tap sets the start date and the second sets the end date, with the range highlighted between them. Polaris chose this because Shopify's product context frequently evolves from single-date to range-date requirements — a discount component that started as single-date (discount start) became a range (discount period) as the product matured. Having range as a prop rather than a separate component meant zero refactoring when that product evolution happened.

3. **`multiMonth` shows two months side by side** (MEDIUM) — Setting `multiMonth={true}` renders two consecutive months simultaneously. This is specifically designed for range selection that crosses a month boundary (the most common range pattern in e-commerce: end-of-month to beginning-of-next). Two months visible means the user can see and select both the start and end of a cross-month range without navigating. Single-month range selection of cross-month ranges requires two navigation actions and cognitive tracking of dates across navigation — two months eliminates that cost.

4. **Month/year state is fully controlled** (MEDIUM) — `month` and `year` are required controlled props; `onMonthChange` is the callback that updates them. There is no internal month/year state management. This is a deliberate choice: in Shopify Admin, calendar navigation frequently needs to be synchronized with other UI elements (e.g., the displayed analytics data updates when the calendar month changes). Making the navigation state controlled rather than internal makes synchronization straightforward and prevents desync bugs.

5. **Disabled dates via before/after boundaries and a specific array** (MEDIUM) — Three props handle disabled dates: `disableDatesBefore`, `disableDatesAfter`, and `disableSpecificDates` (an array). The boundary props handle the common cases (can't book in the past, can't book more than 90 days out) without requiring the developer to construct a full array of disabled dates. The `disableSpecificDates` array handles exceptions like holidays. There is no function callback approach — Polaris opted for simplicity (explicit arrays) over flexibility (callbacks), which works well for Shopify's common patterns but is less powerful for dynamic availability systems.

6. **Requires pairing with a text input for full accessibility** (MEDIUM) — The Polaris docs recommend pairing `DatePicker` with a `TextField` to give users a keyboard entry alternative. This is not automatic — the developer must build the pairing. This choice reflects the inline calendar's visual-first design: it's optimized for clicking, but accessibility requires offering text input as an alternative path. The manual pairing gives developers control over the layout but creates a responsibility gap compared to systems where text input is automatic.

## Notable Props

- `month` / `year`: Required controlled props — no internal state, always developer-managed.
- `onMonthChange`: Callback providing new `{month, year}` — used to update controlled state.
- `allowRange`: Enables range selection mode within the same component instance.
- `multiMonth`: Shows two consecutive months side by side.
- `disableDatesBefore` / `disableDatesAfter`: Date boundary restrictions — disables all dates before or after a threshold.
- `disableSpecificDates`: Array of Date objects for individual date disabling.
- `selected`: The current selection — either a single `Date` or `{start: Date, end: Date}` for ranges.

## A11y Highlights

- **Keyboard**: Tab and Shift+Tab navigate between interactive controls (nav buttons, day cells); arrow keys navigate between day cells within the grid; Enter/Return selects the focused date. Page Up/Down month navigation is not explicitly documented in Polaris but follows the standard calendar grid pattern.
- **Screen reader**: The Polaris docs recommend supplementing the calendar with a text field as an alternative input method specifically for screen reader and keyboard users. The calendar grid itself uses table semantics with day cells navigable by arrow keys.
- **ARIA**: Day cells use `aria-label` with the full date string for screen reader announcement. Selected dates use `aria-pressed` or `aria-selected` state. The component relies on native HTML table/grid semantics for structure.

## Strengths & Gaps

- **Best at**: Inline, always-visible calendar grids for e-commerce and admin contexts — the controlled month/year state model makes it easy to synchronize the calendar with surrounding data, and the inline-first design reduces steps for frequent date selection tasks.
- **Missing**: No function callback for disabled dates (only arrays and boundary dates) limits dynamic availability systems; text input pairing for accessibility is developer responsibility rather than automatic, creating an easy-to-miss a11y gap.
