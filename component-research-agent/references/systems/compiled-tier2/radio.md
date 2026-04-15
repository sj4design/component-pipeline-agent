---
component: Radio
tier: 2
last_verified: 2026-03-28
---

# Radio — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Radio | Native input[type=radio]; RadioGroup with fieldset/legend; roving tabindex | high |
| Salesforce Lightning | Radio Group | Native radio inputs; mutually exclusive selection; vertical group | high |
| GitHub Primer | Radio | Native input[type=radio]; RadioGroup with fieldset/legend; FormControl | high |
| shadcn/ui | RadioGroup | Radix UI RadioGroup; custom visual; roving tabindex; react-hook-form friendly | high |
| Playbook | Radio | Mutually exclusive selection; dual React/Rails | medium |
| REI Cedar | CdrRadio | Vue radio; native input; group via fieldset/legend; WCAG 2.1 AA | medium |
| Wise Design | Radio | Option selection in financial flows | low |
| Dell Design System | Radio | Enterprise configuration option selection | low |

## Key Decision Patterns

**Native vs. custom:** Paste, Primer, and Cedar wrap native input[type=radio]. Radix/shadcn uses custom-styled radio for design control but correctly implements roving tabindex keyboard navigation.

**Roving tabindex:** Radio groups use roving tabindex — only the selected (or first, if none selected) radio is in the tab order; arrow keys move between options. This is the correct ARIA pattern, unlike standard Tab navigation between radios.

**Fieldset/legend requirement:** All systems mandate fieldset + legend for radio groups. The legend provides the group question/label that screen readers announce before each option.

**Horizontal layouts:** Some systems support horizontal radio group orientation (side-by-side options). Appropriate for short option lists; avoid for long labels.

## A11y Consensus
- input[type=radio] with associated label; all radios share same `name` attribute
- Groups: fieldset + legend required
- Roving tabindex: only active radio in tab order; arrow keys navigate
- Pre-select first option or leave unselected (context-dependent)
- Required group: communicate requirement in legend text or via aria-required

## Recommended Use
All T2 systems handle radio groups correctly. Key differentiator: use Radix/shadcn RadioGroup when custom visual styling is required. Always use fieldset + legend. Never use Tab key navigation between radio options — roving tabindex (arrow keys) is the correct pattern.
