---
system: Shopify Polaris
component: SearchField
url: https://shopify.dev/docs/api/app-home/polaris-web-components/forms/searchfield
last_verified: 2026-03-28
---

# SearchField

## Approach

Polaris offers two overlapping search input solutions that reflect the system's dual audience: merchant-facing storefront UIs and developer-built Shopify admin extensions. The primary **SearchField** component (in the Polaris Web Components library for app extensions) is a purpose-built, tightly scoped component that captures search terms for filtering and search functionality. The secondary approach — using `TextField` with `type="search"` from the main React Polaris library — is a composable fallback for developers who need search in a standard form context. Polaris's philosophy on SearchField is notably *minimal and convention-driven*: the component enforces a limited API surface so that search patterns across thousands of independent Shopify app developers remain visually and behaviorally consistent. The `onChange` / `onClearButtonClick` split mirrors Spectrum's `onChange` / `onClear` separation, but Polaris goes further by automatically rendering the clear button — the developer is explicitly told *not to create their own* — which removes a class of inconsistent UI where some search fields have a clear button and others do not. This is a deliberate trade-off: less flexibility in exchange for guaranteed consistency across the App Store ecosystem.

## Key Decisions

1. **Automatic clear button with no consumer override** (HIGH) — SearchField unconditionally renders a clear button when the field contains text, and the documentation explicitly warns against creating a custom one. This is the strongest constraint on search clear-button behavior among Tier 1 systems. The rationale is ecosystem consistency: Shopify's App Store contains thousands of third-party apps rendered inside the Shopify admin UI, and inconsistent clear-button behavior across apps degrades the perceived quality of the platform as a whole. By making it automatic, Polaris ensures that every app using the component delivers the same gesture (click clear, field empties) without individual teams deciding whether to include it.

2. **SearchField as Web Component (not React only)** (HIGH) — Polaris SearchField ships as a native web component in the app-home Polaris Web Components library, distinct from the React TextField in the main Polaris React library. This architectural decision exists because Shopify App Extensions run in a sandboxed iframe-like context (Shopify App Bridge / Remote UI) where shipping a full React bundle for every component would be prohibitively expensive. Web components allow Shopify to render the component in the host frame efficiently. The practical consequence for designers: the SearchField in admin app extensions uses a web component API (`value`, `onChange`, `onClearButtonClick`), while SearchField in full React app pages uses the TextField component with `type="search"`.

3. **No built-in submission button** (MEDIUM) — Unlike Ant Design's `enterButton` or the explicit SearchView submit in M3, Polaris SearchField provides no built-in submit affordance. Search in Polaris is almost always *live/filter-as-you-type* — merchants filtering product lists, order tables, or customer records expect results to update immediately as they type, making an explicit "submit" button unnecessary and misleading. This reflects Shopify's commerce context: product search in an admin context is filtering an already-loaded dataset, not querying a remote search engine, so the submit-gate pattern used by M3 or Spectrum would create lag rather than prevent it.

4. **labelAccessibilityVisibility** (MEDIUM) — Polaris exposes an option to visually hide the label while keeping it available to screen readers. The motivation is visual design pressure in Shopify admin toolbars: product designers want a clean icon-plus-input layout without a visible "Search" label taking up space, but removing the label entirely would break accessibility. The `labelAccessibilityVisibility` prop resolves the tension without requiring consumers to implement their own visually-hidden CSS patterns.

5. **Minimal prop surface** (LOW) — SearchField has a deliberately narrow API: `value`, `onChange`, `onClearButtonClick`, `placeholder`, `disabled`, and `focused`. There is no `size`, no `loading`, no `scope`, no validation integration. This reflects Polaris's conviction that adding rarely-used props to a consumer-facing component creates API bloat that confuses developers and increases the chance of misuse. Edge cases are handled by composing SearchField with other Polaris components rather than extending the component itself.

## Notable Props

- `onClearButtonClick`: Separate callback from `onChange` — enables consumers to reset search results, filters, and state in response to the clear gesture without needing to detect an empty string in the onChange handler.
- `focused`: Controlled boolean prop that allows the parent to programmatically place focus in the search field — useful for keyboard shortcut implementations (e.g., pressing `/` to activate search, a common pattern in Shopify admin).
- `placeholder`: Polaris notes that placeholder text is acceptable for search fields as an exception to the general rule against placeholder-as-label, acknowledging that search affordance is contextually understood even without a separate label.

## A11y Highlights

- **Keyboard**: Standard input keyboard handling — Enter submits (triggers `onChange` with current value in live-filter mode); clear button is reachable via Tab and activatable via Space/Enter. Escape key clearing is not explicitly documented in Polaris SearchField, unlike Carbon's explicit Escape contract.
- **Screen reader**: Semantic HTML provides automatic field announcement. Polaris components log console warnings in development when required accessibility props (label, aria-label) are missing — a developer-experience mechanism to catch a11y regressions before they reach production.
- **ARIA**: Screen readers convey information through native HTML semantics. The `labelAccessibilityVisibility` mechanism uses a visually hidden label (off-screen CSS) rather than `aria-label`, which is preferred because the label element creates a proper programmatic association and is more robustly supported by older assistive technologies.

## Strengths & Gaps

- **Best at**: Ecosystem-scale consistency enforcement — the automatic clear button and web component architecture ensure that search input behavior is uniform across thousands of independently developed Shopify apps, which is a unique constraint no other Tier 1 system faces at the same scale.
- **Missing**: No loading/async state, no explicit Escape-to-clear documentation, no scope/category selector, and no size variants — the component is intentionally minimal and optimized for Shopify's live-filter use case rather than general-purpose search patterns.
