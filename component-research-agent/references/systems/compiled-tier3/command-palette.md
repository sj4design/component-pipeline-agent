---
component: Command Palette
tier: 3
last_verified: 2026-03-31
---

# Command Palette — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — compose from Dialog + Command | No command palette primitive. Teams compose from Dialog + a third-party like cmdk (which itself builds on Radix primitives internally). Radix provides the overlay/focus-trap layer but not the search+action dispatch logic. | high |
| Chakra UI | Not available — compose from Modal + Input | No command palette component in v2 or v3. Teams use cmdk or kbar with Chakra's Modal for the overlay. Chakra's component scope does not include action-dispatch patterns. | high |
| GOV.UK | Not available | No command palette; government service design prioritizes explicit navigation and progressive enhancement over keyboard-driven power-user patterns. Command palettes conflict with GOV.UK's principle that all interactions must work without JavaScript. | high |
| Base Web (Uber) | Not available | No command palette component. Base Web focuses on form controls and data display for Uber's internal tools. | medium |
| Fluent 2 (Microsoft) | CommandBar (toolbar, not palette) | Fluent 2's CommandBar is a horizontal toolbar of action buttons — NOT a command palette. It is a persistent visible surface, not a keyboard-invoked search overlay. However, Microsoft products (VS Code, Windows Terminal, PowerToys Run) ship the most mature command palette implementations in the industry — these are product-level, not Fluent components. VS Code's command palette is the original reference that popularized the Cmd+Shift+P / Cmd+K pattern. | high |
| Gestalt (Pinterest) | Not available | No command palette; Pinterest's consumer product scope uses visual browsing and search, not keyboard-driven command dispatch. | high |
| Mantine | Spotlight | The most complete command palette component in T3. `Spotlight` is a dedicated Cmd+K overlay with built-in search, grouped actions, keyboard navigation, nested pages, recent actions, and custom footer. Uses `@mantine/spotlight` package. Supports both client-side filtering and custom filter functions. Actions defined declaratively with label, description, icon, and onTrigger callback. | high |
| Orbit (Kiwi.com) | Not available | No command palette; travel booking UI scope does not include power-user keyboard workflows. | medium |
| Evergreen (Segment) | Not available | No command palette; data infrastructure admin tools use standard navigation patterns. | medium |
| Nord (Nordhealth) | Not available | No command palette; healthcare practice management uses explicit navigation for clinical safety (ambiguous command execution is a risk in medical contexts). | high |

## Key Decision Patterns

Mantine's Spotlight is the standout T3 implementation and one of only two design-system-level command palette components across all tiers (alongside shadcn/ui's Command). Spotlight provides: a search input with automatic filtering, grouped actions via `SpotlightActionGroup`, individual actions with label/description/icon/keyboard-shortcut via `SpotlightAction`, nested pages for drill-down navigation, custom filter functions for fuzzy or server-side search, and a footer slot for help text or additional actions. The `spotlight.open()` / `spotlight.close()` imperative API integrates with global keyboard shortcuts. Spotlight is a fully composed component (not primitives to assemble), which means faster implementation but less architectural flexibility than cmdk's composable approach.

Fluent 2's CommandBar naming creates an important terminological distinction. In Fluent, "CommandBar" means a visible toolbar of buttons (Office ribbon-style) — the opposite of a command palette's hidden-until-invoked model. However, Microsoft's product-level implementations (VS Code Command Palette, Windows Terminal Command Palette, PowerToys Run) are the industry's most influential command palette implementations. VS Code's Cmd+Shift+P palette is the original pattern that inspired cmdk, Spotlight, and every other command palette. The gap between Fluent's component library (no command palette) and Microsoft's product implementations (the best command palettes in the industry) mirrors the pattern seen across all tiers: command palettes are product features, not design system components, for most organizations.

GOV.UK's absence is philosophically grounded. Command palettes require JavaScript, cannot be progressively enhanced from a no-JS baseline, and introduce ambiguity about what action will execute — all of which conflict with GOV.UK's design principles. Government services must be usable by all citizens regardless of technical proficiency or assistive technology; a keyboard-shortcut-invoked overlay assumes familiarity with power-user desktop patterns. This rationale is the strongest principled argument against including command palettes in a design system.

Nord's absence rationale adds a safety dimension specific to healthcare: executing ambiguous commands in a clinical context (e.g., a fuzzy match selecting the wrong medication or procedure) creates patient safety risks. Explicit navigation with clear confirmation steps is preferred over fast-but-ambiguous command dispatch.

Radix's role as an indirect enabler is notable. cmdk (the library behind shadcn/ui's Command) uses Radix's Dialog primitive internally for the overlay layer. Radix provides focus trapping, portal rendering, and dismiss behavior — the overlay infrastructure that command palettes need — without providing the search+filter+action-dispatch logic. This positions Radix as the foundation layer rather than the component layer for command palettes.

## A11y Consensus

- The command palette overlay must trap focus (Dialog/Modal pattern) and be dismissible with Escape
- The search input uses role="combobox" with aria-expanded, aria-controls pointing to the results listbox, and aria-activedescendant tracking the highlighted item
- Results use role="listbox" with role="option" on each action item; grouped results use role="group" with aria-label
- Keyboard: typing filters results; Up/Down navigates items; Enter executes the highlighted action; Escape closes the overlay (or navigates back one level in nested subpages)
- Mantine Spotlight announces result count changes via aria-live region
- Keyboard shortcut labels displayed alongside actions are visual-only decorations — the actual keyboard binding is application-level
- The trigger shortcut (Cmd+K, Cmd+Shift+P) must not conflict with browser or OS shortcuts; document the chosen shortcut clearly
- For nested subpages: Backspace on empty input or Escape should navigate back one level before closing the overlay entirely

## Recommended Use

Reference Mantine Spotlight for a batteries-included command palette with grouped actions, nested pages, and imperative open/close API. Compare with shadcn/ui Command (T2) for architectural trade-offs: Spotlight is a complete composed component (faster setup, less flexibility); Command/cmdk is composable primitives (more flexibility, more assembly required). Reference VS Code's command palette (not a Fluent component, but the industry standard UX) for interaction patterns: prefix-based mode switching (> for commands, @ for symbols, : for line numbers), recent items, and nested navigation. GOV.UK and Nord provide principled rationales for when NOT to use command palettes (progressive enhancement requirements, clinical safety contexts).
