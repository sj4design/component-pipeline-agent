---
component: Chip
tier: 3
last_verified: 2026-03-31
---

# Chip — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | — (Themes: Badge) | No interactive chip primitive; Badge (Themes) for display only; consumer must compose selectable/removable chips from ToggleGroup + Badge styling; headless architecture leaves chip patterns to implementation | medium |
| Chakra UI | Tag | Compound component: Tag + TagLabel + TagCloseButton; supports removable chip pattern; `colorScheme` + size variants; no built-in selectable/toggle mode — filter chip requires external state management with Tag styling | high |
| GOV.UK | Tag | Status indicators only; 10 semantic colors; strictly display-only; no interactive chip concept; government services use custom filter patterns outside the design system | high |
| Base Web | Tag | Three interaction modes via callbacks: static (no callbacks), removable (`onActionClick`), clickable (`onClick`); `kind` semantic system (neutral/primary/accent/positive/negative/warning); closest T3 to a unified chip component covering input and filter patterns | high |
| Fluent 2 | Tag / InteractionTag / TagPicker | Most granular T3 chip architecture: Tag (display), InteractionTag (clickable/dismissible), TagPicker (complete multi-value input with type-to-filter, suggestions dropdown, and per-tag removal); InteractionTag explicitly separates the chip body click from the dismiss action | high |
| Gestalt | Tag | `onRemove` enables removable mode; `type` prop for semantic color (error, warning, default); `disabled` state; no selectable/filter chip variant; remove button `aria-label` includes tag text | medium |
| Mantine | Chip / Chip.Group | Dedicated interactive chip component with built-in toggle behavior; `Chip.Group` manages single-select (radio) or multi-select (checkbox) groups; `type="checkbox"` or `type="radio"` sets selection model; the clearest T3 filter chip implementation | high |
| Orbit | Tag | Selected state for filter chips in travel search; `onClick` for toggle + `onRemove` for dismiss; `aria-pressed` for toggle state; supports both filter and removable modes in one component | medium |
| Evergreen | Badge / TagInput | Two-component split: Badge (display) and TagInput (type to add, X to remove); TagInput for pipeline tag entry; no selectable/filter chip component | medium |
| Nord | Badge (nord-badge) | Healthcare status labels; web component; non-interactive display only; no chip interaction patterns | low |

## Key Decision Patterns

The most important architectural decision across T3 systems is how to handle the four chip subtypes — display, input (removable), filter (selectable), and assist (action). Mantine is the only T3 system that provides a purpose-built interactive chip with Chip and Chip.Group, explicitly supporting radio (single-select) and checkbox (multi-select) selection models for filter chip panels. Base Web's Tag comes closest to a unified component by using callback presence to determine mode: no callbacks produces a static chip, `onActionClick` produces a removable chip, and `onClick` produces a clickable/selectable chip. Fluent 2 takes the most granular approach with three separate components — Tag (display), InteractionTag (interactive), and TagPicker (full input system). The remaining T3 systems either provide only removable tags (Chakra, Gestalt) or only display tags (GOV.UK, Nord, Radix Badge).

Fluent 2's three-component architecture (Tag / InteractionTag / TagPicker) reveals a critical interaction design distinction that other systems conflate. InteractionTag separates the chip body interaction (clicking the chip itself) from the dismiss action (clicking the X button). This dual-action model means a chip can be both clickable (to view details or navigate) and dismissible (to remove it from a selection) — a pattern common in email recipient chips where clicking opens a contact card while X removes the recipient. Chakra's compound Tag supports this through TagCloseButton but does not distinguish click-on-body from click-on-close at the component API level. Base Web conflates them through `onClick` vs. `onActionClick` callbacks. The explicit separation matters for keyboard navigation: Tab should move between chips, Enter should activate the primary action, and Delete or Backspace should dismiss.

Mantine's Chip.Group with `type="radio"` or `type="checkbox"` is the reference implementation for filter chip panels. The group manages selection state internally, provides proper `role="group"` semantics, and switches between single-select and multi-select behavior through a single prop. Orbit's Tag achieves similar toggle behavior with `aria-pressed` on individual tags but lacks group management. Base Web's clickable mode provides the toggle but requires consumer-managed group state. For the common pattern of "select one or more filters from a set of chips," Mantine's approach produces the cleanest API and the most accessible output with the least consumer effort.

The removable chip accessibility pattern is well-established across T3 but inconsistently implemented. Gestalt, Base Web, and Fluent 2 all include the chip's text content in the remove button's `aria-label` — "Remove Python" rather than "Remove." Chakra's TagCloseButton defaults to a generic label, which fails in multi-chip contexts. For input chips (TagInput / TagPicker patterns), Fluent 2 and Evergreen both handle announcing additions and removals to screen readers, but Evergreen's TagInput does not provide `aria-live` announcements by default. The consensus requirement is: every removable chip must have a descriptive remove label, and chip addition/removal in input contexts must be announced.

## A11y Consensus

- Filter chips in groups must use proper group semantics: `role="group"` with `aria-label` on the container; individual chips use `role="radio"` (single-select) or `role="checkbox"` (multi-select) with `aria-checked`, or `role="button"` with `aria-pressed` for toggle behavior
- Remove buttons on chips must include the chip's content in the `aria-label` — "Remove JavaScript" not "Remove" or "×" — to differentiate when multiple chips are present
- Chip input components (type-to-add patterns) must announce additions and removals via `aria-live="polite"` or managed focus; silent additions are an accessibility failure
- Disabled chips require `aria-disabled="true"` and must be visually distinguishable beyond opacity alone; Gestalt and Base Web both support disabled state
- Selected state for filter chips must be programmatically determinable — `aria-pressed="true"`, `aria-checked="true"`, or `aria-selected="true"` depending on the role used; visual-only selection indicators (background color change) are insufficient

## Recommended Use

Reference T3 chip approaches when deciding on component architecture and interaction model. Mantine Chip/Chip.Group is the reference for filter chip panels with radio/checkbox selection semantics. Fluent 2 InteractionTag is the reference for dual-action chips (body click + dismiss) and TagPicker for complete multi-value input systems. Base Web Tag is the reference for a unified single-component approach covering static, removable, and clickable modes. Chakra Tag is the reference for compound chip architecture with dedicated close button. GOV.UK Tag provides the strictest semantic color guidance for display-only status chips.
