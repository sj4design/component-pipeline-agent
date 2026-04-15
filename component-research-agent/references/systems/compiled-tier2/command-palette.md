---
component: Command Palette
tier: 2
last_verified: 2026-03-31
---

# Command Palette — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Not available | No command palette component; Combobox covers filtered selection but not action dispatch. | high |
| Salesforce Lightning | Global Search / Command Center | Salesforce ships a platform-level "Command Center" and global search bar in Lightning Experience, but this is a platform feature, not a Lightning Design System component. SLDS documents search layouts but not command palettes. | medium |
| GitHub Primer | Command Palette (internal) / ActionList | GitHub ships a Cmd+K command palette in github.com, but it is not exposed as a Primer component. Primer's ActionList + ActionList.Group + TextInput provide the building blocks. Primer's internal implementation uses a custom component with fuzzy search, grouped results, nested subpages, and keyboard navigation. | high |
| shadcn/ui | Command (cmdk) | The most complete command palette implementation in T2. Built on cmdk library. `Command` wraps a search input + grouped results list. `CommandGroup` for categories. `CommandItem` for individual actions. `CommandShortcut` for displaying keyboard shortcuts. Often composed inside a `Dialog` for Cmd+K overlay. Fuzzy search built-in via cmdk. | high |
| Playbook | Not available | No command palette component; enterprise UI kit focused on standard form controls and layout. | medium |
| REI Cedar | Not available | No command palette; retail e-commerce scope does not include power-user keyboard workflows. | high |
| Wise Design | Not available | No command palette; financial product scope uses standard navigation patterns. | medium |
| Dell DS | Not available | No command palette; enterprise IT administration uses persistent navigation patterns. | low |

## Key Decision Patterns

**shadcn/ui Command is the T2 reference implementation.** Built on cmdk (by Rauno Freiberg/Vercel), it provides the full command palette pattern: fuzzy search, grouped results (`CommandGroup`), individual items (`CommandItem`), keyboard shortcut display (`CommandShortcut`), empty state (`CommandEmpty`), loading state (`CommandLoading`), and separator (`CommandSeparator`). The composition pattern of `Command` inside a `Dialog` creates the standard Cmd+K overlay. This is the most adopted open-source command palette primitive in the React ecosystem.

**GitHub's Cmd+K palette is the most mature product implementation but not a public component.** GitHub's command palette supports: global search across repos/issues/PRs, navigation to any page, action execution (create issue, switch theme), nested subpages (select repo then search within it), recent items, and keyboard shortcut display. Primer's public components (ActionList, TextInput, Dialog) provide building blocks but the composed command palette remains internal. GitHub's implementation is the de facto UX reference for what a command palette should do.

**Most T2 systems lack this component entirely.** Paste, Playbook, Cedar, Wise, and Dell do not offer command palettes. This reflects the component's nature: it requires deep integration with application routing, action registries, and search infrastructure. It is more of an application-level feature than a reusable UI primitive. Only shadcn/ui (via cmdk) treats it as a composable component.

**cmdk architecture: controlled search + virtual focus.** cmdk manages its own search state and filters items client-side using fuzzy matching. Keyboard navigation uses virtual focus (aria-activedescendant) rather than actual DOM focus, keeping the search input always focused. Items are rendered declaratively; cmdk handles visibility based on search match. This architecture means the consumer declares all possible items upfront and cmdk handles filtering — for server-side search, the consumer manages the items array externally.

## A11y Consensus
- role="combobox" on the search input with aria-expanded, aria-controls, aria-activedescendant
- role="listbox" on the results container; role="option" on each item (cmdk uses role="option")
- CommandGroup uses role="group" with aria-label for category names
- Keyboard: Up/Down to navigate items; Enter to execute; Escape to close overlay or go back one level (nested subpages); typing filters results
- The overlay (Dialog) traps focus and is dismissed with Escape
- Keyboard shortcut text (CommandShortcut) is decorative/visual — the actual shortcut binding is application-level, not component-level
- Screen readers announce the focused item; result count communicated via live region in cmdk

## Recommended Use

Use shadcn/ui Command (cmdk) as the primary reference for implementing command palettes in React applications — it is the only T2 system with a public, composable command palette component. Reference GitHub's Cmd+K palette for UX patterns (nested subpages, recent items, action categories) even though the implementation is not public. For non-React stacks, cmdk's architecture (controlled search input + declarative items + fuzzy filtering + virtual focus) is the pattern to replicate. Most T2 systems confirm that command palettes are application-level features requiring integration with routing and action registries — plan for this integration layer above the UI component.
