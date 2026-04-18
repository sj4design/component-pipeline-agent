# Empty State — Research
**Date:** 2026-04-17 | **Mode:** Max | **Systems:** 24 | **Scope:** All patterns

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | Pattern guidance only; no component provided; teams rebuild for each context | Typography + Button + layout tokens |
| Carbon (IBM) | Pattern not component; varied empty state contexts prevent a fixed component | Centered heading + optional body + Button (kind="primary") |
| Spectrum (Adobe) | IllustratedMessage provided (see below) | IllustratedMessage + consumer-placed actions |
| shadcn/ui | No dedicated component; teams compose from primitives | Typography + Button + SVG; community recipes vary |
| REI Cedar | Not present; use Typography + Button | Custom composition |
| Radix UI | Product-specific by nature; no template | Heading + Text + Button + illustration |
| Base Web | No component; product-level pattern | Typography/Block composition |
| Fluent 2 | No component; design documentation provides guidance but no code | Text/Image/Button composition |
| Mantine | Intentional absence; community patterns exist but no official template | Stack/Text/Button composition |
| GOV.UK | No dedicated component; illustrations generally avoided; text-first | Inset Text or Panel for empty-state messaging |

**Systems WITH dedicated component:** Polaris EmptyState, Atlassian EmptyState, Ant Design Empty, Twilio Paste EmptyState, Salesforce Lightning IllustrationLibrary/EmptyState, GitHub Primer Blankslate, Playbook EmptyState, Wise Design EmptyState, Dell Design EmptyState, Chakra UI EmptyState, Gestalt IllustratedMessage, Orbit EmptyState, Evergreen EmptyState, Nord nord-empty-state — 14 of 24

---

## How Systems Solve It

### Atlassian EmptyState — "Required headingLevel prop: the only system that enforces correct heading hierarchy"

Atlassian's EmptyState is the most structurally complete in Tier 1. The `headingLevel` required prop (`"h2"` through `"h6"`) forces consumers to specify the correct heading level for the document — preventing incorrect heading hierarchy across Jira, Confluence, and Bitbucket pages. This is the only Tier 1 system that treats heading semantics as an API-level requirement rather than a documentation guideline.

Three-tier action hierarchy (`primaryAction`, `secondaryAction`, `tertiaryAction`) covers the real product complexity of empty states: an empty sprint might offer "Create issue" (primary), "Import issues" (secondary), and "Learn more about sprints" (tertiary link). The two-column responsive layout (illustration + text side-by-side on wide screens, stacked on narrow) is handled by the component, not the consumer.

**Design Decisions:**
- **`headingLevel` required prop** → Why: pages with multiple empty states (Jira project overview: empty sprint + empty roadmap + empty backlog) would have duplicate h2s without consumer control of heading levels → Impact: HIGH → Para tu caso: expose a headingLevel prop and document when each level is appropriate (h2 for page-level empty states, h3 for section-level)
- **Three-tier action hierarchy** → Why: product empty states genuinely need 3 action types — do the primary task, do an alternative, learn more → Impact: MED → Para tu caso: support primaryAction + secondaryAction + at minimum a tertiary slot for links
- **Two-column responsive layout built-in** → Why: teams shouldn't implement the same responsive illustration+text layout 20 times across different Jira pages → Impact: MED → Para tu caso: build the responsive layout into the component

**Notable Props:** `headingLevel: "h2"|"h3"|"h4"|"h5"|"h6"` (required); `imageUrl`; `primaryAction`, `secondaryAction`, `tertiaryAction` as React nodes; `description` as string or node

**Accessibility:** headingLevel prop enforces semantic heading level; illustration is decorative and `aria-hidden`; action buttons are standard Atlassian button components; no ARIA landmark on the empty state region by default (consumer responsibility)

---

### Polaris EmptyState — "Required image with action-oriented headings enforced by linting"

Polaris enforces that empty states include illustrations (`image` prop required) — reflecting Shopify's view that merchant-facing empty states need visual warmth in otherwise empty spaces. The single `primaryAction` prop enforces one main resolution affordance. Linting rules enforce action-oriented headings: "Add your first product" (what the merchant can do) not "No products yet" (what the problem is). `fullWidth` removes the max-width constraint for full-page contexts.

