---
system: Material Design 3
component: Not distinct — Exposed Dropdown Menu allows typing but is architecturally Select
url: https://m3.material.io/components/menus/guidelines
last_verified: 2026-03-28
---

# Combobox (Architectural Overlap with Select in M3)

## Approach
Material Design 3 does not have a distinct Combobox component separate from its dropdown/select pattern. M3's Exposed Dropdown Menu (the pattern that combines a TextField with a dropdown menu of options) does support text input in the field — users can type to filter the visible options — but architecturally it is still a constrained-options select pattern, not a true Combobox. The core distinction between Combobox and Select is whether the user can submit a value that is not in the options list (free-text entry). M3's Exposed Dropdown Menu does not support this: the value must be selected from the options, and free-text that does not match an option either filters to an empty state or is not persisted. Google's own products rarely present true Combobox needs because Google Search (the free-text + suggestion pattern) is handled entirely by custom search implementations, not M3 components, and Google Workspace apps use text fields for open-ended entry and separate pickers for constrained selection.

## Key Decisions
1. **No architectural separation between Select and Combobox** (HIGH) — M3 treats "typing to filter options" as a UX enhancement to the select pattern, not a fundamentally different interaction model. The underlying data model is still "choose from a defined list" — the typing filters the visible options but does not allow entering a value outside the list. This is the key difference from systems like Carbon or Spectrum that draw an explicit architectural line between constrained (Select/Dropdown/Picker) and free-text (Combobox/AutoComplete) patterns.
2. **TextField + Menu as the composition model** (HIGH) — M3's approach to Exposed Dropdown is to pair a TextField (for the typed input) with a Menu (for the dropdown options list). This composition model is documented but not provided as a pre-built component in the reference implementations — teams are expected to wire the TextField's `onChange` to filter the Menu's items. The lack of a pre-built component increases implementation effort but provides flexibility in how filtering is applied.
3. **No "create new option" pattern documented** (HIGH) — One of the defining features of a true Combobox is the ability to create a new option from free text input (e.g., adding a new tag by typing it and pressing Enter). M3 provides no guidance or component support for this pattern. Teams who need it must build entirely custom solutions with no M3 precedent to reference.
4. **Mobile-first focus impacts discoverability** (MEDIUM) — On Android, the equivalent of a Combobox is often implemented as a full-screen search/picker flow rather than an inline dropdown, because small screens make dropdown filtering uncomfortable. M3's component set reflects this mobile preference, which means the web/desktop Combobox use case is underserved.

## Notable Props
- No dedicated component exists; no props applicable.
- Relevant component: `TextField` with `leadingIcon` and a separate `Menu` component wired together for the closest approximation.

## A11y Highlights
- **Keyboard**: Not applicable for a defined component. Manual implementations must follow the ARIA Combobox pattern: `role="combobox"` on the input with `aria-expanded`, `aria-activedescendant` pointing to the highlighted option, and `aria-controls` pointing to the listbox.
- **Screen reader**: Not applicable — no official implementation. Custom implementations must announce the listbox state (open/closed) and the currently highlighted option.
- **ARIA**: The ARIA Combobox pattern (aria-autocomplete, role="combobox", role="listbox") must be implemented manually. M3 provides no guidance on this.

## Strengths & Gaps
- **Best at**: Nothing in the Combobox space specifically — M3's focus on constrained selection means it does not address free-text-with-suggestions patterns at all.
- **Missing**: The entire Combobox interaction model: free text entry, create-new-option affordance, ARIA combobox pattern documentation, and filtering behavior specification — all absent, leaving teams with no official M3 reference for these common patterns.
