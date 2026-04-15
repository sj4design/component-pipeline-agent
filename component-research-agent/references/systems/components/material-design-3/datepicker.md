---
system: Material Design 3
component: Date pickers
url: https://m3.material.io/components/date-pickers/guidelines
last_verified: 2026-03-28
---

# Date Pickers

## Approach
Material Design 3 ships three distinct date picker variants — Docked, Modal, and Modal Input — because Google's research showed date selection needs differ fundamentally by context. A form field has different constraints than a dedicated travel booking flow. Rather than one component that compromises everywhere, M3 built three that each excel in their context. All three share an input mode toggle (calendar ↔ keyboard) because calendar navigation is painful for distant dates — typing "1994-06-15" beats clicking through 30 years of months. Range selection is first-class in the Modal variant with distinct visual treatment for endpoints vs. fill.

## Key Decisions
1. **Three variants instead of one configurable component** (HIGH) — Docked (dropdown), Modal (dialog), and Modal Input (text dialog) are separate components. Each context has different space, attention, and gesture needs. A docked picker must stay compact; a modal can expand for range highlighting and year navigation.
2. **Input mode toggle (calendar ↔ keyboard)** (HIGH) — A toggle icon switches between visual calendar and text input mid-interaction without dismissing the picker. Users who know the exact date are faster typing; calendar is better for "near now" discovery. Serves both mental models in one flow.
3. **CalendarConstraints as separate validation layer** (MEDIUM) — Min/max and date validators are configured through a builder, independent from UI. Business logic ("only business days") is decoupled from rendering, enabling reuse across all three variants.
4. **Range fill visual hierarchy** (MEDIUM) — Selected endpoints use `colorPrimary`; intermediate dates use `colorSurfaceVariant`; today gets a stroke outline. Three distinct treatments make range boundaries scannable at a glance.

## Notable Props
- `INPUT_MODE_CALENDAR` / `INPUT_MODE_TEXT`: First-class enum for initial mode — signals Google considers keyboard entry a primary, not secondary, interaction.
- `CalendarConstraints.Builder().setValidator()`: Fluent builder separates validation from UI — composable constraint architecture.
- `setSelection(todayInUtcMilliseconds())`: UTC millis as default reveals timezone-safe-by-default stance.

## A11y Highlights
- **Keyboard**: Arrow keys navigate grid, Page Up/Down for months, Home/End for week boundaries, Enter confirms. Input mode toggle is keyboard-accessible.
- **Screen reader**: Selected date, range endpoints, and month changes announced. `contentDescription` on all interactive elements.
- **ARIA**: Dialog role for modals, grid role for calendar, proper heading hierarchy for month/year.

## Strengths & Gaps
- **Best at**: Visual range treatment (3-tier hierarchy), input mode toggle, variant flexibility across contexts.
- **Missing**: No built-in preset ranges. No callback-based disabled dates (validators defined at build time). No web implementation (Android/Compose only — MUI X diverges from spec).
