---
system: shadcn/ui
component: Tabs
url: https://ui.shadcn.com/docs/components/tabs
last_verified: 2026-03-28
confidence: high
---

# Tabs

## Approach
shadcn/ui's Tabs component is built on Radix UI's Tabs primitive, providing full ARIA tablist/tab/tabpanel compliance with roving tabindex keyboard navigation. The component uses Tailwind CSS for styling with data-state attributes driving active/inactive visual states. The compound component API (Tabs, TabsList, TabsTrigger, TabsContent) gives full structural control.

## Key Decisions
1. **Radix UI Tabs primitive** (HIGH) — Full ARIA tab pattern from Radix including roving tabindex, keyboard navigation, and activation mode (automatic vs manual).
2. **activationMode prop** (HIGH) — Radix Tabs supports "automatic" (tab activated on focus) and "manual" (tab activated on Enter/Space) modes, addressing the ARIA authoring guide's two valid approaches to tab activation.
3. **Flexible styling via Tailwind data attributes** (MEDIUM) — data-state="active"|"inactive" on TabsTrigger drives Tailwind variant styling, making active tab styling straightforward and customizable.

## Notable Props
- `defaultValue` / `value`: Uncontrolled/controlled selected tab
- `onValueChange`: Callback for tab selection
- `activationMode`: "automatic" | "manual" — controls keyboard activation behavior
- `orientation`: "horizontal" | "vertical" — for vertical tab layouts

## A11y Highlights
- **Keyboard**: Arrow keys navigate tabs (roving tabindex); automatic or manual activation per activationMode; Tab to enter tabpanel
- **Screen reader**: Full ARIA tablist pattern; aria-selected on active tab; aria-controls/aria-labelledby linking tabs and panels
- **ARIA**: Radix auto-wires role="tablist", role="tab", role="tabpanel", aria-selected, aria-controls, aria-labelledby

## Strengths & Gaps
- **Best at**: Vertical tabs support; activation mode control (automatic vs manual); full ARIA via Radix
- **Missing**: No overflow menu for many tabs; no counter badges; visual variants limited to developer customization
