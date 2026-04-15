---
component: command-palette
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — no Command Palette, Spotlight, or Cmd+K pattern
**Approach:** M3 does not provide a command palette component. Search is handled via SearchBar + SearchView (full-screen takeover on mobile, docked panel on large screens), which is a content-search pattern, not a command-dispatch pattern. Navigation is handled via NavigationDrawer, BottomNavigation, and Tabs — all persistent UI, not keyboard-invoked overlays. The closest M3 gets is the SearchView modal, but it lacks action execution, keyboard shortcuts display, and command grouping.
**Key Decisions:**
- [HIGH] No command-dispatch pattern: M3's navigation model assumes persistent visible navigation surfaces, not keyboard-invoked command overlays — fundamentally different interaction paradigm
- [HIGH] SearchView is content-only: search results are content items, not executable actions or navigation commands — no concept of "run this action"
- [MED] Mobile-first orientation: command palettes are desktop-keyboard patterns; M3's mobile-first design philosophy deprioritizes keyboard-driven power-user workflows
**Notable API:** No component. SearchBar + SearchView is the closest but architecturally different (content search vs. command dispatch).
**A11y:** No guidance for command palette ARIA patterns. SearchView's modal management (sibling views marked inaccessible) is the only transferable pattern.
**Best at:** Nothing in the command palette space — M3's interaction model does not include keyboard-invoked command dispatch.
**Missing:** Entire component category: command invocation, action search, keyboard shortcut display, nested subpages, recent commands.

---

## spectrum
**Component:** Absent — no Command Palette or command-dispatch overlay
**Approach:** Spectrum provides SearchField for content search and ComboBox for filtered selection, but neither supports action execution or command dispatch. Spectrum's architecture separates input components (SearchField, ComboBox) from action components (ActionBar, ActionMenu) — there is no component that combines "search for an action, then execute it." Adobe products like Photoshop and VS Code (Monaco) implement command palettes at the application layer, not the design system layer.
**Key Decisions:**
- [HIGH] No search-to-action bridge: SearchField finds content; ActionMenu triggers actions; no component combines both — command palettes require this bridge
- [MED] Application-layer responsibility: Adobe's own command palette implementations (Photoshop, Illustrator) are product-specific, not design-system components — suggests Adobe views this as application logic, not reusable UI
**Notable API:** No component. ComboBox + ActionMenu would need to be composed; no pre-built integration.
**A11y:** No command palette ARIA guidance. ComboBox's combobox+listbox pattern is the closest transferable model.
**Best at:** Nothing in this space — Spectrum's strict component taxonomy keeps search and action execution as separate concerns.
**Missing:** Command dispatch overlay, action search, keyboard shortcut display, nested command navigation, recent actions tracking.

---

## carbon
**Component:** Absent — no Command Palette component
**Approach:** Carbon provides UIShell with header search (global content search) and SideNav for navigation, but no command palette or action-search overlay. The closest pattern is the Search component combined with the global header, which supports filtering content but not dispatching actions or navigating commands. IBM products that need command palettes (e.g., IBM Cloud Shell) implement them as product-specific features outside Carbon's component library.
**Key Decisions:**
- [HIGH] Enterprise navigation model: Carbon's UIShell assumes persistent left-nav + header pattern for enterprise applications — keyboard-invoked overlays are not part of the navigation architecture
- [MED] Search is content-scoped: Carbon's Search component is a text input for filtering visible content, not a global action dispatcher
**Notable API:** No component. Search + Modal composition would be the starting point for a custom implementation.
**A11y:** No command palette ARIA guidance. Search component's `role="search"` and Modal's focus trap are transferable patterns.
**Best at:** Nothing in this space — Carbon's enterprise navigation model is persistent-UI-first.
**Missing:** Command dispatch overlay, fuzzy action search, keyboard shortcut rendering, command grouping, recent/frequent actions.

---

## polaris
**Component:** Absent — no Command Palette component (but Shopify Admin has a product-level implementation)
**Approach:** Polaris does not include a command palette in the design system component library. However, Shopify Admin (the product built on Polaris) ships a Cmd+K command palette for store navigation and action execution — this is a product-specific implementation, not a Polaris component. Polaris provides the building blocks (Listbox, Combobox, Modal, TextField) but no composed command palette. The Shopify Admin command palette supports store search, navigation to admin pages, and quick actions.
**Key Decisions:**
- [HIGH] Product-specific, not design-system: Shopify Admin's Cmd+K palette is tightly coupled to the admin's routing, search index, and action registry — too product-specific for a general design system component
- [MED] Building blocks available: Polaris's Combobox (TextField + Listbox), Modal, and ActionList provide the raw materials for a command palette composition
**Notable API:** No component. Combobox + Modal + ActionList would be the composition path.
**A11y:** No command palette ARIA guidance. Combobox's `role="combobox"` + `role="listbox"` + `aria-activedescendant` pattern is the transferable model.
**Best at:** Nothing as a design system component — but Shopify Admin's product-level implementation demonstrates the Cmd+K pattern built on Polaris primitives.
**Missing:** Command palette component, action registry integration, keyboard shortcut display, nested command pages, recent actions.

---

## atlassian
**Component:** Absent as a standalone — but Jira/Confluence ship product-level command palettes
**Approach:** Atlassian Design System does not expose a command palette component. Jira ships a Cmd+K command palette (global search + quick actions + navigation) and Confluence has a similar slash-command and search overlay. These are product-specific implementations using internal Atlassian infrastructure (search platform, navigation framework). The design system provides Select, Popup, and TextField but no composed command palette. Atlassian's approach treats command palettes as platform features requiring deep integration with search infrastructure.
**Key Decisions:**
- [HIGH] Platform integration required: Jira's command palette connects to Atlassian's search platform, issue navigation, and action registry — impossible to generalize as a stateless UI component
- [MED] Slash commands in editors: Confluence and Jira editors support `/` to invoke inline command menus — a related but distinct pattern (editor-scoped vs. global command palette)
**Notable API:** No design system component. Jira's internal implementation uses custom components not exposed in `@atlaskit`.
**A11y:** No public ARIA guidance for command palettes. Jira's implementation uses combobox + listbox pattern with `aria-activedescendant`.
**Best at:** Nothing as a design system component — but Jira/Confluence demonstrate mature product-level command palettes with deep search integration.
**Missing:** Public command palette component, reusable action search pattern, keyboard shortcut rendering, command grouping primitives.

---

## ant-design
**Component:** Absent — no Command Palette component
**Approach:** Ant Design does not provide a command palette. AutoComplete handles suggestion-based text input; Select handles constrained selection; neither supports action dispatch or command execution. Ant Design Pro (the application framework layer) does not include a command palette template either. Chinese enterprise applications built on Ant Design that need Cmd+K patterns typically use third-party libraries (e.g., cmdk) or build custom implementations.
**Key Decisions:**
- [HIGH] No action-dispatch component: Ant Design's component taxonomy separates data entry (AutoComplete, Select) from navigation (Menu, Breadcrumb) — no component bridges "search for action → execute"
- [MED] Third-party ecosystem: cmdk and similar libraries fill this gap in the React ecosystem; Ant Design does not compete in this space
**Notable API:** No component. AutoComplete + Modal composition is the starting point; cmdk integration is the community pattern.
**A11y:** No command palette ARIA guidance. AutoComplete's `role="combobox"` + `aria-activedescendant` pattern is transferable.
**Best at:** Nothing in this space — Ant Design's component scope does not include command-dispatch patterns.
**Missing:** Entire command palette category: action search, keyboard shortcut display, command grouping, nested subpages, recent actions, fuzzy matching.
