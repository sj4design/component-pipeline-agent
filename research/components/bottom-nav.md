# Bottom Nav — Component Research

**Date:** 2026-04-17
**Mode:** Max (all 24 systems, all patterns)
**Systems analyzed:** 24
**Systems with dedicated component:** 4 — Material Design 3 (Navigation Bar), Ant Design Mobile (TabBar), Base Web (BottomNavigation), Orbit (NavigationBar)
**Note:** Bottom Nav is the most absent component in the corpus — 20/24 systems don't provide one, deferring to native mobile platforms. The 4 systems that do are all mobile-first or have strong mobile-web needs.

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Spectrum | Desktop-first (Photoshop, Illustrator); mobile apps usan componentes nativos de plataforma | Primitivas nativas de plataforma |
| Carbon (IBM) | Enterprise desktop con sidebar navigation jerárquica; mobile = hamburger collapse | IBM Mobile SDK components |
| Polaris | Web admin usa sidebar; mobile apps son nativos iOS/Android | UITabBarController (iOS) / BottomNavigationView (Android) |
| Atlassian | Jerarquía profunda de navegación (Projects > Boards > Issues) incompatible con 3-5 destinos planos | Native mobile implementations |
| Twilio Paste | Console tools enterprise web-first; sidebar/top nav domina | Sin workaround documented |
| Lightning (Salesforce) | Mobile SDK a nivel app-shell (declarativo), no componente web composable | Salesforce Mobile SDK app shell config |
| GitHub Primer | Desktop web; GitHub mobile = nativo iOS/Android | Native TabBarController |
| shadcn/ui | Web-first; sin receta oficial pero composición posible | `Tabs` + `position: fixed` + `bottom: 0` manual |
| Playbook | eBay seller tools web-focused | Sin workaround documented |
| REI Cedar | E-commerce web; responsive collapse pattern | Sin workaround documented |
| Wise | Mobile app = nativo; web DS sin bottom nav | Native platform tabs |
| Dell | Enterprise desktop-focused | Sin workaround documented |
| Radix UI | Primitivas headless; sin targeting a fixed-bottom mobile nav | `NavigationMenu` + layout manual |
| Chakra UI | Community recipes existen pero no oficiales | `Box position="fixed" bottom={0}` + `HStack` |
| GOV.UK | Servicios gubernamentales = flujos lineales task-by-task; tab switching contradice el modelo | `<nav>` con enlaces sequenciales |
| Fluent 2 | `TabList` puede posicionarse en bottom pero requiere fixed CSS manual | `TabList` + manual sticky bottom |
| Gestalt (Pinterest) | App móvil = native tabs; web usa side panel | Native iOS/Android bottom tabs |
| Mantine | No; community recipes sin estándar | `Tabs` + fixed positioning |
| Evergreen | Desktop analytics dashboard; sidebar nav | Sin workaround documented |
| Nord | Software clínico desktop-first | Sin workaround documented |

---

## How Systems Solve It

### Material Design 3 — "El más completo y opinionado: pill indicator + scroll-hide + badge integration"

M3's Navigation Bar es la especificación de referencia para bottom nav en todo el corpus. Tres decisiones distinguen su implementación: el **límite hard de 3-5 destinos** (menos = tabs; más = drawer), el **active indicator pill-shaped** (reemplaza el color-tint de M2 con una "pila" visible que funciona en modo oscuro y con Dynamic Color), y el **scroll-hide/show behavior** (el bar se esconde al scroll hacia abajo para maximizar viewport vertical, y reaparece al scroll hacia arriba o al llegar al fondo). El badge integration está first-class — cada `NavigationBarItem` acepta un `BadgedBox` wrapper para dot-badge o count-badge directamente.

**Design Decisions:**
- **3-5 destinos hardcoded:** → menos de 3 = usa Tabs (misma jerarquía); más de 5 = targets de toque demasiado pequeños en pantallas de 360dp → la restricción no es arbitraria — Google tiene research de uso mostrando abandonment rate cuando los touch targets son < 48dp → **Para tu caso:** diseñar la arquitectura de información para 3-5 destinos primarios antes de decidir usar bottom nav; si necesitas más, considera una estructura de app diferente
- **Pill-shaped active indicator:** → el color tinting de M2 fallaba en high-contrast mode y en temas dinámicos generados por Material You → la pill crea una zona activa clara independiente del color → **Para tu caso:** implementar con un token de shape (`shapeFull` = 100% border-radius) para compatibilidad con customización de forma
- **Scroll-hide behavior:** → en pantallas pequeñas, 56dp de nav bar reduce el viewport útil significativamente durante lectura → restaurar al primer scroll-up combina con el comportamiento de iOS y Android nativos → **Para tu caso:** implementar con IntersectionObserver o scroll event listener; considerar si el producto usa Fixed Bottom Action Buttons (conflicto potencial)
- **`selectedIcon` prop separado del `icon`:** → permite íconos filled/outlined para active/inactive respectivamente — la convención de M3 donde los íconos filled indican selección → **Para tu caso:** si el sistema usa íconos con estados filled/outlined, exponer selectedIcon como slot separado
- **Badge integration via BadgedBox wrapper:** → el badge es semánticamente parte del destination label, no del ícono — el count debe anunciarse junto con el nombre del destino → **Para tu caso:** diseñar la API de badge al nivel del nav item, no del ícono

