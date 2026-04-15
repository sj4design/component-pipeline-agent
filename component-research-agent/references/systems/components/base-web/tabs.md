---
system: Base Web (Uber)
component: Tabs
url: https://baseweb.design/components/tabs/
last_verified: 2026-03-28
confidence: medium
---

# Tabs

## Approach
Base Web provides two tab components: `Tabs` (accessible, WAI-ARIA tablist pattern) and `TabsMotion` (with animation). The standard Tabs follows the ARIA tablist keyboard pattern strictly. Like all Base Web components, visual customization is achieved through the Overrides system. Base Web's tab component is used across Uber's products from the consumer app to internal operational dashboards, requiring it to adapt to very different visual contexts while maintaining consistent behavior.

## Key Decisions
1. **Separate Tab vs TabsMotion** (MEDIUM) — Motion is opt-in. Most product surfaces don't need animated tab transitions, and the motion version adds complexity and a potential performance overhead. Keeping them separate allows teams to choose the right level.
2. **Overrides pattern** (HIGH) — All parts (Root, TabList, Tab, TabBorder, TabHighlight, TabPanel) are overridable. The TabHighlight (the animated underline indicator) and TabBorder (the full-width bottom line) are separate overridable elements, giving fine control over the tab indicator style.
3. **renderAll for SEO** (MEDIUM) — Like the Accordion, `renderAll` keeps all tab panel content in the DOM for SEO and print purposes.

## Notable Props
- `activeKey`: controlled active tab
- `onChange`: tab change callback
- `renderAll`: render all panels in DOM
- `overrides`: customize all sub-components including the animated highlight indicator

## A11y Highlights
- **Keyboard**: Arrow keys for tab navigation; Enter activates; Tab moves to content
- **Screen reader**: Full ARIA tablist/tab/tabpanel pattern; aria-selected, aria-controls
- **ARIA**: Standard ARIA tab pattern; panels labeled via aria-labelledby

## Strengths & Gaps
- **Best at**: Overrides for custom indicator styles; separate motion variant; renderAll for SEO
- **Missing**: No built-in overflow/scroll for many tabs; limited visual variants out-of-the-box
