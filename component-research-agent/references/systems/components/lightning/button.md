---
system: Salesforce Lightning Design System
component: Button
url: https://lightningdesignsystem.com/components/buttons/
last_verified: 2026-03-28
confidence: high
---

# Button

## Approach
Salesforce Lightning has one of the most extensive button systems among design systems, with numerous variants addressing the wide range of CRM UI contexts. Lightning distinguishes between button variants (neutral, brand, outline-brand, destructive, text-destructive, success, inverse), button groups, button icons, and button stateful (toggle) — each as documented sub-patterns. This breadth reflects the diverse UI contexts in Salesforce CRM from record actions to toolbar controls.

## Key Decisions
1. **Stateful button variant** (HIGH) — Lightning's "stateful" button (toggle button) is a first-class pattern with followed/join/follow states, designed for CRM social features and record-following workflows unique to Salesforce.
2. **Button groups and icon buttons** (HIGH) — Button Group and Button Icon are explicit sub-components with documented patterns for toolbar and inline action contexts in record pages.
3. **Inverse variant** (MEDIUM) — Inverse button variant for dark/image backgrounds is explicitly documented, critical for Salesforce's varied header and banner contexts.

## Notable Props
- `variant`: "neutral" | "brand" | "outline-brand" | "destructive" | "text-destructive" | "success" | "inverse"
- `iconName`: Utility icon name for icon buttons
- `iconPosition`: "left" | "right" for icon+label buttons
- `isLoading`: Loading state with spinner
- `selected`: Toggle state for stateful buttons

## A11y Highlights
- **Keyboard**: Enter and Space activate; stateful buttons announce state change
- **Screen reader**: Stateful button announces current state (followed/not followed)
- **ARIA**: aria-pressed on stateful toggle buttons; aria-label required for icon-only buttons

## Strengths & Gaps
- **Best at**: Breadth of variants for complex enterprise UIs; stateful toggle button; button groups
- **Missing**: Limited theming flexibility within LWC constraints; heavy component footprint
