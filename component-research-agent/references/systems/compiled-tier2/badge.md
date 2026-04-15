---
component: Badge
tier: 2
last_verified: 2026-03-28
---

# Badge — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Badge | Semantic status variants (success/warning/error/info/new/decorative); small/large | high |
| Salesforce Lightning | Badge | Semantic color system; lightest/default/inverse variants; compact | high |
| GitHub Primer | Label | 9 variants including color-coded; size variants; no close button | high |
| shadcn/ui | Badge | CVA variants (default/secondary/destructive/outline); link-style badge; no icon | high |
| Playbook | Badge | Status indicators; notification counts; dual React/Rails | medium |
| REI Cedar | CdrChip | Multi-purpose chip; badge/tag/status use cases; WCAG 2.1 AA | medium |
| Wise Design | Badge/Tag | Currency status, transfer state indicators | low |
| Dell Design System | Badge | Enterprise status badges | low |

## Key Decision Patterns

**Semantic vs. decorative:** Paste's Badge explicitly distinguishes semantic variants (success/warning/error communicate status meaning) from decorative variants (purely visual color). Semantic badges require color-independent status communication (icon or text).

**Notification count badge:** Paste, Lightning, and Playbook support numeric count variants (unread notifications, item counts). These floating numeric badges have specific positioning patterns when attached to navigation icons.

**Color contrast:** Badges are small text, often colored — a common accessibility failure. WCAG requires 4.5:1 contrast for small text. All T2 systems claim compliance but implementations vary.

**Never color alone:** Status badges (error, warning, success) must not rely on color as the only differentiator. Include an icon or text prefix.

## A11y Consensus
- Static badges: `<span>` or appropriate inline element; no interactive role
- Numeric notification badge: aria-label on the icon button it accompanies (e.g., "Notifications, 3 unread")
- Status communication: do not rely on color alone; include text or icon
- If badge is purely decorative: aria-hidden="true"
- Minimum 4.5:1 color contrast for badge text against badge background

## Recommended Use
Use Paste Badge for semantic status communication with clear variant semantics. Use shadcn/ui Badge for simple React status labels. Primer Label for color-coded category metadata. Always include non-color status indicators for semantic badges.
