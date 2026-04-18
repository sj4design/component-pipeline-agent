---
component: timepicker
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# TimePicker — Research Synthesis (--max)

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| Polaris (Shopify) | Acknowledged gap on public roadmap; scheduling used preset Select dropdowns | `TextField` with `placeholder="HH:MM"` + `Select` for AM/PM |
| Atlassian | Legacy `@atlaskit/datetime-picker` in maintenance mode; no current-ADS component | Legacy package still functional; Moment.js dependency is tech debt |
| GitHub Primer | Not present; native `<input type="time">` considered sufficient | `CdrInput type="time"` |
| shadcn/ui | No dedicated component; native or community patterns | `<Input type="time">` or third-party |
| Playbook (eBay) | Not present | Not documented |
| REI Cedar | Not present; use `CdrInput type="time"` | `CdrInput type="time"` |
| Wise Design | Time not a common Wise use case | No pattern |
| Dell Design System | Not present in public docs | Unknown |
| Radix UI | No primitive; `<input type="time">` recommended | Native input |
| Chakra UI | `<Input type="time">` with Chakra styling; no roadmap item | Native input |
| Gestalt (Pinterest) | Time input not required for most product scope | Internal custom implementation |
| Orbit (Kiwi.com) | Range slider for departure windows; exact time uses native input | Range slider or `<input type="time">` |
| Evergreen (Segment) | Day-granularity analytics model; no time-of-day use case | DatePicker only |
| Nord (Nordhealth) | 24-hour native input required; AM/PM ambiguity documented as medical error source | `<nord-input type="time">` with format hint |

---

## How Systems Solve It

### Material Design 3 (Tier 1)

MD3's Time Picker leads with an analog clock dial as the primary interaction mode, with an in-picker button to toggle to text entry. The dial interaction is touch-optimized—dragging spatially to "about 2 o'clock" is faster than typing on mobile. Locale-driven 12/24-hour format is not overridable by developers; the system treats format as a localization concern. The picker displays as a modal dialog, requiring significant vertical space—not suitable for inline embedding.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Dial as primary interaction mode | Touch-drag on clock face is ergonomically superior to text entry on mobile; spatial "about 2 o'clock" interaction suits casual time selection | H | Use dial when your primary platform is mobile and time precision is coarse (scheduling, not clinical) |
| User-controlled mode toggle (dial ↔ text) | Individual users prefer different entry modes; respects preference without a developer prop | M | Let users switch rather than forcing one modality |
| Locale-driven 12/24h format | Format is a localization concern, not configuration; prevents developer-introduced locale mismatch | M | Accept no override; rely on locale detection |
| Modal dialog only | Clock face interaction requires dedicated screen real estate; inline dial is not viable | H | If your use case needs inline time entry, dial is not the right archetype |

**Notable Props:** `value` (HH:MM string) · `min` / `max` · `type="dial" | "text"` to override default dial

**Accessibility:** `role="dialog"` + `aria-modal` on the modal; time fields use `role="spinbutton"` with `aria-value*`; dial face is NOT screen-reader navigable — text mode is required for full a11y.

---

### Spectrum / React Aria (Tier 1)

Spectrum's TimeField uses a segment-based model: each time unit (hours, minutes, seconds, AM/PM) is a separate, independently keyboard-navigable spinbutton. Arrow keys cycle values within a segment; Tab/Right arrow advances to the next segment. This is categorically the most keyboard-accessible time entry in Tier 1. The `timeZone` prop accepts IANA identifiers for zone-aware parsing and display—the only Tier 1 component with component-level timezone handling. `granularity` controls which segments appear, allowing the same component to serve both coarse (hour-only) and precise (second-level) entry.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Segment model (per-unit spinbutton) | Each time unit is a separate `role="spinbutton"` — per-segment validation, automatic advancement, per-segment SR announcements | H | Use this archetype when keyboard accessibility is the primary requirement |
| `timeZone` IANA prop | Zone-aware value parsing and display; the only Tier 1 component that handles timezone at the component level | H | Use if your application has multi-timezone users (global scheduling, calendar) |
| `granularity: "hour" | "minute" | "second"` | One component serves both HH:MM and HH:MM:SS entry without separate components | M | Default `"minute"` for most use cases; `"second"` for logs/measurements |
| `hourCycle: 12 | 24` | Developer-overridable (unlike MD3); enables explicit format regardless of locale | M | Use `hourCycle: 24` for healthcare and enterprise; `12` for consumer scheduling |
| No dial/visual clock | Segment model is purely keyboard-driven; dial interaction is outside React Aria's accessibility-first philosophy | M | Add a companion visual clock only if brand/UX demands it; do not require it for a11y |

