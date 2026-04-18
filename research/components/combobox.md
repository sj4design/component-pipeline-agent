---
component: combobox
date: 2026-04-17
mode: max
systems_analyzed: 24
systems_with_component: 18
scope: all patterns, no filtering
---

# Combobox — Research Document

## Systems Without Dedicated Component

| System | Reason | Workaround |
|--------|--------|------------|
| Material Design 3 | Exposed Dropdown Menu is constrained-select only; free-text not supported | Compose TextField + Menu manually; custom ARIA wiring required |
| REI Cedar | Native select recommended for shorter bounded lists | `<select>` for constrained choice; no combobox equivalent |
| Wise Design | No generic combobox; country/currency selectors are product-specific | Domain-specific custom pickers; no reusable component |
| Radix UI | No Combobox primitive; maximum flexibility, maximum implementation cost | Compose from Popover + Input; full manual ARIA wiring required |
| Orbit (Kiwi.com) | Airport/city search too specialized; city selection is domain-specific | `Select` for bounded finite lists; no generic autocomplete |
| Nord (Nordhealth) | Medical terminology lookup requires certified data services — UI is 5% of the problem | `<nord-select>` for bounded sets; clinical autocomplete must be application-implemented |

---

## How Systems Solve It

### Spectrum — "The architecturally purest Combobox/Select split"

Spectrum makes the clearest semantic distinction between `Picker` (constrained selection — the user MUST choose from the list) and `ComboBox` (suggestions + possible free text — the user CAN type anything). This split is not cosmetic — it reflects different semantic contracts that screen readers, forms, and backend validation must honor. The `allowsCustomValue` prop is the decisive axis: `false` means autocomplete mode (typed text reverts to last valid selection on blur, preserving a closed-list semantic); `true` means true free-text combobox mode (any value accepted). Application manages filtering externally, giving complete control over fuzzy, prefix, or substring algorithms at the cost of boilerplate. Async support is first-class via `isLoading` + `onLoadMore`.

**Design Decisions:**
- ComboBox vs. Picker as separate components: Why? — different semantic contracts require different ARIA roles, form behaviors, and user expectations. A ComboBox with `aria-autocomplete="list"` communicates something fundamentally different than a Picker with `aria-autocomplete="none"`. Impact: HIGH. Para tu caso: if your users can type new values, use ComboBox; if they must pick from a list, use Picker. Never merge them.
- `allowsCustomValue` controls the semantic model: Why? — autocomplete that reverts on blur prevents invalid form submissions; free-text mode allows new resource names, tags, custom queries. Impact: HIGH. Para tu caso: email fields and URL bars need `allowsCustomValue=true`; tag assignment from a taxonomy needs `false`.
- External filtering: Why? — prevents algorithm lock-in, supports fuzzy/ML-ranked suggestions, avoids double-filtering when server already returns sorted results. Impact: MED. Para tu caso: start with `filterOption` + `startsWith`; add fuzzy search when user feedback shows prefix matching feels too rigid.

**Notable Props:** `allowsCustomValue: boolean`; `inputValue`/`onInputChange`; `selectedKey`/`onSelectionChange` (separate from input text — critical distinction); `menuTrigger: "input" | "focus" | "manual"`; `isLoading`/`onLoadMore`

**Accessibility:** Full ARIA 1.1 Combobox: `role="combobox"` + `aria-autocomplete="list"` + `aria-expanded` + `aria-controls` → `role="listbox"` + `aria-activedescendant`. "N options available" announced on open. Most complete ARIA Combobox implementation in Tier 1.

---

### Carbon (IBM) — "Custom values by default, filtering built in"

Carbon's ComboBox accepts custom values by default — the opposite of Spectrum's conservative `allowsCustomValue=false` default — because IBM's primary Combobox use cases are configuration UIs where users type new hostnames, new tags, new resource names. Built-in client-side substring filtering via the `filterItems` prop (pass a custom function to replace; default substring works for most cases). Carbon's documentation explicitly explains when to use ComboBox vs. Dropdown (a rare example of a Tier 1 system publishing a "when NOT to use this component" guide). The underlying Downshift library is exposed via `downshiftProps` as a full escape hatch for edge-case behavior.

**Design Decisions:**
- Custom values accepted by default: Why? — IBM enterprise users configure cloud resources, Kubernetes namespaces, and API keys that don't exist in pre-populated lists. Blocking custom values creates friction for the primary use case. Impact: HIGH. Para tu caso: if users primarily select from existing options, default to Spectrum's model; if users need to create new values, adopt Carbon's default.
- Built-in substring filtering: Why? — reduces boilerplate for 80% of use cases; `filterItems` override handles the other 20% without forcing async architecture. Impact: HIGH.
- `downshiftProps` escape hatch: Why? — Downshift's full state machine is sometimes needed for multi-select, keyboard scroll anchoring, or virtual scrolling integration. Exposing it directly avoids fork-or-copy cycles. Impact: MED.

