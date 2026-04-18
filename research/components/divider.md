# Divider — Research
**Date:** 2026-04-17 | **Mode:** Max | **Systems:** 24 | **Scope:** All patterns

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Carbon (IBM) | Philosophy: separation through whitespace and container borders, not decorative lines; `border-subtle-01` token serves as functional equivalent | `$border-subtle-01` as CSS `border-bottom`; `<hr>` for semantic separator |
| GOV.UK | No component; spacing-first philosophy; `govuk-section-break` utility class | `govuk-section-break` CSS utility with size modifiers |
| Evergreen (Segment) | Spacing-first philosophy; `Box borderBottom` as escape hatch | `Menu.Divider` within Menu only; `Box borderBottom` for others |
| GitHub Primer | No dedicated component | Box border utilities or `<hr>` |
| Nord | Provides `nord-divider` web component; minimal clinical interface divider | `nord-divider` web component |

**Systems WITH dedicated component:** M3 Divider, Spectrum Divider, Polaris Divider, Atlassian Divider, Ant Design Divider, Twilio Paste Separator, shadcn/ui Separator, Playbook Separator, Radix UI Separator, Chakra UI Divider/Separator, Base Web Divider, Fluent 2 Divider, Gestalt Divider, Mantine Divider, Orbit Separator, Nord nord-divider — 16+ of 24

---

## How Systems Solve It

### Ant Design Divider — "Text labels embedded in the rule: the only T1 system with labeled section dividers"

Ant Design's Divider is the richest in Tier 1. The `children` prop embeds text within the rule, splitting the line on each side. `orientation` positions the text at left/center/right within the rule. `orientationMargin` sets pixel/percentage distance from the container edge. `type="vertical"` renders an inline separator for action groups like "Edit | Delete | View." `dashed` creates a dashed line for optional/expandable sections.

The text-labeled divider fills a real product need: dense enterprise form sections need visual separators that also label the content below them. Rather than a separate Heading element plus a Divider line, the labeled divider combines both in one. `plain` controls whether the label text is bold (section header weight) or normal weight.

