---
system: Spectrum (Adobe)
component: TimeField
url: https://react-spectrum.adobe.com/react-spectrum/TimeField.html
last_verified: 2026-03-28
---

# Time Picker (Spectrum / TimeField)

## Approach
Spectrum's TimeField uses an architecturally unique segment-based input paradigm: rather than a single text field or a clock dial, the time is composed of individual interactive segments — one for hours, one for minutes, one for seconds, one for the AM/PM meridian — each independently editable via keyboard. This design emerged from Adobe's accessibility requirements and the failure modes of traditional time inputs. A standard `<input type="time">` is notoriously inconsistent across browsers and fails AT (assistive technology) in several major screen readers. A single text field requires users to know the exact format and position their cursor correctly. Spectrum's segment approach makes each unit of time independently navigable: pressing the right arrow key moves from the hours segment to the minutes segment, and typing "3" into the hours segment immediately validates and moves to the next segment. This is the most keyboard-efficient time entry mechanism in the Tier 1 landscape for users who know the exact time they want to enter. Spectrum's TimeField is also the foundation for DateTimePicker, where it composes with the DatePicker to form a combined date-and-time entry surface — demonstrating Spectrum's compositional architecture.

## Key Decisions
1. **Segment-based input rather than text or dial** (HIGH) — Each time unit (H, M, S, AM/PM) is a separate interactive element. This provides individual validation per segment (you cannot type "73" into the minutes segment), automatic cursor advancement on completion, and precise screen reader announcements per segment. The segment approach was chosen over a text field after Adobe's accessibility team found that screen reader users could not reliably navigate standard time text inputs. It was chosen over a dial because Spectrum primarily targets desktop web applications where mouse dragging on a dial is less efficient than keyboard segment entry.
2. **Granularity control via `granularity` prop** (MEDIUM) — The component displays only the time units the developer specifies: `"hour"`, `"minute"`, or `"second"`. If an application only needs hour-level precision, the minute and second segments are hidden, simplifying the interaction for coarse time selection. This prop-driven granularity means one component serves use cases ranging from "select an hour window" to "enter a precise HH:MM:SS timestamp."
3. **Time zone support via `timeZone` prop** (HIGH) — TimeField accepts a time zone identifier (IANA format, e.g., `"America/New_York"`) and displays the time in that zone with appropriate offset. This is critical for Adobe's creative cloud and meeting scheduling use cases where users in different time zones coordinate. No other Tier 1 time picker handles time zone display at the component level — most leave time zone management entirely to the application layer.

## Notable Props
- `granularity`: `"hour" | "minute" | "second"` — determines which segments are shown.
- `timeZone`: IANA time zone identifier for zone-aware display and value parsing.
- `hourCycle`: `12 | 24` — explicit override for AM/PM vs. 24-hour format, independent of locale.
- `placeholderValue`: Sets default segment placeholder values when no time is selected — displays grayed-out example values in each segment.

## A11y Highlights
- **Keyboard**: Arrow keys cycle values within a segment; Left/Right arrows move between segments; typing a digit advances to the next logical segment on completion. This roving-focus-within-a-field model is unique to React Aria's segment input pattern.
- **Screen reader**: Each segment announces its current value and role ("Hours, 3", "Minutes, 45", "AM/PM, PM"). Value changes within a segment are announced live via `aria-live`. This is the most granular screen reader announcement model for time entry in any Tier 1 system.
- **ARIA**: Each segment has `role="spinbutton"` with `aria-label` naming the time unit, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`. The overall field has `role="group"` with a label.

## Strengths & Gaps
- **Best at**: Keyboard and screen reader accessibility — the segment model provides per-unit live announcements and keyboard navigation that is categorically more accessible than any other time input paradigm in the Tier 1 landscape.
- **Missing**: No dial/visual clock option (pure text segment), which may be less intuitive for touch-primary interfaces or users unfamiliar with 24-hour time.
