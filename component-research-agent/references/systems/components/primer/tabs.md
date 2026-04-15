---
system: GitHub Primer
component: TabNav / UnderlineNav
url: https://primer.style/components/underline-nav
last_verified: 2026-03-28
confidence: high
---

# TabNav / UnderlineNav

## Approach
GitHub Primer provides two tab-like navigation patterns: UnderlineNav (the primary pattern for page-level navigation tabs, matching GitHub's iconic underline tab style seen in repository nav) and TabNav (for secondary tab navigation). UnderlineNav supports the signature GitHub underline active indicator and is used for repository tabs (Code, Issues, Pull Requests, etc.). Primer also has a Tabs component for tabpanel-based content switching distinct from link-based navigation tabs.

## Key Decisions
1. **Navigation vs content tabs distinction** (HIGH) — Primer explicitly distinguishes between link-based navigation tabs (UnderlineNav/TabNav) and ARIA tabpanel-based content tabs, preventing the common misuse of nav-style tabs for content switching.
2. **Counter badges on tabs** (HIGH) — UnderlineNav has built-in counter badge support (showing issue/PR/commit counts) — a GitHub-specific pattern essential for repository navigation tabs.
3. **Overflow menu** (HIGH) — UnderlineNav has a built-in overflow menu that collapses tabs into a "More" menu when the viewport is too narrow, handling GitHub's many-tab navigation responsively.

## Notable Props
- `aria-label`: Required on UnderlineNav container for accessible name
- `aria-current`: Set on the active NavItem to mark current page
- `counter`: Number displayed as badge on a tab item
- `sx`: Style extension prop for custom styling

## A11y Highlights
- **Keyboard**: Tab/Shift+Tab navigate between items; nav landmark wraps the tablist
- **Screen reader**: nav role with aria-label; aria-current="page" on active item
- **ARIA**: role="navigation"; aria-current on active tab; overflow button has aria-label

## Strengths & Gaps
- **Best at**: GitHub-style underline tabs; built-in overflow menu; counter badge support; correct nav vs tabpanel distinction
- **Missing**: ARIA tabpanel pattern (separate component) may require additional setup for content-switching use cases
