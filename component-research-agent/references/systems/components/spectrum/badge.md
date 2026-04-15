---
system: Adobe Spectrum
component: Not available natively
url: https://spectrum.adobe.com/page/badge/
last_verified: 2026-03-28
---

# Badge

## Approach
Adobe Spectrum does not include a standalone Badge component in its core component library. This absence reflects Spectrum's enterprise and creative-tool focus — in applications like Photoshop, Illustrator, and Adobe Analytics, the dominant need is for status labels (which Spectrum addresses through its StatusLight and Tag components), not notification count badges. The typical mobile-app use case for badge counts (unread messages on a nav icon) is not a primary pattern in Spectrum's desktop-first application contexts. Note: Spectrum does have a `Badge` entry in its newer documentation, but it functions as a label/status indicator rather than a notification count badge — it overlaps more with what other systems call a "Tag" or "Status Badge." Teams that need notification-count behavior on icons typically layer a custom overlay using Spectrum's color tokens and typography scales on top of existing components.

The workaround most Spectrum-based teams use is to compose a count overlay using a `View` with `backgroundColor` set to a semantic color (commonly `negative` for alerts), border-radius set to a pill shape, and a `Text` element inside. This is documented as a community pattern rather than an official component. The gap is acknowledged in Spectrum's GitHub issues.

## Key Decisions
1. **Label-style Badge vs. count Badge** (HIGH) — Spectrum's documented `Badge` (where it exists) is a text label with a semantic fill color — it communicates category or status, not a numeric count. This is a fundamentally different semantic from a notification badge. Spectrum made this tradeoff because Adobe's products need rich status labeling more than notification counts.
2. **Semantic fill variants** (HIGH) — Where Spectrum's badge-like components exist, they use semantic color aliases (`positive`, `negative`, `notice`, `informative`, `neutral`) rather than arbitrary hex colors. This ensures that status meanings stay consistent across Adobe's entire product family and adapt to high-contrast and dark modes without per-component overrides.
3. **No anchor/positioning system** (MEDIUM) — Spectrum provides no built-in mechanism for anchoring a badge to another element (top-right of an icon, for example). The assumption is that if you need a floating indicator, you're in a layout context where you control positioning explicitly with CSS.

## Notable Props
- No official notification count Badge props — the pattern is not supported natively
- Spectrum's `StatusLight` has a `variant` prop (`positive`, `negative`, `notice`, `informative`) that covers the status-indicator use case

## A11y Highlights
- **Keyboard**: No keyboard behavior defined — absence means no native badge to interact with
- **Screen reader**: Workaround implementations must manually construct `aria-label` that includes the count in the parent button's accessible name
- **ARIA**: No standardized ARIA pattern provided by Spectrum for this component

## Strengths & Gaps
- **Best at**: Status labeling and categorization through Tag and StatusLight components, which serve the enterprise-app use case well
- **Missing**: No native notification count badge with positioning, overflow handling, or screen-reader count announcement — teams must implement from scratch
