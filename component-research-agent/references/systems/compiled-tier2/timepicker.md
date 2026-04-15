---
component: TimePicker
tier: 2
last_verified: 2026-03-28
---

# TimePicker — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | TimePicker (via Input) | Native input[type=time]; no custom time picker UI | medium |
| Salesforce Lightning | Timepicker | Custom combobox dropdown with configurable time intervals | high |
| GitHub Primer | TimePicker (not present) | Not present; use native input[type=time] | high |
| shadcn/ui | TimePicker (not present) | Not dedicated; native input[type=time] or community patterns | medium |
| Playbook | TimePicker (not present) | Not present in public docs | medium |
| REI Cedar | TimePicker (not present) | Not present; use CdrInput type="time" | medium |
| Wise Design | TimePicker (not present) | Not present; time not a common Wise use case | low |
| Dell Design System | TimePicker (not present) | Not present in public docs | low |

## Key Decision Patterns

**Rare dedicated component:** TimePicker is one of the least commonly implemented dedicated components across T2 systems. Most rely on native input[type=time] which provides browser-native time picking (OS time wheels on mobile, segment editing on desktop).

**Lightning's custom approach:** Lightning's Timepicker is uniquely a custom combobox dropdown with configurable time intervals — important for scheduling in CRM contexts where specific time slots (30-minute intervals) are required, not freeform time entry.

**Native input[type=time] trade-offs:** Native time input provides excellent mobile time wheels and keyboard segment navigation, but cross-browser visual consistency varies significantly (especially on non-Chromium browsers). No JS required.

**Step attribute for granularity:** Native input[type=time] supports the `step` attribute (in seconds) to limit valid time increments: step=3600 for hour-only, step=1800 for 30-minute intervals.

## A11y Consensus
- Native input[type=time]: arrow keys adjust hour/minute/AM-PM segments; keyboard navigation automatic
- Custom time picker (Lightning): role="combobox" on input; role="listbox" on dropdown; role="option" for time slots
- Label association: htmlFor + id required
- 24h vs. 12h: native input respects system locale; custom pickers must handle format explicitly

## Recommended Use
Use Lightning Timepicker for scheduling contexts requiring configurable intervals. Use native input[type=time] (via any system's Input component) for simple time entry. Custom time pickers are rarely justified except for scheduling UIs requiring specific interval constraints.
