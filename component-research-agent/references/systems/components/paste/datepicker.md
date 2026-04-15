---
system: Twilio Paste
component: Date Picker
url: https://paste.twilio.design/components/date-picker
last_verified: 2026-03-28
confidence: high
---

# Date Picker

## Approach
Twilio Paste's Date Picker is built on top of the native HTML `<input type="date">` element, deliberately choosing platform-native behavior over a custom calendar widget. This decision prioritizes accessibility and mobile compatibility over visual consistency across browsers. The component is wrapped in Paste's form field infrastructure (Label, HelpText, ErrorText) to maintain design system cohesion. It integrates with Paste's dark mode and theming token system.

## Key Decisions
1. **Native input foundation** (HIGH) — Uses `<input type="date">` rather than a custom calendar, accepting browser inconsistencies in exchange for built-in accessibility and mobile keyboard support on iOS/Android.
2. **Form primitive composition** (HIGH) — DatePicker is always used with FormField wrapper components, enforcing consistent label/error/help-text patterns across all form inputs in the system.
3. **Token-driven styling** (MEDIUM) — Border, background, and focus ring use semantic design tokens so the component automatically adapts to dark mode and custom brand themes.

## Notable Props
- `hasError`: Boolean that applies error styling and connects to error text via aria-describedby
- `id`: Required for label association, enforcing accessible form patterns
- `disabled`: Maps to native disabled attribute with Paste-specific visual treatment
- `ref`: Full ref forwarding to the underlying input for advanced integration patterns

## A11y Highlights
- **Keyboard**: Native browser date picker keyboard navigation (arrow keys, page up/down for month/year in supporting browsers)
- **Screen reader**: Label association via htmlFor/id; error text connected via aria-describedby
- **ARIA**: Inherits native input[type=date] role; FormField wrapper adds aria-required when required

## Strengths & Gaps
- **Best at**: Accessibility by default — native input means screen readers and mobile devices handle the interaction natively without custom ARIA work
- **Missing**: No custom calendar popover UI, no date range selection as a single component, limited control over calendar appearance across browsers