**Notable Props:** `granularity: "hour" | "minute" | "second"` · `timeZone: string` (IANA) · `hourCycle: 12 | 24` · `placeholderValue` · `minValue` / `maxValue`

**Accessibility:** Best in class. Each segment: `role="spinbutton"` with `aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`. Value changes announced via `aria-live`. Group label ties segments together.

---

### Carbon / IBM (Tier 1)

Carbon's Time Picker is minimal by design: a `TextInput` for HH:MM plus an optional AM/PM `Select` dropdown. This composition inherits all of Carbon's form validation, error state, helper text, and label patterns automatically—no custom ARIA wiring needed. No built-in format validation; applications validate the time string. This is the fastest to implement and deepest to integrate with an existing Carbon form system.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Composition of standard form primitives | `TextInput` + `Select` inherits all form system features automatically; no custom component needed | H | Best choice when using Carbon's existing form infrastructure |
| No built-in format validation | Enterprise contexts have varied format requirements; validation is application-specific | M | Implement your own validation; document the expected format clearly with `placeholder` |
| Optional AM/PM Select | 24-hour European/enterprise deployments omit AM/PM; composition allows either | M | Omit AM/PM select for 24-hour contexts; include for 12-hour consumer products |
| `size: "sm" | "md" | "lg"` | Matches Carbon's global density scale | L | Use `md` as default |

**Notable Props:** `placeholder` for format hint · `timeZone` display label (visual only) · `size: "sm" | "md" | "lg"` · `id` required for label association

**Accessibility:** Standard native form semantics — `<label>` + `<input>` + `<select>`. `timeZone` display label is visually associated but not programmatically linked to the input.

---

### Ant Design (Tier 1)

Ant Design's TimePicker uses a column-scroll (drum/wheel) paradigm—three scrollable columns for hours, minutes, and seconds. The column interaction is optimized for browsing approximate times rather than precise entry. `TimePicker.RangePicker` is unique in Tier 1: start+end time selection in a single interaction surface, designed for shift scheduling and service window selection. `disabledTime` callback enables complex business rules (no lunch hour, specific intervals only). `hourStep`/`minuteStep`/`secondStep` skip non-valid values for appointment booking intervals.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Column-scroll (drum picker) interaction | Scrollable columns optimized for "pick a meeting time" workflows; faster for browsing approximate times than typing | H | Use for scheduling contexts where users browse available slots; avoid for precise data entry |
| `TimePicker.RangePicker` (start + end time) | No other Tier 1 system has this; designed for shift scheduling, service window, or booking range selection | H | Use when your UX requires simultaneous start and end time selection |
| `disabledTime` callback with granular control | Enables complex business rules (available hours only, blackout periods) without application-level filtering | H | Use for appointment booking with restricted availability |
| `hourStep` / `minuteStep` / `secondStep` | Skips non-divisible values; prevents selection of 7:13 when only 15-minute intervals are valid | M | Set `minuteStep={30}` for scheduling; `minuteStep={15}` for appointment booking |
| `showNow` button | Convenience shortcut to select current time | L | Disable in contexts where current-time selection is rarely useful |

**Notable Props:** `format: string` · `use12Hours: boolean` · `showNow: boolean` · `disabledTime: () => { disabledHours, disabledMinutes, disabledSeconds }` · `hourStep` / `minuteStep` / `secondStep` · `TimePicker.RangePicker`

**Accessibility:** Each column is `role="listbox"`; options are `role="option"`; `role="combobox"` on trigger. Arrow keys navigate within columns. Column structure less familiar to AT users than spinbutton patterns; keyboard efficiency lower than Spectrum's segment approach for precise entry.

---

### Salesforce Lightning (Tier 2)

