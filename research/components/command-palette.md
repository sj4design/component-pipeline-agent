# Command Palette — Research
**Date:** 2026-04-17 | **Mode:** Max | **Systems:** 24 | **Scope:** All patterns

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | Navigation model assumes persistent visible surfaces, not keyboard-invoked overlays | SearchBar + SearchView (content search only, not command dispatch) |
| Spectrum (Adobe) | Strict component taxonomy separates search (SearchField) from action execution (ActionMenu) | Compose ComboBox + ActionMenu; application-layer responsibility |
| Carbon (IBM) | Enterprise UIShell assumes persistent left-nav + header; search is content-scoped | Search + Modal composition as starting point |
| Polaris (Shopify) | Product-specific in Shopify Admin, tightly coupled to routing and action registry | Compose Combobox + Modal + ActionList |
| Atlassian | Platform integration required; Jira's Cmd+K connects to Atlassian search platform | Compose Select + Popup + TextField |
| Ant Design | Component taxonomy separates data entry from navigation; no action-dispatch bridge | AutoComplete + Modal; community uses cmdk |
| Twilio Paste | Combobox covers filtered selection but not action dispatch | — |
| Salesforce Lightning | Platform-level "Command Center" exists but not a SLDS component | SLDS documents search layouts only |
| GitHub Primer | Cmd+K palette exists in github.com but NOT exposed as a Primer component | ActionList + TextInput + Dialog (building blocks) |
| Playbook | Enterprise UI kit focused on standard form controls and layout | — |
| REI Cedar | Retail e-commerce scope; power-user keyboard workflows out of scope | — |
| Wise Design | Financial product uses standard navigation patterns | — |
| Dell DS | Enterprise IT uses persistent navigation patterns | — |
| Radix UI | No primitive; teams compose Dialog + cmdk (which uses Radix Dialog internally) | Dialog + cmdk |
| Chakra UI | No command palette; teams use cmdk or kbar with Chakra Modal | — |
| GOV.UK | Conflicts with progressive enhancement principle; requires JavaScript; ambiguity of execution is a risk | — |
| Base Web | Focuses on form controls and data display | — |
| Fluent 2 | CommandBar = toolbar (NOT a palette); product-level palettes (VS Code) are the industry standard | — |
| Gestalt | Consumer product uses visual browsing, not keyboard command dispatch | — |
| Orbit | Travel booking scope; keyboard-driven power-user patterns out of scope | — |
| Evergreen | Data infrastructure admin uses standard navigation patterns | — |
| Nord | Healthcare safety: ambiguous command execution risks selecting wrong medication/procedure | — |

**Systems WITH component:** shadcn/ui (Command/cmdk), Mantine (Spotlight) — 2 of 24

---

## How Systems Solve It

### shadcn/ui — "The composable cmdk standard: fuzzy search + grouped results + Cmd+K overlay"

shadcn/ui's Command component is built on the cmdk library by Rauno Freiberg (Vercel), and it represents the only complete, publicly-available design-system-level command palette primitive in any tier. The architecture treats the command palette as a composable set of primitives: `Command` wraps the search input and results container; `CommandGroup` creates labeled sections; `CommandItem` is a selectable action; `CommandShortcut` displays keyboard shortcut badges; `CommandEmpty` handles zero results; `CommandLoading` shows a loading state; `CommandSeparator` creates visual dividers between groups.

The standard composition pattern is `Command` inside a `Dialog` — the Dialog provides the overlay, focus trap, portal rendering, and keyboard dismiss (Escape), while Command provides the search-filter-navigate-execute logic. This separation of overlay concerns (Dialog) from command-dispatch concerns (Command) is architecturally clean and reusable. The Cmd+K trigger binds a keyboard event to `dialog.open()`, opening the overlay over whatever content is visible.

cmdk's core technical innovation is virtual focus: the search input stays focused at all times, and keyboard navigation highlights items via `aria-activedescendant` rather than moving DOM focus to each item. This means typing always immediately filters results regardless of which item is highlighted. Item filtering uses fuzzy string matching by default; for server-side search, the consumer manages the items array externally while cmdk handles keyboard navigation and selection.

