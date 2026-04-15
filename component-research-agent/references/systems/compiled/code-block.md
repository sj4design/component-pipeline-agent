---
component: code-block
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — no Code Block or syntax highlighting component
**Approach:** M3 does not provide a code display component. Code rendering is not part of M3's component taxonomy, which focuses on general-purpose UI controls for mobile and web applications. Developers needing code display in Material-based apps use third-party libraries (Prism.js, Highlight.js) wrapped in M3's Card or Surface containers. The closest M3 pattern is a read-only TextField or a Card with monospaced text, but neither includes syntax highlighting, line numbers, or copy functionality.
**Key Decisions:**
- [HIGH] No code display category: M3's component scope targets consumer and enterprise apps, not developer tools or documentation platforms — code rendering is outside its design remit
- [MED] Surface/Card as container: when code must be shown, teams use Card with monospaced typography and custom background, but this is ad hoc, not a documented pattern
**Notable API:** No component. Card + custom monospaced content is the composition path.
**A11y:** No code-specific guidance. A `<pre><code>` semantic structure with appropriate language labeling would need to be implemented manually.
**Best at:** Nothing in the code display space — M3's scope does not include developer-facing content patterns.
**Missing:** Entire code block category: syntax highlighting, line numbers, copy button, line highlighting, language detection, multi-snippet tabs, inline vs. block distinction.

---

## spectrum
**Component:** Code (spectrum-css), CodeBlock (proposed)
**Approach:** Spectrum provides basic code styling through spectrum-css typography utilities. Adobe's documentation sites (React Spectrum docs, Spectrum docs) use custom code block implementations for API examples, but these are not first-class Spectrum components. The system defines monospaced typography tokens and a subtle background treatment for inline code. Block code is rendered with a pre/code structure using Spectrum's color tokens for background differentiation. Syntax highlighting relies on third-party libraries (Prism) with Spectrum-compatible themes.
**Key Decisions:**
- [HIGH] Typography-level, not component-level: code display is handled via CSS typography classes and semantic HTML, not as a composed component with built-in features
- [MED] Prism integration on doc sites: Adobe's own documentation uses Prism.js with a custom Spectrum theme for syntax highlighting — this proves the pattern but is not productized as a component
**Notable API:** No formal component API. CSS classes for `code` (inline) and `pre > code` (block) with monospaced font tokens.
**A11y:** Relies on semantic HTML (`<pre><code>`). No specific ARIA guidance for code blocks. Language should be indicated via `lang` attribute or `data-language` for screen readers.
**Best at:** Clean, minimal code typography that integrates with Spectrum's visual language — the token-based approach ensures code blocks match the surrounding UI.
**Missing:** Composed code block component, copy button, line numbers, line highlighting, language indicator, multi-tab snippets, syntax highlighting integration.

---

## carbon
**Component:** CodeSnippet
**Approach:** Carbon provides the most structured code display component among T1 systems. CodeSnippet comes in three explicit types: `inline` (single expression within text), `single` (one-line code with copy), and `multi` (multi-line block with copy and optional show-more). Each type is a distinct visual treatment with dedicated behavior. The multi-line variant supports max-height with a "Show more" expand toggle. All variants include a built-in copy-to-clipboard button. Syntax highlighting is not built in — Carbon provides the container, copy behavior, and layout; syntax highlighting is the consumer's responsibility via third-party libraries.
**Key Decisions:**
- [HIGH] Three explicit types (inline/single/multi): the type taxonomy is Carbon's defining contribution — it formalizes the three common code display contexts rather than using a single component with responsive behavior
- [HIGH] Copy button is built-in on all block types: copy-to-clipboard is considered essential behavior, not optional — `single` and `multi` always show the copy icon
- [MED] No syntax highlighting: Carbon deliberately separates container/behavior (CodeSnippet) from syntax rendering (third-party) — keeps the component focused and avoids bundling a syntax engine
- [MED] Show more/less for multi-line: multi-type supports `maxCollapsedNumberOfRows` with expand toggle, addressing the common pattern of long code blocks in documentation
**Notable API:** `type` (inline | single | multi), `copyButtonDescription`, `feedback` (copy confirmation text), `feedbackTimeout`, `maxCollapsedNumberOfRows`, `showMoreText`, `showLessText`, `hideCopyButton`, `onClick`, `wrapText`.
**A11y:** Copy button has accessible label (`copyButtonDescription`). Inline variant renders as `<button>` (click to copy) or `<code>` (display only). Multi-line uses `role="textbox"` with `aria-label`. Keyboard: Tab to focus, Enter/Space to copy. Show more/less toggle is keyboard accessible.
**Best at:** Structured type taxonomy (inline/single/multi) with built-in copy behavior — the clearest API for "what kind of code am I showing?" among all systems.
**Missing:** Syntax highlighting (by design), line numbers, line highlighting, language indicator badge, multi-tab snippets for showing variants.

