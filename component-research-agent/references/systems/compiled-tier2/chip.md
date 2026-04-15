---
component: Chip
tier: 2
last_verified: 2026-03-31
---

# Chip — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | — | No dedicated Chip component; Tag covers dismissible tokens; Badge for status labels; filter/choice chip patterns require custom composition from buttons | low |
| Salesforce Lightning | Pill | Removable selected items with icon/avatar; used as input chips in lookup fields and comboboxes; Pill Container for groups; no filter/choice chip variant | high |
| GitHub Primer | — | No chip component; Label for color-coded metadata; SegmentedControl or ToggleSwitch for filter/selection patterns; no removable input token component | low |
| shadcn/ui | Badge + Toggle | Badge for display labels; Toggle or ToggleGroup for selectable chip behavior; no unified chip component; consumer composes removable chips from Badge + Button | medium |
| Playbook | Tag | Categorical labels with optional close button for removal; no selectable/filter chip variant; dual React/Rails | medium |
| REI Cedar | CdrChip | Selectable chip with filter and choice variants; toggle behavior with `aria-pressed`; icon support; WCAG 2.1 AA; the only T2 system with a dedicated interactive chip component | high |
| Wise Design | Chip/Tag | Filter chip for search refinement; removable tokens in input fields; minimal documentation | low |
| Dell Design System | Tag/Chip | Enterprise filter and category chips; removable variant for selected filters; limited public documentation | low |

## Key Decision Patterns

**Chip as a distinct concept vs. composed from other primitives:** Cedar CdrChip is the only T2 system that provides a dedicated interactive chip component with built-in selectable behavior. Lightning Pill covers the input chip (removable token) use case specifically. Most other T2 systems — Paste, Primer, shadcn/ui — do not provide a chip component and instead expect consumers to compose chip-like patterns from existing primitives: badges for display, toggle buttons for selection, and close buttons for removal.

**Input chip vs. filter chip:** Lightning Pill is purpose-built for the input chip pattern — a selected item in a lookup field that can be removed. Cedar CdrChip is purpose-built for the filter chip pattern — a selectable toggle that filters content. These are fundamentally different interaction models: input chips represent user-entered data (removable tokens), while filter chips represent predefined options (toggleable filters). T2 systems that lack a chip component force this distinction onto consumer-level composition.

**Selectable chip accessibility:** Cedar CdrChip uses `aria-pressed` for toggle state on selectable chips, treating them as toggle buttons. This is the correct pattern for filter chips (single select uses radio-like behavior, multi-select uses checkbox-like behavior). Lightning Pill uses a remove button with descriptive `aria-label` for the input chip pattern. The two patterns require different ARIA approaches because they serve different purposes.

**Group management:** Lightning provides Pill Container for managing groups of removable pills. Cedar supports chip groups for filter panels. shadcn/ui's ToggleGroup provides the group selection pattern but without chip styling. No T2 system provides a unified chip group that handles both filter selection and input token management.

## A11y Consensus
- Selectable/filter chips: use `role="button"` with `aria-pressed` for toggle behavior; in groups, consider `role="radio"` (single-select) or `role="checkbox"` (multi-select)
- Removable/input chips: include a remove button with `aria-label="Remove [chip name]"` — never a generic "Remove" or bare "×"
- Chip groups: wrap in a labeled container (`role="group"` with `aria-label`) so screen readers announce the group context
- Disabled chips: use `aria-disabled="true"` and remove from tab order or ensure non-operable; never rely on visual opacity alone
- Color must not be the sole indicator of chip state — selected state needs visual affordance beyond color (checkmark icon, border, or text change)

## Recommended Use
Use Cedar CdrChip as the primary T2 reference for interactive chip patterns (filter and choice). Use Lightning Pill for input chip (removable token) patterns in lookup fields. Use shadcn/ui Badge + ToggleGroup composition as a reference for systems that build chips from primitives rather than providing a dedicated component.