Lightning's Timepicker uses a custom combobox dropdown with configurable time intervals—important for scheduling in CRM contexts where specific time slots (30-minute intervals) are required, not freeform time entry. The dropdown lists pre-generated time options; a search/filter input allows quick navigation to a specific time.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Combobox dropdown with configurable intervals | Scheduling in CRM requires specific valid slots (9:00, 9:30, etc.); prevents invalid time selection | H | Use for scheduling contexts with defined intervals |
| Search/filter within dropdown | 48 options per day at 30-min intervals; search prevents scrolling through all options | M | Essential for interval-based pickers |

**Notable Props:** `step` (interval in minutes) · `format` · `readonly` · `required`

**Accessibility:** `role="combobox"` on input; `role="listbox"` on dropdown; `role="option"` for time slots.

---

### Base Web / Uber (Tier 3)

Base Web's TimePicker builds on their Select component: a dropdown of pre-generated time slots at configurable `step` intervals (default 1800s = 30 minutes). The `creatable` mode enables free-form typing of times not in the generated list. Searchable by default. A `DatetimePicker` compound component combines date + time selection. Base Web's override model allows deep visual customization.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Built on Select (inherits all Select features) | Searchability, keyboard navigation, ARIA combobox semantics, and theming are free; no custom widget | H | Best when visual consistency with other dropdowns is essential |
| `step` in seconds (default 1800) | Generates time slots at configurable intervals; same as Lightning but API in seconds | M | Set `step={900}` for 15-minute intervals; `step={3600}` for hour-only |
| `creatable` for free-form entry | Users can type non-listed times; addresses the precision limitation of discrete-slot pickers | M | Enable `creatable` whenever users may need to enter non-slot times |

**Notable Props:** `step: number` (seconds) · `creatable: boolean` · `format: "12" | "24"` · `nullable: boolean`

**Accessibility:** Full combobox ARIA inherited from Select: `role="combobox"`, `role="listbox"`, `role="option"`, `aria-activedescendant`.

---

### Fluent 2 / Microsoft (Tier 3)

Fluent 2's TimePicker is a combobox-style dropdown with freeform typing. `increment` (in minutes) controls slot generation. `hourCycle` accepts `h11`/`h12`/`h23`/`h24` for full locale coverage. Built on Fluent's Combobox component for complete accessibility inheritance. `startHour`/`endHour` limit the selectable range (e.g., business hours only). Designed for Microsoft 365 scheduling contexts.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Built on Combobox (full accessibility inheritance) | Combobox pattern is the most accessible dropdown model; aria-activedescendant, type-ahead, etc. | H | Strongest a11y foundation for a dropdown-based time picker |
| `hourCycle: "h11" | "h12" | "h23" | "h24"` | Covers all locale-specific hour cycle variants beyond simple 12/24 toggle | M | Use `h23` for 24-hour (0–23); `h12` for 12-hour with 12:00 noon/midnight |
| `startHour` / `endHour` | Business hours only (e.g., 8–18); no need to generate/filter outside range | M | Use for any context where time selection is bounded (office hours, shift scheduling) |
| Freeform typing enabled by default | Unlike Base Web's opt-in `creatable`, Fluent's combobox natively supports typing; no mode switch | H | Users can always type a precise time; slots are convenience, not constraint |

**Notable Props:** `increment: number` (minutes) · `hourCycle: "h11" | "h12" | "h23" | "h24"` · `startHour: number` · `endHour: number` · `freeform: boolean`

**Accessibility:** Full Combobox ARIA: `role="combobox"`, `role="listbox"`, `role="option"`, `aria-expanded`, `aria-activedescendant`.

---

### Mantine (Tier 3)

Mantine provides two explicit tiers: `TimeInput` wraps `<input type="time">` for form-style keyboard entry; `TimePicker` provides a scroll-wheel visual column picker. This two-tier split is the only system that officially names and separates the two interaction models. `withSeconds` enables sub-minute precision. Day.js dependency.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Two-tier: `TimeInput` (native) vs. `TimePicker` (visual) | Makes the choice between interaction models explicit in API; reduces confusion | H | Use `TimeInput` for form data entry; `TimePicker` for scheduling/browsing contexts |
| `withSeconds` for sub-minute precision | Enables log timestamps, measurements, and clinical time entry | M | Enable only when seconds-level precision is needed |
| Day.js dependency | Consistent date/time parsing across Mantine's date components | M | Accept if already using Mantine dates; adds bundle weight otherwise |

