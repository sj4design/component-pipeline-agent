---
system: Ant Design
component: Skeleton
url: https://ant.design/components/skeleton/
last_verified: 2026-03-28
---

# Skeleton

## Approach

Ant Design's Skeleton is the most feature-complete skeleton system among the six reviewed, offering a base `Skeleton` component plus five specialized sub-components — `Skeleton.Avatar`, `Skeleton.Button`, `Skeleton.Input`, `Skeleton.Image`, and `Skeleton.Node` — that directly mirror Ant Design's actual form and UI components. The philosophy is explicit content-shape mimicry: if your page shows a Button after loading, you show `Skeleton.Button` before loading. If it shows an Avatar, you show `Skeleton.Avatar`. The sub-components share the same size props as their real counterparts, making size matching automatic rather than manual.

This explicit mirroring philosophy contrasts with Carbon's generic building blocks and Spectrum's wrapper approach. Ant Design essentially says: "we know what's loading — it's one of our components — so show the appropriately-shaped placeholder." The `active` prop toggles a shimmer animation (CSS gradient sweep) that can be enabled system-wide at a parent level, synchronizing shimmer timing across all skeleton elements on a page. When `active` is false, the skeleton is a static, unanimated placeholder — appropriate for layouts that want to reduce motion or where the load is expected to be very fast.

The base `Skeleton` component (without sub-components) ships with a text/paragraph layout featuring configurable title and paragraph line blocks, making it ideal for article or feed content. Ant Design is unusual in explicitly comparing skeleton to spinner in its documentation: skeletons are for network request delays where content structure is known; spinners are for indeterminate operations where a loading overlay is acceptable.

## Key Decisions

1. **Sub-components mirror real component props** (HIGH) — `Skeleton.Button`, `Skeleton.Input`, `Skeleton.Avatar`, `Skeleton.Image`, and `Skeleton.Node` accept the same `size` and shape props as their real component counterparts. WHY: developers should not need to look up how big an `Avatar` skeleton should be when using `Avatar size="large"` — it should just be the same size. By designing skeleton sub-components to mirror the real component API, Ant Design eliminates a class of copy-paste errors and ensures size consistency between loading and loaded states.

2. **`active` prop for shimmer control** (HIGH) — The `active` boolean on any skeleton component enables or disables the CSS shimmer animation. WHY: not all loading contexts benefit from animation. A skeleton that appears for under 500ms (fast network response) briefly shows an animating placeholder before it disappears, which can feel jarring. Teams handling fast loads can set `active={false}` for static skeletons. The prop can also be driven by `prefers-reduced-motion` detection at the application level, feeding a single boolean into all skeleton instances.

3. **Skeleton.Node for arbitrary custom shapes** (MEDIUM) — `Skeleton.Node` is a generic skeleton block that accepts `children` for creating custom placeholder shapes — anything not covered by the named sub-components. WHY: Ant Design's ecosystem has thousands of third-party components. Rather than pretending to cover every case with named sub-components, `Skeleton.Node` provides an escape hatch. It's the philosophical acknowledgment that no design system can anticipate every content type, while the named sub-components cover the common 95%.

4. **Paragraph and title configuration in base Skeleton** (MEDIUM) — The base `Skeleton` component accepts `paragraph` (boolean or object with `rows` count) and `title` (boolean) to compose a standard article/content loading state. WHY: the most common skeleton pattern in Chinese and international web applications is a card or article preview with a title line and several body lines. Rather than requiring developers to compose these manually, the base Skeleton encodes this pattern directly. The `rows` configuration lets teams match paragraph line count to actual content length.

5. **Shimmer uses CSS gradient animation for performance** (MEDIUM) — Ant Design's shimmer animation uses a CSS `linear-gradient` sweep via `background-position` animation on a pseudo-element (the classic shimmer technique, though later optimized). WHY: this approach requires no JavaScript, performs reasonably well, and is supported across all browsers. The animation signals continuous loading activity without requiring DOM mutations, keeping the browser's main thread available for processing the incoming data response.

## Notable Props
- `active` (boolean): Enables/disables shimmer animation — should be wired to `prefers-reduced-motion` at the app level
- `avatar` (boolean | AvatarProps): Renders a circular avatar skeleton inline with content; pairs with `paragraph` for a typical social-card loading state
- `paragraph` (boolean | `{rows: number}`): Configures body text placeholder line count
- `title` (boolean | `{width: string}`): Adds a title line skeleton with optional width control
- `Skeleton.Avatar: shape` — `"circle"` | `"square"` matching Avatar's shape prop
- `Skeleton.Button: shape` — `"default"` | `"circle"` | `"round"` matching Button shapes
- `Skeleton.Input: size` — `"large"` | `"default"` | `"small"` matching Input sizes
- `Skeleton.Image: (no required props)` — Fixed image placeholder with an image icon inside; size configurable via style

## A11y Highlights
- **Keyboard**: Not interactive; no keyboard behavior
- **Screen reader**: Ant Design's Skeleton renders as `<div>` elements without built-in `role="status"`, `aria-live`, or `aria-label` attributes. Screen readers will skip skeleton elements but will also receive no loading announcement. This is a documented gap: the recommended practice is to wrap the skeleton region in an element with `aria-busy="true"` and add a visually hidden status message (`<span className="sr-only" aria-live="polite">Loading content</span>`). Individual skeleton nodes should receive `aria-hidden="true"` to prevent screen readers from describing placeholder shapes
- **ARIA**: No built-in ARIA attributes; full screen reader accessibility requires developer-added `aria-busy`, `aria-hidden`, and `aria-live` implementation. This mirrors the gaps found in Carbon and Polaris — skeleton accessibility is widely treated as a developer responsibility rather than a component guarantee

## Strengths & Gaps
- **Best at**: The widest component coverage among the six systems; `Skeleton.Button`, `Skeleton.Input`, `Skeleton.Image` are unique to Ant Design and enable precise form-layout skeletonization; `Skeleton.Node` escape hatch handles any custom case
- **Missing**: No built-in ARIA or screen reader support; no staggered/delayed skeleton appearance for sequential content; shimmer color and speed are not exposed as design tokens (hardcoded); responsive auto-scaling for sub-components requires manual breakpoint handling
