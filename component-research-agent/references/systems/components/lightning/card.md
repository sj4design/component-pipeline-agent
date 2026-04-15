---
system: Salesforce Lightning Design System
component: Card
url: https://lightningdesignsystem.com/components/cards/
last_verified: 2026-03-28
confidence: high
---

# Card

## Approach
Salesforce Lightning's Card is a structured layout component with defined header (title + optional icon + action), body, and footer sections. Cards are the primary content organization unit on Salesforce record pages and app pages, containing related lists, charts, summary data, and activity feeds. Lightning Cards are highly opinionated about structure to maintain consistency across the diverse CRM page layouts.

## Key Decisions
1. **Structured header + body + footer** (HIGH) — Card enforces header/body/footer structure with specific slots for title, header icons, header actions (button groups), body content, and footer links — creating consistent visual hierarchy across all CRM page content.
2. **Narrow/base variants** (HIGH) — Card comes in "base" (full-width) and "narrow" width variants for the CRM page layout system that places cards in columns of different widths.
3. **Header action area** (MEDIUM) — Dedicated slot for action buttons in the card header (Edit, New, View All) — the standard CRM pattern for related list and data section cards.

## Notable Props
- `heading`: Required card title
- `icon`: Header icon name
- `headerActions`: Slot for header button/link actions
- `footer`: Footer content slot
- `hasBuffer`: Adds standard padding buffer to body content

## A11y Highlights
- **Keyboard**: Interactive elements within card maintain standard behavior; card itself is structural
- **Screen reader**: Card section announced as region with heading label
- **ARIA**: Heading in card header provides landmark context; action buttons fully accessible

## Strengths & Gaps
- **Best at**: Structured CRM page cards with header actions; consistent record page layout; narrow/wide variants for column layouts
- **Missing**: No interactive/selectable card variant; limited visual customization beyond the CRM card pattern
