---
system: Shopify Polaris
component: Tabs
url: https://polaris-react.shopify.com/components/navigation/tabs
last_verified: 2026-03-28
---

# Tabs

## Approach
Polaris tabs are purpose-built for Shopify's merchant admin interface, where tabs serve a very specific role: filtering and organizing views of commerce data (orders, products, customers). Unlike most design systems that treat tabs as generic navigation, Polaris embeds commerce-specific features directly into the tab component -- badges for item counts, actions on individual tabs, the ability to create new views, and a disclosure overflow pattern. This opinionated approach exists because Shopify observed that merchants constantly need to see counts alongside labels ("Draft (12)", "Active (847)"), rename their custom views, duplicate tabs, and manage overflow when they have many saved views. Rather than asking developers to compose these behaviors from primitives, Polaris bakes them in because every Shopify admin surface needs the same patterns. The trade-off is that Polaris tabs are tightly coupled to Shopify's use cases and would feel over-engineered in a generic content-switching context.

## Key Decisions
1. **Built-in badge support on tabs** (HIGH) — Each tab descriptor accepts a `badge` prop that renders a Polaris Badge component next to the label. Shopify added this because nearly every tab in the admin represents a filtered list, and merchants need to see count information at a glance without selecting each tab. This is a feature most systems leave to composition, but Polaris standardized it because inconsistent badge placement across Shopify's admin surfaces was causing visual chaos.

2. **Fitted mode for equal-width distribution** (MEDIUM) — The `fitted` prop makes tabs divide the container width equally, similar to M3's Fixed mode. Polaris includes this because some admin layouts (like a two-tab settings page) look unbalanced when one tab label is much shorter than the other. Fitted mode forces visual symmetry. However, it is only recommended for 2-3 tabs -- beyond that, equal widths compress labels unreadably.

3. **Disclosure overflow with "More views" pattern** (HIGH) — When tabs exceed the available width, Polaris collapses overflow items behind a "More views" disclosure button (rendered as horizontal dots by default, customizable via `disclosureText`). This differs from scrollable tabs (M3, Carbon) or full collapse (Spectrum). Shopify chose this because merchants create many custom saved views, and hiding them behind scroll arrows makes discovery difficult. The disclosure popover provides a scannable list with the ability to search, rename, or delete views -- it is not just overflow but a view management interface.

4. **Tab-level actions and view creation** (MEDIUM) — Individual tabs can have actions (rename, duplicate, delete) accessible through a context menu, and the component supports an `onCreateNewView` callback for adding new tabs. This exists because Shopify's "saved views" pattern requires merchants to manage their tab list as user-generated content, not just static navigation.

## Notable Props
- `fitted`: Boolean that forces equal-width tab distribution -- a visual choice that signals "these are peer-level options" rather than a navigational hierarchy.
- `disclosureText`: Replaces the default "..." overflow trigger with custom text, allowing localization or context-specific labels like "More filters".
- `canCreateNewView`: Boolean that enables a "Create new view" option in the tab management flow, turning tabs into a dynamic, user-managed navigation system.
- `onCreateNewView`: Callback invoked when a merchant saves a new view, connecting the tab component to Shopify's saved view persistence layer.

## A11y Highlights
- **Keyboard**: Standard arrow key navigation between tabs. Tab key moves into panel content. Disclosure popover is keyboard-accessible with Enter to open and arrow keys to navigate items.
- **Screen reader**: Tab labels include badge content in the accessible name (e.g., "Draft, 12 items"). Selected state announced via `aria-selected`. Disclosure trigger announces the number of hidden tabs.
- **ARIA**: Uses `role="tablist"` and `role="tab"` with `aria-selected`. The disclosure popover uses `role="menu"` for the action items, distinguishing between navigation (tabs) and management (actions).

## Strengths & Gaps
- **Best at**: Commerce-specific tab patterns where tabs represent user-created, filterable views with counts, actions, and dynamic creation -- no other system handles this use case as a first-class feature.
- **Missing**: No vertical orientation, no contained/filled variant, and no icon support on tabs -- Polaris tabs are text-and-badge only, which limits use outside of Shopify's specific admin context.
