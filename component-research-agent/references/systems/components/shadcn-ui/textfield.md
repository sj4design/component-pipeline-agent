---
system: shadcn/ui
component: Input
url: https://ui.shadcn.com/docs/components/input
last_verified: 2026-03-28
confidence: high
---

# Input (Text Field)

## Approach
shadcn/ui's Input is a minimal Tailwind-styled native input wrapper — one of the simplest components in the system. No built-in label, error, or help text wiring; developers compose these manually or use it with the Form component (built on react-hook-form + Zod). shadcn/ui's Input philosophy is maximum simplicity with full developer control. The Form component provides the accessible label/error wiring when used in form contexts.

## Key Decisions
1. **Minimal standalone input** (HIGH) — Input is just a styled input element; all form field composition (label, error, description) is left to the developer using FormField, FormLabel, FormMessage from the Form component system.
2. **react-hook-form integration via Form** (HIGH) — The Form component (built on react-hook-form) provides the form management and the accessible form field composition pattern, making shadcn/ui opinionated about form management library when used fully.
3. **className extension** (MEDIUM) — Simple className prop for Tailwind extension; the component is a thin wrapper making modification trivial.

## Notable Props
- `type`: HTML input type
- `disabled`: Disabled state
- `placeholder`: Placeholder text
- `className`: Tailwind class extension

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: Label association via Form system (FormLabel with htmlFor); error via FormMessage (aria-live)
- **ARIA**: Native input ARIA; Form system provides aria-describedby and aria-invalid wiring

## Strengths & Gaps
- **Best at**: Maximum simplicity; zero opinionation on form patterns; excellent with react-hook-form Form system
- **Missing**: No built-in prefix/suffix adornments; no loading state; no built-in label wiring without Form component
