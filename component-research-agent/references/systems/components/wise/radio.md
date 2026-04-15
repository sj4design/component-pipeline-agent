---
system: Wise Design
component: Radio
url: https://wise.design/components/radio
last_verified: 2026-03-28
confidence: low
---

# Radio

## Approach
Wise's Radio is used for mutually exclusive financial product selections — transfer speed (regular/fast), account type selection, and notification preference settings. Clean minimal styling consistent with Wise's product aesthetic.

## Key Decisions
1. **Transfer option selection** (MEDIUM) — Primary use for selecting between financial product options (standard/priority transfers).
2. **Clean visual** (MEDIUM) — Minimal radio styling.
3. **Group semantics** (LOW) — Standard fieldset grouping expected.

## Notable Props
- `value`, `onChange`, `name`, `disabled`

## A11y Highlights
- **Keyboard**: Arrow key group navigation
- **Screen reader**: Standard radio announcement
- **ARIA**: fieldset/legend; aria-checked

## Strengths & Gaps
- **Best at**: Financial option selection
- **Missing**: Low confidence — limited documentation
