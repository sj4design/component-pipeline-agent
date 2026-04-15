---
system: Material Design 3
component: Not available natively
url: https://m3.material.io/components
last_verified: 2026-03-28
---

# Popover

## Approach

Material Design 3 does not offer a dedicated Popover component. This is a deliberate architectural gap, not an oversight. M3's philosophy organizes overlays into two distinct categories: purely informational ephemeral overlays (Tooltips) and structured action surfaces (Menus, Dialogs). Because Tooltip is non-interactive and Menu is for navigation/selection, there is no native home for the "rich, interactive, anchored overlay" pattern that other systems call a Popover. The M3 team's stance appears to be that if content is informational, use a Tooltip; if it requires user action or complex content, it belongs in a Dialog or bottom sheet. The absence forces implementers to choose between these primitives and adapt them rather than reaching for a ready-made Popover abstraction.

The recommended workaround is to compose a Dialog or Menu with custom positioning logic anchored to the triggering element. For mobile contexts, a Modal Bottom Sheet can serve the same role. For richer anchored overlays on desktop, teams implementing M3 typically reach for MUI's Popover (which wraps Modal) as a practical layer above the spec. The original Material Components Web repository was archived in early 2025, making the MUI ecosystem the de facto implementation path for M3 on the web.

## Key Decisions

1. **No Popover primitive** (HIGH) — M3 deliberately declines to provide a catch-all rich-content overlay. The philosophy is that if content needs to float and be interactive, it should be structured as a Dialog. This forces a clearer information hierarchy decision: designers cannot lazily reach for a Popover and must declare whether their content is truly ephemeral (Tooltip) or worthy of Dialog-level attention.

2. **Tooltip covers the lightweight end** (MEDIUM) — M3 Tooltip is strictly non-interactive, plain text only, and dismisses on pointer-away. This is a harder line than most systems draw. It means any content with a link, button, or structured layout cannot use Tooltip — driving those cases toward Dialog/Menu workarounds.

3. **Menu as partial workaround** (MEDIUM) — For action-list-style popovers (e.g., context menus, dropdown panels with action items), M3's Menu component fills the role adequately. It is anchor-aware, dismisses on selection or outside tap, and supports submenus. The gap is specifically for informational rich content (help text, preview cards) that doesn't fit the action-list mental model.

4. **Bottom Sheet for mobile parity** (LOW) — M3 recommends Modal Bottom Sheet on small screens as the mobile analogue for temporary overlays. This creates a responsive design pattern: anchored popover on desktop becomes bottom sheet on mobile, which is a reasonable separation but requires teams to build both.

## Notable Props

- No native Popover component; no props to document.
- MUI workaround uses `anchorEl`, `anchorOrigin`, and `transformOrigin` to replicate popover positioning.

## A11y Highlights

- **Keyboard**: No native spec. Dialog (used as workaround) traps focus and supports Escape to close.
- **Screen reader**: Dialog role provides modal semantics. Menu uses `role="menu"` with `role="menuitem"` children.
- **ARIA**: Workaround implementations must manually assign `aria-haspopup` and `aria-expanded` on the trigger, and manage `aria-controls` linkage.

## Strengths & Gaps

- **Best at**: Forcing architectural clarity — if you need a popover, you must consciously decide whether it is truly a Dialog or a Menu, which often results in a better UX decision.
- **Missing**: A native rich-content anchored overlay component, leaving teams to build their own with inconsistent positioning, focus management, and dismiss behavior.
