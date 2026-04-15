---
system: Chakra UI
component: Not available natively (Autocomplete / Combobox via @chakra-ui/autocomplete or v3)
url: https://chakra-ui.com/docs/components/combobox
last_verified: 2026-03-29
confidence: medium
---

# Combobox

## Approach
Chakra UI v2 did not include a native Combobox component — teams used the community package `@chakra-ui/autocomplete` or built custom solutions by combining `Input`, `Popover`, and a filtered list. Chakra UI v3 introduced a dedicated Combobox component as part of the major redesign, providing a filterable select with keyboard navigation, custom option rendering, and full theme token integration. The Combobox follows the WAI-ARIA combobox pattern (edit field + listbox popup) and supports both controlled and uncontrolled modes. The v3 implementation leverages the new Ark UI headless primitives under the hood, which Chakra adopted as its accessibility foundation in v3.

## Key Decisions
1. **v2 vs v3 split** (HIGH) — In v2, Combobox was intentionally absent from core to keep the library lean; the community package filled the gap. In v3, Chakra made a strategic decision to include it natively as part of a broader expansion of the component set to compete more directly with comprehensive libraries like Mantine. Teams on v2 should use `@chakra-ui/autocomplete` (community) or migrate to v3.
2. **Ark UI foundation in v3** (HIGH) — Chakra v3 adopted Ark UI (from the Chakra team) as the headless accessibility layer. Combobox in v3 uses `@ark-ui/react` Combobox primitives, meaning the ARIA implementation follows Ark UI's interpretation of the WAI-ARIA combobox pattern. This is a significant architectural shift from v2's fully custom implementations.
3. **Controlled filtering pattern** (MEDIUM) — The Combobox supports both auto-filtering (the component filters the items array based on input value) and manual filtering (consumer controls the displayed items via state). The manual pattern is necessary for async/server-side search scenarios.
4. **Token-based theming** (MEDIUM) — All visual aspects (dropdown background, option hover state, selected indicator) map to semantic Chakra tokens, ensuring automatic light/dark mode support and custom theme compatibility.

## Notable Props
- `items`: array of selectable options
- `value` / `onValueChange`: controlled value
- `inputValue` / `onInputValueChange`: controlled input value for filtering
- `allowCustomValue`: whether non-list values are accepted
- `multiple`: multi-selection mode
- `positioning`: popover positioning config

## A11y Highlights
- **Keyboard**: Type to filter; arrow keys navigate options; Enter selects; Escape closes and returns focus to input; Home/End for first/last option
- **Screen reader**: `role="combobox"` on input; `aria-expanded`, `aria-controls` pointing to listbox; `aria-autocomplete="list"`; selected option communicated via `aria-selected`
- **ARIA**: Full WAI-ARIA 1.2 combobox pattern via Ark UI; `role="listbox"` on dropdown, `role="option"` on items

## Strengths & Gaps
- **Best at**: Full Chakra token integration with auto dark mode; accessible combobox via Ark UI primitives; async filtering support in v3
- **Missing**: v2 has no native implementation — requires community package; v3 migration path requires significant refactoring from v2 custom solutions
