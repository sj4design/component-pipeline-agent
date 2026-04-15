---
system: GitHub Primer
component: Radio
url: https://primer.style/components/radio
last_verified: 2026-03-28
confidence: high
---

# Radio

## Approach
GitHub Primer's Radio component is composed within FormControl and RadioGroup for complete accessible radio button groups. Used throughout GitHub for mutually exclusive settings (visibility: public/private/internal, notification preferences, merge strategy selection). Primer's radio has a clean, minimal visual style consistent with GitHub's settings UI.

## Key Decisions
1. **FormControl + RadioGroup composition** (HIGH) — Radio is always used within FormControl and RadioGroup which provides the fieldset/legend semantic grouping and shared label context via React context.
2. **Native radio foundation** (HIGH) — Styled native radio input preserves native keyboard behavior (arrow keys within group) and intrinsic form semantics.
3. **Consistent with GitHub settings patterns** (MEDIUM) — Radio option layout and spacing is designed for GitHub's settings page patterns where users choose between repository visibility modes, branch protection rules, etc.

## Notable Props
- `value`: Radio option value
- `checked` / `defaultChecked`: Controlled/uncontrolled state
- `disabled`: Disabled option
- RadioGroup `name`: Binds radios to group

## A11y Highlights
- **Keyboard**: Arrow keys navigate within group; Tab exits; native behavior preserved
- **Screen reader**: Option + group label (via fieldset/legend); checked state
- **ARIA**: fieldset/legend via RadioGroup; aria-required; native radio semantics

## Strengths & Gaps
- **Best at**: GitHub settings patterns; clean minimal styling; native radio semantics
- **Missing**: No button-styled radio variant; no visual picker
