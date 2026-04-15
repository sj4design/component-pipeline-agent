---
system: Salesforce Lightning Design System
component: Accordion
url: https://lightningdesignsystem.com/components/accordion/
last_verified: 2026-03-28
confidence: high
---

# Accordion

## Approach
Salesforce Lightning's Accordion follows the standard accordion pattern with multiple sections that can be independently expanded or contracted. Lightning defaults to allowing multiple sections open simultaneously but also supports single-section mode. The component is commonly used in record detail pages and configuration panels within Salesforce CRM. It follows Lightning's standard section/header structural pattern and integrates with Lightning's spacing and typography tokens.

## Key Decisions
1. **Multiple-open by default** (HIGH) — Allows multiple sections open simultaneously by default, matching Salesforce CRM usage patterns where users frequently need to compare data across record sections.
2. **allowMultipleSectionsOpen prop** (HIGH) — Explicit prop controls whether multiple sections can be open, giving developers clear control over the behavioral model without undocumented conventions.
3. **activeSectionName control** (MEDIUM) — Controlled/uncontrolled pattern with activeSectionName for controlled usage, consistent with Lightning's general approach to form and interactive components.

## Notable Props
- `activeSectionName`: Controlled open section(s) — string for single, array for multiple
- `allowMultipleSectionsOpen`: Boolean to enable multiple simultaneous open sections
- `onToggleSection`: Callback fired when a section is toggled

## A11y Highlights
- **Keyboard**: Enter/Space on section headers toggle sections; Tab moves between headers
- **Screen reader**: aria-expanded on each trigger button; section content associated via aria-controls
- **ARIA**: Trigger buttons have aria-expanded; content panels have aria-labelledby; role="button" on triggers

## Strengths & Gaps
- **Best at**: Enterprise CRM record page patterns; explicit control over single vs multiple open behavior
- **Missing**: No built-in animation; limited styling customization within LWC constraints