**Notable Props:** `TimeInput` · `TimePicker` · `withSeconds: boolean` · `format: "12" | "24"` · `minTime` / `maxTime`

**Accessibility:** `TimeInput` uses native input semantics. `TimePicker` columns use `role="listbox"`.

---

### GOV.UK (Tier 3)

GOV.UK uses separate text inputs for hours and minutes—no custom widget. Each field has `inputmode="numeric"`. Format guidance is delivered via hint text. No JavaScript required. The choice between 12h and 24h is driven by user mental model research (GOV.UK research shows UK users find 24-hour time less familiar for everyday scheduling, but more precise for official records).

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Separate hour/minute text inputs | No JS required; works with all AT without ARIA custom patterns; fieldset + legend provides group label | H | Use for government/public services contexts where robustness > polish |
| Hint text for format guidance | Users need to know expected format; error correction is more expensive than prevention | M | Always include format hint ("Enter the time in 24-hour format, for example 09:30") |
| 12h vs. 24h driven by user research | Different users have different mental models; research determines the appropriate format | H | Conduct user research rather than assuming one format fits all |

**Accessibility:** Fieldset + legend wraps the group; each input has its own distinct label; `inputmode="numeric"` for mobile keyboards.

---

### Nord (Nordhealth — Tier 3)

Nord's position is the strongest against custom time pickers: AM/PM ambiguity is documented as a medical error source. Medication orders specified as "8:00 AM" entered as "8:00 PM" in a 12-hour picker cause timing errors with clinical consequences. 24-hour format with native `<input type="time">` eliminates this category of error entirely. Scroll-wheel pickers are explicitly called out as risky on clinical tablets used by gloved staff.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| 24-hour native input only | AM/PM ambiguity is a documented medical error source; 24h eliminates this | H | Mandate 24-hour format in any safety-critical context |
| No scroll-wheel or clock-face picker | Gloved clinical tablets have unreliable touch precision; scroll-wheel pickers generate errors | H | Avoid visual pickers in high-precision, safety-critical, or industrial contexts |
| ISO 8601 native input format | API compatibility; `<input type="time">` submits in HH:MM format natively | M | Native input handles format submission correctly without formatting libraries |

**Accessibility:** `<nord-input type="time">` with explicit hint text; native input semantics; format clarity reduces input errors for all users.

---

## Pipeline Hints

### Archetype Recommendation

**Primary archetype: Dropdown/Combobox with configurable intervals** (Fluent 2 / Base Web / Ant Design pattern)

Rationale: This archetype provides the best balance of accessibility (inherits combobox ARIA semantics), visual consistency (looks like other Select inputs), and scheduling usability (pre-generated slots with interval control). It allows freeform typing for non-slot times. The segment model (Spectrum) is the superior choice for contexts with strict keyboard/AT requirements; the dial (MD3) is the superior choice for mobile-touch-primary apps; the native `<input type="time">` is the superior choice for clinical/safety contexts.

**Secondary archetype: Native `<input type="time">` wrapper** for contexts where safety, robustness, or minimalism trumps custom UX.

---

### Slot Consensus Table

| Slot | Consensus | Notes |
|------|-----------|-------|
| `input` / `trigger` | 8/10 systems | The text input or button that opens the picker |
| `dropdown` / `listbox` | 6/10 systems | The panel containing time options |
| `option` / `time-slot` | 6/10 systems | Individual selectable time (rendered in listbox) |
| `label` | 10/10 systems | Form field label (above input) |
| `helperText` | 5/10 systems | Format hint or contextual guidance |
| `errorMessage` | 7/10 systems | Validation error (format, range, required) |
| `hour-segment` | 2/10 systems | Spectrum segment model only |
| `minute-segment` | 2/10 systems | Spectrum segment model only |
| `second-segment` | 1/10 systems | Spectrum, when `granularity="second"` |
| `ampm-segment` | 2/10 systems | Spectrum + Carbon AM/PM Select |
| `dial-face` | 1/10 systems | MD3 only |
| `clearButton` | 4/10 systems | Ant Design, Fluent 2, Base Web |
| `nowButton` | 2/10 systems | Ant Design `showNow`; convenience shortcut |

