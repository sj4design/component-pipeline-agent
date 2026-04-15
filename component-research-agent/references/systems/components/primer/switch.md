---
system: GitHub Primer
component: ToggleSwitch
url: https://primer.style/components/toggle-switch
last_verified: 2026-03-28
confidence: high
---

# ToggleSwitch

## Approach
GitHub Primer's ToggleSwitch is used for feature toggles and setting switches throughout GitHub — enabling/disabling security features, repository settings, and account preferences. Primer's ToggleSwitch notably supports a loading state for async toggle operations, which is important given that many GitHub settings toggles trigger API calls (enabling GitHub Actions, branch protection, etc.).

## Key Decisions
1. **Loading state for async settings** (HIGH) — ToggleSwitch has a built-in loading state with spinner that appears during the async operation triggered by toggling, critical for GitHub settings where toggles initiate server-side changes that take a moment to complete.
2. **statusLabelPosition** (MEDIUM) — Label showing "On"/"Off" status can be positioned on either side, providing flexibility for different settings panel layouts.
3. **ARIA switch role** (HIGH) — Correctly uses role="switch" with aria-checked, providing semantic correctness for assistive technologies.

## Notable Props
- `checked` / `defaultChecked`: Controlled/uncontrolled state
- `onChange`: Toggle callback (can be async function)
- `loading`: Boolean for loading spinner state
- `disabled`: Disabled state
- `statusLabelPosition`: "start" | "end"
- `aria-labelledby`: For external label association

## A11y Highlights
- **Keyboard**: Space or Enter toggles; loading state prevents toggle during pending
- **Screen reader**: role="switch"; aria-checked; loading state communicated via aria-busy
- **ARIA**: role="switch"; aria-checked; aria-busy during loading; aria-disabled when disabled

## Strengths & Gaps
- **Best at**: Async loading state for settings that trigger API calls; correct ARIA switch role; GitHub settings patterns
- **Missing**: No on-track text labels (Lightning's strength); limited visual variants