**Design Decisions:**
- **Composable primitives over monolithic component** → Why: different products need different subsets (some want loading states, some want sections, some want empty states) → Impact: HIGH → Para tu caso: assemble only the pieces your use case needs
- **Virtual focus (aria-activedescendant) keeps input always focused** → Why: eliminates the disorienting "tab away from search" problem; every keystroke immediately filters → Impact: HIGH → Para tu caso: mandatory for command palettes; never use actual DOM focus movement
- **Dialog overlay for Cmd+K** → Why: Dialog already owns focus trap, portal rendering, and Escape dismiss — no need to re-implement these behaviors in Command → Impact: MED → Para tu caso: use your existing Modal/Dialog for the overlay layer
- **Client-side fuzzy filter with server-side escape hatch** → Why: real-time filtering with zero round-trips for local action lists; server search for content-heavy results → Impact: MED → Para tu caso: define whether your actions are static (client filter) or dynamic (server-driven)

**Notable Props:** `Command` (root); `CommandGroup` with `heading`; `CommandItem` with `onSelect`; `CommandShortcut`; `CommandEmpty`; `CommandLoading`; `CommandSeparator`

**Accessibility:** `role="combobox"` on search input with `aria-expanded`, `aria-controls`, `aria-activedescendant`; `role="listbox"` on results; `role="option"` on each item; `role="group"` with `aria-label` on CommandGroup; Escape closes Dialog (or navigates back one level in nested pages); result count communicated via live region; keyboard shortcut text (CommandShortcut) is decorative/visual only

---

### Mantine Spotlight — "Batteries-included palette: actions declared, filtering automatic, imperative open/close API"

Mantine's Spotlight (`@mantine/spotlight` package) is the most complete design-system-level command palette implementation across all 24 systems. Unlike cmdk's composable primitives approach, Spotlight is a fully-assembled component: you declare your actions, and Spotlight handles search, filtering, grouping, keyboard navigation, and the overlay lifecycle. The `spotlight.open()` / `spotlight.close()` imperative API connects naturally to global Cmd+K keyboard shortcuts.

Actions are declared as objects with `label`, `description`, `icon`, and `onTrigger` callback. `SpotlightActionGroup` handles sectioning; `SpotlightAction` is the individual item. Custom filter functions via `filter` prop override the built-in search for server-side or fuzzy search scenarios. `numberOfColumns` controls multi-column action grids (for icon-heavy command palettes like a quick-launch screen). A footer slot provides help text or additional navigation links below the results.

Nested pages (drill-down navigation) allow multi-step command flows: open Spotlight → select "Switch project" → show a secondary list of projects. Escape navigates back one level before closing the overlay entirely. This pattern is critical for command palettes with hierarchical action trees.

**Design Decisions:**
- **Fully assembled vs. composable primitives** → Why: faster implementation for the majority case; the cmdk approach is more flexible but requires more assembly → Impact: HIGH → Para tu caso: Spotlight for fast integration; cmdk for architectural customization
- **Imperative open/close API** → Why: `spotlight.open()` in a `useEffect` keydown handler is cleaner than threading state through props when the trigger is external to the palette → Impact: MED → Para tu caso: standard pattern for Cmd+K global keyboard triggers
- **Nested pages with Escape to go back** → Why: some action trees require context selection before action execution (which project? which user?) → Impact: MED → Para tu caso: required for any palette with multi-step flows

**Notable Props:** `spotlight.open()` / `spotlight.close()` (imperative); `SpotlightActionGroup` for sections; `SpotlightAction` with `label`/`description`/`icon`/`keywords`/`onTrigger`; `filter` (custom filter function); `numberOfColumns`; `footer` slot

**Accessibility:** Focus trapped in overlay; search input has `role="combobox"` with `aria-activedescendant`; results use `role="listbox"` + `role="option"`; result count changes announced via `aria-live`; Escape navigates back one level before closing; keyboard shortcut labels are decorative visual text only

---

### VS Code Command Palette (product reference, not a component) — "The industry-standard UX model"

