---
system: Dell Design System
component: Table
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Table

## Approach
Dell Design System's Table serves enterprise data display for server inventory, configuration data, log entries, and product specifications across Dell's management consoles and e-commerce. The enterprise IT context means tables are central to the product experience and likely include sorting, filtering, and pagination as core features.

## Key Decisions
1. **Enterprise data grid features** (MEDIUM) — Sort, filter, and pagination are likely core given Dell's management interface requirements for displaying hundreds of servers/configurations.
2. **Row selection** (LOW) — Bulk selection for mass operations (update firmware on multiple servers) likely supported.
3. **Column configuration** (LOW) — Column visibility or density options for power users managing large device inventories.

## Notable Props
- Standard table data/columns props expected
- `sortable`: Sort feature expected
- `selectable`: Row selection expected

## A11y Highlights
- **Keyboard**: Table navigation; sort buttons in headers
- **Screen reader**: Semantic table structure; sort state
- **ARIA**: Standard data table ARIA expected

## Strengths & Gaps
- **Best at**: Enterprise management data display; large dataset handling
- **Missing**: Low confidence — limited public documentation; verify before use