**Notable Props:** `NavigationBarItem: { icon, selectedIcon, label, badge (BadgedBox wrapper), alwaysShowLabel }`, scroll behavior (hide-on-scroll), `NavigationBar` with `3-5 items`

**Accessibility:** `role="navigation"` landmark. Cada item tiene `aria-selected` para active state. Badge count anunciado como parte del label del destination ("Home, 3 new notifications"). Minimum touch target 48x48dp.

---

### Ant Design Mobile (antd-mobile) — "TabBar: badge first-class + safe-area + icon dinámico"

Ant Design Mobile es notable por dos decisiones: primero, **mantener Bottom Nav fuera del `antd` desktop library** — en un package separado (`antd-mobile`) para móvil. Esto previene que el bundle desktop incluya patrones móviles y clarifica que bottom nav es un concern exclusivamente móvil. Segundo, el **`badge` prop directo en `TabBar.Item`** — en lugar de requerir que el consumer envuelva el ícono en un Badge component, el tab item acepta props de badge directamente, reduciendo complejidad de composición. El **safe-area handling** (`safeArea` prop) gestiona el padding bottom para notches y gesture bars de iPhones automáticamente — el único sistema que documenta esto explícitamente.

**Design Decisions:**
- **Package separado `antd-mobile`:** → bottom nav es un patrón móvil; incluirlo en el desktop library contamina el bundle y confunde el scope del sistema → **Para tu caso:** si el sistema sirve tanto desktop como mobile, considera namespacing o un sub-paquete para componentes exclusivamente móviles
- **`icon` como función `(active: boolean) => ReactNode`:** → permite íconos animados o switched sin mantener dos icon sets en el consumer → el ícono puede ser completamente diferente en active state → **Para tu caso:** exponer el estado active en el render prop del ícono es más flexible que `selectedIcon` como prop estática
- **`safeArea` prop:** → iPhone con gesture bar requiere `padding-bottom: env(safe-area-inset-bottom)` → sin esto el nav bar se oculta detrás de la gesture indicator → **Para tu caso:** siempre incluir safe-area handling, idealmente automático por default en lugar de opt-in

**Notable Props:** `TabBar`: `activeKey`, `onChange`. `TabBar.Item`: `key`, `icon: ReactNode | (active: boolean) => ReactNode`, `title`, `badge: BadgeProps`, `safeArea: boolean`

**Accessibility:** ⚠️ A11y débil — renders como lista de botones con `aria-selected`; badge count NO se anuncia automáticamente (requiere manual aria-label en el item); sin `role="navigation"` wrapper por default.

---

### Base Web (Uber) — "El único web DS con BottomNavigation completo + override system"

Base Web's `BottomNavigation` es uno de solo dos web design systems en todos los tiers (junto con Orbit) que incluye un componente bottom nav dedicado para web. Uber lo necesita porque el rider app, driver app y Uber Eats tienen variantes mobile-web donde los botones nativos no están disponibles. El **override system de Base Web** permite customizar cada aspecto del componente (icon rendering, active indicator shape, label visibility) sin forking — la filosofía de customización por composición de Base Web aplicada a bottom nav.

**Design Decisions:**
- **Componente web dedicado (no receta):** → Uber's mobile-web experiences necesitan un bottom nav first-class; las recetas de "Tabs + fixed CSS" no tienen estados de active indicator, badge integration, ni scroll behavior built-in → **Para tu caso:** si más del 30% de usuarios acceden via mobile web, un componente dedicado es más mantenible que recetas manuales
- **Overrides system para customización profunda:** → diferentes productos de Uber necesitan diferentes active indicator shapes y label comportamientos → el override system previene forks → **Para tu caso:** exponer tokens de customización para: active indicator color/shape, label visibility rules, item min-width

**Notable Props:** `BottomNavigation` con overrides system. Items con `icon`, `label`, active state styling.

