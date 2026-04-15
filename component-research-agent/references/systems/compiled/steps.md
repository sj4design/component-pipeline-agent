---
component: steps
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — deliberately removed from MD3
**Approach:** MD3 removed the Stepper component that existed in MD2. The rationale: multi-step wizard flows vary too significantly across products for a standard component to be useful without creating more constraints than it solves. MD3 recommends `LinearProgressIndicator` with step-count text ("Step 2 of 4") as the progress pattern. No navigable stepper guidance exists.
**Key Decisions:**
- [HIGH] Deliberate removal from MD3: MD2's stepper was misused for flows with too many steps, branching logic, or mobile-unfriendly layouts — removal steers teams toward context-specific solutions
- [MED] LinearProgressIndicator as progress substitute: communicates progress without step-label overhead; works at any viewport width
- [MED] No navigation stepper pattern: back-navigation uses the system back button in M3, not step indicators — mobile-first navigation model
**Notable API:** No component. `LinearProgressIndicator` + text ("Step 2 of 4") for progress indication.
**A11y:** Custom implementations must use `aria-current="step"`, `<nav aria-label="Progress">` wrapper, and `<ol>` for step items. No M3 guidance provided.
**Best at:** Nothing for this pattern — M3 provides only the simplest progress indicator as a substitute.
**Missing:** Step labels, step states (complete/error), navigable step indicators, and any accessibility guidance for wizard flows.

---

## spectrum
**Component:** Absent — prioritization gap
**Approach:** Spectrum has no Steps component. Adobe's product flows use panel-based and dialog-based workflows more than page-level wizard flows. When multi-step flows appear (Creative Cloud account setup, Commerce payment flow), they are product-specific implementations. React Aria provides focus management hooks (`useFocusRing`, state utilities) as building blocks, but no assembled Stepper component exists.
**Key Decisions:**
- [HIGH] Absent: product diversity prevents a generalized component — step contents, counts, and navigation patterns vary too much across Photoshop, Experience Manager, and Commerce
- [MED] React Aria hooks as composition primitives: `useFocusManagement` and `@react-stately` for multi-step state are available but not assembled into a Stepper
- [MED] Note: Spectrum has a `Stepper` component for number input (not wizard navigation) — naming collision that creates confusion when searching documentation
**Notable API:** No Steps component. `ProgressBar` for numeric progress; React Aria focus management hooks for custom implementations.
**A11y:** Recommended custom pattern: `<nav aria-label="Progress">` with `<ol>`, `aria-current="step"` on active step, `role="list"` for step indicators.
**Best at:** Nothing for this pattern — React Aria primitives provide the accessibility building blocks but the assembled component is absent.
**Missing:** Assembled Steps component with step states, navigation, and correct ARIA patterns.

---

## carbon
**Component:** Progress Indicator (with invalid/error state)
**Approach:** Carbon calls it Progress Indicator, emphasizing progress communication over navigation scaffolding. Four step states: complete, current, incomplete, and `invalid/error` — the error state (unique to Tier 1) displays an error icon for steps that have failed backend validation. Supports horizontal (default) and vertical orientations. Non-interactive by default; `onChange` enables clickable steps for non-linear navigation.
**Key Decisions:**
- [HIGH] Invalid step state: Carbon is the only Tier 1 system with a built-in error state for individual steps — IBM's cloud provisioning workflows require flagging completed steps that failed background validation
- [MED] Horizontal + vertical orientation: `vertical` prop switches to sidebar step navigation for long forms (7+ steps); horizontal for standard 5-or-fewer-step wizard headers
- [MED] Non-interactive default with `onChange` opt-in: visual-only by default; `onChange` makes steps clickable; Carbon documents when each mode is appropriate (linear vs. non-linear navigation)
**Notable API:** `currentIndex: number`; `onChange: (index) => void` for interactive mode; `vertical: boolean`; `spaceEqually: boolean`; per-step `invalid: boolean` for error state
**A11y:** Step items use `aria-current="step"` on active step; wrapped in `<ol>` for sequential semantics; per-step state announced ("Step 1, complete", "Step 3, invalid"). In interactive mode, steps are `<button>` elements with Tab focus.
**Best at:** Invalid step state for enterprise workflows where individual steps can fail independently, and detailed per-step screen reader state announcements.
**Missing:** Step description text; inline/compact orientation; step content panel management (Progress Indicator is navigation-only, not a scaffold for step content).

---

