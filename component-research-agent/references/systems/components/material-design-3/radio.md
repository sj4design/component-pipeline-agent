---
system: Material Design 3
component: Radio button
url: https://m3.material.io/components/radio-button
last_verified: 2026-03-28
---

# Radio Button

## Approach
Material Design 3 treats the radio button as a focused, single-purpose selection control — its sole job is to let a user pick one option from a small, visible set. The philosophy here is that radio buttons should only appear when all options can be displayed simultaneously and the user benefits from comparing them side by side. MD3 does not provide a standalone RadioGroup component in its spec; instead, it expects consuming frameworks (like Material Web Components or Material UI for React) to implement grouping through native HTML conventions — `fieldset` and `legend` — or through their own wrapper components. The system defines six explicit interaction states (enabled, hovered, focused, pressed, disabled, error), which is unusually thorough for selection controls and reflects Google's commitment to making every interactive moment feel considered. The error state is particularly notable: MD3 places error messages below the last radio button in the group rather than adjacent to each item, keeping the error tied to the group's outcome rather than to any individual option.

## Key Decisions
1. **No first-party RadioGroup component** (HIGH) — MD3 specifies radio button behavior and states but delegates grouping to the platform or framework layer. This is because Material Design targets multiple platforms (Android, Web, Flutter), each with different native grouping constructs. Forcing a single RadioGroup abstraction would either over-constrain platform implementations or produce a lowest-common-denominator wrapper. The tradeoff is that web implementations must rely on developer discipline or framework conventions for proper `fieldset`/`legend` semantics.

2. **Error state places message below the last item** (MEDIUM) — Rather than showing an error icon inline with each radio or at the top of the group, MD3 anchors the error message after the final option. This was chosen because radio button errors are always group-level outcomes (nothing was selected, or an invalid selection was made); attaching error feedback to an individual radio would imply that specific option is broken, which is semantically incorrect.

3. **Default preselection is acceptable when a clear best option exists** (MEDIUM) — MD3 explicitly permits pre-selecting one option when the majority of users would choose it, reducing decision friction for common cases. However, the system cautions against defaulting when options are equally likely or when the selection carries meaningful consequences, preserving user intentionality where it matters.

4. **Arrow keys navigate within the group; Tab enters and exits** (HIGH) — The entire radio group is treated as a single tab stop. Once focus lands on the group, arrow keys (up/down or left/right) move selection between options. This mirrors the native HTML radio behavior and is rooted in the ARIA authoring practices for radiogroup, keeping keyboard users from having to Tab through each individual option.

5. **Touch target size 48x48dp around 20dp control** (MEDIUM) — The visible radio control is small (20dp diameter) but the interactive hit area is inflated to 48x48dp. This reflects Material's long-standing commitment to fat-finger accessibility on touch devices, where small controls cause accidental taps on adjacent items.

## Notable Props
- `checked` / `value`: Whether this radio is selected; the mechanism differs per platform but the intent is the same — a controlled selection state.
- `disabled`: Renders the control at 38% opacity and removes it from interaction; importantly, a disabled radio still visually communicates the option exists but is unavailable, rather than hiding it.
- `error`: Triggers the error visual state on the radio itself, signaling the group has a validation problem.

## A11y Highlights
- **Keyboard**: Tab moves focus to the group's first (or currently selected) radio. Arrow Up/Left moves to the previous option and selects it. Arrow Down/Right moves to the next option and selects it. Selection and focus move together — there is no "focus without selection" state within the group.
- **Screen reader**: Each radio is announced with its label and checked state ("Option A, radio button, checked"). The group label (via `fieldset`/`legend` or `aria-labelledby`) is announced when focus enters the group.
- **ARIA**: Individual radios use `role="radio"` with `aria-checked`. The group container uses `role="radiogroup"` with `aria-labelledby` referencing the group legend.

## Strengths & Gaps
- **Best at**: Defining a comprehensive visual state model (6 states including error) that leaves no interaction moment undefined, making it a reliable reference for visual spec work.
- **Missing**: A first-party RadioGroup component, leaving grouping semantics and orientation control entirely to the consuming framework — this creates inconsistency across Material implementations on different platforms.
