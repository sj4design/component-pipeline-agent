# WCAG 2.2 AA — Default Compliance Reference

> Always loaded. This is the baseline for every interaction spec.

## Level A (Legal Minimum)

| SC | Name | Rule |
|---|---|---|
| 1.3.1 | Info and Relationships | Structure and relationships conveyed visually MUST be available programmatically (roles, headings, labels). |
| 1.3.4 | Orientation | Content MUST NOT restrict display to a single orientation unless essential. |
| 2.1.1 | Keyboard | All functionality MUST be operable via keyboard. No mouse-only actions. |
| 2.1.2 | No Keyboard Trap | Focus MUST be movable away from any component. If non-standard exit → document it. |
| 3.2.6 | Consistent Help | Help mechanisms in same relative location across pages. |
| 3.3.1 | Error Identification | Errors MUST be identified and described to the user in text. |
| 3.3.2 | Labels or Instructions | Labels or instructions provided when content requires user input. |
| 3.3.7 | Redundant Entry | Don't ask users to re-enter info already provided in same session. |
| 4.1.2 | Name, Role, Value | Every interactive element exposes: accessible name, role, current state/value. |

## Level AA (Target Standard)

| SC | Name | Rule |
|---|---|---|
| 1.4.3 | Contrast (Minimum) | Text: 4.5:1. Large text: 3:1. |
| 1.4.11 | Non-text Contrast | UI components and graphical objects: 3:1 against adjacent colors. |
| 2.4.3 | Focus Order | Tab order MUST match logical reading/operation order. |
| 2.4.7 | Focus Visible | Every focusable element MUST have a visible focus indicator. |
| 2.4.11 | Focus Not Obscured (Min) | Focused element MUST NOT be entirely hidden by sticky headers/footers/overlays. |
| 2.5.8 | Target Size (Minimum) | Interactive targets >= 24×24 CSS pixels, or sufficient spacing. |
| 3.3.8 | Accessible Authentication | No cognitive function tests unless alternatives exist. |
| 4.1.3 | Status Messages | Status messages announced to AT without receiving focus. |

## Level AAA (Recommended)

| SC | Name | Rule |
|---|---|---|
| 2.4.12 | Focus Not Obscured (Enhanced) | No part of focused component hidden by author content. |
| 2.4.13 | Focus Appearance | Focus indicator >= 2px perimeter AND >= 3:1 contrast between states. |
| 2.5.5 | Target Size (Enhanced) | Interactive targets >= 44×44 CSS pixels. |

## APG Best Practices

| Pattern | Rule |
|---|---|
| Roving tabindex | Composite widgets = one Tab stop. Arrow keys navigate internally. |
| Focus restoration | On popup close → return focus to trigger. |
| Live regions | Pre-render empty container. Populate with text to trigger announcement. |
| Disabled in composites | Use aria-disabled="true" (keeps focusable/discoverable). |
| Naming priority | aria-labelledby > aria-label > native label > title. |

---
_Source: W3C WCAG 2.2 Specification + WAI-ARIA APG_
