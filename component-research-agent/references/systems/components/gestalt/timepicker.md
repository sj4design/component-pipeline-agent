---
system: Gestalt (Pinterest)
component: Not available natively
url: N/A
last_verified: 2026-03-29
confidence: high
---

# Time Picker

## Approach
Gestalt has no TimePicker component. Pinterest does have time selection functionality in its product — primarily for Pinterest Business account features like pin scheduling, where advertisers and creators can schedule pins to publish at a specific date and time. However, this date-time picker is a custom implementation within the business/ads product surface and has not been extracted into the public Gestalt design system. The absence reflects that time selection is a niche use case in Pinterest's overall product: the vast majority of Pinterest's UI (feed browsing, saving pins, creating boards, profile management) involves no time input whatsoever. The scheduling use case is specialized enough that a bespoke implementation within the ads/scheduling tool is justified, without creating a public TimePicker primitive that would serve only a small slice of Gestalt's consumers. Gestalt's DatePicker component handles date-only selection, which covers the broadest date input need across the product.

## Key Decisions
1. **Time selection is a business-tier product feature** (HIGH) — Pin scheduling is available only to Pinterest business accounts, representing a small fraction of Pinterest's total user base. Building a public TimePicker for this limited use case would be a poor investment of design system resources compared to improving primitives used by all users.
2. **DatePicker covers the common date input case** (HIGH) — The most prevalent date input need across Pinterest (event dates, campaign end dates) requires date selection only, not time. Gestalt's DatePicker handles this without a time component, keeping the component simpler and more widely applicable.
3. **Custom scheduling UI for business context** (MEDIUM) — Pinterest's pin scheduling UI requires timezone awareness, business-hours context, and optimal timing suggestions — product-specific behaviors that go beyond a generic TimePicker. A specialized implementation within the scheduling feature serves these needs better than a generic component.
4. **Mobile-first constraint on time pickers** (MEDIUM) — Native mobile time pickers (iOS time wheels, Android clock dial) provide excellent mobile UX that is difficult to replicate in a custom web component. On mobile web, using the native HTML `<input type="time">` with browser defaults is more reliable than a custom TimePicker, reducing the value proposition of building one.

## Notable Props
- N/A — Component does not exist in Gestalt. For simple time input needs, use `<input type="time">` or a TextField with appropriate formatting. For date+time scheduling, integrate with Pinterest's internal scheduling tool.

## A11y Highlights
- **Keyboard**: N/A for a dedicated component. Native `<input type="time">` provides keyboard interaction (arrow keys for increment/decrement, typing for direct input) across browsers.
- **Screen reader**: N/A for a dedicated component. Native `<input type="time">` has reasonable screen reader support across modern browsers.
- **ARIA**: N/A for a dedicated component.

## Strengths & Gaps
- **Best at**: N/A as a dedicated component. Gestalt's DatePicker covers date-only selection well for the common case.
- **Missing**: No reusable TimePicker for teams building scheduling, analytics time ranges, or reminder features within Pinterest's business and creator tools; no standardized time input pattern means these teams each implement their own solution; no combined DateTimePicker component that would serve ad scheduling, analytics date range selection, and any future time-aware product features in a consistent way; no timezone selector component to pair with time inputs, which is critical for Pinterest's global audience.
