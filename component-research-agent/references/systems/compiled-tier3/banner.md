---
component: Banner
tier: 3
last_verified: 2026-03-31
---

# Banner — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Callout | Inline callout component; no dedicated full-width banner; consumer responsible for page-level layout and sticky behavior; icon slot via `Callout.Icon` | medium |
| Chakra UI | Alert (banner usage) | No dedicated Banner; Alert with `variant="solid"` and full-width styling used as banner pattern; info/success/warning/error status; composable with CloseButton | medium |
| GOV.UK | Notification Banner | Explicit page-level banner for important site-wide messages; `type="success"` for confirmations; auto-focuses on page load for dynamic content; cookie banner is a separate pattern entirely | high |
| Base Web (Uber) | Banner | Dedicated Banner component distinct from Notification; full-width with action slot; info/positive/warning/negative kinds; artwork (icon) slot; nested title and description | high |
| Fluent 2 (Microsoft) | MessageBar (page-level) | No dedicated Banner; MessageBar used at page level with `intent` prop; `MessageBarGroup` coordinates multiple stacked messages with animated enter/exit; multiline layout option | high |
| Gestalt (Pinterest) | BannerSlim / BannerOverlay / BannerCallout | Three-component family: BannerSlim for compact inline, BannerOverlay for floating mobile-style, BannerCallout for page-level with rich content; each has distinct action patterns and dismiss behavior | high |
| Mantine | Alert (banner pattern) | No dedicated Banner; Alert component used full-width with `withCloseButton`; color-driven severity via theme palette; `icon` prop accepts any React node; `variant` controls fill style | medium |
| Orbit (Kiwi.com) | AlertBanner | Explicit page-level banner for travel disruptions and promotions; info/success/warning/critical types; action button slot; dismissible; designed for sticky top placement | high |
| Evergreen (Segment) | Alert (page-level) | No dedicated Banner; Alert with `appearance="card"` used for page-level messaging; `intent` vocabulary shared across system; `hasIcon` toggle; no built-in sticky | medium |
| Nord (Nordhealth) | nord-banner (Banner) | Web component; healthcare page-level announcements; info/warning/danger/success variants; dismissible attribute; no auto-dismiss to prevent missed clinical messages; action slot | high |

## Key Decision Patterns

The most significant T3 pattern is the split between systems that have a dedicated Banner component and those that repurpose Alert. Base Web, GOV.UK, Gestalt, Orbit, and Nord all provide explicit Banner components, recognizing that page-level system messaging has different layout, stacking, and persistence requirements than inline contextual alerts. Radix, Chakra, Mantine, Fluent 2, and Evergreen lack a dedicated Banner, forcing teams to compose one from Alert or MessageBar with manual full-width and sticky styling. This split is the strongest signal that Banner deserves its own component rather than being an Alert variant.

Gestalt's three-component family (BannerSlim, BannerOverlay, BannerCallout) is the most granular decomposition in any tier. Pinterest separates compact inline banners, floating overlay banners (mobile toast-like position), and rich page-level banners with CTA content. This contrasts with Orbit's single AlertBanner that handles all page-level use cases through props. The Gestalt approach optimizes for clarity at the cost of more components to learn; Orbit optimizes for simplicity at the cost of prop complexity.

GOV.UK's Notification Banner is the only T3 system that auto-focuses the banner on page load when it contains dynamic success content (e.g., form submission confirmation). This is a deliberate accessibility decision for government services where users must be informed that their action succeeded. All other systems leave focus management to the consumer. GOV.UK also explicitly separates cookie banners as a distinct pattern — not a variant of Notification Banner — reflecting the regulatory complexity of consent management.

Nord's healthcare-driven persistence model mirrors its Alert approach: banners never auto-dismiss because a missed system announcement (e.g., scheduled maintenance for a clinical system) could impact patient care workflows. Orbit similarly defaults to persistence for travel disruption banners, where a dismissed flight-delay notice could cause a missed connection. Both demonstrate how domain context dictates dismiss behavior more than abstract UX principles.

## A11y Consensus

- Page-level banners present on load use `role="region"` with `aria-label` rather than `role="alert"`, to avoid assertive announcements on every page visit
- Dynamically injected banners (e.g., after form submission) use `role="alert"` for errors or `role="status"` for success/info
- GOV.UK moves focus to the banner when it appears dynamically via `tabindex="-1"` and programmatic focus, ensuring screen reader users are informed
- Dismiss buttons require explicit `aria-label` text; Gestalt and Nord both enforce this at the component API level
- Color is never the sole severity indicator; all systems pair color with an icon and/or text label
- Sticky banners must not obscure focused elements — systems recommend pushing page content down rather than overlaying it
- Multiple stacked banners should be grouped in a single landmark region to prevent landmark pollution

## Recommended Use
Reference Gestalt for the most complete banner component family when building a multi-variant system. Use GOV.UK's Notification Banner for government or compliance contexts requiring auto-focus and cookie consent separation. Use Orbit's AlertBanner for sticky, domain-critical page-level messaging. Reference Nord for healthcare or safety-critical persistence requirements. Use Base Web as a clean, minimal dedicated Banner reference.
