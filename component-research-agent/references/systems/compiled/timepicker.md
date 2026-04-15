---
component: timepicker
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Time Picker (dial + text input toggle)
**Approach:** M3's Time Picker features an analog clock dial as the primary interaction mode with a text input toggle. The user can switch between dial and keyboard entry via an in-picker UI button. Locale-driven 12/24-hour format (not overridable by developer). Displays as a modal dialog — the clock face requires significant vertical space not suitable for inline embedding.
**Key Decisions:**
- [HIGH] Dial as primary: touch-drag on clock face is ergonomically superior to text entry on mobile; spatial "about 2 o'clock" interaction suits casual time selection
- [HIGH] User-controlled mode toggle: the user picks their preferred entry mode (dial vs. text) within the component — respects individual preference without a developer prop
- [MED] Locale-driven 12/24 format: automatic locale-appropriate formatting; developer cannot override — treating format as a localization concern, not a configuration option
**Notable API:** `value` (HH:MM string); `min`/`max`; `type="dial" | "text"` to override default dial mode
**A11y:** Dialog has `role="dialog"` and `aria-modal`; time fields use `role="spinbutton"` with `aria-value*`; dial face is not screen-reader navigable — text mode is required for full accessibility.
**Best at:** Touch-native dial interaction — the most mobile-optimized time entry method in Tier 1.
**Missing:** Fully accessible dial; no inline/non-modal embedding; no time range support.

---

## spectrum
**Component:** TimeField (segment-based — most accessible)
**Approach:** Spectrum's TimeField uses individual interactive segments — one each for hours, minutes, seconds, AM/PM — each independently keyboard-navigable. Arrow keys cycle values within a segment; Right arrow moves to the next segment. `granularity` controls which segments appear. `timeZone` prop accepts IANA zone identifiers for zone-aware display and parsing. This is the most keyboard-accessible time entry in Tier 1.
**Key Decisions:**
- [HIGH] Segment model: each time unit is a separate `role="spinbutton"` — per-segment validation, automatic advancement, and per-segment screen reader announcements
- [HIGH] `timeZone` prop with IANA format: zone-aware value parsing and display — the only Tier 1 time picker with component-level time zone handling
- [MED] `granularity` prop: `"hour"` | `"minute"` | `"second"` hides unnecessary segments — one component serves both coarse and precise time entry
**Notable API:** `granularity: "hour" | "minute" | "second"`; `timeZone: string` (IANA identifier); `hourCycle: 12 | 24`; `placeholderValue`
**A11y:** Each segment has `role="spinbutton"` with `aria-label`, `aria-valuemin/max/now`; value changes announced via `aria-live`. The most granular screen reader announcement model for time entry in Tier 1.
**Best at:** Keyboard and screen reader accessibility — segment model with per-unit announcements is categorically more accessible than dial or text field approaches.
**Missing:** No dial/visual clock option; less intuitive than column-scroll for users unfamiliar with segment navigation.

---

## carbon
**Component:** Time Picker (text input + AM/PM Select)
**Approach:** Carbon's Time Picker is the most minimal in Tier 1: a text input field for HH:MM plus an optional AM/PM Select dropdown. This composition inherits all of Carbon's form validation, error state, helper text, and label patterns automatically. No format validation — the application validates the time string. Optional `timeZone` display label (visual only, not functional).
**Key Decisions:**
- [HIGH] Composition of standard form primitives: TextInput + Select = Carbon's time picker; all form system features (error, warn, helper text, disabled) are available automatically
- [MED] No built-in format validation: IBM enterprise contexts have varied time format requirements; no single validation scheme fits all; application-level validation is expected
- [MED] Optional AM/PM Select: omitted for 24-hour systems (common in European enterprise/manufacturing/healthcare deployments)
**Notable API:** `placeholder` for format hint (e.g., "hh:mm"); `timeZone` display label; `size: "sm" | "md" | "lg"`; `id` required for label association
**A11y:** Standard native form element semantics — `<label>` + `<input>` + `<select>` with standard a11y. `timeZone` label is visually associated but not programmatically linked to the input.
**Best at:** Form system integration — inherits Carbon's full validation and error patterns because it is composed from standard primitives.
**Missing:** Format validation, time zone calculation, range time picker, segment navigation, and any dial option.

---

