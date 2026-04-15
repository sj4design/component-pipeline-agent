# Button Family — Pre-loaded Interaction Data

> Derived from 14 default systems + accessibility libraries (Radix, Headless UI, React Aria)

## Family hierarchy

```
Button ──┬── IconButton (inherits Button, aria-label required)
         ├── SplitButton (button + menu)
         └── ButtonGroup (toolbar pattern)
```

## Color palette (for artifact)

```
button:      { color:"#2563EB", bg:"#EFF6FF", border:"#93C5FD" }
iconbutton:  { color:"#7C3AED", bg:"#F5F3FF", border:"#C4B5FD" }
splitbutton: { color:"#059669", bg:"#ECFDF5", border:"#6EE7B7" }
buttongroup: { color:"#D97706", bg:"#FFFBEB", border:"#FCD34D" }
```

---

## 1. ARIA Mapping

### Button

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| root | button | button | — | 4.1.2 | Native `<button>` preferred (implicit role) |
| root (link) | a | link | — | 4.1.2 | If navigates. Never role="button" on `<a>` with href |
| root (toggle) | button | button | aria-pressed="true/false" | 4.1.2 | Toggle variant |
| root (loading) | button | button | aria-busy="true", aria-disabled="true" | 4.1.3 | Disable + announce loading |
| label | span | — | — | — | Text content provides accessible name |
| icon-leading | span | — | aria-hidden="true" | — | Decorative when label exists |

### IconButton

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| root | button | button | aria-label="[action]" REQUIRED | 1.1.1 | No visible label → aria-label mandatory |
| icon | svg | img | aria-hidden="true" | — | Name comes from aria-label on root |
| tooltip | div | tooltip | id linked via aria-describedby | — | Optional, provides additional context |

### SplitButton

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| action-button | button | button | — | 4.1.2 | Primary action |
| menu-trigger | button | button | aria-haspopup="menu", aria-expanded | 4.1.2 | Opens dropdown |
| menu | ul | menu | aria-label="More options" | 4.1.2 | APG Menu pattern |
| menu-item | li | menuitem | — | 4.1.2 | — |

### ButtonGroup

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| root | div | toolbar | aria-label="[group purpose]" | 4.1.2 | APG Toolbar pattern |
| button-n | button | button | — | 4.1.2 | Individual buttons |

---

## 2. Keyboard Navigation

### Button context

| Key | Action | WCAG |
|-----|--------|------|
| Enter | Activate button | 2.1.1 |
| Space | Activate button | 2.1.1 |
| Tab | Move to next focusable element | 2.1.1 |

### SplitButton context

| Key | Action | WCAG |
|-----|--------|------|
| Tab | Focus action-button, then Tab to menu-trigger | 2.1.1 |
| Enter/Space (action) | Activate primary action | 2.1.1 |
| Enter/Space (trigger) | Open menu | 2.1.1 |
| ↓ | Open menu (on trigger), navigate menu items | 2.1.1 |
| ↑ | Navigate menu items (last to first) | 2.1.1 |
| Escape | Close menu, return focus to trigger | 2.1.2 |
| Home/End | First/last menu item | 2.1.1 |

### ButtonGroup (Toolbar pattern)

| Key | Action | WCAG |
|-----|--------|------|
| Tab | Enter group (first/last focused button) | 2.1.1 |
| → | Next button in group | 2.1.1 |
| ← | Previous button in group | 2.1.1 |
| Home | First button | 2.1.1 |
| End | Last button | 2.1.1 |
| Tab (from inside) | Leave group entirely | 2.1.1 |

---

## 3. Focus Management

```
F1. Native <button> gets focus by default. No tabindex needed.
    [WCAG 2.4.3]

F2. Disabled button: NOT focusable (removed from tab order).
    Use native disabled attribute.
    Exception: in toolbar/group → aria-disabled="true" (stays focusable).
    [WCAG 4.1.2 · APG Toolbar]

F3. Loading state: aria-disabled="true" + aria-busy="true".
    Button stays focusable (user can see it's processing).
    [Spectrum pattern]

F4. ButtonGroup: roving tabindex. Tab enters group, arrows navigate.
    Only one button in tab order at a time.
    [APG Toolbar]

F5. SplitButton menu: focus to first item on open.
    Escape → focus returns to trigger.
    [APG Menu]

F6. Focus ring: visible on :focus-visible, hidden on :focus:not(:focus-visible).
    Minimum 2px offset, 3:1 contrast ratio.
    [WCAG 2.4.7, 2.4.11]
```

---

## 4. Screen Reader Announcements

| Event | Announcement | Method | WCAG |
|-------|-------------|--------|------|
| Button focused | "[label], button" | Native role | 4.1.2 |
| Toggle pressed | "[label], toggle button, pressed/not pressed" | aria-pressed | 4.1.2 |
| Loading starts | "[label], button, busy" | aria-busy="true" | 4.1.3 |
| Loading ends | Content update announced | aria-busy="false" | 4.1.3 |
| IconButton focused | "[aria-label], button" | aria-label | 1.1.1 |
| Menu opens | "[label], menu" | role="menu" | 4.1.2 |

---

## 5. Touch Adaptation

```
T1. Minimum touch target: 44×44px (WCAG 2.5.5 Enhanced).
    sm size (32px height): ensure 44px touch area via padding/margin.
    [WCAG 2.5.8 minimum 24×24px Level AA]

T2. No hover-dependent content. All actions via tap.
    Tooltip on IconButton: visible on long-press or focus, not hover-only.

T3. Active state (:active) provides immediate feedback.
    No delay on touch — use touch-action: manipulation.
```

---

## 6. Edge Cases

```
EC1 · HIGH · IconButton without aria-label
  Problem: No visible text = no accessible name.
  Behavior: MUST have aria-label or aria-labelledby.
  Implementation: Lint/runtime warning if neither exists.
  Compliance: WCAG 1.1.1 (Level A)

EC2 · HIGH · Button as link (navigation)
  Problem: Button styled as link or vice versa.
  Behavior: Use <a> for navigation, <button> for actions. Never role="button" on <a>.
  Implementation: Conditional render based on href prop.
  Compliance: WCAG 4.1.2

EC3 · MEDIUM · Disabled button with tooltip
  Problem: Disabled button can't receive focus → tooltip inaccessible.
  Behavior: Use aria-disabled="true" instead of disabled to keep focusable.
  Implementation: aria-disabled + pointer-events:none + tooltip on focus.
  Source: Spectrum, Atlassian pattern
  Compliance: WCAG 4.1.2

EC4 · MEDIUM · Loading replaces label
  Problem: If spinner replaces text, accessible name disappears.
  Behavior: Keep text (visually hidden if needed) + aria-busy.
  Implementation: Spinner aria-hidden="true", text position:absolute clip.
  Compliance: WCAG 4.1.2

EC5 · LOW · ButtonGroup overflow
  Problem: Too many buttons → overflow on small viewports.
  Behavior: Overflow menu or horizontal scroll.
  Implementation: IntersectionObserver to detect overflow.
  Compliance: WCAG 1.4.10
```

---
_Pre-loaded data for Interaction Spec Agent · Button Family_
_Source: 14 default DS + Radix + Headless UI + React Aria_
