---
system: shadcn/ui
component: Form
url: https://ui.shadcn.com/docs/components/form
last_verified: 2026-03-28
confidence: high
---

# Form

## Approach
shadcn/ui's Form is built on react-hook-form + Zod, providing a complete accessible form composition system. The Form component provides FormField (react-hook-form Controller), FormItem, FormLabel, FormControl, FormDescription, and FormMessage sub-components. This represents shadcn/ui's strongest opinion about form management — it explicitly recommends react-hook-form and the Zod validation schema approach.

## Key Decisions
1. **react-hook-form integration** (HIGH) — Form is directly built on react-hook-form's Controller API, making shadcn/ui forms performant (uncontrolled by default) and tightly integrated with the most popular React form library.
2. **Zod schema validation** (HIGH) — Documentation examples use Zod for form schema definition and zodResolver for react-hook-form validation, establishing Zod as the recommended validation library.
3. **FormControl slot pattern** (HIGH) — FormControl renders the accessible slot that connects FormLabel to the input via React context (id management), FormMessage for error display, and FormDescription for help text — similar to Primer's FormControl but for react-hook-form.

## Notable Props
- `Form[form]`: The useForm() instance from react-hook-form
- `FormField[name]`: Field name for react-hook-form registration
- `FormField[control]`: Control from useForm() for Controller binding
- `FormMessage`: Auto-displays error message from form state

## A11y Highlights
- **Keyboard**: Standard form field behavior
- **Screen reader**: FormLabel auto-associates with input via id; FormMessage uses aria-live for error display; FormDescription via aria-describedby
- **ARIA**: Context-wired id/htmlFor; aria-invalid on fields with errors; aria-describedby for description and errors

## Strengths & Gaps
- **Best at**: react-hook-form integration; Zod schema validation; FormMessage for automatic error display; accessible label/error wiring
- **Missing**: Not usable without react-hook-form (strong dependency); no multi-step form state management
