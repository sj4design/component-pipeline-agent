---
system: Material Design 3
component: Chip (4 types: Assist, Filter, Input, Suggestion)
url: https://m3.material.io/components/chips/overview
last_verified: 2026-03-28
---

# Chip

## Approach

Material Design 3 made a deliberate choice to call these elements "Chips" rather than "Tags," and that naming decision carries real semantic weight. Chips in M3 are fundamentally about **user actions and interaction states**, not just passive labels. The system splits chips into four distinct types — Assist, Filter, Input, and Suggestion — because Google's product research found that a single "chip" component inevitably gets misused when it tries to serve all four interaction patterns at once. A chip that triggers an action (Assist) has fundamentally different affordances than one that represents user-entered text (Input), and conflating them leads to inconsistent product UIs. By enforcing type-level separation at the design system level, M3 guides designers toward choosing the correct interaction semantic before picking a visual style. The underlying philosophy is that visual similarity should not override behavioral clarity — four types that look similar but behave differently is better than one type that looks different across teams.

## Key Decisions

1. **Four-type taxonomy enforces interaction semantics** (HIGH) — Assist chips trigger smart/automated actions (like "Add to calendar"), Filter chips are toggleable content refiners, Input chips represent user-entered data (like email addresses), and Suggestion chips offer dynamic completions. The WHY: each type maps to a different mental model for users — doing vs. filtering vs. confirming vs. accepting — and mixing them in a single component would obscure that distinction. Having four named types forces design teams to ask "what is this chip *doing*?" before placing it.

2. **"Soft-disabled" state as distinct from disabled** (HIGH) — M3 distinguishes between hard-disabled chips (non-focusable, not reachable by keyboard) and soft-disabled chips (focusable, discoverable by screen readers). The WHY: hard-disabled interactive elements are invisible to assistive technology, which means screen reader users never learn those actions exist. Soft-disabled keeps chips reachable so users can discover what features are unavailable and potentially understand why.

3. **Chip sets require aria-label on the container** (HIGH) — The specification requires an `aria-label` or `aria-labelledby` on the chip set container, not just individual chips. The WHY: without a container label, a screen reader user encounters a series of chips with no context for what they collectively represent — are they filters? actions? search suggestions? The container label provides the frame that makes individual chip labels meaningful.

4. **Leading and trailing icons are role-differentiated** (MEDIUM) — Leading icons provide context (category icon before label), while trailing icons are typically the remove/close action for Input chips. The WHY: separating icon positions by semantic function prevents the ambiguity of "what does clicking this icon do?" — position becomes a consistent affordance signal across the system.

5. **Compact form factor is mobile-first by design** (MEDIUM) — Chips are sized for touch targets on mobile (minimum 32dp height) while remaining dense enough for desktop contexts. The WHY: M3 is Google's system for Android-first products where chip patterns frequently appear in messaging, search, and filter surfaces on small screens. The size decisions reflect real usage data from Gmail, Maps, and Search where chips appear in high-density contexts.

## Notable Props

- `aria-label` (on chip set): Why interesting — required at the container level, not just per-chip, which is an unusual and important a11y pattern that most other systems leave optional
- `disabled` vs soft-disabled: The distinction between keyboard-unreachable and keyboard-reachable disabled states is a rare implementation choice that improves screen reader discoverability
- Chip type selection (Assist/Filter/Input/Suggestion): Acts as a design-time constraint, not just a visual variant — forces intentional interaction pattern selection

## A11y Highlights

- **Keyboard**: Tab moves focus between chips. Enter/Space activates. For Filter chips, toggling selection is handled with Enter/Space and the selected state is communicated via `aria-pressed` or `aria-selected`. Hard-disabled chips are removed from tab order entirely; soft-disabled chips remain focusable.
- **Screen reader**: Chip sets should have `aria-label` describing their purpose (e.g., "Filter by category"). Individual chips announce their label. Removable Input chips announce the remove button separately as a distinct interactive target.
- **ARIA**: Filter chips use `aria-pressed` for toggle state. Input chips with remove actions expose the close button as a separate focusable element. `aria-labelledby` is supported on chip set containers for dynamic labeling.

## Strengths & Gaps

- **Best at**: Enforcing interaction-semantic clarity through type-level separation — the four-type system prevents the "what does this chip do?" ambiguity common in products using generic tag components.
- **Missing**: No built-in TagGroup overflow/wrapping behavior specification — M3 documents individual chip behavior thoroughly but leaves chip-list overflow patterns (show more, truncation, scroll) to implementers.
