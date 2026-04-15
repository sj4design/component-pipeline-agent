---
system: Salesforce Lightning Design System
component: Tooltip
url: https://lightningdesignsystem.com/components/tooltips/
last_verified: 2026-03-28
confidence: high
---

# Tooltip

## Approach
Salesforce Lightning's Tooltip provides contextual help for UI elements, commonly used on icon buttons, form field labels, and truncated text throughout CRM. Lightning tooltips have a distinctive nubbin (pointer arrow) that indicates the trigger element. The system provides a Tooltip variant specifically for icon buttons (where tooltips double as accessible names for icon-only actions), which is a notable pattern.

## Key Decisions
1. **Icon button label pattern** (HIGH) — Lightning's pattern of using tooltip text as both the accessible name (aria-label) and visual label for icon-only buttons solves the icon button accessibility problem: the tooltip IS the label.
2. **Nubbin directional indicator** (MEDIUM) — CSS-based nubbin (arrow pointer) is positioned based on tooltip placement, giving a clear visual connection between tooltip and trigger.
3. **Help text tooltip variant** (MEDIUM) — Tooltip variant specifically for "?" help icons next to form labels, providing field-level help text in a standard, recognized pattern throughout Salesforce forms.

## Notable Props
- `content`: Tooltip text content
- `align`: Tooltip alignment relative to trigger
- `variant`: Tooltip visual variant including "learnmore" for help contexts
- `triggerClassName`: Controls the trigger wrapper styling

## A11y Highlights
- **Keyboard**: Tooltip shows on trigger focus; Escape dismisses
- **Screen reader**: role="tooltip"; aria-describedby on trigger; when used as icon label, content serves as aria-label
- **ARIA**: role="tooltip"; aria-describedby; icon button pattern uses tooltip text as aria-label

## Strengths & Gaps
- **Best at**: Icon button label/tooltip dual pattern; help text tooltip variant; nubbin visual design
- **Missing**: No rich content tooltips; limited delay/animation customization
