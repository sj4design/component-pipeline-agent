---
component: Switch
tier: 2
last_verified: 2026-03-28
---

# Switch — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Switch | role="switch"; immediate-effect semantics; clear Switch vs Checkbox distinction | high |
| Salesforce Lightning | Toggle | role="checkbox" (older pattern); faux text labels on track (Active/Inactive) | high |
| GitHub Primer | ToggleSwitch | role="switch"; loading state with aria-busy; statusLabelPosition | high |
| shadcn/ui | Switch | Radix UI Switch; role="switch"; aria-checked; react-hook-form friendly | high |
| Playbook | Switch | Boolean settings toggles; dual React/Rails | medium |
| REI Cedar | CdrSwitch (not present) | Not present; use Checkbox for boolean settings | medium |
| Wise Design | Switch | Feature toggles in account settings | low |
| Dell Design System | Switch | Enterprise feature toggles | low |

## Key Decision Patterns

**role="switch" vs. role="checkbox":** Paste, Primer, shadcn/ui use role="switch" (the correct modern ARIA role for toggle controls). Lightning uses role="checkbox" historically — an older pattern that is semantically less precise but still accessible.

**Switch vs. Checkbox semantics:** Paste explicitly documents Switch for immediate-effect settings (no form submission) vs. Checkbox for form data. This is the most important usage guidance: use Switch when toggling a setting takes effect immediately; use Checkbox when the value will be submitted as form data.

**Loading state:** Primer's ToggleSwitch uniquely provides a `loading` prop with spinner and aria-busy, critical for settings that trigger async API calls. Paste lacks this; developers must compose it.

**Track labels:** Lightning's Toggle uniquely shows "Active/Inactive" text on the toggle track, providing additional visual clarity about state. Paste and shadcn/ui rely on position alone.

## A11y Consensus
- role="switch" (preferred modern pattern); aria-checked="true"|"false"
- Space or Enter to toggle
- Label via aria-labelledby or htmlFor
- Loading state (async): aria-busy="true" with spinner; prevent toggle during pending
- Do not use Switch inside a form submission — use Checkbox instead

## Recommended Use
Use Primer ToggleSwitch for settings requiring async loading state. Use shadcn/ui Switch or Paste Switch for immediate-effect boolean settings. Use role="switch" over role="checkbox" for toggle controls. Never use Switch inside form submission flows.