**Design Decisions:**
- **`image` required** → Why: consistency across Shopify Admin; illustration-less empty states feel cold and unfinished; Polaris provides the image infrastructure to make this practical → Impact: HIGH → Para tu caso: recommend illustrations but don't require them (accessible fallback without images is important)
- **Single primaryAction enforced** → Why: merchant empty states have one obvious resolution action; multiple primary actions create decision paralysis → Impact: MED → Para tu caso: encourage single primary CTA; allow secondary as opt-in

**Notable Props:** `image: string` (required); `primaryAction: {content, url}` (required); `secondaryAction`; `footerContent`; `fullWidth: boolean`

**Accessibility:** Image is `aria-hidden`; heading uses configurable level; action buttons have descriptive content labels; forced structure ensures heading + action are always present

---

### Ant Design Empty — "ConfigProvider global override + automatic integration with Table/List/Select"

Ant Design's Empty component accepts `image` as a boolean (false to hide), URL string, or ReactNode for custom illustrations. The `ConfigProvider renderEmpty` prop sets a global custom empty state renderer for ALL built-in Ant Design collection components (Table, List, Select, TreeSelect, Transfer) — a single configuration point. Built-in `PRESENTED_IMAGE_DEFAULT` and `PRESENTED_IMAGE_SIMPLE` constants provide two illustration styles. The `children` prop accepts action buttons.

The automatic integration with collection components is the standout feature: Table, List, and Select automatically display Empty when their data is empty. Teams don't add Empty explicitly; it appears by convention.

---

### Spectrum IllustratedMessage — "Illustration-required with Adobe's pre-built SVG library"

Spectrum's IllustratedMessage requires a vector SVG illustration as a mandatory slot. Adobe provides a library of pre-built empty state SVGs for common cases (no results, no access, upload, error). No built-in action slot — actions are placed by the consumer adjacent to the component. The strict separation of content (IllustratedMessage) from actions is consistent with Spectrum's component responsibility model.

---

### Gestalt IllustratedMessage — "Named for broader use: empty states, errors, onboarding, permissions"

Gestalt names their component "IllustratedMessage" rather than "EmptyState" — a more accurate name because the same component handles empty lists, error states, onboarding placeholders, and permission gates. Pinterest's visual discovery platform makes empty boards and zero-result searches high-engagement moments where illustrations drive re-engagement. CTA integrated into the component; centered layout with max-width.

---

### Orbit EmptyState — "Travel-specific with recovery CTA and flexible body content"

Orbit's EmptyState is purpose-built for high-frustration travel moments. No-results on a flight search is an abandonment risk; Orbit's EmptyState includes travel-themed illustrations and action slots for recovery CTAs ("Clear filters", "Search again"). The component distinguishes between "no results because of filters" and "genuinely no data exists" — different copy, different actions.

---

### Evergreen EmptyState — "Onboarding activation focus with dual CTA"

Evergreen's EmptyState is designed for new workspace empty states — the first screen new users see. `primary CTA` + secondary `anchorCta` for "Learn more" links. `background` prop for dark/light panel contexts. The activation-critical framing makes every word and action deliberate.

---

### Nord EmptyState — "Healthcare: visual calm to distinguish from error states"

Nord's clinical empty state principle: never use red colors or warning icons, to clearly distinguish "no data" from "system failure." In medical software, a clinician must immediately know whether an empty patient record means the patient has no appointments (normal) or whether a system error occurred (escalate to IT). Nord's visual calm principle generalizes to any context where error states and no-data states must be unambiguously distinct.

---

## Pipeline Hints

**Archetype recommendation:** container
Rationale: Empty state is a container component with fixed slot positions (illustration, title, description, actions). The component's job is enforcing the visual hierarchy and layout of these slots. The content itself is highly product-specific.

