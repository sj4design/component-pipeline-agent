---
system: Ant Design
component: Spin
url: https://ant.design/components/spin/
last_verified: 2026-03-28
---

# Spin

## Approach
Ant Design's `Spin` component is architecturally unique among Tier 1 design systems because it is designed as both a standalone indicator *and* a content-wrapping container that applies a loading overlay to any section of the UI. While every other system's spinner is a standalone element that you place near loading content, Ant Design's `Spin` can be wrapped around any JSX subtree — it renders its children behind a semi-transparent overlay with a blur effect and centres the spinner on top, preventing interaction while visually preserving the spatial context of what is loading. This "wrapper overlay" model reflects the reality of enterprise dashboards built with Ant Design (the dominant design system for Chinese-market B2B web applications): complex tables, charts, and forms need to enter a loading state without losing their visual structure, and having the spinner manage its own overlay DOM avoids the need for developers to build consistent overlay logic per component. The `delay` prop adds a nuanced UX layer: if the data loads faster than the delay threshold, the spinner never renders at all, eliminating the jarring flash of a spinner that appears and disappears within 50ms. The `tip` prop allows loading messages to appear beneath the spinner, which is important in enterprise workflows where "Loading..." is insufficient — "Uploading 24 files..." or "Syncing with server..." provides actionable context.

## Key Decisions
1. **Wrapper/overlay pattern as a first-class architectural feature** (HIGH) — `Spin` can wrap any React subtree as children. When `spinning={true}`, it renders a positioned overlay over the children with a semi-transparent backdrop (`rgba(0,0,0,0.85)` CSS variable) and blur, preventing interaction while keeping the content visible underneath. No other Tier 1 system builds this directly into the spinner component. The reasoning is DX efficiency: rather than every team composing `<Modal>` + `<Spinner>` + z-index management to achieve a content overlay, Ant Design provides a single composable primitive that handles all of that. The tradeoff is that the spinner component is now doing two jobs (indicating loading AND managing overlay), which increases its complexity.

2. **`delay` prop for flicker prevention** (HIGH) — `delay` (in milliseconds, default 0) prevents the spinner from rendering at all if the loading state resolves before the delay elapses. This is a UX-quality feature, not a cosmetic one: a spinner that appears for 80ms and disappears creates visual noise without providing useful information — it may actually increase perceived slowness by drawing attention to the latency. The `delay` prop essentially implements a debounce on the spinner's visibility. Ant Design is one of only two Tier 1 systems (along with Atlassian, which implies this pattern) that explicitly provides this mechanism as a built-in prop.

3. **`tip` prop for contextual loading messages** (HIGH) — The `tip` prop renders a text label beneath the spinner within the loading overlay. This goes beyond an accessibility label — it is visible text intended to communicate the nature or progress of the operation to sighted users. In enterprise contexts with long-running operations (file uploads, batch processing, data synchronisation), "Loading..." is meaningless; "Processing 1,847 records..." is actionable. The `tip` prop enables this without requiring developers to position a separate text element relative to the spinner.

4. **`fullscreen` mode** (MEDIUM) — The `fullscreen` boolean makes the `Spin` overlay cover the entire viewport, appropriate for application-level loading states (initial data fetch, authentication, global refresh). This maps to what Carbon achieves with its large Loading + overlay pattern, but Ant Design builds it into a single prop on the same component rather than using size as a proxy for blocking intent. A developer can thus switch between section-level (`Spin` wrapping a table) and application-level (`fullscreen`) loading with a single prop change.

5. **`indicator` slot for custom spinner elements** (MEDIUM) — The `indicator` prop accepts any React node as a custom spinner animation. This means teams can replace the default three-dot (or ring) animation with a branded animation, a skeleton-style loader, or a progress circle — all while retaining the `Spin` wrapper's overlay management and delay logic. No other Tier 1 system exposes this level of animation customisation as a first-class prop (Carbon's `Loading` and Spectrum's `ProgressCircle` use fixed animations). The reasoning is Ant Design's positioning as a highly customisable, "batteries included but swappable" system.

6. **Nested Spin instances for layered loading** (MEDIUM) — Multiple `Spin` components can be nested, with inner spinners visually taking precedence via z-index stacking. This supports genuinely complex async flows — e.g., a page-level `Spin` during initial load that contains a table section with its own `Spin` for a row-level operation — without requiring explicit z-index management by the developer. Ant Design's z-index token system (`--ant-z-index-popup-base: 1000`) manages the stacking context automatically.

## Notable Props
- `spinning` (`boolean`): The primary visibility control. Clean and explicit — notably different from props named `isActive` (Carbon) or `isIndeterminate` (Spectrum), the naming `spinning` is immediately readable.
- `delay` (`number`, ms): Debounces spinner visibility — important for preventing flicker on fast operations. One of the most practically useful props in any spinner API.
- `tip` (`ReactNode`): Loading message shown beneath the spinner — visible to sighted users, also serves as accessible context. Can render rich content, not just strings.
- `fullscreen` (`boolean`): Viewport-covering overlay mode — avoids needing a separate full-page loading pattern.
- `indicator` (`ReactNode`): Custom spinner element slot — full animation customisation without forking the component.
- `size` (`"small"` | `"default"` | `"large"`): Controls the spinner icon size (14px / 20px / 32px). When using the wrapper pattern, size refers to the indicator inside the overlay, not the overlay itself.
- `wrapperClassName`: CSS class applied to the wrapper `<div>` — necessary for custom overlay sizing or positioning.

## A11y Highlights
- **Keyboard**: In wrapper mode with `spinning={true}`, the children behind the overlay are visually obscured but remain in the DOM. Keyboard focus can technically still reach elements beneath the overlay unless the developer explicitly disables them. Ant Design does not automatically manage focus or apply `inert` to the wrapped content — this is a documented gap; developers must handle focus management when using the wrapper pattern in accessibility-critical flows.
- **Screen reader**: The `tip` text provides a visible loading label, but Ant Design's documentation does not explicitly document `role="status"` or `aria-live` on the spinner element. The `tip` text being visible means it is in the accessibility tree, but there is no guaranteed announcement on spinner appearance unless `aria-live` is present. Screen reader behaviour is less thoroughly specified than Atlassian, Polaris, or Carbon.
- **ARIA**: Ant Design uses CSS custom properties for focus indicators (`--ant-line-width-focus: 3px`) and supports motion preferences via CSS, but the spinner component itself does not expose explicit `aria-label` or `role` props at the component API level — these must be applied manually to the wrapper element if needed. This represents a gap relative to other Tier 1 systems that make accessible labelling a first-class API concern.

## Strengths & Gaps
- **Best at**: The wrapper/overlay pattern — the only Tier 1 system that lets you wrap any content section in a loading state with a single component, handling overlay DOM, z-index, blur, and flicker prevention (via `delay`) out of the box.
- **Missing**: Weak first-class accessibility API — no enforced `aria-label`, no explicit `role="status"` on the component, and no automatic focus management for the overlay wrapper pattern, which can leave keyboard and screen reader users able to reach content that is visually blocked.
