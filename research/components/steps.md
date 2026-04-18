---
component: steps
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Steps — Cross-System Research

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| Material Design 3 | Deliberate removal from MD3; MD2 stepper was misused for flows with too many steps or branching logic | `LinearProgressIndicator` + "Step 2 of 4" text |
| Spectrum (Adobe) | Product diversity prevents generalization; naming collision with Spectrum's number-input "Stepper" adds confusion | `ProgressBar` for progress; React Aria hooks (`useFocusRing`, `@react-stately`) as composition primitives |
| Polaris (Shopify) | Absent by design philosophy; Shopify research shows higher abandonment in wizard-style forms; progressive disclosure preferred | Numbered `Card` components with heading text as informal steps |
| GitHub Primer | Explicit avoidance of wizard patterns; multi-step flows use separate pages | Full-page sequences, no inline steps |
| shadcn/ui | Not present; community stepper components available | Community packages or consumer composition |
| REI Cedar | Not present in public documentation | Not documented |
| Radix UI | No primitive; stepper has no dedicated WAI-ARIA role | Composition from Flex/Text/Badge with `role="list"` + `aria-current="step"` |
| Fluent 2 | Research-backed absence: showing full step sequence simultaneously increased abandonment in Microsoft's broad user base | Dialog with step-specific content swap; "Step 2 of 4" text in header |
| Gestalt (Pinterest) | Mobile-first argument: horizontal step indicators with labels compress to unusability on narrow screens | Modal/Sheet sequences per step; "Step X of Y" text in modal header |
| Evergreen (Segment) | Conditional flows use Dialog/SideSheet sequences; generic stepper API would require too much configuration for Segment's branching step logic | Dialog/SideSheet sequences |

---

## How Systems Solve It

### Carbon (IBM) — Progress Indicator

Carbon calls it Progress Indicator, deliberately emphasizing progress communication over navigation scaffolding. It defines four step states: complete, current, incomplete, and `invalid/error` — the error state (unique among all 24 systems) renders an error icon for steps that have failed backend validation after the user has moved forward. By default the component is visual-only; passing `onChange` makes steps clickable, enabling non-linear navigation. Carbon supports both horizontal (default, for 5-or-fewer wizard headers) and vertical (for 7+ steps in sidebar form navigation) orientations.

The most distinctive decision is the `invalid` per-step state: IBM's cloud provisioning workflows require flagging completed steps that failed background validation. This is a hard-failure state unlike Ant Design's non-blocking `warning` state. The `spaceEqually` prop distributes step indicators evenly regardless of label length, important in internationalized UIs where step label widths vary significantly.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `invalid` step state | IBM cloud provisioning needs to flag completed steps that failed backend validation after the user moved forward | HIGH | Critical if your workflow has async server-side validation per step |
| Non-interactive by default, `onChange` opt-in | Visual progress communication should not imply navigability; `onChange` makes intent explicit | HIGH | Decide whether your wizard is linear-enforced or free-navigation at design time |
| Horizontal + vertical orientation | Long forms (7+ steps) need sidebar navigation; horizontal for standard wizard headers | MED | Use vertical for dense multi-step forms in admin panels |
| `spaceEqually` prop | Internationalized UIs need equal spacing regardless of label length variation | MED | Enable for multi-language products |

**Notable Props:** `currentIndex: number`, `onChange: (index) => void`, `vertical: boolean`, `spaceEqually: boolean`, per-step `invalid: boolean`

**Accessibility:** Step items use `aria-current="step"` on the active step; wrapped in `<ol>` for sequential semantics; per-step state announced verbally ("Step 1, complete", "Step 3, invalid"). In interactive mode, steps are `<button>` elements with Tab focus.

---

### Atlassian — Progress Tracker

Atlassian's Progress Tracker is scoped narrowly: horizontal linear wizard flows only. The most architecturally significant decision is the "visited" state — once a user reaches a step, it becomes permanently clickable regardless of whether it is "complete." This reflects Atlassian's user research finding that people frequently want to reconsider choices made earlier in a wizard without completing the current step first.

