---
system: Polaris (Shopify)
component: Combobox (composition of TextField + Listbox)
url: https://polaris.shopify.com/components/combobox
last_verified: 2026-03-28
---

# Combobox

## Approach
Polaris's Combobox is architecturally notable for being explicitly compositional: it is built from two separate public components, TextField and Listbox, wired together through the Combobox component's context. This design reflects Polaris's component philosophy of building from composable primitives rather than monolithic components with extensive prop APIs. The Polaris docs document this separation explicitly — Combobox provides the context and behavior layer, TextField provides the input surface, and Listbox provides the options dropdown. This means that the visual appearance of both the input and the options can be extensively customized by using different Polaris TextField props or by composing custom Listbox.Option elements. In Shopify Admin's use cases, Combobox appears in product tag selection (type to filter and create new tags), inventory location selection, and customer search (type to search and add customers from a known set or by free text). The create-new-option pattern is particularly important for tags, which is a primary Combobox use case in Shopify Admin.

## Key Decisions
1. **Explicit compositional architecture (TextField + Listbox)** (HIGH) — The Polaris Combobox component is a context provider, not a fully-rendered component. The developer writes: `<Combobox><Combobox.TextField ... /><Listbox>...</Listbox></Combobox>`. This gives complete control over both the input surface and the options layout while the Combobox context handles state synchronization, keyboard navigation, and ARIA attributes. The cost is more JSX boilerplate than monolithic implementations like Carbon's ComboBox, but the benefit is that custom option renderings (options with descriptions, options with icons, option groups) require no special "custom render" props — they are just regular Listbox children.
2. **Action items within the Listbox for "create new" affordance** (HIGH) — Polaris's Listbox supports `Listbox.Action` items — special options that trigger an action rather than selecting a value. The "Create [typed value]" option that appears at the bottom of the filtered list when no exact match exists is implemented as a `Listbox.Action`. This is the cleanest implementation of the create-new-option pattern in Tier 1: the affordance is a visible, named list item that makes the capability discoverable and the intent clear. Users can see "Create tag 'summer-2026'" and click it, rather than just pressing Enter on a custom value with no visible affordance.
3. **Application-managed filtering** (MEDIUM) — Like Spectrum, Polaris does not handle client-side filtering within the Combobox component. The application must filter the Listbox options based on the current text field value. This is a consistent Polaris pattern: the component manages behavior and ARIA, the application manages data. The documentation includes clear example code showing how to filter an options array based on `inputValue`, which reduces the practical burden of this requirement.
4. **Multi-selection via tag input pattern** (MEDIUM) — Polaris documents a multi-select Combobox pattern that uses Tag components inside the TextField's prefix area to display selected values, with the text input for adding more. This is the standard "multi-select with tag chips" pattern. The implementation is compositional — Tags are added to TextField's `prefix` prop rather than being a separate Combobox variant. This pattern directly addresses Shopify Admin's product tag editing workflow.
5. **No built-in async loading state** (LOW) — Unlike Spectrum's `isLoading` prop, Polaris's Combobox does not have built-in async loading state. For server-side search (e.g., searching a large customer database), teams must add their own loading indicator within the Listbox area. This is a functional gap in the component relative to Spectrum and Ant Design.

## Notable Props
- `allowMultiple`: On the `Combobox` wrapper — enables multi-selection mode (though the multi-select behavior is primarily implemented through application logic and Tag components in the TextField prefix, this prop signals to the ARIA implementation that multiple values can be selected).
- `onScrolledToBottom`: Callback for implementing infinite scroll loading of more options — partial async support through scroll detection, but without a loading state indicator.
- `Listbox.Action`: A special Listbox child component that renders a selectable action item rather than a data option — the primary mechanism for "create new" affordances.
- `Listbox.Section`: Groups options within the Listbox under a header label — important for Comboboxes with categorized option sets.

## A11y Highlights
- **Keyboard**: Arrow Down from the TextField opens the Listbox and moves virtual focus (via `aria-activedescendant`) to the first option, while keeping actual DOM focus in the TextField. Arrow Up/Down moves virtual focus through options. Enter selects the virtually-focused option or triggers a `Listbox.Action`. Escape closes the Listbox.
- **Screen reader**: The TextField has `role="combobox"` with `aria-expanded` and `aria-controls` pointing to the Listbox. As virtual focus moves through options via keyboard, `aria-activedescendant` is updated and the option label is announced by the screen reader. Selected tags in multi-select mode are announced in the TextField's accessible description.
- **ARIA**: `role="combobox"` on the TextField wrapper, `role="listbox"` on the Listbox, `role="option"` on each Listbox.Option with `aria-selected`. The `Listbox.Action` items use `role="option"` rather than `role="button"`, which correctly keeps them within the listbox navigation flow.

## Strengths & Gaps
- **Best at**: The create-new-option pattern via `Listbox.Action` — Polaris has the most explicit and discoverable implementation of the "create new" affordance, which is the most important differentiating feature of Combobox over Select for Shopify Admin's tag and label workflows.
- **Missing**: Built-in async loading state and automatic client-side filtering — both require application-level implementation, which increases setup cost relative to Carbon's more opinionated Combobox.
