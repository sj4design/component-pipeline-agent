# Accessibility Testing Standards & Best Practices
## Reference Document for Interaction Agent

> This document contains actionable rules for generating component interaction specs.
> Organized by category. Each rule is written as a directive the Interaction Agent can apply.

---

## 1. Accessibility Testing Tools & CI/CD Integration

### 1.1 axe-core Rules Engine
- **What it tests**: WCAG 2.0, 2.1, 2.2 at Levels A, AA, and AAA, plus best practices (e.g., every page has an h1). Detects ~57% of WCAG issues automatically.
- **Zero false positives**: axe-core's design philosophy guarantees no false positives; every reported violation is a real issue.
- **Rule categories**: Color contrast, ARIA attribute validity, form labels, heading order, landmark structure, keyboard accessibility, image alt text, link purpose, language attributes, table structure.

### 1.2 Lighthouse Accessibility Audits
- Uses axe-core internally for WCAG violation checks.
- Audit categories: ARIA attributes, color contrast, names and labels, navigation, tables and lists, audio and video, internationalization.
- Each audit is binary pass/fail (no partial credit).
- Some checks are flagged as "additional items to manually check" and do not affect the score.

### 1.3 Pa11y
- CLI-based accessibility checker; loads pages and reports issues as Error, Warning, or Notice.
- Output fields: Type, Message, Code, Context, Selector.
- Lightweight; good for quick validation and CI gating.

### 1.4 CI/CD Integration Rules

| Layer | Tool | What it catches |
|-------|------|-----------------|
| Unit test | jest-axe / vitest-axe | Component-level ARIA violations, missing labels |
| Story test | Storybook a11y addon | Visual + automated checks per component state |
| Integration test | axe-playwright / axe-puppeteer | Page-level violations, focus order |
| CI gate | Pa11y CI / Lighthouse CI | Regression detection, score thresholds |

**Rule**: Every component MUST pass `expect(await axe(container)).toHaveNoViolations()` in unit tests. Storybook stories MUST have `parameters.a11y.test` enabled.

---

## 2. ARIA Best Practices & Anti-Patterns

### 2.1 The First Rule of ARIA
**"No ARIA is better than bad ARIA."** Pages with poorly implemented ARIA have 34% more errors than pages without ARIA. Only add ARIA when native HTML cannot provide the needed semantics.

### 2.2 Decision Checklist: When to Use ARIA

```
1. Can a native HTML element do this?        → Use the native element.
2. Does the element already have the role?    → Don't add a redundant role.
3. Am I adding a role without keyboard support? → Stop. Add keyboard handling first.
4. Am I hiding a focusable element?           → Don't use aria-hidden. Use `hidden` or remove from DOM.
5. Does aria-label override a visible label?  → Use aria-labelledby instead, or match the visible text.
```

### 2.3 Common Anti-Patterns (Never Do These)

| Anti-Pattern | Why It Fails | Correct Approach |
|-------------|-------------|------------------|
| `<div role="button">` without keyboard handler | Not keyboard accessible | Use `<button>`, or add `tabindex="0"` + `keydown` for Enter/Space |
| `<nav role="navigation">` | Redundant; `<nav>` already implies `navigation` role | Use `<nav>` alone |
| `aria-hidden="true"` on focusable element | Element is still in tab order; creates ghost focus | Use `hidden` attribute or remove element from DOM |
| `aria-label` overriding visible text | Accessible name doesn't match what sighted users see | Use `aria-labelledby` pointing to visible text |
| Misspelled ARIA attributes (`aria-lable`) | Silently ignored; no accessible name exposed | Lint with axe-core; use IDE ARIA attribute autocompletion |
| `role="presentation"` on element with ARIA states | Browser ignores the presentation role | Remove the role or remove the ARIA states |

### 2.4 aria-live Regions

**Default to `polite`** (90% of cases). Use `assertive` only for time-critical interruptions.

| Politeness | Use For | Behavior |
|-----------|---------|----------|
| `polite` | Success messages, search result counts, cart updates, progress updates | Waits until screen reader finishes current sentence |
| `assertive` | Error messages, session timeouts, security alerts, connection lost | Interrupts immediately |
| `off` | Content that updates too frequently (stock tickers, timers) | Never announced |

