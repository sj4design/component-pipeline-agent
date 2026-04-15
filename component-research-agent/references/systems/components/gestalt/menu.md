---
system: Gestalt (Pinterest)
component: Dropdown (action menu)
url: https://gestalt.pinterest.systems/web/dropdown
last_verified: 2026-03-28
confidence: medium
---

# Dropdown (Menu)

## Approach
Gestalt's Dropdown component serves as the action menu for Pinterest's UIs — board options menus, pin action menus, user account menus. It supports standard items, links, external links, and section dividers. The Dropdown is specifically named to reflect its primary use as a contextual action menu (not navigation) in Pinterest's visual-first interface.

## Key Decisions
1. **Dropdown.Section for grouping** (HIGH) — Sections group related actions with an optional label. Pinterest's action menus group actions semantically (Edit actions, Share actions, Manage actions).
2. **Link support within items** (MEDIUM) — Items can be navigation links (href) or action triggers (onClick). Dropdown handles both without separate components.
3. **isExternal for external links** (LOW) — Marks external links, which is good accessibility practice.

## Notable Props
- `anchor`: trigger element
- `open` / `onDismiss`: controlled state
- `Dropdown.Item`: `option`, `onSelect`
- `Dropdown.Link`: `option`, `href`, `isExternal`
- `Dropdown.Section`: `label`, children

## A11y Highlights
- **Keyboard**: Arrow keys navigate; Enter activates; Escape closes
- **Screen reader**: role="menu"; role="menuitem" per item; section labels via aria-label
- **ARIA**: Full menu ARIA pattern

## Strengths & Gaps
- **Best at**: Link items for navigation menus; section grouping; Pinterest action patterns
- **Missing**: No checkbox/radio item variants; no sub-menu support
