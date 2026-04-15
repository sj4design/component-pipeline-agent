---
system: Shopify Polaris
component: Select, Combobox, Autocomplete
url: https://polaris.shopify.com/components/combobox
last_verified: 2026-03-28
---

# Select / Combobox / Autocomplete

## Approach
Polaris takes a composition-first approach to selection components, building complex behaviors from smaller primitives rather than configuring a monolithic Select. The **Select** component is deliberately kept simple -- it renders a native-like dropdown for basic "pick one" scenarios common in Shopify admin forms (country, currency, sort order). For anything more complex, Polaris provides **Combobox**, which is a composition of TextField and Popover with Listbox, and **Autocomplete**, which is a convenience wrapper around Combobox with minor UI differences. This architecture reflects Shopify's merchant-first philosophy: most merchants need simple selects, and power features should not add complexity to the common case. The Combobox is explicitly built on the ARIA 1.2 combobox pattern with Listbox, giving developers composable pieces they can reassemble for custom selection experiences.

## Key Decisions
1. **Composition over configuration** (HIGH) -- Combobox is not a prop-heavy monolith but a composition of TextField + Popover + Listbox. Developers wire these together, giving them control over layout, filtering logic, and option rendering. This trades initial simplicity for long-term flexibility -- critical for Shopify's diverse app ecosystem where third-party developers need customization freedom.
2. **Select stays native-like** (HIGH) -- Polaris Select intentionally delegates to browser-native rendering behavior where possible. This ensures accessibility for free, predictable mobile behavior, and zero JS overhead for the simplest selection pattern. The team resisted pressure to make Select "fancier" because native controls serve merchants better in straightforward forms.
3. **Autocomplete as a convenience wrapper** (MEDIUM) -- Rather than forcing developers to compose Combobox for every searchable select, Autocomplete provides a pre-wired version with sensible defaults. This acknowledges that while composition is powerful, the 80% use case of "searchable dropdown" should not require assembly every time.
4. **Listbox as a standalone primitive** (MEDIUM) -- The Listbox component is exposed independently, usable outside of Combobox for custom selection UIs like option lists, action lists, or resource pickers. This primitive-first design lets the system grow without creating new top-level components for every variation.

## Notable Props
- `allowMultiple` (Combobox): Enables multi-select mode through the same composition, toggling Listbox behavior without changing the component tree
- `preferredPosition` (Autocomplete): Controls popover placement, acknowledging that Shopify admin layouts vary significantly
- `willLoadMoreResults` / `loading` (Autocomplete): Built-in infinite-scroll support for merchant product/collection lists that can be very large
- `onScrolledToBottom`: Callback for lazy loading, designed for the real-world pattern of merchants scrolling through thousands of products

## A11y Highlights
- **Keyboard**: Based on ARIA 1.2 combobox + listbox pattern. Arrow keys navigate, Enter selects, Escape closes. Combobox supports full text input.
- **Screen reader**: Listbox options announced with position and count. Active-descendant pattern used for focus management without moving DOM focus.
- **ARIA**: `role="combobox"` on the text field, `role="listbox"` on the options container, `aria-activedescendant` for virtual focus. Select uses native semantics.

## Strengths & Gaps
- **Best at**: Composability for Shopify's diverse app ecosystem; clean primitive separation (Listbox, Combobox, Autocomplete); pragmatic native-first Select.
- **Missing**: No built-in creatable/tagging mode; no option grouping/sections in Combobox; Autocomplete lacks built-in option creation; limited visual customization of Select.
