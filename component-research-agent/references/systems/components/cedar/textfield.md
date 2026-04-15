---
system: REI Cedar
component: Input
url: https://cedar.rei.com/components/input
last_verified: 2026-03-28
confidence: medium
---

# Input (Text Field)

## Approach
REI Cedar's Input is a Vue form input component used for search, checkout forms, and account management on REI's e-commerce platform. The component integrates with Cedar's form field system for label/error/help text. Given REI's e-commerce context, the search input variant is particularly important, and Cedar provides search-specific styling and behavior.

## Key Decisions
1. **E-commerce form focus** (HIGH) — Input is optimized for checkout and account forms with clear error states and validation feedback critical for purchase completion flows.
2. **Search variant** (MEDIUM) — Search input styling with clear button and search icon for REI's product search workflow.
3. **Form field integration** (HIGH) — Cedar form field pattern provides label, help text, and error message association.

## Notable Props
- `type`: Input type
- `required`: Required indicator
- `disabled`: Disabled state
- `status`: Validation status (error/success)

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: Label/error associations via Cedar form field system
- **ARIA**: aria-required; aria-invalid; aria-describedby

## Strengths & Gaps
- **Best at**: E-commerce form and search patterns; Cedar brand consistency
- **Missing**: Medium confidence on full API; advanced features uncertain
