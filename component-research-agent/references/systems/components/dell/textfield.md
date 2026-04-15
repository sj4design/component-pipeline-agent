---
system: Dell Design System
component: Input
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Input (Text Field)

## Approach
Dell Design System's Input handles data entry in enterprise configuration forms, e-commerce product customization, and support ticketing. Enterprise management context means inputs appear in complex configuration forms and search interfaces for managing hardware inventories and service contracts.

## Key Decisions
1. **Configuration form integration** (MEDIUM) — Input integrates with Dell's form system for enterprise configuration use cases.
2. **Search variant** (MEDIUM) — Search input for hardware/software inventory lookup is a key use case.
3. **Validation feedback** (MEDIUM) — Clear error and validation states for enterprise configuration forms where input errors can affect system behavior.

## Notable Props
- Standard text input props expected
- `label`, `error`, `disabled`, `type`

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: Label/error association
- **ARIA**: Standard form field ARIA

## Strengths & Gaps
- **Best at**: Enterprise form inputs; configuration data entry
- **Missing**: Low confidence — limited public documentation; verify before use
