---
system: Salesforce Lightning Design System
component: Input
url: https://lightningdesignsystem.com/components/input/
last_verified: 2026-03-28
confidence: high
---

# Input (Text Field)

## Approach
Lightning's Input is a comprehensive text field component used throughout Salesforce CRM for record fields, search, and data entry. Lightning supports left/right icon adornments, spinner loading state (for async validation), and clear button (for search-type inputs). The system integrates with Lightning's form layout and field-level help (tooltip help icon next to label) that is standard across all Salesforce form fields.

## Key Decisions
1. **Field-level help tooltip** (HIGH) — Every Lightning input can have a help icon with tooltip adjacent to the label, a Salesforce-standard pattern for explaining field context without cluttering the form with verbose help text.
2. **Icon adornments** (HIGH) — Left/right icon adornments (utility icons from Lightning's icon library) are first-class props, used for search inputs, URL inputs, currency fields, and action icons throughout CRM.
3. **Spinner integration** (MEDIUM) — Built-in spinner state for inputs doing async validation (checking username uniqueness, validating external IDs), a common CRM form pattern.

## Notable Props
- `label`: Input label (required)
- `type`: HTML input type
- `iconLeft` / `iconRight`: Icon adornments
- `isLoading`: Spinner state for async validation
- `errorText`: Validation error message
- `fieldLevelHelpTooltip`: Help tooltip content for the label

## A11y Highlights
- **Keyboard**: Native input behavior; Tab focus
- **Screen reader**: Label via htmlFor; errorText via aria-describedby; help tooltip accessible
- **ARIA**: aria-required; aria-invalid on error; aria-describedby for error/help

## Strengths & Gaps
- **Best at**: Field-level help tooltip pattern; icon adornments; async validation spinner — enterprise form depth
- **Missing**: No floating label; limited input masking
