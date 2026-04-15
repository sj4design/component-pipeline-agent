---
system: Fluent 2 (Microsoft)
component: Switch
url: https://fluent2.microsoft.design/components/web/react/switch/usage
last_verified: 2026-03-28
confidence: high
---

# Switch

## Approach
Fluent 2's Switch uses `role="switch"` with `aria-checked` for correct semantic representation of immediate toggle actions. It is heavily used in Microsoft's settings UIs (Teams notification toggles, Windows Settings, Azure feature flags). The component integrates with Fluent's Field for label and description, and the label position can be before or after the switch to accommodate right-to-left layouts and different panel designs.

## Key Decisions
1. **role="switch" semantics** (HIGH) — Correct role="switch" implementation signaling immediate effect. Microsoft's accessibility guidelines (which their products must meet) require this distinction.
2. **labelPosition: "before" | "after"** (HIGH) — Label before the switch is the Settings panel pattern (label left, switch right). Label after is the standard form pattern. Fluent supports both, critical for the dense settings panels in Teams and Windows.
3. **Field integration** (MEDIUM) — Switch can be wrapped in Field for hint text that explains what the switch controls, important in complex Azure configuration panels.

## Notable Props
- `checked` / `onChange`: controlled state
- `defaultChecked`: uncontrolled initial state
- `labelPosition`: `"before" | "after"`
- `disabled`: disabled state
- `label`: built-in label prop (unlike Radix which requires external label)

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses
- **Screen reader**: role="switch" with aria-checked="true/false"; label via built-in label prop
- **ARIA**: Correct switch semantics; Field wrapper for hint text association

## Strengths & Gaps
- **Best at**: Built-in label prop; labelPosition for settings panels; correct role="switch"; Field integration
- **Missing**: No size variants for compact toolbars
