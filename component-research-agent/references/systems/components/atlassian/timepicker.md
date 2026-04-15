---
system: Atlassian Design System
component: Not available natively (Timepicker exists in legacy @atlaskit/datetime-picker)
url: https://atlassian.design/components
last_verified: 2026-03-28
---

# Time Picker (Atlassian)

## Approach
Atlassian's current public design system documentation does not include a standalone Time Picker component. However, a time picker exists in the legacy `@atlaskit/datetime-picker` package — a combined date-and-time picker component that has been in the Atlaskit library since early versions but has not been migrated to the current Atlassian Design System token architecture. This creates a liminal state: the component exists and is used in some Atlassian products, but it is not officially supported in the current system, does not use the current design tokens, and is listed as "maintenance mode only" in Atlaskit's documentation. For product teams building on the current Atlassian Design System (using `@atlaskit/primitives` and the new token system), there is no recommended time picker. The legacy `@atlaskit/datetime-picker` time picker uses a Select-based approach: the time field renders a dropdown populated with 30-minute interval options by default, with support for custom time intervals and free-form text entry. Jira uses this component internally for meeting scheduling and sprint deadline configuration, but new product surfaces are built with custom implementations.

## Key Decisions
1. **Legacy component in maintenance mode** (HIGH) — The existence of `@atlaskit/datetime-picker` without a migration path to the new system means teams face a binary choice: use the legacy component (technically functional but visually inconsistent with current token system) or build a custom implementation. This is a significant design system maturity gap. Atlassian has not provided an official deprecation timeline or migration guide, leaving teams uncertain about long-term support.
2. **Select-based time input in the legacy component** (MEDIUM) — The legacy picker populates a searchable select dropdown with time options (configurable interval, default 30 minutes). Users can also type to filter/search the dropdown options. This approach avoids text field validation issues (no parsing needed) but limits precision to the defined interval unless free-form typing is enabled. This design choice reflects Atlassian's enterprise scheduling context where approximate meeting times (whole or half hours) are more common than precise times.
3. **Combined DateTimePicker vs. standalone** (MEDIUM) — The legacy package combines date and time selection into a single `DateTimePicker` component and a standalone `TimePicker` component. The standalone `TimePicker` uses the same Select-based dropdown pattern without the date field. This architectural separation mirrors Spectrum's approach (standalone TimeField that can compose with DatePicker) but without the segment-based keyboard navigation.

## Notable Props
From `@atlaskit/datetime-picker` TimePicker (legacy):
- `timeIsEditable`: Boolean that enables free-form text entry alongside the dropdown options.
- `times`: Array of time strings to populate the dropdown; defaults to 30-minute intervals.
- `timeFormat`: Moment.js format string for display (e.g., `"h:mm a"` for 12-hour, `"HH:mm"` for 24-hour).
- `onChange`: Callback with ISO time string value.

## A11y Highlights
- **Keyboard**: Because the legacy implementation uses Atlaskit's Select component underneath, it inherits Select keyboard behavior: Type to search/filter, Arrow keys to navigate options, Enter to select, Escape to close.
- **Screen reader**: The Select dropdown announces as a combobox. Options are announced by their time string values. The select pattern (vs. spinbutton pattern) means screen readers hear "2:00 PM option 5 of 48" rather than per-unit segment announcements.
- **ARIA**: `role="combobox"` on the input, `role="listbox"` on the dropdown, `aria-activedescendant` tracks the highlighted option. This is standard Select ARIA, not time-specific ARIA patterns.

## Strengths & Gaps
- **Best at**: Nothing in the current system — the legacy component is functional for the 30-minute interval scheduling use case but is not recommended for new implementations.
- **Missing**: A current-system Time Picker using Atlassian's new design tokens, proper keyboard segment navigation, time zone support, and an official migration path from the legacy package. This is a critical gap for teams building scheduling features on the Atlassian platform.
