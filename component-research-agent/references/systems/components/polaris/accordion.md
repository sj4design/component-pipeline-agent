---
system: Shopify Polaris
component: Collapsible (no native Accordion)
url: https://polaris-react.shopify.com/components/utilities/collapsible
last_verified: 2026-03-28
---

# Collapsible (Polaris)

## Approach
Polaris deliberately does not include a dedicated Accordion component. Instead, it provides Collapsible as a low-level utility primitive that handles the expand/collapse animation of a single content section. The philosophy here reflects Shopify's merchant-admin context: accordion patterns in Shopify's admin are relatively rare because the interface favors cards, modals, and progressive disclosure through page navigation rather than stacking collapsible sections vertically. When an accordion-like pattern is needed, Polaris expects developers to compose it by pairing multiple Collapsible components with Button triggers and managing state manually. This composition-over-prescription approach means Polaris gives you the animation and accessibility plumbing but none of the group orchestration. The Collapsible component is categorized under "Utilities" -- not "Layout" or "Navigation" -- signaling that Shopify views it as an implementation tool rather than a first-class UI pattern.

## Key Decisions
1. **No accordion component -- composition approach instead** (HIGH) -- Polaris provides only the single-panel Collapsible primitive, leaving accordion group behavior entirely to the developer. WHY: Shopify's admin interface rarely uses stacked accordion patterns. Most expand/collapse in Polaris appears inside Cards (show more details), ResourceLists (expandable rows), or Filters (collapsible filter groups). These are all different enough that a generic Accordion component would either be too restrictive or too abstract. Polaris chose to give developers the building block and let them compose the right pattern for each context.

2. **Controlled-only via `open` prop** (MEDIUM) -- Collapsible has no internal state. The `open` boolean is always controlled externally. WHY: Since Collapsible is a utility, not an interactive component, the trigger (usually a Button) lives outside it. The parent component owns the state and passes it down. This avoids the ambiguity of "who controls the state" that plagues components with both controlled and uncontrolled modes.

3. **`expandOnPrint` prop** (LOW) -- When true, collapsed content becomes visible when the page is printed. WHY: Shopify merchants frequently print order details, product information, and reports. Hidden content that vanishes on print creates confusion. This prop solves a real merchant workflow pain point that most design systems ignore entirely.

4. **`variant` prop with inline and block directions** (MEDIUM) -- Collapsible supports collapsing in both vertical (block) and horizontal (inline) directions. WHY: Shopify's admin occasionally needs horizontal slide-in panels (like a filter sidebar) in addition to standard vertical collapses. Rather than creating a separate HorizontalCollapsible, they exposed direction as a variant.

## Notable Props
- `open`: Boolean. Controlled state -- required, no default expanded mode. Reflects the utility-primitive philosophy.
- `transition`: `{ duration: string, timingFunction: string }` or boolean. Allows fine-grained animation control or disabling animation entirely. Default is 150ms ease-in-out.
- `expandOnPrint`: Boolean. A thoughtful, merchant-specific feature for print media handling.
- `onAnimationEnd`: Callback fired when expand/collapse animation completes. Useful for triggering scroll-into-view or focus management after content appears.

## A11y Highlights
- **Keyboard**: No built-in keyboard handling -- Collapsible is content-only. Keyboard behavior depends entirely on the paired trigger component (typically a Button with `ariaExpanded`).
- **Screen reader**: Developers must manually set `ariaExpanded` on the trigger Button and `ariaControls` pointing to the Collapsible's `id`. Polaris documents this requirement but does not enforce it.
- **ARIA**: The `id` prop on Collapsible enables `aria-controls` linkage. No ARIA roles are applied to the collapsible container itself -- it is treated as a generic content wrapper.

## Strengths & Gaps
- **Best at**: Pragmatic utility design -- the `expandOnPrint` prop and inline/block variant show thoughtful attention to real merchant workflows, and the controlled-only API keeps state management predictable.
- **Missing**: No accordion group management, no built-in trigger pairing, no ARIA enforcement -- developers must wire up all accessibility manually. This makes it easy to build inaccessible implementations if the developer does not follow Polaris' guidelines carefully.