## polaris
**Component:** Absent — progressive disclosure philosophy
**Approach:** Polaris has no Steps component by philosophy: Shopify's design team argues that multi-step wizard flows are a symptom of complex IA that should be simplified rather than scaffolded. Polaris promotes progressive disclosure (reveal complexity on demand) over sequential wizard flows. For genuinely sequential content, numbered Card components with heading text serve as an informal steps pattern.
**Key Decisions:**
- [HIGH] Absent by design philosophy: Polaris documentation explicitly discourages wizard flows in favor of progressive disclosure — merchant research shows higher abandonment rates for wizard-style forms
- [MED] Numbered Card layouts as informal steps: "1. Add your products", "2. Customize your theme" treated as content structure rather than navigation
- [MED] No recommended pattern for multi-step forms: for the rare valid sequential form use case, no Polaris pattern or guidance is provided
**Notable API:** No component. `Card` with numbered heading text; `ProgressBar` for completion percentage (no step labels).
**A11y:** No prescribed pattern. Custom implementations must manage focus movement between steps and announce step transitions via `aria-live`.
**Best at:** Articulating why to avoid wizard flows — Polaris's progressive disclosure guidance is the clearest anti-wizard stance in Tier 1.
**Missing:** Any formal Steps component, labeled progress indicator, navigable step indicator, and wizard flow a11y guidance.

---

## atlassian
**Component:** Progress Tracker (horizontal linear, visited-navigable)
**Approach:** Atlassian's Progress Tracker is for linear wizard flows. The "visited" state (distinct from "completed") makes all previously navigated steps clickable — users can return to any visited step without completing the current one. Navigation uses `<a href>` on visited steps and `<span>` on unvisited — semantically correct link vs. non-interactive distinction. Horizontal-only, no vertical orientation.
**Key Decisions:**
- [HIGH] Visited state = navigable: any step the user has reached is clickable, regardless of completion status — Atlassian research found users frequently want to reconsider choices mid-wizard
- [MED] `<a>` for visited, `<span>` for unvisited: semantically correct HTML — screen readers correctly identify navigable and non-navigable steps without additional ARIA
- [MED] Horizontal-only: scoped narrowly to the most common wizard header use case; no vertical option
**Notable API:** `items: [{id, label, percentageComplete}]`; `render` for custom step item rendering; step clicking navigates via `href` on items; `<nav aria-label>` wrapper
**A11y:** `<nav>` wrapper; `aria-current="step"` on current step; visited steps as `<a>` links; unvisited as `<span>`. Best navigation semantics for a Progress Tracker in Tier 1.
**Best at:** Navigation semantics — `<nav>`, `<a>` for visited, `<span>` for unvisited is the most semantically correct a11y implementation of a stepper.
**Missing:** Vertical orientation; error state on individual steps; description/subtitle per step; inline/compact mode.

---

## ant-design
**Component:** Steps (most feature-rich — 5 layouts, 5 states)
**Approach:** Ant Design's Steps is the most comprehensive in Tier 1: 5 layout types (horizontal, vertical, inline, dot, navigation), 5 step states (wait, process, finish, error, warning), description and subtitle per step, and partial-completion percentage on the current step. The `inline` type embeds steps within a table row — unique in Tier 1. The `navigation` type makes all steps clickable as tabs regardless of visit state.
**Key Decisions:**
- [HIGH] Five layout types: `inline` for embedding step progress in table rows (Alibaba order tracking); `navigation` for tab-style any-step-clickable flows (independent step categories)
- [HIGH] Warning state (unique): `status="warning"` flags a non-blocking issue — allows progression despite the concern, unlike Carbon's `invalid` which indicates hard failure
- [MED] `percent` on current step: shows partial completion within the active step — unique feature for in-step progress within a multi-step wizard
**Notable API:** `type: "default" | "navigation" | "inline"`; `direction: "horizontal" | "vertical"`; per-step `status: "wait" | "process" | "finish" | "error" | "warning"`; `description`; `subTitle`; `percent: number`
**A11y:** `role="tablist"` in navigation mode; `role="list"` in default mode; `aria-current="step"` on active step; `aria-disabled` on non-navigable steps. Dual ARIA model correctly reflects the semantic difference between navigable and progress-only modes.
**Best at:** Feature breadth — inline mode for table row embedding, warning state for non-blocking issues, and description+subtitle per step are unique capabilities covering the full range of enterprise wizard patterns.
**Missing:** `prefers-reduced-motion` handling for step transition animations; inline mode a11y documentation for dynamic table row contexts.