## polaris
**Component:** Absent — acknowledged gap on roadmap
**Approach:** Polaris has no Time Picker component. Shopify Admin historically handled time selection through preset Select dropdowns (common times on 30-minute intervals) or TextField with placeholder format hints. A dedicated Time Picker is listed on the Polaris public GitHub roadmap. The community workaround (TextField + Select) mirrors Carbon's composition but without any documented accessibility patterns.
**Key Decisions:**
- [HIGH] Absent: genuine gap; scheduling in Shopify Admin relied on preset dropdowns; free-form time entry was not a prioritized merchant workflow
- [MED] Pre-set Select as workaround: Select populated with 30-minute intervals (48 options per day) eliminates free-form entry errors but is impractical for precise time
- [MED] Native `<input type="time">` alternative: browser native picker provides inconsistent UI across Chrome/Safari/Firefox — functional but inconsistent
**Notable API:** No component. `TextField` with `placeholder="HH:MM"` + `Select` for AM/PM as the community-standard workaround.
**A11y:** No prescribed ARIA pattern. TextField + Select workaround uses native form semantics. Time zone context is not communicated programmatically in any workaround.
**Best at:** Nothing — acknowledged gap; roadmap item.
**Missing:** A formal Time Picker with validation, AM/PM handling, keyboard segment navigation, time zone support, and documented accessibility patterns.

---

## atlassian
**Component:** Legacy @atlaskit/datetime-picker (maintenance mode)
**Approach:** Atlassian's current design system has no official Time Picker. A legacy `@atlaskit/datetime-picker` TimePicker exists in maintenance mode — functional but not migrated to current ADS tokens. It uses a Select-based approach: a searchable dropdown populated with 30-minute interval options (configurable). `timeIsEditable` enables free-form text entry. The component uses Moment.js for formatting.
**Key Decisions:**
- [HIGH] Legacy maintenance mode: no migration path to current ADS token system; new product surfaces build custom; legacy component still used in some Jira/Confluence scheduling features
- [MED] Select-based approach (30-minute intervals): avoids text validation entirely; dropdown lists standard scheduling times; `timeIsEditable` enables free-form entry for non-standard times
- [MED] `timeFormat` via Moment.js strings: configures 12/24-hour display; Moment.js dependency is a legacy concern
**Notable API:** `timeIsEditable: boolean`; `times: string[]`; `timeFormat: string` (Moment.js); `onChange: (isoTime: string) => void`
**A11y:** Inherits Select ARIA: `role="combobox"` on input, `role="listbox"` on dropdown. Options announced as time strings with position. No time-specific `role="spinbutton"` semantics.
**Best at:** Nothing in the current system — legacy component for 30-minute interval scheduling use cases only.
**Missing:** Current-system Time Picker using ADS tokens; keyboard segment navigation; time zone support; official migration path from the legacy component.

---

## ant-design
**Component:** TimePicker (column-scroll + RangePicker — most feature-rich)
**Approach:** Ant Design's TimePicker uses a column-scroll (drum picker) paradigm — three scrollable columns for hours, minutes, and seconds. The `format` prop controls which columns appear. `TimePicker.RangePicker` provides start-and-end time selection in one interaction surface — unique in Tier 1. `disabledTime` callback with granular hour/minute/second restriction. `hourStep`/`minuteStep`/`secondStep` skip non-divisible values for appointment booking intervals.
**Key Decisions:**
- [HIGH] Column-scroll interaction model: scrollable drums optimized for browsing approximate times — fastest for "pick a meeting time" workflows; less efficient for "enter 14:37:22"
- [HIGH] Built-in `TimePicker.RangePicker`: start+end time selection in one component — no other Tier 1 system has this; designed for shift scheduling and service window selection
- [MED] `disabledTime` callback with granular control: `{disabledHours, disabledMinutes, disabledSeconds}` — enables complex business rules (no lunch hour slots, available hours only)
**Notable API:** `format: string`; `disabledTime: () => {disabledHours, disabledMinutes, disabledSeconds}`; `use12Hours: boolean`; `showNow: boolean`; `hourStep`/`minuteStep`/`secondStep`
**A11y:** Each column is `role="listbox"`; options are `role="option"`; `role="combobox"` on trigger; Arrow keys navigate within columns; column structure less familiar to AT users than spinbutton patterns.
**Best at:** Range time selection and granular `disabledTime` callback — unique capabilities for scheduling applications requiring time range input.
**Missing:** Time zone support (Day.js locale only, no IANA zone-aware parsing); column-scroll has lower keyboard efficiency than Spectrum's segment approach for precise entry.
