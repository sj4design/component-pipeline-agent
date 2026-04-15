# Accessibility Implementation Audit: Top 6 Design Systems + Accessibility Libraries

> **Purpose**: Inform the Interaction Agent with concrete implementation patterns for keyboard specs, ARIA attributes, and focus management rules.
> **Date**: 2026-03-29
> **Method**: Web search + documentation fetch from official sources and source code.

---

## Table of Contents

1. [Material Design 3 (Google/MUI)](#1-material-design-3)
2. [Spectrum / React Aria (Adobe)](#2-spectrum--react-aria-adobe)
3. [Carbon (IBM)](#3-carbon-ibm)
4. [Polaris (Shopify)](#4-polaris-shopify)
5. [Atlassian Design System](#5-atlassian-design-system)
6. [Ant Design](#6-ant-design)
7. [Radix UI](#7-radix-ui)
8. [Headless UI](#8-headless-ui)
9. [Cross-System Consensus & Divergences](#9-cross-system-consensus--divergences)
10. [Actionable Rules for the Interaction Agent](#10-actionable-rules-for-the-interaction-agent)

---

## 1. Material Design 3

**Documentation approach**: M3 spec site (m3.material.io) documents accessibility at the foundation level with general principles. MUI (the React implementation) provides per-component accessibility guidance inline within component API docs. Keyboard interactions are documented per-component, not in a single global table.

### Keyboard Interaction

- **Button**: Activated with `Enter` or `Space`. Focus via `Tab`.
- **Dialog**: `Escape` closes dialog. `Tab`/`Shift+Tab` cycle through focusable elements inside. First tabbable element receives focus on open.
- **Tabs**: Arrow keys navigate between tabs. `selectionFollowsFocus` prop controls whether focus immediately selects or requires `Enter`/`Space` to activate (manual vs automatic activation).
- **Toggle Button**: Standard `Tab` navigation, `Enter`/`Space` to toggle.
- **Menu**: Arrow keys navigate items. `Escape` closes.

### Focus Management

- **Dialog**: Traps focus using `role="dialog"`. First tabbable element auto-focused on open. Focus returns to trigger on close.
- **Focus ring**: Visible on keyboard focus. MUI uses `:focus-visible` for focus ring styling (blue outline), suppressing focus ring on mouse/touch interaction.
- **Focus order**: Components follow DOM order. Tab index management is automatic.

### Disabled States

- **MUI TextField**: Uses native `disabled` attribute on `<input>` elements. For custom elements, `aria-disabled` is used instead.
- **Menu items**: Disabled items are removed from the tab order.

### Error States / Form Validation

- **TextField**: When `error={true}` is set, MUI renders `aria-invalid="true"` on the input. The `helperText` element gets an auto-generated `id`, and `aria-describedby` on the input points to it. Screen readers announce: "[label], [value], edit text, invalid entry, [helper text]".
- **Known gap**: MUI does NOT set `aria-errormessage` (newer ARIA attribute). It relies on `aria-describedby` for error messages, which means the error text is read as description, not explicitly as an error message.

### Screen Reader Support

- MUI does not publish a formal screen reader testing matrix. Community testing confirms basic VoiceOver, NVDA, and JAWS support.
- No published automated screen reader testing pipeline.

---

## 2. Spectrum / React Aria (Adobe)

**Documentation approach**: Spectrum (the design system) documents keyboard interactions per-component on spectrum.adobe.com with dedicated "Keyboard interactions" sections showing exact key mappings. React Aria (the implementation library) provides hooks-level documentation with ARIA attributes returned by each hook.

### Keyboard Interaction Documentation Format

Each Spectrum component page includes a **"Keyboard interactions"** section with specific key-action pairs. Example from Action Button:

| Key | Action |
|-----|--------|
| `Space` or `Enter` | Executes the action |
| `Space` (with hold icon) | Opens popover menu |
| `Alt + Down Arrow` (with hold icon) | Opens popover menu |

### React Aria Hooks: Concrete Implementation

#### `useButton`
**Returns** `{ buttonProps, isPressed }`:
- `role="button"` (only on non-native elements)
- `aria-disabled` (on custom elements) or `disabled` (on native `<button>`/`<input>`)
- `aria-pressed` (for toggle buttons: `true`/`false`/`"mixed"`)
- `aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-current`
- `tabIndex` for focus management
- Keyboard: `Space` on keyup, `Enter` on keydown (matches native button behavior)

#### `useComboBox`
**Returns** `{ inputProps, listBoxProps, buttonProps, labelProps, descriptionProps, errorMessageProps }`:
- Input: `role="combobox"`, `aria-describedby` (links to description + error), `aria-invalid` (when invalid), `aria-label`/`aria-labelledby`
- Listbox: standard ARIA listbox props
- **Keyboard**: Arrow keys open and navigate, `Enter` selects, `Escape` closes, `Tab` moves away
- **Virtual focus**: Uses `aria-activedescendant` so DOM focus stays on input while listbox options are visually highlighted
- **Live region**: Custom localized announcements for option focusing, filtering count changes, and selection via ARIA live region
- **Disabled keys**: `disabledKeys` prop prevents disabled options from being selectable or focusable

#### `useCalendar`
- Grid uses `role="grid"` with ARIA grid pattern
- Arrow keys navigate dates within the grid
- `Enter` selects a date
- Localized screen reader messages announce selection and visible date range changes
- RTL languages automatically flip keyboard navigation direction

#### `FocusScope` (focus management primitive)
- `contain` prop: traps focus inside scope (for modals/dialogs)
- `restoreFocus` prop: restores focus to previously focused element on unmount
- `autoFocus` prop: auto-focuses first focusable child on mount
- Manages a **stack of `nodeToRestore`** elements for nested overlays
- If a `nodeToRestore` is unmounted, falls back to previous stack entry

### Disabled State Handling

React Aria makes a clear distinction:
- **Native `<button>`/`<input>`**: Uses HTML `disabled` attribute (removes from tab order, prevents interaction)
- **Custom elements (`<div>`, `<span>`, `<a>`)**: Uses `aria-disabled="true"` (still focusable, still announced by screen readers, but interaction is suppressed via JS)
- **Rationale**: `aria-disabled` keeps elements discoverable by screen reader users; `disabled` removes them from the accessibility tree on some AT combinations

### Error States / Form Validation

- `isInvalid` prop sets `aria-invalid="true"` on the field
- `validationErrors` array provides error messages
- `validationDetails` exposes native `ValidityState` object
- `errorMessageProps` returns `{ id }` for linking via `aria-describedby`
- Supports both native HTML constraint validation and custom validation UI
- Required fields: `aria-required="true"` exposed to AT

### Screen Reader Testing

**Formally tested with**:
- VoiceOver on macOS (Safari + Chrome)
- VoiceOver on iOS
- JAWS on Windows (Firefox + Chrome)
- NVDA on Windows (Firefox + Chrome)
- TalkBack on Android (Chrome)

This is the most comprehensive SR testing matrix of any design system reviewed.

### Focus Ring Styles

- Uses `data-focus-visible` attribute (similar to `:focus-visible` but more reliable cross-browser)
- Global event listeners at document level detect input modality (pointer vs keyboard vs AT)
- Focus ring shown ONLY on keyboard/AT interaction, not on mouse click
- Suppressed on programmatic focus unless user was already using keyboard

---

## 3. Carbon (IBM)

**Documentation approach**: Carbon provides per-component accessibility documentation at `carbondesignsystem.com/components/[component]/accessibility/`. Each page includes keyboard interaction details, ARIA attributes, and design considerations. IBM also maintains the Equal Access Accessibility Checker for automated testing.

### Keyboard Interaction

Per-component documentation with specific key-action tables. Example from Modal:

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to next focusable element inside modal |
| `Shift + Tab` | Moves focus to previous focusable element inside modal |
| `Escape` | Closes the modal dialog |

- **Tab sequence is contained**: `Tab` and `Shift+Tab` do NOT move focus outside the modal.
- **Overflow Menu**: Pop-up has `role="menu"`, `aria-label="Menu"`, `aria-haspopup="true"`.

### Focus Management

- **Modal initial focus rules** (unique to Carbon):
  - **Passive dialogs** (only close button): focus goes to close button (X)
  - **Confirmation dialogs**: focus goes to the **primary action button**
  - **Destructive dialogs**: focus goes to the **"Cancel" button** (NOT the danger/delete button)
- Focus ring: Tabbable elements show styling on both hover and focus. Focus indicator is never suppressed.
- Focus order: Interactive elements are accessible in logical, predictable order via tabbing.

### Disabled States

- Disabled menu items are removed from the tab order.
- Carbon recommends using native HTML elements whenever possible for built-in accessibility.

### Error States / Form Validation

- **Text Input**: Error state shows 3 visual indicators: red border, error icon, error message text.
- `aria-invalid="true"` set on the input when validation fails.
- `aria-describedby` links to the error message element.
- Helper text under inputs is surfaced to AT via ARIA associations.
- Validation appears when user clicks/tabs away from field (on blur).
- Validation disappears once data is valid.

### Screen Reader Support / Testing

- **IBM Equal Access Accessibility Checker**: Automated testing tool (Chrome/Firefox extension) using IBM's rules engine, detects WCAG 2.1 issues.
- **Automated Accessibility Verification Tests (AVT)**: Run on every PR/change to the Carbon codebase.
- **Manual screen reader testing**: Done periodically (not on every PR).
- No published matrix of which screen readers are formally tested.

### Visually Hidden Content Pattern

```css
.cds--visually-hidden {
  clip: rect(0,0,0,0);
  block-size: 1px;
  border: 0;
  inline-size: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  visibility: inherit;
  white-space: nowrap;
}
```

---

## 4. Polaris (Shopify)

**Documentation approach**: Polaris documents accessibility inline within each component page. Uses semantic HTML as the foundation, with ARIA only added when native semantics are insufficient. Testing documentation is maintained in the GitHub repo.

### Keyboard Interaction

- **Buttons**: Activated with `Enter` or `Space`.
- **TextField**: `Tab`/`Shift+Tab` to move between fields. `type` prop adjusts software keyboard for mobile AT.
- **Popover**: `Tab`/`Shift+Tab` navigate controls inside. `Escape` dismisses. Tabbing out also dismisses.
- **Modal**: Focus moves automatically to modal container on open.

### Focus Management

- **Modal**: Focus auto-moves to modal container on open. `activator` prop specifies which element receives focus on close (focus restoration).
- **Popover**: `autofocusTarget='first-node'` available to assist screen readers.
- **TrapFocus**: Polaris implements focus trapping via blur event handling (not keyboard event interception). When focus leaves the container, it is programmatically returned.
- **Focus ring**: Features like modals that capture focus can be dismissed with keyboard (Escape).
- **No keyboard trap guarantee**: Focus does not become trapped with no way to exit.

### Disabled States

- Not extensively documented. Polaris web components use semantic HTML patterns for disabled states.

### Error States / Form Validation

- **TextField**: `error` prop renders inline error message.
- Error content linked to input via `aria-describedby`.
- `helpText` prop also linked via `aria-describedby` (both help and error text are announced by SR).
- `aria-invalid` is set when error state is active.

### Screen Reader Support

- Polaris states that accessible names, roles, states, and properties are conveyed to AT.
- Components built according to ARIA 1.1 recommendation and authoring practices.
- No published screen reader testing matrix.

---

## 5. Atlassian Design System

**Documentation approach**: ADS documents accessibility at a foundations level with general principles. Per-component accessibility is built-in but not extensively documented in public docs with keyboard interaction tables. A dedicated accessibility team works within the DS team.

### Keyboard Interaction

- Not documented as per-component keyboard tables in public docs.
- Date picker redesign: Reduced keyboard input from **52 to 12 keystrokes** for date selection.
- Drag-and-drop: Visible drag handle that can be focused, "More" button with action menu as keyboard/SR alternative.

### Focus Management

- Focus restoration: When a button with focus is moved (e.g., in drag-and-drop), focus is manually restored because the element remounts in a new parent.
- Focus rings: Updated to achieve at least **3:1 contrast ratio** across themes.
- Calendar: Full keyboard control with descriptive labels and predictable focus.

### Error States

- Date picker: Consistent validation patterns with descriptive error messaging.
- Fewer live region announcements (reduced noise for SR users).

### Screen Reader Support

- No published testing matrix.
- Uses Accessibility Insights for testing.
- Resolved **6,000+ accessibility issues** between June 2024 and June 2025.
- Three principles: accessibility by default, tooling and automation, maker empowerment.

---

## 6. Ant Design

**Documentation approach**: Ant Design has the weakest accessibility documentation of the systems reviewed. Accessibility improvements are largely driven by community issue reports on GitHub. No dedicated accessibility pages per component.

### Keyboard Interaction

- Basic keyboard navigation works across components.
- **Known issues**: Screen readers cannot properly read and interpret Tabs and their content (reported by external testing agencies).

### ARIA Implementation Gaps (documented in GitHub issues)

- **Tabs**: Missing `tabindex="0"` on active tab, missing `tabindex="-1"` on inactive tabs, missing `aria-controls` on tabs, missing `aria-labelledby` on tab panels.
- **Tooltip**: Missing `aria-describedby` on trigger element linking to tooltip content.
- **Select/Dropdown**: Missing accessible names (ARIA-labelledby) for dropdown inputs.

### Disabled States

- Uses native `disabled` attribute on buttons, which **removes them from the tab order entirely**. Screen reader users navigating via Tab will not discover disabled buttons.
- Community recommends using `aria-disabled="true"` instead to keep buttons discoverable.

### Error States / Form Validation

- **Critical gap**: Form inputs do NOT automatically get `aria-invalid` or `aria-describedby` when validation fails.
- Error messages are NOT linked to input fields by default (GitHub issue #36730, #28748).
- `scrollToFirstError` scrolls to the first error but does NOT focus the field, so screen readers may not announce the error.
- **Recommended fix**: Use `role="alert"` on error message containers for live announcements.

### Screen Reader Support

- No published testing matrix.
- No formal screen reader testing methodology.
- Accessibility improvements are reactive (community-reported), not proactive.

---

## 7. Radix UI

**Documentation approach**: Per-component accessibility is documented inline on each component page with a dedicated **"Keyboard Interactions"** table and **"Data Attributes"** section. Adheres to WAI-ARIA Authoring Practices.

### Keyboard Interaction Tables (per component)

#### Dialog
| Key | Action |
|-----|--------|
| `Space` | Opens/closes the dialog |
| `Enter` | Opens/closes the dialog |
| `Tab` | Moves focus to the next focusable element |
| `Shift + Tab` | Moves focus to the previous focusable element |
| `Escape` | Closes dialog, returns focus to `Dialog.Trigger` |

#### Tabs
| Key | Action |
|-----|--------|
| `Tab` | Focuses active trigger; then moves to active content |
| `ArrowDown` / `ArrowRight` | Advances to next trigger, activates content |
| `ArrowUp` / `ArrowLeft` | Returns to previous trigger, activates content |
| `Home` | Jumps to first trigger |
| `End` | Jumps to last trigger |

#### Select
| Key | Action |
|-----|--------|
| `Space` (on trigger) | Opens select, focuses selected item |
| `Enter` (on trigger) | Opens select, focuses first item |
| `ArrowDown` / `ArrowUp` | Navigates items |
| `Enter` / `Space` (on item) | Selects item |
| `Escape` | Closes select, returns focus to trigger |

### Focus Management

- **Dialog**: Modal focus trapping automatic. `onOpenAutoFocus` and `onCloseAutoFocus` callbacks for customization.
- **AlertDialog**: Focus programmatically moved to Cancel button on open.
- Focus restoration to trigger on close (Escape).

### Data Attributes (for styling interaction states)

- `[data-state]`: `"open"` / `"closed"` / `"active"` / `"inactive"` / `"checked"` / `"unchecked"`
- `[data-disabled]`: Present when disabled (boolean attribute)
- `[data-highlighted]`: Present when option is highlighted via keyboard/mouse
- `[data-orientation]`: `"horizontal"` / `"vertical"`
- `[data-placeholder]`: Present when placeholder is shown
- `[data-side]`: `"left"` / `"right"` / `"top"` / `"bottom"`
- `[data-align]`: `"start"` / `"end"` / `"center"`

### Screen Reader Testing

Tested with NVDA, JAWS, and VoiceOver.

---

## 8. Headless UI

**Documentation approach**: Per-component pages document keyboard interactions in dedicated tables. Full ARIA management is automatic. No visual styling provided (headless).

### Keyboard Interaction Tables

#### Combobox
| Key | Context | Action |
|-----|---------|--------|
| `ArrowDown` / `ArrowUp` | Input focused, closed | Opens combobox, focuses selected item |
| `Enter`, `Space`, `ArrowDown`, `ArrowUp` | Button focused | Opens combobox, focuses input |
| `Escape` | Open | Closes, restores selected item in input |
| `ArrowDown` / `ArrowUp` | Open | Focuses next/previous non-disabled item |
| `Home` / `PageUp` | Open | Focuses first non-disabled item |
| `End` / `PageDown` | Open | Focuses last non-disabled item |
| `Enter` | Open | Selects current item |
| `Tab` | Open | Selects focused item AND closes |
| `A-Z, a-z` | Open | Triggers filter onChange |

#### Listbox
| Key | Context | Action |
|-----|---------|--------|
| `Space`, `ArrowDown`, `ArrowUp` | Button focused | Opens listbox, focuses selected item |
| `Enter` | Button focused, closed | Submits parent form |
| `Escape` | Open | Closes listbox |
| `ArrowDown` / `ArrowUp` | Open | Focuses next/previous non-disabled item |
| `ArrowLeft` / `ArrowRight` | Open + horizontal | Focuses next/previous non-disabled item |
| `Home` / `PageUp` | Open | Focuses first non-disabled item |
| `End` / `PageDown` | Open | Focuses last non-disabled item |
| `Enter`, `Space` | Open | Selects current item |
| `A-Z, a-z` | Open | Focuses first matching item (typeahead) |

### Focus Management

- **Dialog**: Focus trapped inside on open. Scroll locked. Background UI hidden from screen readers.
- **Menu**: Focus trapped in open menu until Escape or click outside.
- **Listbox**: Options receive focus automatically when open.

### Disabled State Handling (three levels)

1. **Field-level**: `disabled` prop on `Field` disables entire component + associated Label/Description.
2. **Component-level**: `disabled` prop on the component itself.
3. **Option-level**: `disabled` prop on individual options prevents selection AND keyboard navigation (skipped by arrow keys).

### Data Attributes for State

- `data-open`: listbox/combobox is open
- `data-focus`: option has keyboard/mouse focus
- `data-selected`: option is currently selected
- `data-disabled`: option/component is disabled

### ARIA Management

- `Field` component auto-associates labels via generated IDs
- `Description` component auto-links via `aria-describedby`
- `aria-orientation` automatically set based on `horizontal` prop
- Hidden `<input>` created for form submission when `name` prop is set

---

## 9. Cross-System Consensus & Divergences

### Consensus (use as default rules)

| Pattern | Consensus | Adopted by |
|---------|-----------|------------|
| **Button activation** | `Enter` (keydown) + `Space` (keyup) | All 6 DS + Radix + Headless |
| **Dialog close** | `Escape` key | All systems unanimously |
| **Dialog focus trap** | `Tab`/`Shift+Tab` contained within modal | All systems |
| **Dialog focus on open** | Auto-focus first focusable element | MUI, Radix, Headless, React Aria |
| **Dialog focus on close** | Restore focus to trigger element | All systems |
| **Tabs navigation** | Arrow keys (Left/Right for horizontal) | All systems |
| **Select/Listbox open** | `Space`, `Enter`, or `ArrowDown` on trigger | Radix, Headless, React Aria |
| **Select/Listbox navigate** | `ArrowDown`/`ArrowUp` between options | All systems |
| **Select/Listbox select** | `Enter` or `Space` on option | All systems |
| **Select/Listbox close** | `Escape` returns focus to trigger | All systems |
| **Home/End in lists** | Jump to first/last item | Radix, Headless, React Aria |
| **Error field marking** | `aria-invalid="true"` on input | MUI, Carbon, Polaris, React Aria |
| **Error message linking** | `aria-describedby` pointing to error text | MUI, Carbon, Polaris, React Aria |
| **Focus ring visibility** | Show on keyboard only (`:focus-visible` or equivalent) | All systems except Carbon (shows on both) |
| **Disabled options skipped** | Arrow key navigation skips disabled items | Radix, Headless, React Aria |

### Divergences (document as configurable or opinionated choices)

| Pattern | Divergence | Systems |
|---------|-----------|---------|
| **Dialog initial focus target** | Carbon: primary button (confirmation) or Cancel (destructive). Others: first focusable element. | Carbon vs. all others |
| **Tabs activation mode** | Manual (arrow to focus, Enter to activate) vs. Automatic (arrow selects immediately). MUI defaults manual, Radix defaults automatic. | MUI vs. Radix |
| **Disabled attribute** | React Aria uses `aria-disabled` on custom elements (keeps discoverable). Ant Design uses `disabled` (removes from tab order). | React Aria vs. Ant Design |
| **Tab key in open Select** | Headless: Tab selects AND closes. Radix: Tab does not appear in their keyboard table (implied: moves focus out). | Headless vs. Radix |
| **Combobox virtual focus** | React Aria uses `aria-activedescendant` (focus stays on input). Some systems move DOM focus to options. | React Aria vs. others |
| **Error announcement timing** | Carbon: on blur. Ant Design: no standard (gap). MUI: on error prop change. | Varies |
| **Focus ring on hover+focus** | Carbon shows focus styling on both hover and focus. Others only on keyboard focus. | Carbon vs. all others |
| **Live region announcements** | React Aria: localized live region for filter count, selection changes. Others: no live region for these events. | React Aria vs. others |
| **aria-errormessage** | No system uses `aria-errormessage` (newer ARIA). All use `aria-describedby` for errors. | Unanimous gap |
| **Screen reader testing** | React Aria: 5 AT combinations formally tested. Others: no published matrix. | React Aria leads |

---

## 10. Actionable Rules for the Interaction Agent

Based on the consensus patterns above, the Interaction Agent should generate specs following these rules:

### Keyboard Interaction Rules

```
RULE K-01: Button = Enter (keydown) + Space (keyup) to activate
RULE K-02: Dialog close = Escape
RULE K-03: Dialog Tab/Shift+Tab = cycle within modal (focus trap)
RULE K-04: Tabs = ArrowLeft/ArrowRight (horizontal), ArrowUp/ArrowDown (vertical)
RULE K-05: Tabs Home/End = jump to first/last tab
RULE K-06: Select trigger = Space/Enter/ArrowDown to open
RULE K-07: Select options = ArrowDown/ArrowUp to navigate, Enter/Space to select
RULE K-08: Select Escape = close and return focus to trigger
RULE K-09: Combobox = typing filters, ArrowDown/ArrowUp navigate options
RULE K-10: Combobox Enter = select focused option
RULE K-11: Home/PageUp = first non-disabled item, End/PageDown = last non-disabled item
RULE K-12: Typeahead (A-Z) = focus first matching item in listbox/select
```

### Focus Management Rules

```
RULE F-01: Modal/Dialog = trap focus (contain Tab/Shift+Tab within)
RULE F-02: Modal open = auto-focus first focusable element (configurable)
RULE F-03: Modal close = restore focus to trigger element
RULE F-04: Overlay stack = maintain nodeToRestore stack for nested overlays
RULE F-05: Focus ring = show only on keyboard interaction (data-focus-visible or :focus-visible)
RULE F-06: Disabled items = skip during arrow key navigation
RULE F-07: Focus order = follow DOM order, logical and predictable
```

### ARIA Attribute Rules

```
RULE A-01: Dialog = role="dialog", aria-modal="true", aria-labelledby=[title-id]
RULE A-02: Dialog description = aria-describedby=[description-id]
RULE A-03: Button (custom element) = role="button", aria-disabled="true|false"
RULE A-04: Button (native) = disabled attribute (not aria-disabled)
RULE A-05: Toggle button = aria-pressed="true|false|mixed"
RULE A-06: Menu trigger = aria-haspopup="true", aria-expanded="true|false"
RULE A-07: Combobox input = role="combobox", aria-activedescendant=[option-id]
RULE A-08: Listbox = role="listbox", options get role="option"
RULE A-09: Tab list = role="tablist", tabs get role="tab", panels get role="tabpanel"
RULE A-10: Tab = aria-selected="true|false", aria-controls=[panel-id]
RULE A-11: Tab panel = aria-labelledby=[tab-id]
RULE A-12: Required field = aria-required="true"
```

### Error & Validation Rules

```
RULE E-01: Invalid field = aria-invalid="true" on the input
RULE E-02: Error message = aria-describedby pointing to error text element
RULE E-03: Helper text = also linked via aria-describedby (can coexist with error)
RULE E-04: Error timing = announce on blur (field loses focus) or on form submit
RULE E-05: Live announcements = use aria-live="polite" for filter count changes
RULE E-06: Alert announcements = use role="alert" for critical error summaries
```

### Disabled State Rules

```
RULE D-01: Native form elements (<button>, <input>) = use disabled attribute
RULE D-02: Custom interactive elements = use aria-disabled="true" (keeps focusable, keeps discoverable by AT)
RULE D-03: Disabled options in list = skip during keyboard navigation (ArrowDown/ArrowUp)
RULE D-04: Visually indicate disabled state via styling (opacity, cursor: not-allowed)
```

---

## Sources

### Design Systems
- [Material Design 3 - Accessibility](https://m3.material.io/foundations/designing)
- [MUI React TextField](https://mui.com/material-ui/react-text-field/)
- [MUI React Tabs](https://mui.com/material-ui/react-tabs/)
- [Adobe Spectrum - Action Button](https://spectrum.adobe.com/page/action-button/)
- [React Aria - Accessibility](https://react-aria.adobe.com/quality#accessibility)
- [React Aria - useButton](https://react-aria.adobe.com/Button/useButton.html)
- [React Aria - useComboBox](https://react-aria.adobe.com/ComboBox/useComboBox.html)
- [React Aria - FocusScope](https://react-spectrum.adobe.com/react-aria/FocusScope.html)
- [React Aria - Button blog post](https://react-spectrum.adobe.com/blog/building-a-button-part-3.html)
- [Carbon - Developers Accessibility](https://carbondesignsystem.com/guidelines/accessibility/developers/)
- [Carbon - Modal Accessibility](https://carbondesignsystem.com/components/modal/accessibility/)
- [Carbon - Text Input Accessibility](https://carbondesignsystem.com/components/text-input/accessibility/)
- [Carbon - Accessibility Status](https://carbondesignsystem.com/components/overview/accessibility-status/)
- [Polaris - Accessibility Foundations](https://polaris-react.shopify.com/foundations/accessibility)
- [Polaris - TextField](https://polaris.shopify.com/components/selection-and-input/text-field)
- [Polaris - Accessibility Testing (GitHub)](https://github.com/Shopify/polaris-react/blob/main/documentation/Accessibility%20testing.md)
- [Atlassian Design - Accessibility](https://atlassian.design/foundations/accessibility/)
- [Atlassian - Accessibility in DS (article)](https://itbrief.asia/story/atlassian-embeds-accessibility-in-design-system-work)
- [Ant Design - Form](https://ant.design/components/form/)
- [Ant Design - Tabs a11y issue #18798](https://github.com/ant-design/ant-design/issues/18798)
- [Ant Design - aria-invalid issue #36730](https://github.com/ant-design/ant-design/issues/36730)
- [Ant Design - Form a11y issue #16268](https://github.com/ant-design/ant-design/issues/16268)
- [Ant Design - WCAG discussion #55332](https://github.com/ant-design/ant-design/discussions/55332)

### Accessibility Libraries
- [Radix UI - Accessibility Overview](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [Radix UI - Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
- [Radix UI - Tabs](https://www.radix-ui.com/primitives/docs/components/tabs)
- [Radix UI - Select](https://www.radix-ui.com/primitives/docs/components/select)
- [Headless UI - Combobox](https://headlessui.com/react/combobox)
- [Headless UI - Listbox](https://headlessui.com/react/listbox)
- [Headless UI - Dialog](https://headlessui.com/v1/react/dialog)

### Testing Tools
- [IBM Equal Access Accessibility Checker](https://github.com/IBMa/equal-access)
- [IBM Able Toolkit](https://www.ibm.com/able/toolkit/)
