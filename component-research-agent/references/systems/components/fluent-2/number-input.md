---
system: Fluent 2 (Microsoft)
component: SpinButton
url: https://react.fluentui.dev/?path=/docs/components-spinbutton--docs
last_verified: 2026-03-29
confidence: high
---

# Number Input (SpinButton)

## Approach
Fluent 2's equivalent of a numeric input with stepper controls is the SpinButton component — a text input flanked by increment and decrement buttons for adjusting a numeric value in defined steps. SpinButton is a foundational Microsoft Office UI pattern, present in nearly every Office desktop and web application: font size selectors in Word/Excel/PowerPoint, zoom level controls, margin and spacing inputs in document layout panels, and row height controls in Excel. Fluent 2's SpinButton directly descends from this Office lineage and is tuned for precision numeric input in productivity contexts. The component enforces min/max bounds, configurable step size, and supports both controlled and uncontrolled value modes. It renders as an `<input type="text">` (not `type="number"`) to provide consistent cross-browser display formatting and avoid browser-native spinner arrow conflicts.

## Key Decisions
1. **`<input type="text">` over `type="number"`** (HIGH) — Using a text input with numeric validation logic avoids inconsistent browser-native spinner buttons (which would conflict with Fluent's styled up/down buttons), inconsistent locale number formatting, and the browser's built-in scroll-to-change behavior — all of which create UX problems in the dense Office environment.
2. **Increment/decrement buttons flanking the input** (HIGH) — The button-on-both-sides layout mirrors the Office desktop SpinButton, making it immediately recognizable to Microsoft 365 users; buttons use Fluent icon-only button styling for compact display in toolbars and panels.
3. **Min/max/step enforcement** (HIGH) — Built-in bounds enforcement and step snapping are critical for Office contexts like font size (8–72pt, step 1) or zoom level (10–500%, step 10) where out-of-range values would break document rendering.
4. **Controlled value with `onChange`** (MEDIUM) — The controlled pattern allows product teams to apply async validation (e.g., checking if a font size is available in a particular font family) before committing a value — important for Office's complex document state management.
5. **Display value formatting** (MEDIUM) — A `displayValue` prop allows the shown string to differ from the underlying numeric value (e.g., showing "100%" when the stored value is 100), supporting the common Office pattern of displaying units alongside the number.

## Notable Props
- `value`: controlled numeric value
- `defaultValue`: uncontrolled initial value
- `onChange`: callback receiving the new value string and event
- `min`: minimum allowed value
- `max`: maximum allowed value
- `step`: increment/decrement step size (default 1)
- `stepPage`: larger step for Page Up/Page Down keys
- `displayValue`: string override for the displayed input text (for units/formatting)
- `disabled`: disables all interaction
- `size`: `"small"` | `"medium"` | `"large"`
- `appearance`: `"outline"` | `"underline"` | `"filled-darker"` | `"filled-lighter"`

## A11y Highlights
- **Keyboard**: Up/Down arrow keys increment/decrement by `step`; Page Up/Down increment/decrement by `stepPage`; Home/End jump to min/max values respectively; direct text entry is supported with validation on blur; Tab moves focus to the input, then Shift+Tab or Tab to the increment/decrement buttons.
- **Screen reader**: Renders with `role="spinbutton"`; `aria-valuenow` reflects the current value; `aria-valuemin` and `aria-valuemax` communicate the allowed range; `aria-valuetext` conveys the display value when it includes units (e.g., "100 percent"); increment/decrement buttons have accessible labels ("Increment value" / "Decrement value").
- **ARIA**: `role="spinbutton"` on the input element; `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`; increment/decrement buttons use `aria-label`; high-contrast mode supported via Fluent token system — button borders and focus indicators map to Windows system colors.

## Strengths & Gaps
- **Best at**: Precision numeric entry in Office-style toolbars and property panels; min/max/step enforcement matching familiar Office UI behavior; `displayValue` for unit-annotated display; strong WAI-ARIA spinbutton implementation.
- **Missing**: No native support for floating-point precision display formatting beyond `displayValue` override (e.g., locale-aware decimal separators must be handled by the consumer); no built-in suffix/prefix label slot for units within the component (units in `displayValue` are a workaround); no mouse scroll-to-change behavior (intentionally omitted for Office contexts but may be expected by users from other design systems).
