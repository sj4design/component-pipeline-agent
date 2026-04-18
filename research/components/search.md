---
component: search
date: 2026-04-17
mode: --max
systems_count: 24
scope: all
---

# Search — Research Synthesis (--max mode, all 24 systems)

## Sistemas sin componente dedicado

| System | Tier | Approach |
|--------|------|----------|
| Atlassian | 1 | Intentional fragmentation — Textfield + slots for simple contexts; @atlaskit/search-dialog for global Jira/Confluence search; no canonical Search component |
| Radix UI | 3 | TextField with `type="search"` + TextField.Slot for search icon; no dedicated component |
| Chakra UI | 3 | InputGroup + InputLeftElement (search icon) + Input `type="search"`; Ark UI Combobox for autocomplete |
| Base Web | 3 | Standard Input with `type="search"` and search icon via enhancer slot |
| Orbit (Kiwi.com) | 3 | Domain-specific flight/location search — specialized InputField, not a generic Search; no shared component |
| Nord (Nordhealth) | 3 | nord-input `type="search"` web component; no dedicated search component |

**Systems with dedicated component: Material Design 3 (T1), Spectrum (T1), Carbon (T1), Polaris (T1), Ant Design (T1), Twilio Paste (T2), Salesforce Lightning (T2), GitHub Primer (T2), shadcn/ui (T2), Playbook (T2), REI Cedar (T2), Wise Design (T2), Dell DS (T2), Fluent 2 (T3), Gestalt (T3), Mantine (T3/Spotlight), Evergreen (T3)** — 17+ of 24 systems. Search is one of the most universally-implemented components across all tiers.

---

## How Systems Solve It

### Material Design 3 (Tier 1) — `SearchBar` + `SearchView`

M3 provides the most architecturally ambitious search system: a two-component model separating the persistent affordance (SearchBar — a docked bar always visible) from the full-screen search session (SearchView — expands to take over the screen on mobile, stays inline on large screens). This adaptive architecture is unique to M3 among all 24 systems. SearchView sets sibling views to `importantForAccessibility=no` when open, preventing screen readers from escaping to background content. Predictive Back gesture is wired automatically for SearchView dismissal — no per-app integration needed.

**Design Decisions:**
- **SearchBar + SearchView separation** — the search affordance (bar) and the search session (view) are architecturally distinct components. _Why:_ full-screen takeover on mobile is a fundamentally different UI mode than typing in an inline field; merging them would require complex conditional rendering inside one component. _Impact:_ clean two-component API that maps to the actual interaction stages. _Para tu caso:_ critical for mobile-first apps where search is a primary navigation mode.
- **`autoShowKeyboard` true by default** — opening SearchView immediately shows the keyboard. _Why:_ opening SearchView signals intent to type; forcing a second tap to focus is wasted friction and fails common user expectation. _Impact:_ eliminates a step in the search initiation flow. _Para tu caso:_ set false only in edge cases where users open search view without intending to type immediately.
- **`adaptiveMaxWidthEnabled`** — prevents 100% width on tablets. _Why:_ full-width search on a 12-inch screen looks like a bar filling the screen — visually loud and wastes layout space. _Impact:_ consistent proportion across device sizes. _Para tu caso:_ enabled by default; disable only for full-width search UI on large screens by design.
- **Predictive Back automatically wired** — SearchView dismisses with system back gesture without per-app integration. _Why:_ developer friction is the primary reason this feature is missing in custom implementations; baking it into the component ensures consistent back-gesture behavior across all apps using M3. _Impact:_ removes one of the top reasons for non-standard navigation patterns.

**Notable Props:** `autoShowKeyboard`; `app:liftOnScroll` (elevation on scroll); `adaptiveMaxWidthEnabled`; `app:textCentered` (expressive/discovery app variant); SearchView includes `setupWithSearchBar()` for linking the two components.

**Accessibility:** SearchView marks background sibling views `importantForAccessibility=no` — prevents SR focus escaping to stale content. Web: `role="search"` + `aria-label` on the landmark. Enter submits; Escape / Predictive Back dismisses.

---

### Spectrum / Adobe (Tier 1) — `SearchField`