**Accessibility:** Renders como `<nav>` con `role="navigation"`. Cada item es `<a>` o `<button>`. Active item usa `aria-current="page"`. Touch targets 48x48dp minimum.

---

### Orbit (Kiwi.com) — "NavigationBar: simplificado para travel booking flows"

Orbit's `NavigationBar` cubre los 4-5 destinos primarios de la app de reservas: Search, Trips, Manage, Profile. Implementación más simple que Base Web — sin override system, sin scroll-hide — pero cubre el esencial. Labels siempre visibles (no icon-only mode). Parte del stack React + React Native de Orbit, lo que significa que el mismo componente funciona en web y en mobile nativo con mínimas diferencias.

**Design Decisions:**
- **Labels siempre visibles:** → en travel booking, los usuarios necesitan saber claramente a dónde van antes de tocar → icon-only navigation en este contexto aumenta errores → **Para tu caso:** recomendar labels visibles por default; icon-only solo como override en contextos con espacio extremadamente limitado

**Notable Props:** `NavigationBar` con items de icon + label, active state, color differentiation. Sin badge integration documented.

**Accessibility:** `role="navigation"` wrapper. Items como buttons con `aria-selected` para active state.

---

## Pipeline Hints

**Archetype recommendation:** `nav-content`
Rationale: Bottom Nav es un componente de navegación primaria — su propósito es cambiar el destino/contexto de la aplicación. El archetype nav-content es el correcto.

**Slot consensus:** (4 sistemas con el componente)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| nav-items | container | yes | 4/4 | Container para los items individuales; 3-5 items |
| icon | icon | yes | 4/4 | Ícono por destination; M3 + Ant: también `selectedIcon` / active variant |
| label | text | yes | 4/4 | Texto del destination; Orbit: siempre visible; M3: oculto en scroll (excepto active) |
| badge | text/visual | no | 2/4 | M3 (BadgedBox), Ant Design (badge prop); Base Web y Orbit no documented |
| active-indicator | visual | no | 2/4 | M3 pill shape; Ant Design color-only; Base Web via overrides |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| activeKey/selectedItem | state | key/index | 4/4 | Active destination control |
| itemCount | constraint | 3-5 | 2/4 | M3 explicit; implied by others |
| isLabelVisible | boolean | true/false | 1/4 | M3: alwaysShowLabel per item; others: labels always visible |
| hasSafeArea | boolean | true/false | 1/4 | Ant Design only documented; all mobile web needs this |
| onChange | event | callback | 4/4 | Navigation event handler |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasBadge | 2/4 | false | Notification count/dot on nav item |
| isScrollHide | 1/4 | false | M3 scroll-hide/show behavior |
| alwaysShowLabel | 1/4 | true | M3: label visible even when not active |
| hasSafeArea | 1/4 | false | Bottom padding for iPhone notch/gesture bar |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default (inactive) | 4/4 | icon + label, muted color | Unselected destination |
| active/selected | 4/4 | icon + label, accent color + optional pill indicator | Current destination |
| hover | 2/4 | subtle background change (web only) | M3, Base Web |
| focus | 4/4 | focus ring | Keyboard navigation |
| badge-present | 2/4 | dot or count overlaid on icon | M3, Ant Design |
| hidden (scroll-hide) | 1/4 | translateY(100%) transition | M3 only |

**Exclusion patterns found:**
- icon-only × primary navigation — all systems with labels recommend visible labels for primary nav; icon-only appropriate only for secondary toolbars
- scroll-hide × fixed-bottom-button — conflicto visual cuando hay un FAB o bottom sheet que también usa fixed positioning

**Building block candidates:**
- nav-item → `.BottomNavItem` — todos los sistemas tienen un sub-componente/element para el item individual
- badge → `.NavBadge` — integrado en el item; no un BB separado

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| activeIndicatorShape | pill, underline, background | 2/4 | M3 pill; others color-only |
| labelVisibility | always, selected-only, never | 2/4 | M3 configurable; Orbit always |

