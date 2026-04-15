---
system: Gestalt (Pinterest)
component: Tabs
url: https://gestalt.pinterest.systems/web/tabs
last_verified: 2026-03-28
confidence: medium
---

# Tabs

## Approach
Gestalt's Tabs component is clean and focused, designed for Pinterest's product navigation contexts. The component renders a tab strip with Pinterest's design language — bold active state, clean underline indicator. Gestalt tabs are link-based by default, supporting both in-page tab switching and multi-page navigation. This dual behavior reflects Pinterest's architecture where some tab interfaces navigate between pages (profile sections) and others switch in-page content (analytics views).

## Key Decisions
1. **href-based navigation support** (HIGH) — Gestalt Tabs supports `href` on each tab item, allowing tabs to function as navigation links rather than just in-page state switches. This is important for Pinterest's multi-page product sections where tab state is in the URL.
2. **Uncontrolled and controlled modes** (MEDIUM) — The component works in both uncontrolled (internal state, for in-page) and controlled (consumer state, for URL-based) modes, making it flexible for both use cases.
3. **bgColor for surface adaptation** (LOW) — The `bgColor` prop adapts the tab indicator and active state colors for different background surfaces, ensuring the tab remains legible on different Pinterest page backgrounds.

## Notable Props
- `tabs`: array of `{ text, href?, id }`
- `activeTabIndex` / `onChange`: controlled mode
- `size`: `"md" | "lg"`
- `bgColor`: background color for visual adaptation

## A11y Highlights
- **Keyboard**: Arrow keys for navigation between tabs; Enter activates
- **Screen reader**: `role="tablist"`, `role="tab"`; `aria-selected` on active tab
- **ARIA**: When using href, tabs act as navigation links with appropriate link semantics

## Strengths & Gaps
- **Best at**: href-based navigation; dual in-page/multi-page support
- **Missing**: No content panel management; no overflow for many tabs; limited visual variants