Spectrum treats Search as a dedicated component (not a TextField with a prop), adding capabilities that don't belong on a general text input. The key architectural decision is separating `onChange` (every keystroke) from `onSubmit` (Enter key only) at the API contract level — this prevents the most common search UX bug: expensive API calls on every character typed. `isQuiet` mode removes the visible border for toolbar and embedded contexts. Required `label` (or `aria-label`) is a hard constraint — missing labels are production-scale a11y violations for Adobe's external developer audience. `enterKeyHint` controls the mobile keyboard action button label.

**Design Decisions:**
- **`onChange`/`onSubmit` separation prevents expensive API calls** — `onChange` fires on every keystroke; `onSubmit` fires only on Enter. _Why:_ conflating these is the most common search bug in product code; by making them separate callback props with different names, the API enforces the right mental model — you can't accidentally wire `onSubmit` logic to `onChange`. _Impact:_ removes an entire class of performance and UX bugs at the component contract level. _Para tu caso:_ always use `onSubmit` for server queries; use `onChange` only for client-side instant-filter scenarios.
- **Separate component (not TextField + prop)** — SearchField has `onSubmit`, `onClear`, `enterKeyHint` that don't belong on general TextFields. _Why:_ adding these to TextField would pollute the general input API with search-specific semantics. _Impact:_ clean API separation — developers who need search semantics import SearchField, not a configured TextField. _Para tu caso:_ use when the semantic contract of a search input (submit, clear, keyboard hint) matters.
- **Label or aria-label enforced (hard constraint)** — component throws in dev if neither is provided. _Why:_ Adobe publishes Spectrum for third-party developers; missing labels on search fields are a systemically common a11y violation. Enforcement at the component level fixes this at scale. _Impact:_ all Spectrum-based search inputs have accessible names — non-negotiable.
- **`isQuiet` for toolbar/embedded contexts** — removes visible border. _Why:_ search inside a toolbar or card context needs to visually integrate with the surrounding UI without a redundant border. _Impact:_ one prop handles the inline embedding use case cleanly.

**Notable Props:** `onSubmit(value)`; `onClear()`; `isQuiet`; `enterKeyHint`; `validate`; `validationBehavior`; `label` (required unless `aria-label` provided); `autoFocus`

**Accessibility:** `<input type="search">` native — AT announces "search input" automatically. `aria-errormessage` + `aria-describedby`. Known gap: Escape-to-clear behavior not explicitly documented.

---

### Carbon / IBM (Tier 1) — `Search`

Carbon's Search has the most explicit keyboard documentation of any Tier 1 system: Escape both clears the input AND collapses the expandable variant. The `expandable` variant collapses to an icon button in dense layouts (toolbar toolbars in data tables) — the search input is only shown when actively used. Three explicit sizes (sm/md/lg) for enterprise density control. `role="search"` landmark wrapper (a `<div>`) creates a proper search landmark accessible to screen readers via keyboard shortcut (F key in JAWS/NVDA). `labelText` prop feeds the landmark's `aria-label`.

**Design Decisions:**
- **Escape = clear (and collapse if expandable)** — explicit keyboard contract documented and enforced. _Why:_ enterprise power users operate primarily via keyboard; consistent Escape-to-dismiss behavior is expected across all interactive elements. _Impact:_ removes the need for a close/clear button in keyboard-primary contexts. _Para tu caso:_ the most keyboard-first search implementation in Tier 1; important for developer tools and data-heavy enterprise UI.
- **Expandable variant** — collapses to an icon button until focused. _Why:_ dense data table toolbars cannot afford the horizontal space of a full search input when search is rarely used. _Impact:_ search stays in the toolbar without always consuming space. _Para tu caso:_ use for dense toolbars and data grid headers where space is premium.
- **`role="search"` wrapper div creates a landmark** — wraps the input in a div with `role="search"` and `aria-label`. _Why:_ screen reader users navigate by landmark type; a proper search landmark enables direct navigation to search. _Impact:_ required for WCAG compliance in enterprise apps with complex navigation. _Para tu caso:_ always wire `labelText` for the landmark to have a meaningful name.
- **Three sizes for density control** — sm/md/lg mapped to enterprise layout grid. _Why:_ enterprise layouts have strict density requirements; a single size forces sizing workarounds. _Impact:_ the sizes align with Carbon's other form controls for visual consistency.

**Notable Props:** `size: "sm" | "md" | "lg"`; `expandable: boolean`; `labelText` (required for landmark a11y); `closeButton` (Escape behavior in expandable); `value`; `onChange`; `onClear`

