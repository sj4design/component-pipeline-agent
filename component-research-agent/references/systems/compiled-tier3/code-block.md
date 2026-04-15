---
component: Code Block
tier: 3
last_verified: 2026-03-31
---

# Code Block — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — no code display primitive | Radix does not provide a code block component. Radix focuses on interactive behavior primitives (Dialog, Popover, Select), not content display. Code blocks are static content patterns that do not require the complex accessibility state management that Radix specializes in. | high |
| Chakra UI | Code / CodeBlock (v2: Code only) | Chakra v2 provides `Code` for inline code with colorScheme variants and `CodeBlock` is not a core component. Chakra v3 (Ark-based) retains the inline `Code` component. For block code, Chakra users compose from `Box` with `as="pre"` and integrate react-syntax-highlighter or Shiki. No built-in syntax highlighting or copy button. | high |
| GOV.UK | Inset text / code formatting (CSS) | GOV.UK provides CSS styling for `<code>` and `<pre>` elements through govuk-frontend typography. No dedicated component. Code is styled with monospaced font (GDS Transport or monospace fallback) and a left-border inset pattern. No syntax highlighting — GOV.UK's progressive enhancement principle means code blocks must work without JavaScript. Government services rarely display code to citizens. | high |
| Base Web (Uber) | Not available | No code block component. Base Web focuses on form controls, navigation, and data display for Uber's internal tools. Code display is not part of its component scope. | medium |
| Fluent 2 (Microsoft) | CodeBlock (preview/community) | Fluent 2 does not ship a stable CodeBlock component in the core library. Community/preview implementations exist. VS Code — Microsoft's flagship code editor — has the most sophisticated code rendering in the industry, but it uses Monaco Editor, not Fluent components. The gap between Fluent's component library and VS Code's capabilities mirrors the T1 pattern: code rendering is product-level, not design-system-level for Microsoft. | medium |
| Gestalt (Pinterest) | Not available | No code block component. Pinterest's consumer product scope is visual content (images, pins), not code display. Developer documentation uses custom implementations outside Gestalt. | high |
| Mantine | Code / CodeHighlight / CodeHighlightTabs | The most comprehensive code block implementation across all tiers. Mantine provides three components: `Code` (inline/block code without highlighting), `CodeHighlight` (single block with syntax highlighting via highlight.js, copy button, and language label), and `CodeHighlightTabs` (tabbed multi-snippet display with per-tab language, icon, and file name). Built-in dark/light theme support. Copy button included by default. | high |
| Orbit (Kiwi.com) | Not available | No code block component. Travel booking UI does not include developer-facing content patterns. | medium |
| Evergreen (Segment) | Code (inline only) | Evergreen provides a `Code` component for inline code rendering with size and appearance variants. No block-level code component. Segment's developer documentation uses custom code blocks outside Evergreen's component library. | medium |
| Nord (Nordhealth) | Code Block (CSS) | Nord provides a `code-block` CSS component for displaying blocks of code with monospaced typography, subtle background, and border styling. Syntax highlighting is not included — Nord focuses on the container styling. Healthcare software occasionally displays clinical codes, API responses, or configuration, justifying the component's existence. | medium |

## Key Decision Patterns

**Mantine's Code / CodeHighlight / CodeHighlightTabs is the most comprehensive code display offering across all tiers.** Mantine provides a three-tier component hierarchy: `Code` for basic inline/block code (no highlighting, minimal), `CodeHighlight` for single code blocks with syntax highlighting (powered by highlight.js), built-in copy button, and language label, and `CodeHighlightTabs` for multi-snippet tabbed display where each tab can have its own language, file name, and icon. CodeHighlightTabs directly addresses the common documentation pattern of showing the same example in multiple languages or showing related files (component + styles + test). The copy button is included by default on CodeHighlight and CodeHighlightTabs. Theme-aware: automatically adapts to light/dark mode via Mantine's color scheme system.

**Mantine uses highlight.js while the broader ecosystem trends toward Shiki.** Mantine's CodeHighlight bundles highlight.js for runtime syntax highlighting. This is a pragmatic choice (highlight.js is lighter and simpler than Prism, supports 190+ languages), but the modern documentation ecosystem increasingly favors Shiki (TextMate grammars, build-time rendering, exact VS Code theme parity). For Mantine users who need Shiki, the `Code` component (no built-in highlighting) provides a clean base to integrate custom highlighting.

**The tabbed multi-snippet pattern (CodeHighlightTabs) is unique to Mantine.** No other design system across T1-T3 provides a built-in tabbed code display component. The pattern is universal in developer documentation (npm/yarn/pnpm install commands, multi-language API examples, file-per-tab displays), but every other system requires custom composition. Mantine productizes it as a first-class component with file name, icon, and language per tab.

**GOV.UK's CSS-only approach represents the progressive enhancement extreme.** GOV.UK's code formatting works without JavaScript: monospaced font, background color, left border, and proper `<pre>` wrapping. No syntax highlighting, no copy button, no interactive features. This is the most accessible and resilient approach but also the most limited. It works on every browser and assistive technology by default. Government services displaying code (API documentation for government data services) use this approach successfully.

**Nord's inclusion of a code block for healthcare context is notable.** Healthcare software displays clinical codes (ICD-10, SNOMED), API responses for integrations, HL7/FHIR message fragments, and configuration values. Nord provides the container styling without syntax highlighting — appropriate for clinical/configuration data that is not traditional programming code.

**Fluent 2's gap mirrors the broader industry pattern.** Microsoft builds the most sophisticated code editor in the world (VS Code's Monaco) but does not ship a Fluent code block component. This confirms that full-featured code display is an application-level concern requiring deep integration with language grammars, themes, and editor infrastructure — too complex for a general-purpose design system component. The design system's role is providing the container, typography, and copy interaction; syntax highlighting is a specialized concern.

## A11y Consensus

- Semantic `<pre><code>` structure is universal across all T3 implementations; language identified via `class="language-*"` or `data-language`
- Mantine's CodeHighlight copy button includes `aria-label` ("Copy code") and announces copy success via tooltip; other systems follow the same pattern
- Line numbers (when present) use `aria-hidden="true"` and `user-select: none` to prevent screen reader noise and accidental selection during copy
- Scrollable code blocks (overflow content) should have `tabindex="0"` for keyboard scrolling with `role="region"` and `aria-label`
- GOV.UK's no-JavaScript approach is the most accessible baseline: works with all screen readers without any ARIA additions beyond semantic HTML
- Syntax highlighting tokens are purely visual; screen readers read the plain text content, which is the correct behavior
- Tab interfaces (Mantine CodeHighlightTabs) follow standard tab ARIA pattern: `role="tablist"`, `role="tab"` with `aria-selected`, `role="tabpanel"` with `aria-labelledby`
- Copy confirmation should use `aria-live="polite"` or a visually hidden announcement rather than relying solely on visual feedback (tooltip)

## Recommended Use

Reference Mantine's CodeHighlight and CodeHighlightTabs as the most complete design-system-level code block implementation — it is the only system across all tiers with built-in tabbed multi-snippet display. Compare with Twilio Paste (T2) for an alternative batteries-included approach and Carbon CodeSnippet (T1) for the inline/single/multi type taxonomy. Use Mantine's `Code` (no highlighting) as a model for the basic container component, and `CodeHighlight` for the full-featured variant. For the tabbed pattern, Mantine CodeHighlightTabs is the only design system reference — all other systems require custom composition. GOV.UK provides the gold standard for progressive enhancement and maximum accessibility in code display. For healthcare or clinical contexts, reference Nord's approach of container-only styling without syntax highlighting.
