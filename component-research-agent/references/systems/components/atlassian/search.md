---
system: Atlassian Design System
component: Textfield (with search pattern) / @atlaskit/search-dialog
url: https://atlassian.design/components/textfield/
last_verified: 2026-03-28
---

# Search (via Textfield + search-dialog)

## Approach

Atlassian's approach to search is the most fragmented of the six Tier 1 systems — and that fragmentation is itself a design decision worth understanding. Rather than a unified `Search` component, Atlassian ships three distinct layers: the base **Textfield** component (which handles the input primitive), the now-deprecated **@atlaskit/quick-search** package (which was Atlassian's first attempt at a product-level search component extracted from Jira's navigation), and its replacement **@atlaskit/search-dialog** (which models the full search dialog pattern used in Jira, Confluence, and Bitbucket). The reason for this fragmentation is that Atlassian's products have radically different search contexts that cannot be unified into a single component: a simple inline filter on a Jira issue board, the global product switcher search in the Atlassian navigation bar, and the full-page Confluence content search all require different interaction models. Atlassian's philosophy is to provide a strong, accessible primitive (Textfield) and build product-specific search patterns on top of it, rather than trying to anticipate all use cases in a single component. This is the opposite of M3's monolithic SearchView approach, and it means the ADS puts more architectural responsibility on the consuming team but gives them more control over the resulting experience. The absence of a canonical "Search" entry in the ADS component index — compared to Carbon, Spectrum, and M3 each having one — signals that Atlassian considers search a *pattern* rather than a *component*.

## Key Decisions

1. **No dedicated standalone Search component in the public ADS** (HIGH) — The core Atlassian Design System (atlassian.design) lists Textfield but not a search-specific component. This was a deliberate choice rooted in Atlassian's internal architecture: their products (Jira, Confluence, Trello, Bitbucket) each implement search differently enough that a shared component would require so many props and conditional behaviors as to be unusable. Instead, teams extend Textfield with a leading search icon, optional trailing clear button, and wrap it with `role="search"` manually. The philosophical cost is inconsistency across products; the benefit is that each team can optimize for their specific search UX without fighting a component that tries to do too much.

2. **Placeholder text is acceptable for search fields** (MEDIUM) — Atlassian's accessibility guidelines make an explicit exception for search fields: while the system generally discourages using placeholder text as a label substitute (because placeholder disappears on input, leaving the user without context), search fields are recognized as a legitimate exception because "Search" as placeholder is a universally understood affordance. This is notably pragmatic for a system with strong accessibility standards — it acknowledges that strict rule-following can produce a worse UX when the context is clear enough.

3. **@atlaskit/quick-search deprecation in favor of search-dialog** (HIGH) — The original quick-search package was tightly coupled to the Atlassian navigation component and could not be reused independently. When Atlassian redesigned the navigation bar and needed to support product-level search dialogs (the global search experience in Jira and Confluence), they extracted the pattern into @atlaskit/search-dialog, which models a full dialog overlay with pre-search state, results sections, and footer links. The migration signals that Atlassian learned from the first attempt: a search component that is coupled to a specific navigation context cannot scale to the variety of search surfaces across multiple products.

4. **Label association over aria-label** (MEDIUM) — Atlassian's guidance mandates that all form fields, including search inputs, use a properly associated `<label>` element rather than `aria-label` directly on the input. The reasoning is that the `<label>` element creates a programmatic association recognized by a wider range of assistive technologies and older browser+AT combinations than `aria-label`. When a visible label is undesirable (toolbar search), the label is visually hidden via CSS rather than omitted. This is a stronger position than Polaris (which offers `labelAccessibilityVisibility`) or Spectrum (which accepts either pattern) — it reflects Atlassian's enterprise customer base, which includes large organizations with accessibility compliance requirements.

5. **ADS components ship with built-in a11y but consumers must validate patterns** (LOW) — Atlassian's design system documentation notes that "ADS components ship with built-in accessibility features, but you still need to review your patterns, content, and interactions." For search specifically, this means the component handles input semantics but the consumer is responsible for live-region announcements of search results, focus management after results load, and the overall search region landmark. This shared-responsibility model is honest about the limits of component-level accessibility — a well-labelled input embedded in a poorly structured page is still inaccessible.

## Notable Props

- `isCompact`: Textfield compact mode reduces height for dense UI surfaces — the closest Atlassian gets to Carbon's explicit size variants.
- `elemAfterInput` / `elemBeforeInput`: Slot props for custom icons or buttons before/after the input, used to add search icons and clear buttons to Textfield in search contexts — the escape hatch that enables search behavior without a dedicated search component.
- `isRequired` + `RequiredAsterisk`: Combined to signal required fields, though for search fields (which are rarely "required" in a form sense) these are typically omitted.

## A11y Highlights

- **Keyboard**: No explicit Escape-to-clear defined at the Textfield level — consumers implement keyboard behavior. Arrow key navigation within results is left to the consumer's implementation of the results dropdown.
- **Screen reader**: Native HTML semantics via `<input type="text">` or `<input type="search">`. Label association is required via `<label>` (not aria-label) for maximum AT compatibility. The @atlaskit/search-dialog component manages its own focus trapping and dialog semantics when the search results panel is open.
- **ARIA**: Manual `role="search"` application is the consumer's responsibility when using bare Textfield for search. @atlaskit/search-dialog applies dialog role and manages aria-live regions for result announcements. Atlassian's explicit guidance against aria-label in favor of label elements is a distinctive accessibility stance.

## Strengths & Gaps

- **Best at**: Accessibility primitive quality — the Textfield is a highly robust, enterprise-tested input with thorough label association requirements and token-based theming, giving teams a solid foundation even without a dedicated search component.
- **Missing**: A canonical, documented `Search` component with out-of-the-box clear button, role="search" landmark, and Escape-to-clear — teams must compose this manually, leading to inconsistent implementations across Atlassian's own products and third-party apps.
