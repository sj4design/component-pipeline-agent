---
system: Twilio Paste
component: Popover
url: https://paste.twilio.design/components/popover
last_verified: 2026-03-28
confidence: high
---

# Popover

## Approach
Twilio Paste's Popover is a non-modal overlay for interactive supplementary content — unlike Tooltip (non-interactive, hover-triggered), Popover is for content requiring interaction (links, buttons, forms). Built on Reakit's Popover primitive with focus management. Used in the Twilio console for contextual editing panels, help content with actions, and contextual info with links.

## Key Decisions
1. **Interactive content container** (HIGH) — Popover explicitly handles the use case Tooltip cannot: content with clickable links, form fields, or buttons, with proper focus management into and out of the popover.
2. **Focus trap** (HIGH) — When opened, focus moves into the popover and is managed there; Escape returns focus to trigger, following the disclosure/dialog focus management patterns.
3. **PopoverButton trigger** (HIGH) — Uses a specific PopoverButton component (not any arbitrary element as trigger) to ensure proper ARIA haspopup/expanded wiring and keyboard activation.

## Notable Props
- `state`: usePopoverState hook result for controlled management
- `PopoverButton`: Required trigger component
- `placement`: Popover position (top, bottom, left, right + auto variants)
- `badgeVariant`: For badge-trigger popovers

## A11y Highlights
- **Keyboard**: Enter/Space on trigger opens; focus moves into popover; Tab navigates within; Escape closes and returns focus
- **Screen reader**: role="dialog" on popover content; aria-haspopup="dialog" on trigger; aria-expanded; aria-labelledby if heading present
- **ARIA**: role="dialog"; aria-haspopup="dialog"; aria-expanded on trigger; focus management

## Strengths & Gaps
- **Best at**: Interactive content in overlay; correct focus management; clear tooltip vs popover distinction
- **Missing**: No popover arrow/nubbin visual; limited to non-modal interaction (no focus trap as strong as Modal)
