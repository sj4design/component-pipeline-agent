---
system: Polaris (Shopify)
component: Spinner
url: https://polaris.shopify.com/components/feedback-indicators/spinner
last_verified: 2026-03-28
---

# Spinner

## Approach
Polaris treats the Spinner as a deliberate, context-specific feedback mechanism rather than an all-purpose loading indicator. The documentation is explicit about a key constraint: the Spinner should not be used for page-level loading feedback — that role belongs to skeleton screens, which Polaris strongly favours for initial content loads because they communicate the shape of incoming content and reduce perceived wait time. The Spinner's domain is narrower and more precise: it signals that a specific action the merchant just triggered is currently being processed, particularly in cases where skeleton screens cannot represent the expected output (such as data visualisations, charts, or dynamic form states). This intentional scoping prevents the common anti-pattern of replacing entire page regions with a spinner, which leaves merchants without spatial context about what is loading. Polaris also takes accessibility more seriously than most systems at the API level: both `accessibilityLabel` and `hasFocusableParent` exist precisely because SVG-based spinners have inconsistent behaviour with assistive technologies, and Polaris solves this at the component level rather than leaving it to the developer.

## Key Decisions
1. **Only two sizes: `small` and `large`** (HIGH) — Polaris deliberately limits size choice to two options rather than three or more. `large` (44px) is for standalone loading states — full-section loaders, page-region replacements. `small` (20px) is explicitly for use inside interactive components like buttons, where the spinner replaces or accompanies the button label during a processing state. The rationale reflects Polaris's merchant-context focus: Shopify admin interfaces have predictable layout patterns, so a broad size scale would introduce inconsistency rather than flexibility. Two sizes map directly to two scenarios — "loading a section" and "loading an action."

2. **`accessibilityLabel` prop (required pattern)** (HIGH) — The `accessibilityLabel` prop provides the text that screen readers announce for the spinner. The Polaris docs note this is critically important because SVGs are "conveyed inconsistently to assistive technologies" — a practical acknowledgment that browsers and screen readers do not reliably handle SVG `<title>` elements. By routing the accessible name through a prop-controlled mechanism, Polaris ensures the label is announced regardless of the browser/AT combination. The label should describe the action being processed ("Loading", "Submitting", "Processing payment") — not just "spinner" — giving screen reader users meaningful context.

3. **`hasFocusableParent` prop** (HIGH) — This prop is architecturally interesting: it adjusts which ARIA role attributes are applied to the spinner SVG based on whether its parent container receives keyboard focus. When the spinner is inside a button (which is focusable), the SVG's role must be handled differently than when the spinner is a standalone element — without this flag, assistive technologies may announce the spinner redundantly with the button's own accessibility label. This is a rare case of a component exposing its ARIA behaviour as a prop, acknowledging that correct accessibility depends on DOM context that the component cannot infer on its own.

4. **No overlay pattern** (MEDIUM) — Polaris does not include a built-in overlay or content-wrapping pattern with the Spinner. The system's philosophy is compositional: if a merchant-facing action requires blocking interaction (e.g., during a payment processing step), the product team builds that overlay from Polaris layout primitives. This keeps the Spinner focused and avoids the complexity of embedded overlay logic, but it means teams must implement consistent overlay behaviour themselves.

5. **Spinner preferred over skeleton only in specific cases** (MEDIUM) — Polaris explicitly documents that skeleton screens are the first choice for content loading, and Spinner is specifically for action-triggered processing states or content where layout shape cannot be predicted. This design guidance prevents spinner overuse, which Polaris identifies as a common UX problem in Shopify app development. The narrow recommended use case (action-triggered loading, charts/visualisations that can't be skeletonised) makes Polaris's Spinner the most conservatively scoped of all Tier 1 systems.

## Notable Props
- `accessibilityLabel`: The accessible name of the spinner — Polaris makes this the primary mechanism for screen reader communication, solving the SVG accessibility problem at the API surface level.
- `hasFocusableParent`: Adjusts ARIA role application based on parent focus context — notable because it exposes accessibility behaviour as an explicit prop rather than handling it transparently, which forces the developer to be intentional about placement context.
- `size` (`"small"` | `"large"`): Intentionally binary — two scenarios, two sizes. No ambiguity about which scale applies where.

## A11y Highlights
- **Keyboard**: Not interactive. Does not manage or capture focus. When placed inside a button, focus remains on the button element — the spinner is purely visual feedback layered over the existing interactive context.
- **Screen reader**: The `accessibilityLabel` string is announced by screen readers. The component handles SVG accessibility inconsistencies by routing the label through a DOM mechanism that is reliably picked up by assistive technologies across browsers, rather than relying on SVG `<title>`. Polaris does not implement an `aria-live` region within the Spinner itself — state change announcements for loading-start and loading-complete are managed by the surrounding page context.
- **ARIA**: The `hasFocusableParent` prop controls whether `role="status"` or another appropriate role is applied. When the parent is focusable (e.g., a button in loading state), the spinner's own ARIA role is suppressed to prevent double-announcement. When standalone, the spinner communicates its status role directly. The white colour variant used on dark backgrounds (`size="small"` in dark contexts) is documented but not exposed as a prop — it is achieved through CSS context.

## Strengths & Gaps
- **Best at**: Solving the SVG + screen reader inconsistency problem cleanly via `accessibilityLabel` and `hasFocusableParent`, and providing clear, opinionated guidance on when to use a Spinner versus a skeleton screen.
- **Missing**: No `prefers-reduced-motion` documentation, no delay prop to suppress flicker on fast operations, and no built-in overlay/wrapper pattern for blocking interaction during critical processes.