Navigation is implemented through semantically correct HTML: visited steps render as `<a href>` links, unvisited steps render as `<span>` — no extra ARIA needed to communicate navigability because the HTML element itself carries that meaning. The `render` prop allows custom step item rendering for product-specific affordances.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Visited = navigable (regardless of completion) | Jira research: users frequently reconsider mid-wizard choices before completing the current step | HIGH | Use if your users need to revise earlier decisions without submitting the current step |
| `<a>` for visited, `<span>` for unvisited | Native HTML semantics remove the need for extra ARIA; screen readers identify navigable vs. non-navigable correctly without `aria-disabled` | HIGH | Best semantic navigation pattern in all 24 systems |
| Horizontal-only | Scoped to most common wizard header use case; vertical excluded to keep API narrow | MED | Add custom vertical layout if your wizard is embedded in a sidebar |

**Notable Props:** `items: [{id, label, percentageComplete}]`, `render` for custom step item, `<nav aria-label>` wrapper

**Accessibility:** `<nav>` wrapper; `aria-current="step"` on current step; visited steps as `<a>` links; unvisited as `<span>`. Most semantically correct navigation implementation across all 24 systems.

---

### Ant Design — Steps

Ant Design's Steps is the most feature-complete implementation across all 24 systems: 5 layout types, 5 step states, subtitle and description per step, and partial-completion percentage for the active step. The `inline` type is unique — it embeds step progress inside a table row for order tracking contexts (Alibaba e-commerce) where each row has its own multi-stage lifecycle. The `navigation` type makes all steps clickable as tabs regardless of visit state.

The `warning` state is the only non-blocking problem state across all 24 systems — it signals a concern without blocking progression, unlike Carbon's hard-failure `invalid` state. The `percent` prop on the current step shows partial completion within the active step itself, enabling granular in-step progress for long operations.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| 5 layout types (default/navigation/inline/dot/vertical) | Alibaba's product portfolio spans order tracking in tables (inline), category browsing (navigation), and standard checkout (default) — different layouts for different contexts | HIGH | Choose one or two types; shipping all five adds unnecessary complexity for most products |
| `warning` state (non-blocking issue) | Allows progression despite concerns; distinct from `error` which blocks; covers soft-validation scenarios | HIGH | Use if your wizard has non-blocking validation warnings (e.g., "this setting is unusual but valid") |
| `percent` on current step | Shows in-step progress for operations that take time (uploading files, running checks) | MED | Useful for wizard steps that contain async operations |
| `subTitle` + `description` per step | Enterprise flows need more than a step label to orient users | MED | Keep descriptions short; visible space is limited in horizontal layouts |

**Notable Props:** `type: "default" | "navigation" | "inline"`, `direction: "horizontal" | "vertical"`, per-step `status: "wait" | "process" | "finish" | "error" | "warning"`, `description`, `subTitle`, `percent: number`

**Accessibility:** `role="tablist"` in navigation mode; `role="list"` in default mode; `aria-current="step"` on active step; `aria-disabled` on non-navigable steps. Dual ARIA model correctly reflects the semantic difference between navigable and non-navigable modes.

---

### Twilio Paste — ProgressSteps

Paste's ProgressSteps covers the core wizard indicator use case with complete/current/incomplete/error states and horizontal/vertical orientation support. The error state per step is critical for multi-step forms where validation errors on a prior step are discovered after the user has moved forward. Like Carbon, Paste treats the Steps component as an indicator rather than a wizard container — step content is rendered independently.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Error state per step | Twilio Console workflows involve API configuration steps that can fail after submission; users need to navigate back to the failed step | HIGH | Use for workflows with server-side per-step validation |
| Horizontal + vertical orientation | Console has both wizard headers and sidebar step navigation contexts | MED | Match orientation to your layout constraints |

**Notable Props:** Step states: complete/current/incomplete/error; orientation: horizontal/vertical

**Accessibility:** `aria-current="step"` on active step; `<ol>` ordered list; completed steps communicate state via visually-hidden text.

---

### Salesforce Lightning — Progress Indicator + Path

Lightning provides two variants: Progress Indicator (standard wizard pattern) and Path (chevron/arrow chain for CRM pipeline stages). The Path variant is unique across all 24 systems — it is not a generic wizard indicator but a stage progression tracker for Sales Cloud opportunities, cases, and leads. The chevron shape visually encodes "pipeline stage" rather than "wizard step." Both variants support error and warning states per step, matching Carbon's error coverage while adding the non-blocking warning from Ant Design.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Path variant as pipeline stage tracker | Salesforce CRM workflows are stage-based (lead → qualified → proposal) not form-wizard-based; chevron shape encodes "pipeline" semantics | HIGH | Consider domain naming if your steps represent workflow stages rather than form steps |
| Error + warning per step | CRM workflows have both blocking and non-blocking step issues | MED | Mirrors the combined Carbon + Ant Design error/warning coverage |

