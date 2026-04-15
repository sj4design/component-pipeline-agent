---
component: skeleton
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent (MUI community implementation)
**Approach:** M3 has no official Skeleton component. MUI provides a community Skeleton built on M3 surface tokens. It supports four shape variants (`text`, `circular`, `rectangular`, `rounded`) and two animation modes: `pulse` (opacity fade, default) and `wave` (shimmer sweep). `prefers-reduced-motion` disables animation automatically.
**Key Decisions:**
- [HIGH] Absent from M3 spec: skeleton loading is treated as an application concern, not a component system concern by Google's M3 team
- [MED] MUI's pulse default: opacity pulse is subtler than shimmer wave — appropriate for M3's restrained motion philosophy; wave is opt-in
- [MED] `prefers-reduced-motion` auto-disable: MUI's implementation respects the media query automatically — animation stops for users with motion sensitivity
**Notable API:** No M3 component. MUI's `Skeleton`: `variant: "text" | "circular" | "rectangular" | "rounded"`; `animation: "pulse" | "wave" | false`; `width` / `height`
**A11y:** No built-in ARIA. Teams add `aria-busy="true"` to the loading region and `aria-hidden="true"` to skeleton elements. No live region announcement of loading state.
**Best at:** `prefers-reduced-motion` auto-handling and the four shape variants covering common content types.
**Missing:** Component-mirroring sub-components (Skeleton.Button, Skeleton.Input) — shape matching to specific M3 components requires manual sizing.

---

## spectrum
**Component:** S2 wrapper model (isLoading on real components) — Beta
**Approach:** Spectrum's Spectrum 2 approach wraps real components with a unified `isLoading` prop — the skeleton is automatically the same size and shape as the real component. Mock data (actual values passed to the component) combined with `isLoading` renders a shimmer overlay over the component's shape. Loading forms automatically disable all inputs. This is architecturally distinct from all other systems — no separate skeleton components needed.
**Key Decisions:**
- [HIGH] `isLoading` on real components: the skeleton IS the component — no separate Skeleton component needed; shape mismatch between skeleton and loaded state is architecturally impossible
- [MED] Automatic form disabling: all form inputs within a loading container are disabled during `isLoading` state — prevents user interaction with partially loaded forms
- [MED] Shimmer wave animation: the shimmer is applied as an overlay on the actual component shape, not a separate placeholder element
**Notable API:** `isLoading: boolean` on supported Spectrum 2 components; no separate Skeleton component; `ProgressCircle` for indeterminate loading where shape is unknown
**A11y:** The loading region automatically has `aria-busy="true"` applied by the component framework. Disabled form inputs during loading are accessible as disabled. Beta status means full a11y coverage is not yet guaranteed.
**Best at:** Zero shape mismatch — the component IS its own skeleton, so loaded and loading states are always the same dimensions and structure.
**Missing:** Beta status — not production-ready; does not cover custom non-Spectrum components; limited coverage of all Spectrum components as of 2026.

---