While VS Code's Cmd+Shift+P command palette is not a Fluent 2 component, it is the original reference that popularized the pattern and defines the expected UX. Its innovations include prefix-based mode switching (> for commands, @ for symbols, : for line numbers, no prefix for file search), recent items persistence, fuzzy matching with character-highlight display, grouping by category, and keyboard shortcut display next to each command. Every design system that implements a command palette references VS Code as the interaction model.

The gap between Fluent 2's component library (no command palette) and Microsoft's product implementations (the best command palettes in the industry — VS Code, Windows Terminal, PowerToys Run) is the strongest evidence that command palettes are product features requiring deep integration with routing and action registries, not standalone UI components.

---

### GitHub Cmd+K (product reference) — "The web-app command palette model"

GitHub's Cmd+K palette demonstrates what a command palette looks like in a web application context: global search across repos/issues/PRs, navigation to any admin page, action execution (create issue, switch theme), nested subpages (select repo, then search within it), recent items, and keyboard shortcut display. It is built on Primer's ActionList + TextInput + Dialog building blocks, not exposed as a public Primer component. This implementation is the de facto reference for what a web product command palette should do, while VS Code is the reference for desktop application command palettes.

---

## Pipeline Hints

**Archetype recommendation:** composite-overlay
Rationale: Command palette is a keyboard-invoked overlay that composites a search input + filtered results list + grouped actions + optional shortcut badges. It overlays content rather than occupying a content region.

**Slot consensus:** (2/24 systems WITH component; 22 treat as application-layer feature)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| search-input | text | yes | 2/2 | Always present; focus never leaves this slot; placeholder="Search..." |
| results-list | container | yes | 2/2 | Filtered list of actions; scrollable; keyboard-navigable via aria-activedescendant |
| group | container | no | 2/2 | Category labels + grouped items (recent, navigation, actions); CommandGroup / SpotlightActionGroup |
| item | container | yes | 2/2 | Individual action: label + optional description + optional icon |
| item-icon | icon | no | 2/2 | Leading icon per action item |
| item-shortcut | text | no | 2/2 | Keyboard shortcut badge (visual only); CommandShortcut / kbd element |
| item-description | text | no | 2/2 | Secondary text below action label; Mantine SpotlightAction description |
| empty-state | container | no | 2/2 | Zero results state; CommandEmpty |
| loading-state | container | no | 2/2 | While async results load; CommandLoading |
| separator | divider | no | 2/2 | Visual divider between groups; CommandSeparator |
| footer | container | no | 1/2 | Help text / nav links below results; Mantine only |
| nested-page-header | container | no | 2/2 | Back navigation + current context label during nested navigation |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| State | state | default/loading/empty | 2/2 | loading for async search; empty for zero results |
| Filter mode | variant | client/server | 2/2 | client = cmdk auto-filter; server = consumer controls items array |
| Layout | variant | list/grid | 1/2 | grid only in Mantine (numberOfColumns); list is universal |
| Size | variant | sm/md/lg | 1/2 | Mantine has size prop; cmdk unsized (inherits container) |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isOpen | 2/2 | false | Controlled open state; paired with onOpenChange |
| shouldFilter | 1/2 | true | cmdk only; disable to handle filtering externally |
| loop | 1/2 | false | cmdk; keyboard nav wraps from last item back to first |
| hasFooter | 1/2 | false | Mantine Spotlight; help text below results |
| hasNestedPages | 2/2 | false | Multi-level navigation within the palette |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| closed | 2/2 | overlay hidden | default state; triggered by Cmd+K |
| open/default | 2/2 | overlay visible, input focused | activated state |
| loading | 2/2 | loading indicator in results area | async search in progress |
| empty | 2/2 | empty state message | zero results for current query |
| item-highlighted | 2/2 | item background changes | keyboard navigation via aria-activedescendant |
| item-selected | 2/2 | action executed, overlay closes | Enter on highlighted item |
| nested | 2/2 | secondary results page visible | after selecting a subcommand |

**Exclusion patterns found:**
- closed × loading/empty — palette must be open to show these states
- item-selected × all other item states — selection immediately executes and closes

