---
system: Polaris (Shopify)
component: Not available natively
url: https://polaris.shopify.com/components
last_verified: 2026-03-28
---

# Segmented Control (Polaris)

## Approach
Polaris does not include a dedicated segmented control or content switcher component. This absence is intentional and documented in Shopify's design principles: Polaris is purpose-built for merchant-facing commerce admin interfaces, and the Shopify product team determined that segmented controls are rarely the right pattern in commerce contexts. The typical segmented control use case — switching between views of the same content (table vs. card, monthly vs. yearly, filters) — is handled in Polaris through two separate, more specific components: ButtonGroup for mutually exclusive action choices and Tabs for navigating between sections of an interface. The absence reflects a philosophy of not shipping components until there is a clear, high-frequency use case in Shopify's actual product surfaces. Polaris historically ships fewer components at higher quality rather than comprehensive component coverage at lower quality. Teams building Shopify apps or admin extensions who need a segmented control pattern are directed to use ButtonGroup with controlled selection state, or to build a custom implementation using Polaris's design tokens.

## Key Decisions
1. **ButtonGroup as the recommended fallback** (HIGH) — Polaris's ButtonGroup component, when used with controlled state and `variant="segmented"` (added in Polaris v12), renders a visually connected group of buttons that approximates a segmented control's appearance. The selection state is managed by the parent component. This is a pragmatic solution — it delivers the visual pattern without introducing a new component, but it lacks the keyboard navigation optimizations (roving tabindex, arrow key navigation) that a purpose-built segmented control would include.
2. **Tabs for content switching between sections** (HIGH) — For view switching that involves distinct content areas (different datasets, different form sections, different panels), Polaris recommends Tabs rather than a segmented control. The guidance is explicit: if clicking a segment changes the primary content area of a page section, use Tabs; if it filters or reformats existing content inline, use a custom ButtonGroup segmented pattern. This reflects Polaris's view that the segmented control pattern conflates two distinct use cases.
3. **No overflow handling** (MEDIUM) — Because there is no dedicated component, there is no defined overflow behavior. Teams implementing a ButtonGroup-based segmented control must handle responsiveness themselves, which has led to inconsistent implementations across Shopify app ecosystem.

## Notable Props
- No dedicated component. ButtonGroup `variant="segmented"` prop provides visual styling.
- For custom implementations, the Polaris design token `--p-color-bg-surface-selected` represents the active segment background.

## A11y Highlights
- **Keyboard**: No prescribed keyboard pattern for the ButtonGroup-as-segmented-control approach. Individual buttons in a ButtonGroup each receive Tab focus independently (no roving tabindex), which means keyboard users must Tab through each button rather than using arrow keys — this is less efficient than a proper segmented control keyboard pattern.
- **Screen reader**: Individual buttons announce as "button [label] [pressed/not pressed]" using `aria-pressed`. There is no group-level ARIA label by default — teams must add a `role="group"` wrapper with `aria-label` themselves.
- **ARIA**: No prescribed pattern. The absence of a formal component means accessibility implementation quality varies widely across Shopify app ecosystem builds.

## Strengths & Gaps
- **Best at**: Nothing specifically — this is a genuine gap in the system. The ButtonGroup workaround is functional but suboptimal compared to purpose-built solutions in MD3, Spectrum, Carbon, and Ant Design.
- **Missing**: A dedicated segmented control component with proper keyboard navigation, ARIA semantics, overflow handling, and responsive behavior. This is one of the most frequently requested missing components in the Polaris GitHub issues tracker.
