---
system: Material Design 3
component: No formal Skeleton component — loading placeholder pattern only
url: https://m3.material.io/components/progress-indicators/overview
last_verified: 2026-03-28
---

# Skeleton / Loading Placeholder

## Approach

Material Design 3 does not ship a formal, coded Skeleton component in its component library. Instead, M3 delegates loading placeholder behavior to third-party implementations (most prominently MUI's `<Skeleton>` component) and directs teams toward Progress Indicators — linear or circular — for communicating loading states. The philosophy behind this omission is intentional: M3's guidance treats loading as a motion and feedback problem rather than a layout-mimicry problem, preferring clearly communicated progress over content-shape placeholders. Google's own products (Search, Gmail, Photos) have historically used a combination of content-progressive rendering and progress indicators rather than skeleton screens. Where community implementations have emerged, the most common is MUI's Skeleton which offers `text`, `circular`, `rectangular`, and `rounded` variants with either a `pulse` (opacity fade) or `wave` (shimmer sweep) animation — but this is not an official M3 component.

The absence is itself a design decision: M3's content design guidance emphasizes showing real content as quickly as possible through techniques like lazy loading and progressive enhancement rather than investing in loading-state placeholders that require maintaining a second "fake" version of every layout.

## Key Decisions

1. **No official Skeleton component** (HIGH) — M3 deliberately excludes a Skeleton component from its component catalog. The WHY is architectural: Google's design team believes that skeleton screens can create false expectations when content loads differently from the placeholder shape, and that effort is better spent on actual performance improvements. This means any team using M3 must either adopt MUI's community skeleton, build their own, or lean on progress indicators.

2. **Progress Indicators are the canonical loading primitive** (HIGH) — M3's `LinearProgressIndicator` (indeterminate) and `CircularProgressIndicator` (indeterminate) are the official answer to "something is loading." The WHY: these indicators are honest — they don't pretend to know content shape. For initial page load where layout is unknown or highly variable, a progress indicator at the top of the screen communicates loading without risking layout-shift disappointment. This trades perceived performance for honesty.

3. **Community skeleton implementations (MUI) adopt pulse + wave pattern** (MEDIUM) — The most-used M3-adjacent Skeleton (MUI) defaults to a `pulse` animation (rhythmic opacity fade) rather than shimmer. WHY: pulse is less jarring than a moving shimmer gradient and performs better on lower-end devices. Teams can override to `animation="wave"` for a shimmer effect. This reflects M3's broader motion philosophy of subtle, purposeful motion that doesn't distract.

4. **Four shape variants in community implementations** (MEDIUM) — MUI's skeleton offers `text`, `circular`, `rectangular`, `rounded` variants. The WHY: content types have distinct geometric identities — avatars are circular, images are rectangular, text lines are thin rectangles with rounded ends. Having named variants prevents teams from manually setting height/width/border-radius to approximate shapes, reducing inconsistency.

5. **Reduced motion is respected** (MEDIUM) — Both pulse and wave animations should be disabled via `prefers-reduced-motion` media query, consistent with M3's accessibility motion tokens. M3's motion system explicitly documents that animations should defer to user OS preferences.

## Notable Props
- `animation` (MUI community): `"pulse"` | `"wave"` | `false` — choosing between opacity fade vs shimmer vs static; `false` is for cases where the user has already waited long enough and animation would feel mocking
- `variant` (MUI community): `"text"` | `"circular"` | `"rectangular"` | `"rounded"` — shape semantics rather than size semantics, which is philosophically distinct from systems like Atlassian that use sizing tokens
- `width` / `height`: Explicitly required when variant is not `"text"` — this forces intentional sizing rather than guessing

## A11y Highlights
- **Keyboard**: Not interactive; no keyboard handling needed
- **Screen reader**: No official M3 guidance. Community implementations (MUI) do not add `role="status"` or `aria-live` by default — screen readers skip the skeleton entirely with no loading announcement. This is a documented gap; the recommended workaround is wrapping the loading region in `aria-busy="true"` on the container and providing a visually hidden status message via `aria-live="polite"`
- **ARIA**: M3's official Progress Indicators use `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` (or omit valuenow for indeterminate). The Skeleton pattern has no equivalent official ARIA specification in M3

## Strengths & Gaps
- **Best at**: Directing teams toward honest progress communication; community MUI implementation is highly flexible and widely adopted for M3-styled apps
- **Missing**: No official Skeleton component means no canonical accessibility spec, no design tokens for skeleton color, and no official guidance on when skeleton is preferable to a progress indicator — teams are left to make those architectural decisions independently
