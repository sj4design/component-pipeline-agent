---
component: bottom-nav
tier: 2
last_verified: 2026-03-31
---

# Bottom Nav — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Not available | No bottom navigation component. Paste is a web-first enterprise system for Twilio's console products — desktop sidebar and top navigation patterns dominate. | high |
| Salesforce Lightning | Global Navigation (mobile) | Lightning mobile apps use a platform-native bottom tab bar through Salesforce Mobile SDK; no web component equivalent in SLDS. Mobile navigation is handled at the app shell level, not as a composable component. | medium |
| GitHub Primer | UnderlineNav / TabNav | No bottom navigation component. Primer is desktop-web-focused. UnderlineNav and TabNav provide horizontal tab switching but are positioned inline, not fixed-bottom. GitHub's mobile app uses native iOS/Android bottom tabs. | high |
| shadcn/ui | Not available | No bottom navigation component in the default registry. shadcn/ui focuses on desktop-web patterns. Teams needing bottom nav compose from Tabs + fixed positioning, but no official recipe exists. | high |
| Playbook (eBay) | Not available | No dedicated bottom nav component. eBay's mobile app uses native platform navigation. Playbook focuses on web UI patterns for eBay's seller tools and enterprise interfaces. | medium |
| Cedar (REI) | Not available | No bottom navigation component. Cedar serves REI's e-commerce web experience which uses standard header/sidebar navigation. Mobile experience relies on responsive collapse patterns. | medium |
| Wise Design | Not available | No bottom navigation component documented publicly. Wise's mobile app uses native bottom tabs for Send/Home/Card/Recipients — handled at the native app level, not the web design system. | low |
| Dell DS | Not available | No bottom navigation component. Dell's DS is enterprise-desktop-focused for sales, support, and configuration tools. | low |

## Key Decision Patterns

**Bottom nav is overwhelmingly absent from web-focused Tier 2 systems.** Of eight systems surveyed, zero provide a dedicated bottom navigation web component. This is the strongest signal of any component category — bottom navigation is treated as a mobile-native pattern, not a web design system concern. Systems whose products have mobile apps (Salesforce, GitHub, eBay, Wise) handle bottom navigation through native iOS/Android implementations rather than cross-platform web components.

**Salesforce Lightning is the closest to having coverage**, but it exists within the Mobile SDK at the app shell level — not as a composable Lightning Web Component. The mobile tab bar configuration is declarative (defined in app setup, not in page markup), which means developers don't control individual tab rendering the way they would with a component API.

**shadcn/ui's absence is notable** because shadcn/ui is designed to be composable and copy-paste-friendly. A bottom nav recipe built from the existing Tabs primitive + fixed positioning would be a natural addition, but the community hasn't standardized one. This suggests the web/React ecosystem doesn't see bottom nav as a high-priority web pattern.

**The consistent Tier 2 pattern: mobile navigation is deferred to the platform.** Web design systems handle desktop/responsive nav (sidebar, top bar, hamburger collapse), while mobile apps implement bottom tabs natively. This creates a gap for teams building mobile-web or PWA experiences where native components aren't available.

## A11y Consensus
- Bottom navigation when implemented on web should use `role="navigation"` as the landmark wrapper
- Each destination should be a link (`<a>`) or button with clear label text — not icon-only
- Active/current destination marked with `aria-current="page"` (for page navigation) or `aria-selected="true"` (for tab-like switching)
- Badge/notification counts must be included in the accessible name of the destination (e.g., "Messages, 5 unread")
- Touch targets must be minimum 48x48dp per WCAG 2.5.5 (Target Size)
- Fixed-bottom positioning must not obscure page content — ensure scroll padding or bottom margin accommodates the bar height

## Recommended Use
No Tier 2 system provides a referenceable bottom navigation component for web. For teams building mobile-web or PWA bottom navigation, reference Material Design 3's Navigation Bar (Tier 1) as the primary specification, and Ant Design Mobile's TabBar for a practical React implementation. For native mobile apps, defer to platform conventions (iOS UITabBarController, Android NavigationBar).
