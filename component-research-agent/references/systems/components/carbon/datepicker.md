---
system: Carbon
component: Date picker
url: https://carbondesignsystem.com/components/date-picker/usage/
last_verified: 2026-03-28
---

# Date Picker

## Approach
IBM's Carbon takes the most pragmatic approach: delegate calendar rendering to Flatpickr (a battle-tested, dependency-free JS library) and focus engineering effort on the input field experience. This reflects Carbon's enterprise DNA — in IBM's products, date pickers are utilities in complex data workflows, not hero components. Carbon offers three variants: Simple (text-only, no calendar), Single (one date with calendar), and Range (two inputs with shared calendar). The Simple variant acknowledges that in many enterprise workflows users know the exact date and a calendar adds friction. Carbon invested in density (three sizes) and fluid mode for inline editing rather than calendar customization.

## Key Decisions
1. **Flatpickr as calendar engine** (HIGH) — Rather than building a custom calendar, Carbon delegates to Flatpickr for locale, disabled dates, range highlighting, and keyboard nav. Tradeoff: faster to ship and fewer calendar bugs, but calendar customization is limited to what Flatpickr supports.
2. **Three sizes (32px / 40px / 48px)** (MEDIUM) — Enterprise dashboards need compact inputs. A 48px input works in forms; 32px fits a toolbar alongside 15 other filters. Without density variants, designers waste space or build custom inputs.
3. **Simple variant (text-only, no calendar)** (MEDIUM) — For known-date entry (invoice dates, report periods), a calendar popup adds friction. The Simple variant trusts users to know the date and focuses on format validation. Most systems don't offer this — they always show a calendar.
4. **Fluid mode** (LOW) — Removes visible border for inline editing contexts (data table rows, toolbars). Makes the input blend into surrounding content.

## Notable Props
- `datePickerType`: "simple" | "single" | "range" — three variants via one prop, not three components.
- All Flatpickr options pass through: `disable` (date array), `minDate`, `maxDate`, `dateFormat`, `locale`.
- No abstraction layer over Flatpickr — developers use Flatpickr's API directly for advanced features.

## A11y Highlights
- **Keyboard**: Flatpickr's built-in keyboard nav. Arrow keys in calendar, Tab between inputs in range mode.
- **Screen reader**: Relies on Flatpickr's ARIA. Less granular than Spectrum or M3.
- **Known issue**: Disabled dates don't always get visual styling in range mode (GitHub issues #5210, #3434). Flatpickr limitation.

## Strengths & Gaps
- **Best at**: Enterprise density (3 sizes), pragmatic approach (Flatpickr), Simple variant for known-date entry.
- **Missing**: No callback-based disabled dates (static array only). Known disabled-date styling bugs. No presets. Limited calendar customization. A11y is functional but not best-in-class.
