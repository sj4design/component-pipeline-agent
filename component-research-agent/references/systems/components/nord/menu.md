---
system: Nord (Nordhealth)
component: Dropdown / Action Menu
url: https://nordhealth.design/components/dropdown/
last_verified: 2026-03-28
confidence: low
---

# Dropdown / Menu

## Approach
Nord may provide a Dropdown web component for action menus in healthcare applications. Clinical action menus appear for patient record actions (Edit, Archive, Print, Share), appointment management, and report options. Healthcare menus should be simple and clear — complex hierarchical menus are not appropriate for clinical staff who need to quickly complete tasks.

## Key Decisions
1. **Web component standard** (HIGH) — Portability requirement for healthcare platforms.
2. **Simple action lists** (HIGH) — Healthcare menus are typically short, action-oriented lists without complex sub-menus or checkbox items.

## Notable Props
- Trigger element
- Menu items with labels and actions
- Verify exact API at nordhealth.design

## A11y Highlights
- **Keyboard**: Arrow keys; Enter; Escape
- **Screen reader**: menu/menuitem roles
- **ARIA**: Standard dropdown menu ARIA in shadow DOM

## Strengths & Gaps
- **Best at**: Healthcare action menu patterns; web component portability
- **Missing**: Verify at nordhealth.design — limited documentation expected