**A11y consensus:**
- Primary role: `role="navigation"` en el `<nav>` wrapper (Base Web, Orbit explicit; M3 Android equivalent)
- Items: `<a>` para page navigation con `aria-current="page"`; `<button>` para tab-switch con `aria-selected="true"`
- Badge counts: DEBEN ser incluidos en el accessible name del nav item ("Messages, 5 unread") — NO solo como badge visual; solo M3 hace esto automáticamente
- Labels: siempre visibles en nav primaria — icon-only navigation es un anti-pattern para destinos primarios
- Touch targets: mínimo 48x48dp (WCAG 2.5.5); implementar con min-height en CSS
- Safe area: `padding-bottom: env(safe-area-inset-bottom)` requerido en todos los mobile web implementations
- Focus: todos los items deben ser alcanzables por teclado; scroll-hide no debe ocultar el nav bar durante keyboard navigation (solo mouse scroll)

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template — same Base component | Same component set |
| < 40% | Separate component | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Standard bottom nav (icon + label) | 100% | Template | Icons + labels for 3-5 destinations | All 4 |
| Icon-only (no labels) | 70% | Template | Labels hidden; icon as sole affordance — discouraged for primary nav | M3 (discouraged mode) |
| Badge-enabled nav | 80% | Template | Badge/count overlay on icon | M3, Ant Design |
| Scroll-hide animated nav | 60% | Extension | CSS transform on scroll direction | M3 |
| NOT bottom nav — Tabs | 0% | Not-bottom-nav | Tabs are inline/contextual; bottom nav is fixed/app-level | All systems |
| NOT bottom nav — Sidebar (collapsed) | 0% | Not-bottom-nav | Hamburger menu ≠ bottom nav; different interaction model | Carbon, Atlassian |

---

## What Everyone Agrees On

1. **3-5 destinations maximum:** All systems that implement bottom nav (M3, Ant, Base Web, Orbit) stay within 3-5 items. This is both a UX constraint (more than 5 creates touch-target issues) and a semantics constraint (bottom nav is for primary, flat navigation — not hierarchical).

2. **Icon + label combination:** Every implementing system shows both icon AND label. Icon-only navigation for primary destinations is flagged as an anti-pattern in M3 and Orbit explicitly.

3. **Active state must be visually distinct:** Color change is the minimum; M3 adds an active indicator pill; all systems require the active destination to be immediately recognizable without hover.

4. **Fixed positioning at screen bottom:** All implementations are `position: fixed; bottom: 0`. This is intrinsic to the component's purpose.

5. **Touch targets minimum 48dp:** Universal mobile accessibility requirement. All documented implementations meet this.

---

## Where They Disagree

**¿Pill-shaped active indicator o color-only?**
- **Option A: Pill/background indicator** (M3) — visible active zone independent of color; works in high-contrast and dynamic color modes; requires more visual real estate per item
- **Option B: Color-only differentiation** (Ant Design, Orbit basic) — simpler; depends on color perception to distinguish active from inactive
- **Para tu caso:** Pill indicator is more robust for dark mode and color-blind users; especially important if using a highly saturated or low-contrast brand color as active color

**¿Scroll-hide behavior por defecto o siempre visible?**
- **Option A: Scroll-hide** (M3 spec) — maximiza viewport durante scroll; respeta convención de Android/iOS nativos
- **Option B: Siempre visible** (Base Web, Orbit, Ant) — predecible; no confunde al usuario con la desaparición del nav; más fácil de implementar sin riesgo de accessibility issues
- **Para tu caso:** Siempre visible es el default más seguro; scroll-hide como enhancement opcional, pero requiere que keyboard navigation no desencadene el hide

**¿Safe-area handling automático o opt-in?**
- **Option A: Auto safe-area** — el componente siempre agrega `padding-bottom: env(safe-area-inset-bottom)` → correcto en todos los dispositivos modernos con notch
- **Option B: `safeArea` prop opt-in** (Ant Design) — el consumer decide → riesgo de que la mayoría lo olvide
- **Para tu caso:** Automático por default; es la decisión correcta en el 99% de contextos mobile web

**¿Badge API en el nav item o composición externa?**
- **Option A: Badge prop en el nav item** (M3 BadgedBox, Ant Design `badge` prop) — ergonomía excelente; a11y garantizada (el count se anuncia con el label del destination)
- **Option B: Composición manual** — wrapping del icon con Badge component → el consumer debe manejar a11y manualmente
- **Para tu caso:** Badge built-in en el nav item es la arquitectura correcta; garantiza que el count se incluya en el accessible name del destination

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Icon + label, pill active | Active pill behind icon, full labels always visible | Mobile apps, PWAs, consumer products | M3 |
| Icon + label, color active | Color change para active; labels always visible | Travel, consumer apps | Orbit, Base Web |
| Icon + label, scroll-hide | Bar se oculta en scroll down | Content-heavy apps donde el viewport es crítico | M3 |
| Icon-only (active pill) | Labels ocultos; icon como sole affordance | Secondary toolbars (NO primaria) | M3 discouraged mode |

