---
component: avatar-group
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** No dedicated AvatarGroup component
**Approach:** M3 has no Avatar component at all, let alone an AvatarGroup. Applications needing stacked avatar displays must build custom layouts using Row/HorizontalArrangement with negative offsets and M3 shape/color tokens. There is no guidance on overlap amount, overflow indicators, or group accessibility patterns in the M3 specification.
**Key Decisions:**
- [HIGH] Absent by design: M3 does not formalize avatar or avatar grouping — teams must implement stacking, overlap, and overflow entirely from scratch
- [MED] No overflow pattern: "+N" badges, expandable popovers, and max-count behaviors are not addressed in any M3 guidance
- [MED] Border/ring between avatars requires manual implementation using `outline` or `surface` tokens for contrast separation
**Notable API:** None. Custom layout with negative margins/offsets and M3 shape tokens.
**A11y:** No guidance. Teams must implement group labeling (`role="group"` with `aria-label`) and ensure overflow count is announced to screen readers.
**Best at:** Nothing avatar-group-specific — entirely absent from M3.
**Missing:** The entire AvatarGroup concept: stacking, overlap, overflow indicator, max count, expand/collapse, and group-level accessibility.

---

## spectrum
**Component:** AvatarGroup
**Approach:** Spectrum provides a dedicated AvatarGroup component for displaying collections of user avatars in a horizontal stack. Avatars overlap with a consistent negative margin, and the group supports a `maxVisibleAvatars` prop to control how many are shown before an overflow indicator appears. The overflow indicator shows "+N" and can trigger a popover listing hidden users. Spectrum's AvatarGroup enforces size consistency across all child avatars.
**Key Decisions:**
- [HIGH] Dedicated component with overflow management: `maxVisibleAvatars` controls the cutoff point; excess avatars collapse into a "+N" indicator — prevents unbounded horizontal growth
- [HIGH] Size enforcement: all avatars within the group inherit a single size, preventing visual inconsistency in collaborative displays
- [MED] RTL-aware stacking: overlap direction reverses in RTL locales, maintaining the visual metaphor of "most recent on top"
**Notable API:** `maxVisibleAvatars: number`; enforced child size consistency; overflow indicator with popover
**A11y:** Group container uses `role="group"` with `aria-label` describing the collection (e.g., "Team members"). Overflow indicator announces the count of hidden members. Individual avatars retain their own accessible names.
**Best at:** Clean overflow management with popover expansion and enforced size consistency across the group.
**Missing:** Presence indicators on individual avatars within the group; interactive add/invite button pattern.

---

## carbon
**Component:** No dedicated AvatarGroup component
**Approach:** Carbon has no Avatar component and consequently no AvatarGroup. IBM product teams needing grouped user displays typically use text-based participant lists or icon-based indicators rather than overlapping avatar stacks. The enterprise infrastructure context of Carbon products (cloud dashboards, DevOps tools) rarely requires visual user grouping patterns common in collaboration software.
**Key Decisions:**
- [HIGH] Absent: Carbon's enterprise context emphasizes data density and system status over social/collaborative user representation — grouped avatars are not a common pattern
- [MED] Text-based alternative: participant lists in IBM products use names/email addresses rather than visual avatar stacks
- [MED] No overlap/stacking guidance: teams needing this pattern must build entirely custom solutions without Carbon primitives
**Notable API:** None. No Avatar or AvatarGroup components exist in Carbon.
**A11y:** No Carbon-specific guidance for grouped avatar accessibility. Teams must implement standard group patterns independently.
**Best at:** Nothing avatar-group-specific — the pattern is outside Carbon's scope.
**Missing:** The entire AvatarGroup concept. Carbon's gap here extends from its lack of a base Avatar component.

---

