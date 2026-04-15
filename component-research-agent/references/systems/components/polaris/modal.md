---
system: Shopify Polaris
component: Modal (deprecated) / App Bridge Modal
url: https://polaris.shopify.com/components/deprecated/modal
last_verified: 2026-03-28
---

# Modal

## Approach
Polaris Modal is notable for being in active transition. The original Polaris React Modal was deprecated in January 2026 in favor of App Bridge Modals, which are rendered by the Shopify admin shell rather than within the app iframe. This architectural shift reveals Shopify's core insight: in embedded app ecosystems, modals rendered inside an iframe cannot center relative to the full viewport, creating a jarring visual experience. By moving modal rendering to the host (Shopify admin), modals behave consistently regardless of the embedded app's layout. The original Polaris Modal was designed around merchant workflows — confirming bulk actions, reviewing orders, editing product details — with a strict two-button maximum (primary + secondary) and built-in loading states for async operations. The transition to App Bridge preserves these patterns while solving the fundamental iframe centering problem.

## Key Decisions
1. **Migration from component to platform primitive** (HIGH) — Polaris deprecated its Modal React component in favor of App Bridge modals rendered by the host platform. This is architecturally significant: it means the modal is no longer "owned" by the app developer but by the Shopify admin shell. The benefit is visual consistency and proper viewport centering, but the tradeoff is less customization control — you cannot style App Bridge modals arbitrarily.

2. **Strict two-button action model** (HIGH) — Polaris enforces a maximum of one primary and one secondary action button. The primary action must align with the modal's purpose (e.g., "Save" for an edit modal), and the secondary is typically "Cancel." Shopify found that more than two buttons caused decision paralysis for merchants processing high volumes of orders quickly. A tertiary action is technically possible but actively discouraged.

3. **`loading` prop for async operations** (MEDIUM) — The modal has a built-in loading state that shows a spinner overlay while data is being fetched or an action is processing. Shopify built this because merchant apps frequently make API calls when a modal opens (loading product data, order details), and without a standard loading pattern, developers were creating inconsistent skeleton states.

4. **Sectioned content layout** (MEDIUM) — The `sectioned` prop wraps modal content in padded sections with dividers. Shopify added this because the most common Polaris modal pattern is a form with distinct groups of fields, and rather than making every developer manually add spacing and dividers, they standardized the pattern. This also ensures consistent padding across all Shopify apps.

## Notable Props
- `primaryAction` / `secondaryActions`: Accept button config objects (not children), enforcing the action hierarchy at the API level rather than relying on developers to use the right button variants.
- `loading`: Boolean that overlays a spinner on the modal content. Built-in because async data loading in modals is near-universal in e-commerce apps.
- `sectioned`: Adds standardized padding and dividers to content sections. Eliminates a common source of visual inconsistency.
- `large`: Boolean to toggle between default and large modal widths.

## A11y Highlights
- **Keyboard**: Focus trapped within the modal. Escape closes. Tab cycles through interactive elements. Focus moves to the modal on open and returns to the trigger on close.
- **Screen reader**: Uses `role="dialog"` with `aria-labelledby` linked to the modal title. Actions are announced with their roles.
- **ARIA**: Background content is marked inert. The modal title serves as the accessible name. Close button has an accessible label.

## Strengths & Gaps
- **Best at**: E-commerce workflows — the loading state, sectioned layout, and strict action model are optimized for merchant-facing apps that handle async data and bulk operations.
- **Missing**: Being deprecated means no further investment; the App Bridge replacement lacks the compositional flexibility of a React component, and there is no built-in support for size variants beyond default and large.