---

### Property Consensus Table

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| `value` | `string` (HH:MM or HH:MM:SS) | 10/10 | Controlled value; ISO 8601 time format |
| `defaultValue` | `string` | 8/10 | Uncontrolled default |
| `onChange` | `(value: string) => void` | 10/10 | Value change callback |
| `format` | `"HH:mm"` \| `"hh:mm a"` \| `string` | 7/10 | Display format (not value format) |
| `use12Hours` / `hourCycle` | `boolean` \| `"h11" \| "h12" \| "h23" \| "h24"` | 7/10 | 12/24-hour display control |
| `granularity` | `"hour" \| "minute" \| "second"` | 2/10 | Spectrum; controls which segments appear |
| `step` / `increment` | `number` | 5/10 | Interval in seconds (Base Web) or minutes (Fluent 2) |
| `minuteStep` | `number` | 3/10 | Ant Design; minutes column step |
| `hourStep` | `number` | 2/10 | Ant Design; hours column step |
| `secondStep` | `number` | 1/10 | Ant Design only |
| `disabledTime` | `() => { disabledHours, disabledMinutes, disabledSeconds }` | 1/10 | Ant Design; granular disable callback |
| `minTime` / `min` | `string` | 6/10 | Minimum allowed time |
| `maxTime` / `max` | `string` | 6/10 | Maximum allowed time |
| `startHour` | `number` | 1/10 | Fluent 2; range start |
| `endHour` | `number` | 1/10 | Fluent 2; range end |
| `timeZone` | `string` (IANA) | 2/10 | Spectrum; zone-aware value handling |
| `placeholder` | `string` | 8/10 | Format hint for text inputs |
| `disabled` | `boolean` | 10/10 | |
| `readonly` | `boolean` | 7/10 | |
| `required` | `boolean` | 8/10 | |
| `clearable` | `boolean` | 5/10 | Allow clearing value to null/undefined |
| `showNow` | `boolean` | 2/10 | Ant Design; "Now" shortcut button |
| `open` / `isOpen` | `boolean` | 6/10 | Controlled open state for dropdown |
| `size` | `"sm" \| "md" \| "lg"` | 5/10 | |

---

### Boolean Properties Table

| Property | Default | Systems |
|----------|---------|---------|
| `use12Hours` | `false` (varies by locale) | Ant Design |
| `showNow` | `true` | Ant Design |
| `disabled` | `false` | All |
| `readonly` | `false` | Most |
| `required` | `false` | Most |
| `clearable` / `allowClear` | `false` | Ant Design, Fluent 2, Base Web |
| `withSeconds` | `false` | Mantine |
| `creatable` | `false` | Base Web |
| `freeform` | varies | Fluent 2 |
| `timeIsEditable` | `false` | Atlassian (legacy) |
| `nullable` | `false` | Base Web |

---

### State Coverage Table

| State | Systems | Notes |
|-------|---------|-------|
| `default` | All | Normal resting state |
| `focused` | All | Input/trigger has focus |
| `open` | Dropdown-based | Listbox/panel is open |
| `disabled` | All | |
| `readonly` | 7/10 | Value visible, not editable |
| `invalid` / `error` | 8/10 | Validation failure (format, range, required) |
| `loading` | 2/10 | Async time slot loading (Fluent 2, Base Web with async) |
| `hover` | All | |
| `selected` (option) | Dropdown-based | Currently selected time slot highlighted |
| `active` (segment) | Segment-based | Spectrum; currently active spinbutton segment |

---

### Exclusion Patterns

- **Do not use TimePicker for date-time combined entry.** Use DateTimePicker (a separate composition of DatePicker + TimePicker). Ant Design's `DateTimePicker` and Base Web's `DatetimePicker` are the reference.
- **Do not use custom TimePicker in clinical/safety-critical contexts.** Use `<input type="time">` in 24-hour mode. AM/PM ambiguity is a documented medical error source (Nord).
- **Do not use dial (clock-face) picker as the only interaction mode.** The dial is not screen-reader navigable in any current implementation. Always provide a keyboard text-entry alternative.
- **Do not use interval-based dropdowns for precise sub-minute entry.** If users need to enter "14:37:22", a fixed-interval dropdown (30-minute slots) forces them to type, defeating the UI. Use segment model or native input instead.