**Critical implementation rules**:
- Live regions MUST exist in the DOM before content is injected (pre-render empty).
- If dynamically adding the region, insert a short delay (milliseconds) between adding the element and populating text.
- Keep announcements concise. Screen readers cannot "re-read" live region text easily.
- Test with NVDA, JAWS, and VoiceOver: each handles repeated updates differently.

### 2.5 role="presentation" / role="none"

These roles strip semantic meaning from an element. They are synonyms.

**When to use**:
- Structural wrappers in composite widgets (e.g., a `<table>` used purely for layout).
- Intermediate `<li>` elements in a custom tree/menu where the composite role handles semantics.

**When NOT to use**:
- On focusable elements (browsers ignore the role).
- On elements with ARIA state/property attributes like `aria-expanded`, `aria-selected`, `aria-checked` (browsers ignore the role).
- On elements that convey meaning to the user.

### 2.6 ARIA State Attributes: Correct Usage

| Attribute | Use On | Values | Notes |
|-----------|--------|--------|-------|
| `aria-expanded` | Button/trigger that controls a collapsible region | `true` / `false` | Set on the trigger, NOT the panel. Use with `aria-controls`. |
| `aria-selected` | Tabs, listbox options, grid cells | `true` / `false` | Only one item `true` in single-select; multiple allowed in multi-select. |
| `aria-checked` | Checkboxes, switches, menu item checkboxes | `true` / `false` / `mixed` | `mixed` = indeterminate state (parent checkbox with partial children). |
| `aria-pressed` | Toggle buttons | `true` / `false` / `mixed` | Distinguishes a toggle button from a regular button. |
| `aria-current` | Navigation items, breadcrumbs, step indicators | `page` / `step` / `location` / `date` / `time` / `true` | Indicates "current" item in a set. Preferred over `aria-selected` for nav. |
| `aria-disabled` | Any interactive element | `true` / `false` | Keeps element focusable (unlike HTML `disabled`). Pair with visual styling. |

---

## 3. Focus Management

### 3.1 Focus Trap vs Focus Containment

| Concept | Definition | Use Case |
|---------|-----------|----------|
| **Focus trap** | Tab/Shift+Tab cycle wraps within a boundary; focus cannot escape. Pressing Tab on the last element moves to the first. | Modal dialogs, full-screen overlays |
| **Focus containment** | Focus is kept within a region; background content made `inert`. Browser `<dialog>` element does this natively. | Dialogs using `<dialog>`, drawer panels |

**Rule**: Use the native `<dialog>` element with `showModal()` whenever possible. It provides focus containment and `inert` on background content automatically. Only implement manual focus traps when `<dialog>` cannot be used.

### 3.2 Roving Tabindex Pattern

**Use when**: A composite widget has multiple internal items but should be a single Tab stop.

| Component Type | Internal Navigation | Pattern |
|---------------|-------------------|---------|
| Radio group | Arrow Up/Down | Roving tabindex |
| Tab list | Arrow Left/Right | Roving tabindex |
| Toolbar | Arrow Left/Right | Roving tabindex |
| Menu | Arrow Up/Down | Roving tabindex |
| Grid / Data grid | Arrow keys (4-directional) | Roving tabindex |
| Listbox | Arrow Up/Down | Roving tabindex |
| Tree view | Arrow Up/Down + Left/Right (expand/collapse) | Roving tabindex |

**Implementation**:
```
Active item:   tabindex="0"  (focusable via Tab)
Inactive items: tabindex="-1" (focusable via .focus(), not Tab)
```
Arrow keys move `tabindex="0"` to the new item and call `.focus()` on it.

### 3.3 Focus Restoration

**Rule**: When a dialog, popover, menu, or overlay closes, return focus to the element that triggered it.

**Implementation steps**:
1. Before opening: store a reference to `document.activeElement`.
2. On close: call `triggerElement.focus()`.
3. Edge case: if the trigger no longer exists (e.g., deleted row), move focus to the nearest logical ancestor or the next focusable element.

### 3.4 Skip Links & Landmarks

**At the component level, design systems should**:
- Provide a `SkipLink` component for page-level use.
- Use semantic HTML for landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
- Label repeated landmarks with `aria-label` (e.g., `<nav aria-label="Primary">`).
- NOT try to implement skip links within individual components; this is a page-composition concern.
- Support client-side routing by managing focus on route changes (move focus to `<main>` or a heading).