**Notable Props:** `filterItems: (items, inputValue) => items[]`; `downshiftProps`; `invalid`/`invalidText`; `initialSelectedItem`; `light: boolean`

**Accessibility:** ARIA 1.1 via Downshift: `role="combobox"` + `aria-autocomplete="list"` + `aria-expanded` + `aria-activedescendant`. Suggestion count announced on open.

---

### Polaris (Shopify) — "Compositional with the best create-new affordance"

Polaris's Combobox is unusual: it's a context provider, not a rendered component. The developer writes explicit JSX for both the `Combobox.TextField` (the input) and the `Listbox` (the options), while the Combobox context handles synchronization. This compositional architecture gives complete visual control — no render-prop gymnastics, no style override systems. The standout feature is `Listbox.Action`: a special list item that renders a visible "Create tag 'summer-2026'" affordance at the top or bottom of the option list — the most discoverable create-new UI in all Tier 1 systems. Multi-select is enabled via `allowMultiple`, with selected values displayed as Tag chips in the TextField prefix area.

**Design Decisions:**
- `Listbox.Action` for create affordance: Why? — Shopify Admin's product tag system requires users to create new taxonomy terms inline without breaking flow; a hidden custom value (Carbon's behavior) or a separate form (typical modal) both interrupt the workflow. Impact: HIGH. Para tu caso: if "create new item" is a primary user task, not an edge case, `Listbox.Action` pattern is the most discoverable solution.
- Compositional context provider: Why? — Shopify's Admin customization requirements vary per surface (search, form, bulk edit); a prescriptive rendered component would need too many escape hatches. Composition allows each surface to own its visual structure. Impact: HIGH.
- Multi-select via Tag chips in TextField prefix: Why? — the input remains the primary focus; selected items are visible but don't shift the user's interaction target to a separate pill container. Impact: MED.

**Notable Props:** `allowMultiple: boolean`; `onScrolledToBottom` for infinite scroll; `Listbox.Action` for create option; `Listbox.Section` for groups

**Accessibility:** `role="combobox"` on TextField; `role="listbox"` + `aria-activedescendant` for virtual focus; `Listbox.Action` correctly uses `role="option"` (not `role="button"`) within the listbox flow.

---

### Atlassian — "CreatableSelect: inheriting Select's full maturity"

Atlassian implements Combobox capability as `CreatableSelect` — an extension of their React Select-powered `Select` component. The "Create [value]" option is always a visible list item at the top or bottom of filtered results, controlled by `createOptionPosition`. The `isValidNewOption` callback is the key innovation: it can block duplicate labels, reserved names, and invalid characters before the create action fires — essential for Jira's label taxonomy where duplicates create tracking chaos. `AsyncCreatableSelect` combines server-side record lookup with creation in a single component, used in Jira's label, component, and sprint pickers.

**Design Decisions:**
- CreatableSelect extends Select: Why? — building on a mature Select base inherits multi-value, option grouping, async loading, clearable state, and custom option rendering without reinventing them. The cost is coupling to React Select's architecture. Impact: HIGH.
- `isValidNewOption` for creation validation: Why? — Jira has a regulated label taxonomy; "backend" and "Backend" are duplicates that create query failures; reserved words like "done" conflict with status labels. Server-side validation after creation is too late. Impact: HIGH.
- `formatCreateLabel` for dynamic messaging: Why? — "Create label 'backend'" is unambiguous; "Create" alone without the typed value forces the user to remember what they typed. Impact: MED.

**Notable Props:** `onCreateOption: (inputValue) => void`; `formatCreateLabel: (inputValue) => ReactNode`; `isValidNewOption`; `createOptionPosition: "first" | "last"`; inherits all `@atlaskit/select` props

**Accessibility:** `role="combobox"` + `role="listbox"` via React Select; "Create [value]" announced with full formatted label; multi-select values listed in accessible description.

---

### Ant Design — "Text-input-forward: suggestions assist, never constrain"

Ant Design's AutoComplete is architecturally inverted from Spectrum and Carbon: it's framed as a text input with suggestions, not a Select with optional free text. The semantic contract is always text-forward — the value is always what the user typed; suggestions are assistance, not constraints. This makes it the most appropriate Combobox model for search boxes, URL bars, and live-query UIs where "selecting an option" is just accepting a pre-filled suggestion. The `backfill` prop enables URL-bar-style inline completion where keyboard focus on a suggestion fills it into the input; `aria-autocomplete="both"` correctly describes this behavior.

