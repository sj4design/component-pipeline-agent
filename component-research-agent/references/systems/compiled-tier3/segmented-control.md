---
component: Segmented Control
tier: 3
last_verified: 2026-03-29
---

# Segmented Control — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | SegmentedControl (Themes) | Themes-only; radio group semantics (not tabs); CSS animated sliding indicator; `prefers-reduced-motion` respected; `size` and `radius` Themes tokens. | high |
| Chakra UI | SegmentedControl (v3 only) | Not in v2; v3 adds native component with radio semantics and animated indicator; v2 workaround via styled RadioGroup; `colorScheme` and `size` props. | medium |
| GOV.UK | Not available — Tabs/Radios preferred | No component; "one thing per page" and platform-agnostic philosophy exclude the iOS-associated pattern; Tabs for view-switching, Radios + submit for filtering. | high |
| Base Web | Not available — ButtonGroup mode="radio" | ButtonGroup with `mode="radio"` provides single-select semantics and arrow navigation; visual customization via Overrides; no animated indicator default. | high |
| Fluent 2 | SegmentedControl (preview) | Preview status; radio group semantics; icon + text segment support; Teams/SharePoint view switching; selected state via filled indicator (shape + contrast, not color alone). | medium |
| Gestalt | Not available — Tabs preferred | Tabs covers view-switching; internal toggle uses Button composition; excluded from public system as too similar to Tabs; mobile narrow-viewport degradation concern. | high |
| Mantine | SegmentedControl | First-class stable component; CSS `transform: translateX()` sliding indicator with `transitionDuration`/`transitionTimingFunction` customization; `orientation` (horizontal/vertical); `data` array API; `fullWidth`. | high |
| Orbit | Not available — domain-specific flight type selector | One-way/round-trip/multi-city toggle is domain-coupled (triggers form restructuring); no other use cases in booking UI; Tabs for informational view switching. | high |
| Evergreen | SegmentedControl | Analytics view-mode switching (chart type, time range); data-driven `options` array; controlled state; `size` variants; no icon-only segments. | high |
| Nord | Not available — Tabs and RadioGroup preferred | Clinical option selection requires form semantics (required, label, form submission) that radio groups provide; consumer toggle aesthetic undersells clinical decision gravity. | high |

## Key Decision Patterns

The T3 set reveals a consistent semantic debate: should a segmented control use tab semantics (`role="tablist"`) or radio semantics (`role="radiogroup"`)? All T3 systems that implement the component — Radix, Chakra v3, Fluent 2, Mantine, Evergreen — choose radio semantics. The reasoning is consistent: tabs navigate between content panels (the active panel is content that corresponds to the active tab); a segmented control selects a value that changes a view mode or filter, which maps to a radio group (one of N values is selected). The visual similarity of segmented controls to tab bars tempts teams to use tab semantics, but the interaction model is different: radio groups don't have "owned panels" and their keyboard behavior (arrow keys select immediately, no focused-but-unselected state) differs from tabs.

Nord's rejection of the segmented control for clinical contexts, combined with the specific argument that the pattern's visual language signals "lightweight preference" rather than "clinical decision," is the most thoughtful UX argument in the T3 set. Consumer design (iOS Maps' map/satellite toggle) and clinical software (medication frequency selection) require different visual gravitas for their option-selection controls. Nord argues that the pill-toggle aesthetic actively works against the deliberate, form-like interaction required for clinical data entry — using the same visual language as iOS view preferences for patient triage level selection would be inappropriate regardless of the underlying semantics.

Mantine's implementation is the most complete in the T3 set: `orientation` (horizontal and vertical), `fullWidth`, CSS transition customization, `prefers-reduced-motion` support, and data-driven `data` prop. The vertical orientation is specifically useful for sidebar filter panels and settings navigation — most other systems only support horizontal layout. The `transitionDuration` prop for the sliding indicator animation is a rare level of animation control in a design system component.

The systems that lack a dedicated SegmentedControl (GOV.UK, Gestalt, Nord, Orbit) all have the same structural argument: the component's use cases are better served by semantically purer alternatives (Tabs for navigation, RadioGroup for selection) that provide stronger accessibility semantics and more appropriate visual language for their product contexts.

## A11y Consensus

- The correct ARIA pattern for a segmented control is `role="radiogroup"` with `role="radio"` and `aria-checked` per segment — not `role="tablist"`, which implies content panel ownership that segmented controls do not have.
- Arrow keys (Left/Right for horizontal, Up/Down for vertical) navigate between segments; selection should activate immediately on arrow key press (roving tabindex pattern) — Tab enters and exits the group as a single focus stop.
- The group must have an accessible name via `aria-label` or `aria-labelledby` — an unlabeled radiogroup announcing only individual options without context is confusing in screen reader output.
- Icon-only segments require `aria-label` on each segment; the icon alone provides no accessible name — this is the most common accessibility failure in icon toolbar segmented controls.
- The selected segment indicator must communicate selection through more than color alone (shape change, border, fill contrast) to satisfy WCAG 1.4.1; Fluent 2's filled/elevated indicator is the reference implementation.

## Recommended Use

Reference T3 segmented control approaches when deciding on radio vs. tab semantics, animated indicator implementation, and vertical orientation. Mantine is the reference for the most complete segmented control with orientation, animation customization, and full-width support; Radix and Fluent 2 are references for the radio semantics decision with explicit rationale; Nord is the reference for the clinical argument against the consumer toggle aesthetic for high-gravity decisions; Mantine's `prefers-reduced-motion` implementation is the reference for accessible animation on the sliding indicator.
