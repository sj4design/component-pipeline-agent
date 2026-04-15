---
system: Mantine
component: useForm (@mantine/form)
url: https://mantine.dev/form/use-form/
last_verified: 2026-03-29
confidence: high
---

# Form (@mantine/form)

## Approach
Mantine's form solution is `@mantine/form` — a dedicated form management package providing the `useForm` hook, `useFormContext`, and `TransferList` integration. Unlike systems that provide a `<Form>` wrapper component, Mantine's approach is hook-first: `useForm` returns form state, validation methods, input prop helpers (`getInputProps`), and submission handlers. There is no required `<Form>` wrapper component — the consumer controls the HTML `<form>` element directly. This architecture is popular in the React community because it keeps form logic in JavaScript state rather than DOM, making it easier to compose with other state management solutions.

## Key Decisions
1. **Hook-first, no wrapper component** (HIGH) — `useForm` returns a form object with `getInputProps('fieldName')` that spreads value, onChange, and error props onto any Mantine input component. The consumer owns the `<form>` element and its `onSubmit`. This is more flexible than a `<Form>` wrapper but requires slightly more boilerplate for each field.
2. **Built-in validation** (HIGH) — `useForm` accepts a `validate` object mapping field names to validator functions (or Yup/Zod schema via adapters). Validation runs on change, blur, or submit depending on `validateInputOnChange` / `validateInputOnBlur` flags. Errors are automatically passed to input components via `getInputProps`.
3. **Nested objects and arrays** (HIGH) — Mantine form supports nested field paths (`'address.city'`) and array fields (`'items.0.name'`) via dot notation. `useFieldArray` provides helpers for dynamic list fields (add, remove, reorder). This covers complex form structures common in data management UIs.
4. **`@mantine/form` as optional package** (MEDIUM) — The form package is separate from `@mantine/core`, so teams can use any form library (React Hook Form, Formik) with Mantine's visual components. `@mantine/form` is the recommended default but not the only option.

## Notable Props
- `useForm({ initialValues, validate, validateInputOnChange, validateInputOnBlur, transformValues })`
- `form.getInputProps('fieldName')`: spreads value/onChange/error/label onto input
- `form.onSubmit(handler)`: wraps form submit with validation
- `form.setValues`, `form.reset`, `form.clearErrors`
- `form.errors`: object mapping field names to error messages

## A11y Highlights
- **Keyboard**: Mantine inputs connected via `getInputProps` inherit all keyboard behavior from individual input components
- **Screen reader**: Error messages from `getInputProps` are passed as the `error` prop to Mantine inputs, which render them with `role="alert"` or `aria-describedby` association
- **ARIA**: Each input component renders its error as an associated description element; validation errors are announced on blur or submit

## Strengths & Gaps
- **Best at**: Comprehensive form state management with minimal boilerplate; nested/array fields; flexible validation (custom, Yup, Zod); seamless integration with all Mantine input components
- **Missing**: No `<Form>` wrapper component (some teams prefer declarative form structure); no built-in multi-step form management; no field-level dirty tracking by default