**Design Decisions:**
- Text-input-forward semantics: Why? — Taobao and Alibaba's primary combobox use case is search-as-you-type; constraining users to a fixed option set breaks the open-ended search contract. The value must always be what the user intends, not what the system allows. Impact: HIGH. Para tu caso: for search inputs, use this model; for "choose from a taxonomy" use cases, use Spectrum/Carbon's select-extension model.
- `filterOption={false}` for server-side mode: Why? — when the server returns already-filtered/ranked results, client-side filtering creates duplicates and overrides ML ranking; disabling it explicitly is cleaner than fighting both systems. Impact: MED.
- `backfill` inline completion: Why? — URL bars and navigation autocompletes expect inline suggestion completion as arrow keys move through options; an option list without inline fill creates a disconnected experience. Impact: MED.

**Notable Props:** `options: [{value, label: ReactNode}]`; `filterOption: boolean | fn`; `backfill: boolean`; `onSearch`; `onSelect` (separate from `onChange`); `defaultActiveFirstOption`

**Accessibility:** `role="combobox"` + `aria-autocomplete="list"` (or `"both"` with backfill) + `aria-activedescendant`. Rich ReactNode option labels require meaningful `value` strings for screen reader announcements.

---

### Twilio Paste — "Downshift-based with first-class multi-select pills"

Paste's Combobox uses Downshift as its state machine foundation — the same library as Carbon — but exposes a more opinionated component API. Single and multi-select modes are first-class; in multi-select mode, selected items appear as removable pill tokens in the input area. Grouped option support via sections. Filter-as-you-type is built in with a default prefix-match that can be overridden. The Downshift foundation means the ARIA wiring is battle-tested and the keyboard behavior follows the ARIA Combobox pattern specification without deviation.

**Accessibility:** `role="combobox"` + `aria-expanded` + `aria-autocomplete="list"` + `aria-controls` + `aria-activedescendant`. Multi-select pills: each has `aria-label="Remove [item]"`. Result count announced on open.

---

### Salesforce Lightning — "CRM record lookup with server-side filtering"

Lightning's Combobox is purpose-built for CRM record lookup — searching across thousands of contacts, accounts, or opportunities where client-side filtering is not feasible. Server-side filtering is the primary mode; the component manages loading states and debounce. Multi-select pill mode allows selecting multiple records. The scope of the component is intentionally narrow: record lookup, not general-purpose filtering. Custom option rendering is supported for avatars and record type icons — typical for CRM results.

**Notable:** The most production-tested server-side filtering combobox in the set; used by Salesforce's own record lookup fields across all standard objects.

---

### GitHub Primer — "Dual pattern: Autocomplete (inline) vs. SelectPanel (modal-weight)"

Primer ships two distinct patterns solving the same underlying problem from different UX angles. `Autocomplete` is an inline single-select combobox — filter as you type, one selection, input inline in the form. `SelectPanel` is a panel-weight pattern — opens as a dialog, supports multi-select with search, more appropriate for label/assignee selection where multiple items need to be reviewed before committing. The separation reflects GitHub's actual use case split: issue title autocomplete uses Autocomplete; label picker and assignee picker use SelectPanel. Async loading is supported in both.

**Accessibility:** Both patterns implement `role="combobox"` (Autocomplete) and `role="dialog"` + internal search (SelectPanel). SelectPanel's dialog framing requires focus trap behavior — a heavier accessibility contract.

---

### shadcn/ui — "cmdk fuzzy search: command palette origins"

shadcn/ui's Combobox is a recipe, not a native component — built by composing `Command` (a cmdk wrapper with fuzzy search) inside a `Popover`. The cmdk library brings command-palette-style fuzzy matching to the dropdown, which results in more tolerant filtering than substring matching: "rct" matches "React" in cmdk's algorithm. This makes shadcn Combobox the best choice for apps with large option sets where strict prefix matching causes "I typed it and it didn't find it" frustration. The composition recipe requires more setup than an opinionated component API but is completely unstyled and Radix-primitive-compatible.

**Notable:** The combination of cmdk fuzzy search + Popover is the de facto pattern for Next.js/Tailwind apps. Extensive community adapters for React Hook Form integration.

---

### Mantine — "Composable primitive powering all higher-level selects"

Mantine's architectural decision is the most sophisticated in the Tier 3 set: Combobox is not a standalone component but a composable primitive that powers ALL of Mantine's higher-level select-type components — `Select`, `MultiSelect`, `Autocomplete`, and `TagsInput`. A single ARIA keyboard and focus management implementation, shared via `useCombobox()` hook and sub-components (`Combobox.Target`, `Combobox.Dropdown`, `Combobox.Option`, `Combobox.Search`), eliminates the problem of divergent keyboard behaviors across similar components. This is analogous to Radix's headless primitive approach but with a pre-built `useCombobox()` hook that eliminates manual ARIA wiring.

