---
component: Tag
tier: 3
last_verified: 2026-03-29
---

# Tag — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Badge (Themes) | Display-only; full color scale with solid/soft/outline/surface variants; `highContrast` option; removable tags require consumer composition with external close button. | high |
| Chakra UI | Tag | Compound: Tag + TagLabel + TagCloseButton + TagLeftIcon/TagRightIcon; `TagCloseButton` ensures accessible remove button; `colorScheme` + variant system. | high |
| GOV.UK | Tag | Status indicators only; 10 semantic colors with explicit guidance on which color maps to which status type; display-only; text must always convey meaning independent of color. | high |
| Base Web | Tag | Three modes: static/removable/clickable via `onActionClick`/`onClick`; `kind` semantic system (neutral/primary/accent/positive/negative/warning); Overrides; remove button `aria-label` includes tag text. | medium |
| Fluent 2 | Tag / TagPicker | Most complete T3 implementation: Tag with `dismissible`; TagPicker as full multi-value input (type to filter, select, display as tags, remove); Office recipient field pattern. | high |
| Gestalt | Tag | `onRemove` callback switches to removable mode; remove button `aria-label` includes tag text (e.g., "Remove travel"); `disabled` state; minimal design. | medium |
| Mantine | Badge / Chip | Two-component split: Badge (display) and Chip (interactive selection/toggle); `Chip.Group` for multi-select filter panels (single or multi mode); Badge supports gradient variant. | high |
| Orbit | Tag | Selected state for filter chips in flight search; `onClick` toggle + `onRemove` remove; `aria-pressed` for toggle state; used in travel search result filters. | medium |
| Evergreen | Badge / TagInput | Two-component split: Badge (display) and TagInput (type to add, X to remove); `TagInput` with `values`/`onAdd`/`onRemove` for pipeline configuration tag entry. | medium |
| Nord | Badge (nord-badge) | Healthcare status labels (Active, Discharged, Urgent); text-over-color principle; web component for clinical system portability; non-interactive. | low |

## Key Decision Patterns

The most significant architectural divide in T3 tag components is display versus interactive, and how systems handle the split. Mantine and Evergreen are the clearest: both provide a display component (Badge) and a separate interactive component (Chip and TagInput respectively). Radix also separates them, providing Badge for display and pointing to consumer composition for interactive. Chakra, Base Web, and Gestalt build both modes into a single component: passing a close callback enables the remove button, while omitting it produces a static label. Fluent 2 goes furthest by providing Tag for individual interactive labels and TagPicker as a complete multi-value input system. The single-component approach (Chakra, Base Web, Gestalt) is more convenient for cases where a tag may conditionally be removable; the split-component approach (Mantine, Evergreen) produces cleaner APIs but requires importing two components.

Fluent 2's TagPicker is the only T3 system to provide a complete multi-value tag input out of the box. TagPicker combines a text input for typing, a filtered suggestion dropdown, selected tag display, and per-tag removal into a single component — covering the Outlook recipients field, Teams channel @mention entry, and SharePoint tag assignment patterns. Every other T3 system requires composing this pattern from separate components: a text input, a combobox or autocomplete for suggestions, and individual Tag components for selected values. The benefit of Fluent 2's integrated approach is consistent behavior and accessibility across all Microsoft products that use tag input; the cost is a component API with many props that is harder to customize.

GOV.UK's semantic color guidance is the most opinionated tag system in the T3 set and also the most practically useful for teams building status-driven government services. Rather than providing arbitrary color options, GOV.UK defines exactly which status concept maps to which color: blue for active/in-progress, green for complete/success, red for rejected/failed, orange for warning, and so on. This prevents the fragmentation that occurs when different teams within the same service independently choose different colors for the same status type. The guidance also explicitly enforces the text-over-color principle: the tag text must convey the status meaning independently of the color, so colorblind users and those reading in high-contrast mode get the full information. GOV.UK and Nord both enforce this; other T3 systems leave color semantics to consumer discretion.

The accessible remove button label pattern for removable tags reveals an important implementation gap. Gestalt and Base Web both require the remove button `aria-label` to include the tag's text content — "Remove travel" rather than just "Remove" or "×". This distinction matters when multiple tags are displayed together: a screen reader user needs to know which tag will be removed. Chakra's `TagCloseButton` defaults to a generic "Close" aria-label, which is insufficient in multi-tag contexts. The correct label format is `Remove [tag content]` or `[tag content], remove` — this pattern is documented in WCAG 1.3.1 and is a commonly failed criterion in tag input components.

## A11y Consensus

- Remove buttons on tags must have descriptive `aria-label` values that identify which tag will be removed — "Remove Python" or "Remove label: Design," not just "Remove" or an × icon without a label. Generic remove labels on multi-tag displays are a frequent accessibility failure.
- Static (non-interactive) tags are inline text elements and require no special ARIA — they read naturally as part of their surrounding content; no `role` attribute is needed.
- Selectable/togglable tags (filter chips) must communicate their selected state: `aria-pressed` for toggle buttons or `aria-checked` if in a `role="group"` with checkbox semantics; `role="checkbox"` in a group (Mantine's Chip.Group approach) is the preferred pattern for multi-select filter chips.
- Tag color must not be the only means of conveying status — the tag label text must identify the status (GOV.UK and Nord's explicit requirement); color provides visual scanning efficiency but text provides the accessible meaning.
- TagInput components (typing to add tags) must announce tag additions and removals to screen readers via `aria-live="polite"` or explicit focus management — without this, adding a tag via keyboard produces no screen reader feedback.

## Recommended Use

Reference T3 tag approaches when deciding on display-vs-interactive architecture, remove button accessibility, and complete tag input systems. Fluent 2 is the reference for TagPicker as a complete multi-value input system for recipient/label-entry patterns; Chakra is the reference for compound Tag with dedicated TagCloseButton; Mantine is the reference for Badge/Chip split and Chip.Group for filter panel multi-select; GOV.UK is the reference for semantic color guidance and the text-over-color principle; Gestalt and Base Web are the references for contextual remove button `aria-label` patterns.