---

## polaris
**Component:** Code (inline only)
**Approach:** Polaris provides a minimal `Code` component for inline code only — rendering text in monospaced font with a subtle background to distinguish it from surrounding prose. There is no block-level code component in Polaris. Shopify's documentation and developer tools use custom code block implementations outside the design system. This minimal scope reflects Polaris's focus on merchant-facing admin UI where code display is rare — merchants occasionally see API keys, webhook URLs, or code snippets, but Shopify Admin is not a code-editing environment.
**Key Decisions:**
- [HIGH] Inline-only scope: Polaris's Code component is strictly for inline code within text; block-level code display is outside the component's responsibility
- [MED] Merchant-context minimal: Shopify Admin merchants rarely need code blocks; when they do (Liquid templates, API keys), it is handled by product-specific implementations
**Notable API:** Children-only (wraps text in `<code>` with Polaris styling). No props beyond standard HTML attributes.
**A11y:** Renders semantic `<code>` element. No additional ARIA needed for inline code.
**Best at:** Simplicity — the most minimal code component among T1 systems, exactly right for inline code mentions in merchant-facing UI.
**Missing:** Block-level code display, syntax highlighting, copy button, line numbers, line highlighting, multi-tab snippets, language indicator.

---

## atlassian
**Component:** Code / CodeBlock (@atlaskit/code)
**Approach:** Atlassian provides both inline `Code` and block-level `CodeBlock` as separate components in the @atlaskit/code package. CodeBlock includes built-in syntax highlighting powered by Prism.js with Atlassian's custom theme. It supports line numbers (on by default), line highlighting for calling attention to specific lines, and a language indicator. The component ships with 30+ language grammars. CodeBlock is widely used in Jira (code in issues/comments), Confluence (code blocks in pages), and Bitbucket (code review). This is the most feature-complete T1 code block component.
**Key Decisions:**
- [HIGH] Built-in syntax highlighting: unlike Carbon and others, Atlassian bundles Prism.js directly — the component handles highlighting, not the consumer. This increases bundle size but dramatically simplifies usage
- [HIGH] Line numbers on by default: code blocks show line numbers unless explicitly disabled — reflects Atlassian's developer-tool context where line references are common
- [MED] Line highlighting: `highlight` prop accepts line ranges (e.g., "1-3,5") to visually emphasize specific lines — essential for code review and documentation contexts
- [MED] Separate inline/block components: `Code` for inline, `CodeBlock` for block — clear separation matches HTML semantics (`<code>` vs `<pre><code>`)
**Notable API:** `CodeBlock`: `language`, `text`, `showLineNumbers`, `highlight` (line ranges), `shouldWrapLongLines`, `testId`. `Code`: children (inline text). Supported languages include javascript, python, java, html, css, json, and many more.
**A11y:** CodeBlock renders `<pre><code>` with `aria-label` and language annotation. Line numbers are presentational (not read by screen readers). Highlighted lines have visual differentiation but no ARIA equivalent (potential gap). Focus management allows tabbing to the code block.
**Best at:** Most feature-complete T1 code block — built-in syntax highlighting, line numbers, and line highlighting in a single component. The reference implementation for developer-facing code display.
**Missing:** Copy button (not built-in; Bitbucket adds it at the product level), multi-tab snippets, expand/collapse for long code, language auto-detection.

---

## ant-design
**Component:** Typography.Text code / custom (no dedicated CodeBlock)
**Approach:** Ant Design provides `Typography.Text` with a `code` boolean prop for inline code display — rendering monospaced text with a subtle background. For block-level code, Ant Design does not provide a dedicated component. Ant Design Pro and the Ant Design documentation site use custom code blocks built on third-party libraries (Prism.js, react-syntax-highlighter). The ecosystem library `@ant-design/pro-components` includes some code display utilities, but these are not part of core Ant Design. Chinese developer documentation platforms built on Ant Design universally rely on third-party syntax highlighting solutions.
**Key Decisions:**
- [HIGH] No block-level code component: Ant Design provides inline code styling only; block code display is left to the application layer or third-party libraries
- [MED] Typography integration: inline code is a variant of Typography.Text, keeping code styling consistent with the type system rather than being a separate component
**Notable API:** `Typography.Text code` (boolean prop for inline code style). No block-level API. Third-party: `react-syntax-highlighter` with Ant Design theme is the community pattern.
**A11y:** Inline code renders semantic `<code>` element via Typography. No block-level ARIA guidance. Third-party integrations must handle their own accessibility.
**Best at:** Typography-level inline code integration — inline code is a first-class typography variant, not a separate component.
**Missing:** Block-level code component, syntax highlighting, copy button, line numbers, line highlighting, multi-tab snippets, language indicator, expand/collapse.