---

### Building Block Candidates

- `TimeInput` — native `<input type="time">` with design system styling (Mantine naming)
- `TimeSegment` — per-unit spinbutton (Spectrum/React Aria pattern)
- `TimeColumn` — scrollable column for hours/minutes/seconds (Ant Design/Base Web pattern)
- `TimeTrigger` — the button/input that opens the picker dropdown
- `TimeDropdown` — the panel containing the time options listbox

---

### Enum / Configuration Properties

| Property | Values |
|----------|--------|
| `hourCycle` | `"h11"` \| `"h12"` \| `"h23"` \| `"h24"` |
| `granularity` | `"hour"` \| `"minute"` \| `"second"` |
| `size` | `"sm"` \| `"md"` \| `"lg"` |
| `variant` / `appearance` | `"outline"` \| `"filled"` \| `"flushed"` (design system dependent) |
| `interactionModel` | `"dropdown"` \| `"segment"` \| `"native"` \| `"dial"` |

---

### A11y Consensus

| Attribute | Value | Rationale |
|-----------|-------|-----------|
| Dropdown-based trigger | `role="combobox"` + `aria-expanded` + `aria-haspopup="listbox"` | Standard combobox pattern |
| Dropdown panel | `role="listbox"` + `aria-label="Select time"` | Time slot container |
| Time slot option | `role="option"` + `aria-selected` + `aria-disabled` | Standard listbox option |
| Segment model (Spectrum) | Per-segment `role="spinbutton"` + `aria-label="Hour"` + `aria-valuemin/max/now` | Most accessible time entry |
| Column picker (Ant Design) | Per-column `role="listbox"` + Arrow key navigation | Less familiar to AT users |
| Label association | `htmlFor` + `id` on input; all inputs labeled | Required for all form elements |
| Error message | `aria-describedby` linking input to error element | Programmatic error association |
| Format hint | `aria-describedby` to hint text, or `placeholder` | Format ambiguity is an error source |
| Dial face (MD3) | NOT accessible; text mode must be available | Dial requires spatial interaction not achievable with AT |
| APG pattern | Combobox pattern (listbox popup) | WAI-ARIA Authoring Practices Guide Combobox |

---

## What Everyone Agrees On

1. **AM/PM format creates ambiguity errors.** GOV.UK, Nord, and Spectrum all document the 12-hour format as a source of user errors (especially in clinical, official, or high-stakes contexts). The 24-hour format eliminates this class of error. Provide explicit format guidance when 12-hour format is used.
2. **Label and format hint are mandatory.** A time input without a descriptive label (not just "Time") and a format hint creates systematic entry errors. Every system either enforces a label or documents it as required.
3. **Interval steps are needed for scheduling contexts.** Meeting scheduling, appointment booking, and shift management all require discrete interval constraints. Every scheduling-oriented system (Ant Design, Base Web, Fluent 2, Lightning, Atlassian legacy) implements interval control.
4. **Freeform entry must be available alongside preset slots.** Users occasionally need to enter non-interval times. Base Web's `creatable`, Fluent 2's freeform mode, and Atlassian's `timeIsEditable` all serve this need.
5. **Min/max time range is consistently needed.** Booking availability windows, business hours, and shift constraints all require `minTime`/`maxTime` range restriction. All dropdown-based systems provide this.
6. **`value` is always a string in HH:MM format.** No system uses a Date object for time-only values (as opposed to datetime pickers). The time component's value is always a plain string.

---

## Where They Disagree

### 1. Primary interaction model: dropdown vs. segment vs. dial vs. native
- **Option A — Dropdown/Combobox (Ant Design, Base Web, Fluent 2, Lightning):** Pre-generated slots in a scrollable dropdown with optional free-form typing.
  - Upside: Visual consistency with Select; good for scheduling workflows with defined intervals
  - Downside: Limited to slot granularity without `creatable`; column scroll (Ant) is less accessible than combobox (Fluent/Base Web)
  - Para tu caso: Best for scheduling UIs

