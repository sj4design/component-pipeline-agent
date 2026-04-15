---
component: Tooltip
tier: 2
last_verified: 2026-03-28
---

# Tooltip — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Tooltip | Reakit-based; 12 placement options; non-interactive by default | high |
| Salesforce Lightning | Tooltip (via helptext) | Popover-based info icon pattern; SLDS helptext utility | high |
| GitHub Primer | Tooltip | type="label"\|"description" distinction; v2 with proper ARIA; accessible by default | high |
| shadcn/ui | Tooltip | Radix UI Tooltip; TooltipProvider required; delay config; portal rendering | high |
| Playbook | Tooltip | Context help; dual React/Rails | medium |
| REI Cedar | CdrTooltip | Vue tooltip; info trigger icon; WCAG 2.1 AA | medium |
| Wise Design | Tooltip | Fee/rate explanations; financial help text | low |
| Dell Design System | Tooltip | Enterprise UI help text | low |

## Key Decision Patterns

**Label vs. description:** Primer's v2 Tooltip explicitly requires declaring whether the tooltip provides the accessible name (type="label") or supplementary description (type="description"). This determines whether it uses aria-labelledby or aria-describedby — a nuance most other systems leave to developers.

**Interactive vs. non-interactive:** Standard ARIA tooltip pattern (role="tooltip", aria-describedby) is for non-interactive supplementary content only. Interactive content (links, buttons inside tooltip) requires a Popover/Dialog pattern instead. Paste and Primer enforce this via component design.

**Provider pattern:** Radix/shadcn requires TooltipProvider at the app root to coordinate hover delays across multiple tooltips — preventing the "tooltip flash" when hovering between elements.

**Trigger requirement:** All systems require tooltips to be triggered by keyboard-accessible elements (not icon-only divs). Lightning's helptext icon provides an accessible button trigger automatically.

## A11y Consensus
- role="tooltip" on tooltip content
- aria-describedby on trigger pointing to tooltip id (for descriptions)
- aria-labelledby on trigger for label-style tooltips
- Show on focus AND hover; never show only on hover
- Never put interactive content in a tooltip; use Popover instead
- Escape key dismisses tooltip

## Recommended Use
Primer's Tooltip is the most nuanced in terms of label vs. description semantics. Radix/shadcn for React apps with coordinated hover delays via TooltipProvider. Never use tooltip for content that contains links, buttons, or requires user interaction.
