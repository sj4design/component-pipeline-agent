---
component: avatar
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** No dedicated Avatar component
**Approach:** M3 has no Avatar in its component spec. Applications use slot-based composition: an image, icon, or initials text placed within a circular container styled with M3 surface and shape tokens. Profile-like avatars in M3 use `primaryContainer` and `onPrimaryContainer` color roles for initials-based displays.
**Key Decisions:**
- [HIGH] Absent by design: M3's component philosophy only formalizes components with complex interaction; a static avatar is treated as an image or icon with shape/color tokens applied
- [MED] `primaryContainer` / `onPrimaryContainer` for initials: semantic color roles that auto-adapt to light/dark mode without hardcoded colors
- [MED] Slot composition: `FilledIconButton` or `CircleAvatar` in Flutter; web uses CSS + `<img>` or `<span>` within a circular container with shape tokens
**Notable API:** Shape token `shape.corner.full` for circular form; `primaryContainer` color token for initials background
**A11y:** Relies on standard `<img alt="">` or `role="img" aria-label` on the wrapping element. No built-in a11y wiring.
**Best at:** Consistent circular imaging using M3 shape tokens when integrated manually with the token system.
**Missing:** Fallback behavior (image → initials → icon), grouping (AvatarGroup), presence indicators, and size system — all absent from M3.

---

## spectrum
**Component:** No official Avatar component (image handling only via limited utilities)
**Approach:** Spectrum does not include a dedicated Avatar component. Image display relies on standard HTML `<img>` with Spectrum styling. The `alt` attribute enforcement is a strong norm in Spectrum's accessibility guidelines. Adobe's products (Experience Manager, Marketo) build avatar-like displays at the product layer.
**Key Decisions:**
- [HIGH] Absent: Adobe's product teams implement avatars with custom code; no standardization at the Spectrum layer
- [MED] `alt` required: Spectrum's accessibility philosophy enforces non-empty `alt` on all images — avatars require meaningful alt text or `alt=""` with an adjacent visible name
- [MED] No fallback chain: without a component, image fallback to initials or icon requires custom JavaScript error handling
**Notable API:** No Avatar component. Standard `<img>` with Spectrum's image token system.
**A11y:** No component-specific a11y. Teams must implement `alt`, `role="img"`, and `aria-label` for non-`<img>` avatar containers.
**Best at:** Nothing avatar-specific — Spectrum's gap here means teams build custom.
**Missing:** Entire Avatar component: initials fallback, icon fallback, size scale, grouping, and presence indicators.

---

## carbon
**Component:** No dedicated Avatar component
**Approach:** Carbon has no Avatar component. The closest built-in is the Icon component for placeholder states. Community discussions have proposed an Avatar but none has been merged into the core library. In practice, IBM product teams use the `<img>` element with CSS to create circular displays, or use Carbon's `User` icon as a fallback.
**Key Decisions:**
- [HIGH] Absent: IBM's enterprise context often deals with system users rather than human users; avatar-centric UI patterns are less common in infrastructure dashboards
- [MED] Icon workaround: Carbon's `UserAvatar` icon (from `@carbon/icons`) serves as a placeholder in user contexts, but it is not a component with size/fallback behavior
- [MED] No grouping: no AvatarGroup; collaborative UI patterns in IBM products use text-based user lists rather than avatar stacks
**Notable API:** No Avatar component. `UserAvatar` icon from `@carbon/icons-react` for placeholder; custom CSS for image-based avatars.
**A11y:** Teams implement `alt` or `aria-label` on custom avatar containers. No Carbon guidance specific to avatars.
**Best at:** Nothing avatar-specific — the `UserAvatar` icon provides a semantic placeholder for user list items.
**Missing:** A full Avatar component with fallback chain, size system, and grouping — an acknowledged community gap.

---