### 3.5 :focus-visible vs :focus

| Pseudo-class | When it matches | Style it? |
|-------------|----------------|-----------|
| `:focus` | Always, on any focus (mouse, keyboard, programmatic) | Use for programmatic focus styles only |
| `:focus-visible` | Only when the UA determines focus should be visible (typically keyboard/AT) | YES: use this for visible focus indicators |

**Design system rules**:
- Style `:focus-visible` for keyboard focus rings (the user expects to see them).
- Use `:focus:not(:focus-visible)` to suppress focus rings on mouse click if needed.
- NEVER remove `:focus` styles entirely (`outline: none` without a replacement). Always provide an alternative visible indicator.
- For backwards compatibility, apply base styles on `:focus` and enhanced styles on `:focus-visible`.

---

## 4. Screen Reader Behavior & Quirks

### 4.1 Key Differences by Screen Reader

| Feature | JAWS | NVDA | VoiceOver (macOS) | VoiceOver (iOS) |
|---------|------|------|-------------------|-----------------|
| Rendering | Proprietary virtual buffer | Browser accessibility tree | macOS accessibility API | iOS accessibility API |
| Forms mode trigger | Focuses form control or widget role | Same as JAWS | No separate mode | No separate mode |
| aria-live reliability | Conservative; may skip repeated updates | Announces all updates | Generally reliable | May miss rapid updates |
| aria-owns support | Mature | Good | Inconsistent | Limited |
| role="application" | Switches to forms mode | Switches to forms mode | No effect | No effect |
| Dynamic content | Good support | Good support | Can miss updates in SPAs | Can miss updates |

### 4.2 Virtual Cursor vs Forms Mode

**Virtual/browse mode** (default): Screen reader intercepts keystrokes for navigation (H = headings, L = lists, arrow keys = read content). The user is "reading" the page.

**Forms/focus mode**: Screen reader passes keystrokes to the browser. Triggered automatically when:
- Focus enters a text input, textarea, or contenteditable.
- Focus enters an element with a widget role that implies arrow keys: `slider`, `spinbutton`, `tab`, `tree`, `combobox`, `grid`, `menubar`.
- NOT triggered by: `button`, `checkbox`, `radio`, `link` (these work in both modes).

**Design implication**: If a custom widget uses arrow keys, it MUST have the correct ARIA role so screen readers switch to forms mode. Without the role, arrow key handlers will be intercepted by the screen reader.

### 4.3 Known Bugs/Quirks Affecting Components

| Bug/Quirk | Affected | Workaround |
|-----------|----------|------------|
| `aria-errormessage` not consistently announced | JAWS + some browsers | Use `aria-describedby` instead for error messages |
| Dynamically injected `aria-live` regions ignored | Some screen readers | Pre-render the live region (empty) in initial DOM |
| `aria-label` on non-interactive, non-landmark elements | All screen readers (inconsistent) | Only use `aria-label` on interactive elements and landmarks |
| `display: none` to `display: block` focus issue | VoiceOver iOS | Use `visibility: hidden` / `visibility: visible` instead |
| `role="application"` disables virtual cursor | JAWS, NVDA | Almost never use `role="application"`; only for full canvas apps |
| Tables with dynamic rows | NVDA | Re-announce table structure; use `aria-rowcount` / `aria-colcount` |

### 4.4 Testing Recommendations

**Minimum testing matrix**:
- NVDA + Chrome (Windows) -- most common free combination
- JAWS + Chrome or Edge (Windows) -- enterprise standard
- VoiceOver + Safari (macOS) -- Apple ecosystem
- VoiceOver + Safari (iOS) -- mobile

**What to verify per component**:
1. Accessible name announced correctly
2. Role announced correctly
3. State changes announced (expanded, selected, checked, disabled)
4. Focus moves logically
5. Live region updates are announced
6. Arrow key navigation works in composite widgets (forms mode activates)

---

## 5. Keyboard Interaction Patterns (WAI-ARIA APG)

### 5.1 Navigation Model: Tab vs Arrow Keys

**General principle**: Tab moves BETWEEN widgets. Arrow keys move WITHIN a widget.

