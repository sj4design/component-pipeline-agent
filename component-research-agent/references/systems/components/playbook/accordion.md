---
system: Playbook (Power Home Remodeling)
component: Accordion
url: https://playbook.powerapp.cloud/kits/accordion
last_verified: 2026-03-28
confidence: medium
---

# Accordion

## Approach
Playbook's Accordion is used in their internal CRM and project management applications for organizing dense information like project details, customer records, and service configurations. The component follows standard accordion patterns with collapsible sections and supports both React and Rails (erb) usage, reflecting Playbook's dual-framework nature. The system emphasizes clean visual hierarchy consistent with their blue-dominant brand palette.

## Key Decisions
1. **Dual React/Rails support** (HIGH) — Playbook's unique constraint is supporting both React and ViewComponent (Rails) implementations of the same component, ensuring consistent behavior across their mixed frontend stack.
2. **Controlled and uncontrolled modes** (MEDIUM) — Supports both controlled (external state) and uncontrolled (internal state) patterns for flexibility in different application contexts.
3. **Icon indicator convention** (MEDIUM) — Uses a chevron icon that rotates on open/close, consistent with Playbook's general interactive component conventions.

## Notable Props
- `open`: Boolean for controlled open state
- `onClick`: Callback for open/close events
- `title`: Header content (string or custom)
- `icon`: Optional icon for the header section

## A11y Highlights
- **Keyboard**: Enter/Space on trigger toggles panel; Tab navigates between accordion headers
- **Screen reader**: Expanded/collapsed state announced via aria-expanded
- **ARIA**: aria-expanded on trigger; aria-controls linking trigger to panel content

## Strengths & Gaps
- **Best at**: Dual React/Rails framework support; CRM data organization patterns
- **Missing**: Limited public documentation details; advanced animation configuration not well-documented
