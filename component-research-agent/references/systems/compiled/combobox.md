---
component: combobox
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — Exposed Dropdown Menu is constrained-select only
**Approach:** M3 has no distinct Combobox. The Exposed Dropdown Menu combines TextField input with a dropdown options list but does not support free-text values outside the options list — it is architecturally a filtered Select, not a true Combobox. No "create new option" pattern is documented. Mobile-first design leads M3 toward full-screen search/picker flows rather than inline dropdowns.
**Key Decisions:**
- [HIGH] No architectural separation: M3 treats typing-to-filter as a Select enhancement, not a distinct Combobox interaction model
- [HIGH] Free-text values not supported: typed text that doesn't match an option is not persisted — the closed-list semantic contract is preserved
- [MED] No "create new option" guidance: teams needing autocomplete with value creation have no M3 reference
**Notable API:** No Combobox component. `TextField` + `Menu` wired together as the closest composition; no pre-built component.
**A11y:** No prescribed ARIA Combobox pattern. Custom implementations must use `role="combobox"`, `aria-expanded`, `aria-controls`, and `aria-activedescendant` manually.
**Best at:** Nothing in the Combobox space — M3's focus on constrained selection leaves free-text + suggestions patterns unaddressed.
**Missing:** Free-text value entry, create-new-option affordance, ARIA combobox pattern documentation, and filtering behavior specification.

---

## spectrum
**Component:** ComboBox (distinct from Picker — most architecturally rigorous)
**Approach:** Spectrum makes the cleanest Combobox/Select split in Tier 1: `Picker` = constrained choice (no free text); `ComboBox` = suggestions + free text. `allowsCustomValue` prop distinguishes autocomplete mode (false, reverts to last valid selection on blur) from true free-text mode (true). Application manages filtering externally. Async support via `isLoading` + `onLoadMore`. Best ARIA Combobox implementation in Tier 1.
**Key Decisions:**
- [HIGH] ComboBox vs. Picker split as semantic contract: two separate components because the semantic contracts differ — Picker communicates "you must choose from these"; ComboBox communicates "suggestions provided, custom values allowed"
- [HIGH] `allowsCustomValue` controls the semantic model: false = autocomplete (reverts on blur); true = true Combobox (any value accepted) — one prop distinguishes two distinct interaction semantics
- [MED] External filtering: application manages `items` based on `inputValue` — complete control over filtering algorithm (fuzzy, prefix, substring) at the cost of more boilerplate
**Notable API:** `allowsCustomValue: boolean`; `inputValue`/`onInputChange`; `selectedKey`/`onSelectionChange` (separate from input text); `menuTrigger: "input" | "focus" | "manual"`; `isLoading`/`onLoadMore`
**A11y:** Full ARIA 1.1 Combobox pattern: `role="combobox"` + `aria-autocomplete="list"` + `aria-expanded` + `aria-controls` pointing to `role="listbox"` + `aria-activedescendant`. "N options available" announced on open. Most complete ARIA Combobox in Tier 1.
**Best at:** ARIA correctness and the `inputValue`/`selectedKey` separation that correctly models dual state — most architecturally rigorous Combobox in Tier 1.
**Missing:** Built-in client-side filtering (more boilerplate than Carbon); no built-in "create new option" affordance.

---

