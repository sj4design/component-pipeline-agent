---
system: Shopify Polaris
component: ActionList (+ Popover for overlay behavior)
url: https://polaris-react.shopify.com/components/lists/action-list
last_verified: 2026-03-28
---

# ActionList

## Approach

Polaris deliberately does not have a "Menu" component. Instead, it has **ActionList** — a list renderer — and **Popover** — an overlay layer — that are composed together to produce dropdown menu behavior. This is not an accident or omission; it is Polaris's most important architectural statement about how UI primitives should be structured. By separating the concern of "what actions are in the list" (ActionList) from "how and where the list appears" (Popover), Polaris makes ActionList reusable in contexts that a monolithic Menu component would never accommodate: inside sheets, drawers, inline sections, or any other surface that is not a floating dropdown.

The philosophy traces to Shopify's product context. Polaris serves Shopify merchants — small business owners running online stores — who interact with the Shopify admin across mobile and desktop. Actions are contextual (bulk actions on orders, quick links on product cards) and the same set of actions needs to appear in different presentation contexts depending on screen size and user flow. A monolithic Menu component locked to popover behavior would require duplicating the action list logic for every non-popover surface. By making ActionList a pure list renderer, Shopify can render the same component inline in a mobile bottom sheet, inside a modal, or in a popover dropdown without any conditional rendering hacks.

The guidance positions ActionList for secondary or overflow actions — "the least important actions so merchants aren't distracted by secondary tasks." This framing reinforces that ActionList is not for primary navigation or core workflows; it surfaces supporting actions that exist but should not occupy permanent screen space.

## Key Decisions

1. **ActionList instead of Menu — composability over convention** (HIGH) — Every other Tier 1 design system provides a Menu or DropdownMenu component that bundles trigger, overlay, and list. Polaris deliberately unbundles these into Popover (overlay) + ActionList (list). The WHY is reuse across surfaces: Shopify's admin has dozens of contexts where the same actions need to appear — bulk action bars, resource list item menus, page header actions, card overflow menus. A monolithic Menu locked to a popover would require reimplementing the action list logic for each non-popover context. ActionList as a standalone primitive eliminates that duplication.

2. **`actionRole` prop for semantic flexibility** (HIGH) — ActionList does not hard-code an ARIA role. Instead, it accepts an `actionRole` prop (typically `"menuitem"`) that is applied to each item. The WHY is composability again: ActionList can be used both inside a Popover as a menu (where items should be `role="menuitem"`) and in an inline list context (where items might be `role="option"` or just buttons). By making the role configurable, Polaris avoids baking menu semantics into a component that is explicitly designed for non-menu use cases too.

3. **Sections for grouping, not submenus** (MEDIUM) — ActionList supports sections with optional titles but explicitly does not support submenus. The WHY is mobile-first simplicity: submenus are a desktop interaction pattern that requires hover or directional arrow input. On a mobile phone, a submenu creates a confusing nested overlay that is difficult to navigate with a thumb. Rather than building a complex submenu system that only works well on desktop, Polaris solves the "too many actions" problem through sections with titles, which work on every screen size.

4. **`destructive: true` for danger items** (HIGH) — ActionList items accept a `destructive` boolean that applies red danger styling to the item. The WHY is merchant error prevention: in a Shopify store, destructive actions like "Delete product," "Cancel order," or "Remove customer" can have significant business consequences. The red styling creates a visual checkpoint — a moment of recognition that this action is different from the others — before the merchant commits.

5. **`allowFiltering` for long lists (8+ items)** (MEDIUM) — When an ActionList grows beyond 8 items, Polaris provides an `allowFiltering` prop that adds a search input above the list. The WHY is discoverability at scale: a merchant managing a store with hundreds of tags or dozens of staff members needs to find a specific item quickly. Rather than scrolling through a long list, filtering brings the target to the top immediately. The 8-item threshold is a pragmatic heuristic — below 8, scanning is fast enough that filtering adds more friction than it removes.

6. **Icon support as a scannability tool** (MEDIUM) — ActionList items support leading icons (prefix) and trailing elements (suffix). The WHY is merchant-facing context: Polaris is used by people running businesses, not technical users who build intuitions through repeated use. Icons act as visual anchors that let merchants scan a list faster by pattern-matching on shape rather than reading every label. The icon slot is a dedicated position (not bolted onto the label) to ensure consistent alignment across all items in a list.

7. **`onActionAnyItem` for unified callback** (LOW) — ActionList accepts a single callback that fires on any item selection, rather than requiring each item to carry its own handler. The WHY is Popover integration: when ActionList is used inside a Popover, the most common behavior after item selection is to close the Popover. The `onActionAnyItem` callback makes it trivial to close the overlay without attaching a close handler to every individual item.

## Notable Props

- `sections`: Array of `{ title, items }` — sections enable grouped menus with labeled categories, the Polaris alternative to submenus.
- `actionRole`: Accepts `"menuitem"` or custom role strings — makes ARIA semantics explicit and configurable rather than hard-coded.
- `allowFiltering`: Boolean — adds inline search for lists exceeding 8 items; requires string-only content (icons are not indexed).
- `destructive` on items: Boolean — triggers red danger styling on the item label.
- `helpText` on items: Renders secondary description text below the item label, useful for explaining consequences of an action.

## A11y Highlights

- **Keyboard**: Tab moves focus to the ActionList; when `actionRole="menuitem"`, arrow keys navigate between items. Enter and Space activate the focused item. The Polaris docs recommend passing `autofocusTarget="first-node"` to the containing Popover to ensure screen readers receive correct focus on menu open.
- **Screen reader**: Items are rendered as `<button>` elements inside a `<ul>/<li>` structure. The list is described as a "group of related elements." Sections with titles create named groups that screen readers can announce as grouping landmarks.
- **ARIA**: `actionRole` prop is applied to each item element. The containing Popover sets `aria-expanded` and `aria-haspopup` on the trigger activator. No hard-coded `role="menu"` on the list — this is intentional to preserve non-menu use cases.

## Strengths & Gaps

- **Best at**: Cross-surface reusability — ActionList's decoupling from Popover means the same component works in popovers, sheets, drawers, and inline sections without modification, giving Polaris the most flexible action list primitive among Tier 1 systems.
- **Missing**: No submenu support (intentional but limiting for complex desktop-only admin interfaces), and `allowFiltering` requires string-only content, meaning icon-rich lists cannot be filtered by icon type.
