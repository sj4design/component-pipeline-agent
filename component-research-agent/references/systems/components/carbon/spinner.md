---
system: Carbon (IBM)
component: Loading
url: https://carbondesignsystem.com/components/loading/usage/
last_verified: 2026-03-28
---

# Loading

## Approach
Carbon is the only Tier 1 design system that formalises loading feedback as a three-pattern taxonomy rather than a single spinner component. The reasoning is IBM's enterprise product reality: in a data-heavy B2B application, loading happens at three distinct scopes simultaneously — a full-page initialisation, a form submission at a row level, and background data polling — and each scope demands a different interaction contract. A full-page overlay blocks the user intentionally; an inline spinner inside a button keeps the action visible and anchored to the triggering element; a standalone spinner signals background processing without interrupting the current task. Carbon's approach forces the product team to make a conscious, explicit choice about which loading type fits each scenario, rather than defaulting to a generic spinner that may communicate the wrong scope or urgency. This decision taxonomy also maps directly to IBM's Accessibility guidelines, since each type carries different ARIA requirements: the overlay must trap or restrict focus appropriately, the inline loader must announce its status change in context, and the background spinner requires an accessible label that explains what is loading.

## Key Decisions
1. **Three distinct loading types as separate components** (HIGH) — Carbon separates `Loading` (spinner/overlay), `InlineLoading`, and the loading overlay pattern rather than using a single component with a `type` prop. The rationale is that each has a different interaction model: the large spinner with overlay blocks all page interaction and communicates a system-level operation; the inline loader sits within a form row or button and communicates a localised, item-level action; the small standalone spinner signals ambient background activity. Merging these into one component would require teams to reason about overlay, focus trapping, and placement simultaneously — Carbon instead provides three focused tools. This is IBM's "progressive complexity" design principle applied to component APIs.

2. **Large vs. small size with overlay coupling** (HIGH) — The `large` loading indicator is almost always paired with a semi-transparent overlay that covers the triggering region or full page, actively blocking interaction during critical operations like bulk imports or system initialisation. The `small` spinner is specifically intended for inline, contextual loading within a UI element and is never paired with an overlay — it appears beside or within the triggering element itself. The size is therefore a signal of scope and blocking intent, not merely visual scale. Choosing the wrong size sends contradictory messages about whether the user can continue working.

3. **`InlineLoading` as a status machine** (HIGH) — Carbon's `InlineLoading` component is unusually stateful compared to other systems' spinners. It exposes four `status` values: `active` (spinning), `inactive` (hidden), `finished` (success checkmark), and `error` (error icon). This turns the component into a full feedback loop for the lifecycle of an async action: the spinner activates on submit, transitions to a checkmark on success, or an error icon on failure — all within the same component instance. The reasoning is that inline actions (form submissions, row-level operations) always have outcomes, and showing only the loading state without resolving to success or error leaves the user uncertain. This is a significantly more opinionated API than any other system's spinner.

4. **`description` prop for accessible context text** (MEDIUM) — All three loading types expose a `description` or label prop for supplementary text that appears alongside the spinner. For `InlineLoading`, this text changes per status ("Submitting...", "Submitted", "Failed"). Carbon's rationale is dual: it provides a visible loading message for sighted users (particularly important for long-running operations where "Loading..." alone is insufficient), and it acts as the accessible name for screen readers. Unlike Polaris which makes the label a required accessibility prop, Carbon treats it as optional but strongly encouraged.

5. **Loading overlay as a composable pattern rather than a prop** (MEDIUM) — For full-page or section-level blocking, Carbon uses the large `Loading` component positioned absolutely/fixed with a semi-transparent backdrop — but the backdrop is not a built-in prop; it is a documented usage pattern. This keeps the component itself simpler while the overlay is achieved through CSS and layout. The tradeoff is that teams must implement the overlay consistently themselves, which can lead to variation across products.

## Notable Props
- `status` (`active` | `inactive` | `finished` | `error`) on `InlineLoading`: Unique across Tier 1 systems — this is a full async-action lifecycle state machine in a loading component.
- `isActive` (on `Loading`): Simple boolean controlling visibility — straightforward, but the naming convention exposes Carbon's preference for readable prop names over concise ones.
- `withOverlay`: Toggles the semi-transparent page-blocking backdrop on the large spinner.
- `description`: The loading message text, also serving as the accessible label — important because Carbon uses visible text as the primary a11y affordance rather than hidden aria attributes.
- `small`: Boolean to switch between large (overlay-appropriate) and small (inline-appropriate) variants.

## A11y Highlights
- **Keyboard**: The large loading overlay does not formally trap focus in all Carbon implementations (a documented gap in the GitHub issues), but the design intent is that focus should not be reachable behind the overlay. `InlineLoading` is not interactive and does not affect focus. Carbon's docs advise managing focus programmatically at the application level when showing/hiding overlays.
- **Screen reader**: Carbon uses ARIA live regions to announce status changes. `InlineLoading` is particularly well-considered: when `status` transitions from `active` to `finished` or `error`, the status text update inside a live region is announced, giving screen reader users a concrete outcome notification. This is the most complete loading-lifecycle announcement of all Tier 1 systems.
- **ARIA**: The `description` text serves as both visible label and accessible name. Live regions (`aria-live="polite"`) broadcast status transitions. Carbon explicitly documents `prefers-reduced-motion` support — the spinner animation is suppressed when the user's OS motion preference is set to reduce.

## Strengths & Gaps
- **Best at**: The `InlineLoading` status machine — uniquely modelling the full async action lifecycle (loading → success/error) within a single component, with live region announcements for each transition.
- **Missing**: The large loading overlay does not natively enforce focus trapping, and there is no built-in duration-estimation or progress messaging for long-running operations (e.g., "This may take 2–5 minutes").
