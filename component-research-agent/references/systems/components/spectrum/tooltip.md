---
system: Adobe Spectrum (React Aria)
component: Tooltip / TooltipTrigger
url: https://react-spectrum.adobe.com/react-aria/Tooltip.html
last_verified: 2026-03-28
---

# Tooltip / TooltipTrigger

## Approach
Spectrum's tooltip architecture is split into two layers: React Aria (the behavior/accessibility hooks) and React Spectrum (the styled component). The key innovation is a global warmup/cooldown timer system. When a user hovers over a trigger, there is a warmup delay before the tooltip appears. But once any tooltip has been shown, subsequent tooltips on other elements appear instantly — no delay. Only after the user stops hovering for a "cooldown period" does the warmup timer reset. This solves a real usability problem: in toolbars or icon-heavy UIs (like Photoshop or Illustrator), users scanning multiple icons need instant feedback after the first discovery moment. Adobe built this because their products have dense icon toolbars where a per-tooltip delay would make scanning painfully slow.

## Key Decisions
1. **Global warmup/cooldown timer shared across all tooltips** (HIGH) — This is Spectrum's most distinctive feature. The warmup delay (default ~300ms) prevents accidental tooltip triggering during normal mouse movement. Once any tooltip is shown, the global state switches to "warm" and all other tooltips appear instantly. After inactivity, a cooldown period resets the timer. This acknowledges that tooltip discovery is a session-level behavior, not an element-level one — once users are in "reading tooltips" mode, friction should be zero.

2. **Separation of TooltipTrigger and Tooltip components** (HIGH) — TooltipTrigger is a wrapper that manages the hover/focus detection, positioning, and ARIA binding. Tooltip is the visual container. This separation means you can swap the visual tooltip entirely while keeping the same behavior logic. It also means React Aria's `useTooltipTrigger` hook can be used headless in any design system, not just Spectrum.

3. **Offset and crossOffset for precise positioning** (MEDIUM) — Beyond basic placement (top, bottom, left, right), Spectrum provides `offset` (main axis spacing) and `crossOffset` (perpendicular axis nudging). Adobe needs this because in complex application layouts, tooltips often need pixel-level positioning adjustments to avoid overlapping adjacent controls. Most design systems only offer placement and a single offset value.

4. **Focus-only trigger mode** (MEDIUM) — The `trigger` prop can be set to `"focus"` to show tooltips only on keyboard focus, not on hover. This exists because some UI patterns (like form field hints) should only appear when the user is actively interacting via keyboard, avoiding visual noise for mouse users who can see the surrounding context.

## Notable Props
- `delay`: Customizable warmup delay per trigger — useful when some tooltips are more critical and should appear faster.
- `closeDelay`: Separate delay for hiding on hover-out, preventing flickering when the mouse briefly leaves the trigger area.
- `crossOffset`: Fine-grained perpendicular offset — unique to Spectrum, reflects Adobe's need for pixel-precise layouts in professional tools.
- `isOpen` (controlled): Allows programmatic tooltip control, important for guided tours or onboarding flows.

## A11y Highlights
- **Keyboard**: Tooltip appears instantly on focus (no warmup delay for keyboard users, because keyboard focus is always intentional). Dismissed on Escape or blur.
- **Screen reader**: Trigger element gets `aria-describedby` pointing to the tooltip. Tooltip content is announced as a description of the trigger, not as a separate landmark.
- **ARIA**: `role="tooltip"` on the tooltip container. The hook-based architecture ensures ARIA attributes are always correctly wired regardless of the visual implementation.

## Strengths & Gaps
- **Best at**: The global warmup/cooldown system is the most sophisticated tooltip timing model across all major design systems — it solves the toolbar scanning problem that other systems ignore.
- **Missing**: No built-in rich tooltip or interactive tooltip variant — Spectrum strictly enforces that tooltips are non-interactive text only. If you need actions, you must use a Popover, which is a separate component with different behavior.
