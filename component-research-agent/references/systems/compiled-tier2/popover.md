---
component: Popover
tier: 2
last_verified: 2026-03-28
---

# Popover — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Popover | Interactive overlay; focus trap; close button required; Reakit-based | high |
| Salesforce Lightning | Popover | Variant-based (error/warning/info/feature-walkthrough); header; close button | high |
| GitHub Primer | Overlay / AnchoredOverlay | AnchoredOverlay is the generic positioned overlay; Dialog for modals | high |
| shadcn/ui | Popover | Radix UI Popover; portal rendering; side/align positioning; no focus trap by default | high |
| Playbook | Popover | Contextual information overlays; dual React/Rails | medium |
| REI Cedar | CdrPopover | Vue popover; positioned overlay; WCAG 2.1 AA | medium |
| Wise Design | Popover | Fee/rate detail popovers; financial context | low |
| Dell Design System | Popover | Enterprise contextual information overlays | low |

## Key Decision Patterns

**Popover vs. Tooltip:** Tooltip: non-interactive, shows on hover/focus, role="tooltip". Popover: interactive (can contain buttons/links/forms), triggered by click, role="dialog" or no role. This is the critical distinction — never use tooltip for interactive content.

**Focus trap:** Paste's Popover traps focus (it requires a close button). Radix/shadcn Popover does not trap focus by default — it uses the Popover pattern (not Dialog), so focus can leave the popover. Whether to trap focus depends on the content; interactive popovers with forms should trap focus.

**Positioning:** All systems support top/right/bottom/left placement with alignment options (start/center/end). Radix Popover uses Floating UI under the hood for smart positioning/collision avoidance.

**Lightning's feature walkthrough:** Lightning Popover has a unique "feature walkthrough" variant for onboarding/feature introduction overlays — a popover with a "new feature" badge, used for progressive feature discovery in Salesforce.

## A11y Consensus
- Trigger: button with aria-expanded; aria-haspopup="dialog" (or "true")
- Popover container: role="dialog" (for interactive content); aria-labelledby if it has a heading
- Close button within popover: allows keyboard users to exit without pressing Escape only
- Escape key: closes popover and returns focus to trigger
- Focus management: return focus to trigger on close

## Recommended Use
Use Radix/shadcn Popover for positioned interactive overlays in React. Use Paste Popover for Twilio Console patterns with enforced close button. Use Lightning Popover for Salesforce feature walkthrough patterns. Distinguish from Tooltip — use Popover for interactive content.
