---
system: Salesforce Lightning Design System
component: Combobox
url: https://lightningdesignsystem.com/components/combobox/
last_verified: 2026-03-28
confidence: high
---

# Combobox

## Approach
Salesforce Lightning's Combobox is a fundamental CRM data-entry component used throughout Salesforce for selecting related records, picklist values, and lookup fields. It powers the lookup/search pattern for finding Accounts, Contacts, Opportunities, and other CRM objects. The Combobox supports both single-entity lookup (selecting one related record) and multi-select picklist patterns, with autocomplete filtering against local or server-fetched option sets.

## Key Decisions
1. **Record lookup pattern** (HIGH) — Lightning's Combobox is the standard pattern for "lookup" fields in Salesforce — finding and selecting a related CRM record (e.g., Account, Contact) from a searchable dropdown, which is foundational to Salesforce's relational data model.
2. **Object pills for multi-select** (HIGH) — Selected items in multi-select mode appear as pill tokens below/within the input, using Salesforce's visual "pill" pattern for selected record references, consistent with how Salesforce displays record relationships.
3. **Server-side filtering support** (MEDIUM) — The component supports async option loading as users type, critical for Salesforce orgs with thousands of records that cannot be loaded client-side.

## Notable Props
- `options`: Array of option objects
- `onSelect`: Selection callback
- `onSearch`: Search/filter callback (can be async)
- `value`: Current selected value(s)
- `selection`: Array for multi-select
- `variant`: "base" | "inline-listbox"
- `isMultiSelect`: Multi-select mode

## A11y Highlights
- **Keyboard**: Type to filter; Down/Up to navigate; Enter to select; Escape to close; Backspace to remove pills in multi-select
- **Screen reader**: role="combobox"; listbox dropdown announced; option count announced; selected pills have delete buttons
- **ARIA**: role="combobox"; aria-expanded; aria-autocomplete; aria-activedescendant; pills use role="option" with removal buttons

## Strengths & Gaps
- **Best at**: CRM record lookup; server-side filtering for large datasets; multi-select with pill tokens; Salesforce relational data patterns
- **Missing**: Complex keyboard interaction for pill management in multi-select; heavy visual weight compared to simpler select components
