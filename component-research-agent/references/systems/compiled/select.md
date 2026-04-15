---
component: select
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Select — All Systems Digest

## Material Design 3
**Approach**: Select treated as a specialized text field, not a standalone primitive. Uses filled/outlined text field visual DNA — same label animation, tokens, container shapes. Intentionally no search/filtering (that's autocomplete). Listbox ARIA pattern over native `<select>`.
**Key decisions**:
- Built on text field variants for unified form affordances; users see consistent behavior across inputs and selects
- `role="listbox"` not `role="combobox"`; pure pick-from-list doesn't allow freeform typing, keeping ARIA semantics honest
- No built-in search; searchable selection is a separate component (autocomplete), preventing scope creep
**Notable API**: `quick` (opens on pointerdown for power users); `typeaheadDelay` (keyboard type-to-select speed, varies by user ability); `value`/`data-value`
**A11y**: Collapsible dropdown listbox pattern; aria-expanded on trigger; type-ahead character matching; option count and position conveyed.
**Best at**: Visual consistency with text fields in form-heavy UIs. **Missing**: No multi-select, no filtering, no async loading.

## Spectrum (Adobe)
**Approach**: Picker (simple pick-one) and ComboBox (filterable) as separate components with different ARIA roles. Both adapt to mobile tray rendering. React Aria headless hooks (`useSelect`/`useComboBox`) power both.
**Key decisions**:
- Picker vs. ComboBox split; different ARIA roles (listbox vs. combobox); combining into one component with isSearchable creates ambiguous UX
- Mobile tray rendering for both; popovers unusable on tablets/phones where creative tools are used
- Async loading (`isLoading`/`loadingState`) first-class; SR live regions for filtering/result announcements localized in 30+ languages
**Notable API**: `items` (iterable, enables virtualization); `isLoading`/`loadingState`; `selectedKey`/`defaultSelectedKey` (controlled/uncontrolled without value/defaultValue confusion)
**A11y**: Strictest ARIA separation (Picker=listbox, ComboBox=combobox); localized live region announcements; mobile tray for accessible small-screen interaction.
**Best at**: A11y depth and clean simple/searchable separation. **Missing**: Picker has no multi-select; ComboBox multi-select added Oct 2025 only; no creatable/tagging mode.

## Carbon (IBM)
**Approach**: Four distinct components — Select (native wrapper), Dropdown (custom single), ComboBox (filterable), MultiSelect (filterable multi). Default and Fluid input styles across all. AI-label integration for AI-influenced options.
**Key decisions**:
- Four-component hierarchy prevents "god component"; each has a focused API matching its complexity level
- Fluid style (no outer border, blends into containers) vs. Default style; avoids custom CSS overrides in inline/dense-table contexts
- `readOnly` distinct from `disabled`; allows focus+copy but prevents changes — critical for audit-trail enterprise UIs
**Notable API**: `titleText`/`helperText`/`warnText` (structured form anatomy slots); `direction` (top|bottom for fixed layouts); `type` (default|inline on Dropdown)
**A11y**: Dropdown=listbox, ComboBox=combobox; aria-invalid/aria-disabled/aria-readonly consistently applied; option count announced on open.
**Best at**: Enterprise component hierarchy with clear escalation path; fluid style for dense UIs; AI-readiness. **Missing**: No async loading, no creatable mode, MultiSelect lacks native select-all.

## Polaris (Shopify)
**Approach**: Composition-first — Select (native-like for simple forms), Combobox (TextField + Popover + Listbox composition), Autocomplete (pre-wired Combobox convenience wrapper). Listbox exposed as standalone primitive. Native-first for the common case.
**Key decisions**:
- Select stays native-like; zero JS overhead, free a11y, predictable mobile behavior for straightforward merchant forms
- Combobox is explicit composition (TextField + Popover + Listbox); developers wire it, giving customization freedom for app ecosystem
- Autocomplete as convenience wrapper; 80% "searchable dropdown" use case shouldn't require assembly every time
**Notable API**: `allowMultiple` (Combobox multi-select via same composition); `willLoadMoreResults`/`onScrolledToBottom` (lazy loading for thousands-of-products lists)
**A11y**: ARIA 1.2 combobox+listbox pattern; aria-activedescendant for virtual focus; native Select uses browser semantics.
**Best at**: Composability for diverse app ecosystem; pragmatic native-first Select. **Missing**: No creatable/tagging, no option grouping in Combobox, limited Select customization.

## Atlassian
**Approach**: Single Select family with variant sub-types (single, multi, creatable, async, async-creatable, checkbox, radio, popup) built on react-select. Named sub-types over boolean prop combinations. Checkbox/radio variants show selection state inline for Jira's complex filtering.
**Key decisions**:
- Built on react-select; inherits years of keyboard/ARIA testing; cost is bundle size and tight external dependency coupling
- Named sub-types over `<Select isCreatable isAsync isMulti>`; self-documenting, prevents invalid combinations
- Checkbox-select and radio-select variants; Jira filter interfaces need visible selection indicators, not just trigger text
**Notable API**: `menuPortalTarget` (portal rendering for Jira's layered modal UIs); `formatOptionLabel` (rich option rendering with avatars/badges); `isClearable`; `isSearchable`
**A11y**: react-select provides combobox/listbox roles + aria-live; full keyboard navigation; Backspace removes selections in multi; selection count communicated.
**Best at**: Breadth of variants covering every enterprise selection pattern; rich option rendering. **Missing**: Heavy bundle; no built-in virtual scroll for very large lists; styling requires react-select internals knowledge.

## Ant Design
**Approach**: Maximalist single component with `mode` switching (undefined=single, "multiple", "tags"). Virtual scrolling on by default. Tags mode allows user-created options. 40+ props cover virtually every scenario.
**Key decisions**:
- Mode-based architecture (single → multiple → tags); one import, easy switching, fewer decisions for rapid enterprise dev
- Virtual scroll on by default; Chinese enterprise option lists of 10,000+ items are common (employee lists, city selectors)
- `tags` mode blends input+selection; enables tagging/label-creation without a separate component
**Notable API**: `mode`; `virtual`/`listHeight`/`listItemHeight`; `dropdownRender` (inject "Add new item" into dropdown); `tokenSeparators` (auto-split pasted comma-separated input); `maxTagCount`
**A11y**: combobox + listbox roles; virtual scroll uses mock accessible elements (workaround, not ideal); Backspace removes last tag in multi-mode.
**Best at**: Feature completeness in one component — virtual scroll, tags, search, groups, custom dropdown all built in. **Missing**: A11y lags Spectrum/M3; virtual scroll SR workaround; tags mode lacks value validation.