## carbon
**Component:** 3 building blocks: SkeletonText / SkeletonIcon / SkeletonPlaceholder
**Approach:** Carbon provides three building blocks for composing skeleton layouts: `SkeletonText` (configurable line count with optional heading style), `SkeletonIcon` (icon-sized placeholder), and `SkeletonPlaceholder` (arbitrary-size rectangular block). No action component skeletons (no SkeletonButton, SkeletonInput). CSS `transform` animation is GPU-accelerated, not JavaScript-driven. Historic a11y gap documented in GitHub issue #4310.
**Key Decisions:**
- [HIGH] Three generic building blocks: Carbon provides shape primitives, not component mirrors — teams compose layouts that approximate the real content structure rather than matching specific components
- [MED] `SkeletonText` with `heading` prop: renders a wider line for heading text vs. narrower lines for body text — matches typical page section layouts
- [MED] GPU-optimized animation: `transform: translateX()` animation instead of `background-position` — better performance on low-end devices used in IBM field environments
**Notable API:** `SkeletonText`: `lineCount`, `heading: boolean`, `width`; `SkeletonPlaceholder`: `style` for size; `SkeletonIcon`: `style` for size; no shimmer color customization
**A11y:** Historic gap (issue #4310): skeleton elements lacked `aria-hidden` and `aria-busy` in older versions. Current recommendation: wrap skeleton region in `<div aria-busy="true">` and add `aria-hidden="true"` to skeleton elements. No built-in live region.
**Best at:** GPU-optimized animation and the `heading` prop on SkeletonText for matching typical page layouts with distinct heading and body widths.
**Missing:** Component-mirroring skeleton sub-components; no `SkeletonButton` or `SkeletonInput` for form skeleton layouts; shimmer color and speed not exposed as design tokens.

---

## polaris
**Component:** 5 components: SkeletonPage / SkeletonBodyText / SkeletonDisplayText / SkeletonThumbnail / SkeletonTabs
**Approach:** Polaris provides dedicated skeleton components for each level of the Shopify Admin page structure. `SkeletonPage` orchestrates the full page chrome skeleton (including back button and action bar placeholders). `SkeletonTabs` handles tab bar loading. The static vs. dynamic content distinction is a documented architectural decision: only content that is loaded async gets a skeleton; static chrome (navigation, breadcrumbs) does not.
**Key Decisions:**
- [HIGH] `SkeletonPage` for full page chrome: mirrors the Page component's layout including back button, title, and action areas — ensures the Shopify Admin page chrome skeleton exactly matches the loaded page structure
- [MED] Static vs. dynamic distinction: navigation and chrome are static (never skeletonized); only async-loaded content data gets skeletons — prevents confusing "everything loading" states
- [MED] `SkeletonTabs` as a dedicated component: tabs are a common pattern in Shopify Admin pages; the skeleton component ensures tab bar placeholders have the correct height and spacing
**Notable API:** `SkeletonPage`: `primaryAction: boolean`, `backAction: boolean`, `title` (shows text placeholder); `SkeletonBodyText`: `lines: number`; `SkeletonThumbnail`: `size: "small" | "medium" | "large" | "extraSmall"`
**A11y:** No built-in `aria-busy` or `aria-live`. Teams must wrap skeleton regions in `aria-busy="true"` containers. Polaris documentation does not specify skeleton a11y requirements — the gap mirrors Carbon's historic issue.
**Best at:** SkeletonPage for full Shopify Admin page loading states — the page-level orchestration component ensures all chrome skeleton elements match the real page layout.
**Missing:** Component-level skeletons (SkeletonButton, SkeletonInput) for form skeletons; built-in `aria-busy` and `aria-hidden` wiring.

---

## atlassian
**Component:** Skeleton (single flexible component — Early Access)
**Approach:** Atlassian's Skeleton is a single configurable component whose size is determined by typography scale tokens or explicit dimensions. The design system guidance prescribes `aria-hidden="true"` on skeleton elements with `aria-busy="true"` on the loading container as the correct implementation pattern. Configurable border radius. Listed as Early Access status in the Atlassian Design System.
**Key Decisions:**
- [HIGH] Single component with typography scale sizing: skeleton dimensions are specified using Atlassian's spacing and typography tokens — ensures skeletons match the visual scale of the real content
- [HIGH] `aria-hidden="true"` strategy documented: Atlassian explicitly specifies the correct ARIA approach (skeleton elements `aria-hidden`, container `aria-busy`) — the most explicit a11y guidance for skeleton in Tier 1
- [MED] `borderRadius` prop: configurable corner radius — matches both text (no radius) and thumbnail/image (rounded) content shapes in one component
**Notable API:** `width`, `height` (or text-size token); `borderRadius`; `isShimmering: boolean` for animation control; `testId`; Early Access status
**A11y:** Documentation prescribes `aria-hidden="true"` on each Skeleton instance and `aria-busy="true"` on the loading region container — the most prescriptive and correct skeleton accessibility guidance in Tier 1.
**Best at:** Explicit `aria-hidden` + `aria-busy` strategy documentation and typography-token-based sizing for text content matching.
**Missing:** Component-mirroring sub-components; Early Access status means production stability is not guaranteed; shimmer color/speed not exposed as tokens.

---

## ant-design
**Component:** 6 sub-components (most complete Tier 1)
**Approach:** Ant Design's Skeleton provides the base component plus five sub-components: `Skeleton.Avatar`, `Skeleton.Button`, `Skeleton.Input`, `Skeleton.Image`, and `Skeleton.Node`. The sub-components share the same `size` and `shape` props as their real component counterparts, making size matching automatic. `active` prop enables shimmer animation. Base `Skeleton` includes `paragraph` and `title` config for article layouts. `Skeleton.Node` is the escape hatch for custom shapes.
**Key Decisions:**
- [HIGH] Component-mirroring sub-components: `Skeleton.Button` / `Skeleton.Input` / `Skeleton.Avatar` / `Skeleton.Image` match the real component sizes via identical props — eliminates copy-paste size errors
- [HIGH] `active` prop for shimmer control: animation can be disabled globally for fast-loading contexts or wired to `prefers-reduced-motion` at app level
- [MED] `Skeleton.Node` escape hatch: for third-party or custom components not covered by named sub-components — accepts `children` for arbitrary placeholder shapes
**Notable API:** `active: boolean`; `avatar: boolean | AvatarProps`; `paragraph: {rows: number}`; `Skeleton.Button: {shape, size}`; `Skeleton.Input: {size}`; `Skeleton.Node` with children
**A11y:** No built-in ARIA attributes. Teams must add `aria-busy="true"` to loading containers and `aria-hidden="true"` to skeleton elements manually. No live region built-in — mirrors the gap in Carbon and Polaris.
**Best at:** Component-mirroring sub-components — the widest coverage of named skeleton shapes in Tier 1; `Skeleton.Button`, `Skeleton.Input`, and `Skeleton.Image` are unique to Ant Design and enable precise form-layout skeletonization.
**Missing:** Built-in `aria-busy` / `aria-hidden` wiring; shimmer color and speed not exposed as design tokens; no `prefers-reduced-motion` auto-handling.