**Design Decisions:**
- **`children` for embedded text** → Why: dense enterprise forms benefit from section labels that combine the visual separator and the section heading in one element → Impact: HIGH → Para tu caso: use for form section headers, chat "Today" / "Yesterday" separators, authentication "Or" dividers
- **`type="vertical"` for inline separators** → Why: "Edit | Delete | View" action groups need a thin vertical line between items rendered in text flow → Impact: MED → Para tu caso: separate from horizontal orientation; inline-flow behavior is architecturally different
- **`dashed` variant** → Why: optional or expandable sections use dashed lines by convention in many enterprise UIs (Ant Design's primary audience) → Impact: LOW → Para tu caso: add dashed as a style variant; use for optional sections or collapsible content boundaries

**Notable Props:** `children` for embedded text; `orientation: "left"|"center"|"right"`; `orientationMargin: string|number`; `type: "horizontal"|"vertical"`; `dashed: boolean`; `plain: boolean`; `style`

**Accessibility:** Renders as `<div role="separator">` (NOT `<hr>`); embedded text read by screen readers as part of the separator; text labels do NOT carry `role="heading"` — screen reader users navigating by heading will NOT land on divider labels (accessibility gap); mitigation: use actual heading elements for navigation-critical section labels

---

### Fluent 2 Divider — "Label-in-line as first-class feature for 'Or' and 'Today' separators"

Fluent 2's Divider is the T3 standout specifically for its label-in-line implementation. The `alignContent` prop positions the label (left/center/right/start/end). `appearance` variants (subtle/strong/brand) control visual weight. High-contrast token support ensures the divider meets Windows accessibility requirements. Like Ant Design, Fluent 2 recognizes the common product need for "Or" separators in authentication flows and "Today" / "Yesterday" separators in chat history — but with `appearance` variants and high-contrast mode support that Ant Design lacks.

---

### Mantine Divider — "Label + orientation + dashed/dotted variants + size — most complete T3 implementation"

Mantine's Divider combines label support (`labelPosition: left/center/right`), both orientations (horizontal/vertical), three style variants (solid/dashed/dotted), thickness control via `size`, and color token integration. It is the most complete divider component in T3. The dotted variant is unique — no other system has it. Vertical dividers in Mantine need explicit height in flex/grid layouts, and Mantine documents that vertical toolbar dividers may warrant `role="none"` to avoid superfluous screen reader announcements.

---

### Spectrum Divider — "Three-size thickness scale with first-class vertical orientation"

Spectrum provides a size scale (S=1px, M=2px, L=4px) for thickness variation and explicit `orientation` support. Vertical dividers are first-class — important for Adobe toolbar button group separators. The correct `aria-orientation="vertical"` is set automatically to match the `orientation` prop. Deliberately omits text label support (labels are `Heading` elements, not divider content — clear responsibility boundary).

---

### Material Design 3 Divider — "Inset variant for list alignment with outline-variant token"

M3's three geometric variants (full-width, inset, middle-inset) solve the specific problem of list dividers: inset aligns the divider with list item text content, preserving the visual hierarchy of the leading icon/avatar column. The `outline-variant` semantic token adapts automatically to light/dark mode. List dividers are controlled by the List component's `divider` toggle — you don't manually place Divider components between list items.

---

### Polaris Divider — "Semantic `<hr>` foundation with token-constrained color"

Polaris renders `<hr>` with `borderColor` accepting Polaris border tokens (including `border-critical` for error section dividers). This is the correct semantic HTML with meaningful contextual color — a critical divider signals different meaning than a standard divider, and the token vocabulary makes this explicit. Token-constrained colors prevent arbitrary divider colors while enabling meaningful semantic choices.

---

### Atlassian Divider — "Zero configuration enforces absolute visual consistency"

Atlassian's Divider has no configuration props beyond `testId`. One visual treatment using `color.border` token, horizontal only, `<hr>` element. Every Atlassian product (Jira, Confluence, Bitbucket) uses exactly the same divider. Design governance is enforced by removing choice. The tradeoff: no hierarchical separation (major section vs. minor item separator) is possible.

---

### Radix UI Separator — "Explicit decorative/semantic distinction via `decorative` prop"

Radix's `decorative` boolean prop is the cleanest accessibility pattern for dividers across all systems. `decorative={true}` applies `role="none"` to the separator — it's purely visual spacing. `decorative={false}` (default) applies `role="separator"` — it marks a semantic content boundary. This explicit binary choice eliminates the ambiguity of optional `aria-label` or `aria-hidden` that developers might forget to set.

shadcn/ui's Separator component is built on Radix's Separator primitive, making it the T2 reference implementation for this pattern.

---

### GOV.UK and Carbon — "The case for not having a divider component"

GOV.UK and Carbon/Evergreen share a philosophy: explicit divider lines are often unnecessary when spacing and semantic HTML structure communicate grouping clearly. This has a genuine accessibility insight — visual clutter from decorative dividers increases cognitive load for users with cognitive disabilities and low-vision users. Carbon's documented position is that needing a divider line indicates insufficient whitespace, not a design decision. These rationales are the strongest principled arguments for design systems that want to minimize decorative ornamentation.

---

## Pipeline Hints

**Archetype recommendation:** inline-action (display primitive — no interaction)
Rationale: Divider is a visual separator primitive with zero interaction requirements. It takes display properties (orientation, size, label, style variant) but has no interactive states. As the simplest component in the library, it maps to a non-interactive display primitive.

**Slot consensus:** (16/24 systems with dedicated component)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| label | text | no | 4/16 | Ant Design, Fluent 2, Mantine — text embedded in the rule line |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Orientation | variant | horizontal/vertical | 12/16 | vertical for toolbar separators, inline text flow |
| Size / thickness | variant | sm/md/lg (1px/2px/4px) | 8/16 | Spectrum S/M/L; Mantine size; Polaris borderWidth scale |
| Variant / style | variant | solid/dashed/dotted | 6/16 | dashed in Ant/Mantine; dotted in Mantine only |
| Color | variant | semantic token | 10/16 | Most use border token; Polaris allows semantic color tokens |
| Decorative | variant | semantic/decorative | 5/16 | Radix/shadcn explicit; others use aria-hidden manually |
| Label position | variant | left/center/right | 4/16 | Only for labeled dividers (Ant Design, Fluent 2, Mantine) |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isDecorative | 5/16 | depends on context | Radix `decorative` prop; determines role="none" vs role="separator" |
| hasLabel | 4/16 | false | Enables text content embedded in the rule |
| isDashed | 4/16 | false | Dashed stroke style |
| isDotted | 1/16 | false | Mantine only; dotted stroke style |
| isVertical | 12/16 | false | Default is always horizontal |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 16/16 | 1px horizontal line | standard appearance |
| vertical | 12/16 | thin vertical line in flex container | toolbar/action group separator |
| labeled | 4/16 | line with centered/left/right text | "Or" / "Today" / section label |
| dashed | 4/16 | dashed stroke pattern | optional/expandable section boundary |
| decorative | 5/16 | role="none" / aria-hidden | purely visual spacing; no semantic value |

**Exclusion patterns found:**
- decorative × role="separator" — mutually exclusive; a divider is either semantic (separator) or decorative (none)
- vertical × label — labeled dividers are always horizontal (line with text centered); vertical labeled dividers are not documented by any system

**Building block candidates:**
- None — divider is itself a primitive; no sub-components

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| orientation | horizontal/vertical | 12/16 | default horizontal |
| size | sm/md/lg or 1px/2px/4px | 8/16 | visual weight control |
| variant | solid/dashed/dotted | 6/16 | stroke style |
| labelPosition | left/center/right | 4/16 | only when hasLabel=true |

**A11y consensus:**
- Semantic divider: `<hr>` element (implicit `role="separator"`) or `role="separator"` — marks a thematic break between content sections
- Decorative divider: `role="none"` or `aria-hidden="true"` — purely visual; no semantic boundary; avoid cluttering screen reader output
- Vertical divider: `aria-orientation="vertical"` — since `<hr>` defaults to horizontal semantics (Radix and Nord handle this correctly)
- Labeled divider (Ant Design, Fluent 2, Mantine): the label text is announced by screen readers as part of the separator; does NOT serve as a heading for navigation purposes
- APG pattern: HR/Separator — native `<hr>` is the preferred implementation; `role="separator"` only when `<hr>` is not suitable (e.g., vertical separators in flex containers that need `<span>`)
- High-contrast mode: Fluent 2 uses high-contrast tokens; other systems rely on system-level border color overrides

---

## What Everyone Agrees On

1. **`<hr>` is the correct HTML**: Systems that implement a dedicated component almost universally use `<hr>` as the underlying element (Polaris, Atlassian, Chakra, Base Web, Orbit, shadcn/ui). `<hr>` provides implicit `role="separator"` and is the browser's native thematic break element.

2. **Decorative dividers need `role="none"` or `aria-hidden`**: Universal agreement that purely visual dividers (used only for spacing, not marking semantic boundaries) should not clutter screen reader output. Radix's `decorative` prop is the most explicit enforcement.

3. **Vertical dividers need explicit height**: No system hides this — vertical dividers in flex/grid layouts need explicit height or `align-self: stretch` to be visible. Documentation universally notes this.

4. **Vertical dividers need `aria-orientation="vertical"`**: Since `<hr>` defaults to horizontal semantics, vertical usage requires `aria-orientation="vertical"` — Radix and Nord explicitly handle this; others leave it to the consumer.

5. **Whitespace over decorative lines**: Carbon, GOV.UK, Evergreen, and Cedar all agree that well-designed spacing often makes divider lines unnecessary. Overuse of dividers creates visual noise and cognitive load.

---

## Where They Disagree

**"¿Component or utility class?"**
→ Component (most systems): discoverability, consistent a11y attributes, token integration → Utility class (Carbon, GOV.UK, Primer): more flexible; avoids component abstraction overhead; whitespace-first philosophy
→ Para tu caso: component for design systems that need consistent ARIA handling and token integration; utility/primitive for systems where whitespace discipline is the primary separation strategy

**"¿Should dividers have text labels?"**
→ Yes (Ant Design, Fluent 2, Mantine): "Or" authentication separators and "Today" chat separators are extremely common product needs that deserve first-class support → No (Spectrum): section labels are Heading elements; dividers are structural, not content — strict responsibility boundary
→ Para tu caso: implement labeled divider support; it's one of the most common product patterns (authentication "Or", chat date separators, form section headers). But always pair with a note: use heading elements for screen-reader-navigable section labels, use labeled divider only for visual grouping

**"¿Zero configuration or rich variant API?"**
→ Zero configuration (Atlassian): absolute consistency at the cost of no hierarchical separation → Rich API (Mantine, Ant Design): solid/dashed/dotted + sizes + labels + orientations + colors
→ Para tu caso: minimum viable = orientation + decorative/semantic distinction + one size + optional label; add dashed/dotted as progressive enhancement

**"¿Token-constrained or arbitrary color?"**
→ Token-constrained (Polaris, Atlassian): semantic color tokens only; prevents arbitrary hex colors; meaningful color choices → Arbitrary (Ant Design via style prop): full flexibility; risk of off-brand divider colors
→ Para tu caso: token-constrained is correct for a design system; expose 2-3 semantic color options (default/subtle/strong); never expose raw color prop

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Full-width horizontal | 1px line spanning full container width | Section separation | All systems |
| Inset horizontal | Left-offset to align with list item text | List item separators | M3 |
| Middle-inset | Both sides offset | List items with leading + trailing elements | M3 |
| Vertical inline | Thin vertical line in text/action flow | "Edit \| Delete \| View" action groups | Ant Design, Spectrum |
| Labeled center | Rule with text centered in the gap | "Or" auth divider, "Today" chat separator | Ant Design, Fluent 2, Mantine |
| Labeled left | Rule with text left-aligned | Form section labels | Ant Design |
| Dashed | Dashed stroke pattern | Optional/expandable section boundaries | Ant Design, Mantine |

**Wireframe — labeled divider (center):**
```
─────────────────────────── Or ───────────────────────────────
```

**Wireframe — labeled divider (left):**
```
─── Shipping Information ──────────────────────────────────────
```

**Wireframe — vertical inline separator:**
```
Edit  │  Duplicate  │  Delete
```

**Wireframe — M3 inset (in list context):**
```
  ┌─────────────────────────────────────────────────────────┐
  │  [Avatar]  Alice Martin                     2:34 PM     │
  │            Hello! Just checking in...                   │
  │                                                         │
  │            ─────────────────────────────────────────── │ ← inset, aligned with text
  │  [Avatar]  Bob Kim                          3:12 PM     │
  └─────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

**Overuse creates visual noise** (MEDIUM) — the most common divider antipattern; dividers added between every list item, every section, every component; mitigation: establish design guidance that dividers mark thematic breaks, not every structural boundary; apply Carbon/GOV.UK's whitespace-first principle before reaching for a divider

**Labeled dividers not discoverable by heading navigation** (MEDIUM) — Ant Design's labeled Divider renders `<div role="separator">` not `<hN>`; screen reader users navigating by heading cannot find section labels that are only in dividers; mitigation: document clearly that labeled dividers are visual only; use actual `<h2>`/`<h3>` when section navigation is required

**Vertical dividers in flex layouts need explicit height** (LOW) — easy to implement but consistently forgotten; a vertical `<hr>` in a flex container has zero height by default; mitigation: add `align-self: stretch` or explicit height in the component's default styles

---

## Dimension Scores

| Dimension | Ant Design | Fluent 2 | Mantine | Spectrum | Radix/shadcn | Polaris |
|-----------|-----------|----------|---------|----------|--------------|---------|
| Feature coverage | 5/5 | 4/5 | 5/5 | 3/5 | 3/5 | 3/5 |
| A11y depth | 3/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| API ergonomics | 4/5 | 4/5 | 5/5 | 4/5 | 5/5 | 4/5 |
| Token integration | 3/5 | 5/5 | 5/5 | 5/5 | 4/5 | 5/5 |

---

## Next Steps

```
/spec divider      → outputs/divider-config.json
/enrich divider    → a11y tokens + interaction spec
/build divider     → full pipeline in one command
/build divider --max  → use pre-generated config
```