| Navigation | Key(s) | Context |
|-----------|--------|---------|
| Between components | `Tab` / `Shift+Tab` | Moves to next/previous focusable widget |
| Within composite widget | Arrow keys | Moves between items in tabs, menus, toolbars, grids, trees, listboxes |
| Activate / select | `Enter` and/or `Space` | Triggers the focused item's action |
| Dismiss / cancel | `Escape` | Closes popups, menus, dialogs; returns focus to trigger |

### 5.2 Component Keyboard Patterns

| Component | Tab Behavior | Internal Navigation | Activation | Escape |
|-----------|-------------|---------------------|------------|--------|
| **Button** | Focusable via Tab | N/A (single element) | `Enter` or `Space` | N/A |
| **Link** | Focusable via Tab | N/A | `Enter` only | N/A |
| **Checkbox** | Focusable via Tab | N/A | `Space` toggles | N/A |
| **Radio group** | One Tab stop for group | Arrow Up/Down or Left/Right | Selection follows focus | N/A |
| **Switch/Toggle** | Focusable via Tab | N/A | `Space` toggles | N/A |
| **Text input** | Focusable via Tab | Standard text editing keys | N/A | N/A |
| **Select / Listbox** | Focusable via Tab | Arrow Up/Down | `Enter` confirms selection | Closes if open |
| **Combobox** | Tab to input | Arrow Up/Down in popup list | `Enter` selects option | Closes popup |
| **Tabs** | One Tab stop for tablist | Arrow Left/Right (horizontal) or Up/Down (vertical) | Auto or manual activation | N/A |
| **Accordion** | Tab to each header | N/A (each header is a Tab stop) | `Enter` or `Space` toggles panel | N/A |
| **Menu** | Focus moves into menu on open | Arrow Up/Down (vertical), Left/Right (horizontal/submenu) | `Enter` or `Space` activates item | Closes menu, returns focus |
| **Menu button** | Focusable via Tab | `Enter`, `Space`, or `ArrowDown` opens menu | See Menu pattern | `Escape` closes menu |
| **Dialog (modal)** | Focus trapped inside | `Tab` cycles within dialog | N/A | Closes dialog |
| **Tooltip** | N/A (shown on focus/hover of trigger) | N/A | N/A | Dismisses tooltip |
| **Toolbar** | One Tab stop | Arrow Left/Right | `Enter` or `Space` activates tool | N/A |
| **Tree view** | One Tab stop | Arrow Up/Down (items), Right (expand), Left (collapse) | `Enter` activates | N/A |
| **Grid / Data grid** | One Tab stop (or Tab to rows) | Arrow keys (4-directional) | `Enter` on cell | N/A |
| **Slider** | Focusable via Tab | Arrow Left/Right or Up/Down changes value | N/A | N/A |
| **Disclosure** | Tab to trigger | N/A | `Enter` or `Space` toggles | N/A |
| **Breadcrumb** | Tab to each link | N/A | `Enter` navigates | N/A |
| **Pagination** | Tab to each control | N/A | `Enter` or `Space` navigates | N/A |
| **Alert / Toast** | Not focusable (live region) | N/A | N/A (or dismiss button) | N/A |

### 5.3 Enter vs Space: When Each Applies

| Key | Activates | Does NOT Activate |
|-----|----------|-------------------|
| `Enter` | Buttons, links, menu items, combobox selection, tree item activation | Checkboxes (in some implementations) |
| `Space` | Buttons, checkboxes, switches, radio buttons (select), menu items, toggle buttons | Links (Space scrolls page instead) |
| Both | Buttons, menu items, disclosure triggers, accordion headers, tab activation | -- |

**Critical rule**: `Space` on a link scrolls the page (browser default). Never rely on `Space` to activate links. `Enter` on a checkbox may submit a form. Prefer `Space` for toggle actions.

### 5.4 Escape Key Conventions

| Context | Escape Behavior | Focus Destination |
|---------|----------------|-------------------|
| Modal dialog | Closes dialog | Trigger element |
| Menu (from menu button) | Closes menu | Menu button |
| Submenu | Closes submenu only | Parent menu item |
| Combobox popup | Closes popup | Input field |
| Popover | Closes popover | Trigger element |
| Tooltip | Dismisses tooltip | No focus change |
| Dropdown select | Closes without changing selection | Select trigger |

---

## 6. Color & Visual Accessibility

### 6.1 Contrast Ratio Requirements (WCAG 2.2)