**Design Decisions:**
- Combobox as shared primitive: Why? — maintaining separate keyboard navigation logic for Select, MultiSelect, Autocomplete, and TagsInput creates four divergence points that must each be tested and updated separately. A single primitive collapses this to one. Impact: HIGH. Para tu caso: if you're building a design system that will have multiple select-type variants, adopting this architecture scales better than individual components.

**Accessibility:** `useCombobox()` manages `role="combobox"` + `aria-expanded` + `aria-activedescendant` + keyboard navigation as a shared implementation, ensuring all higher-level components inherit the same ARIA correctness.

---

### Fluent 2 (Microsoft) — "Multi-select with dismissible tags as built-in mode"

Fluent 2's Combobox makes multi-select a first-class built-in mode — not a prop that changes the component's rendering, but an architecturally supported mode with dismissible tag chips. Grouped options via `OptionGroup`. Custom option rendering for avatars and presence indicators — critical for Microsoft's "people picker" use case in Teams and Outlook where options represent users with photos and availability states. Strict WAI-ARIA 1.2 compliance (the most current specification). The design contrast with Gestalt is intentional: Fluent builds multi-select in; Gestalt requires composition.

**Accessibility:** WAI-ARIA 1.2 Combobox pattern (the strictest in the set). Multi-select: selected items as dismissible tags with `aria-label="Remove [item]"`. Virtual focus via `aria-activedescendant`.

---

### Gestalt (Pinterest) — "Single-select only; multi-select requires composition"

Gestalt's ComboBox is explicitly single-select only. The architectural rationale is that multi-select changes the interaction model fundamentally enough to warrant composition (Combobox + separate Tag components) rather than a prop switch. The result is a simpler core component with completely controlled `inputValue`/`onInputChange` for async search patterns — Pinterest's primary use case is searching pin boards and interest taxonomies server-side. `noResultText` is required (not optional) — a rare enforcement of accessible empty-state messaging. Portal rendering is supported for Masonry layout compatibility.

**Accessibility:** `role="combobox"` + `aria-autocomplete="list"` + `aria-activedescendant`. Portal rendering does not break the ARIA `aria-controls` relationship because the IDs are stable regardless of DOM position.

---

### GOV.UK — "Progressive enhancement + screen reader result count"

GOV.UK's Accessible Autocomplete is a community package (not in core govuk-frontend), built as a progressive-enhancement wrapper over a native `<select>` — when JavaScript is unavailable, the native select still functions. The standout accessibility innovation is a live region that announces the number of matching results as the user types: "2 results available." This is the only implementation in all 24 systems that proactively communicates result count to screen reader users, addressing the problem of navigating blind into an unknown number of options. Extensive AT testing across JAWS, NVDA, VoiceOver.

**Accessibility:** Progressive-enhancement baseline (native `<select>` as fallback). Live region announces result count on each filter change. AT testing is the most thorough in the set.

---

### Base Web — "Controlled-first with full Override system"

Base Web's Combobox is controlled-first: all state (input value, open state, selected option) lives in the consumer. `mapOptionToString` normalizes non-string option data (objects with labels) to string values — a pragmatic solution for object-shaped option arrays without requiring custom render functions just for normalization. The Override system allows replacing any internal element with a custom component, making Base Web Combobox the most customizable in the set at the cost of a steeper API surface.

**Accessibility:** `role="combobox"` + `aria-expanded` + `aria-controls` + `aria-activedescendant`. Override system preserves ARIA roles when custom renderers are used.

---

### Evergreen (Segment) — "Async autocomplete for large data catalogs"

Evergreen's Combobox targets Segment's core use case: searching across large event property and attribute catalogs where the full option set cannot be loaded client-side. Async option loading is the primary mode. Built on Popover + Menu primitives (composition visible in implementation). `itemToString` for data normalization. `openOnFocus` for search-field-style behavior where the dropdown opens immediately on focus without requiring a character to be typed.

**Accessibility:** `role="combobox"` + `aria-autocomplete="list"` + `aria-controls`. `openOnFocus` announced via `aria-expanded="true"` immediately on focus.

---

### Chakra UI — "v3 addition via Ark UI headless primitives"

Chakra v3 adds Combobox support through Ark UI headless primitives. Controlled filtering (auto or manual mode). Multi-select mode available. v2 users need a community package — this version split creates a fragmented ecosystem. The Ark UI foundation means keyboard and ARIA behavior matches Chakra's other form components consistently.

---

### Playbook (Power Home Building Group) — "Typeahead for enterprise configuration"

Playbook ships Typeahead/Combobox for filterable selection across React and Rails surfaces. Enterprise configuration UI focus — team member selection, role assignment, location filtering.

---

### Dell Design System — "Enterprise IT configuration filterable selection"

Dell's Combobox targets IT configuration: server names, network addresses, OS types. Filterable selection from enterprise resource lists. Low additional documentation beyond the core combobox pattern.

