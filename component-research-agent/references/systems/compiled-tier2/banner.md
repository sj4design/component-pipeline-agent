---
component: Banner
tier: 2
last_verified: 2026-03-31
---

# Banner — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Callout | Page-level informational callout; info/success/warning/error/new variants; dismissible option; action button slot; not a live region by default | high |
| Salesforce Lightning | Banner / Illustration Header | Full-width page-level banner for system status and announcements; info/warning/error/offline; sticky positioning at top of viewport; grouped multi-banner stacking | high |
| GitHub Primer | Banner | Full-width page-level message; info/warning/critical/success/upsell variants; dismissible; primary and secondary action slots; icon slot | high |
| shadcn/ui | Alert (page-level usage) | No dedicated Banner component; Alert used at page level with manual full-width styling; default/destructive variants only; no built-in dismiss or sticky behavior | medium |
| Playbook (PowerHome) | Banner | Page-level messaging with status-driven color; info/success/warning/error variants; text and action slot | medium |
| REI Cedar | CdrBanner | Vue-based persistent page-level banner; info/warning/error/success roles; action slot for CTAs; WCAG 2.1 AA compliance; no auto-dismiss | medium |
| Wise Design | Banner | Financial context announcements (maintenance, verification); info/warning/error; dismissible; action link support | low |
| Dell Design System | Banner | Enterprise system-level notifications; info/warning/error/success; sticky top placement; dismissible with close icon | low |

## Key Decision Patterns

**Banner vs. Alert distinction:** Primer and Lightning explicitly separate Banner (full-width, page-level, system-scope) from Alert (inline, contextual, content-flow). Paste calls its page-level component "Callout" rather than "Banner," emphasizing informational framing over urgency. shadcn/ui has no dedicated Banner — teams repurpose Alert with manual layout, which creates friction for sticky and full-width patterns. Cedar's CdrBanner blurs the line, functioning as both persistent page-level alert and contextual banner depending on configuration.

**Sticky and stacking behavior:** Lightning and Dell explicitly support sticky top-of-viewport positioning so banners remain visible during scroll — critical for system-wide maintenance notices. Primer's Banner is designed for page-level placement but leaves sticky behavior to the consumer. When multiple banners coexist (e.g., maintenance + cookie consent), Lightning supports grouped stacking with defined ordering rules. Most T2 systems leave multi-banner coordination to implementation.

**Action slots and dismissibility:** Primer is the most complete, offering both primary and secondary action button slots alongside a dismiss control. Cedar and Paste provide a single action slot. Dismissibility is opt-in across all systems that support it — no T2 system auto-dismisses banners, reflecting the expectation that page-level messages require explicit user acknowledgment.

**Severity/variant naming:** Most systems use the standard info/warning/error/success quartet. Primer adds "critical" (stronger than warning) and "upsell" (promotional). Lightning adds "offline" for network-loss scenarios. Wise keeps variants minimal, reflecting narrower financial use cases.

## A11y Consensus
- Banners present on page load should use semantic HTML without `role="alert"` — only dynamically injected banners need a live region
- Dismiss button requires `aria-label="Dismiss banner"` or equivalent; icon-only close buttons must not rely on visual recognition alone
- Severity must be communicated through icon + text label, never color alone
- Primer recommends visually-hidden text prefix ("Warning:", "Error:") before the banner message for screen readers
- Sticky banners must not trap keyboard focus or obscure interactive elements beneath them
- Action buttons inside banners should be reachable in tab order immediately after the banner text

## Recommended Use
Use Primer's Banner as the primary T2 reference for a full-featured page-level banner with action slots, dismissibility, and variant coverage. Reference Lightning for sticky positioning and multi-banner stacking patterns. Use Cedar for persistent, non-dismissible compliance or legal banners. Avoid conflating Banner with inline Alert — they serve different scopes.