- **Option B — Segment model (Spectrum/React Aria):** Each time unit is a separate keyboard-navigable spinbutton.
  - Upside: Most keyboard and AT accessible; precise entry without formatting knowledge
  - Downside: Less visually familiar; users unfamiliar with segment navigation need onboarding
  - Para tu caso: Best for accessibility-first, multi-timezone, or calendar-embedded time entry

- **Option C — Dial/clock-face (MD3):** Touch-optimized clock face with text toggle.
  - Upside: Best mobile/touch experience for casual time selection
  - Downside: Not screen-reader navigable; requires text mode as mandatory fallback
  - Para tu caso: Mobile-primary apps with casual scheduling needs only

- **Option D — Native `<input type="time">`:** OS native; no custom component.
  - Upside: Zero JS; works with all AT; no maintenance; consistent with OS conventions
  - Downside: Browser/OS inconsistency in visual rendering; limited styling control
  - Para tu caso: Safety-critical contexts, government services, or when minimizing custom component scope

### 2. 12-hour vs. 24-hour format control
- **Option A — Developer-controlled `use12Hours`/`hourCycle` (Ant Design, Fluent 2, Mantine):** Developer specifies the format explicitly.
  - Upside: Predictable format regardless of user locale
  - Downside: Developer may set wrong format for user locale

- **Option B — Locale-driven automatic (MD3):** No developer override; locale determines format.
  - Upside: Always locale-appropriate
  - Downside: Cannot enforce 24-hour format in safety-critical contexts regardless of locale

- **Para tu caso:** Use developer-controlled `hourCycle` with a default derived from locale; allow override for safety/compliance contexts.

### 3. Timezone handling
- **Option A — Component-level timezone (Spectrum):** `timeZone: IANA string` prop for zone-aware parsing.
  - Adopters: Spectrum only
  - Upside: Time value semantics are unambiguous; "3:00 PM Pacific" is stored correctly
  - Downside: Adds complexity; requires IANA timezone detection or user preference

- **Option B — No timezone handling (all other systems):** TimePicker is timezone-agnostic; application handles timezone.
  - Upside: Simpler component; timezone as application concern
  - Downside: Timezone bugs are easy to introduce silently
  - Para tu caso: Handle timezone at the form/page level unless your product explicitly supports multi-timezone scheduling

### 4. `disabledTime` granularity (Ant Design pattern)
- **Option A — Callback with hour/minute/second arrays (Ant Design):** Full programmatic control over which values are disabled per column.
  - Upside: Any business rule is expressible (no Tuesdays after 5pm, no first 30 min of the hour)
  - Downside: Complex API; callback called repeatedly; performance implications
  - Para tu caso: Use only when interval blocking alone (`step`) is insufficient

- **Option B — `minTime`/`maxTime` range only (most systems):** Disable values outside a continuous time range.
  - Upside: Simple, declarative
  - Downside: Cannot express non-contiguous disabled ranges
  - Para tu caso: Sufficient for 90% of use cases

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Dropdown with time slots | Listbox of pre-generated time options at configurable intervals | Scheduling, appointment booking | Ant Design, Base Web, Fluent 2, Lightning |
| Column-scroll (drum picker) | 2–3 scrollable columns (H, M, S) | Mobile scheduling, casual time selection | Ant Design, Mantine TimePicker |
| Segment model | Separate spinbuttons per time unit (HH MM SS AMPM) | Keyboard-accessible, calendar-embedded | Spectrum/React Aria |
| Clock face (dial) | Analog clock with touch-drag | Mobile-primary casual scheduling | MD3 |
| Split text inputs | Separate Hour + Minute fields | Government forms, clinical entry, no-JS | GOV.UK |
| Native `<input type="time">` styled | Browser native with design system styling | Safety-critical, lightweight forms | Nord, Chakra, Radix, Orbit |
| Range picker (start + end time) | Two time pickers in one surface | Shift scheduling, service windows | Ant Design `TimePicker.RangePicker` |

### ASCII Wireframes