---

## Pipeline Hints

**Archetype recommendation:** form-control
Rationale: Combobox is an enhanced form input — it submits a value, participates in form validation, and maintains a controlled state similar to `<input>` + `<select>` combined. The distinction from `container` or `composite-overlay` is that the user's primary goal is VALUE ENTRY, not content layout. All 18 implementing systems treat it as a form control.

**Slot consensus:** (18 systems with component)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| input / trigger | text | yes | 18/18 | The text input; always present |
| dropdown / listbox | container | yes | 18/18 | The options panel; role="listbox" |
| option | item | yes | 18/18 | Individual option; role="option" |
| option-group / section | container | no | 10/18 | Labeled group of options; Polaris, Primer, Lightning, Paste, Fluent 2, shadcn, Carbon, Mantine, Gestalt, Ant |
| create-option | item | no | 5/18 | "Create [value]" affordance; Polaris, Atlassian, Polaris, Chakra (via Ark), Mantine |
| selected-pill / tag | item | no | 5/18 | Multi-select removable chip; Lightning, Paste, Fluent 2, Chakra, Polaris |
| loading-indicator | icon | no | 6/18 | Spinner in input/dropdown; Spectrum, Carbon, Lightning, Primer, Evergreen, Gestalt |
| empty-state / no-results | container | no | 8/18 | Empty state message; Gestalt (required), shadcn, Primer, Paste, Mantine, Carbon, Fluent 2, Evergreen |
| clear-button | icon-action | no | 7/18 | × to clear selection; Spectrum, Carbon, Atlassian, Fluent 2, Mantine, Ant, Base Web |
| prefix-icon | icon | no | 5/18 | Leading icon in input; Carbon, Lightning, Playbook, Dell, shadcn |
| helper-text | text | no | 4/18 | Below-input hint; Carbon, Spectrum, Paste, Fluent 2 |
| error-message | text | no | 5/18 | Validation error; Carbon, Spectrum, Paste, Fluent 2, Polaris |
| label | text | yes | 18/18 | Always required for accessibility |
| result-count-live-region | text | no | 1/18 | GOV.UK only — announces count of matching results |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| size | variant | sm / md / lg | 10/18 | Spectrum, Carbon, Paste, Lightning, Mantine, Fluent 2, Primer, Ant, Evergreen, Base Web |
| state | state | default / hover / focus / open / disabled / loading / error / invalid | 18/18 | Universal |
| allowsCustomValue / freeform | boolean | true / false | 8/18 | Spectrum, Base Web, Carbon (default true), Chakra, Mantine, Ant (always true), Fluent 2 |
| multiSelect / allowMultiple | boolean | true / false | 6/18 | Lightning, Paste, Fluent 2, Chakra, Polaris, Shadcn recipe |
| menuTrigger | variant | input / focus / manual | 3/18 | Spectrum, Evergreen, Gestalt (openOnFocus) |
| filterOption | variant | client / server / external | 12/18 | Carbon/shadcn=client; Spectrum/Polaris/Gestalt=external; Lightning/Primer/Evergreen=server |
| isLoading | boolean | true / false | 7/18 | Spectrum, Carbon, Lightning, Primer, Evergreen, Paste, Gestalt |
| clearable | boolean | true / false | 7/18 | See clear-button slot |
| grouping | boolean | true / false | 10/18 | See option-group slot |
| readOnly | boolean | true / false | 4/18 | Spectrum, Carbon, Fluent 2, Base Web |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| allowsCustomValue | 8/18 | false (Spectrum) / true (Carbon) | Key semantic split — autocomplete vs free-text mode |
| allowMultiple / multiSelect | 6/18 | false | Multi-select with pill tokens |
| isLoading | 7/18 | false | Async loading indicator |
| isDisabled | 18/18 | false | Universal |
| isReadOnly | 4/18 | false | No interaction but value visible |
| isInvalid / invalid | 8/18 | false | Error state with message |
| clearable | 7/18 | false | Clear button visibility |
| openOnFocus | 3/18 | false | Opens dropdown immediately on focus |
| backfill | 1/18 | false | Ant Design — URL-bar inline suggestion fill |
| showResultCount | 1/18 | false | GOV.UK — live region with match count |
| grouped | 10/18 | false | Option group sections |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 18/18 | standard input appearance | |
| hover | 14/18 | border highlight | |
| focus | 18/18 | focus ring on input | |
| open | 18/18 | dropdown visible, aria-expanded=true | |
| option-hover | 18/18 | option background highlight | |
| option-selected | 18/18 | checkmark or highlighted option | |
| disabled | 18/18 | reduced opacity, no interaction | |
| loading | 7/18 | spinner in input or dropdown | async data fetch |
| invalid / error | 8/18 | red border + error message | form validation |
| empty / no-results | 8/18 | empty state message in dropdown | |
| multi-selected | 6/18 | pill tokens in input prefix | |
| read-only | 4/18 | value visible, no editing | |

