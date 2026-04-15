---
component: Combobox
tier: 3
last_verified: 2026-03-29
---

# Combobox — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — compose from Popover + Input | No Combobox primitive; teams manually wire ARIA roles, keyboard navigation, and filtering; maximum flexibility, significant implementation effort. | high |
| Chakra UI | Combobox (v3 only, via Ark UI) | Added in v3 using Ark UI headless primitives; controlled filtering (auto or manual); multi-select mode; v2 users need community package. | medium |
| GOV.UK | Not in core — community Accessible Autocomplete | Progressive-enhancement wrapper over native `<select>`; extensive AT testing; live region announces result count; not in govuk-frontend npm export. | medium |
| Base Web | Combobox | Controlled-first; freeform entry allowed; `mapOptionToString` for data normalization; Override system on all slots for custom option renderers. | high |
| Fluent 2 | Combobox | Multi-select with dismissible tags; grouped options with `OptionGroup`; custom option rendering for avatars/presence; strict WAI-ARIA 1.2 compliance. | high |
| Gestalt | ComboBox | Single-select only; controlled `inputValue`/`onInputChange` for async search; `noResultText` required; portal rendering for masonry layout compatibility. | high |
| Mantine | Combobox (primitive) | Composable sub-components (`Combobox.Target`, `.Dropdown`, `.Option`, `.Search`); `useCombobox()` store manages keyboard/open state; powers all higher-level selects. | high |
| Orbit | Not available — domain-specific airport search | Airport/city search too specialized for a generic combobox; simple Select used for bounded finite lists. | medium |
| Evergreen | Combobox | Async autocomplete support for large Segment data catalogs; built on Popover + Menu primitives; `itemToString` normalization; `openOnFocus` behavior. | high |
| Nord | Not available — medical terminology requires application-layer logic | Generic combobox inadequate for ICD codes/medication/procedure lookup; `<nord-select>` covers bounded-set selection; clinical autocomplete must be application-implemented. | high |

## Key Decision Patterns

Mantine's architectural decision to make Combobox a composable primitive that powers all higher-level select components (Select, MultiSelect, Autocomplete, TagsInput) is the most mature design pattern in the T3 set. Rather than maintaining separate ARIA implementations for each select-type component, a single Combobox primitive carries all keyboard navigation and ARIA logic. The `useCombobox()` store hook is the mechanism that makes this work without prescribing a visual structure. This is analogous to Radix's headless primitive approach but with a pre-built hook that eliminates the manual ARIA wiring Radix leaves to consumers.

Fluent 2 and Gestalt's contrast on multi-select reveals a fundamental design choice. Fluent 2 makes multi-select a built-in Combobox mode (the "people picker" with dismissible tags); Gestalt explicitly keeps Combobox single-select and requires composition with Tag for multi-select patterns. Gestalt's reasoning — that multi-select fundamentally changes the interaction model enough to warrant composition rather than a prop switch — is architecturally cleaner even though it requires more consumer work.

Nord's absence rationale is the most technically specific in the T3 set. The argument is not "we haven't needed a combobox" but "medical terminology selection (ICD codes, SNOMED, drug formularies) requires certified data services that make the UI shell trivial." This positions combobox as a problem that's 5% UI and 95% data service for their domain, which is an important framing for any healthcare team choosing UI components.

GOV.UK's community autocomplete package is the only T3 system with a live region that announces the number of search results as the user types ("2 results available"). This pattern directly addresses the screen reader experience of not knowing how many options exist until navigating into the list.

## A11y Consensus

- The ARIA combobox pattern requires `role="combobox"` on the input, `aria-expanded`, `aria-haspopup="listbox"`, `aria-autocomplete="list"`, `aria-controls` pointing to the listbox, and `aria-activedescendant` tracking the focused option — all T3 implementations that ship a combobox follow this pattern.
- Typing while the list is open filters options; filtered results should be communicated to screen readers via a live region announcing the count of available results — GOV.UK's community component is the reference implementation for this.
- Escape must close the dropdown and return focus to the input without selecting an option; Enter selects the focused option and closes.
- Multi-select dismissible tags must each have an accessible label describing what will be removed (e.g., "Remove Paris" not just "Remove").
- Radix and Nord document the full manual ARIA requirements in their absence rationale — these serve as the most explicit ARIA checklists for teams composing their own comboboxes.

## Recommended Use

Reference T3 combobox approaches when deciding on architecture (Mantine's composable primitive vs. Fluent 2's batteries-included vs. Radix's compose-from-scratch), multi-select strategy (Fluent 2's built-in tags vs. Gestalt's composition approach), and async search patterns (Evergreen and Gestalt both document async filtering well). GOV.UK's community accessible-autocomplete is the reference for progressive enhancement and screen reader result count announcements.