| Element Type | Minimum Ratio | WCAG Criterion | Level |
|-------------|--------------|----------------|-------|
| Normal text (< 18pt / < 14pt bold) | 4.5:1 | 1.4.3 Contrast (Minimum) | AA |
| Large text (>= 18pt / >= 14pt bold) | 3:1 | 1.4.3 Contrast (Minimum) | AA |
| UI components & graphical objects | 3:1 | 1.4.11 Non-text Contrast | AA |
| Focus indicators (change between states) | 3:1 | 2.4.13 Focus Appearance | AA |
| Incidental / disabled elements | Exempt | -- | -- |
| Logos / brand text | Exempt | -- | -- |

### 6.2 Focus Indicator Requirements (WCAG 2.4.13 Focus Appearance)

**Minimum focus indicator specifications**:
- **Perimeter method**: At least 1 CSS pixel solid outline around the entire component perimeter.
- **Side method**: At least 4 CSS pixel thick indicator along the shortest side.
- **Contrast**: The focus indicator pixels must have >= 3:1 contrast ratio between focused and unfocused states.
- **Not obscured**: The focus indicator must not be fully hidden by other content (2.4.12 Focus Not Obscured).

**Design system rules for focus indicators**:
```
Recommended default: 2px solid outline, offset 2px, using a high-contrast color.
- On light backgrounds: dark outline (e.g., #005fcc or black)
- On dark backgrounds: light outline (e.g., white or #66b3ff)
- On variable backgrounds: double-ring technique (dark ring + light ring)
```

### 6.3 Disabled States & Focus

- WCAG explicitly exempts disabled/inactive elements from contrast requirements.
- However, disabled elements should still be perceivable (users need to know the control exists).
- **Recommended approach**: Use `aria-disabled="true"` instead of HTML `disabled` when you want the element to remain focusable and discoverable via keyboard.
- When an element is disabled with `aria-disabled`, pair it with visual styling that dims it but remains above 2:1 contrast for discoverability (not required by WCAG, but a best practice).
- If using HTML `disabled`, the element is removed from tab order entirely. Consider whether this harms the user's ability to discover and understand the interface.

### 6.4 Color Independence

**Rule: Never use color alone to convey information.**

| Information Type | Color Only (Bad) | Color + Secondary Indicator (Good) |
|-----------------|-----------------|-----------------------------------|
| Error state | Red border only | Red border + error icon + error text |
| Success state | Green text only | Green text + checkmark icon + "Success" label |
| Required field | Red asterisk only | Red asterisk + "(required)" text or `aria-required="true"` |
| Link in text | Color change only | Color change + underline |
| Selected item | Background color only | Background color + checkmark or bold text |
| Status badge | Color dot only | Color dot + status text ("Active", "Offline") |
| Chart data series | Different colors only | Colors + patterns/shapes + legend |

**Design system rule**: Every status indicator component MUST include at least one non-color visual differentiator (icon, pattern, text label, shape, or border style).

---

## Quick Reference: Rules for the Interaction Agent

### When Generating Component Specs, ALWAYS:

1. **Specify the keyboard pattern** from Section 5.2 for every interactive component.
2. **Declare ARIA roles and states** using the correct attribute from Section 2.6.
3. **Define focus management**: where focus goes on open, close, and delete operations (Section 3.3).
4. **Choose Tab vs Arrow key navigation** based on whether the component is a composite widget (Section 5.1).
5. **Specify the live region politeness** for any component that announces dynamic changes (Section 2.4).
6. **Include focus indicator spec**: minimum 2px outline, 3:1 contrast, using `:focus-visible` (Section 6.2).
7. **Ensure color independence**: every state must have a non-color indicator (Section 6.4).
8. **Note screen reader quirks** if the component uses patterns with known issues (Section 4.3).

### When Generating Component Specs, NEVER:

1. Use ARIA when native HTML semantics suffice.
2. Add `role="presentation"` or `aria-hidden` to focusable or interactive elements.
3. Rely on `aria-errormessage` (use `aria-describedby` for broader support).
4. Use `role="application"` unless building a full canvas/game.
5. Assume all screen readers handle ARIA identically.
6. Use `display: none` toggling for elements that need focus on show (use `visibility` instead for iOS VoiceOver).
7. Specify color as the sole differentiator for any state.
8. Remove focus styles without providing an alternative visible indicator.

