---
system: Gestalt (Pinterest)
component: SelectList / Dropdown
url: https://gestalt.pinterest.systems/web/selectlist
last_verified: 2026-03-28
confidence: medium
---

# SelectList

## Approach
Gestalt provides SelectList as a native select wrapper and Dropdown as a custom dropdown for richer option display. SelectList wraps the native `<select>` element for simple single-value selections in forms. For more complex selection needs (multi-select, options with icons, options with secondary text), Gestalt's Dropdown component provides a custom listbox. This mirrors the NativeSelect vs custom Select pattern seen in other systems.

## Key Decisions
1. **SelectList for simplicity** (HIGH) — Wraps native select for simple use cases, preserving mobile platform behavior and accessibility. Pinterest's ad creation forms use native selects for straightforward selections (campaign objective, bid strategy).
2. **Dropdown for rich options** (HIGH) — Custom Dropdown for cases requiring Pinterest-style option rendering (with pins, images, or complex layouts). The Dropdown also serves as a menu component for action dropdowns.
3. **errorMessage prop** (MEDIUM) — Built-in error message display, connecting to Gestalt's form validation pattern. The error message appears below the select with standard error styling.

## Notable Props
- SelectList: `id`, `label`, `options[]`, `value`, `onChange`, `errorMessage`
- Dropdown: `anchor`, `open`, `onDismiss`, `Dropdown.Item`, `Dropdown.Section`

## A11y Highlights
- **Keyboard**: SelectList: native browser behavior; Dropdown: Arrow keys, Enter, Escape
- **Screen reader**: SelectList: native select semantics; Dropdown: role="listbox" with role="option"
- **ARIA**: SelectList enforces visible label; Dropdown uses listbox ARIA pattern

## Strengths & Gaps
- **Best at**: SelectList for native accessibility; Dropdown for rich Pinterest-style option rendering
- **Missing**: No async loading; no multi-select in SelectList
