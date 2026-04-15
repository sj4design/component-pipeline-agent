---
system: REI Cedar
component: Select
url: https://cedar.rei.com/components/select
last_verified: 2026-03-28
confidence: medium
---

# Select

## Approach
REI Cedar's Select is a Vue native-select wrapper used for form-based selection in REI's e-commerce context — sorting product listings, selecting sizes, choosing shipping options. Cedar's approach uses the native HTML select for simplicity and mobile compatibility, following accessibility best practices. The component integrates with Cedar's form field system.

## Key Decisions
1. **Native select foundation** (HIGH) — Native HTML select for mobile compatibility and accessibility, critical for REI's mobile-heavy audience who benefit from native mobile select sheets.
2. **Form field integration** (HIGH) — Select composes with Cedar's form field label/error/help text system for consistent accessible form patterns.
3. **Size variant** (MEDIUM) — Size variants matching Cedar's input size system for form layout consistency.

## Notable Props
- `value`: Controlled selection
- `required`: Required field indicator
- `disabled`: Disabled state
- `size`: Size variant

## A11y Highlights
- **Keyboard**: Native browser select keyboard behavior
- **Screen reader**: Native select semantics
- **ARIA**: Label association; aria-required; aria-describedby for help/error

## Strengths & Gaps
- **Best at**: Mobile-native behavior; e-commerce form selection; Cedar form system integration
- **Missing**: No custom option rendering; limited visual customization; medium confidence