**Building block candidates:**
- overlay → Dialog/Modal wrapper — 2/2 systems use external dialog for overlay + focus trap
- results → CommandList/Listbox — 2/2 have structured results container with virtual scroll if needed
- item → CommandItem/SpotlightAction — 2/2 have structured action items with label/icon/shortcut/description
- group → CommandGroup/SpotlightActionGroup — 2/2 have category grouping with labels

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| placement | center-modal, top-quarter | 2/2 | center is standard; VS Code uses top-quarter |
| maxHeight | px or vh value | 2/2 | results list must be height-constrained and scrollable |
| searchPlaceholder | string | 2/2 | contextual placeholder text |

**A11y consensus:**
- Primary role: `role="combobox"` on search input (2/2 consensus)
- Required ARIA: `aria-expanded`, `aria-controls` (pointing to listbox), `aria-activedescendant` (tracking highlighted item)
- Results: `role="listbox"` on container; `role="option"` on items; `role="group"` + `aria-label` on sections
- Keyboard: Type to filter; Up/Down to navigate; Enter to execute; Escape to close or go back one level
- Focus: Input focus is NEVER moved away (virtual focus via `aria-activedescendant`)
- APG pattern: Combobox with listbox popup
- Live region: Result count changes announced via `aria-live="polite"` (cmdk and Mantine)
- Shortcut labels: Visual-only decoration; actual keyboard binding is application-level
- Overlay: Standard Dialog focus trap; Escape dismisses overlay (or back-navigates nested pages first)

---

## What Everyone Agrees On

1. **Input focus never moves**: All implementations use virtual focus (aria-activedescendant) so the search input stays focused the entire time. Keyboard navigation highlights items without moving DOM focus away from the text field — this makes every keystroke immediately filter results.

2. **Escape = close or back, never both**: When nested pages are active, Escape navigates back one level. Only when at the root level does Escape close the overlay. All systems agree on this behavior because jumping directly to closed from a nested page would be disorienting.

3. **Keyboard shortcut labels are decorative**: CommandShortcut text (⌘K, ⌘N) is visual-only. The actual keyboard binding is application-level — the component displays the shortcut but does not bind it. This separation is universal.

4. **Action list is the data model**: All systems treat command palettes as declarative action registries. You define what actions exist; the component handles filtering, grouping, and navigation. This is a deliberate departure from imperative "push these results" models.

5. **Dialog/Modal is the overlay layer**: No command palette component implements its own focus trap or portal. They all compose with the existing Dialog/Modal primitive for the overlay behavior, separating concerns cleanly.

---

## Where They Disagree

**"¿Composable primitives (cmdk) vs. fully assembled (Mantine Spotlight)?"**
→ cmdk: individual primitive components assembled by consumer; total flexibility; requires more setup → Mantine: action objects declared, component handles everything; faster setup; less flexible
→ Para tu caso: use the assembled approach (Spotlight-style) for standard Cmd+K palettes; use the composable approach (cmdk-style) when you need non-standard layouts or deeply custom item rendering

**"¿Should filter be client-side or server-side?"**
→ Client-side: zero latency; works offline; limited to pre-loaded action list → Server-side: handles large action sets; searches content (issues, pages, users); requires loading state
→ Para tu caso: hybrid — client-filter for navigation/action commands, server-search for content (repos, issues, records)

**"¿Should the palette be a separate component or composed from Dialog + list?"**
→ Separate component (Mantine): predictable API; easier to onboard; opinionated UX → Composed (cmdk + Dialog): architectural flexibility; no lock-in; must manage overlay yourself
→ Para tu caso: separate component if your palette has a standard structure; composed if your Cmd+K needs to host different content types

**"¿Nested pages or flat grouped list?"**
→ Nested pages (Mantine, GitHub): drill-down for hierarchical commands (switch project, then filter within project) → Flat grouped: simpler mental model; all commands visible without navigation
→ Para tu caso: nested pages only if your action tree genuinely requires context selection before execution; flat groups for most product use cases

