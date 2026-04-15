---
component: Skeleton
tier: 3
last_verified: 2026-03-29
---

# Skeleton — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Skeleton (Themes) | Wrapper approach: `<Skeleton>content</Skeleton>` matches content dimensions automatically; `loading` prop toggles between skeleton and real content; `aria-busy="true"` on container. | high |
| Chakra UI | Skeleton / SkeletonCircle / SkeletonText | Three-variant system; `isLoaded` with fade transition wraps real content; `SkeletonText` with `noOfLines` for multi-line placeholders; `startColor`/`endColor` shimmer customization. | high |
| GOV.UK | Not available — server-rendered model | No skeleton component; server-side rendering means content is present on page load; SPA-style progressive loading is incompatible with GOV.UK's no-JavaScript-required model. | high |
| Base Web | Skeleton | Single generic component shaped by `width`/`height`/`borderRadius`; `rows` prop for text-line layout; `animation` prop to disable; Overrides for Root; no SkeletonCircle/SkeletonText shortcuts. | medium |
| Fluent 2 | Skeleton / SkeletonItem | Container/item separation: Skeleton sets `animation` ("wave" or "pulse") for all children; SkeletonItem has `size` and `shape` ("rectangle", "circle", "square"); `aria-busy` guidance built into docs. | high |
| Gestalt | SkeletonLoader | Most extensively used T3 component for Pinterest's infinite scroll grid; composable primitives (Box, Avatar, Text); `accessibilityLabel` required; `color` prop for surface context; `prefers-reduced-motion` support. | high |
| Mantine | Skeleton | Single element with `height`/`width`/`radius`/`animate`; `visible` wrapper prop shows skeleton or renders children; `circle` shorthand; CSS pulse animation respects `prefers-reduced-motion`. | high |
| Orbit | Loading (Skeleton) | `variant` ("circle" | "rect" | "text") with `rowCount` for multi-line; content-shape mirroring for flight result cards; `role="status"` wrapper with `aria-live="polite"`; individual elements `aria-hidden`. | high |
| Evergreen | Not available — Spinner used instead | Bimodal latency pattern (fast reads or slow jobs) makes skeleton screens rarely useful; Spinner is the standardized loading pattern; CSS escape hatch for teams needing shimmer via Box components. | high |
| Nord | Not available — clinical data accuracy | Skeleton's optimistic implication that data is coming creates clinical ambiguity if data fails or is absent; `<nord-spinner>` is the unambiguous alternative; server-rendering further reduces loading states. | high |

## Key Decision Patterns

The most fundamental divide in T3 skeleton components is wrapper-with-toggle versus explicit-composition. Radix, Chakra, and Mantine all support a wrapper pattern: wrap actual content in the Skeleton component, then toggle a prop (`loading`, `isLoaded`, `visible`) to switch between the skeleton and real content. This avoids conditional rendering — the component tree doesn't need to branch between "skeleton layout" and "real content layout." Base Web, Fluent 2, and Orbit all require explicit composition: individual skeleton elements are placed separately from real content, and the consuming component renders one or the other conditionally. The wrapper approach produces cleaner component trees; the composition approach gives more control over the exact skeleton shape independent of the real content.

Fluent 2's container/item separation is the most architecturally organized of the composition approaches. The parent `<Skeleton animation="wave">` sets animation for all child `<SkeletonItem>` elements, centralizing animation control without per-item prop repetition. This mirrors how Fluent 2 structures other compound components: container sets context, children consume it. Gestalt's composable primitives (SkeletonLoader.Box, SkeletonLoader.Avatar, SkeletonLoader.Text) serve the same purpose but as named sub-variants rather than a container/item hierarchy. The practical difference is that Fluent 2's approach makes animation mode global (you can't have some items pulse while others wave), while Gestalt's approach allows mixing shape variants in a single skeleton layout.

Gestalt's `accessibilityLabel` required prop and Orbit's `role="status"` with `aria-live="polite"` are the two most complete accessibility implementations in the T3 set. Most systems recommend `aria-busy="true"` on a container (Fluent 2's guidance, Radix, Base Web), which communicates that content is loading but doesn't announce anything proactively to screen readers. Orbit's `role="status"` with a live region that announces "Loading…" is the active approach — it tells screen reader users that loading is in progress rather than relying on them to check `aria-busy`. Gestalt's required `accessibilityLabel` ensures the `role="progressbar"` on the skeleton has a meaningful label (what is loading, not just "loading").

Nord's absence is the most principled argument in the T3 set against a widely-used component. The core argument — that a skeleton loader is an optimistic UI pattern that implies content is forthcoming, which is medically unsafe if data fails to load or is genuinely absent — applies to any domain where accurate system state communication matters more than perceived performance. GOV.UK's absence is architectural (server rendering makes skeletons unnecessary), while Evergreen's is pragmatic (Segment's latency distribution makes them rarely useful). Nord's is a patient safety argument: showing a pulsing gray placeholder where a lab result will appear is a false promise that a clinician cannot afford to act on.

## A11y Consensus

- Skeleton placeholder elements must be hidden from assistive technologies — either with `aria-hidden="true"` on individual skeleton items, or by placing the entire skeleton region inside an element with `aria-hidden="true"`. Screen readers should not announce meaningless gray-box placeholders.
- The container region should have `aria-busy="true"` while skeletons are visible; when real content is loaded, `aria-busy` should be removed or set to `false` — this is the minimum accessible loading state pattern.
- For proactive announcements, wrapping the skeleton in a `role="status"` or `aria-live="polite"` region allows assistive technologies to announce "Loading…" when the skeleton appears and optionally announce content availability when it disappears (Orbit's approach).
- Shimmer and pulse animations must respect `prefers-reduced-motion` — the CSS animation should be paused or removed when the media query is active. Gestalt and Mantine both implement this; it is the most common skeleton accessibility gap in custom implementations.
- Required `accessibilityLabel` (Gestalt's pattern) or `aria-label` on the skeleton container should describe what is loading (e.g., "Loading search results") rather than generic "Loading" — this is especially important when multiple independent loading regions exist on the same page.

## Recommended Use

Reference T3 skeleton approaches when deciding on wrapper-vs-composition pattern, animation type, and accessible loading announcements. Radix and Mantine are the references for the wrapper/toggle pattern (`loading`/`visible` props) that avoids conditional component tree branching; Fluent 2 is the reference for container/item separation with global animation control; Gestalt is the reference for composable shape primitives with required accessible labels and `prefers-reduced-motion` support; Orbit is the reference for `role="status"` + `aria-live="polite"` for proactive loading announcements; Nord is the reference for the patient safety argument against skeleton loaders in clinical contexts.
