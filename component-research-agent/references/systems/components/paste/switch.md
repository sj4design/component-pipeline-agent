---
system: Twilio Paste
component: Switch
url: https://paste.twilio.design/components/switch
last_verified: 2026-03-28
confidence: high
---

# Switch

## Approach
Twilio Paste's Switch is a toggle control for boolean on/off settings that take immediate effect (no form submission required). Paste is careful to distinguish Switch (immediate effect, like enabling a feature) from Checkbox (used in form submissions). This semantic distinction guides developers to use the correct component. The Switch uses the ARIA switch role.

## Key Decisions
1. **Immediate effect semantics** (HIGH) — Switch is documented as the component for settings that take effect immediately on toggle, contrasting with Checkbox which is for form data submission, preventing misuse.
2. **ARIA switch role** (HIGH) — Uses role="switch" with aria-checked rather than role="checkbox", correctly identifying the toggle control's semantics to assistive technologies.
3. **Label position** (MEDIUM) — Label appears to the right of the switch by default, following the most common toggle label placement convention in settings UIs.

## Notable Props
- `checked` / `defaultChecked`: Controlled/uncontrolled state
- `onChange`: Toggle callback
- `id`: For label association
- `disabled`: Disabled state

## A11y Highlights
- **Keyboard**: Space toggles the switch; Enter may also toggle
- **Screen reader**: Announces as "switch" with on/off state; label provides context
- **ARIA**: role="switch"; aria-checked="true"|"false"; label via aria-labelledby or htmlFor

## Strengths & Gaps
- **Best at**: Semantic switch vs checkbox distinction; correct ARIA switch role; immediate-effect use case documentation
- **Missing**: No loading state (for async toggle); no processing state between on/off
