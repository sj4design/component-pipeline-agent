---
system: Ant Design
component: Breadcrumb
url: https://ant.design/components/breadcrumb/
last_verified: 2026-03-28
---

# Breadcrumb

## Approach
Ant Design's Breadcrumb component is the most feature-rich in Tier 1, consistent with Ant Design's philosophy of maximum developer flexibility. It supports custom separators, item-level dropdowns (clicking a breadcrumb item reveals a dropdown menu of sibling pages), icon prefixes on items, and full React Router integration. The dropdown-on-click behavior is particularly notable and unique: in large Chinese enterprise applications, a breadcrumb item like "Products" might legitimately link to multiple sub-categories, and offering a dropdown at that breadcrumb level lets users jump directly to a sibling without backtracking. This addresses a navigation efficiency pattern not covered by any other Tier 1 system.

Ant Design's breadcrumb also supports `routes`-based configuration (a flat array of route objects that the component renders into a trail), which is useful for applications that derive their navigation path from a router's route configuration rather than manually composing breadcrumb items. This config-driven approach is more scalable for large applications where many pages need breadcrumbs and maintaining individual compositions would be error-prone.

## Key Decisions
1. **Dropdown menus on individual breadcrumb items** (HIGH) — Each breadcrumb item can have a `menu` prop that renders a dropdown of related items on click or hover. This is the most distinctive Ant Design breadcrumb feature and addresses a real navigation pattern in complex enterprise apps: when you're at "Dashboard > Products > Electronics," clicking "Products" could usefully offer "Electronics," "Clothing," "Books" as a quick-jump shortcut. No other Tier 1 system offers this.
2. **Custom separator** (MEDIUM) — The `separator` prop accepts any React node, allowing teams to replace the default "/" with custom icons (right arrow, chevron, etc.). This is a cosmetic flexibility that addresses the diverse separator conventions across different Chinese enterprise contexts (some use ">", others use "›", others use icons). It's a low-cost feature to implement and adds meaningful flexibility.
3. **`routes` config-driven API** (MEDIUM) — Pass an array of route objects instead of composing items manually. This API mirrors how developers typically think about their application structure (as a route tree) rather than as a manually assembled list of breadcrumb items. The config approach is especially useful when breadcrumbs are generated dynamically from routing state.
4. **Icon support on items** (LOW) — Individual items accept `icon` prefixes, allowing each crumb to have an icon (e.g., a home icon on the root item). This follows the Chinese enterprise UI convention of icon-labeled navigation items and helps users quickly identify hierarchy levels in visually dense interfaces.

## Notable Props
- `separator`: Custom separator between items — accepts any React node
- `items[].menu`: Dropdown menu configuration on individual items (unique feature)
- `items[].href`: Link for the item — standard navigation
- `items[].icon`: Icon prefix for the item

## A11y Highlights
- **Keyboard**: Breadcrumb items with `href` are standard links (Tab + Enter); items with `menu` are buttons that open dropdown menus (navigable with arrow keys)
- **Screen reader**: The breadcrumb list is wrapped in `<nav aria-label="breadcrumb">`; the last item (current page) should have `aria-current="page"` (documented as consumer responsibility); dropdown menus follow the standard menu ARIA pattern (`role="menu"`, `role="menuitem"`)
- **ARIA**: `<nav>` landmark; separator elements are `aria-hidden`; dropdown menus use `role="menu"` with `role="menuitem"` children; keyboard trap behavior on open menus follows ARIA authoring practices

## Strengths & Gaps
- **Best at**: The most feature-complete breadcrumb in Tier 1 — dropdown menus on items, custom separators, config-driven API, and icon support make it the right choice for complex enterprise applications with lateral navigation needs
- **Missing**: No automatic width-based collapse/truncation — teams must implement their own truncation logic for long paths; `aria-current="page"` on the last item is not automatic and requires consumer implementation
