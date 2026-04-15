---
component: tooltip
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Tooltip — All Systems Digest

## Material Design 3
**Approach**: Two separate components — Plain Tooltip (text-only, hover/focus, max 200dp) and Rich Tooltip (title + description + actions, max 320dp, persistent option). Architectural split prevents accidentally making hover-only tooltips with interactive content (violates role="tooltip").
**Key decisions**:
- Plain vs. Rich as separate components; prevents developers from putting buttons inside a hover-only surface
- Auto-dismiss after 1500ms; tooltips should contain brief info — longer content belongs in a different pattern
- `caretEnabled` per-instance; proximity is enough in dense UIs, caret helps in sparse layouts
**Notable API**: `caretEnabled`; `isPersistent` (Rich only, stays visible until dismissed); max-width enforced (200dp/320dp)
**A11y**: Plain uses aria-labelledby when providing label, aria-describedby when supplemental; role="tooltip"; focus never enters plain tooltip; Escape dismisses.
**Best at**: Enforcing non-interactive vs. interactive content split architecturally. **Missing**: No global warmup/cooldown delay system for rapid hover scanning.

## Spectrum (Adobe)
**Approach**: Global warmup/cooldown timer — first tooltip has ~300ms delay, subsequent tooltips on other elements appear instantly ("warm" state), resets after inactivity cooldown. Split between TooltipTrigger (behavior/positioning/ARIA) and Tooltip (visual container).
**Key decisions**:
- Global warmup/cooldown shared across all tooltips; solves toolbar scanning problem — once in "reading tooltips" mode, friction = zero
- `trigger="focus"` mode shows only on keyboard focus; useful when hover would create visual noise for mouse users
- `offset` + `crossOffset` for pixel-precise positioning in complex Adobe tool layouts
**Notable API**: `delay` (per-trigger warmup); `closeDelay` (prevents flicker on hover-out); `crossOffset` (perpendicular nudge, unique to Spectrum); `isOpen` (controlled)
**A11y**: Keyboard focus shows tooltip instantly (no warmup; focus is always intentional); aria-describedby on trigger; role="tooltip"; focus never enters tooltip.
**Best at**: Global warmup/cooldown — most sophisticated tooltip timing model; solves dense icon toolbar scanning. **Missing**: No rich/interactive tooltip; interactive content requires separate Popover.

## Carbon (IBM)
**Approach**: Three components — Tooltip (hover/focus, non-interactive text), Toggletip (click/Enter, interactive content allowed, disclosure pattern), Definition Tooltip (inline term definitions with dotted underline). Most a11y-rigorous split — structurally impossible to create common violations.
**Key decisions**:
- Three-component split makes interaction contract explicit; API prevents putting buttons inside hover-only Tooltip
- Icons cannot trigger tooltips; must wrap in IconButton to ensure the trigger is focusable (prevents unreachable icon triggers)
- Toggletip uses WAI-ARIA disclosure pattern (not tooltip role); interactive content stays visible while user tabs through it
**Notable API**: `label` vs. `description` (maps to aria-labelledby vs. aria-describedby at API level); `align` (single positioning prop with start/end variants); `defaultOpen` on Toggletip
**A11y**: Toggletip uses disclosure pattern (no role="tooltip" since it contains interactive content); Tooltip role="tooltip"; icon-trigger enforcement prevents unfocusable triggers.
**Best at**: Most accessibility-rigorous tooltip system — structurally impossible to create most common violations. **Missing**: No warmup/cooldown delay; each tooltip operates independently.

## Polaris (Shopify)
**Approach**: Single Tooltip component with behavioral toggles — `persistOnClick` for touch/tablet users, `hoverDelay` for dense tables, `preferredPosition="mostSpace"` for space-constrained admin layouts. Strictly non-interactive.
**Key decisions**:
- `preferredPosition="mostSpace"` auto-places on side with most space; handles Shopify's varied sidebar/modal layouts without dev math
- `persistOnClick` bridges hover/touch gap for tablet merchants; no separate mobile implementation needed
- Width presets (default/wide only); limits options to ensure ecosystem-wide visual consistency across thousands of Shopify apps
**Notable API**: `preferredPosition` (above|below|mostSpace|cover); `persistOnClick`; `hoverDelay`; `dismissOnMouseOut`; `accessibilityLabel` (concise SR text separate from visual content)
**A11y**: aria-describedby on trigger; accessibilityLabel provides optimized SR text separate from verbose visual tooltip; Escape dismisses; shows on focus.
**Best at**: mostSpace positioning and width presets for space-constrained responsive admin. **Missing**: No rich/interactive variant; no warmup/cooldown system.

## Atlassian
**Approach**: `position="mouse"` is the unique differentiator — tooltip follows cursor position for large trigger elements (Jira Kanban cards, table rows, code blocks) where element-anchored placement appears distant from user's gaze. `position="auto"` is the intelligent default.
**Key decisions**:
- Mouse-following mode unique among all systems; solves large-target problem in dense productivity UIs
- Auto position is the default; no hardcoded positions needed for Jira's variable sidebar/split-view viewports
- No text truncation policy; truncated supplemental text defeats the purpose of providing context
**Notable API**: `position` (auto|top|right|bottom|left|mouse); `mousePosition` (sub-position for cursor-relative placement); `component` (custom container for per-product theming); `truncate` (discouraged)
**A11y**: Mouse mode doesn't apply to keyboard; keyboard users always get element-anchored placement; aria-describedby; role="tooltip"; focus stays on trigger.
**Best at**: Mouse-following mode for large trigger elements in productivity UIs — unique solution not found in other systems. **Missing**: No interactive tooltip variant; no warmup/cooldown.

## Ant Design
**Approach**: Three-tier inheritance — Tooltip (text base) → Popover (extends with title+content) → Popconfirm (extends with confirm/cancel actions). All three share the positioning/trigger API. 12 placement positions. Hover-only by default — focus trigger requires explicit opt-in (a11y gap).
**Key decisions**:
- Three-tier inheritance; Popconfirm is first-class (not a hack); Alibaba's confirmation workflows are pervasive in Chinese enterprise
- Hover-only by default; `trigger={['hover', 'focus']}` required for keyboard access — significant a11y failure out of the box
- `destroyTooltipOnHide` removes DOM nodes on hide; critical performance optimization for dashboards with hundreds of tooltip-bearing rows
**Notable API**: `trigger` (hover|focus|click|contextMenu, arrays supported); `destroyTooltipOnHide`; `color` (preset palette for semantic color coding); `arrow.pointAtCenter`; `zIndex`
**A11y**: Not keyboard-accessible by default; must explicitly add focus to trigger prop; role="tooltip" when enabled; aria-describedby wired when accessibility configured.
**Best at**: Tooltip/Popover/Popconfirm inheritance gives complete overlay system with consistent API. **Missing**: Hover-only default is a significant accessibility failure — keyboard users excluded unless dev explicitly opts in.
