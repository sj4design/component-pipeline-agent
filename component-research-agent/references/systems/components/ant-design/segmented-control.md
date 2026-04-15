---
system: Ant Design
component: Segmented
url: https://ant.design/components/segmented/
last_verified: 2026-03-28
---

# Segmented Control (Ant Design)

## Approach
Ant Design's Segmented component is the newest of the Tier 1 implementations, introduced in v5 (released late 2022) after significant community demand. Its late arrival allowed the Ant Design team to study shortcomings in other systems and produce a component that is visually distinct from the rest of the Tier 1 landscape: Segmented uses a sliding indicator — an animated background pill that slides between options — rather than a border or fill color change on individual segments. This animated indicator is borrowed from iOS's UISegmentedControl and creates a strong motion affordance that communicates the transition between states. The component is single-select only, which aligns with its primary use case in Alibaba and Ant Financial's products as a view-switcher for charts, data periods (7 days / 30 days / 90 days), and display density controls. Ant Design's Segmented also uniquely supports rich option content — each option can contain both an icon and a label, or a fully custom React node, making it more compositionally flexible than any other Tier 1 implementation.

## Key Decisions
1. **Sliding indicator animation** (HIGH) — The animated background pill that slides between selected options is Segmented's most visually distinctive feature. This animation serves a functional purpose: it makes the direction of state change perceptible, which is valuable in data-dense dashboards where users switch between time periods and need to understand which direction they have moved. The sliding animation also performs well at communicating selection in motion-sensitive contexts, though it cannot be disabled for users who prefer reduced motion — a gap in the current implementation.
2. **Options accept custom React nodes** (MEDIUM) — Each option can be a string, a number, or a custom React node. This composability is unique among Tier 1 segmented control implementations and enables patterns like options with status dots, avatar thumbnails, or multi-line labels. The design system acknowledges this creates consistency risks but prioritizes flexibility for Alibaba's diverse product surface over strict option content constraints.
3. **Single-select only by design** (MEDIUM) — Unlike MD3 (which supports multi-select) and Spectrum's ActionGroup (which supports multi-select), Ant Design's Segmented is single-select only. The rationale is that multi-select segmented controls conflate two interaction models (selection vs. filtering) and should be implemented as a Checkbox.Group instead. This is a principled position that keeps Segmented conceptually clean but means teams needing multi-select in a connected visual treatment must use a different component.

## Notable Props
- `options`: Array of strings, numbers, or `{ label, value, icon, disabled }` objects — the rich option model is Segmented's most compositionally flexible feature among Tier 1 systems.
- `block`: Boolean that makes the component fill its container width, distributing segment widths equally — important for full-width view switchers in responsive layouts.
- `size`: `"large" | "middle" | "small"` — standard Ant Design size system.
- `disabled`: Disables the entire Segmented component; individual option `disabled` is supported at the option level.

## A11y Highlights
- **Keyboard**: Arrow key navigation between options (roving tabindex); Tab moves focus out of the group. This is the correct keyboard pattern for a single-select group.
- **Screen reader**: `role="segmented"` is not a valid ARIA role — Ant Design's current implementation uses `role="group"` with individual options as `role="radio"` buttons, which is semantically correct for single-select exclusive options.
- **ARIA**: `aria-checked` on selected option, `aria-disabled` on disabled options. The sliding animation uses CSS transitions that do not generate ARIA live region announcements — the selection change is communicated through `aria-checked` state change, which screen readers announce correctly.

## Strengths & Gaps
- **Best at**: Visual polish and compositional flexibility — the sliding indicator animation and custom node options make this the most visually refined and flexible segmented control in the Tier 1 landscape.
- **Missing**: Multi-select mode, `prefers-reduced-motion` support for the sliding animation, and no overflow/wrapping behavior for many options in constrained containers.
