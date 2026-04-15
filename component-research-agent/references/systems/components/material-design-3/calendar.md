---
system: Material Design 3
component: Embedded in DatePicker only
url: https://m3.material.io/components/date-pickers/overview
last_verified: 2026-03-28
---

# Calendar (Embedded in DatePicker Only)

## Approach

Material Design 3 does not expose a standalone Calendar component. The calendar grid exists exclusively inside three DatePicker variants: Docked (an inline dropdown attached to a text field), Modal (a full dialog overlay), and Modal Date Input (a text field within a modal). This is a deliberate architectural decision rooted in M3's philosophy of complete, self-contained interaction patterns — Google designs for native Android and cross-platform apps where the calendar grid is always contextual to an input action, never a persistent view element. The docked variant is the closest thing to an inline calendar, but it still requires a trigger text field to activate the dropdown. There is no `<Calendar />` component you can drop into a dashboard or scheduling view independently.

The reason M3 took this approach versus systems like Spectrum comes down to the target medium. Android and Material apps are primarily form-driven: users fill out forms, and date selection is one step in a flow. The calendar is a picker tool, not a display surface. Adobe, by contrast, builds products like Analytics dashboards and Lightroom timelines where the calendar grid must live persistently in a panel, divorced from any input field. M3's architecture optimizes for the form-completion use case and treats the need for an embedded, always-visible calendar as an edge case outside the design system's scope. This simplification reduces the component surface area but creates friction for teams building data visualization or scheduling products on Material foundations.

Range date selection is supported within the Modal variant via `MaterialDateRangePicker`, which uses a two-month side-by-side layout inside the dialog. The entire range selection surface is still encapsulated inside the picker's dialog — it cannot be extracted independently.

## Key Decisions

1. **No standalone Calendar component** (HIGH) — M3 chose to keep the calendar grid exclusively inside DatePicker variants. The reasoning is that Google's products and the broader Android ecosystem treat date selection as an ephemeral, task-completion action — you open a picker, pick a date, close it. There was no identified need for a persistent calendar view in M3's reference products at the time the component was designed. This means teams needing an always-visible calendar widget must either build custom or use a third-party library, which is a real gap for scheduling and analytics use cases.

2. **Three distinct picker variants with different interaction models** (HIGH) — Docked (dropdown from text field), Modal (full dialog), and Modal Date Input (text entry inside dialog) each serve distinct UX contexts. Docked is for forms with available viewport space; Modal is for mobile-first flows where the calendar needs full focus; Modal Input is for power users who prefer typing. The rationale is that forcing a single pattern onto all contexts degrades UX — a mobile modal is inappropriate on desktop, and a docked picker is impractical on small screens. This is a thoughtful multi-context design, though it adds implementation complexity.

3. **Range selection always uses a two-month modal layout** (MEDIUM) — Range date pickers in M3 display two months side by side inside the modal dialog. This was chosen because picking a range that spans two months (e.g., a vacation from Jan 28 to Feb 5) is nearly impossible with a single-month view — the user must navigate back and forth, losing visual context of both endpoints. The two-month layout solves this by making both months simultaneously visible. The trade-off is a larger modal footprint on small screens.

4. **Disabled dates via `setDayViewDecorator()`** (MEDIUM) — M3 uses a decorator pattern for customizing individual day cells, including disabling them. This is more flexible than a simple array of disabled dates because it allows arbitrary visual decoration alongside disablement (e.g., a price indicator on a travel booking calendar). The trade-off is that it's more complex to implement than passing a simple array or callback, particularly for developers unfamiliar with the builder pattern.

5. **Text input toggle inside modal** (LOW) — Users can switch between the calendar grid and a text input field within the modal, using a keyboard icon button. This exists because assistive technology users and keyboard-power users may find text entry faster than navigating a grid. It is a significant a11y affordance, but it is buried inside the modal rather than being the primary interface.

## Notable Props

- `setTitleText()`: Controls the header label shown at the top of the picker dialog. Matters because default text is generic ("Select date") and context-specific labels ("Select check-in date") dramatically improve usability in multi-step flows.
- `setSelection()`: Sets the default selected date or range on open. Important for edit flows where the user is modifying an existing date.
- `setInputMode(INPUT_MODE_TEXT)`: Forces the picker to open in text input mode rather than calendar mode. Used when the expected user base is power users or when the date is unlikely to be navigated by grid.
- `app:rangeFillColor`: Controls the color of the range fill between start and end dates. A visual correctness issue — the default tint may be too subtle, and this attribute allows it to meet contrast requirements.

## A11y Highlights

- **Keyboard**: The Modal Date Input mode allows full keyboard date entry. For the calendar grid mode, navigation follows the standard grid pattern — arrow keys move between days, though M3's documentation does not explicitly specify Page Up/Down for month navigation.
- **Screen reader**: The modal dialog receives focus on open, trapping focus within. The calendar heading (month/year) functions as a live region, so screen readers announce month changes when the user navigates.
- **ARIA**: M3's implementation targets Android-native and Compose contexts, where ARIA as a web concept is replaced by platform-specific accessibility APIs (TalkBack). In web implementations via Material Web Components, the dialog uses `role="dialog"` and the calendar grid uses standard table semantics.

## Strengths & Gaps

- **Best at**: Comprehensive, opinionated picker patterns for form-completion flows — the three variants cover nearly every form context with clear guidance on when to use each.
- **Missing**: No standalone Calendar widget for embedding in dashboards, scheduling views, or any context where the calendar grid needs to be persistently visible without a text field trigger. Teams building these UIs on M3 must build or import a custom solution.