**Notable Props:** `type: "base" | "path"`, per-step `error`, `warning` states

**Accessibility:** Standard `aria-current="step"` pattern; path variant uses button elements for navigable stages.

---

### Chakra UI — Steps (v3)

Added in Chakra v3, the Steps component supports horizontal and vertical orientation with numbered indicators or custom icons. It is a navigation indicator only — no inline content panels — using `aria-current="step"` on the active step. Navigation controls are not built in; consumers wire their own next/previous buttons.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Display-only (no inline content panels) | Separation of concerns; step content rendering is a consumer responsibility | MED | Simple to integrate but requires more wiring |
| Custom icons per step | Visual differentiation for step categories in complex wizards | LOW | Use sparingly; numbered indicators cover most use cases |

**Notable Props:** `orientation: "horizontal" | "vertical"`, numbered indicators or custom icons

**Accessibility:** `aria-current="step"` on active step; no built-in nav controls.

---

### GOV.UK — Step by Step Navigation

GOV.UK's step-by-step navigation is categorically different from every other implementation: it is an inter-page journey pattern, not an intra-page wizard. The component links users through a sequence of separate pages, government services, and external websites — applying for a driving licence involves the DVLA, the medical register, the Highways Agency, and payment processors, which no single-page component can span. Steps are accordion-style expandable sections listing sub-tasks within each stage, using `<ol>` for implicit numbering and `aria-expanded` on step triggers.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Cross-page journey pattern | Government processes span multiple organizations and URLs; single-page wizard component cannot model this | HIGH | Reference this only if your "steps" involve navigation to separate pages or external services |
| Accordion-style expandable steps | Sub-tasks within a step may be numerous; progressive disclosure within each step reduces cognitive load | MED | Use expandable steps if each stage has multiple actions the user needs to see |

**Notable Props:** `<ol>` list; `aria-expanded` on step triggers; "Part of" indicator on individual step pages

**Accessibility:** `<ol>` for sequential semantics; `aria-expanded` on triggers; each sub-page displays a "Part of [journey name]" indicator to maintain context.

---

### Base Web (Uber) — ProgressSteps

Base Web's ProgressSteps is a wizard container — step content is rendered as the `content` prop on each step, making the component the orchestrator of the multi-step form flow. Provides `NumberedStep` (with step number indicator) and `Step` (icon-only indicator) variants. Vertical-only; no horizontal orientation. Full Overrides customization system for deep styling.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Wizard container architecture (content prop) | Co-locates step metadata with step content; simpler for consumer code | HIGH | Container approach reduces wiring but increases coupling between wizard navigation and step content |
| Vertical-only | Uber's internal admin tools use vertical step navigation; horizontal excluded | MED | Requires custom CSS for horizontal layouts |

**Notable Props:** `content` prop on each step for inline content; `NumberedStep` vs. `Step` variants; full Overrides

**Accessibility:** Standard `aria-current="step"`; wizard container means no separate focus management needed for content transitions.

---

### Mantine — Stepper

Mantine's Stepper is the most complete T3 wizard container: inline step content via `Stepper.Step` children, `Stepper.Completed` for the final success state, per-step loading icon for async step validation, and `allowNextStepsSelect` prop to gate or open back-navigation. Supports horizontal and vertical orientation.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `Stepper.Completed` final state | Wizard completion needs a distinct visual state; avoiding consumer logic for "all steps done" | MED | Simplifies checkout/onboarding success screen integration |
| `allowNextStepsSelect` | Can lock forward steps until current is complete, or allow free navigation for reference workflows | HIGH | Critical architectural decision for linear vs. non-linear wizard |
| Loading icon per step | Async step validation (background checks, API calls) needs in-step loading feedback | MED | Use for wizard steps with server-side operations |

**Notable Props:** `Stepper.Step` children for inline content, `Stepper.Completed`, `allowNextStepsSelect: boolean`, loading icon per step

**Accessibility:** `aria-current="step"` on active step; horizontal and vertical.

---

### Orbit (Kiwi.com) — Wizard

