---
system: Spectrum (Adobe)
component: TagGroup + Tag
url: https://react-spectrum.adobe.com/react-spectrum/TagGroup.html
last_verified: 2026-03-28
---

# TagGroup

## Approach

Adobe Spectrum's approach to tags reflects a deeper architectural principle: components that appear in collections should be designed as collections first. Rather than providing a standalone `<Tag>` component, Spectrum offers `TagGroup` as the primary entry point, with individual `Item` elements inside it. This design choice was made because real-world usage of tags almost never involves a single isolated tag — they appear in groups, and the group has its own semantic identity, layout rules, and interactive behaviors that cannot be bolt-on afterthoughts. The naming "TagGroup" rather than "Chip" also signals Spectrum's intent: these are **labels and metadata indicators**, not action triggers or suggestions (Adobe has separate components for those). The system's accessibility-first heritage from React Aria means the component ships with keyboard navigation, mandatory labeling, and removal focus management as non-negotiable defaults rather than optional enhancements. Finally, Spectrum's architecture separates the data model (`items` prop with render functions) from presentation, making TagGroup suitable for both static hardcoded tags and dynamic data-driven scenarios without requiring different components.

## Key Decisions

1. **Container-first architecture (TagGroup wraps Items)** (HIGH) — Tags cannot exist as standalone components; they must live inside a TagGroup. The WHY: the group manages semantic identity (what are these tags collectively labeling?), layout (how do they wrap and overflow?), and interaction coordination (what happens when any individual tag is removed?). Forcing the group as the primary component prevents the common anti-pattern where developers add tags piecemeal without ever establishing the group's semantic purpose.

2. **Mandatory labeling enforced at component level** (HIGH) — TagGroup requires either a `label` prop or an `aria-label`/`aria-labelledby` attribute, and will fail validation without one. The WHY: Adobe's accessibility team found that unlabeled tag groups were among the most common accessibility regressions in their product suite — developers would add tags for visual effect without ever considering what a screen reader would announce. Making the label required turns an accessibility requirement into a component API requirement.

3. **Opt-in removal via onRemove callback** (HIGH) — Remove buttons on tags only appear when the `onRemove` handler is provided. The WHY: tags serve two fundamentally different roles — sometimes they are informational labels (read-only), sometimes they are editable inputs (removable). Rather than using a separate component for each mode, Spectrum uses the presence of `onRemove` as a mode switch. This prevents accidental destructive UI where a developer adds remove buttons to informational tags by mistake.

4. **maxRows with "show more" overflow control** (MEDIUM) — TagGroup supports a `maxRows` prop that collapses excess tags behind a "show more" button, managing overflow without truncation or horizontal scroll. The WHY: in content-rich Adobe products (like Creative Cloud asset tagging or Experience Platform audience segmentation), a tag group might contain dozens of tags that would break layout if rendered in full. The `maxRows` collapse pattern gives users access to all tags without destroying the surrounding layout.

5. **actionLabel + onAction for bulk operations** (MEDIUM) — A separate action button (e.g., "Clear all") can be added to the TagGroup via `actionLabel`/`onAction` props, distinct from individual tag removal. The WHY: bulk operations on tag collections are common (clear all filters, remove all tags) but should not be conflated with removing individual tags. Separating them at the API level keeps the remove-one vs. remove-all affordances visually and semantically distinct.

## Notable Props

- `onRemove`: Receives a `Set<Key>` of removed item keys — interesting because it receives a Set even for single removals, making batch removal from external UI trivially composable with the same handler
- `maxRows`: Controls overflow collapse — rare among tag systems to offer this at the component level rather than requiring custom wrapper logic
- `renderEmptyState`: Explicit empty state rendering — important for form contexts where a tag group that starts full might become empty after user removals
- `errorMessage` / `isInvalid`: Makes TagGroup a first-class form field participant — tags can represent invalid states in form validation flows, which most other systems don't support natively
- `href` (on Item): Individual tags can be navigation links, not just labels or buttons — useful for faceted search result pages

## A11y Highlights

- **Keyboard**: Arrow keys navigate between tags within the group. Delete/Backspace on a focused tag triggers `onRemove` if provided. Escape key clears selection (configurable via `escapeKeyBehavior`). After a tag is removed, focus moves to the next tag or to the TagGroup itself if the last tag was removed.
- **Screen reader**: The TagGroup container announces via its required `aria-label`. Each tag's text is announced. When a tag is removable, the remove button is announced as a separate focusable element with an auto-generated `aria-label` like "Remove [tag name]". The `textValue` prop on Item allows screen reader text to differ from visual text for complex tag content containing icons or avatars.
- **ARIA**: TagGroup renders as a group with `role="group"`. Individual tags use appropriate listitem semantics. Removal buttons within tags carry descriptive `aria-label` values. RTL layout is automatically handled, which is particularly important for Adobe's international product suite.

## Strengths & Gaps

- **Best at**: Accessibility architecture — the combination of mandatory labeling, keyboard removal flows, automatic remove button aria-labels, and focus management after removal makes this the most a11y-complete tag implementation among Tier 1 systems.
- **Missing**: No built-in semantic color system for status tags (success/warning/error) — TagGroup is purely a categorization/metadata component with no status communication built in, which means teams building status-oriented tag UIs must roll their own color semantics.
