---
system: Atlassian Design System
component: Checkbox
url: https://atlassian.design/components/checkbox/usage
last_verified: 2026-03-28
---

# Checkbox

## Approach

Atlassian's Design System treats the checkbox as a multi-product control that must perform consistently across Jira, Confluence, Bitbucket, and Trello — products with very different information densities and user task intensities. The design philosophy emphasizes predictability over flexibility: the component exposes a deliberate set of props with boolean naming conventions (`isChecked`, `isIndeterminate`, `isInvalid`, `isDisabled`) that mirror the WAI-ARIA state vocabulary directly, making the mapping between React props and ARIA attributes legible to engineers. The Atlassian approach to error states is notably accessibility-forward: rather than simply applying error styling, the team documents a preference for avoiding `isDisabled` in favor of inline error messaging through `isInvalid`, based on the finding that disabled checkboxes are invisible to screen reader users in some configurations and cannot communicate why they are unusable. The `CheckboxGroup` is a documented companion component with its own `CheckboxSelect` variant (a searchable multi-select that uses checkbox semantics), reflecting Atlassian's need to handle large option sets in project management interfaces that would be unwieldy as simple stacked checkboxes.

## Key Decisions

1. **`isInvalid` over `isDisabled` for unusable options** (HIGH) — Atlassian explicitly recommends using `isInvalid` with an error message over `isDisabled` when an option cannot be selected due to permissions or system state. This is because disabled elements are removed from the accessibility tree in some screen reader configurations, meaning a user cannot discover that the option exists at all. An invalid + described option is always discoverable and explains the barrier to the user.

2. **Boolean `is*` naming convention mapping to ARIA states** (MEDIUM) — Every state prop uses the `is` prefix and mirrors its ARIA counterpart directly (`isChecked` → `aria-checked`, `isIndeterminate` → `aria-checked="mixed"`, `isInvalid` → `aria-invalid`). This is a deliberate API design choice that reduces the mental model overhead for engineers who must understand both the component API and the accessibility tree simultaneously.

3. **`isIndeterminate` as a discrete prop, not a value of `isChecked`** (MEDIUM) — Unlike Polaris which models indeterminate as a string value on `checked`, Atlassian separates `isChecked` (boolean) and `isIndeterminate` (boolean) into distinct props. This aligns with how the HTML spec models `indeterminate` (as a property on the input element, orthogonal to `checked`), making the prop API a more direct reflection of the DOM model rather than a Polaris-style convenience abstraction.

4. **No size variants** (LOW) — The Atlassian checkbox is a single size across all products. This reflects the system's principle of consistency over adaptability: having one size ensures that forms across Jira, Confluence, and Trello are visually coherent, and the tradeoff of reduced density in some contexts is accepted to avoid per-product customization diverging into an unmaintainable fork.

5. **`CheckboxSelect` as a separate searchable variant** (MEDIUM) — For long option lists (project labels, team members, statuses), Atlassian exposes `CheckboxSelect` — a dropdown with checkbox-selectable items and a search input. This variant exists because Jira and Confluence filter panels regularly present 20-100 options, where stacked checkboxes create excessive vertical scroll. The decision to treat this as a variant of the checkbox pattern (rather than a multi-select) preserves the expected multi-selection semantics while solving the density problem.

## Notable Props

- `isIndeterminate`: Separate boolean from `isChecked` — represents Atlassian's decision to mirror the DOM model precisely rather than abstracting indeterminate into a string value.
- `isInvalid`: Marks the checkbox as invalid — represents the system's accessibility-first stance of preferring invalid+described over disabled for unreachable options.
- `isDisabled`: Disables the checkbox — documented with a caution to prefer `isInvalid` for permission-gated scenarios to maintain screen reader discoverability.
- `onChange`: Receives an event object including the new checked state — standard React synthetic event pattern, consistent with how Atlassian wires all form controls.

## A11y Highlights

- **Keyboard**: Tab to focus, Space to toggle. Within a `CheckboxGroup`, individual checkboxes are tab-stops in DOM order. No arrow-key roving tabindex (unlike radio groups), because multi-select semantics do not imply navigation by arrow keys per the ARIA spec.
- **Screen reader**: `isInvalid` triggers `aria-invalid="true"` and the associated error message is linked via `aria-describedby`. `isIndeterminate` sets `aria-checked="mixed"`. Checkbox groups use `role="group"` with an `aria-labelledby` pointing to the group label, so the group name is announced before each checkbox label.
- **ARIA**: `aria-checked="mixed"` for indeterminate; `aria-invalid` for validation failure; `aria-describedby` for error messages and help text; `aria-required` on the group level when a selection is mandatory. Atlassian's 2024-2025 accessibility work resolved over 6,000 issues across the design system, including improvements to consistent validation patterns in form components.

## Strengths & Gaps

- **Best at**: Accessibility-first API design — the explicit preference for `isInvalid` over `isDisabled`, and the Boolean prop names that mirror ARIA states directly, make this system's checkbox the most transparent about its accessibility model.
- **Missing**: Size variants and density control — the single-size constraint that ensures cross-product consistency also means Atlassian checkboxes cannot adapt to data-table or compact-form contexts without custom CSS overrides.