Orbit names its component "Wizard" — the clearest example of domain-driven naming in all 24 systems. Every production instance maps to one specific journey: the flight booking funnel. Linear progression is enforced (no step skipping). On mobile, the component collapses to "Step 3 of 6" text to avoid the unusability of horizontal step labels on narrow viewports. The `<nav aria-label="Booking progress">` wrapper is explicit about the component's purpose.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Domain name "Wizard" instead of "Steps" | Every instance is the flight booking funnel; naming encodes the domain constraint | MED | Consider domain naming if your steps component is used in exactly one context |
| Mobile compact mode ("Step 3 of 6") | Horizontal step labels compress to unusability on narrow screens | HIGH | Always implement a compact mobile fallback for horizontal step indicators |
| Linear enforcement (no step skipping) | Booking funnel requires completing each step before moving forward | HIGH | Explicit architectural choice; contrast with Atlassian's visited=navigable approach |

**Notable Props:** Linear enforcement; mobile compact text mode; `<nav aria-label="Booking progress">`, `aria-current="step"`, `aria-disabled` on pending steps

**Accessibility:** `<nav>` landmark; `aria-current="step"`; `aria-disabled` on pending steps; mobile compact text alternative.

---

### Nord (Nordhealth) — Steps

Nord's Steps are built for clinical sequential workflows: registration, prescription, assessment. Non-navigable locked steps are a regulatory requirement — once a clinical step is submitted, it cannot be revisited for audit compliance. This is the opposite architectural philosophy from Atlassian's "visited = navigable." Numbered indicators are the default (icons avoided in clinical contexts to reduce interpretation errors). Horizontal and vertical supported.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Non-navigable locked steps | Regulatory audit compliance; submitted clinical steps must be immutable | HIGH | Use this pattern for any workflow with regulatory or legal audit requirements |
| Numbered indicators default | Clinical contexts must minimize icon interpretation errors | MED | Prefer numbered indicators for compliance-heavy workflows |

**Notable Props:** Non-navigable locked steps; horizontal and vertical; `aria-current="step"`

**Accessibility:** `aria-current="step"`; `aria-disabled="true"` on all non-current steps (locked by design).

---

### Playbook (eBay/PayPal) — Stepper

Playbook's Stepper supports multi-step sales and service workflow guidance with dual React/Rails rendering. Medium confidence — less public documentation than Tier 1 systems.

**Notable Props:** Dual React/Rails rendering; sales/service workflow optimization

---

### Wise Design — Stepper

Multi-step financial onboarding flows. Low confidence — limited public documentation.

---

### Dell Design System — Steps/Stepper

Enterprise IT setup wizard flows. Low confidence — limited public documentation.

---

## Pipeline Hints

### Archetype Recommendation

**Navigation Indicator (not wizard container)** is the strongly recommended archetype for a general-purpose design system steps component.

Rationale: Wizard container architectures (Mantine, Base Web) tightly couple step metadata with step content, creating an API surface that explodes in complexity when steps have conditional logic, async validation, branching paths, or varying content types. Navigation indicator components (Carbon, Atlassian, Ant Design, Orbit) solve the hard problem — communicating position and status in a sequence — without owning the content rendering concern. Consumers wire their own next/previous navigation and conditionally render step content. This separation is consistently the more sustainable approach in enterprise systems.

Exception: if your primary use case is a simple, linear multi-step onboarding form with uniform step content, a wizard container (Mantine-style) reduces boilerplate.

---

### Slot Consensus Table

| Slot | Systems with it | Notes |
|------|----------------|-------|
| Step indicator (number/icon/check) | 11/14 (all with component) | Numbered default; checkmark for complete; error icon for invalid |
| Step label | 10/14 | Required in most systems; Carbon + Atlassian make it prominent |
| Step description/subtitle | 3/14 | Ant Design (`description`, `subTitle`), Carbon (not present), Playbook |
| Connector line between steps | 10/14 | Horizontal line (horizontal mode) or vertical line (vertical mode) |
| Step content panel (wizard container) | 3/14 | Mantine, Base Web, Orbit |
| "Show more / compact" fallback | 1/14 | Orbit mobile compact mode; GOV.UK "Part of" label |
| Completion state | 2/14 | Mantine `Stepper.Completed`; Ant Design `finish` state with custom content |

---

### Property Consensus Table

