---
system: Orbit (Kiwi.com)
component: InputField / Textarea
url: https://orbit.kiwi/components/inputfield/
last_verified: 2026-03-28
confidence: medium
---

# InputField

## Approach
Orbit's InputField is a complete form input designed for travel booking forms. The component bundles the input with label, placeholder, prefix/suffix icons, and help/error text. Orbit travel forms use inputs for passenger names, email addresses, flight search queries, and loyalty numbers. The component is styled with Kiwi.com's friendly, mobile-first aesthetic — larger touch targets, clear labeling, and immediate error feedback.

## Key Decisions
1. **prefix/suffix icon slots** (HIGH) — Orbit InputField supports prefix icons (for search, person, email type indicators) and a suffix for actions (clear button, show password). These are standard in travel UIs where icons aid quick comprehension of input purpose.
2. **Inline validation** (HIGH) — Immediate `error` feedback is critical for booking forms where passengers need to correct mistakes before submission. The error message replaces help text to avoid layout complexity.
3. **type-specific variants** (MEDIUM) — Orbit provides specialized variants (InputField, InputFile, etc.) for different input types, keeping each focused and ensuring correct mobile keyboard types (email input opens email keyboard).

## Notable Props
- `value` / `onChange`: controlled state
- `label`: visible label
- `placeholder`: placeholder text
- `prefix`: prefix icon element
- `suffix`: suffix icon/button element
- `error`: error message
- `help`: helper text
- `type`: input type

## A11y Highlights
- **Keyboard**: Native input behavior; clear button accessible
- **Screen reader**: Label, error, help text properly associated
- **ARIA**: aria-invalid on error; aria-describedby for help/error text

## Strengths & Gaps
- **Best at**: Travel-context prefix icons; immediate inline error feedback; mobile-optimized touch targets
- **Missing**: No character count; no masked input for credit card/phone