**Exclusion patterns found:**
- disabled × open — 18/18 systems (universal: disabled combobox cannot open)
- disabled × hover/focus — 18/18 (no interaction states when disabled)
- loading × error — 9/18 (loading supersedes error during async; error shows after response)
- readOnly × loading — 4/4 systems with both (read-only never triggers async loading)
- multi-select × backfill — 1/1 (Ant's backfill is incompatible with multi-select mode)

**Building block candidates:**
- input → `.ComboboxInput` — 18/18 systems (always a distinct, styled text input element)
- listbox → `.ComboboxListbox` / `.ComboboxDropdown` — 18/18 systems (always a distinct dropdown panel)
- option → `.ComboboxOption` — 18/18 systems (always a distinct option item with states)
- option-group → `.ComboboxGroup` — 10/18 systems use formal sub-component or labeled section
- multi-pill → `.ComboboxTag` / `.SelectedPill` — 6/18 systems with multi-select have a distinct pill token component
- create-option → `.ComboboxAction` — 5/18 systems with Polaris's `Listbox.Action` being the reference

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| menuTrigger | input, focus, manual | 3/18 | When dropdown opens |
| filterMode | client, server, external | 12/18 | Who manages filtering |
| createOptionPosition | first, last | 2/18 | Atlassian — where create option appears |
| autocomplete | list, none, both | 5/18 | ARIA aria-autocomplete value — "both" for backfill |

**A11y consensus:**
- Primary role: `role="combobox"` on the input element (18/18 consensus)
- Required ARIA: `aria-expanded`, `aria-autocomplete="list"`, `aria-controls` (points to listbox id), `aria-activedescendant` (points to focused option id), `aria-haspopup="listbox"`
- Listbox: `role="listbox"` on dropdown panel; `role="option"` on each item; `aria-selected="true"` on selected option
- Multi-select pills: each pill requires `aria-label="Remove [item name]"` on its dismiss button (NOT just "Remove")
- Keyboard: `Type` → filter; `↑↓` → navigate options; `Enter` → select and close; `Escape` → close without selecting; `Backspace` → remove last pill (multi-select)
- Result count: GOV.UK pattern — `aria-live="polite"` region announces "N results available" on each filter change (reference implementation for maximum accessibility)
- Empty state: must be announced — silent empty dropdown = screen reader silence = user confusion
- Focus: NO focus trap — Escape closes and returns focus to input; focus does NOT enter the listbox (virtual focus via `aria-activedescendant`)
- APG pattern: [ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- Custom values: when `allowsCustomValue=true`, announce on blur: "Custom value 'X' entered" via aria-live OR aria-label update

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template — same Base component, configured with booleans | Same component set, different boolean combos |
| 40–70% | Extension — shared shell + `contentType` prop or extra slots | Same component set with additional variant property |
| < 40% | Separate component — different section in library | Own component set |
| Different semantics | NOT this component — belongs elsewhere | Different component entirely |

**Types found:**

| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Autocomplete (single, client filter) | 100% | Template | `multiSelect=false`, `filterMode=client`, `allowsCustomValue=false` | Carbon, Paste, Fluent 2, Mantine, Chakra, Dell |
| Autocomplete (single, server filter) | 95% | Template | `filterMode=server`, `isLoading=true` | Lightning, Primer, Evergreen, Gestalt |
| Free-text combobox | 90% | Template | `allowsCustomValue=true` — typed value always accepted | Spectrum (explicit prop), Ant (always), Base Web |
| Multi-select combobox | 75% | Extension | adds `selectedPills` slot, `allowMultiple=true`, Backspace removes | Lightning, Paste, Fluent 2, Chakra, Polaris |
| CreatableSelect / Create-new | 80% | Extension | adds `createOption` slot, `onCreateOption` callback, `isValidNewOption` | Polaris, Atlassian, Carbon (implicit), Mantine |
| Search-style / no constraint | 85% | Template | `allowsCustomValue=true`, `filterOption=false`, no selection concept | Ant AutoComplete, shadcn Command |
| SelectPanel (dialog-weight) | 30% | Separate | opens as dialog, focus trap, multi-select with review before commit | Primer SelectPanel, shadcn Command palette |
| Select (constrained) | 0% | NOT this — belongs in Select component | no free-text entry; closed-list semantic | M3 Exposed Dropdown, all native `<select>` |
| TagsInput | 60% | Extension | adds tag creation on Enter, removes pills on Backspace | Mantine TagsInput, Polaris multi-mode |
| Record lookup (CRM) | 70% | Extension | server-side filtering, avatar in options, object-shaped values | Lightning, Primer SelectPanel |

---

## What Everyone Agrees On

1. **`role="combobox"` on the input, never on the container**: The text field is the combobox, not its wrapper. All 18 implementing systems place the ARIA role on the `<input>` element. Placing it on a `<div>` wrapper is a common mistake that causes screen readers to not announce the combobox state.

2. **Virtual focus, not DOM focus**: When the user presses ↓ to navigate the dropdown, DOM focus stays on the input; the "focus" illusion is created via `aria-activedescendant` pointing to the visually highlighted option. Moving DOM focus into the listbox requires the user to tab back to the input to continue typing — all systems agree this is wrong.

3. **Escape closes without selecting**: Pressing Escape must close the dropdown and return the input to its pre-open value without selecting any option. Systems that select the highlighted option on Escape break the predictable keyboard contract.

4. **Multi-select pills need specific remove labels**: `aria-label="Remove [item name]"` is required on each pill's dismiss button — "Remove" alone is meaningless to screen reader users who can't see what they're removing.

5. **Empty states must be communicated**: A silent empty dropdown when no options match is a screen reader failure — users don't know if the search is running, failed, or genuinely empty. All systems document empty state treatment even if not all implement it consistently.

6. **Combobox ≠ Select**: A Combobox that reverts to the last valid selection on blur is architecturally a Select with a filter affordance, not a true Combobox. Spectrum's `allowsCustomValue` prop is the cleanest expression of this distinction — systems that blur it create user confusion about whether they can enter new values.

---

## Where They Disagree

**"¿Should your Combobox accept values not in the list?"**
- Option A (Spectrum default, Polaris, Atlassian): No — revert to last valid selection on blur. Closed-list semantic preserved. Screen readers and form validators know the value is always valid.
- Option B (Carbon default, Ant, Base Web, Mantine): Yes — typed text is always the value. Open-list semantic for resource creation and search.
- Para tu caso: Use Option A when the value must come from a controlled taxonomy (user assignment, category, status). Use Option B when users need to create new values (tags, hostnames, custom queries).

**"¿Should filtering happen client-side or server-side?"**
- Option A (Carbon, shadcn/cmdk, Paste): Built-in client-side filtering. Low setup, works for small/medium option sets. Fuzzy (cmdk) or substring (Carbon) algorithms.
- Option B (Spectrum, Polaris, Gestalt, Base Web): External/controlled filtering. Application manages `items` state. Full algorithm control (fuzzy, ML-ranked, multi-field). More boilerplate.
- Option C (Lightning, Primer, Evergreen): Server-side async. Debounced query → API → results. Required for >500 options or dynamic datasets.
- Para tu caso: <100 options → client; 100–500 options → client with virtualized list; >500 or dynamic → server-side.

**"¿Should multi-select be built in or composed?"**
- Option A (Fluent 2, Lightning, Paste, Chakra): Multi-select is a `multiSelect` prop on the same component. Consistent ARIA, less setup.
- Option B (Gestalt): Single-select only; multi-select requires composing Combobox + Tag. Simpler core, cleaner interaction model separation.
- Para tu caso: If multi-select is a primary use case (people picker, label assignment), build it in. If it's rare, composition keeps the core simpler and easier to test.

**"¿Should create-new have a visible affordance or accept silently?"**
- Option A (Polaris, Atlassian): Visible "Create [value]" item in the option list. Discoverable, explicit, reduces user uncertainty about whether custom values are accepted.
- Option B (Carbon): Accepts custom values silently. Cleaner UI but users don't know new items are being created until after blur.
- Para tu caso: If users are unfamiliar with the workflow (new users, infrequent action), visible affordance reduces support load. If power users always know custom values are accepted, silent mode reduces visual noise.

**"¿Should the dropdown open on focus or on typing?"**
- Option A (Spectrum `menuTrigger="input"`, most systems): Opens on first character typed. Avoids spurious dropdown opening when tabbing through a form.
- Option B (Evergreen `openOnFocus`, GOV.UK, shadcn): Opens immediately on focus, showing all options. Better for short option lists where browsing is valuable.
- Para tu caso: Long option lists → open on type (avoid overwhelming users with all options). Short option lists → open on focus (benefit from browsing before filtering).

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|------------|---------|------------|
| Standard single-select | Input + dropdown below, options listed | Most combobox use cases | All 18 systems |
| Multi-select pills | Selected items as dismissible pill tokens in input prefix area | Multiple selections (tags, assignees) | Lightning, Paste, Fluent 2, Chakra, Polaris |
| Create-new action item | "Create [typed value]" as visible list item | Tag creation, taxonomy extension | Polaris, Atlassian, Mantine |
| Grouped options | Section headers between option groups | Categorized large option sets | 10/18 systems |
| Async loading skeleton | Loading spinner while server fetches options | Server-side filtering with latency | Lightning, Primer, Evergreen, Gestalt |
| SelectPanel / dialog-weight | Multi-select in an overlay dialog with search and commit | Label/assignee pickers with review step | Primer SelectPanel, shadcn Command |
| URL-bar backfill | Typed option text fills input inline as arrow keys move | Search bars, URL inputs | Ant Design (backfill prop) |

```
Standard Single-Select Combobox:
┌────────────────────────────────┐
│ 🔍 [typed text          ] [×] │  ← input (role="combobox")
└────────────────────────────────┘
┌────────────────────────────────┐
│ ▶ Option Group 1               │
│   ● Option A        ✓         │  ← selected (aria-selected=true)
│   ○ Option B                   │  ← focused (aria-activedescendant)
│ ▶ Option Group 2               │
│   ○ Option C                   │
│   + Create "typed text"        │  ← create affordance (Polaris/Atlassian)
└────────────────────────────────┘

Multi-Select Combobox with Pills:
┌────────────────────────────────────────────┐
│ [Tag 1 ×] [Tag 2 ×] [typed text    ] [×] │
└────────────────────────────────────────────┘
                                               ↑ each pill: aria-label="Remove Tag 1"

SelectPanel (dialog-weight, Primer):
┌─────────────────────────────┐
│ Filter labels         [×]   │
│ ┌───────────────────────┐   │
│ │ 🔍 Search...          │   │
│ └───────────────────────┘   │
│ ☐ bug                       │
│ ☐ documentation             │
│ ☑ enhancement               │
│ ☐ help wanted               │
│ [Apply]             [Cancel]│
└─────────────────────────────┘
```

---

## Risks to Consider

**Combobox ≠ Select confusion** (HIGH) — Using a Combobox when the user must choose from a closed list creates form validation failures when users type free text that doesn't match any option. The semantic contract matters to server-side validation. Mitigation: Use Spectrum's model — decide whether `allowsCustomValue` should be `true` or `false` before building; communicate the choice to users via placeholder text ("Type to filter" vs. "Type to search or create new").

**Multi-select remove button inaccessibility** (HIGH) — `aria-label="Remove"` on pill dismiss buttons is among the most common accessibility failures in combobox implementations. Screen reader users hear "Remove, Remove, Remove" without knowing WHICH item. Mitigation: Always `aria-label="Remove [item name]"` — this is WCAG 2.5.3 (Label in Name) and typically flagged in axe-core audits.

**Virtual focus not communicated** (HIGH) — When users press ↓ to navigate options, screen readers need `aria-activedescendant` to update on the input element, pointing to the focused option's ID. If IDs are generated dynamically (React re-renders), option IDs must be stable per item (not based on render index). Mitigation: Use stable, content-based IDs (`option-${value}`) not index-based IDs (`option-${index}`).

**Result count not announced** (MEDIUM) — When filtering, sighted users can see "3 of 20 options remaining" visually; screen reader users can't. GOV.UK's live region is the only system that solves this. Mitigation: Add `role="status"` region that announces result count on filter change (debounced to avoid spam): "3 results available."

**Empty state silent failure** (MEDIUM) — If the dropdown closes silently or stays open with a visually empty list when no options match, screen reader users don't know whether to continue typing, try different terms, or wait for loading. Mitigation: Always render a text empty state ("No options found" / "No results for 'X'") and announce it via `aria-live`.

**`filterOption={false}` with client-side component** (LOW) — Using server-side filtering with a client-side combobox requires disabling built-in filtering or options will be double-filtered (component filters already-filtered server results). Mitigation: Explicitly pass `filterOption={false}` (Ant) or use `items` as controlled state (Spectrum/Gestalt) to avoid double-filter.

---

## Dimension Scores

| Dimension | Score | Notes |
|-----------|-------|-------|
| Adoption | 9/10 | 18/24 systems — one of the most widely implemented form controls |
| Documentation quality | 8/10 | Spectrum, Carbon, GOV.UK have especially detailed when-to-use guidance |
| A11y quality | 7/10 | Most follow ARIA 1.1; GOV.UK community package is ARIA 1.2 + live region; Ant Design requires careful `value` string setup |
| Implementation complexity | 6/10 | One of the harder form components to implement correctly (ARIA + keyboard + virtual focus) |
| Multi-system consensus | 7/10 | Core ARIA pattern is universal; multi-select, create-new, and filtering strategy diverge significantly |
| Create-new support | 5/10 | Only 5/18 have built-in create affordance; Carbon accepts silently; many have nothing |

---

## Next Steps

```
/spec combobox          → generate outputs/combobox-config.json
/enrich combobox        → add a11y tokens + interaction spec
/build combobox         → full pipeline (research → spec → enrich)
/build combobox --max   → use pre-generated data, no questions
/research combobox --fresh → regenerate this document from scratch
```
