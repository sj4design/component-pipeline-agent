---
system: Material Design 3
component: Search (SearchBar + SearchView)
url: https://m3.material.io/components/search/guidelines
last_verified: 2026-03-28
---

# Search

## Approach

Material Design 3 treats Search as a full navigational and discovery pattern rather than a simple input widget — it is arguably the most architecturally ambitious Search component among Tier 1 design systems. The component splits into two complementary pieces: **SearchBar**, a persistent docked input that lives at the top of the screen and remains accessible at all times, and **SearchView**, a full-screen modal (or docked modal on large screens) that expands from the bar and hosts suggestions, filters, and results. The philosophy is that search is not just data entry — it is an *experience transition*. When a user initiates search on mobile, the entire screen context should change to signal that a new browsing mode has begun. The dual-component model is the direct result of M3's "adaptive" design ethos: on mobile, SearchView becomes a full-screen takeover because there is no room to display results alongside the existing UI; on tablets and larger displays, a DockedSearchBar with an inline results panel achieves the same goal without jarring full-screen transitions. This explicit acknowledgment of adaptive layouts is what separates M3's Search from every other system that ships a single fixed-width input and leaves responsive behavior to the consumer.

## Key Decisions

1. **SearchBar + SearchView as separate but coupled components** (HIGH) — Google separated the bar (persistent affordance) from the view (search session UI) because the two serve fundamentally different interaction modes. The bar provides quick re-entry — users can see it, know search is available, and tap to start. The view provides dedicated focus: once open, all other on-screen elements animate off-screen and are marked `importantForAccessibility=no`, so screen reader users cannot accidentally interact with stale content behind the modal. This explicit sibling-view management is WHY the architecture cannot be collapsed into a single component without losing the accessibility guarantees.

2. **Auto-show keyboard on SearchView open** (HIGH) — The `autoShowKeyboard` attribute (default: `true`) fires the software keyboard immediately when SearchView expands. The reasoning is that the only reason a user opens SearchView is to type; making them tap the input again after opening the view adds a round-trip tap with zero value. The default is configurable specifically for cases like voice-search or barcode-scan entry points where the keyboard should not appear.

3. **Clear button shows/hides based on input state** (MEDIUM) — The clear button is only present when the user has entered text. The rationale is affordance efficiency: showing a clear button on an empty field creates a non-functional interactive element, which is confusing for both mouse users (what does it do?) and assistive-technology users (screen readers would announce a button with no useful action).

4. **Predictive Back integration** (MEDIUM) — When SearchView is connected to a SearchBar, the Android Predictive Back gesture is wired automatically — no developer integration needed. This reflects Google's philosophy that system gestures should be consistently handled by the component, not left as an exercise for each app team. Inconsistent back-gesture behavior in search screens was a known user frustration in pre-M3 apps.

5. **TextCentered variant for SearchBar** (LOW) — The `app:textCentered` attribute centers the placeholder and typed text within the bar. This is an expressive choice for apps with a strong brand identity (music apps, discovery apps) where the centered text signals a "featured" rather than "utilitarian" search experience. The default remains left-aligned to preserve scannability for productivity contexts.

## Notable Props

- `autoShowKeyboard`: Controls whether the software keyboard fires on SearchView open. Interesting because it exposes an opinionated default (true) while acknowledging non-keyboard input modalities.
- `app:liftOnScroll`: SearchBar elevates from surface level when the user scrolls content beneath it, creating depth separation. Reflects M3's elevation-as-hierarchy principle.
- `adaptiveMaxWidthEnabled`: Prevents SearchBar from stretching to full screen-width on tablets, where a 100% wide input looks visually unbalanced.
- `app:hideNavigationIcon`: Defaults to `true` inside SearchView, `false` on SearchBar — controls whether a back/close icon appears. The distinction reinforces which state the user is in.

## A11y Highlights

- **Keyboard**: Enter submits the search query; Escape / Predictive Back dismisses SearchView and restores previous screen state. The back-stack integration is automatic.
- **Screen reader**: SearchView sets all sibling views to `importantForAccessibility=no` when open, preventing focus from escaping into background content — a robust modal pattern that most systems leave to developers. Text content inside SearchBar is automatically exposed to accessibility services.
- **ARIA**: On Android/Compose, the component uses the platform's native accessibility APIs rather than ARIA. For web implementations of M3, `role="search"` on the form wrapper and `aria-label` on the input are the recommended pattern per M3 web guidance.

## Strengths & Gaps

- **Best at**: Full search experience lifecycle — the SearchBar→SearchView transition is the most complete search UX pattern of any Tier 1 system, explicitly handling adaptive layouts, accessibility modal management, and system gesture integration out of the box.
- **Missing**: No built-in scope/category selector dropdown; no loading/async-results state within the component itself — consumers must compose those patterns manually using chips or custom views inside SearchView.
