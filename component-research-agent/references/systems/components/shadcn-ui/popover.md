---
system: shadcn/ui
component: Popover
url: https://ui.shadcn.com/docs/components/popover
last_verified: 2026-03-28
confidence: high
---

# Popover

## Approach
shadcn/ui's Popover is built on Radix UI's Popover primitive, used extensively as the foundation for the DatePicker and Combobox recipes. The component provides an anchored floating panel with portal rendering, outside-click dismiss, Escape key close, and automatic positioning. It serves as a versatile container for interactive overlay content.

## Key Decisions
1. **Radix Popover primitive** (HIGH) — Radix handles focus management, outside-click dismiss, Escape key, and positioning for the popover, ensuring correct overlay behavior.
2. **Foundation for DatePicker/Combobox** (HIGH) — Popover is the recommended overlay container for DatePicker (Calendar + Popover) and Combobox (Command + Popover) recipes, demonstrating the composable pattern.
3. **PopoverAnchor for custom anchoring** (MEDIUM) — PopoverAnchor component allows decoupling the anchor position from the trigger element, enabling popovers positioned relative to non-trigger elements.

## Notable Props
- `open` / `defaultOpen`: Controlled/uncontrolled state
- `onOpenChange`: Open state callback
- `PopoverTrigger[asChild]`: Renders trigger as child element
- `PopoverContent[side]`: Preferred placement side
- `PopoverContent[align]`: Alignment relative to trigger

## A11y Highlights
- **Keyboard**: Enter/Space on trigger opens; Tab within content; Escape closes and returns focus to trigger
- **Screen reader**: role="dialog" or no role if non-modal content; trigger has aria-expanded; outside click dismisses
- **ARIA**: Radix manages aria-expanded on trigger; focus management; aria-controls

## Strengths & Gaps
- **Best at**: Foundation for Date Picker and Combobox; PopoverAnchor for custom positioning; Radix focus management
- **Missing**: No built-in arrow/nubbin; no header/footer structure; purely a container
