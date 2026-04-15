---
component: Divider
tier: 2
last_verified: 2026-03-28
---

# Divider — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Separator | Semantic separator; horizontal/vertical; decorative prop; Reakit-based | high |
| Salesforce Lightning | Divider (utility) | CSS utility classes (slds-has-divider); no dedicated component | high |
| GitHub Primer | Divider (via Box) | No dedicated component; Box border utilities or `<hr>` | high |
| shadcn/ui | Separator | Radix UI Separator; role="separator"\|role="none"; horizontal/vertical | high |
| Playbook | Separator / Divider | Content section separation; dual React/Rails | medium |
| REI Cedar | Divider (not present) | Not present; spacing utilities and whitespace for separation | medium |
| Wise Design | Divider | Transaction list and section separation | low |
| Dell Design System | Divider | Enterprise configuration section separation | low |

## Key Decision Patterns

**Semantic vs. decorative:** The critical decision for any divider is whether it has semantic meaning (separating distinct content regions — use role="separator") or is purely visual (decorative border — use role="none" / aria-hidden). shadcn/ui (Radix) and Paste both expose this choice explicitly via a `decorative` prop.

**Component vs. utility:** Lightning uses CSS utility classes for dividers rather than a dedicated component. Primer uses Box border props. This approach is more flexible but lacks component-level documentation and discoverability.

**Vertical dividers:** Both Paste Separator and shadcn/ui Separator support vertical orientation — useful for separating inline items (breadcrumb items, toolbar buttons). Vertical dividers require explicit height in flex/grid layouts.

**Over-use concern:** Dividers are often overused — whitespace and typography hierarchy are often more appropriate for section separation. Design systems that don't provide a dedicated component (Cedar) may be intentionally discouraging divider overuse.

## A11y Consensus
- Semantic divider (separates distinct content regions): role="separator"; not aria-hidden
- Decorative divider (purely visual spacing): role="none" or aria-hidden="true"
- Vertical separator: aria-orientation="vertical"
- Native `<hr>` has implicit role="separator"; add aria-hidden if decorative

## Recommended Use
Use shadcn/ui Separator (Radix) for React apps with correct semantic/decorative distinction. Use Paste Separator for Twilio Console patterns. Use `<hr>` directly for simple semantic separators. Consider whether whitespace alone can replace dividers before adding them.
