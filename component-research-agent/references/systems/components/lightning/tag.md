---
system: Salesforce Lightning Design System
component: Badge / Pill
url: https://lightningdesignsystem.com/components/badges/
last_verified: 2026-03-28
confidence: high
---

# Badge / Pill (Tag)

## Approach
Lightning provides Badges for status/label indicators and Pills for interactive filter chips with remove buttons. This mirrors the badge/chip semantic split seen in many enterprise systems. Badges appear throughout CRM for record status, assignment labels, and category indicators. Pills appear in multi-select filter fields and tag inputs. Lightning's Badge has a clean minimal visual consistent with CRM data density requirements.

## Key Decisions
1. **Badge vs Pill separation** (HIGH) — Static label badges vs interactive removable pills are separate components, ensuring correct interactive semantics for removable filter chips.
2. **Pill remove button** (HIGH) — Pill has a built-in remove (×) button with accessible label for removing the item from a selection, critical for multi-select filter chips and tag input patterns in CRM.
3. **Icon + label badge** (MEDIUM) — Badge supports leading icon for status indication (status dot + text), common in CRM for record status visualization.

## Notable Props
- Badge: `label`, `color` variant
- Pill: `label`, `onRemove` callback, `hasError` for error state pills

## A11y Highlights
- **Keyboard**: Badge non-interactive; Pill remove button is focusable
- **Screen reader**: Badge text announced; Pill remove button labeled "Remove [label]"
- **ARIA**: Pill remove button has aria-label; badge announced as text

## Strengths & Gaps
- **Best at**: Removable pill/chip pattern for CRM filter selections; status badge variants; icon+label badges
- **Missing**: Limited color customization beyond defined variants
