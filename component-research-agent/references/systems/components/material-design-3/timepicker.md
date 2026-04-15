---
system: Material Design 3
component: Time Picker
url: https://m3.material.io/components/time-pickers
last_verified: 2026-03-28
---

# Time Picker (Material Design 3)

## Approach
Material Design 3's Time Picker is the most visually distinctive time input in the Tier 1 landscape, featuring an analog clock dial as its primary interaction mode alongside a text input fallback. The dial paradigm reflects Google's mobile-first design philosophy: on touchscreens, dragging a clock hand to select hours and minutes is ergonomically superior to tapping through incrementing spinners or typing into a text field. The component offers two variants — dial (with the analog clock) and text input — and the user can switch between them mid-interaction using a keyboard icon that toggles to the text input mode. This toggle respects user preference without requiring a developer prop for input mode selection. MD3's dial picker renders in a modal-like surface (a dialog on mobile) because the clock face requires significant vertical space that cannot be accommodated inline in most form layouts. The 12-hour vs. 24-hour format is locale-driven, automatically adapting to the system locale, which is essential for a component used in Google's global consumer products where both formats are common.

## Key Decisions
1. **Dial as primary interaction mode** (HIGH) — The analog clock dial is the default entry point because MD3's primary deployment environment is Android, where touch interaction with a large radial target is faster than text entry. The dial specifically eliminates the need for users to know the exact numeral by providing a spatial-memory interaction — users remember "about 2 o'clock" rather than typing "2". This approach degrades gracefully when a keyboard is attached, at which point the text input mode becomes the more efficient path.
2. **Toggle between dial and text input within one component** (HIGH) — Rather than offering two separate components or forcing a developer prop to select input mode, MD3 lets users switch modes via a UI toggle button inside the picker. This is a user-agency decision: MD3's UX research found that power users prefer text entry while casual users prefer the dial, and a single component that adapts prevents developers from guessing which mode their users prefer.
3. **Locale-aware 12/24 hour format** (MEDIUM) — The time format automatically follows the device/browser locale. Developers cannot override this programmatically in the web component implementation, which is a deliberate internationalization stance: showing 24-hour time to a US user or 12-hour time to a German user is a localization error, not a design option. This opinionation simplifies internationalization but removes flexibility for apps that deliberately deviate from locale defaults.

## Notable Props
- `value`: Time string in HH:MM or HH:MM:SS format.
- `min` / `max`: Time boundary constraints.
- Web component: `<md-time-picker>` with `type="dial"` or `type="text"` to override the default dial mode explicitly.

## A11y Highlights
- **Keyboard**: In dial mode, the hour/minute segments accept keyboard input directly. Arrow keys increment/decrement the selected time unit. In text input mode, standard text field keyboard behavior applies.
- **Screen reader**: The dial region is accessible via keyboard-triggered text entry; the dial itself (the visual clock face) is not screen-reader navigable in the SVG/canvas implementation — this is a documented gap. Text input mode is fully accessible.
- **ARIA**: Dialog wrapper has `role="dialog"` and `aria-modal="true"`. Time input fields use `role="spinbutton"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`.

## Strengths & Gaps
- **Best at**: Touch-native time selection — the dial interaction is the most mobile-optimized time entry method in any Tier 1 system.
- **Missing**: The dial is not fully accessible without switching to text input mode, creating a two-class experience for keyboard and screen reader users.
