---
component: Link
tier: 2
last_verified: 2026-03-28
---

# Link — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Anchor | Named "Anchor" (not Link); semantic `<a>`; external link indicator; safe external links | high |
| Salesforce Lightning | Link (not dedicated) | Uses `<a>` directly; lightning-formatted-url for record links | high |
| GitHub Primer | Link | `<a>` basis; Link component with muted/secondary variant; as prop for router | high |
| shadcn/ui | Link (not dedicated) | No dedicated Link; use native `<a>` or router Link with buttonVariants for styled links | high |
| Playbook | Link | Navigation links; dual React/Rails | medium |
| REI Cedar | CdrLink | Vue link; prominent/standalone variants; icon support; WCAG 2.1 AA | medium |
| Wise Design | Link | Navigation and action links | low |
| Dell Design System | Link | Enterprise navigation links | low |

## Key Decision Patterns

**Paste's "Anchor" naming:** Paste deliberately names this component "Anchor" to align with the HTML `<a>` element semantics, avoiding the overloaded "Link" terminology that conflates navigation links with router link components.

**External link safety:** Paste Anchor automatically adds rel="noopener noreferrer" for external links and an external link icon with visually hidden "opens in new tab" text — addressing the security and UX best practices for target="_blank" links.

**Router integration:** Primer's Link supports an `as` prop for rendering as a router Link (React Router, Next.js). This is a common need — styled link component that uses client-side navigation.

**Inline vs. standalone:** Cedar provides CdrLink variants for inline links (within body text) and standalone links (block-level link with optional icon). These serve different visual and UX purposes.

## A11y Consensus
- Use `<a href>` for navigation; use `<button>` for actions (never use `<a>` without href)
- External links (target="_blank"): add rel="noopener noreferrer"; add visually hidden "opens in new tab" text or icon with aria-label
- Link text must be descriptive in isolation — avoid "click here" or "read more"
- Visited state: should be visually distinguishable (CSS :visited)
- Underline links in body text (WCAG 1.4.1); icon-only links need aria-label

## Recommended Use
Use Paste Anchor for external link safety handling. Use Primer Link with as prop for router-integrated navigation. Use Cedar CdrLink for inline vs. standalone link variants. Always use `<a>` for navigation, `<button>` for actions.
