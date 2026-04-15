---
component: search
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Search — All Systems Digest

## Material Design 3
**Approach**: Full experience architecture — SearchBar (persistent docked affordance) + SearchView (full-screen or docked modal for search session). Adaptive: full-screen takeover on mobile, inline panel on large screens. Most architecturally ambitious search system of all six.
**Key decisions**:
- SearchBar + SearchView separation; SearchView sets sibling views to importantForAccessibility=no when open (robust SR modal management)
- `autoShowKeyboard` true by default; opening SearchView = user wants to type, extra tap to focus is wasted friction
- Predictive Back gesture wired automatically; no per-app developer integration needed
**Notable API**: `autoShowKeyboard`; `app:liftOnScroll` (elevation on scroll); `adaptiveMaxWidthEnabled` (prevents 100% width on tablets); `app:textCentered` (expressive/discovery app variant)
**A11y**: SearchView marks background sibling views inaccessible (prevents SR focus escaping to stale content); role="search" + aria-label on web; Enter submits, Escape/Predictive Back dismisses.
**Best at**: Full search lifecycle — SearchBar→SearchView transition with adaptive layout, modal SR management, and system gesture integration. **Missing**: No scope selector, no async loading state in component.

## Spectrum (Adobe)
**Approach**: Dedicated SearchField component (NOT a TextField variant). `onChange` (every keystroke) vs. `onSubmit` (Enter only) separated at API level — prevents expensive API calls on every character. `isQuiet` for toolbar/embedded contexts. Required label enforced.
**Key decisions**:
- `onChange`/`onSubmit` separation prevents expensive mid-type API calls — removes an entire class of performance bugs at component contract level
- Separate component (not TextField+prop); adds `onSubmit`, `onClear`, `enterKeyHint` that don't belong on general text input
- Label or aria-label enforced (hard constraint); missing label is a production-scale a11y violation for Adobe's external dev audience
**Notable API**: `onSubmit(value)`; `onClear()`; `isQuiet`; `enterKeyHint` (mobile keyboard action label); `validate`; `validationBehavior`
**A11y**: `<input type="search">` native (AT announces "search input" automatically); aria-errormessage+aria-describedby; Escape-to-clear not explicitly documented (gap).
**Best at**: a11y enforcement and onChange/onSubmit separation preventing most common search UX bugs. **Missing**: No loading/async state, no scope selector, no documented Escape-to-clear.

## Carbon (IBM)
**Approach**: Escape clears input (most explicit among all systems). Expandable variant collapses to icon until focused (saves toolbar real estate). Three sizes (sm/md/lg). `role="search"` landmark wrapper with `aria-label` from `labelText`. Explicitly documents when NOT to use Search.
**Key decisions**:
- Escape = clear (and collapse if expandable); consistent with OS dismiss patterns; power users in enterprise tools operate primarily via keyboard
- Expandable variant; dense data table toolbars need space — full input shown when never used wastes horizontal space
- `role="search"` wrapper div creates landmark; SR users navigate directly via landmark keys (F key in JAWS/NVDA)
**Notable API**: `size` (sm|md|lg); `expandable` (boolean); `labelText` (required, populates aria-label on landmark wrapper); `closeButton` (explicit clear/collapse in expandable)
**A11y**: Most explicit Escape-to-clear documentation; role="search" landmark wrapper; VoiceOver gotcha (reads both label + placeholder if different) explicitly documented.
**Best at**: Keyboard standards and enterprise density control — explicit Escape contract, three sizes, expandable pattern. **Missing**: No async loading state, no scope selector, no results management.

## Polaris (Shopify)
**Approach**: Minimal convention-driven — automatic clear button (no consumer override, ensures ecosystem consistency across thousands of Shopify apps). Web component for app extensions (not just React). Live-filter-as-you-type model (no submit button; search is always instant filter).
**Key decisions**:
- Automatic clear button with no override; ecosystem consistency across 1000s of apps > individual flexibility
- Web component architecture; App Extensions sandbox can't afford full React bundle per component
- No submit button; Shopify merchant search is live-filter of local dataset, not server query — submit gate would add lag
**Notable API**: `onClearButtonClick` (separate from onChange); `focused` (controlled focus placement, e.g., "/" shortcut to activate search); `labelAccessibilityVisibility`
**A11y**: `<label>` visually hidden (not aria-label) for maximum AT compatibility; console warnings in dev for missing accessibility props; Escape-to-clear not documented.
**Best at**: Ecosystem consistency enforcement — automatic clear button ensures uniform behavior across all Shopify apps. **Missing**: No loading state, no Escape-to-clear, no size variants, minimal API by design.

## Atlassian
**Approach**: No dedicated Search component — fragmentation is intentional. Simple contexts: Textfield + search icon + clear via elemAfterInput slots. Product-level: @atlaskit/search-dialog (global Jira/Confluence search with dialog overlay, pre-search state, sections). Placeholder acceptable for search as explicit a11y exception.
**Key decisions**:
- No unified Search component; Jira inline filter, Atlassian nav global search, Confluence full-page search each need fundamentally different interaction models
- `<label>` required (not aria-label); label element has broader AT+older-browser support — stronger stance than any other system
- search-dialog replaces deprecated quick-search; decoupled from navigation component, reusable across products
**Notable API**: `elemBeforeInput`/`elemAfterInput` (slots for search icon + clear button); `isCompact`; no canonical Search props — composed from Textfield primitives
**A11y**: Label element over aria-label (explicit documented preference); search-dialog manages aria-live for results; role="search" must be manually applied by consumer; no built-in Escape-to-clear.
**Best at**: Accessible primitive quality for composing custom search patterns. **Missing**: No canonical documented Search component; teams compose manually → inconsistent implementations.

## Ant Design
**Approach**: `Input.Search` sub-component of Input family. `enterButton` prop for explicit search button (customizable ReactNode) — unique among all systems. `loading` for async feedback (only system with this built in). `onSearch` unified callback with `info.source` discriminating keyboard/button vs. clear triggers.
**Key decisions**:
- `enterButton` explicit submission button; Chinese enterprise UX convention — clear button affordance for users who don't default to Enter
- `loading` built-in spinner replacing search icon during API calls; cause-and-effect visible in input where user triggered action
- `onSearch` unified + `info.source`; one place to handle all search outcomes; discriminates clear from submission for different responses
**Notable API**: `enterButton` (boolean|string|ReactNode); `loading`; `onSearch(value, event, {source})`; `allowClear` ({clearIcon} customizable); `size` (large|middle|small)
**A11y**: No automatic role="search" landmark; no aria-busy/aria-live for loading state SR feedback; no documented Escape-to-clear — feature-rich but lags Spectrum/Carbon in keyboard+SR standards.
**Best at**: Complete explicit-submit search — enterButton + loading + unified onSearch is the best API for server-side async enterprise search. **Missing**: No role="search" automation, no loading SR feedback, no Escape-to-clear docs.
