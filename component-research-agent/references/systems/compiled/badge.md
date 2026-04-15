---
component: badge
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Badge — All Systems Digest

## Material Design 3
**Approach**: No standalone Badge component — badges exist exclusively on NavigationBar and NavigationDrawer items. Two variants: dot (presence indicator, no count) and number (count with 99+ overflow). Color uses `error` token. Scope is intentionally constrained to navigation destination alerting.
**Key decisions**:
- Navigation-scoped only; prevents badge misuse as decoration — when you place a badge it must mean "new activity at this destination," not arbitrary annotation
- Dot vs. number variants; vague indicator reduces count-anxiety vs. specific numbers per UX research — dot communicates "check this" without quantifying urgency
- `error` color token; badges are attention alerts — using error role means they adapt across light/dark and dynamic color schemes automatically
**Notable API**: `count` (0=dot, positive=number badge); 99+ hardcoded overflow; no `position` prop (hardcoded to top-end of nav icon)
**A11y**: Count announced as part of parent NavigationBar item label ("Inbox, 5 notifications"); no standalone ARIA role; count integrated into parent's aria-label.
**Best at**: Semantically constrained navigation badge with minimal configuration. **Missing**: No standalone Badge component for buttons, avatars, or arbitrary UI elements.

## Spectrum (Adobe)
**Approach**: No native notification count Badge component. Spectrum's documented Badge is a text label with semantic fill color (functionally a Tag/status indicator). Teams needing notification counts compose a custom overlay using color tokens + pill shape. Gap acknowledged in GitHub issues.
**Key decisions**:
- Label-style Badge (not count Badge); Adobe's products need rich status labeling (Lightroom, Analytics dashboards) more than notification counts — desktop-first tools don't have the mobile nav-badge pattern as a primary need
- Semantic fill variants (positive/negative/notice/informative/neutral) wherever badge-like components exist; ensures status meanings stay consistent across Adobe's entire product family and adapt to dark mode
- No anchor/positioning system; if you need a floating indicator, CSS positioning is the assumption — no built-in top-right corner anchoring
**Notable API**: StatusLight `variant` (positive|negative|notice|informative) as the closest native equivalent; no notification count Badge props
**A11y**: No standardized ARIA pattern for notification count; workarounds require manually adding count to parent button's aria-label.
**Best at**: Status labeling via Tag and StatusLight components for the enterprise-app use case. **Missing**: No native count badge with positioning, overflow handling, or SR count announcement.

## Carbon (IBM)
**Approach**: Calls the component "Tag" — categorization/filtering labels, not notification badges. Read-only + dismissible (filter variant) + operational (clickable) types. Fixed semantic color set (descriptive color names, not abstract statuses). Three sizes (sm/md/lg). Notification-count badge handled per-context, not as a standalone component.
**Key decisions**:
- "Tag" naming over "Badge"; IBM research found users think about tags as classifiers ("item belongs to X"), not alerts — "Badge" would suggest notification semantics that don't fit most Carbon use cases
- Dismissible filter variant; IBM enterprise UIs need user-removable filter chips — close button gets its own focus and keyboard interaction separate from the tag label
- Descriptive color names (red/blue/green) not abstract statuses; gives teams flexibility to assign contextual meaning rather than enforcing one fixed vocabulary across all IBM products
**Notable API**: `type` (descriptive color: red|blue|green|etc.); `filter` (adds dismiss button); `size` (sm|md|lg); operational tag variant for click actions
**A11y**: Read-only = `<span>`; interactive/filter = `<button>` with aria-label="Clear filter [tag name]"; no live region for count changes.
**Best at**: Categorization labels and filter chips in dense enterprise tables with strong size flexibility. **Missing**: No notification-count badge with anchor positioning, no dot mode, no 99+ overflow.

## Polaris (Shopify)
**Approach**: Status indicator purpose-built for e-commerce — order status (Paid/Pending/Refunded), product availability (Active/Draft), fulfillment states. Semantic tone system (success/info/attention/warning/critical/new/magic). `progress` prop (incomplete/partiallyComplete/complete) renders partial-fill icon for workflow state — unique among Tier 1.
**Key decisions**:
- Semantic tone system enforced; in merchant admin, color must carry consistent meaning across every screen — arbitrary colors break the ability to scan status quickly across hundreds of orders
- `progress` prop for partial fulfillment; Shopify's fulfillment workflow needs partially-complete states — partial-fill circle icon lets merchants understand state without reading text
- No numeric count; Shopify admin handles notification counts through activity feed/sidebar — Badge's job is status labeling only
**Notable API**: `tone` (success|info|attention|warning|critical|new|magic|read-only); `progress` (incomplete|partiallyComplete|complete); `size` (sm|default)
**A11y**: Renders as `<span>`; progress icon includes visually hidden text equivalent ("Partially complete"); no role="status" or live region.
**Best at**: E-commerce status communication with semantic tones and unique progress state indicator. **Missing**: No notification count, no dot mode, no anchor positioning.

## Atlassian
**Approach**: Two separate components — Badge (numeric counts) and Lozenge (status labels). Badge has configurable `max` prop (not hardcoded 99+) for high-count enterprise contexts. Lozenge `appearance` maps to Jira workflow states (inprogress/moved/new/removed/success). Lozenge `isBold` for visual weight control.
**Key decisions**:
- Badge/Lozenge split; Jira needs "47 unresolved issues" on a project card (Badge) AND "In Progress" on an issue row (Lozenge) — completely different visual and semantic requirements; one component for both would create API bloat
- Configurable `max` prop (vs. hardcoded 99+); Jira projects can have 500+ open issues and teams want "499+" not "99+" to convey actual scale — flexible threshold is essential
- Lozenge appearances named after Jira workflow states; enforces that status labels match the product's conceptual model rather than generic success/error semantics
**Notable API**: Badge `max` (configurable overflow threshold, default 99); Lozenge `appearance` (default|inprogress|moved|new|removed|success); Lozenge `isBold`
**A11y**: Both render as `<span>`; count announced as number; parent element must include count in aria-label ("Notifications, 5 new"); no live region behavior.
**Best at**: Badge/Lozenge architectural split — cleanest separation of concerns; configurable max overflow. **Missing**: No built-in CSS anchor/positioning for overlaying Badge on other components.

## Ant Design
**Approach**: Most feature-complete — count, dot (presence), and Ribbon (corner ribbon) in one component. Child-wrapping anchor model automatically positions count at top-right corner. `overflowCount` configurable (default 99). `showZero` shows badge when count=0. `offset` for position fine-tuning. `count` accepts ReactNode for custom content.
**Key decisions**:
- Child-wrapping anchor model; eliminates custom CSS positioning for the common case (badge on icon/avatar) — ergonomic but requires Badge as a wrapper which can conflict with some component APIs
- `dot` mode first-class; enterprise dashboards have many contexts where count would be premature or anxiety-inducing — dot communicates "check this" without quantifying
- `showZero` prevents disappearance confusion; some applications need to show "0 unread" to confirm nothing to action — hiding badge at 0 could be confused with a loading state
**Notable API**: `count` (number|ReactNode); `dot`; `overflowCount` (default 99); `showZero`; `offset` ([x,y]); `color`; `Badge.Ribbon` sub-component
**A11y**: No built-in ARIA roles; count in DOM but no guaranteed SR announcement without parent aria-label updates; a11y burden left entirely to implementing team.
**Best at**: Most complete badge implementation — count/dot/ribbon, wrapping anchor, configurable overflow, showZero, custom content. **Missing**: No semantic status mapping (colors decorative not meaningful); full a11y responsibility on implementing team.
