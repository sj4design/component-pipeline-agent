---
component: Tabs
tier: 2
last_verified: 2026-03-28
---

# Tabs — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Tabs | Reakit-based; horizontal/vertical/inverse variants; fitted tabs option | high |
| Salesforce Lightning | Tabs | Scoped (default) and default variants; overflow dropdown for many tabs | high |
| GitHub Primer | TabNav / UnderlineNav | TabNav for routing tabs; UnderlineNav for nav with counters; URL-driven | high |
| shadcn/ui | Tabs | Radix UI Tabs; keyboard-managed tablist; controlled/uncontrolled | high |
| Playbook | Tabs | Section navigation; dual React/Rails support | medium |
| REI Cedar | CdrTabs | Vue tabs; full-width/compact sizes; WCAG 2.1 AA | medium |
| Wise Design | Tabs | Section switching in account/transfer views | low |
| Dell Design System | Tabs | Enterprise dashboard section navigation | low |

## Key Decision Patterns

**Navigation vs. content switching:** Primer explicitly provides TabNav for router-integrated tab navigation (changes URL) vs. Tabs for in-page content panel switching. Lightning's Scoped Tabs are visual/content-only. shadcn/ui Tabs are content-switching only — URL integration requires custom handling.

**Overflow handling:** Lightning's overflow dropdown automatically handles too many tabs in limited space. Other systems require custom handling or horizontal scroll.

**Activation model:** ARIA tabs pattern offers automatic activation (arrow key moves and activates) or manual activation (arrow moves focus, Enter/Space activates). Most T2 systems use automatic activation.

**Counter/badge in tabs:** Primer's UnderlineNav supports count badges in tabs (e.g., "Pull Requests 12"). Lightning supports notification badges. Paste and shadcn/ui do not have built-in badge support in tabs.

## A11y Consensus
- role="tablist" on container; role="tab" on each tab; role="tabpanel" on each panel
- Selected tab: aria-selected="true"; inactive: aria-selected="false"
- aria-controls on tab pointing to panel id; aria-labelledby on panel pointing to tab id
- Arrow keys navigate between tabs; Tab moves to active panel content; Home/End to first/last tab
- Active panel visible; inactive panels hidden (hidden attribute or display:none)

## Recommended Use
Use Primer TabNav for URL-integrated navigation tabs. Use Radix/shadcn Tabs or Paste Tabs for in-page content switching. Lightning Tabs for Salesforce page organization with potential overflow needs.