---

## Sources

- [axe-core by Deque](https://www.deque.com/axe/axe-core/)
- [axe-core GitHub](https://github.com/dequelabs/axe-core)
- [Common ARIA Mistakes - oidaisdes.org](https://www.oidaisdes.org/common-aria-mistakes.en/)
- [WAI-ARIA Top 6 Mistakes - Deque](https://www.deque.com/blog/wai-aria-top-6-mistakes-to-avoid/)
- [Web Accessibility Common ARIA Mistakes - freeCodeCamp](https://www.freecodecamp.org/news/web-accessibility-common-aria-mistakes-to-avoid/)
- [ARIA Live Regions Cheatsheet](https://rightsaidjames.com/2025/08/aria-live-regions-when-to-use-polite-assertive/)
- [ARIA Live Regions - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- [Complete Guide to ARIA Live Regions - A11Y Collective](https://www.a11y-collective.com/blog/aria-live/)
- [When Your Live Region Isn't Live - k9n.dev](https://k9n.dev/blog/2025-11-aria-live/)
- [ARIA presentation role - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role)
- [Hiding Semantics with presentation Role - W3C APG](https://www.w3.org/WAI/ARIA/apg/practices/hiding-semantics/)
- [Developing a Keyboard Interface - W3C APG](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- [Keyboard Navigation Patterns for Complex Widgets - UXPin](https://www.uxpin.com/studio/blog/keyboard-navigation-patterns-complex-widgets/)
- [APG Patterns - W3C](https://wai-website.netlify.app/aria/apg/patterns/)
- [NVDA vs JAWS vs VoiceOver 2025 Comparison](https://accessibility-test.org/blog/development/screen-readers/nvda-vs-jaws-vs-voiceover-2025-screen-reader-comparison/)
- [Screen Reader Testing Guide - TestParty](https://testparty.ai/blog/screen-reader-testing-guide)
- [Common ARIA Problems in Audits - cerovac.com](https://cerovac.com/a11y/2024/03/common-aria-problems-found-in-accessibility-audits/)
- [Screen Reader ARIA Compatibility - PowerMapper](https://www.powermapper.com/tests/screen-readers/aria/)
- [No Need to Trap Focus on Dialog Element - CSS-Tricks](https://css-tricks.com/there-is-no-need-to-trap-focus-on-a-dialog-element/)
- [Complete Guide to Focus Management - greeden.me](https://blog.greeden.me/en/2025/11/10/complete-guide-to-accessibility-for-keyboard-interaction-focus-management-order-visibility-roving-tabindex-shortcuts-and-patterns-for-modals-tabs-menus/)
- [Focus Considerations - a11y-dialog](https://a11y-dialog.netlify.app/advanced/focus-considerations/)
- [focus-trap GitHub](https://github.com/focus-trap/focus-trap)
- [WCAG 2.4.13 Focus Appearance - W3C](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
- [:focus-visible - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible)
- [:focus vs :focus-visible - pawelgrzybek.com](https://pawelgrzybek.com/the-difference-between-css-focus-and-focus-visible-pseudo-class/)
- [Contrast Requirements for WCAG 2.2 Level AA](https://www.makethingsaccessible.com/guides/contrast-requirements-for-wcag-2-2-level-aa/)
- [Color Contrast Requirements Guide - TestParty](https://testparty.ai/blog/color-contrast-requirements)
- [Contrast and Color Accessibility - WebAIM](https://webaim.org/articles/contrast/)
- [Landmark Regions - W3C APG](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)
- [Skip Navigation Links - WebAIM](https://webaim.org/techniques/skipnav/)
- [Accessibility Testing with Storybook](https://storybook.js.org/docs/writing-tests/accessibility-testing)
- [Automate Accessibility Tests with Storybook](https://storybook.js.org/blog/automate-accessibility-tests-with-storybook/)
- [Lighthouse Accessibility Scoring - Chrome Developers](https://developer.chrome.com/docs/lighthouse/accessibility/scoring)
- [Making Disabled Buttons More Inclusive - CSS-Tricks](https://css-tricks.com/making-disabled-buttons-more-inclusive/)
- [aria-disabled - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)
- [ARIA Best Practices - TestParty](https://testparty.ai/blog/aria-best-practices)