**Bottom nav estándar (M3 pattern):**
```
┌──────────────────────────────────────┐
│                                      │
│         (page content)               │
│                                      │
├──────────────────────────────────────┤
│  🏠      🔍      📬      👤         │
│ ┌────┐                               │
│ │Home│  Search  Msgs   Profile       │
│ └────┘  (active pill behind icon)   │
└──────────────────────────────────────┘
            fixed bottom
```

**Con badge:**
```
│  🏠      🔍      📬³     👤         │
│                  └─┘                 │
│  Home  Search  Msgs    Profile       │
│                 badge=3              │
```

**Scroll-hide state:**
```
On scroll down:         On scroll up:
┌──────────────────┐    ┌──────────────────┐
│                  │    │                  │
│   (content)      │    │   (content)      │
│                  │    │                  │
│  (nav hidden     │    ├──────────────────┤
│   translateY 100%)│   │  🏠 🔍 📬 👤    │
└──────────────────┘    └──────────────────┘
```

---

## Risks to Consider

**Risk 1: Badge count no anunciado a screen readers** (HIGH)
Un badge de "3 mensajes" sobre el ícono de Messages que no se incluye en el accessible name del nav item es invisible para usuarios de screen reader. Solo M3 maneja esto automáticamente. Ant Design requiere trabajo manual.
**Mitigation:** El count del badge DEBE ser parte del `aria-label` del nav item: "Messages, 3 unread". Si el badge API está separado del nav item API, es imposible garantizar esto.

**Risk 2: Safe-area no implementado** (HIGH)
En iPhones con notch o gesture bar (iPhone X en adelante), un bottom nav sin `padding-bottom: env(safe-area-inset-bottom)` queda parcialmente tapado por la gesture bar del sistema. Afecta a un porcentaje significativo de usuarios móviles.
**Mitigation:** Incluir safe-area padding automáticamente. No opt-in.

**Risk 3: Conflict con Fixed Bottom Action Buttons (FAB, bottom sheets)** (MEDIUM)
Si la app tiene tanto un Bottom Nav como un FAB o bottom sheet, el z-index y el spacing deben coordinarse. El FAB debe flotar SOBRE el Bottom Nav, y las bottom sheets deben compensar la altura del nav.
**Mitigation:** Exportar la altura del bottom nav como token (`--bottom-nav-height`) para que otros componentes puedan usarlo para calcular su posición.

**Risk 4: Scroll-hide oculta nav durante keyboard navigation** (MEDIUM)
Si el scroll-hide se implementa basado en scrollY events, puede ocultar el Bottom Nav cuando el usuario mueve el foco con Tab key — un behavior completamente inesperado para usuarios de teclado.
**Mitigation:** El scroll-hide solo debe responder a gestos de mouse/touch, no a eventos de scroll causados por keyboard navigation.

**Risk 5: Más de 5 destinos en bottom nav** (MEDIUM)
Equipos de producto presionan para agregar un 6to o 7mo destino "porque es importante". Los touch targets se reducen a <44dp en pantallas de 360dp, fallando WCAG 2.5.5.
**Mitigation:** Enforcer el máximo de 5 items en el componente API (error en desarrollo si se excede). Documentar alternativas: tab bar + "More" que abre una sheet con destinos adicionales.

---

## Dimension Scores (sistemas CON el componente)

| Sistema | API Design | Mobile UX | A11y | Scroll Behavior | Badge Integration | Total |
|---------|------------|-----------|------|-----------------|-------------------|-------|
| Material Design 3 | 9 | 10 | 8 | 10 | 9 | **46/50** |
| Ant Design Mobile | 8 | 8 | 5 | 6 | 9 | **36/50** |
| Base Web | 7 | 8 | 9 | 5 | 5 | **34/50** |
| Orbit | 7 | 8 | 8 | 5 | 4 | **32/50** |

⚠️ LOW DATA: Solo 4 sistemas con componente dedicado — los scores deben interpretarse con este contexto.

---

## Next Steps

1. **`/spec bottom-nav`** — Generate config.json with anatomy (3-5 items, icon, label, badge, active indicator)
2. **`/enrich bottom-nav`** — Add a11y (navigation landmark, aria-current, badge announcement, touch targets) and tokens
3. **`/build bottom-nav`** — Full pipeline in one command using this research as cache
4. **`/build bottom-nav --max`** — Use pre-generated config without scope questions
5. **`/research bottom-nav --fresh`** — Re-run research from scratch (bypasses this cache)

**Key spec decisions to make:**
- Active indicator: pill-shaped (M3) or color-only?
- Scroll-hide behavior: built-in or CSS-only?
- Safe-area handling: automatic or opt-in prop?
- Badge API: built-in on nav item or external composition?
- Max item enforcement: hard API limit (5) or documentation-only?
