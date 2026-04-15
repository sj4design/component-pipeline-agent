---
component: Container
tier: 2
last_verified: 2026-03-31
---

# Container — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Box (no Container) | No dedicated Container; Box with maxWidth, margin="auto", and padding props composes containment; layout patterns documented but not abstracted | high |
| Salesforce Lightning | Layout / Grid (no Container) | `slds-container` CSS utility classes provide max-width variants (small=480px, medium=768px, large=1024px, x-large=1280px) and `slds-container--center` for centering; not a component | high |
| GitHub Primer | Container (CSS utility) | `.container-sm`/`.container-md`/`.container-lg`/`.container-xl` CSS classes with max-widths (544px/768px/1012px/1280px) and auto margins; not a React component — applied via `sx` prop on Box | high |
| shadcn/ui | No Container component | No Container in the component library; relies on Tailwind's `container` class or manual `max-w-*` + `mx-auto` + `px-*` utilities; common pattern in Tailwind-first ecosystems | high |
| Playbook | Layout / Flex (no Container) | No dedicated Container; Layout kit provides max-width sections; Flex kit handles centering and padding | medium |
| REI Cedar | CdrContainer | Dedicated Container component with fluid behavior; applies max-width at breakpoints and horizontal padding; one of the few Tier 2 systems with an explicit Container | high |
| Wise Design | Container (internal) | Internal page-level container for Wise product pages; max-width centered layout with responsive padding; not publicly documented in detail | low |
| Dell Design System | Container (layout) | Enterprise page container with fixed max-widths at breakpoints; standard centered content pattern for Dell product pages | low |

## Key Decision Patterns

**CSS utility vs. component:** The most significant split in Tier 2 is between systems that provide Container as a CSS utility class (Lightning's `slds-container--*`, Primer's `.container-*`, shadcn/ui deferring to Tailwind's `container`) versus those that provide a dedicated component (Cedar's `CdrContainer`). CSS utility approaches are more flexible and composable but lack discoverability and consistent defaults. Component approaches enforce consistency but may be too opinionated for varied layout needs.

**Size variants:** Lightning and Primer both define discrete size breakpoints rather than a single responsive container. Lightning uses semantic names (small/medium/large/x-large) while Primer uses T-shirt sizes mapped to pixel values. This allows teams to choose the appropriate content width for different page types (narrow for articles, wide for dashboards).

**The "just use Tailwind" pattern:** shadcn/ui's approach of not providing a Container component reflects a broader trend in utility-first ecosystems — Tailwind's `container` class (responsive max-width + auto-center) or manual `max-w-screen-xl mx-auto px-4` is considered sufficient. This works well when the entire team uses Tailwind but creates inconsistency when some pages use different max-width values.

**Cedar as the outlier:** REI's Cedar is notable for having a proper `CdrContainer` component — a first-class layout primitive that handles responsive max-width and padding. This likely reflects REI's need for consistent page layouts across its e-commerce platform where marketing and product pages must share identical containment behavior.

## A11y Consensus
- Container components are layout primitives with no inherent ARIA semantics — they render as `<div>` elements
- Page-level containers should be wrapped in or contain landmark elements (`<main>`, `<section>` with `aria-label`)
- Container does not require `role="region"` unless it represents a distinct named section
- Max-width containers improve readability for users with cognitive disabilities by limiting line length (WCAG 1.4.8 recommends 80 characters or fewer per line)

## Recommended Use
For projects using Tailwind CSS, shadcn/ui's non-component approach (Tailwind `container` class or `max-w-*` utilities) is pragmatic and sufficient. For component-library-based systems, Cedar's `CdrContainer` pattern — a simple component that applies responsive max-width, centering, and horizontal padding — is the cleanest abstraction. Lightning's CSS utility approach is useful for systems that need multiple discrete width options (narrow/medium/wide) without component overhead.
