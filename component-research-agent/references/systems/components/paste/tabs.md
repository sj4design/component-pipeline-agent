---
system: Twilio Paste
component: Tabs
url: https://paste.twilio.design/components/tabs
last_verified: 2026-03-28
confidence: high
---

# Tabs

## Approach
Twilio Paste's Tabs component is built on Reakit's Tab primitive, providing full ARIA tablist/tab/tabpanel semantics and keyboard navigation. Paste supports horizontal tabs with the standard Paste token-driven styling. The component uses a controlled/uncontrolled pattern and supports custom tab content including icons. Paste's tabs are commonly used in the Twilio console for organizing configuration sections (e.g., General / Messaging / Voice settings).

## Key Decisions
1. **Reakit Tab primitive** (HIGH) — Delegates ARIA tablist/tab/tabpanel wiring and roving tabindex keyboard management to Reakit, ensuring specification-correct behavior.
2. **Fitted variant** (MEDIUM) — Tabs can be set to "fitted" width where tabs distribute evenly across the container width, useful for full-width tab bars in console settings pages.
3. **Horizontal only** (MEDIUM) — Paste intentionally only supports horizontal tabs, keeping the API simple and guiding developers away from vertical tabs which have more complex usage patterns.

## Notable Props
- `selectedId`: Controlled selected tab id
- `orientation`: "horizontal" (only supported)
- `variant`: "default" | "fitted"
- `onSelect`: Callback with tab id when selection changes

## A11y Highlights
- **Keyboard**: Arrow keys navigate between tabs (roving tabindex); Tab moves to tabpanel; Enter/Space selects focused tab
- **Screen reader**: role="tablist", role="tab", role="tabpanel"; aria-selected on active tab; aria-controls/aria-labelledby linking tabs and panels
- **ARIA**: Full ARIA tab pattern implementation via Reakit

## Strengths & Gaps
- **Best at**: Correct ARIA implementation; fitted variant for equal-width tabs; strong documentation
- **Missing**: No vertical tabs; no scrollable/overflow tab handling for many tabs
