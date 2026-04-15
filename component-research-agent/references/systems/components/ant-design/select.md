---
system: Ant Design
component: Select
url: https://ant.design/components/select/
last_verified: 2026-03-28
---

# Select

## Approach
Ant Design takes a maximalist, single-component approach to selection. One `<Select>` component handles everything through mode switching: default (single select), `multiple`, and `tags` (multi-select with user-created options). This reflects Ant Design's philosophy of "one component, many modes" -- coming from Alibaba's enterprise ecosystem where developer efficiency matters more than component purity. The component ships with built-in virtual scrolling via rc-virtual-list, search filtering, option grouping, and remote data loading, making it one of the most feature-complete select implementations available. Virtual scroll is enabled by default, a decision driven by the reality that Chinese enterprise apps frequently present thousands of options (employee lists, product catalogs, city selectors). The trade-off is a larger API surface -- the Select component has 40+ props -- but Ant's documentation compensates with extensive examples covering every combination.

## Key Decisions
1. **Mode-based architecture** (HIGH) -- Instead of separate components, Ant uses a `mode` prop (`multiple`, `tags`, or default single). This means one import, one API to learn, and easy switching between selection patterns. The downside is that some props only apply to certain modes, creating implicit complexity. But for Ant's target audience of enterprise development teams moving fast, fewer imports and fewer decisions wins.
2. **Virtual scroll on by default** (HIGH) -- Select enables virtual scrolling automatically, rendering only visible options in the DOM. This is a performance-first decision rooted in real-world Chinese enterprise apps where option lists of 10,000+ items are common. Teams can disable it with `virtual={false}` for accessibility edge cases where screen readers need the full list, showing awareness of the trade-off.
3. **Tags mode for user-created options** (MEDIUM) -- The `tags` mode lets users type arbitrary values that become selections, blending input and selection. This serves a specific but critical enterprise pattern: tagging systems, custom label creation, and flexible categorization. Rather than building a separate TagInput component, Ant folds this into Select, keeping the ecosystem smaller.
4. **Option groups via OptGroup** (MEDIUM) -- Native `<OptGroup>` sub-component provides visual and semantic grouping. This pattern is simpler than the section/collection approach used by other systems, trading flexibility for familiarity with the native `<select>/<optgroup>` mental model that enterprise developers already know.

## Notable Props
- `mode`: Switches between `undefined` (single), `"multiple"`, and `"tags"` -- the central architectural toggle
- `showSearch`: Enables filtering, defaults to true in `tags` and `combobox` modes. Filtering uses `optionFilterProp` to control which field is searched
- `virtual`: Boolean to toggle virtual scrolling (default: true). `listHeight` and `listItemHeight` fine-tune the virtual viewport
- `dropdownRender`: Allows injecting custom content into the dropdown (e.g., "Add new item" buttons), solving the common pattern of creation-from-selection
- `maxTagCount`: Limits visible tags in multi-select with a "+N more" overflow indicator, preventing layout blowout in dense forms
- `tokenSeparators`: Defines characters (e.g., comma, semicolon) that auto-split pasted text into multiple selections -- critical for bulk data entry

## A11y Highlights
- **Keyboard**: Arrow keys navigate, Enter selects, Backspace removes last tag in multi-mode, Escape closes. Type-ahead filtering in search mode.
- **Screen reader**: Selected values announced. Option count communicated. Virtual scroll creates mock accessible elements to simulate full list binding.
- **ARIA**: Uses `role="combobox"` with `aria-autocomplete`, `role="listbox"` on the dropdown, `role="option"` on items. `aria-selected` tracks selection state.

## Strengths & Gaps
- **Best at**: Feature completeness in a single component -- virtual scroll, tags, search, groups, remote loading, and custom dropdown rendering all built in. Excellent for rapid enterprise development.
- **Missing**: Accessibility depth lags behind Spectrum and M3 (virtual scroll mock elements are a workaround, not ideal); no built-in async loading state indicators; `tags` mode lacks validation for user-created values; large bundle impact from rc-select/rc-virtual-list.