| Property | Values | Systems | Notes |
|----------|--------|---------|-------|
| `currentStep` / `currentIndex` | `number` | Carbon, Mantine, Base Web, Ant Design | Active step index (0-based or 1-based varies) |
| `direction` / `orientation` | `"horizontal" \| "vertical"` | Carbon, Paste, Mantine, Chakra, Nord | Horizontal default; vertical for sidebar forms |
| `onChange` / `onStepClick` | `(index: number) => void` | Carbon, Ant Design, Mantine | Makes steps interactive; omit for display-only |
| `size` | `"sm" \| "md" \| "lg"` | Carbon (`sm`/`md`/`lg`) | Compact/default/relaxed spacing |
| `type` | `"default" \| "navigation" \| "inline" \| "dot"` | Ant Design | Layout variant; `inline` is unique |
| Per-step `status` | `"wait" \| "process" \| "finish" \| "error" \| "warning"` | Ant Design | Most complete status set |
| Per-step `invalid` | `boolean` | Carbon | Hard-failure state |
| Per-step `label` | `string` | All (required) | Step display name |
| Per-step `description` | `string` | Ant Design, Paste | Supporting text below label |
| Per-step `subTitle` | `string` | Ant Design | Tertiary text beside label |
| Per-step `icon` | `ReactNode` | Ant Design, Mantine, Chakra | Custom step indicator |
| `percent` | `number (0-100)` | Ant Design | In-step partial completion percentage |
| `allowNextStepsSelect` | `boolean` | Mantine | Gate or open forward navigation |

---

### Boolean Properties Table

| Property | Default | Effect |
|----------|---------|--------|
| `interactive` / `onChange` presence | `false` | Enables clickable step navigation |
| `vertical` | `false` | Switches to vertical orientation |
| `spaceEqually` | `false` | Equal-width step distribution (Carbon) |
| `allowNextStepsSelect` | `true` | Whether future steps are clickable (Mantine) |
| Per-step `invalid` | `false` | Marks step as hard-failed (Carbon) |
| Per-step `disabled` | `false` | Non-navigable locked step (Nord) |

---

### State Coverage Table

| State | Systems with it | Notes |
|-------|----------------|-------|
| `wait` / `incomplete` / `pending` | 11/14 | Default state for not-yet-reached steps |
| `process` / `current` / `active` | 14/14 | Active step; always present |
| `finish` / `complete` | 11/14 | Successfully completed step |
| `error` / `invalid` | Carbon, Paste, Twilio, Lightning, Mantine | Hard-failure state; step requires correction |
| `warning` | Ant Design, Lightning | Non-blocking concern; can proceed |
| `visited` (navigable regardless of completion) | Atlassian | Distinct from complete; any reached step is clickable |
| `loading` | Mantine | Async validation in progress |
| `disabled` / `locked` | Nord, Orbit | Non-navigable; regulatory or linear enforcement |

---

### Exclusion Patterns

- **Never combine** `disabled` (locked) with `onChange` click handler — locked steps should not be interactive even when the parent passes an onChange. Guard with a conditional at the step level.
- **Warning and error are mutually exclusive** on the same step — a step cannot simultaneously be a non-blocking concern and a hard failure.
- **`inline` type** (Ant Design) conflicts with vertical orientation — inline steps are inherently horizontal table-row embeds.
- **Visited navigability** (Atlassian) is incompatible with Nord's locked-step model — choose one semantic for what "previously reached" means in your product.

---

### Building Block Candidates

| Building block | Used by |
|----------------|---------|
| `<ol>` ordered list | All semantic implementations |
| `<nav aria-label="...">` | Atlassian, Orbit, GOV.UK |
| `<a href>` for visited/navigable steps | Atlassian |
| `<button>` for interactive steps | Carbon, Ant Design (navigation mode) |
| `<span>` for non-interactive steps | Atlassian (unvisited) |
| Step indicator circle/dot | All visual implementations |
| Connector line element | All multi-step visual implementations |
| Visually-hidden step state text | Carbon, Paste ("Step 1, complete") |
| `aria-live` region for step transition announcements | T3 consensus recommendation |

---

### Enum/Configuration Properties

```
// Step status enum (superset across all systems)
type StepStatus = "wait" | "process" | "finish" | "error" | "warning" | "loading"

// Orientation
type Orientation = "horizontal" | "vertical"

// Layout type (Ant Design superset)
type StepType = "default" | "navigation" | "inline" | "dot"

// Size
type StepSize = "sm" | "md" | "lg"

// Indicator type
type IndicatorType = "number" | "icon" | "dot"
```

---

### A11y Consensus

