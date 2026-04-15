---
system: Ant Design
component: DatePicker / RangePicker
url: https://ant.design/components/date-picker/
last_verified: 2026-03-28
---

# DatePicker / RangePicker

## Approach
Ant Design's DatePicker is the most feature-complete in any Tier 1 system. Where others make you compose or build wrappers, Ant ships `DatePicker.RangePicker` with built-in presets, dynamic disabled dates with context-aware parameters, confirmation control, custom cell rendering, and five picker modes (date/week/month/quarter/year). This comprehensiveness comes from serving millions of Chinese enterprise developers building data-heavy apps — analytics dashboards, financial tools, ERP systems. Every prop represents a real production request. The most innovative feature is `disabledDate` with `info.from` and `info.type`: the callback knows which date the user already selected and which panel is asking, solving the "max 90 days from start" constraint natively.

## Key Decisions
1. **`disabledDate` with `info.from` and `info.type` context** (HIGH) — When the picker switches to month/year view, it must call `disabledDate` for every date to determine if that month has selectable dates — creating exponential call loops. `info.type` lets developers short-circuit ("this whole month is disabled"). `info.from` enables range-relative rules ("no more than 30 days from start") without external state.
2. **Built-in `presets` prop with callback support** (HIGH) — `presets` accepts `{ label, value: [Dayjs, Dayjs] | () => [Dayjs, Dayjs] }[]`. Since v5.8.0, values can be callbacks that resolve at click time. "Last 7 days" always returns the correct range relative to "now," preventing stale preset values after midnight.
3. **`needConfirm` prop** (HIGH) — Boolean controlling whether range selection requires explicit confirm. Auto-apply works for quick filters; explicit confirm prevents accidental commits in complex workflows. Configurable per context.
4. **Five picker modes (date/week/month/quarter/year)** (MEDIUM) — The `picker` prop switches the component's granularity level. Analytics and financial tools need month or quarter selection. Unified under one component rather than separate MonthPicker, QuarterPicker, etc.
5. **`cellRender` and `panelRender`** (MEDIUM) — Full override of calendar cell and entire panel rendering. Enterprise dashboards annotate dates with KPIs, availability, earnings periods.

## Notable Props
- `disabledDate(date, { type, from })`: Context-aware disabled dates — unique to Ant Design.
- `presets`: Built-in preset ranges with dynamic callback resolution.
- `multiple`: Multi-date selection (not range — individual dates). Unique feature.
- `showTime`: One boolean adds time selection. `format` supports string patterns, arrays, and "mask" type.
- `onCalendarChange`: Fires on partial range selection (start OR end), not just final commit.

## A11y Highlights
- **Keyboard**: Arrow keys for calendar navigation, Enter to select, Tab between controls, Escape to close.
- **Screen reader**: Basic date selection announcements. Not as granular as Spectrum or M3.
- **Gap**: A11y is adequate but behind Spectrum and M3 — team prioritized feature breadth over accessibility depth. No segmented input, no ARIA grid pattern.

## Strengths & Gaps
- **Best at**: Feature completeness, built-in presets with callbacks, `disabledDate` with `info.from`, five picker modes, custom cell rendering.
- **Missing**: A11y not best-in-class. Monolithic API not composable. Docs heavy on API, light on UX rationale.