**Accessibility:** `role="search"` landmark wrapper with `aria-label` from `labelText`; Escape-to-clear documented. Known gap: `onChange`-driven live filtering needs consumer-added `aria-live` for result announcements.

---

### Polaris / Shopify (Tier 1) — `SearchField`

Polaris makes the clear button automatic with no consumer override — consistent clear behavior across all Shopify apps is enforced at the component level. This is the only Tier 1 system that enforces ecosystem consistency by removing a prop. The component is also available as a web component (not just React) for App Extension sandboxes. No submit button by design: Shopify merchant search is a live-filter of a local dataset, not a server query. The `focused` prop allows controlled focus placement, enabling keyboard shortcuts (like `/` to activate search) without consumer focus management code.

**Design Decisions:**
- **Automatic clear button with no override** — consumers cannot disable the clear button. _Why:_ across thousands of Shopify app partners, the clear button is the single most inconsistently implemented affordance; making it automatic and non-optional ensures consistency for merchants. _Impact:_ removes a common omission in third-party apps. _Para tu caso:_ strong argument for your own ecosystem if you have many consuming teams.
- **Web component architecture** — App Extension sandbox can't afford full React bundle. _Why:_ Shopify App Extensions run in isolated sandboxes where importing a full React component library is impractical. _Impact:_ consistent search behavior available to all extension types. _Para tu caso:_ relevant if your component needs to work outside React contexts.
- **No submit button / live-filter model** — Shopify search is always instant filter of local data. _Why:_ server-side search queries with a submit gate add perceived lag; filtering a local dataset shows results immediately on every keystroke. _Impact:_ no server-round-trip architecture — not suitable for remote search. _Para tu caso:_ use for local dataset filtering; for remote queries, choose Spectrum or Ant Design's onSearch pattern.
- **`focused` prop for controlled focus** — enables keyboard shortcut activation without consumer JS. _Why:_ "/" key shortcut to activate search is common in SaaS; the `focused` prop eliminates the need for `useRef` + `.focus()` calls in consumer code. _Impact:_ cleaner shortcut integration.

**Notable Props:** `onClearButtonClick` (separate from onChange); `focused` (controlled focus); `labelAccessibilityVisibility: "visible" | "hidden"`; `value`; `onChange`

**Accessibility:** `<label>` element (visually hidden or visible) rather than `aria-label` — broader AT compatibility. Console warnings in dev for missing accessibility props. Known gap: Escape-to-clear not documented.

---

### Ant Design (Tier 1) — `Input.Search`

Ant Design's `Input.Search` is a sub-component of the Input family with an explicit `enterButton` prop for a visible search button — unique among all Tier 1 systems. This reflects Chinese enterprise UX convention where a visible button reinforces the submit affordance. The `loading` prop replaces the search icon with a spinner during API calls — the only Tier 1 implementation with built-in async feedback. `onSearch` is a unified callback with an `info.source` discriminator that distinguishes keyboard submission, button click, and clear triggers — all in one callback, all distinguishable.

**Design Decisions:**
- **`enterButton` explicit submission button** — boolean (adds default button), string (button label), or ReactNode (custom button). _Why:_ Chinese enterprise UX conventions favor explicit confirmation affordances; implicit Enter-only submission is less discoverable for users unfamiliar with search field keyboard behavior. _Impact:_ the most explicit search submission model in Tier 1. _Para tu caso:_ use `enterButton` when the search action must be explicitly confirmed by users.
- **`loading` built-in spinner** — replaces search icon during API calls. _Why:_ after submit, users need feedback that their query is in progress; the input itself is where the action was initiated, so the spinner appears there. _Impact:_ cause-and-effect visible in the input where the user triggered the action. _Para tu caso:_ bind to the API call state; the most honest async feedback in Tier 1.
- **`onSearch` unified + `info.source`** — one callback handles all search triggers with source discrimination. _Why:_ most applications need different behavior for keyboard vs. button vs. clear-triggered search events; separate callbacks require consumers to coordinate state. `info.source` provides discrimination in one handler. _Impact:_ cleanest unified search event API in Tier 1.

**Notable Props:** `enterButton` (boolean|string|ReactNode); `loading`; `onSearch(value, event, {source})`; `allowClear` ({clearIcon} customizable); `size: "large" | "middle" | "small"`; `value`; `onChange`