## carbon
**Component:** ComboBox (distinct from Dropdown — custom values by default)
**Approach:** Carbon explicitly documents when to use ComboBox vs. Dropdown in usage guidelines. ComboBox accepts custom values by default (unlike Spectrum's `allowsCustomValue=false` default). Built-in client-side substring filtering via `filterItems` prop (custom filter function). First-class `invalid`/`invalidText` validation props. Built on Downshift library; `downshiftProps` exposes underlying API as escape hatch.
**Key Decisions:**
- [HIGH] Custom values accepted by default: IBM configuration UIs need custom values by default (new hostnames, new tags); blocking custom values would prevent entering new resource names
- [HIGH] Built-in substring filtering: Carbon handles filtering automatically — the `filterItems` prop allows replacement but the default works for most IBM enterprise use cases
- [MED] `downshiftProps` escape hatch: exposes Downshift's full API for edge-case behavior — architectural transparency over complete abstraction
**Notable API:** `filterItems: (items, inputValue) => items[]`; `downshiftProps` for Downshift API access; `invalid`/`invalidText`; `initialSelectedItem`; `light: boolean`
**A11y:** ARIA 1.1 Combobox pattern via Downshift: `role="combobox"` + `aria-autocomplete="list"` + `aria-expanded` + `aria-activedescendant` + `role="listbox"`. Suggestion count announced on open.
**Best at:** Clear documentation of ComboBox vs. Dropdown use cases and developer-friendly defaults (built-in filtering, custom values accepted, form validation integration).
**Missing:** Visible "Create [value]" affordance for custom value entry — Carbon accepts custom values silently without a UI indicator that creation is occurring.

---

## polaris
**Component:** Combobox (compositional: TextField + Listbox)
**Approach:** Polaris's Combobox is a context provider that synchronizes a `Combobox.TextField` and a `Listbox` — the developer writes explicit JSX for both the input and options. `Listbox.Action` items create a visible "Create [typed value]" affordance — the clearest create-new UI in Tier 1. Application manages filtering. `allowMultiple` enables multi-select with Tag chips in the TextField prefix. No built-in async loading state.
**Key Decisions:**
- [HIGH] `Listbox.Action` for create affordance: renders a named option like "Create tag 'summer-2026'" as a visible list item — the most discoverable create-new-option UX in Tier 1
- [HIGH] Compositional architecture: Combobox is a context provider, not a rendered component; explicit TextField + Listbox JSX gives complete visual customization control without special render props
- [MED] Multi-select via Tag chips: selected values as Tags in TextField prefix area; the composition pattern handles Shopify Admin's product tag editing workflow
**Notable API:** `allowMultiple: boolean`; `onScrolledToBottom` for infinite scroll; `Listbox.Action` for create affordance; `Listbox.Section` for grouped options
**A11y:** `role="combobox"` on TextField; `role="listbox"` on Listbox; `aria-activedescendant` for virtual focus; `Listbox.Action` uses `role="option"` within the listbox flow (correct — not `role="button"`).
**Best at:** Create-new-option affordance via `Listbox.Action` — the most explicit and discoverable "Create" pattern in Tier 1, directly supporting Shopify Admin's tag creation workflow.
**Missing:** Built-in async loading state and automatic client-side filtering — both increase setup boilerplate.

---

## atlassian
**Component:** CreatableSelect (extension of Select — async + creation)
**Approach:** Atlassian implements Combobox capability as `CreatableSelect` — an extension of their Select component powered by React Select. The "Create [value]" option appears at the top/bottom of the filtered list. `onCreateOption` callback handles persistence. `isValidNewOption` prevents duplicate or invalid creations. `AsyncCreatableSelect` combines server-side filtering with creation — used in Jira's label and component pickers.
**Key Decisions:**
- [HIGH] CreatableSelect inherits all Select features: multi-value, option grouping, async loading, clearable state, custom option rendering — creates full richness from a mature Select base
- [HIGH] `isValidNewOption` for creation validation: prevents duplicate labels, reserved-name conflicts, and invalid character entries — essential for Jira's label taxonomy integrity
- [MED] `formatCreateLabel` for context-specific messaging: "Create label 'backend'" vs. "Add new component 'login-module'" — dynamic label with the typed value for unambiguous create intent
**Notable API:** `onCreateOption: (inputValue) => void`; `formatCreateLabel: (inputValue) => ReactNode`; `isValidNewOption: (inputValue, value, options) => boolean`; `createOptionPosition: "first" | "last"`; inherits all `@atlaskit/select` props
**A11y:** `role="combobox"` + `role="listbox"` via React Select; "Create [value]" option announced with full formatted label; multi-select selected values listed in accessible description.
**Best at:** Create-new with `isValidNewOption` validation and `AsyncCreatableSelect` for server-side taxonomies — the most complete implementation for Jira-style taxonomy management.
**Missing:** Clear guidance on when to use CreatableSelect vs. plain TextField for use cases that don't map to Jira's taxonomy management model.

---

## ant-design
**Component:** AutoComplete (text-input enhancement, not select enhancement)
**Approach:** Ant Design's AutoComplete is framed as text input with suggestions, not constrained selection with optional free text — the opposite framing from Carbon. The value is always what the user typed; suggestions are assistance, not constraints. Rich option rendering via ReactNode labels. `filterOption={false}` for server-side suggestions. `backfill` prop for URL-bar-style inline completion. Explicit documentation of AutoComplete vs. Select differences.
**Key Decisions:**
- [HIGH] Text-input-forward architecture: value is always the typed text regardless of suggestions — suggestions assist, never constrain; best suited to search and URL-bar interactions
- [MED] `filterOption={false}` for server-side mode: explicitly disables client-side filtering when server returns already-filtered results — cleaner than managing both client and server filtering simultaneously
- [MED] `backfill` inline completion: highlighted option fills the input as keyboard focus moves through options (URL-bar behavior); `aria-autocomplete="both"` reflects this correctly
**Notable API:** `options: [{value, label: ReactNode}]`; `filterOption: boolean | function`; `backfill: boolean`; `onSearch` for server-fetch trigger; `onSelect` (separate from `onChange`) for list-selection vs. typing distinction; `defaultActiveFirstOption: boolean`
**A11y:** `role="combobox"` + `aria-autocomplete="list"` (or "both" with `backfill`) + `aria-activedescendant`. Rich ReactNode option labels require meaningful `value` strings for screen reader announcements.
**Best at:** Search-style autocomplete with `filterOption={false}` for server-side suggestions and `backfill` for URL-bar interaction — the best Combobox for search-box use cases.
**Missing:** First-class "create new option" affordance — no `Listbox.Action` or `onCreateOption` equivalent; teams manually add a create item to the options array without standardized UI treatment.
