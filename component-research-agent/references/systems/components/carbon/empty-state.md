---
system: Carbon (IBM)
component: Not available natively (Empty States Pattern)
url: https://carbondesignsystem.com/patterns/empty-states-pattern/
last_verified: 2026-03-28
---

# Empty State

## Approach

Carbon does not provide a dedicated Empty State component. Instead, it documents the Empty States Pattern — guidance for how to compose empty states from existing Carbon primitives rather than a reusable component with a fixed structure. This is a deliberate architectural position: Carbon's team concluded that empty states are sufficiently varied across IBM's product portfolio (enterprise software, data visualization tools, cloud platforms, commerce systems) that a single component with a fixed structure would either be too restrictive or so flexible as to be meaningless.

The Empty States Pattern documentation provides anatomy guidance: an optional illustration, a descriptive title, an explanation of what the space will contain when populated, and an optional action (either a link in the message text or a primary action button). The illustration guidance is explicit about accessibility: empty state illustrations are "considered decorative" and "should be skipped by screen readers" because they "do not serve any practical or informational purpose." This is a more conservative stance than some systems (like Spectrum, which requires SVG illustrations) — Carbon is reluctant to mandate visual decoration that provides no informational value.

Carbon's GitHub repository shows an active tension around this decision. Community issue #17553 ("Empty States guidance") and related issues reflect product teams requesting a formal component, with comments indicating that the Product Design team has "a more thorough point of view" than what Core has published. As of 2026, this has not yet been resolved into a shipped component. Teams using Carbon for IBM products build their own empty state implementations guided by the pattern but without component-level consistency guarantees.

## Key Decisions

1. **Pattern over component** (HIGH) — Carbon's decision to document empty states as a pattern rather than a component reflects their enterprise product diversity. IBM's products range from Watson Studio (data science) to IBM Commerce (e-commerce) to IBM Security (enterprise security dashboards). Each has different visual languages, illustration standards, and action model needs. A single component would either be ignored or customized beyond recognition. The pattern provides a behavioral and content contract without visual prescription.

2. **Illustrations are decorative, not required** (HIGH) — Carbon's guidance that illustrations are decorative and should be skipped by screen readers is a statement about information hierarchy: the empty state's message should be fully comprehensible through text alone. Illustrations are acceptable visual enhancements but should never carry the primary communication. This is the inverse of Spectrum's IllustratedMessage philosophy, where the illustration is the component's identity.

3. **Minimal required content structure** (MEDIUM) — Carbon's pattern specifies: title (required), description (required, explains what will populate the space), action (optional). This is less opinionated than Polaris (which requires an image, enforces action-oriented heading copy, mandates a single primary CTA) but more structured than M3 (which provides no guidance). The emphasis on "what will populate this space" in the description is specifically aimed at preventing vague "No data" empty states that leave users confused about what they should do next.

4. **Action as link or button** (MEDIUM) — Carbon allows the action in an empty state to be either a hyperlink embedded in the description text or a standalone primary button. This flexibility acknowledges that some empty state actions are navigational (a link to documentation or a setup wizard) while others are direct (a button to create the first item). Mandating a button for all cases would introduce visual weight for navigational actions; mandating a link for all cases would reduce discoverability for primary task actions.

## Notable Props

- No component; no props.
- Community-built empty state implementations in IBM product teams typically compose: a centered layout, a heading (`<h2>` or `<h3>`), a paragraph for description, an optional decorative SVG with `aria-hidden`, and optionally a `Button` component for the primary action.

## A11y Highlights

- **Keyboard**: No component-level keyboard behavior. Composed action buttons follow standard Carbon Button keyboard patterns.
- **Screen reader**: Carbon explicitly documents that illustrations should have empty `alt` attributes or `aria-hidden="true"` because they are decorative. The heading and description text must fully communicate the empty state without requiring the image.
- **ARIA**: Teams composing empty states must assign appropriate heading levels for document outline consistency. The pattern does not enforce a specific heading level.

## Strengths & Gaps

- **Best at**: The accessibility stance on decorative illustrations is the clearest and most principled in any Tier 1 system — Carbon explicitly documents WHY illustrations should be skipped by screen readers, which helps teams internalize the reasoning rather than just following a rule.
- **Missing**: A reusable component that product teams can reach for, resulting in inconsistent empty state implementations across the Carbon ecosystem and repeated composition work for every team that encounters this pattern.
