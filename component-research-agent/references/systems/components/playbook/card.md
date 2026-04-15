---
system: Playbook (Power Home Remodeling)
component: Card
url: https://playbook.powerapp.cloud/kits/card
last_verified: 2026-03-28
confidence: medium
---

# Card

## Approach
Playbook's Card is used for grouping related CRM information — job summaries, customer profiles, and metric dashboards. Dual React/Rails implementation. Supports header, body, and footer sections with Playbook's brand styling.

## Key Decisions
1. **CRM content grouping** (HIGH) — Card wraps cohesive CRM data sets in consistent visual containers.
2. **Header/body/footer structure** (MEDIUM) — Standard card sections for organized content presentation.
3. **Dual React/Rails** (HIGH) — Both implementations available.

## Notable Props
- `header`: Card header content
- `footer`: Card footer content
- `clickable`: Interactive card variant

## A11y Highlights
- **Keyboard**: Non-interactive cards not in tab order; clickable cards are focusable
- **Screen reader**: Heading in header provides context
- **ARIA**: Clickable cards need appropriate role

## Strengths & Gaps
- **Best at**: CRM data grouping; dual framework; dashboard widgets
- **Missing**: Medium confidence; exact API uncertain
