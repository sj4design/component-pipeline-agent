---
system: Salesforce Lightning Design System
component: Global Search / Lookup
url: https://lightningdesignsystem.com/components/global-navigation/
last_verified: 2026-03-28
confidence: medium
---

# Global Search / Lookup

## Approach
Salesforce Lightning has multiple search patterns: Global Search (top bar search across all CRM objects), Lookup (field-level record search for relationship fields), and basic filtered list search. Global Search is a high-visibility branded search component with scope selectors and recent items. Lookup is an autocomplete combobox for selecting related records. These are among Lightning's most specialized components, tailored to CRM data traversal patterns.

## Key Decisions
1. **Lookup = relationship field search** (HIGH) — The Lookup component is specifically for CRM record relationship fields (searching for a Contact, Account, Opportunity to link), using combobox pattern with CRM record type icons in results.
2. **Global Search scope** (HIGH) — Global search supports scoping by object type (search Contacts only vs All), a critical CRM search refinement pattern for reducing result noise.
3. **Recent items in dropdown** (MEDIUM) — Lookup and global search show recently accessed records before any query, matching Salesforce users' frequent "find something I just visited" behavior.

## Notable Props
- `searchTerm`: Current search input value
- `filterItems`: Results array for Lookup
- `onSearch`: Search callback
- `scope`: Object type scope for global search

## A11y Highlights
- **Keyboard**: Full combobox keyboard navigation; Arrow keys through results; Enter to select; Escape to clear
- **Screen reader**: role="combobox"; results announced via aria-live; selected record announced
- **ARIA**: Combobox pattern; aria-autocomplete; aria-owns pointing to listbox; aria-expanded

## Strengths & Gaps
- **Best at**: CRM record relationship search; scope-limited search; recent items pattern
- **Missing**: Not easily adapted for non-CRM search contexts; heavily tied to Salesforce data model