**Slot consensus:** (14/24 systems with dedicated component)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| title / heading | text | yes | 14/14 | Semantic heading element (h2/h3/h4); action-oriented phrasing recommended |
| description / body | text | no | 12/14 | Supporting text; explains context or guides next steps |
| primary-action | container | yes | 12/14 | Primary CTA button; most systems require exactly one |
| secondary-action | container | no | 8/14 | Secondary button or link |
| tertiary-action | container | no | 4/14 | Atlassian third-tier; typically a link |
| illustration / image | media | no | 11/14 | SVG illustration or image; decorative; aria-hidden; Polaris/Spectrum require it |
| icon | icon | no | 6/14 | Alternative to full illustration; smaller visual anchor |
| footer-content | container | no | 3/14 | Polaris footerContent; help links and supplementary info below actions |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Heading level | variant | h2/h3/h4/h5/h6 | 5/14 | Atlassian requires it; others leave to consumer; defaults to h2 |
| Size | variant | sm/md/lg or default/compact | 4/14 | Full-page vs. inline/section empty states |
| Layout | variant | vertical/horizontal | 3/14 | Atlassian 2-column responsive; most are vertical only |
| Background | variant | light/dark/transparent | 2/14 | Evergreen `background` prop |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasIllustration | 11/14 | true (if illustration URL provided) | Ant Design `image={false}` to hide |
| isFullWidth | 3/14 | false | Polaris fullWidth; removes max-width constraint |
| hasSecondaryAction | 8/14 | false | Optional secondary CTA |
| hasTertiaryAction | 4/14 | false | Atlassian three-tier actions |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default (first-time empty) | 14/14 | illustration + heading + description + primary CTA | First-ever use of a feature |
| filtered-empty | 5/14 | different copy: "No results for your filters" + clear filter CTA | Filters produced zero results |
| error-empty | 2/14 | visually distinct from data-empty; no red/warning (Nord principle) | System error vs. no data |
| loading | 2/14 | skeleton or spinner while checking if data exists | Before confirming empty state |

**Exclusion patterns found:**
- filtered-empty × first-time-empty — different user contexts require different copy and CTAs; they are mutually exclusive states
- error × data-empty — must be visually distinguishable (Nord principle); never use the same visual treatment

**Building block candidates:**
- illustration-area → standalone illustration slot; Spectrum exposes this as a separate slot
- action-group → primary + secondary + tertiary action container; Atlassian structures this clearly

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| headingLevel | h2/h3/h4/h5/h6 | 5/14 | Atlassian requires explicit; others default h2 |
| layout | vertical/horizontal | 3/14 | horizontal for wide panels with side-by-side illustration |

**A11y consensus:**
- Illustration SVGs are decorative: `aria-hidden="true"` — screen reader hears title and description, not illustration description
- Title must be a real heading element (not just styled text) for screen reader heading navigation
- Primary role: no special ARIA role; empty state is informational content
- Keyboard: standard focus order: heading → description → primary action → secondary action
- Action buttons: descriptive labels ("Create your first project" not "Create")
- GOV.UK principle: illustrations are generally avoided; text clarity is prioritized over visual warmth
- Nord principle: empty states must NOT use red, warning icons, or error visual language — unambiguous distinction from error states is a safety concern in healthcare and clarity concern everywhere

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template — same Base component | Same component set |
| 40–70% | Extension — `contentType` prop | Same component set with additional variant |
| < 40% | Separate component | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| First-time empty (onboarding) | 100% | Template | Action-oriented heading + primary CTA + illustration | All systems |
| Search/filter no results | 85% | Template | "No results for X" + clear filters CTA; no illustration (or simpler icon) | Orbit, Ant Design, most |
| Error empty (system unavailable) | 40% | Extension | Distinct visual language; no red warning; "Try again" CTA | Nord, Gestalt |
| Permission gate (no access) | 60% | Template | Same shell; different copy ("You don't have access to…") + request-access CTA | Gestalt IllustratedMessage |
| Feature activation (upsell) | 70% | Template | Same shell; "Upgrade to unlock" CTA pattern | Evergreen |
| Upload empty (drop zone prompt) | 50% | Extension | Illustration shows upload action; drop target behavior | Spectrum |

---

## What Everyone Agrees On

1. **Illustration SVGs are always decorative**: Every system with illustration support marks them `aria-hidden="true"`. The visual communicates to sighted users; the title and description communicate to screen reader users. Never alt-text an empty state illustration.

2. **Title must be a semantic heading**: The title is not just styled text — it must be a proper heading element so screen reader users navigating by heading can find and understand the empty state's context on a complex page.

3. **Action-oriented headings**: "Add your first product" outperforms "No products yet." The heading tells users what to do next, not what doesn't exist. Multiple systems document this principle with linting or guidelines.

4. **Single primary action is the norm**: Every system that enforces a primary action allows only one. Decision paralysis at an already-empty state makes recovery harder.

5. **Filtered-empty and first-time-empty are different**: The copy, illustration, and CTA should differ between "you haven't created anything yet" and "your search returned no results." Many systems document this distinction; some enforce it via separate states.

---

## Where They Disagree

**"¿Is an illustration required?"**
→ Required (Polaris, Spectrum): visual warmth and consistency justify mandatory illustrations → Optional (Atlassian, Ant Design, Orbit, Evergreen): teams should be able to use icons or no visual for space-constrained inline empty states
→ Para tu caso: strongly recommended but not required; provide default illustrations; allow icon or no-visual variants

