---
system: Ant Design
component: Collapse (with accordion mode)
url: https://ant.design/components/collapse/
last_verified: 2026-03-28
---

# Collapse (Ant Design)

## Approach
Ant Design names this component Collapse rather than Accordion, and treats the accordion behavior as one mode of a more flexible collapsible container. This naming reflects Ant Design's philosophy that the default behavior should be multi-expand (any number of panels can be open), with single-expand "accordion mode" as an opt-in variant. The reasoning is pragmatic: in Chinese enterprise applications (Ant Design's primary audience), collapsible content sections are used heavily in forms, settings pages, and data displays where users often need multiple sections visible simultaneously. The component offers an unusually rich set of visual variants -- bordered, borderless, and ghost -- because Ant Design serves both standalone enterprise apps and embeddable widgets where the Collapse must visually integrate with diverse container backgrounds. The `items` API (replacing the deprecated `children`-based Panel approach) reflects a data-driven philosophy: you describe your accordion declaratively as an array of objects rather than composing JSX children, which simplifies dynamic content and server-driven UI patterns common in Chinese enterprise development.

## Key Decisions
1. **Multi-expand as default, accordion as opt-in mode** (HIGH) -- By default, multiple panels can be open simultaneously. Setting `accordion={true}` restricts to single-expand. WHY: Ant Design's user research in enterprise contexts showed that users frequently need to reference information across multiple sections (e.g., comparing configuration values in different form groups). Making multi-expand the default reduces friction for this common pattern, unlike systems like Spectrum that default to single-expand.

2. **Three visual variants: bordered, borderless, ghost** (HIGH) -- `bordered` (default) draws borders around the entire component and between panels. `bordered={false}` removes the outer border. `ghost` makes the background transparent and removes all borders. WHY: Ant Design components must work inside Cards, Drawers, Modals, and standalone pages. A bordered Collapse inside a bordered Card creates visual noise (double borders). Ghost mode exists specifically for embedding Collapse inside other containers where it should inherit the parent's background.

3. **Data-driven `items` API replacing JSX children** (MEDIUM) -- The new API accepts an array of item objects `{ key, label, children, extra, showArrow, collapsible }` instead of composing `<Panel>` children. WHY: Chinese enterprise apps frequently generate UI from server-side configuration. A data-driven API is easier to populate from an API response than manually mapping over data to create JSX elements. The deprecated Panel approach remains supported but is no longer recommended.

4. **`collapsible` prop with header/icon/disabled modes** (MEDIUM) -- Controls what triggers expansion: clicking the header text, clicking only the icon, or disabling expansion entirely. Can be set per-panel or globally. WHY: In dense enterprise forms, accordion headers sometimes contain interactive elements (links, tags, status badges). If the entire header triggers expansion, clicking those elements accidentally collapses the panel. Restricting the trigger to just the icon prevents this conflict.

5. **`destroyInactivePanel` for performance** (LOW) -- When true, collapsed panel DOM content is destroyed rather than hidden. WHY: In large enterprise apps with dozens of Collapse panels containing complex content (tables, charts, forms), keeping all panels in the DOM causes performance degradation. Destroying inactive panels trades re-render cost for memory savings.

## Notable Props
- `accordion`: Boolean toggle for single-expand mode. Simple and explicit.
- `ghost`: Makes background transparent and borderless for embedded use.
- `expandIconPosition` (deprecated, now `expandIconPlacement`): "start" or "end" icon placement. Shows the system's evolution.
- `size`: "large" | "middle" | "small" -- Three density options similar to Carbon.
- `collapsible`: "header" | "icon" | "disabled" -- Fine-grained trigger control unique to Ant Design.
- `items`: Array-based declarative API for panels with `key`, `label`, `children`, `extra`, `showArrow`, `forceRender`.

## A11y Highlights
- **Keyboard**: Enter/Space toggles the focused panel header. Tab navigates between panel headers.
- **Screen reader**: Panel headers use appropriate button semantics. Expanded/collapsed state communicated via `aria-expanded`.
- **ARIA**: Standard `aria-expanded` and `aria-controls` pattern. Less documented than Carbon or Spectrum's accessibility details, reflecting Ant Design's historically less emphasis on WCAG documentation (though improving in recent versions).

## Strengths & Gaps
- **Best at**: Visual flexibility (bordered/borderless/ghost) and the data-driven `items` API make it the most adaptable Collapse component for enterprise apps that need to embed collapsible sections in varied container contexts and generate UI from data.
- **Missing**: Accessibility documentation is thinner than Carbon or Spectrum. No `hidden="until-found"` browser search support. Animation customization is limited to the built-in transition with no exposed timing/easing props.
