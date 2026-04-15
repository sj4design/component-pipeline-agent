---
component: EmptyState
tier: 2
last_verified: 2026-03-28
---

# EmptyState — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | EmptyState | Illustration/icon + heading + body + CTA; horizontal/vertical layouts | high |
| Salesforce Lightning | IllustrationLibrary / EmptyState | Einstein character illustrations; Salesforce-branded empty state illustrations | high |
| GitHub Primer | Blankslate | Primer-named empty state; visual/icon + heading + description + action | high |
| shadcn/ui | EmptyState (not present) | Not dedicated; compose with Typography + Button + SVG | high |
| Playbook | EmptyState | No results and first-use states; dual React/Rails | medium |
| REI Cedar | CdrEmptyState (not present) | Not present; use Typography + Button composition | medium |
| Wise Design | EmptyState | Empty account, no transactions states | low |
| Dell Design System | EmptyState | Empty data tables, no results states | low |

## Key Decision Patterns

**Named Blankslate (Primer):** GitHub uses the branded name "Blankslate" for its empty state component — a deliberate product terminology choice that reflects GitHub's voice. Functionally identical to EmptyState.

**Illustration approach:** Lightning uses Salesforce's Einstein character illustration library for empty states — brand-specific illustrated characters for different empty state types. Paste uses generic illustrations or icons. Primer uses simple icons. The illustration approach significantly impacts brand feeling.

**CTA placement:** All systems support a primary action button in empty states. Some support secondary actions. The action should guide users toward filling the empty state (e.g., "Create your first project").

**shadcn/ui gap:** No dedicated EmptyState in shadcn/ui. This is a real gap — teams must compose custom empty states from Text, Button, and SVG/Image components without a documented pattern.

## A11y Highlights
- No specific ARIA role — empty states are informational content sections
- Heading provides landmark structure; ensure empty state has an accessible heading
- CTA button should be keyboard accessible and clearly labeled
- Illustrations should have appropriate alt text or aria-hidden if decorative

## Recommended Use
Use Paste EmptyState for Twilio Console empty states with flexible layout options. Use Primer Blankslate for GitHub-style empty states. Use Lightning's illustration library for Salesforce-branded empty state experience. Compose custom empty states in shadcn/ui contexts from Text + Button.
