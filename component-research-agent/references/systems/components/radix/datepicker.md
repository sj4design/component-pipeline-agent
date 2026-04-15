---
system: Radix UI (WorkOS)
component: Date Picker (no official component — use Popover + Calendar primitives)
url: https://www.radix-ui.com/primitives/docs/components/popover
last_verified: 2026-03-28
confidence: high
---

# Date Picker (Composed via Popover + Calendar)

## Approach
Radix UI does not ship a first-party DatePicker component; instead, it provides the primitives (Popover, accessible focus management) that developers compose with a date library such as react-day-picker or date-fns to build their own. This is a deliberate architectural choice — the team believes date selection is too domain-specific (localization, calendar systems, range vs. single, fiscal calendars) to mandate a single implementation. The official documentation links to community examples that wire up Popover + a calendar grid, keeping the primitive layer thin and the consumer fully in control of data and presentation.

## Key Decisions
1. **No bundled DatePicker** (HIGH) — Radix explicitly avoids building high-level form components. This keeps the primitive library small and avoids the "escape-hatch hell" of trying to override every presentational decision in a monolithic component.
2. **Popover as the trigger layer** (HIGH) — The Popover primitive handles open/close state, focus trap, and portal rendering, which are the hard parts of a date picker flyout. Calendar grid rendering is delegated to a third-party or custom component.
3. **Compose over bundle** (MEDIUM) — By not providing a DatePicker, Radix forces consumers to understand their own date requirements. This produces better outcomes for complex date logic (fiscal quarters, multi-timezone) at the cost of a higher initial setup burden.

## Notable Props
- `Popover.Root`: `open`, `onOpenChange` — controls trigger/calendar visibility
- `Popover.Content`: `align`, `sideOffset` — positions the calendar panel relative to the input trigger
- No date-specific props exist at this layer; date state lives in consumer code

## A11y Highlights
- **Keyboard**: Popover Content traps focus when open; Escape closes and returns focus to trigger
- **Screen reader**: Trigger button should have `aria-label="Pick a date"` or equivalent; consumer is responsible for labeling the calendar grid
- **ARIA**: Popover uses `role="dialog"` on content; consumer must add `aria-label` to the dialog for screen readers

## Strengths & Gaps
- **Best at**: Giving teams complete control over date logic, calendar system, and appearance — no fighting defaults
- **Missing**: No built-in calendar grid, no date validation, no range selection out of the box — all must be added by consumer