**Dropdown/Combobox time picker:**
```
┌──────────────────────────┐
│  Meeting time            │
│ ┌────────────────────┐   │
│ │  09:30 AM        ▼ │   │
│ └────────────────────┘   │
│   ┌──────────────────┐   │
│   │ 09:00 AM         │   │
│   │ 09:30 AM  ◀ sel  │   │
│   │ 10:00 AM         │   │
│   │ 10:30 AM         │   │
│   │ 11:00 AM         │   │
│   └──────────────────┘   │
└──────────────────────────┘
```

**Segment model (Spectrum style):**
```
┌──────────────────────────────┐
│  Start time                  │
│ ┌──────────────────────────┐ │
│ │  [HH] : [MM] : [SS] [AM]│ │
│ └──────────────────────────┘ │
│  Each [ ] is a spinbutton     │
│  Arrow keys adjust each unit  │
└──────────────────────────────┘
```

**Column-scroll drum picker (Ant Design style):**
```
┌──────────────────────────────┐
│  ┌──────┬──────┬──────┐      │
│  │  08  │  15  │  00  │      │
│  ├──────┼──────┼──────┤      │
│  │  09  │  30  │  30  │ sel  │
│  ├──────┼──────┼──────┤      │
│  │  10  │  45  │  00  │      │
│  └──────┴──────┴──────┘      │
│   Hours  Mins  Secs           │
└──────────────────────────────┘
```

**Range picker:**
```
┌──────────────────────────────────┐
│  Shift hours                     │
│ ┌──────────┐  →  ┌──────────┐   │
│ │ 08:00 AM │     │ 05:00 PM │   │
│ └──────────┘     └──────────┘   │
│  Start             End           │
└──────────────────────────────────┘
```

---

## Risks to Consider

**RISK 1 — Inaccessible interaction model as only option (HIGH)**
The clock dial (MD3) is not screen-reader navigable. The column-scroll/drum picker (Ant Design) uses listbox semantics but is unfamiliar to AT users and less efficient than spinbutton navigation. If your primary interaction model is not keyboard-accessible, you need a mandatory fallback. Building this from the start is far cheaper than retrofitting.
*Mitigation:* Specify an explicit keyboard-accessible mode (segment or text input) as the primary interaction model. Treat dial/visual as a companion enhancement, never the sole path.

**RISK 2 — Format ambiguity and validation errors (HIGH)**
12-hour format (AM/PM) is a systematic source of user errors across all domains, not just clinical. Scheduling a meeting at "8:00" without clear AM/PM indication or a 12/24h context leads to a 12-hour error that is easy to miss. No system enforces format clarity; this is a documentation and UX specification responsibility.
*Mitigation:* Always include visible format hint text. Validate on blur and show the interpreted time ("8:00 PM = 20:00") in the helper text. Consider defaulting to 24-hour format for enterprise contexts.

**RISK 3 — Interval mismatch: business rules vs. step setting (MEDIUM)**
Setting `minuteStep={30}` prevents users from entering 10:15 even if the application needs to handle that time (e.g., a booking that starts at 10:15). Interval controls are intended to constrain the UI, but if the underlying data model allows non-interval times, the constraint creates data entry failures.
*Mitigation:* Always enable freeform entry (`creatable`, `freeform`, or a text input fallback) alongside interval constraints. Document the interval as a UX convenience, not a data model constraint.

---

## Next Steps

1. **Choose the primary interaction model** (dropdown/combobox vs. segment vs. native) based on platform target (mobile/desktop), accessibility requirements, and scheduling vs. precise entry context.
2. **Decide 12h vs. 24h default** based on target audience and safety requirements. Document the `hourCycle` API regardless of which is default.
3. **Determine interval requirements**: Does the product need fixed-interval scheduling (30-min slots) or free-form time entry? This drives whether to use a dropdown-based or segment-based archetype.
4. **Specify range picker requirements**: If start+end time selection is needed, explicitly design `TimePicker.RangePicker` as a first-class feature (Ant Design reference).
5. **Define `disabledTime` needs**: For products with complex booking constraints (no lunch hours, only available slots), specify whether `minTime`/`maxTime` range is sufficient or whether a `disabledTime` callback is needed.
