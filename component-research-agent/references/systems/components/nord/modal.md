---
system: Nord (Nordhealth)
component: Modal (nord-modal web component)
url: https://nordhealth.design/components/modal/
last_verified: 2026-03-28
confidence: low
---

# Modal

## Approach
Nord provides a Modal web component for healthcare application use cases — clinical confirmations, patient consent dialogs, and administrative confirmation prompts. Healthcare modals must be extremely clear: the stakes of a user misunderstanding a confirmation (approving the wrong medication, confirming the wrong patient) are high. Nord's modal design prioritizes clarity over aesthetics: prominent headings, clear action buttons, and unambiguous dismiss behavior. As a web component, it works across Nord's mixed-technology healthcare platform.

## Key Decisions
1. **Web component standard** (HIGH) — Framework portability is essential for healthcare platforms with diverse tech stacks (legacy clinical systems, modern web apps).
2. **Explicit close behavior** (HIGH) — Healthcare modals should require deliberate action to close. Nord's modal is likely to support disabling overlay-click-to-close for critical confirmations, preventing accidental dismissal during clinical workflows.
3. **Clear heading structure** (MEDIUM) — Healthcare modals need unambiguous purpose statements. The heading slot is a required element for accessibility and clarity in clinical contexts.

## Notable Props
- `open`: boolean — controlled open state
- `aria-label` or heading slot for modal title
- Likely: `dismissible` flag for controlling close behavior
- Likely: standard `size` variants

## A11y Highlights
- **Keyboard**: Focus trapped inside; Escape to close (configurable); Tab navigation
- **Screen reader**: role="dialog"; accessible label from heading; background content hidden
- **ARIA**: Shadow DOM implements correct dialog ARIA; verify specifics at nordhealth.design

## Strengths & Gaps
- **Best at**: Healthcare-appropriate clear design; web component portability; accessibility compliance
- **Missing**: Verify exact API at nordhealth.design — web component props differ from React patterns; documentation may be limited
