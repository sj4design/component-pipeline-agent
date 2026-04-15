---
system: Atlassian Design System
component: Toggle
url: https://atlassian.design/components/toggle
last_verified: 2026-03-28
---

# Toggle

## Approach

Atlassian's Toggle component is built for the complex, multi-product ecosystem of Jira, Confluence, Bitbucket, and Trello — environments where feature flags, notification preferences, and admin settings are displayed across wildly different surface densities. The component's fundamental design philosophy is controlled simplicity: a single, clean binary control whose state is always clear and whose semantic role is always correct. Atlassian's accessibility team embedded `role="switch"` rather than `role="checkbox"` as the default from the start, reflecting a "accessibility built-in, not bolted on" engineering culture. The documentation carries a notably firm stance on label stability: the Toggle's label must NOT change based on the current state — the same label applies whether the toggle is on or off — because changing labels confuse screen reader users who navigate by component label. This is a higher-bar accessibility requirement than most systems document. The size variants (regular and large) serve the real-world difference between Jira's dense admin configuration panels and Trello's more spacious, consumer-oriented preference screens.

## Key Decisions

1. **Label must not change based on toggle state** (HIGH) — Atlassian explicitly documents that the Toggle label should remain constant regardless of whether the control is on or off. The WHY is screen reader navigation: users navigating by form control labels (a common screen reader pattern) find the control by its static label. If the label changes from "Enable notifications" to "Notifications enabled" when toggled, the user may not be able to re-find the control after flipping it, or may be confused by the changing label during announcement. Most design systems do not document this rule explicitly; Atlassian does.

2. **size prop for density contexts** (MEDIUM) — The Toggle offers `size="regular"` and `size="large"` variants. The large variant "calls attention to a specific action" — it is not merely larger for touch targets, it is a deliberate emphasis tool. The WHY is Atlassian's range of contexts: Jira admin panels need compact toggles to fit many settings; Trello and new-user onboarding flows benefit from larger, more prominent controls that guide users toward important decisions without requiring additional visual weight from surrounding elements.

3. **isChecked requires an onChange handler (controlled-only pattern)** (MEDIUM) — When `isChecked` is provided, an `onChange` handler is required. There is no `defaultChecked` shortcut for uncontrolled usage in the primary API. The WHY is product reliability: Atlassian's products (especially Jira and Confluence) have complex state management requirements where uncontrolled inputs can cause subtle bugs around state synchronization with server-side settings. Enforcing controlled patterns at the component level prevents a class of "why didn't my setting save?" bugs.

4. **Disabled state requires explanation** (HIGH) — The Atlassian documentation explicitly recommends that when a toggle is disabled, the surrounding UI includes information explaining why it is unavailable. The WHY is task completion: a user who encounters a disabled toggle with no explanation cannot diagnose whether they lack permission, need to configure something else first, or are experiencing a bug. Requiring explanation is a usability and accessibility principle that Atlassian's documentation makes explicit, even if it cannot be enforced at the component level.

5. **role="switch" is the semantic foundation, not role="checkbox"** (HIGH) — Atlassian chose `role="switch"` from the beginning rather than implementing Toggle as a styled checkbox. The WHY is semantic precision: `role="checkbox"` announces states as "checked" and "unchecked," which are form-selection concepts. `role="switch"` announces "on" and "off," which is the correct mental model for a control that activates or deactivates a feature. For Atlassian's enterprise users, many of whom rely on assistive technology in professional workflows, getting this semantics right is a compliance requirement, not an aesthetic preference.

## Notable Props

- `isChecked`: Controlled state boolean. Requires `onChange` when provided.
- `label`: Accessible label — required when no visible label is present in the surrounding context.
- `size`: `"regular"` | `"large"` — Density and emphasis control.
- `isDisabled`: Disables interaction. Atlassian explicitly recommends pairing with explanatory text in the UI.
- `onChange`: Required callback when `isChecked` is provided.
- `id`: Element identifier for external label association.

## A11y Highlights

- **Keyboard**: Tab to focus, Space to toggle. Standard ARIA switch keyboard pattern per W3C APG. Focus ring is visible and styled to meet contrast requirements.
- **Screen reader**: Announces the label (static, not state-dependent) plus current state ("on" or "off"). State is communicated via `aria-checked` which the screen reader interprets as part of `role="switch"` semantics.
- **ARIA**: `role="switch"` with `aria-checked="true|false"`. When no visible label is in the surrounding layout, the `label` prop populates an `aria-label` attribute. Atlassian's accessibility documentation discourages changing the label text based on state specifically to preserve reliable screen reader navigation.

## Strengths & Gaps

- **Best at**: Accessibility rigor (particularly the stable-label rule and disabled-state documentation), controlled state management that prevents sync bugs in complex enterprise UIs, and the large/regular size system that serves both dense admin surfaces and spacious consumer flows.
- **Missing**: No loading/pending state for async toggle operations, no thumb icon support (checkmark/X within the thumb track), and no built-in guidance on immediate vs. deferred effect — the documentation assumes all toggles are immediate but does not explicitly address the deferred-action case.