**Accessibility:** Known gaps: no automatic `role="search"` landmark; no `aria-busy`/`aria-live` for loading state SR feedback; no documented Escape-to-clear. Feature-rich but lags Spectrum/Carbon in keyboard and SR standards.

---

### Twilio Paste (Tier 2) — `SearchBar`

Paste's SearchBar wraps a text input in `role="searchbox"` semantics with a form submit pattern. Includes a visible submit button (not icon-only) — consistent with accessibility guidance for search submit affordances. No autocomplete suggestions in the base component; async results are handled at the application layer. Clean implementation suitable for communication/contact-center search contexts where predictability matters more than feature richness.

---

### Salesforce Lightning (Tier 2) — `Global Search` / `Search Input`

Lightning distinguishes global search (across all CRM objects, with MRU suggestions) from scoped search (within a specific object type). This two-mode model is unique to Salesforce's multi-object CRM context. Autocomplete suggestions with recent-used items (MRU) are built into the global variant. The search dialog pattern integrates with the CRM object model — searching "Opportunities" scopes results to that object type.

---

### GitHub Primer (Tier 2) — `SearchInput`

Primer's SearchInput is a focused, minimal implementation: `input[type=search]` with a leading magnifier icon. No built-in autocomplete, no submit button, no size variants. Best suited for simple filter-as-you-type scenarios within a page. `role="searchbox"` from the native type attribute. The simplicity reflects GitHub's primary search use case: filtering lists on a page (files, commits, labels).

---

### shadcn/ui (Tier 2) — `Command` (search paradigm)

shadcn/ui's primary search story is the Command component (built on cmdk) — a Spotlight/VS Code Command Palette pattern rather than a traditional search field. Command is a keyboard-first popup that searches within a known item set with fuzzy matching. Separate from traditional inline search; this is the application-level search overlay pattern (`Ctrl+K` / `⌘K` to open). Best for in-app navigation, command execution, and filtering known datasets — not for backend query search.

---

### REI Cedar (Tier 2) — `CdrSearchBar`

Cedar's CdrSearchBar includes optional autocomplete/suggestion dropdown support — closer to the full search interaction than Primer or Paste. Vue-based component with WCAG 2.1 AA compliance. Available in outdoor/retail contexts where search often includes product category autocomplete.

---

### Fluent 2 / Microsoft (Tier 3) — `SearchBox`

Fluent 2's SearchBox is a dedicated component with integrated dismiss (clear) button that appears on content entry, `onSearch` callback for Enter/submit, and appearance variants matching the Input system (filled, outline, underline). Used in Office/Microsoft 365 contexts where search is a primary navigation mechanism. Clear button appears only when there is content — not always visible.

---

### Gestalt / Pinterest (Tier 3) — `SearchField`

Gestalt's SearchField has the most thorough mobile accessibility in the T3 set: a `cancelButton` prop for mobile exit-search-mode pattern (native iOS/Android search dismissal with a visible "Cancel" button). The required `accessibilityClearButtonLabel` prop enforces accessible naming for the clear button — the only implementation where the clear button label is a required prop, preventing the common omission of clear button accessible names.

---

### Mantine (Tier 3) — `Spotlight` (command palette) + `Autocomplete`

Mantine's search story has two modes: `Autocomplete` for search-with-dropdown-suggestions, and `@mantine/spotlight` for the command palette / global search overlay pattern (`Ctrl+K` / `⌘K`). Spotlight includes action registration, keyboard shortcut binding, and custom result type rendering. The most complete command palette implementation among all 24 systems, encapsulated in a separate package.

---

### Evergreen / Segment (Tier 3) — `SearchInput`

A minimal convenience wrapper around TextInput with a leading search icon. `onChange` fires for live table filtering. No clear button, no autocomplete. Represents the minimum viable search input for data table filtering use cases — appropriate for the Segment analytics dashboard context.

---

### GOV.UK (Tier 3) — Search (form pattern)

GOV.UK's search is a form-based pattern designed to work without JavaScript: `<form role="search">` + text `<input>` + visible "Search" button. No autocomplete in core. The button label must be visible text — "Search" not an icon — because GOV.UK research found that icon-only search buttons are missed by users on screen magnifiers viewing a portion of the screen. The most accessibility-conservative and progressively enhanced implementation of all 24 systems.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: form-input** — Search is fundamentally a specialized text input with search-specific callbacks, clear behavior, and semantic wrapping. The key decision is whether to include the autocomplete/suggestions dropdown as part of the same component or keep the input-only component pure and compose suggestions separately.