## polaris
**Component:** Avatar
**Approach:** Polaris provides a complete Avatar with dual context awareness: `customer` vs. `merchant` source props, a three-level fallback chain (image → initials from `name` prop → default icon), and name-hash-based color assignment for initials backgrounds. Five sizes cover the full range from notification thumbnails to page headers.
**Key Decisions:**
- [HIGH] Dual context (customer vs. merchant): different default icon and color palette depending on whether the avatar represents the merchant (shop owner) or their customer — reflects Shopify Admin's two-actor model
- [HIGH] Three-level fallback: `source` image → initials from `name` → default icon — all automatic, no consumer error handling needed
- [MED] Name-hash color: initials background color is deterministically assigned from the name string, so the same person always gets the same color across page loads
**Notable API:** `size: "xs" | "sm" | "md" | "lg" | "xl"`; `customer: boolean`; `name` for initials extraction and hash color; `source` for image URL
**A11y:** If `name` is provided, it becomes the accessible label for the avatar. Image uses `alt` from `name`. When `source` fails to load, the fallback renders with the same accessible name.
**Best at:** Merchant/customer context awareness and the automatic three-level fallback chain — no error handling boilerplate required from consumers.
**Missing:** Presence indicators (online/busy/offline) and AvatarGroup for overlapping avatar stacks.

---

## atlassian
**Component:** Avatar / AvatarGroup (most complete Tier 1 implementation)
**Approach:** Atlassian provides the most feature-rich Avatar in Tier 1: `Avatar` for individual display and `AvatarGroup` as a first-class component (not a simple wrapper). Presence indicators (`online`, `busy`, `focus`, `offline`) are built-in via the `presence` prop. Six sizes from xxsmall to xlarge cover all Jira and Confluence use cases. `onClick` enables profile navigation.
**Key Decisions:**
- [HIGH] AvatarGroup as first-class component: manages overflow (shows N+ badge for hidden avatars), tooltip on hover for truncated members, and onClick access to all members — designed for Jira's sprint member lists and Confluence page collaborator displays
- [HIGH] Presence indicator: `presence` prop renders a colored dot badge on the avatar — used in Confluence/Jira for real-time user status (online/offline/busy)
- [MED] `onClick` for profile navigation: avatar is an interactive element linking to user profile in Atlassian products; accessibility requires treating it as a button or link
**Notable API:** `presence: "online" | "busy" | "focus" | "offline"`; `size: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge"`; `AvatarGroup` with `maxCount` and `renderItem`
**A11y:** Avatar with `onClick` renders as a `<button>`; static avatars render as `<span>` with `role="img"` and `aria-label` from the `name` prop. Presence indicator badge has visually hidden text announcing the status.
**Best at:** AvatarGroup with overflow management and presence indicators — the most complete avatar system in Tier 1, validated across Jira, Confluence, and Trello.
**Missing:** No initials-fallback color from name hash (Polaris feature); avatar shape variants (square for organization avatars).

---

## ant-design
**Component:** Avatar / Avatar.Group
**Approach:** Ant Design's Avatar supports three content types — `src` (image), `icon` (an Ant icon component), and `children` (arbitrary content including initials text). Circle and square shapes via `shape` prop. Auto text scaling reduces font size when initials text exceeds available width. `Avatar.Group` handles stacked overlap with `maxCount` overflow badge.
**Key Decisions:**
- [HIGH] Three content types unified in one component: src/icon/children covers image, icon placeholder, and initials without needing fallback logic in the component — consumer provides content for each state explicitly
- [MED] Auto text scaling: long initials (e.g., "WW") auto-scale down to fit the circular area — prevents text overflow without truncation
- [MED] `Avatar.Group` with `maxStyle` / `maxPopoverPlacement`: overflow avatars shown as +N badge; popover on hover/click shows all hidden avatars
**Notable API:** `shape: "circle" | "square"`; `size: number | "large" | "small" | "default"` or responsive `{xs, sm, md, lg, xl, xxl}`; `Avatar.Group` with `maxCount` and `maxPopoverTrigger`
**A11y:** Image avatar uses `alt` from `alt` prop. Non-image avatars (icon/children) lack built-in `aria-label` — consumer must add accessible names manually. Avatar.Group overflow badge should have accessible text for screen readers but Ant's documentation does not specify whether this is provided.
**Best at:** Responsive size breakpoints (size object with xs/sm/md breakpoints) and the unified content type model (src/icon/children without component-level fallback logic).
**Missing:** Presence indicators and automatic fallback chain (consumer must manually handle image error → show icon/initials alternative).
