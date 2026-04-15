---
component: Code Block
tier: 2
last_verified: 2026-03-31
---

# Code Block — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | CodeBlock | Paste provides a `CodeBlock` component with built-in syntax highlighting (Prism-based), line numbers, copy button, and external link. Supports language prop and variant (single-line vs multi-line). Also provides `InlineCode` for inline usage. One of the strongest T2 implementations. | high |
| Salesforce Lightning | CodeBlock / code formatting (SLDS) | Lightning Design System provides code formatting utilities and a `CodeBlock` blueprint with monospaced styling and optional copy button. Used in Salesforce developer documentation. Syntax highlighting is not built into the SLDS component; it relies on product-level Prism.js integration. | medium |
| GitHub Primer | Primer does not ship a public CodeBlock component, but GitHub.com's code rendering is the industry standard for code display — syntax highlighting, line numbers, line-level linking, blame annotations, copy button, and multi-file tabs. Internally uses custom components not exposed in Primer. | — | high |
| shadcn/ui | Code block (recipe, not component) | shadcn/ui does not ship a pre-built code block component. The community pattern uses `react-syntax-highlighter` or `shiki` inside a styled `<pre>` with shadcn's styling conventions. Some shadcn templates include code block compositions with copy button. The approach is composable: bring your own highlighter, wrap in shadcn Card/ScrollArea. | high |
| Playbook | Not available | No code block component; enterprise UI kit focuses on form controls and data display, not developer content. | medium |
| REI Cedar | Not available | No code block component; retail e-commerce scope does not include developer-facing content display. | high |
| Wise Design | Not available | No code block component; financial product UI does not include code display patterns. | medium |
| Dell DS | Not available | No code block component; enterprise IT administration uses standard content patterns without code display needs. | low |

## Key Decision Patterns

**Twilio Paste's CodeBlock is the strongest T2 implementation.** Paste provides a fully composed `CodeBlock` with: syntax highlighting via Prism.js (30+ languages), line numbers toggle, built-in copy-to-clipboard button, external link button, max-height with scroll, and variant switching between single-line and multi-line modes. It also provides `InlineCode` as a separate component. Paste treats code display as a first-class concern because Twilio's developer audience frequently encounters code in documentation, API references, and console logs. The component bundles the syntax highlighting engine directly, trading bundle size for developer convenience — the same design choice as Atlassian's CodeBlock (T1).

**GitHub's code rendering is the UX gold standard but not a public component.** GitHub.com's code display includes: syntax highlighting for 300+ languages (via Linguist + Tree-sitter), clickable line numbers with URL hash linking (click line 5 → URL updates to #L5), line range selection (shift-click for multi-line highlighting), blame annotations, copy button for raw content, code folding, and multi-file tabs (in PRs and gists). This is the most mature code display implementation in the industry, but it is product-level, not a design system component. Primer's public components (Box, Text) do not include a code block primitive. Teams building GitHub-like code display use third-party libraries to approximate these patterns.

**shadcn/ui takes the composable approach.** Rather than shipping a batteries-included code block, shadcn/ui's pattern is to compose from primitives: a `<pre>` styled with Tailwind classes, a syntax highlighter (Shiki is the modern preference over Prism for its VS Code TextMate grammar support), and optional copy button and line numbers. This gives maximum control over bundle size (import only the languages you need) and highlighter choice. Several community shadcn code block recipes exist, but none is the "official" implementation.

**Syntax highlighting strategy splits into two camps.** Bundled (Paste, Lightning): the component includes Prism.js and handles highlighting internally — simpler API but larger bundle. BYO-highlighter (shadcn, Primer's absence): the consumer chooses and integrates the highlighting library — smaller default bundle, more setup. The industry trend favors Shiki (uses TextMate grammars, produces HTML at build time, perfect VS Code color parity) over Prism.js (runtime highlighting, simpler but less accurate grammars), especially in documentation and static sites.

**Copy button is universally expected.** Every T2 system that provides a code block includes or strongly recommends a copy-to-clipboard button. This reflects the primary user action for code blocks: read, then copy. Paste includes it by default; Lightning documents it as a pattern; shadcn recipes always include one. The copy button is positioned top-right by convention.

## A11y Consensus
- Code blocks render semantic `<pre><code>` with the language identified via class (`language-javascript`) or `data-language` attribute
- Copy button has an accessible label ("Copy code" or "Copy to clipboard") and announces success ("Copied") via aria-live region or tooltip
- Line numbers are presentational/decorative — they should not be selectable or read by screen readers (use CSS `user-select: none` and `aria-hidden`)
- Long code blocks with scroll should have `tabindex="0"` to allow keyboard scrolling, with `role="region"` and `aria-label` describing the code content
- Syntax highlighting is purely visual — screen readers read the raw text content, which is correct behavior (highlighted tokens should not have individual ARIA roles)
- Inline code uses semantic `<code>` element; no additional ARIA needed

## Recommended Use

Reference Twilio Paste's CodeBlock for a batteries-included implementation with built-in syntax highlighting, copy button, line numbers, and clear single/multi-line variants. Use shadcn/ui's composable approach when bundle size control is critical or when integrating Shiki for build-time highlighting. Reference GitHub's code display for UX patterns (line linking, line range selection, blame, multi-file tabs) even though the implementation is not public. For the highlighting engine choice: prefer Shiki for documentation/static sites (build-time, VS Code grammar parity) and Prism.js for runtime/dynamic code display (simpler integration, lighter runtime).