**Rationale:** Search has the highest adoption rate of any component in this batch (17+ of 24 systems). The main architectural split is input-only (Primer, Evergreen, Paste) vs. input+suggestions (Lightning, Cedar, Mantine Autocomplete) vs. full command palette (shadcn Command, Mantine Spotlight). These are three distinct component archetypes that should not be conflated.

---

### Slot Consensus Table (systems with component: 17+)

| Slot | Description | Systems | Consensus |
|------|-------------|---------|-----------|
| `leading-icon` / prefix | Search magnifier icon | All 17 | 17/17 |
| `clear-button` | X button to clear input | Spectrum, Carbon, Polaris, Ant, Fluent 2, Gestalt, Paste | 7/17 |
| `submit-button` | Explicit search submit | Ant (`enterButton`), Paste, GOV.UK | 3/17 |
| `loading-indicator` | Spinner during API call | Ant | 1/17 |
| `scope-selector` | Dropdown to scope search | Salesforce Lightning | 1/17 |

---

### Property Consensus Table

| Property | Values Found | Systems | Consensus |
|----------|-------------|---------|-----------|
| `value` | string | All | ~17/17 |
| `onChange` | `(value: string) => void` | All | ~17/17 |
| `onSubmit` / `onSearch` | `(value: string) => void` | Spectrum, Ant, Paste, Fluent 2, Gestalt | 5/17 |
| `onClear` | `() => void` | Spectrum, Carbon, Polaris, Ant | 4/17 |
| `size` | sm/md/lg or small/middle/large | Carbon (3), Ant (3) | 2/17 |
| `loading` | boolean | Ant | 1/17 |
| `expandable` | boolean | Carbon | 1/17 |
| `isQuiet` / quiet variant | boolean | Spectrum | 1/17 |
| `placeholder` | string | All | ~17/17 |
| `disabled` | boolean | All | ~17/17 |
| `focused` (controlled) | boolean | Polaris | 1/17 |
| `enterButton` | boolean/string/ReactNode | Ant | 1/17 |
| `cancelButton` | boolean | Gestalt | 1/17 |
| `autoFocus` | boolean | Multiple | ~8/17 |

---

### Boolean Properties Table

| Property | Default | Systems |
|----------|---------|---------|
| `expandable` | false | Carbon |
| `loading` | false | Ant |
| `isQuiet` | false | Spectrum |
| `disabled` | false | All |
| `autoFocus` | false | Multiple |
| `focused` (controlled) | false | Polaris |
| `allowClear` | — | Ant (true), others automatic |

---

### State Coverage Table

| State | Systems | Consensus |
|-------|---------|-----------|
| empty (default) | All | 17/17 |
| focused (typing) | All | 17/17 |
| has-value (with clear button) | Most | ~14/17 |
| loading / searching | Ant | 1/17 |
| disabled | All | 17/17 |
| error / invalid | Spectrum, Carbon | 2/17 |
| collapsed (expandable) | Carbon | 1/17 |
| expanded (expandable) | Carbon | 1/17 |
| quiet (no border) | Spectrum | 1/17 |

---

### Exclusion Patterns

- Autocomplete/suggestions: only 4-5 systems include this; most keep the search input pure and compose suggestions separately
- `loading` state: only Ant Design includes this; most systems leave async feedback to the application layer
- `enterButton` / explicit submit: most systems rely on Enter key; Ant Design and GOV.UK are outliers in requiring visible submit buttons
- Landmark (`role="search"`): only Carbon auto-applies the landmark; most require consumer-added wrapping form element
- Scope selector (search within a category): Salesforce Lightning only; too domain-specific for most systems

---

### Building Block Candidates

- `Input` / `TextInput` — base input element with `type="search"`
- `Icon` (magnifier) — leading icon slot
- `Button` (icon) — clear button, submit button
- `Spinner` / `LoadingSpinner` — loading indicator slot
- `Form` / `landmark` wrapper — `role="search"` or `<search>` HTML element

---

### Enum / Configuration Properties

