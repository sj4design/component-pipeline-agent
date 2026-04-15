---
system: Ant Design
component: Calendar (standalone, full-page or card)
url: https://ant.design/components/calendar/
last_verified: 2026-03-28
---

# Calendar

## Approach

Ant Design has one of the clearest architectural separations between Calendar and DatePicker among all Tier 1 systems. The `Calendar` component is explicitly described as "a container that displays data in calendar form" — it is a full-featured, always-visible calendar panel designed for dedicated display spaces, not for popup date selection. `DatePicker` is a separate component entirely: a compact input that opens a lightweight popup panel when clicked. These two components serve different purposes and have different APIs, and Ant Design is unusually explicit about this distinction in its documentation.

The Calendar component supports two display modes: `fullscreen` (the default — a large calendar that fills its container, suitable for a dedicated calendar page) and card mode (`fullscreen={false}` — a smaller, bordered calendar suitable for embedding in a sidebar or dashboard widget). The fullscreen/card toggle is unique among Tier 1 systems — no other system offers a Calendar that can switch between a full-page view and an embedded panel view with a single prop. This flexibility reflects Ant Design's enterprise fintech and admin dashboard context: teams building Chinese enterprise software frequently need both a dedicated calendar page (for scheduling, event management) and an embedded calendar widget (in a sidebar next to a data table).

The Calendar operates in `month` mode (showing a grid of days) or `year` mode (showing a grid of months for navigation). The `mode` prop controls which view is active, and `onPanelChange` fires when the mode or date changes. Cell rendering is deeply customizable — `dateCellRender` and `monthCellRender` allow arbitrary React content to be rendered inside calendar cells, which is the primary differentiator from other systems. Ant Design teams use this to build event calendars, availability heatmaps, and booking interfaces where cells contain data, not just date numbers.

## Key Decisions

1. **Calendar and DatePicker are architecturally distinct components serving different contexts** (HIGH) — Ant Design chose to build Calendar as a persistent data display surface and DatePicker as a form input tool. Calendar is for pages and panels where date context is always relevant; DatePicker is for forms where a date needs to be input. This is the most semantically clear separation among Tier 1 systems — the component names and documentation explicitly state these are different things. The reason: Ant Design's target users are enterprise developers building admin dashboards and ERP systems where both use cases are common, and conflating them into one component would force awkward API compromises.

2. **`fullscreen` prop toggles between page-scale and card-scale** (HIGH) — The `fullscreen` prop (default: `true`) switches the calendar between a full-container layout and a compact bordered card. No other Tier 1 system offers this toggle. The reason: enterprise dashboards frequently need a small calendar widget in a sidebar (e.g., showing the current month next to a data table) and a full-screen dedicated calendar page (e.g., an employee leave management view). One component that handles both with a single boolean prop eliminates the need for two different components or layout hacks.

3. **`dateCellRender` / `cellRender` for arbitrary cell content** (HIGH) — Calendar cells can render any React content via `dateCellRender` (override cell content) or `dateFullCellRender` (override the entire cell including the date number). This is the feature that makes Ant Design's Calendar uniquely suited for event calendars, booking systems, and heatmaps. The reason: Ant Design's enterprise users need to display business data inside calendar cells — task counts, event names, leave indicators, revenue figures. A calendar that only shows date numbers cannot serve these cases. The `cellRender` approach (updated in v5.4.0) provides a unified API for both date and month cells.

4. **`disabledDate` as a callback `(currentDate: Dayjs) => boolean`** (HIGH) — Disabled dates are determined by a callback function rather than an array. The reason is alignment with Dayjs's API model and the need for computed disablement in enterprise contexts — a leave management system needs to disable weekends, public holidays, and dates already booked by other users, which cannot be pre-computed into a static array efficiently. The callback evaluates lazily as dates are rendered, enabling efficient handling of large disablement logic.

5. **`validRange` restricts the navigable date range** (MEDIUM) — The `validRange` prop accepts a `[Dayjs, Dayjs]` tuple that restricts both the selectable and navigable range. This is distinct from `disabledDate` — `validRange` also prevents the user from navigating to months outside the range, while `disabledDate` only disables individual cells within any navigable month. There was a historical bug where `validRange` and `disabledDate` conflicted; resolved in recent versions. The reason this exists as a separate prop: enterprise contexts frequently have hard date boundaries (fiscal year, project duration) that should constrain the entire navigation experience, not just individual date selection.

6. **`showWeek` for week number display** (MEDIUM) — Added in v5.23.0, the `showWeek` boolean (default: `false`) displays ISO week numbers as a leftmost column in the calendar grid. This is present in Ant Design but absent in most other Tier 1 systems. The reason: Chinese enterprise software and European business contexts frequently work with week numbers for scheduling — "deliver in week 42" is common business language. The explicit prop reflects Ant Design's internationalization depth.

7. **Dayjs as the date object model** (MEDIUM) — All Calendar date values use Dayjs objects. Ant Design migrated from Moment.js to Dayjs in v5, which is lighter (~2KB vs ~70KB). All props that accept dates (`value`, `defaultValue`, `validRange`) and all callback arguments use Dayjs. The reason: Ant Design's large enterprise user base had significant pain from Moment.js bundle size. However, this means all implementing teams must have Dayjs configured correctly with locale plugins for internationalization to work properly — `locale` on the Calendar component reads partially from the Dayjs global locale setting.

## Notable Props

- `fullscreen`: `boolean` (default `true`) — switches between full-page and card display mode.
- `mode`: `'month' | 'year'` — toggles between day-grid and month-grid views.
- `dateCellRender` / `cellRender`: Custom render functions for individual date/month cells — enables event calendars and data overlays.
- `headerRender`: Custom header render function receiving `{value, type, onChange, onTypeChange}` — full control over navigation header.
- `disabledDate`: `(currentDate: Dayjs) => boolean` — callback to disable specific dates.
- `validRange`: `[Dayjs, Dayjs]` — restricts both selectable range and navigation.
- `onSelect`: Fires with `(date: Dayjs, info: {source})` — `info.source` distinguishes user click from panel navigation.
- `onPanelChange`: Fires on month/year navigation with new date and current mode.
- `showWeek`: `boolean` (v5.23.0+) — displays ISO week numbers.
- `locale`: Locale config object — controls display language for month/day names.

## A11y Highlights

- **Keyboard**: Arrow keys navigate between day cells; Page Up/Page Down navigate months; Home/End navigate to week boundaries; Enter/Space select a date. The `mode` switch (between month and year view) is accessible via the clickable month/year header controls.
- **Screen reader**: Disabled dates receive `aria-disabled="true"`. Selected dates receive `aria-selected="true"`. Navigation between months triggers updates to the visible heading, which should be announced — Ant Design's documentation does not explicitly specify an `aria-live` region on the heading, which is a potential gap.
- **ARIA**: The calendar grid uses standard table semantics. Individual date cells are `<td>` elements with `aria-label` attributes. The component does not have as detailed an ARIA specification documented as Spectrum or Atlassian — teams with strict a11y requirements should test with NVDA and JAWS in their specific integration context.

## Strengths & Gaps

- **Best at**: Rich, data-driven calendar displays — `dateCellRender` for embedding business data in cells, `fullscreen` toggle between page and card scale, `showWeek` for ISO week numbers, and the explicit Calendar vs DatePicker separation make Ant Design the most feature-complete calendar component for enterprise dashboard use cases.
- **Missing**: No range selection built into Calendar (range selection lives in DatePicker's RangePicker mode, not in Calendar); ARIA live region behavior for month navigation heading is not explicitly documented, creating a potential screen reader announcement gap.
