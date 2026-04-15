# Brief Parsing Rules

## GOLDEN RULE
**NEVER infer. NEVER assume. NEVER suppose.**

Only mark a dimension as "covered" if the brief EXPLICITLY and CLEARLY states a decision about it. If there's any ambiguity, it's a GAP.

## What counts as "explicitly stated"

### ✅ COVERED — The brief says it directly:
- "The date picker should open as a popover" → Presentación: Popover ✅
- "Users need to select a range of dates" → Tipo: Range ✅
- "Must support date and time selection" → Hora: DateTime ✅
- "Needs to work in English and Spanish" → i18n: Yes ✅
- "Preset ranges like 'Last 7 days'" → Presets: Yes ✅

### ❌ GAP — The brief hints but doesn't decide:
- "For the dashboard" → does NOT imply inline. Mark Presentación as GAP
- "Mobile app" → does NOT imply modal. Mark Mobile as GAP
- "Payment form" → does NOT imply popover. Mark Presentación as GAP
- "Easy to use" → does NOT cover anything. It's a vague desire, not a spec
- "Modern design" → does NOT imply anything about theming/tokens
- "User-friendly" → means nothing specific
- "Simple" → does NOT imply any specific simplification
- "Schedule meetings" → does NOT explicitly say time is needed. Mark Hora as GAP, but note the context

### ❌ NEVER infer from context words:
- "formulario" / "form" → NOT automatically popover
- "dashboard" / "reportes" → NOT automatically inline
- "filtro" / "filter" → NOT automatically inline
- "click" → NOT automatically popover
- "mobile" or "app" → NOT automatically responsive
- "error" mentioned in any context → NOT automatically validation covered
- "fácil" / "simple" / "rápido" → covers NOTHING

## Dimensions to check

For each dimension below, only mark as covered if the brief EXPLICITLY mentions it:

1. **Tipo de selección** — Must say "single", "range", "both", "fecha única", "rango de fechas" explicitly
2. **Presentación** — Must say "popover", "dropdown", "inline", "siempre visible" explicitly
3. **Hora** — Must say "hora", "time", "fecha y hora", "solo fecha" explicitly
4. **Min/Max dates** — Must mention date limits explicitly
5. **Disabled dates** — Must mention blocking/disabling specific dates
6. **Presets** — Must mention predefined ranges or quick-select options
7. **i18n** — Must mention multiple languages or localization
8. **Accesibilidad** — Must mention a11y, WCAG, keyboard, screen reader
9. **Mobile / Responsive** — Must mention mobile behavior, responsive, small screens
10. **Validación** — Must mention error handling, invalid dates, validation
11. **Timezone** — Must mention timezone, UTC, zones
12. **Motion** — Must mention animation, transitions, motion
13. **Theming** — Must mention dark mode, themes, tokens, multi-brand

## Output format

For each covered dimension:
```
✅ [Dimension]: [Value] — "[exact text from brief that supports this]"
```

For each gap:
```
🔴 [Dimension] (HIGH) — [Why this matters]
🟡 [Dimension] (MEDIUM) — [Why this matters]
⚪ [Dimension] (LOW) — [Why this matters]
```

## Impact levels
- **HIGH**: Tipo de selección, Presentación, Accesibilidad — affect core architecture
- **MEDIUM**: Hora, Mobile, Validación, Min/Max, Disabled dates — affect scope and UX
- **LOW**: Timezone, Motion, Theming, i18n, Presets — can be deferred to v2