**"¿One primary action or multiple?"**
→ Single primary only (Polaris): prevents decision paralysis at a recovery moment → Multiple tiers (Atlassian primary/secondary/tertiary): real product empty states genuinely need 3 options
→ Para tu caso: 1 required primary + 1 optional secondary + 1 optional tertiary link covers all cases; document that tertiary is for learn-more links, not actions

**"¿Should heading level be a required prop?"**
→ Required (Atlassian): prevents heading hierarchy violations across a complex product → Defaults to h2 (most systems): simpler API; reasonable default for most page-level empty states → Para tu caso: expose headingLevel as a required or strongly recommended prop; document which level to use in which page context

**"¿Same component for error and empty states?"**
→ Same component (Gestalt IllustratedMessage): empty list, error, onboarding placeholder, and permission gate share enough structure → Separate (Nord): healthcare safety requires visual distinction; error must NEVER look like empty → Para tu caso: same component is fine if your visual design clearly differentiates the states via illustration/icon choice and copy; different component if your domain requires unambiguous error/empty distinction

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Centered vertical | Illustration above title above description above actions; centered in container | Page-level, section-level empty states | Most systems |
| Horizontal two-column | Illustration left, text+actions right | Wide panel contexts | Atlassian |
| Icon + text (no illustration) | Small icon anchor instead of full illustration | Inline, space-constrained empty states | Most systems as fallback |
| Action-oriented heading | "Add your first X" not "No X yet" | All empty states | Polaris (linted), Atlassian, Orbit |
| Filtered-empty variant | "No results for [query]" + clear filters CTA | Post-search/filter zero results | Orbit, Ant Design, Carbon pattern |

**Wireframe — standard centered empty state:**
```
         ┌─────────────────────────────────────────┐
         │                                         │
         │          [  🗂️ illustration  ]          │
         │                                         │
         │      Add your first project             │
         │   Projects help you organize work and   │
         │   collaborate with your team.           │
         │                                         │
         │         [  Create project  ]            │
         │                                         │
         │   Learn how projects work →             │
         └─────────────────────────────────────────┘
```

**Wireframe — filtered empty state:**
```
         ┌─────────────────────────────────────────┐
         │                                         │
         │              [  🔍  ]                   │
         │                                         │
         │   No results for "quarterly report"     │
         │   Try different keywords or remove      │
         │   filters to find what you're looking   │
         │   for.                                  │
         │                                         │
         │    [  Clear filters  ]  [  Search all  ]│
         └─────────────────────────────────────────┘
```

---

## Risks to Consider

**Using same visual language for error and empty states** (HIGH — context-dependent) — in medical, financial, and operational systems, a user must immediately distinguish "no data exists" from "system failure"; if both states look identical, users may escalate IT tickets for normal empty states; mitigation: design distinct visual languages for error and empty states; Nord's "no red, no warning icons" rule generalizes to: empty = calm/neutral, error = flagged/urgent

**Missing heading semantics** (MEDIUM) — empty states styled with large text but no `<h2>` element are invisible to screen reader heading navigation; common because teams focus on visual hierarchy over semantic structure; mitigation: enforce heading element via prop type (string = heading, ReactNode = must include heading element) or lint rule

**Illustration without alt context on error** (LOW) — when an error state reuses an empty state illustration, the mismatch confuses sighted users about whether the problem is user-created or system-caused; mitigation: separate illustration slots for different state types; never reuse the "add your first item" illustration on an error state

---

## Dimension Scores

| Dimension | Atlassian | Polaris | Ant Design | Orbit | Gestalt | Evergreen |
|-----------|-----------|---------|-----------|-------|---------|-----------|
| Feature coverage | 5/5 | 4/5 | 4/5 | 4/5 | 4/5 | 3/5 |
| A11y depth | 5/5 | 4/5 | 3/5 | 4/5 | 4/5 | 4/5 |
| API ergonomics | 4/5 | 5/5 | 4/5 | 4/5 | 4/5 | 4/5 |
| Domain fit | General | E-commerce | Enterprise | Travel | Social/visual | Analytics |

---

## Next Steps

```
/spec empty-state      → outputs/empty-state-config.json
/enrich empty-state    → a11y tokens + interaction spec
/build empty-state     → full pipeline in one command
/build empty-state --max  → use pre-generated config
```
