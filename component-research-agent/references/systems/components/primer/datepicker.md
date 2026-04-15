---
system: GitHub Primer
component: DatePicker
url: https://primer.style/components/date-picker
last_verified: 2026-03-28
confidence: medium
---

# DatePicker

## Approach
GitHub Primer's DatePicker is a custom calendar popover component designed to support GitHub's date-heavy workflows like milestone selection, filter-by-date in issues/PRs, and scheduling. It supports both single date and date range selection modes, which are critical for GitHub's filtering interfaces. The component is built with Primer's Overlay and AnchoredOverlay primitives, following Primer's composable overlay system. Primer emphasizes compact, density-appropriate UI suited to GitHub's information-dense interface.

## Key Decisions
1. **Range selection built-in** (HIGH) — Supports single date and date range selection in one component, unlike systems that treat range as a separate component, because GitHub's issue/PR filtering frequently needs date ranges.
2. **AnchoredOverlay composition** (HIGH) — Built on Primer's generic overlay positioning system, ensuring consistent popover placement behavior across all Primer overlay components.
3. **Compact calendar grid** (MEDIUM) — Calendar is designed for high information density matching GitHub's UI conventions, rather than the large touch-target calendar grids seen in consumer-focused systems.

## Notable Props
- `view`: Controls single vs range selection mode
- `minDate` / `maxDate`: Constrains selectable range
- `anchorVariant`: Controls the trigger button appearance (button, icon-only, input-like)
- `onDaySelection`: Callback with selected date or date range object

## A11y Highlights
- **Keyboard**: Arrow key grid navigation; Enter to select; Escape to close; Home/End for week boundaries
- **Screen reader**: Days announced with full date string; navigation announces current month/year
- **ARIA**: role="grid" on calendar; aria-selected on selected dates; aria-disabled on out-of-range dates

## Strengths & Gaps
- **Best at**: Date range selection built-in; composability with Primer overlay system; works well in data-dense GitHub-style interfaces
- **Missing**: Time selection (no datetime picker); limited locale/internationalization compared to enterprise systems