**"¿Prefix-based mode switching (VS Code) or unified search?"**
→ Prefix-based (> for commands, @ for symbols, : for line numbers): power-user model with clear mode separation → Unified: simpler for users unfamiliar with prefixes; all results mixed and ranked
→ Para tu caso: unified search for most web products; prefix-based only for developer tools where users are keyboard-proficient

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Center modal overlay | Palette appears in center of viewport; content dims behind it | Most web applications | shadcn/ui, Mantine |
| Top-quarter overlay | Palette appears at top 1/4 of viewport | IDE-style tools | VS Code, PowerToys |
| Grouped results list | Actions divided into labeled sections (Recent, Navigation, Actions) | Large action sets | shadcn/ui, Mantine, GitHub |
| Nested subpages | Selecting a group-action loads a secondary list | Hierarchical command trees | Mantine, GitHub |
| Highlighted match characters | Search query characters highlighted in matching result labels | Fuzzy search UX | cmdk, VS Code |
| Keyboard shortcut badge | KBD element showing shortcut for each action | Power-user palettes | shadcn/ui, Mantine, VS Code |

**Standard layout wireframe:**
```
┌──────────────────────────────────────────────────────────┐
│  🔍  Search commands...                              ⌘K  │
├──────────────────────────────────────────────────────────┤
│  RECENT                                                   │
│  ▶ 📄 Open last file                            ⌘O      │
│  ▶ 🔀 Switch branch                             ⌘B      │
├──────────────────────────────────────────────────────────┤
│  NAVIGATION                                               │
│  ▶ 🏠 Go to Dashboard                                   │
│  ▶ ⚙️  Settings                                ⌘,      │
│  ▶ 👥 Team Members                                      │
├──────────────────────────────────────────────────────────┤
│  Press ↑↓ to navigate  · Enter to select  · Esc to close│
└──────────────────────────────────────────────────────────┘
```

**Nested page wireframe:**
```
┌──────────────────────────────────────────────────────────┐
│  ← Switch Project  🔍 Search projects...                 │
├──────────────────────────────────────────────────────────┤
│  ▶ 🗂️ Alpha — Web Application                           │
│● ▶ 🗂️ Beta — Mobile App                                 │
│  ▶ 🗂️ Gamma — Design System                             │
└──────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

**Command palette assumes keyboard proficiency** (MEDIUM) — power-user pattern that onboards poorly for non-technical users; new users will not discover Cmd+K without explicit onboarding; mitigation: add a visible search/command button in the header alongside the keyboard shortcut

**Action registry requires application integration** (HIGH) — the UI component is trivial; the hard part is connecting it to your routing (navigation commands), permission system (not showing actions users can't perform), and action execution (triggering the right handler); mitigation: plan this integration layer before choosing a palette component; the overlay component is the least complex part

**Keyboard shortcut conflicts** (MEDIUM) — Cmd+K is browser-claimed in some contexts; Cmd+/ conflicts with comment toggling in VS Code; mitigation: test your chosen shortcut across target browsers, OS combinations, and embedded contexts (VS Code extension views, iframes); document the chosen shortcut prominently

**Search performance with large action sets** (LOW) — client-side fuzzy filter degrades above ~500 items; mitigation: implement server-side search for content (files, issues, users) and keep client-side for static commands (navigation, actions); cmdk handles client-side filtering; server-side requires custom item management

**GOV.UK and Nord rationales for exclusion** (reference) — progressive enhancement requirements (command palettes require JavaScript and keyboard proficiency) and clinical safety (ambiguous command execution risk) are principled reasons to not implement a command palette in specific domains

---

## Dimension Scores

| Dimension | shadcn/ui (cmdk) | Mantine Spotlight |
|-----------|-----------------|-------------------|
| A11y depth | 5/5 | 4/5 |
| Feature coverage | 4/5 | 5/5 |
| API ergonomics | 3/5 | 5/5 |
| Composability | 5/5 | 3/5 |
| Documentation | 5/5 | 5/5 |

---

## Next Steps

```
/spec command-palette      → outputs/command-palette-config.json
/enrich command-palette    → a11y tokens + interaction spec
/build command-palette     → full pipeline in one command
/build command-palette --max  → use pre-generated config
```
