---
system: Adobe Spectrum
component: Picker (Select) & ComboBox
url: https://spectrum.adobe.com/page/picker/
last_verified: 2026-03-28
---

# Picker & ComboBox

## Approach
Spectrum deliberately splits selection into two separate components with distinct complexity profiles. The **Picker** handles simple "choose one from a list" scenarios -- it is the equivalent of a native `<select>` with full styling control. The **ComboBox** adds text input for filtering and is treated as a fundamentally different interaction pattern, not just a Picker with search bolted on. This separation exists because Adobe found that combining both into one component created confusing API surfaces and unpredictable UX -- users didn't know whether to type or click. React Aria, the accessibility layer underneath, provides headless hooks (`useSelect`, `useComboBox`) that enforce this separation at the architecture level. Both components automatically adapt to mobile by rendering in a tray overlay instead of a popover, a decision rooted in Adobe's cross-platform creative tool ecosystem.

## Key Decisions
1. **Picker and ComboBox as separate components** (HIGH) -- Rather than a single Select with an `isSearchable` flag, Spectrum maintains two distinct components with different ARIA roles (`listbox` vs `combobox`). This prevents the API ambiguity that plagues single-component approaches and ensures each pattern has correct semantics from the start.
2. **Mobile tray rendering** (HIGH) -- On mobile devices, both Picker and ComboBox render in a full-width tray from the bottom rather than a dropdown popover. This acknowledges that small-screen popovers are difficult to interact with and that creative professionals often work on tablets.
3. **Headless architecture via React Aria** (HIGH) -- The styling-agnostic hooks (`useSelect`, `useComboBox`, `useListBox`) let any design system build on Spectrum's accessibility foundation. This "accessibility as infrastructure" philosophy means the ARIA patterns are tested once and shared across implementations.
4. **Section grouping built-in** (MEDIUM) -- Both components natively support `<Section>` wrappers for option groups with accessible headers, avoiding the common anti-pattern of flat lists that become unnavigable at scale.

## Notable Props
- `items`: Collection-based API using iterable data, enabling virtualization for large lists without API changes
- `onOpenChange`: Explicit open/close callback separate from selection, supporting analytics and dependent UI updates
- `isLoading` / `loadingState`: First-class async states (loading, filtering, loadingMore) built into the component contract
- `selectedKey` vs `defaultSelectedKey`: Controlled and uncontrolled modes with clear naming that avoids the `value`/`defaultValue` confusion

## A11y Highlights
- **Keyboard**: Arrow keys, Home/End, PageUp/PageDown for navigation. Type-ahead matching. ComboBox adds full text editing keyboard support.
- **Screen reader**: Custom ARIA live region announcements for filtering results, option focus, and selection -- localized across 30+ languages.
- **ARIA**: Picker uses `role="listbox"`, ComboBox uses `role="combobox"` with `aria-autocomplete`. Strict role separation enforced architecturally.

## Strengths & Gaps
- **Best at**: Accessibility depth (live region announcements, mobile adaptation, localized screen reader text) and clean separation of simple vs searchable selection.
- **Missing**: No built-in multi-select for Picker (must use a different pattern); ComboBox multi-select added only recently (Oct 2025). No creatable/tagging mode out of the box.
