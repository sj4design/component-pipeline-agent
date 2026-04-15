---
system: Twilio Paste
component: Combobox
url: https://paste.twilio.design/components/combobox
last_verified: 2026-03-28
confidence: high
---

# Combobox

## Approach
Twilio Paste's Combobox is a searchable/filterable select input used in the Twilio Console for selecting from large option sets — phone number selection, country codes, timezone selection, and filtering long configuration lists. Unlike Paste's Select (which uses native select), Combobox is a fully custom component built on Downshift providing a text input with a filterable dropdown listbox. Supports both single and multi-select modes.

## Key Decisions
1. **Downshift-based implementation** (HIGH) — Built on the Downshift library (by Kent C. Dodds) which provides the ARIA combobox pattern implementation, giving Paste full control over styling while using a battle-tested accessibility layer.
2. **Autocomplete/filter behavior** (HIGH) — Users can type to filter options, critical for long lists like country codes, timezones, or phone number pools in Twilio Console.
3. **Grouped options** (MEDIUM) — Supports option groups with group labels, useful for categorized option lists like voice vs. SMS phone numbers or regional groupings.

## Notable Props
- `items`: Array of options
- `onSelectedItemChange`: Selection callback
- `onInputValueChange`: Input change callback (for filtering)
- `groupItems`: Boolean for grouped option display
- `state`: Controlled state via useCombobox or useMultiSelectCombobox hooks

## A11y Highlights
- **Keyboard**: Type to filter; Down/Up arrows to navigate; Enter to select; Escape to close; Alt+Down to open
- **Screen reader**: role="combobox" on input; role="listbox" on dropdown; options announced on navigation; selection announced
- **ARIA**: role="combobox"; aria-expanded; aria-autocomplete="list"; aria-activedescendant; role="option" with aria-selected

## Strengths & Gaps
- **Best at**: Large filterable option sets; grouped options; multi-select mode; Downshift accessibility foundation
- **Missing**: No async loading state (for server-side filtered options); complex grouped multi-select can be cognitively heavy
