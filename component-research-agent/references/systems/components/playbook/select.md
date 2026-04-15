---
system: Playbook (Power Home Remodeling)
component: Select
url: https://playbook.powerapp.cloud/kits/select
last_verified: 2026-03-28
confidence: medium
---

# Select

## Approach
Playbook's Select is used throughout their CRM for form-based selection — job types, status values, assignment targets, and configuration options. The component follows Playbook's form field conventions and supports both React and ViewComponent implementations. The select field integrates with Playbook's validation and error display patterns.

## Key Decisions
1. **Form integration** (HIGH) — Select follows Playbook's form field conventions with consistent label/error/help text patterns used across all form inputs.
2. **Dual React/Rails support** (HIGH) — Available in both React and ViewComponent for mixed-stack consistency.
3. **Option groups** (MEDIUM) — Support for grouped options likely given CRM use cases with categorized status values and type options.

## Notable Props
- `value`: Controlled selection value
- `onChange`: Selection callback
- `options`: Array of option objects
- `error`: Error message display
- `label`: Field label

## A11y Highlights
- **Keyboard**: Native or custom keyboard behavior depending on implementation
- **Screen reader**: Label association; error announcement
- **ARIA**: Standard select ARIA or combobox pattern

## Strengths & Gaps
- **Best at**: CRM form selection patterns; dual framework support
- **Missing**: Medium confidence; full feature set uncertain
