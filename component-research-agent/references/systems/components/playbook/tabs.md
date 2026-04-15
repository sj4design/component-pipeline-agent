---
system: Playbook (Power Home Remodeling)
component: Nav
url: https://playbook.powerapp.cloud/kits/nav
last_verified: 2026-03-28
confidence: medium
---

# Nav (Tabs)

## Approach
Playbook uses a "Nav" component for tab-style navigation in their CRM application, reflecting the navigation-first use case for tabs in their internal tools. The component supports both React and ViewComponent implementations for consistency across their stack. Tab-style navigation in Playbook is used for organizing sections of records, dashboards, and configuration panels.

## Key Decisions
1. **Navigation-first tabs** (MEDIUM) — Implemented as navigation pattern rather than pure ARIA tabpanel, reflecting Playbook's typical use case of navigating between sections.
2. **Dual framework** (HIGH) — Available in both React and Rails ViewComponent, consistent with Playbook's overall architecture.
3. **Active state management** (MEDIUM) — Active tab state integrates with their routing patterns in both React and Rails contexts.

## Notable Props
- `active`: Current active item indicator
- `orientation`: Horizontal/vertical orientation
- `items`: Navigation items configuration

## A11y Highlights
- **Keyboard**: Tab/arrow key navigation between items
- **Screen reader**: Navigation landmark; active state announced
- **ARIA**: nav role or tablist depending on usage context

## Strengths & Gaps
- **Best at**: CRM navigation tabs; dual framework consistency
- **Missing**: Medium confidence; exact API uncertain; tabpanel ARIA support details unclear