| Concern | Consensus | Notes |
|---------|-----------|-------|
| Wrapper role | `<nav aria-label="[journey name]">` or `<ol>` | `<nav>` preferred when steps are navigable links; `<ol>` for display-only |
| Active step | `aria-current="step"` | Universal across all 14 systems with the component |
| Completed steps | Visually-hidden "completed" text | Not just a visual checkmark; must be in accessible text |
| Non-interactive steps | `aria-disabled="true"` | Prevents screen reader users from expecting interaction |
| Navigable steps | `<a href>` (Atlassian) or `<button>` (Carbon) | Native elements preferred over `role="button"` |
| Step state announcement | Visually-hidden text per step | "Step 1 of 4: Account details — completed" |
| Step transitions | `aria-live="polite"` or focus moved to new step heading | Without this, visual transitions are invisible to AT users |
| APG pattern | No dedicated APG pattern for Stepper | Closest: Progress (display-only) or Tabs (interactive navigation) |

---

## What Everyone Agrees On

1. **`aria-current="step"` on the active step** is universal across all 14 systems that implement the component. This single ARIA attribute is the minimum viable accessibility for a steps component.
2. **Ordered list (`<ol>`) for step items** — sequential semantics matter; step 3 of a 5-step process is meaningfully different from step 3 out of an unordered set.
3. **Visual state alone is insufficient** — completed, error, and locked states must be communicated via accessible text (visually-hidden labels) not only color or icon changes.
4. **The indicator (steps) is separate from the content** — even wizard containers (Mantine, Base Web) distinguish the step indicator strip from the step content panel.
5. **Error/invalid state per individual step** is present in every enterprise system (Carbon, Paste, Lightning, Ant Design) — multi-step forms require flagging which specific step needs attention.
6. **Mobile compact fallback** ("Step X of Y" text) is the correct solution when horizontal step labels compress to unusability — Orbit demonstrates this most explicitly.
7. **The active step should not be a link** — navigating to the current step has no effect; the active step is either a `<span>` or a button that is visually distinct but non-navigating.

---

## Where They Disagree

### 1. Navigation model: visited=navigable vs. linear enforcement

- **Option A — Visited = navigable (Atlassian):** Any step the user has reached is clickable regardless of completion status. `<a href>` on visited steps, `<span>` on unvisited.
  - Adopters: Atlassian, Ant Design (navigation type), Salesforce Lightning
  - Upside: Users can revise decisions mid-wizard without completing current step; semantically correct HTML
  - Downside: Non-linear navigation can break server-side state dependencies between steps
  - Para tu caso: Use when steps are independent forms or when back-navigation is a core user need

- **Option B — Linear enforcement (Orbit, Nord):** Steps can only move forward; previous steps are locked once submitted.
  - Adopters: Orbit (Wizard), Nord (clinical), GOV.UK
  - Upside: Prevents state corruption in dependent workflows; required for regulatory audit compliance
  - Downside: Forces users who spotted an error to complete or abandon the current step before going back
  - Para tu caso: Use for checkout flows, regulatory forms, or any workflow with dependent step state

---

### 2. Error state model: hard failure vs. non-blocking warning

- **Option A — Hard failure only (Carbon, Paste, Twilio):** A step is either valid or invalid; no intermediate state.
  - Adopters: Carbon (`invalid`), Twilio Paste (error), GitHub Primer (N/A)
  - Upside: Clear binary; users know exactly which step needs attention
  - Downside: Cannot communicate "this step has a concern but you can proceed" scenarios
  - Para tu caso: Sufficient for most form validation patterns

- **Option B — Error + warning states (Ant Design, Lightning):** `error` for blocking failures, `warning` for non-blocking concerns.
  - Adopters: Ant Design, Salesforce Lightning
  - Upside: Covers soft-validation scenarios; users can make an informed choice to proceed anyway
  - Downside: Warning semantics require clear UX copy to avoid user confusion about what "warning" means
  - Para tu caso: Use if your workflow has both blocking validation and advisory-only concerns

---

### 3. Indicator architecture: wizard container vs. navigation indicator only

- **Option A — Navigation indicator only (Carbon, Atlassian, Ant Design, Chakra, Orbit):** Steps component renders the indicator strip; step content is rendered by the consumer outside the component.
  - Adopters: Majority of systems (10/14)
  - Upside: Clean separation of concerns; step content can be any component; wizard logic lives in application state
  - Downside: More consumer code needed; focus management on step transitions must be handled by consumer
  - Para tu caso: Default choice for a design system component; more composable

