---
system: Shopify Polaris
component: Tooltip
url: https://polaris-react.shopify.com/components/overlays/tooltip
last_verified: 2026-03-28
---

# Tooltip

## Approach
Polaris takes a pragmatic, merchant-focused approach to tooltips. Shopify's admin interface is used by millions of non-technical merchants who need quick contextual help without disrupting their workflow. Polaris provides a single Tooltip component with a focused set of props that cover the most common e-commerce admin scenarios: hover delay control, click persistence, width presets, and preferred positioning. Rather than splitting into multiple components like Carbon, Polaris keeps one component but provides behavioral toggles. The philosophy is simplicity of adoption — Shopify has thousands of third-party app developers building admin extensions, and a single component with clear props is easier to use correctly than a multi-component architecture. The tradeoff is that Polaris tooltips are strictly non-interactive; any interactive overlay content belongs in the separate Popover component.

## Key Decisions
1. **Width presets instead of free-form sizing** (MEDIUM) — Polaris offers `width` as `'default' | 'wide'` rather than allowing arbitrary pixel values. This is a deliberate constraint: by limiting options, Polaris ensures visual consistency across thousands of Shopify apps. Merchants see a uniform tooltip experience regardless of which app they are using. The downside is that edge cases with very long or very short content may not look optimal, but Polaris prioritizes ecosystem consistency over per-instance perfection.

2. **`preferredPosition` with intelligent fallback** (HIGH) — The `preferredPosition` prop accepts `'above' | 'below' | 'mostSpace' | 'cover'`. The `'mostSpace'` option is notable: it automatically places the tooltip on whichever side has the most available space. This matters in Shopify's admin where sidebars, modals, and responsive layouts frequently constrain available screen real estate. Instead of forcing developers to calculate positioning, Polaris handles it. The `'cover'` option overlays the tooltip on top of the trigger, useful for compact data table cells.

3. **`persistOnClick` for touch-friendly behavior** (MEDIUM) — When enabled, the tooltip stays visible after a click rather than dismissing. This exists because many Shopify merchants use tablets to manage their stores. On touch devices, hover does not exist, so persisting after a tap gives touch users the same access to tooltip content that mouse users get via hover. This bridges the hover/touch gap without requiring a separate mobile implementation.

4. **`hoverDelay` for intentional triggering** (MEDIUM) — A configurable delay in milliseconds before the tooltip appears on hover. Polaris includes this because in data-dense admin tables, users frequently move the mouse across many cells and accidental tooltip triggering creates visual noise. The delay ensures the user has intentionally paused on an element.

## Notable Props
- `dismissOnMouseOut`: Boolean to dismiss when the mouse leaves the children area — useful for table headers where rapid scanning should not leave tooltips lingering.
- `persistOnClick`: Keeps tooltip visible after click, bridging the hover/touch divide for tablet merchants.
- `accessibilityLabel`: Provides a visually hidden label for screen readers, separate from the visual tooltip content — useful when the tooltip text is too verbose for a screen reader label.
- `active`: Controlled boolean to programmatically show/hide the tooltip.

## A11y Highlights
- **Keyboard**: Tooltip appears on focus of the trigger element. Dismissed on blur or Escape.
- **Screen reader**: Uses `accessibilityLabel` to provide concise descriptions separate from visual content, so screen reader users get optimized text rather than the full visual tooltip.
- **ARIA**: Trigger element gets `aria-describedby` referencing the tooltip. The tooltip container has appropriate role assignment for assistive technology.

## Strengths & Gaps
- **Best at**: The `'mostSpace'` preferred position and width presets make Polaris tooltips extremely easy to implement correctly in responsive, space-constrained admin interfaces without manual positioning math.
- **Missing**: No rich tooltip variant or support for interactive content within the tooltip — interactive overlays require switching to the separate Popover component, and there is no warmup/cooldown system for scanning dense UIs.