| Property | Options | Default |
|----------|---------|---------|
| `size` | `"sm"`, `"md"`, `"lg"` | `"md"` |
| `variant` | `"outlined"`, `"filled"`, `"quiet"` | `"outlined"` |
| `enterKeyHint` | `"search"`, `"go"`, `"enter"`, `"next"`, `"done"` | `"search"` |
| `onSearch source` | `"input"` (keyboard), `"clear"`, `"button"` | — |

---

### A11y Consensus

| Aspect | Consensus |
|--------|-----------|
| **Role** | `<input type="search">` provides `role="searchbox"` natively; supplement with a landmark (`role="search"` or `<search>`) on the form wrapper |
| **ARIA** | `aria-label` or visible `<label>` required on the input; `aria-label` on the `role="search"` landmark (e.g., "Site search", "Filter results") |
| **Keyboard** | Enter submits; Escape clears and/or dismisses (Carbon documented; others inconsistent); clear button focusable |
| **Clear button** | Must have `aria-label="Clear search"` — icon-only without label is the most common a11y failure |
| **Loading** | `aria-busy="true"` on input during API call; `aria-live="polite"` region to announce result counts |
| **APG Pattern** | No dedicated APG Search Input pattern; closest is Searchbox (https://w3c.github.io/aria/#searchbox) |
| **Results** | Dynamic results need `aria-live="polite"` region with result count announcement — no system provides this automatically |
| **GOV.UK rule** | Submit button must be visible text "Search", not icon-only — screen magnifier research finding |

---

## What Everyone Agrees On

1. **Magnifier icon in the leading slot** — all 17 systems with a dedicated Search include a search icon in the leading position; this is the universal visual convention.
2. **Clear button appears on value entry** — the majority pattern; clear button is hidden when empty, visible when there is content.
3. **`type="search"` on the input element** — provides native searchbox role and Escape-to-clear browser behavior in most implementations.
4. **Placeholder text and visible label are different concerns** — placeholder is not a replacement for a label; all systems with documented a11y guidance enforce this.
5. **`onChange` / `onSubmit` are semantically different** — whether exposed as separate callbacks or unified with discriminators, the distinction between every-keystroke and explicit-submit is universally recognized.
6. **Search is a landmark** — wrapping the search input in `role="search"` or `<search>` / `<form role="search">` for landmark navigation is the correct a11y pattern; Spectrum enforces the label, Carbon auto-applies the landmark.
7. **No system handles search results announcements** — all systems leave `aria-live` result announcements to the application layer; this is the most consistent gap across all 24 systems.

---

## Where They Disagree

1. **Dedicated component vs. configured Input?**
   Option A (Spectrum, Carbon, Polaris, Ant, Fluent 2, Gestalt): dedicated Search component with search-specific API.
   Option B (Primer, Evergreen, Radix, Chakra): `Input type="search"` + icon slot; no dedicated component.

2. **`onChange` vs. `onSubmit` vs. unified `onSearch`?**
   Option A (Spectrum): strict separation — `onChange` for every keystroke, `onSubmit` for Enter only.
   Option B (Ant): unified `onSearch` with `info.source` discriminator.
   Option C (Carbon): single `onChange`; Escape is the only special event documented separately.

3. **Should the clear button be automatic or optional?**
   Option A (Polaris): automatic, no override — ecosystem consistency.
   Option B (most others): clear button present but behavior/visibility controlled by props.

4. **Loading/async state: built-in or external?**
   Option A (Ant): `loading` prop built into the search input — spinner replaces icon.
   Option B (all others): loading feedback is the application's responsibility.

5. **Expandable/collapsible variant?**
   Option A (Carbon): `expandable` collapses to icon button in dense toolbars.
   Option B (all others): no expandable pattern; search always occupies full input width.

6. **Icon-only submit button vs. labeled submit button?**
   Option A (most): no explicit submit button; Enter is the submission mechanism.
   Option B (Ant, GOV.UK): visible submit button. GOV.UK requires text ("Search"), not icon.

7. **Simple search input vs. command palette?**
   Option A: SearchField/SearchInput — text input with magnifier, clear, submit.
   Option B (shadcn Command, Mantine Spotlight): full command palette with fuzzy matching, action items, keyboard navigation — a different component archetype entirely.

---

## Visual Patterns Found

### Standard search field

```
┌─────────────────────────────────────────────────────────────────┐
│  Search products                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🔍  Search...                                         ✕  │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ← magnifier (leading)              clear button (trailing) →  │
└─────────────────────────────────────────────────────────────────┘
```

### With explicit submit button (Ant Design `enterButton`)

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────┐ ┌──────────┐  │
│  │ 🔍  Enter search term...               ✕  │ │  Search  │  │
│  └────────────────────────────────────────────┘ └──────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Expandable variant (Carbon)

```
Before expand:
┌──────────────────────────────────────────────────────────────┐
│  [toolbar items...]    [🔍]                                  │
└──────────────────────────────────────────────────────────────┘

After expand / focus:
┌──────────────────────────────────────────────────────────────┐
│  [toolbar items...]  ┌────────────────────┐ [✕]             │
│                      │ 🔍  Filter...      │                  │
│                      └────────────────────┘                  │
└──────────────────────────────────────────────────────────────┘
```

### SearchBar + SearchView (M3 mobile)

```
Normal state (SearchBar):
┌──────────────────────────────────────────────────────────────┐
│  ☰   🔍 Search                                          👤  │
└──────────────────────────────────────────────────────────────┘

Active state (SearchView — full screen):
┌──────────────────────────────────────────────────────────────┐
│  ←   ┌──────────────────────────────────┐  ✕               │
│      │ query text here                  │                    │
│      └──────────────────────────────────┘                    │
│  ─────────────────────────────────────────────────────────   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Suggestion 1                                           │ │
│  │  Suggestion 2                                           │ │
│  │  Suggestion 3                                           │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Command palette (shadcn/ui Command, Mantine Spotlight)

```
┌──────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🔍  Type a command or search...                        │  │
│  └────────────────────────────────────────────────────────┘  │
│  ─────────────────────────────────────────────────────────   │
│  Navigation                                                   │
│  ▶  Dashboard                                    /dash       │
│  ▶  Settings                                     /settings   │
│  ─────────────────────────────────────────────────────────   │
│  Actions                                                      │
│  ▶  Create new project                                        │
│  ▶  Invite team member                                        │
│  ─────────────────────────────────────────────────────────   │
│  ↑↓ navigate   ↵ open   Esc dismiss                          │
└──────────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

| Risk | Severity | Notes |
|------|----------|-------|
| Missing `aria-live` for search results | HIGH | All 24 systems leave result announcements to the application layer. Search results that update dynamically without an `aria-live="polite"` region are invisible to screen reader users. This is the most universally missing accessibility feature in search implementations. |
| Icon-only clear button without accessible label | HIGH | The single most common accessibility failure in search implementations across all tiers — an X button without `aria-label="Clear search"` is a common WCAG 4.1.2 violation. Gestalt's required `accessibilityClearButtonLabel` prop is the only system that enforces this. |
| Conflating `onChange` and `onSubmit` | MEDIUM | Using `onChange` to trigger server queries (API call per keystroke) is the most common search performance bug. Spectrum's separation of these callbacks at the API level is the most effective prevention. Use debouncing as a minimum if a single callback is used. |
| Command palette vs. search field confusion | MEDIUM | shadcn/ui's Command and Mantine's Spotlight are fundamentally different from a SearchField — they require a predefined action/item dataset. Using the command palette pattern for open-ended text search is an architectural mismatch. |
| Missing `role="search"` landmark | LOW | Only Carbon auto-applies the search landmark; most systems require consumers to add `role="search"` or wrap in `<search>`. Without the landmark, keyboard users cannot navigate directly to search via JAWS/NVDA landmark shortcuts. |

---

## Next Steps

1. **Decide the component scope** — input-only (Primer/Evergreen model) vs. input + built-in autocomplete vs. full command palette. These are three distinct components; do not conflate them.
2. **Separate `onChange` from `onSearch`/`onSubmit`** — follow Spectrum's pattern to prevent the most common search UX bug.
3. **Add `role="search"` to the landmark wrapper automatically** — do not require consumers to add this; expose `aria-label` on the search component to feed the landmark.
4. **Require accessible label for the clear button** — follow Gestalt's `accessibilityClearButtonLabel` pattern; required prop prevents the most common search a11y failure.
5. **Decide on `loading` state** — if remote search is in scope, include `loading` prop from the start; retrofitting async state is harder than including it initially.