## polaris
**Component:** No dedicated AvatarGroup component
**Approach:** Polaris provides a solid Avatar component with fallback chain and merchant/customer context, but does not offer an AvatarGroup wrapper for stacked/overlapping displays. Shopify Admin interfaces that show multiple users (e.g., staff members on an order) typically list avatars in a ResourceList or inline with text rather than as an overlapping stack. Teams needing overlap-style grouping must compose it manually using Avatar components with custom CSS negative margins.
**Key Decisions:**
- [HIGH] No grouping component: Polaris treats multi-user display as a list layout concern rather than an avatar-specific concern — avatars appear in ResourceList items or inline badges
- [MED] Manual composition required: overlapping stacks need custom negative margins and z-index management outside Polaris's component API
- [MED] No overflow pattern: "+N" indicators for truncated user lists must be built from scratch
**Notable API:** Individual `Avatar` with `size`, `customer`, `name`, `source` — but no group wrapper.
**A11y:** Individual avatar accessibility is handled by the Avatar component. Group-level labeling and overflow announcement must be implemented by the consumer.
**Best at:** Individual avatar quality (fallback chain, context awareness) that would compose well into a group — but the group wrapper is absent.
**Missing:** AvatarGroup component with overlap, maxCount, overflow indicator, and group-level accessibility.

---

## atlassian
**Component:** AvatarGroup
**Approach:** Atlassian provides the most mature AvatarGroup in Tier 1, purpose-built for Jira sprint member lists, Confluence page collaborators, and Trello card members. The component manages overflow via `maxCount` (shows "+N" badge for hidden avatars), displays a tooltip on hover for each avatar, and provides an expandable dropdown listing all members when the overflow badge is clicked. Avatars stack with left-to-right overlap and a white border ring for contrast separation.
**Key Decisions:**
- [HIGH] `maxCount` overflow with dropdown: clicking the "+N" badge opens a dropdown listing all hidden members with their names and avatars — essential for Jira boards where sprint teams frequently exceed visible space
- [HIGH] White border ring between avatars: 2px white outline on each avatar creates clear visual separation in the overlap zone — prevents avatars from blending into each other
- [MED] Tooltip on hover: each avatar in the group shows the user's name on hover, providing identification without clicking
- [MED] `onMoreClick` callback: programmatic access to the overflow action for custom expand behaviors beyond the default dropdown
**Notable API:** `maxCount: number`; `size: "small" | "medium" | "large"`; `appearance: "grid" | "stack"`; `onMoreClick`; `borderColor` for ring customization
**A11y:** Group uses `role="group"` with `aria-label`. Overflow badge announces "N more" to screen readers. Each avatar in the dropdown is keyboard-navigable. Tooltip content is accessible via `aria-describedby`.
**Best at:** Production-proven overflow management with dropdown expansion, validated across Jira, Confluence, and Trello — the most battle-tested AvatarGroup in Tier 1.
**Missing:** Add/invite button pattern ("+", like Pinterest's AvatarGroup); presence indicators within the group context; responsive maxCount that adjusts based on container width.

---

## ant-design
**Component:** Avatar.Group
**Approach:** Ant Design's Avatar.Group wraps multiple Avatar components in an overlapping horizontal stack with configurable `maxCount`. Overflow avatars are represented by a "+N" badge that can trigger a popover on hover or click via `maxPopoverTrigger`. The group enforces a consistent `size` across all children. Customization of the overflow badge appearance is available through `maxStyle` (inline styles for the "+N" element) and `maxPopoverPlacement` for popover positioning.
**Key Decisions:**
- [HIGH] `maxCount` + popover overflow: excess avatars collapse into a "+N" badge; hovering or clicking reveals a popover listing all hidden avatars — provides both quick-glance count and full-detail expansion
- [HIGH] `maxPopoverTrigger: "hover" | "click"`: configurable trigger for the overflow popover — hover for quick peek in dense UIs, click for intentional expansion on touch devices
- [MED] `maxStyle` customization: inline style object for the "+N" badge allows color/background overrides to match brand or semantic context (e.g., red "+N" for alerts)
- [MED] Responsive size object: `size` accepts `{xs, sm, md, lg, xl, xxl}` breakpoint values, scaling the entire group responsively
**Notable API:** `maxCount: number`; `maxStyle: CSSProperties`; `maxPopoverPlacement`; `maxPopoverTrigger: "hover" | "click"`; `size: number | "large" | "small" | "default" | {xs,...}`
**A11y:** Overflow popover should announce hidden count to screen readers, but Ant's documentation does not explicitly guarantee accessible labeling on the "+N" element. Individual avatars use `alt` prop for image accessibility. Group-level `aria-label` is not automatically applied — consumers should add it.
**Best at:** Popover trigger flexibility (hover vs. click) and responsive size breakpoints for the entire group — the most configurable overflow behavior in Tier 1.
**Missing:** Border ring between avatars (must be styled via CSS); presence indicators; add/invite button pattern; automatic group-level `aria-label`.
