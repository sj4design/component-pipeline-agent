---
system: Atlassian Design System
component: Calendar (standalone)
url: https://atlassian.design/components/calendar/examples
last_verified: 2026-03-28
---

# Calendar

## Approach

Atlassian's Calendar (`@atlaskit/calendar`) is a fully standalone component — an interactive calendar grid for date selection that exists independently of any DatePicker. The DatePicker component in Atlassian's system (`@atlaskit/datetime-picker`) is a separate package that wraps Calendar with a text input and popover trigger. This separation is architecturally deliberate: Atlassian builds collaboration products (Jira, Confluence, Trello) where date selection surfaces appear in a wide variety of contexts — inline on Jira issue cards, in Confluence page properties, in Trello card due date editors, in Jira's sprint planning boards — and not all of these need a text field. The standalone Calendar gives product teams a primitive they can embed in any context.

The Calendar renders a standard single-month grid showing days of the month with month and year navigation controls. It is a controlled component in the sense that selected dates are passed as props, but it manages its own internal display state (visible month/year) via `defaultMonth` and `defaultYear` uncontrolled props, or through controlled `month`/`year` if the developer needs to synchronize navigation with external state. Atlassian does not provide a separate RangeCalendar component — range selection is not a built-in capability of the Calendar primitive. Teams needing range selection in Atlassian's system must build it themselves on top of the Calendar's `onSelect` and `previouslySelected` props, or use a third-party solution.

The component has a notably clean, minimal API philosophy consistent with Atlassian's broader design system approach: sensible defaults for common cases, with escape hatches (`disabledDateFilter` as a callback) for complex requirements. The `disabled` prop accepts an array for simple use cases, while `disabledDateFilter` accepts a function for dynamic evaluation — both coexist.

## Key Decisions

1. **Calendar is standalone — DatePicker composes it separately** (HIGH) — Atlassian chose to expose Calendar as a primitive for the same reason Spectrum did: product teams within Jira, Confluence, and Trello needed to embed date-selection grids in contexts without a text input. A standalone Calendar primitive means those product teams pull in `@atlaskit/calendar` and use it directly without importing the full DatePicker stack. The DatePicker package depends on Calendar but not vice versa — this is the correct dependency direction for a composable system.

2. **Dual disabled date model: array + callback** (HIGH) — The `disabled` prop accepts an array of specific date strings for straightforward cases (known holiday list, specific blocked dates). The `disabledDateFilter` prop accepts a function `(date: string) => boolean` for computed disablement (weekends only, dates before today, dynamic availability from API). Providing both avoids forcing developers to wrap a simple array in a function, while still handling complex cases. This dual model is more ergonomic than Spectrum's callback-only approach for simple cases, and more powerful than Polaris's array-only approach for dynamic cases.

3. **`weekStartDay` for locale customization** (MEDIUM) — The `weekStartDay` prop accepts 0 (Sunday, default) through 6 (Saturday) to control which day of the week the calendar starts with. This is an explicit, direct prop rather than a derived-from-locale approach. The reason Atlassian chose an explicit number rather than a locale string is that enterprise teams frequently need to override locale defaults — a global Jira instance might have a US locale but need Monday as the first day for European project teams. Direct control avoids locale system complexity for what is ultimately a simple integer setting.

4. **`previouslySelected` for visual range hint** (MEDIUM) — Calendar accepts a `previouslySelected` array of dates in addition to `selected`. Previously selected dates render with a distinct visual treatment (neither fully selected nor unselected) — this is used to implement range selection by showing the prior selected period while the user is choosing a new one. Rather than building range selection into the component, Atlassian provides this building block and leaves range composition to the implementing team. This keeps the Calendar API simple while enabling range UIs to be built on top.

5. **`minDate` / `maxDate` disable all dates outside boundary** (MEDIUM) — Setting `minDate` and `maxDate` disables all dates before or after the specified boundary respectively. Importantly, navigation is also restricted — the user cannot navigate to months entirely outside the allowed range. This is a UX correctness decision: if a user cannot select any date in March 2022, showing them March 2022 in the navigation is confusing and misleading. Restricting navigation to the valid range prevents this.

6. **Single month display only — no multi-month layout** (LOW) — Atlassian's Calendar renders one month at a time. There is no `visibleMonths` prop or multi-month layout. This was likely chosen because Atlassian's primary use cases (Jira due dates, Trello card dates, Confluence page dates) are single-date selections where a compact single-month view is appropriate. The trade-off is that teams needing a range picker with simultaneous two-month display must build that layout themselves by rendering two Calendar instances.

## Notable Props

- `disabled`: Array of date strings — straightforward disablement of known dates.
- `disabledDateFilter`: Callback `(date: string) => boolean` — computed disablement for dynamic cases.
- `minDate` / `maxDate`: Boundary dates; also restricts month navigation to valid range.
- `weekStartDay`: `0–6` — explicit first day of week, independent of locale.
- `previouslySelected`: Array of dates rendered with "previously selected" visual treatment, enabling range UI composition.
- `defaultDay` / `defaultMonth` / `defaultYear`: Uncontrolled props for initial display state.
- `onSelect`: Callback receiving `{day, month, year, iso}` — provides both parts and the ISO string simultaneously.
- `locale`: BCP 47 locale string for month/day name localization.

## A11y Highlights

- **Keyboard**: Arrow keys navigate between day cells; Tab/Shift+Tab move focus between the navigation controls (previous/next month buttons) and the calendar grid. Standard grid navigation applies within the month view. The Atlassian developer community has documented instances of keyboard navigation degrading in certain Jira implementations, suggesting the underlying calendar component has solid a11y but integration-level issues can occur.
- **Screen reader**: The calendar grid uses table semantics. Day cells include `aria-label` with the full date for screen reader announcement. Navigation buttons are labeled with "previous month" and "next month" text (accessible). Month/year heading updates are announced via a live region.
- **ARIA**: The calendar grid uses `role="grid"` with the months displayed in table rows. Selected dates use `aria-selected="true"`. Disabled dates use `aria-disabled="true"`. The `aria-label` on each day cell includes the day number and full date string for unambiguous screen reader announcement.

## Strengths & Gaps

- **Best at**: Flexible, composable standalone calendar primitive with a clean dual-model for disabled dates — the `disabled` array + `disabledDateFilter` callback pairing is the most ergonomic disabled date API among Tier 1 systems.
- **Missing**: No built-in range selection or multi-month display — teams building range date pickers on Atlassian's Calendar must compose the range logic themselves, which is a meaningful engineering investment compared to Spectrum's `RangeCalendar` or Polaris's `allowRange` prop.
