---
system: Ant Design
component: Input.Search
url: https://ant.design/components/input/
last_verified: 2026-03-28
---

# Input.Search

## Approach

Ant Design's `Input.Search` is the most feature-rich search input among Tier 1 systems and the most explicit about treating search as a compound UI pattern rather than a plain text field. It lives inside the `Input` component namespace (not as a standalone component) because Ant Design uses a compound component pattern throughout its library — `Select.Option`, `Form.Item`, `Table.Column` — where sub-components extend a parent's functionality while sharing the parent's visual language and base behavior. The practical consequence is that `Input.Search` inherits all Input props (size, status, prefix, addonBefore, bordered) while adding search-specific capabilities: `enterButton` for explicit submission, `loading` for async feedback, `onSearch` for the unified search callback, and `allowClear` for clearing. Ant Design's user base is heavily enterprise Chinese software, and that context shapes the component's decisions: Chinese search interfaces conventionally include an explicit search button (not just an icon inside the field), because the "Search" button label is a clear action trigger for users who may not default to pressing Enter. The `enterButton` prop, which can render either a default icon button or a fully customized React node, is the direct expression of this cultural UX convention. No other Tier 1 system makes an explicit search-submission button a first-class prop.

## Key Decisions

1. **enterButton prop for explicit submission affordance** (HIGH) — `enterButton` accepts `true` (renders a default search icon button), a string ("Search"), or any ReactNode. The WHY is rooted in both enterprise UX conventions and internationalization: in many enterprise and East Asian product contexts, an explicit button next to a search field provides unambiguous affordance — users see a button, they understand clicking it will execute the search. Relying solely on Enter key or icon-as-button creates ambiguity for users with lower digital literacy. The prop being customizable (not just a boolean) also means product teams can localize the button label ("搜索", "Buscar", "Search") to match their user base without building a custom component.

2. **loading prop for async feedback** (HIGH) — `Input.Search` is the only Tier 1 component with a built-in `loading` boolean that visually indicates an active search request. When `loading={true}`, the search button icon is replaced with a spinner. The rationale is that Ant Design's typical use case is enterprise data systems with server-side search, where there is always a round-trip fetch between query submission and results rendering. Embedding the loading state in the input rather than the results container keeps the cause-and-effect visible: the user triggered the action from the input, and the input itself signals that the action is in progress.

3. **onSearch unified callback with source discrimination** (HIGH) — The `onSearch` callback fires on Enter keypress, search button click, AND clear icon click (when `allowClear` is true). The callback signature is `(value, event, info)` where `info.source` is `'input'` (keyboard/button submission) or `'clear'` (clear gesture). This unified callback design means consumers always handle search outcomes in one place, but the `source` discriminator allows different responses: a keyboard/button submission runs a full search, while a clear-from-search might reset to a default state rather than executing an empty query. This is more ergonomic than Spectrum's separate `onSubmit`/`onClear` callbacks when the application logic needs to differentiate the clear action from a zero-character search.

4. **allowClear integration with onSearch** (MEDIUM) — When both `allowClear` and `enterButton` are active, clicking the clear icon triggers `onSearch` with an empty string and `{ source: 'clear' }`. This integration was not always reliable — GitHub issues show that the onSearch+allowClear interaction was a historical pain point, and the `info.source` parameter was added specifically to let developers distinguish clear-triggered calls from user-initiated searches. The evolution of this API through community issue reports illustrates Ant Design's community-driven development model, where rough edges get refined based on real usage patterns.

5. **Input.Search as sub-component, not standalone** (MEDIUM) — The compound component pattern (`Input.Search`) rather than a standalone `SearchInput` component was chosen because Ant Design treats the Input family as a cohesive system: all variants share size (`small`, `middle`, `large`), `status` (error, warning), `disabled`, `readOnly`, `prefix`, `suffix`, and `addonBefore`/`addonAfter` props without duplication. A standalone component would require duplicating or re-exporting all these props. The trade-off is that the API surface is larger than necessary for simple search uses — consumers must know which Input props are relevant to Search — but the consistency benefit across all input types outweighs this in practice.

## Notable Props

- `enterButton`: `boolean | ReactNode` — Renders a submission button; the most distinctive prop in any Tier 1 search component, directly addressing the "icon vs button" submission affordance debate.
- `loading`: `boolean` — Inline loading spinner replaces the search icon during async operations; unique among Tier 1 systems for making this a first-class prop.
- `onSearch(value, event, info)`: Unified callback for all search trigger events including clear; `info.source` discriminates between trigger types.
- `allowClear`: `boolean | { clearIcon: ReactNode }` — When true, shows clear icon and wires it to `onSearch` with `source: 'clear'`. The object form allows a custom clear icon, which is rare in other systems.
- `size`: `"large" | "middle" | "small"` — Inherited from Input; aligns with Carbon's density control approach, enabling the same component in both compact toolbars and prominent page-level search bars.

## A11y Highlights

- **Keyboard**: Enter triggers `onSearch`; if `enterButton` is present, both Enter and button click trigger it. The clear button (when `allowClear` is true) is keyboard accessible. Explicit Escape-to-clear behavior is not documented — developers must wire this if needed.
- **Screen reader**: `Input.Search` uses standard `<input>` markup; the enterButton renders as a `<button>`, giving it proper keyboard and screen reader semantics. However, Ant Design has documented accessibility gaps — the component does not automatically apply `role="search"` to a wrapper, and screen reader announcements for the loading state are not built in, leaving async feedback to developer responsibility.
- **ARIA**: No automatic `role="search"` landmark applied to the wrapper. Labels must be provided via the `Form.Item` label pattern or explicit `aria-label`. The loading state is communicated visually only (spinner) without an `aria-busy` or `aria-live` region — a notable gap for screen reader users waiting on search results.

## Strengths & Gaps

- **Best at**: Feature completeness for the explicit-submit search pattern — `enterButton` + `loading` + unified `onSearch` is the most complete out-of-the-box API for a server-side search interaction with async feedback, making it the best choice for data-dense enterprise admin applications.
- **Missing**: No `role="search"` landmark automation, no `aria-busy`/`aria-live` for loading state screen reader feedback, no documented Escape-to-clear behavior, and no scope/category selector — accessibility and keyboard interaction standards lag behind Spectrum and Carbon despite the richer feature set.
