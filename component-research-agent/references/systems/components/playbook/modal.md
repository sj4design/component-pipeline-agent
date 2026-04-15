---
system: Playbook (Power Home Remodeling)
component: Modal
url: https://playbook.powerapp.cloud/kits/modal
last_verified: 2026-03-28
confidence: medium
---

# Modal

## Approach
Playbook's Modal is used in Power Home Remodeling's CRM and project management tools for confirmation dialogs, quick data entry, and workflow actions like scheduling appointments or updating project status. The component supports both React and ViewComponent (Rails) implementations. Modal structure follows standard header/body/footer conventions with close button support.

## Key Decisions
1. **Dual React/Rails implementation** (HIGH) — Modal available in both React and ViewComponent ensures consistent behavior in their mixed-stack application environment.
2. **Size variants** (MEDIUM) — Multiple size variants accommodate both simple confirmation dialogs and more complex data entry modals used in CRM workflows.
3. **Close button in header** (MEDIUM) — Standard close X button in header provides clear dismiss affordance consistent with CRM user expectations.

## Notable Props
- `opened`: Boolean open state control
- `onClose`: Close callback
- `size`: Size variant
- `title`: Modal header title

## A11y Highlights
- **Keyboard**: Focus trap; Escape closes; focus returns on close
- **Screen reader**: Dialog role; title association for accessible name
- **ARIA**: role="dialog"; aria-labelledby; aria-modal

## Strengths & Gaps
- **Best at**: CRM workflow modals; dual framework support
- **Missing**: Medium confidence — some specifics uncertain; advanced animation details unknown
