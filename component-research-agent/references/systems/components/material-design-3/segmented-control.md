---
system: Material Design 3
component: Segmented buttons
url: https://m3.material.io/components/segmented-buttons
last_verified: 2026-03-28
---

# Segmented Control (Material Design 3)

## Approach
Material Design 3 calls this component "Segmented buttons" and it is one of the most thoroughly specified components in the system, reflecting Google's use of the pattern across Android, Wear OS, and Material Web. MD3 explicitly separates two distinct use cases into two variants within the same component: single-select (like a radio group — only one option active at a time) and multi-select (like a checkbox group — multiple options can be active simultaneously). This dual-purpose design is a deliberate choice to avoid needing two separate components for what is visually identical UI — the selection model changes, but the layout, sizing, density, and animation do not. MD3's segmented buttons sit in a tonal design language: the active (selected) segment fills with the `SecondaryContainer` color and its checkmark icon replaces or supplements the segment label icon, providing a clear visual affordance that the segment is "on." The component is intentionally compact — it is not meant for complex navigation (that's what NavigationBar is for) but for in-context filtering and view switching within a surface.

## Key Decisions
1. **Single-select and multi-select as variants of one component** (HIGH) — MD3 uses the same component for both selection models, controlled by the developer's state management rather than a separate prop. This avoids component sprawl but places responsibility on the team to communicate the selection model to users via label design and context. The visual difference between single and multi-select is the presence of checkmarks on selected items in multi-select mode.
2. **Checkmark icon replaces leading icon on selection** (MEDIUM) — When a segment has a leading icon and is selected, the checkmark icon replaces the leading icon (in single-select) or appears alongside it (in multi-select). This animated swap provides a strong visual confirmation of selection state without requiring a change in the label text. The decision was driven by Material's animation-as-feedback philosophy, where state changes are always communicated through motion.
3. **Maximum 5 segments** (MEDIUM) — MD3 specification explicitly limits segmented buttons to 5 segments maximum. Beyond 5, the recommended alternative is a Dropdown menu or Tabs. This constraint exists because the component's fixed-height layout causes labels to truncate on smaller screens with more segments, degrading usability on Android devices where the pattern is most commonly used.

## Notable Props
- No standard React component API in Material Web Components as of early 2026; the web component is implemented as `<md-segmented-button-set>` with `<md-segmented-button>` children.
- `selected` attribute on individual `<md-segmented-button>` elements controls selection state.
- `data-value`: Custom attribute pattern used to identify which segment is selected.

## A11y Highlights
- **Keyboard**: Arrow keys move between segments within the group (roving tabindex pattern); Tab moves focus out of the group.
- **Screen reader**: The group has `role="group"` with an `aria-label`; individual buttons have `role="radio"` in single-select mode and `role="checkbox"` in multi-select mode, providing the correct semantic model.
- **ARIA**: `aria-checked` on each button reflects selection state. MD3 web component implementation follows the ARIA button group pattern from the APG (ARIA Practices Guide).

## Strengths & Gaps
- **Best at**: Multi-select variant — the combination of checkmark animation and checkbox ARIA semantics makes multi-select segmented buttons unusually clear in both visual and accessible modalities.
- **Missing**: No overflow handling for wide content or many segments; no responsive behavior guidance for small viewports where 5 segments may not fit.
