---
system: Evergreen (Segment/Twilio)
component: Combobox
url: https://evergreen.segment.com/components/combobox
last_verified: 2026-03-29
confidence: high
---

# Combobox

## Approach
Evergreen's Combobox is a filterable select with typeahead that is central to Segment's data configuration UX. Users regularly need to find and select from long lists: event names (which can number in the hundreds), sources, destinations, audience traits, and user properties. A static dropdown becomes unusable at these scales; the Combobox solves this by combining a text input with a dropdown list that filters as the user types. Evergreen builds the Combobox on its own Popover and Menu primitives, keeping it composable with the rest of the system. The component supports both synchronous (client-side filtered) and asynchronous (server-search) data modes, which is essential for Segment's APIs where full option sets may be too large to load upfront.

## Key Decisions
1. **Typeahead filtering for long lists** (HIGH) — Segment's data plane exposes hundreds of event types and schema properties; typeahead is the only scalable selection UX for these lists.
2. **Async autocomplete support** (HIGH) — Allows teams to wire server-side search (e.g., fuzzy search over event names via Segment's API) so the dropdown doesn't require loading thousands of options on mount.
3. **Built on Popover + Menu primitives** (MEDIUM) — Composing from existing Evergreen primitives ensures consistent styling, keyboard behavior, and z-index management rather than reimplementing a floating list from scratch.

## Notable Props
- `items`: array of option items (sync mode)
- `onChange`: callback with selected item
- `inputProps`: passed through to the underlying TextInput (for placeholder, disabled, etc.)
- `itemToString`: function mapping an item to its display string (handles objects vs. strings)
- `openOnFocus`: boolean — opens dropdown when input receives focus
- `autocompleteProps`: passed to the underlying Autocomplete for advanced configuration

## A11y Highlights
- **Keyboard**: Arrow keys navigate the dropdown list; Enter selects; Escape closes and returns focus to input; the input is always the keyboard entry point.
- **Screen reader**: Uses `role="combobox"` on the input with `aria-expanded`, `aria-autocomplete="list"`, and `aria-controls` pointing to the listbox; each option uses `role="option"` with `aria-selected`.
- **ARIA**: Built on @reach-ui's Combobox primitives, which are ARIA 1.2 compliant for the combobox pattern.

## Strengths & Gaps
- **Best at**: Filtering long lists of Segment data objects (events, sources, destinations) with async search support; clean composable architecture.
- **Missing**: No multi-select mode (selecting multiple items from the filtered list); no token/tag display for selected items; limited grouped options support.