- **Option B — Wizard container (Mantine, Base Web, GOV.UK expandable):** Step content rendered as children/props within the step component; component owns navigation state.
  - Adopters: Mantine, Base Web
  - Upside: Out-of-the-box complete wizard with less wiring for simple flows
  - Downside: Step content coupling; harder to implement conditional/branching steps; large API surface
  - Para tu caso: Use only for simple linear onboarding flows with uniform step content types

---

### 4. Step indicator: numbered vs. icon vs. dot

- **Option A — Numbered indicators (Carbon, Chakra, Nord, most defaults):** Step number shown in indicator circle.
  - Adopters: Most systems
  - Upside: Immediately communicates step count and position; works well for 3-7 steps
  - Downside: Number disappears when step is complete (replaced by checkmark); step identity changes mid-flow
  - Para tu caso: Default; most legible for 3-7 steps

- **Option B — Dot indicators (Ant Design `dot` type, Orbit mobile):** Small dot or icon instead of number.
  - Adopters: Ant Design, some mobile patterns
  - Upside: More compact; works for many steps; works well when step labels provide enough context
  - Downside: No positional number; harder to communicate "step 3 of 7" at a glance
  - Para tu caso: Use for compact UIs where step count is communicated by label text

---

### 5. Mobile strategy: compress labels vs. collapse to text

- **Option A — Compress/scroll labels (most desktop systems):** Labels remain visible but may truncate or become smaller on mobile.
  - Adopters: Carbon, Ant Design (horizontal)
  - Upside: Step labels remain visible on mobile
  - Downside: Labels become illegible on very narrow viewports; horizontal layout requires scrolling
  - Para tu caso: Only viable for short step labels and 3-4 steps max

- **Option B — Collapse to "Step X of Y" text (Orbit, GOV.UK mobile, Fluent 2):** On narrow viewports, replace full indicator strip with compact text.
  - Adopters: Orbit, GOV.UK, recommended by Fluent 2 and Gestalt
  - Upside: Fully readable on any viewport width; never unusable
  - Downside: Loses visual step context (no list of all steps); user cannot see upcoming steps
  - Para tu caso: Always implement this as a mobile fallback regardless of which desktop pattern you choose

---

## Visual Patterns Found

### Pattern Summary Table

| Pattern | Systems | Notes |
|---------|---------|-------|
| Horizontal indicator strip with connector lines | Carbon, Atlassian, Ant Design, Paste, Chakra | Most common wizard header |
| Vertical indicator stack with connector lines | Carbon (vertical), Mantine, Base Web, Nord | Sidebar form navigation |
| Navigation tab-style (all clickable) | Ant Design (navigation type), Lightning (Path) | Free-navigation wizard |
| Inline table-row embed | Ant Design (inline type) | Order/record status in data tables |
| Dot/minimal indicator | Ant Design (dot type) | Compact, step-count-agnostic |
| Cross-page accordion journey | GOV.UK | Government multi-organization process |
| Mobile collapse to text | Orbit, GOV.UK | "Step 3 of 6" compact mode |

---

### ASCII Wireframes

**Horizontal Steps (default — navigation indicator only)**

```
┌─────────────────────────────────────────────────────────────────┐
│  ●──────────────────●──────────────────○──────────────────○     │
│  1                  2                  3                  4     │
│ Account            Profile            Review             Done   │
│ [complete]         [current]          [pending]          [pending]│
└─────────────────────────────────────────────────────────────────┘

Legend: ● filled = complete/current  ○ empty = pending
        ─ connector line
        ✓ replaces number when complete
```

**With error state (Carbon/Paste pattern)**

```
┌─────────────────────────────────────────────────────────────────┐
│  ✓──────────────────⚠──────────────────●──────────────────○     │
│  1                  2                  3                  4     │
│ Account            Billing            Confirm             Done  │
│ [complete]         [error]            [current]          [wait] │
└─────────────────────────────────────────────────────────────────┘

Legend: ✓ = complete  ⚠ = error  ● = current  ○ = pending
```

**Vertical Steps (sidebar form navigation)**

```
┌────────────────────────────────┐
│  ✓  Account details            │
│  │                             │
│  ✓  Billing information        │
│  │                             │
│  ▶  Confirm order   ← current  │
│  │                             │
│  ○  Done                       │
└────────────────────────────────┘

Legend: ✓ = complete  ▶ = current  ○ = pending
        │ = vertical connector line
```

**Ant Design Navigation Type (tab-style, all clickable)**

```
┌──────────────────────────────────────────────────────────────────┐
│ ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│ │ 1 Account│→ │ 2 Profile│→ │ 3 Review │→ │ 4 Done   │         │
│ └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
│  [visited]     [current]     [clickable]   [clickable]           │
└──────────────────────────────────────────────────────────────────┘
```

