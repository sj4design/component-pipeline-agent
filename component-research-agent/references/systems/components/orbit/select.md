---
system: Orbit (Kiwi.com)
component: Select
url: https://orbit.kiwi/components/select/
last_verified: 2026-03-28
confidence: medium
---

# Select

## Approach
Orbit's Select wraps the native HTML `<select>` element, consistent with GOV.UK's approach of preferring native controls for accessibility and mobile-platform behavior. For Kiwi.com's travel booking context, selects appear for cabin class (economy/business/first), passenger counts, and trip type (one-way/return/multi-city). These are small, finite option sets where native selects work well. The component includes Orbit's styling conventions and integrates with the design system's form validation pattern.

## Key Decisions
1. **Native select wrapper** (HIGH) — Like GOV.UK, Orbit chooses native select for mobile-first travel booking where the platform picker is often better UX than a custom dropdown. Flight booking on mobile benefits from the iOS/Android native select UI.
2. **Prefix icon** (MEDIUM) — Select supports a `prefix` icon slot. Orbit's travel selects often use icons to visually reinforce the selection type (airplane icon for class, person icon for passengers).
3. **Error and help integration** (MEDIUM) — Built-in `error` and `help` text slots connect to Orbit's form validation pattern, consistent with other Orbit form components.

## Notable Props
- `value` / `onChange`: controlled state
- `options[]`: `{ value, label, disabled? }`
- `label`: visible label
- `prefix`: prefix icon
- `error`: error message
- `help`: helper text
- `disabled`: disabled state

## A11y Highlights
- **Keyboard**: Native browser select behavior
- **Screen reader**: Native select semantics; label, error, and help associated via id
- **ARIA**: No custom ARIA needed; native select is most accessible

## Strengths & Gaps
- **Best at**: Mobile platform picker behavior; prefix icon for travel context; error/help integration
- **Missing**: No search/filter; no multi-select; cannot style option elements
