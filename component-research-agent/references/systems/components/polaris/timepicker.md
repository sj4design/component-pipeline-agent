---
system: Polaris (Shopify)
component: Not available natively
url: https://polaris.shopify.com/components
last_verified: 2026-03-28
---

# Time Picker (Polaris)

## Approach
Polaris does not include a dedicated Time Picker component. This absence is one of the more consequential gaps in the system given Shopify's commerce context: merchants frequently need to schedule flash sales, set store hours, configure shipping cutoff times, and define app-specific scheduling rules — all of which require time input. The absence is explained by Shopify's historical product architecture: most scheduling in the Shopify admin has been handled through pre-set options (dropdowns of common times like "12:00 AM", "6:00 AM", "12:00 PM") rather than free-form time entry, reducing the perceived need for a general-purpose time picker. For cases where time entry is needed, Polaris teams have used a combination of TextField (for typed time values) with format hint placeholder text and a Select component for AM/PM disambiguation — essentially replicating Carbon's composition pattern without formalizing it. The Polaris team has acknowledged this gap and, as of early 2026, a time picker is listed as a future component in their public roadmap on GitHub. Teams building Shopify apps that need time entry should implement a custom pattern using existing Polaris primitives and document it for consistency.

## Key Decisions
1. **Workaround pattern: TextField + Select** (HIGH) — The community-recommended approach mirrors Carbon's composition: a TextField for HH:MM entry with `placeholder="HH:MM"` and a Select for AM/PM. This pattern appears in multiple Shopify-produced app examples and is treated as an unofficial standard, but without the documented accessibility patterns, validation guidance, and form integration that a formal component would provide.
2. **Native browser input as an alternative** (MEDIUM) — Some Polaris-based apps use `<input type="time">` styled with Polaris tokens, relying on the browser's native time picker UI. This approach has inconsistent cross-browser behavior (Chrome shows a spinner, Safari shows a text field, Firefox shows a hybrid) and limited styling control. It is the fastest implementation but produces the most inconsistent user experience.
3. **Pre-set Select for scheduling contexts** (MEDIUM) — Shopify's own admin uses a Select component populated with common time values (e.g., every 30-minute interval across a 24-hour day) for scheduled operation windows. This eliminates free-form entry errors but is impractical for precise time entry. It remains the recommended approach in Polaris's scheduling pattern documentation.

## Notable Props
- No dedicated component. Workarounds use:
  - `TextField` with `type="text"` and time format placeholder.
  - `Select` with AM/PM or time interval options.
  - Native `<input type="time">` with Polaris CSS custom property styling.

## A11y Highlights
- **Keyboard**: No prescribed pattern. The TextField + Select workaround relies on native form element keyboard behavior, which is standard and accessible. No roving tabindex or segment navigation.
- **Screen reader**: When using the TextField + Select pattern correctly with Polaris's `<FormLayout>` wrapper, label association is handled automatically. Time zone context is not communicated programmatically.
- **ARIA**: No prescribed ARIA pattern for time entry. Teams must implement `aria-describedby` for format hints and time zone labels themselves.

## Strengths & Gaps
- **Best at**: Nothing — this is a genuine gap. The TextField + Select workaround is functional but does not constitute a component.
- **Missing**: A formal Time Picker component with proper validation, time zone support, AM/PM handling, keyboard segment navigation, and documented accessibility patterns. The gap is acknowledged in Polaris's public roadmap.
