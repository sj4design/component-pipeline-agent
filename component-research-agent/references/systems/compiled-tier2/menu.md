---
component: Menu
tier: 2
last_verified: 2026-03-28
---

# Menu — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Menu | Reakit-based; triggered menu; dividers; danger item variant | high |
| Salesforce Lightning | Context Menu / Action Menu | Scoped (button-triggered) and global; icon button triggers; row actions | high |
| GitHub Primer | ActionMenu | Popover-based; SingleSelect/MultiSelect/Group variants; async item loading | high |
| shadcn/ui | DropdownMenu | Radix UI DropdownMenu; sub-menus; separator; radio group; checkbox items | high |
| Playbook | Menu | Navigation and context menus; dual React/Rails | medium |
| REI Cedar | CdrMenu (not present) | Not present; use ActionBar pattern | medium |
| Wise Design | Menu | Navigation and action menus | low |
| Dell Design System | Menu | Enterprise context and navigation menus | low |

## Key Decision Patterns

**Menu vs. ActionMenu vs. DropdownMenu:** All refer to a triggered overlay list of actions. Primer calls it ActionMenu; shadcn/ui calls it DropdownMenu; Paste calls it Menu. The underlying ARIA pattern is the same: role="menu" with role="menuitem" children.

**Menu vs. Select:** Menu items trigger actions; Select items set a value. Do not use role="menu" for value selection — use role="listbox". This is a common misuse. shadcn/ui and Primer make this explicit in their documentation.

**Sub-menus:** shadcn/ui DropdownMenuSub provides nested sub-menus. Lightning's menus support nested context menus. Paste's Menu can be composed with nested triggers but is not built-in.

**Checkbox/Radio items:** shadcn/ui uniquely provides DropdownMenuCheckboxItem and DropdownMenuRadioItem for menus that serve as multi-select or single-select filter panels. Primer ActionMenu also supports these via SingleSelect/MultiSelect modes.

## A11y Consensus
- role="menu" on the menu container; role="menuitem" on action items
- Trigger button: aria-haspopup="menu"; aria-expanded
- Keyboard: Enter/Space opens; arrow keys navigate; Enter/Space activates item; Escape closes; Tab closes and moves past menu
- Disabled items: aria-disabled="true" (keep in DOM/focusable but non-activatable, per ARIA menu pattern)
- Grouped items: role="group" with aria-label or role="separator" between groups

## Recommended Use
Use Radix/shadcn DropdownMenu for feature-rich menus with sub-menus and item variants. Use Primer ActionMenu for GitHub-style action menus with selection modes. Use Paste Menu for Twilio Console action menus. Never use role="menu" for navigation — use nav elements.