**Ant Design Inline Type (table row embed)**

```
┌──────────────────────────────────────────────────────────────────┐
│ Order #1234  │ ●────●────●────○ │ Shipped → In Transit → ...    │
│ Order #5678  │ ✓────✓────●────○ │ Confirmed → Processing → ...  │
│ Order #9012  │ ✓────✓────✓────● │ Delivered                     │
└──────────────────────────────────────────────────────────────────┘
```

**Mobile Compact Mode (Orbit/GOV.UK pattern)**

```
┌──────────────────────────────────────┐
│  ← Step 3 of 6: Confirm order        │
│  ──────────────────────────────      │
│  [Step content rendered below]       │
└──────────────────────────────────────┘
```

**GOV.UK Cross-Page Accordion Journey**

```
┌──────────────────────────────────────────────────┐
│  How to apply for a driving licence              │
│                                                  │
│  1. Check you're eligible              ▼         │
│     ├ Check your eyesight                        │
│     └ Check your identity documents              │
│                                                  │
│  2. Apply for a provisional licence    ▶         │
│                                                  │
│  3. Book your theory test              ▶         │
│                                                  │
│  4. Book your driving test             ▶         │
└──────────────────────────────────────────────────┘
```

---

## Risks to Consider

### 1. Mobile usability (HIGH)
Horizontal step indicators with full labels fail on narrow viewports — labels truncate, overlap, or force horizontal scroll. Most systems address this only in the vertical orientation alternative, not with a purpose-built mobile mode.
**Mitigation:** Always implement a mobile compact fallback ("Step X of Y" text at breakpoints below the step strip's minimum readable width). Treat the compact mode as a first-class requirement, not an afterthought.

### 2. State corruption in non-linear navigation (HIGH)
Allowing users to navigate back to completed steps (Atlassian/Ant Design navigation mode) without validating or resetting downstream state can create inconsistent application state — step 3 depends on step 2's values, but the user changed step 2 after completing step 3.
**Mitigation:** Trigger `onChange` callbacks that invalidate or reset downstream step state when a user navigates backwards. Document this expectation explicitly in the component API.

### 3. Accessibility on step transitions (MEDIUM)
When the user advances from step 2 to step 3, the visual transition is obvious but screen readers receive no announcement unless `aria-live` or focus management is explicitly implemented. This is the most commonly missed a11y requirement in custom steps implementations.
**Mitigation:** Either move focus to the new step's heading/content on transition, or announce the new step via an `aria-live="polite"` region. Document which approach the component uses.

### 4. Over-feature pressure (MEDIUM)
Ant Design's 5 layout types, 5 states, and per-step description/subtitle/percent create an API that most products will use only 20% of. Each unused feature adds cognitive overhead when reading the component documentation.
**Mitigation:** Ship a focused API (3 states: wait/process/finish; optional error; horizontal/vertical) and extend only when product need is established. Resist adding warning state, inline type, and percent preemptively.

### 5. Naming collision with number-input Stepper (LOW)
Spectrum has a "Stepper" component for numeric input, not wizard navigation. Other systems (many libraries) also use "Stepper" for number inputs. This creates confusion when searching documentation or when onboarding new engineers to the system.
**Mitigation:** Name the component "Steps" or "ProgressSteps" (not "Stepper") to disambiguate from number-input steppers. Document the distinction in the component's overview.

---

## Next Steps

1. **Decide navigation model first** — visited=navigable (Atlassian) vs. linear enforcement (Orbit/Nord) before speccing props, since this determines the `onChange`/`href` API and `disabled` semantics.
2. **Decide indicator vs. wizard container** — navigation indicator only (recommended) vs. wizard container. If indicator-only, document the expected consumer wiring pattern (step content rendering + focus management).
3. **Define error state scope** — error-only (hard failure, Carbon pattern) or error+warning (Ant Design/Lightning). Start with error-only and add warning only when a confirmed product need exists.
4. **Implement mobile compact mode** from day one — "Step X of Y" text below a breakpoint threshold is not optional for a horizontal steps component.
5. **Test ARIA live announcements on step transitions** — this is the most commonly skipped a11y step in stepper implementations; include it in the component's automated test suite.
6. **Name the component "Steps" or "ProgressSteps"** — not "Stepper" — to avoid naming collision with number-input components.
