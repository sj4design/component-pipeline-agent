---
system: Evergreen (Segment/Twilio)
component: Popover
url: https://evergreen.segment.com/components/popover
last_verified: 2026-03-29
confidence: high
---

# Popover

## Approach
Evergreen's Popover is a click-triggered floating panel central to Segment's dashboard interactions: filter menus on data tables, context action menus on row items, detail preview panels for sources and destinations, and settings dropdowns in the navigation header. Because Segment's UI is data-dense and screen real estate is at a premium, the Popover enables showing contextual options and details without navigating away or opening a full SideSheet. Evergreen's Popover is built on its own positioning engine and accepts arbitrary React content, making it highly composable — teams pair it with Evergreen's `Menu` component for action lists, or with custom content for rich previews.

## Key Decisions
1. **Arbitrary content slot** (HIGH) — Unlike a tooltip (which accepts only a string), Evergreen's Popover accepts any React content, enabling rich use cases like filter forms, entity detail cards, and action menus all using the same overlay primitive.
2. **Click trigger as default** (HIGH) — In a dense data management UI, hover-triggered popovers create accidental activations and are unavailable on touch devices; click-trigger ensures intentional activation across all input modalities.
3. **`content` as a render function** (MEDIUM) — The `content` prop accepts a function that receives `{ close }`, allowing the content inside the popover (e.g., a menu item) to programmatically close the popover after an action, without needing external state management.

## Notable Props
- `content`: `React.ReactNode | ({ close }) => React.ReactNode` — popover body
- `position`: placement string (e.g., `Position.BOTTOM_LEFT`, `Position.TOP_RIGHT`)
- `isShown`: optional controlled visibility override
- `onOpen` / `onClose`: lifecycle callbacks
- `trigger`: `"click" | "hover"` — activation mode
- `shouldCloseOnExternalClick`: boolean (default true)
- `minWidth` / `minHeight`: size constraints on the popover panel

## A11y Highlights
- **Keyboard**: Trigger is a focusable element; Escape closes the popover; focus is trapped inside when content is interactive; Tab exits through interactive content.
- **Screen reader**: `aria-haspopup` on trigger; `role="dialog"` for rich content popovers; `role="menu"` when wrapping Evergreen's `Menu`.
- **ARIA**: `aria-expanded` on trigger reflects open state; `aria-controls` links trigger to popover content.

## Strengths & Gaps
- **Best at**: Composable context menus, filter panels, and detail previews in dense B2B dashboards; render-function content prop enables self-closing menu patterns.
- **Missing**: No built-in sub-menu support when nesting Menu inside Popover; limited animation configuration; no built-in nested popover management.
