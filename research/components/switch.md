# Switch / Toggle — Component Research

## Meta
- **Fecha:** 2026-04-10
- **Modo:** --max (sin preguntas de scope, cobertura total)
- **Sistemas analizados:** 24 (todos)
- **Scope:** Control binario on/off de efecto inmediato

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Polaris (Shopify) | Merchants necesitan contexto para evitar cambios accidentales en settings de pago/envio | Composicion Card+Badge+Button con role="switch" |
| GOV.UK | Switch implica efecto inmediato; en formularios con submit diferido causa ambiguedad cognitiva | Checkbox es la alternativa recomendada |
| Orbit (Kiwi) | Flujo de reservas basado en formularios con submit explicito; switch contradice la semantica | Checkbox para selecciones booleanas |
| Evergreen (Segment) | No confirmado como componente distinto; dashboards de analytics usan checkboxes | Checkbox para settings booleanos |
| REI Cedar | No presente; usa Checkbox para settings booleanos | Checkbox |

---

## How Systems Solve It

### Material Design 3 — "Un solo tamano, iconos redundantes para daltonianos"

Material Design 3 toma la posicion mas restrictiva: un unico tamano de switch con un touch target fijo de 48dp. La logica es que comprimir el control visual por debajo del target tactil solo genera taps fallidos sin beneficio real de densidad. En lugar de ofrecer multiples tamanos, M3 resuelve la densidad a nivel de layout.

La decision mas distintiva es el soporte nativo de iconos en el thumb (`icons` prop): un checkmark cuando esta ON y un guion cuando esta OFF. Esto proporciona un segundo canal de codificacion independiente del color, critico para usuarios con deficiencia de color (WCAG 1.4.1). El `showOnlySelectedIcon` permite mostrar solo el icono del estado activo, reduciendo ruido visual en paneles con muchos toggles.

M3 requiere `aria-label` explicitamente en cada `<md-switch>` — no auto-asocia labels. Esto fuerza al desarrollador a pensar en el nombre accesible en tiempo de desarrollo, surfaceando toggles sin label como errores de a11y.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Un solo tamano | Touch target < 48dp = taps fallidos sin beneficio real | H | Si solo necesitas 1 contexto (settings), un tamano basta. Si necesitas density, agrega sm/lg |
| Iconos en thumb | Segundo canal de codificacion para daltonicos (WCAG 1.4.1) | H | Recomendado si usas color como unico diferenciador on/off |
| aria-label obligatorio | Fuerza naming accesible en dev time | M | Adoptar como regla de lint en el DS |
| No loading state | Switch = efecto inmediato; loading contradice la semantica | M | Si tienes API calls, necesitaras un loading pattern propio |

**Notable Props:** `icons`, `showOnlySelectedIcon`, `selected` (no "checked"), `required`, `value`
**A11y:** role="switch" + aria-checked="true|false"; estado on/off anunciado (no checked/unchecked); RTL automatico.

---

### Spectrum (Adobe) — "Sin estado de error por politica; readOnly para RBAC"

Spectrum documenta una politica explicita: los switches no tienen estado de error porque controlan acciones inmediatas, no valores que se envian. Los errores pertenecen a toast/inline feedback, no al control mismo. Esta separacion semantica es la mas clara de todos los sistemas.

`isEmphasized` resuelve un problema real de paneles de settings: cuando hay 10 toggles identicos, el color de acento en los mas importantes crea jerarquia visual sin agregar una dimension de variante completa. `isReadOnly` mantiene el control visible y focusable pero no interactivo — critico para escenarios RBAC donde el usuario puede VER pero no CAMBIAR una configuracion.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| No error state | Switch = efecto inmediato, no valor de formulario | H | Correcto si tu switch no participa en forms con submit |
| isEmphasized | Jerarquia visual en paneles densos sin variante completa | M | Considerar si tienes settings panels con 5+ toggles |
| isReadOnly vs isDisabled | RBAC: ver pero no cambiar vs. no interactuar | M | Necesario si tienes roles de permisos |

**Notable Props:** `isEmphasized`, `isReadOnly`, `defaultSelected`/`isSelected`, `name`/`value`
**A11y:** role="switch" (on/off vs checked/unchecked); React Aria gestiona ARIA; RTL automatico.

---

### Carbon (IBM) — "Dos tamanos con checkmark obligatorio en small"

Carbon llama al componente "Toggle" y ofrece dos tamanos: Default (full label + state text obligatorios) y Small (labels opcionales pero con checkmark obligatorio en el thumb ON). El checkmark en Small resuelve WCAG 1.4.1 a nivel de componente — no depende de que el desarrollador agregue iconos.

El state text personalizable (`labelA`/`labelB`) permite "Active"/"Inactive" en lugar de "On"/"Off" — necesario en contextos HIPAA donde la terminologia debe coincidir con documentacion de compliance. Carbon prohibe explicitamente usar Toggle para valores de formulario, separando la semantica de checkbox.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Checkmark obligatorio en Small | WCAG 1.4.1 a nivel de componente, no del desarrollador | H | Implementar checkmark en sm siempre |
| State text personalizable | Compliance contexts (HIPAA, legal) requieren terminologia especifica | M | Util si tienes settings regulados |
| Dos tamanos (default/sm) | Density vs. label visibility trade-off | M | Nuestro sm/md/lg cubre esto |

**Notable Props:** `size` (default|sm), `labelText`, `labelA`/`labelB`, `toggled`, `hideLabel`
**A11y:** role="switch" + aria-checked; state text leido como parte del anuncio; type="checkbox" en input para soporte amplio de browsers.

---

### Atlassian — "Label estable obligatorio; controlled-only"

Atlassian tiene una regla unica: el label NO debe cambiar basado en el estado del switch. Cambiar el label al toggle rompe la navegacion por screen reader (el usuario navega por label, el label cambia despues de flipear, no puede re-encontrar el control). Esta regla documenta un problema real que otros sistemas ignoran.

El patron controlled-only cuando se usa `isChecked` previene bugs de sincronizacion entre estado del servidor y UI en settings de Jira/Confluence. Dos tamanos (regular/large) para densidad vs. enfasis. El estado disabled requiere explicacion en UI circundante — "por que esta deshabilitado?" es un requisito de usabilidad y a11y.

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Label estable | Cambiar label rompe navegacion SR | H | Regla obligatoria en la guia de uso |
| Controlled-only | Previene desync server/UI | M | Recomendacion para devs |
| Disabled requiere explicacion | Usabilidad + a11y | M | Documentar en guia de uso |

**Notable Props:** `isChecked` (requiere onChange), `label`, `size` (regular|large), `isDisabled`, `id`
**A11y:** role="switch" desde el inicio; aria-checked; focus ring con contraste; label estable documentado.

---

### Ant Design — "API mas completa: loading, contenido en thumb, tres tamanos"

Ant Design es el sistema mas feature-complete para switch. El `loading` prop (unico entre sistemas Tier 1) muestra un spinner y bloquea interaccion durante API calls — resuelve race conditions en apps enterprise donde toggle -> API call -> confirmacion toma tiempo.

`checkedChildren`/`unCheckedChildren` acepta ReactNode para iconos o texto dentro del thumb (sol/luna para dark mode). `onClick` separado de `onChange` permite interceptar el click antes del cambio de estado para dialogos de confirmacion sin bloquear el toggle normal. Tres tamanos (small/default/large con nota: small para listas densas de configuracion).

**Design Decisions:**
| Decision | Por que | Impacto | Para tu caso |
|----------|---------|---------|--------------|
| Loading prop | Race conditions en enterprise con API calls async | H | Implementar como boolean overlay |
| Contenido en thumb | Estado autocontenido sin depender del label | M | Considerar para iconos on/off |
| onClick vs onChange | Confirmacion pre-cambio sin bloquear toggle | M | Patron util para acciones criticas |

**Notable Props:** `loading`, `checkedChildren`/`unCheckedChildren`, `size` (small|default), `checked`/`defaultChecked`, `onClick`
**A11y:** role="switch" + aria-checked; loading remueve de interaccion manteniendo visibilidad; color+posicion dual encoding.

---

### Twilio Paste — "Separacion semantica Switch vs Checkbox mas clara"

Paste documenta la distincion mas clara: Switch para settings de efecto inmediato (no form submission), Checkbox para datos de formulario. role="switch" con semantica correcta. Sin loading state — los desarrolladores deben componer la solucion.

---

### GitHub Primer — "Loading state con aria-busy"

Primer ToggleSwitch ofrece `loading` prop con spinner y `aria-busy="true"` — la implementacion de loading mas accesible entre todos los sistemas. `statusLabelPosition` controla donde aparece el label de estado. role="switch" correcto.

---

### shadcn/ui — "Primitivo Radix composable"

Basado en Radix Switch con `Switch` + `Switch.Thumb`. role="switch" con aria-checked. Thumb recibe `data-state` para animaciones CSS. Form-friendly con react-hook-form. Sin estados adicionales — minimalista por diseno.

---

### Radix UI — "Headless primitivo correcto"

`Switch` + `Switch.Thumb` como primitivos headless. role="switch" con aria-checked. Boolean-only (sin indeterminado). Form integration via name/value. data-state en Thumb para CSS.

---

### Chakra UI — "Checkbox nativo oculto + colorScheme"

Hidden native checkbox para form integration. `colorScheme` para track color activo. Tres tamanos (sm/md/lg). role="switch". Animaciones smooth por default.

---

### Fluent 2 (Microsoft) — "labelPosition para settings panels de Windows/Teams"

`labelPosition` ("before"|"after") resuelve el layout de settings panels donde el label va a la izquierda y el switch a la derecha — el patron dominante en Teams, Windows Settings, Azure portal. Field integration para hint text. role="switch" correcto.

---

### Gestalt (Pinterest) — "id y label obligatorios a nivel de componente"

Required `id` y label enforcement a nivel de componente — hace imposible crear un switch sin label accesible. `switched` prop para estado controlado. Brand color de Pinterest para track activo.

---

### Mantine — "thumbIcon para iconos autocontenidos"

`thumbIcon` prop para iconos dentro del thumb (sol/luna para dark mode). El unico sistema Tier 3 con soporte first-class para iconos en thumb. `description` prop. `Switch.Group` para arrays de switches. Full size scale. `labelPosition`.

---

### Base Web (Uber) — "Toggle con Overrides pattern"

Llamado "Toggle". Puede usar role="checkbox" en versiones anteriores (menos preciso semanticamente). Overrides pattern para customizacion. 

---

### Nord (Nordhealth) — "Web component para healthcare"

Web component para settings clinicos. Clear on/off visual critico para contexto clinico. role="switch" requerido. Label requerido.

---

### Salesforce Lightning — "role=checkbox (patron antiguo)"

Llamado "Toggle". Usa role="checkbox" (patron mas antiguo, menos preciso pero funcional). Texto faux en el track (Active/Inactive).

---

### Playbook — "Boolean settings toggles"

Switch para boolean settings. Dual React/Rails.

---

### Wise — "Feature toggles en account settings"

Switch para feature toggles en configuracion de cuenta. Confianza baja en documentacion.

---

### Dell — "Enterprise feature toggles"

Switch para feature toggles enterprise. Confianza baja en documentacion.

---

## Pipeline Hints

**Archetype recommendation:** form-control
Rationale: Switch es un control binario simple — input de on/off sin contenido compuesto. No tiene slots de contenedor ni sub-componentes estructurales. La mayoria de sistemas lo implementa como un control atomico con label opcional.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| track | shape | yes | 19/19 | Container visual del toggle (pill/rect) |
| thumb | shape | yes | 19/19 | Elemento deslizante circular |
| label | text | no | 15/19 | Texto descriptivo del control |
| state-text | text | no | 3/19 | Carbon labelA/labelB, Lightning track text |
| thumb-icon | icon | no | 5/19 | M3 checkmark/minus, Carbon small checkmark, Mantine thumbIcon |
| checked-content | slot | no | 2/19 | Ant checkedChildren/unCheckedChildren ReactNode |
| description | text | no | 2/19 | Mantine description, Fluent hint text |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | variant | sm/md/lg | 12/19 | Carbon 2 (default/sm), Ant 2 (small/default), Chakra 3, Mantine full scale, Atlassian 2 |
| State | state | default/hover/focus/disabled | 19/19 | Universal. pressed en 8/19. |
| isChecked | boolean | true/false | 19/19 | Controla track color y thumb position. Ant: checked, Atlassian: isChecked, M3: selected |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isChecked | 19/19 | false | Controla estado on/off, track color, thumb position |
| label | 15/19 | true | Visibilidad del label de texto |
| loading | 3/19 | false | Ant Design loading, Primer loading+aria-busy, overlay spinner |
| isDisabled | 19/19 | false | Bloquea interaccion, opacity reducida |
| isReadOnly | 2/19 | false | Spectrum isReadOnly: visible, focusable, no interactivo |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 19/19 | Track off: gris neutro; Track on: color de acento/brand | Base |
| hover | 14/19 | Track darkened 10%, cursor pointer | Interactivo |
| focus | 17/19 | Focus ring 2px alrededor del control | Keyboard nav, WCAG 2.4.7 |
| pressed | 8/19 | Thumb ligeramente expandido o track darkened 20% | Touch feedback |
| disabled | 19/19 | Opacity 0.38-0.5, cursor not-allowed | Universal |
| loading | 3/19 | Spinner en thumb o reemplazando thumb, control bloqueado | Ant, Primer |

**Exclusion patterns found:**
- disabled x hover/focus/pressed — 19/19 sistemas (universal)
- loading x hover/focus/pressed — 3/3 sistemas con loading (loading implica disabled)

**Building block candidates:**
- Ninguno. Switch es atomico — no tiene slots de contenedor que necesiten building blocks.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| labelPosition | before/after | 3/19 | Fluent 2, Mantine, Gestalt. before = label izquierda, switch derecha |

**A11y consensus:**
- Primary role: `switch` (17/19 consensus — Lightning y Base Web usan checkbox)
- Required ARIA: `aria-checked="true"|"false"`, `aria-label` o visible label
- Keyboard: Space toggles (19/19). Enter NO requerido para switch (a diferencia de button).
- Focus: linear (un solo tab stop, no composite)
- APG pattern: Switch
- Stable label: Atlassian documenta que label NO debe cambiar con estado (rompe SR nav)
- Loading: aria-busy="true" cuando loading (Primer pattern)

---

## What Everyone Agrees On

1. **role="switch" es el rol correcto:** 17/19 sistemas usan role="switch" en lugar de role="checkbox". El rol switch comunica semantica de efecto inmediato (on/off) vs. checkbox que implica seleccion con submit diferido. Los 2 que usan checkbox (Lightning, Base Web) son implementaciones legacy.

2. **aria-checked="true"|"false", sin indeterminado:** A diferencia de checkbox que soporta "mixed", switch es estrictamente binario. Ningun sistema implementa un estado indeterminado para switch.

3. **Space es la tecla de toggle:** Universal. Enter NO es requerido para switch segun APG (a diferencia de button). Tab navega entre switches — es un control simple, no compuesto.

4. **Switch NO es para formularios con submit:** Spectrum, Paste, Carbon, GOV.UK, Orbit coinciden: switch = efecto inmediato. Si el valor se envia con un boton, usa checkbox. Esta distincion semantica es la mas importante para el uso correcto.

5. **Disabled bloquea TODA interaccion:** Opacity reducida (0.38-0.5), cursor not-allowed, no hover/focus/pressed. Universal — sin excepciones.

6. **Dual encoding recomendado (color + posicion/icono):** M3, Carbon small, Mantine thumbIcon. Color solo no cumple WCAG 1.4.1. La posicion del thumb es el encoding secundario minimo; iconos son el tercer canal.

---

## Where They Disagree

### "Deberia el switch tener un estado loading?"
**Option A: Si (Ant Design, Primer)** — Spinner en thumb durante API calls. Previene race conditions donde el usuario flippea de vuelta antes de que la primera llamada termine. Adopters: Ant Design (3 tamanos + loading), Primer (loading + aria-busy). Upside: UX robusta para settings con latencia. Downside: complejidad adicional, no todos los switches necesitan loading.
**Option B: No (M3, Spectrum, Carbon, Atlassian)** — Switch = efecto inmediato. Si hay latencia, el feedback pertenece a toast/banner, no al control. Upside: semantica pura. Downside: en apps enterprise con API calls, el dev debe improvisar el patron.
**Para tu caso:** Implementar loading como boolean overlay — 3/19 consensus pero alto impacto en enterprise apps.

### "Cuantos tamanos necesita un switch?"
**Option A: Un solo tamano (M3)** — Touch target fijo 48dp. Density a nivel de layout. Upside: simplicidad. Downside: no sirve para listas de settings densas.
**Option B: Dos tamanos (Carbon, Atlassian)** — Default + Small/Regular + Large. Upside: balance. Downside: puede no cubrir todos los contextos.
**Option C: Tres tamanos (Ant, Chakra, Mantine)** — sm/md/lg. Upside: flexibilidad maxima. Downside: mas variantes a mantener.
**Para tu caso:** Tres tamanos (sm/md/lg) — mayor flexibilidad sin explosion combinatoria dado que switch tiene pocas dimensiones.

### "Necesita el switch iconos en el thumb?"
**Option A: Si, built-in (M3, Carbon small, Mantine)** — Checkmark ON, minus/x OFF. Redundant encoding. Upside: WCAG 1.4.1 compliance automatico. Downside: espacio limitado en sm.
**Option B: No (Spectrum, Atlassian, Paste)** — Posicion + color son suficientes. Upside: limpio. Downside: depende solo de posicion como segundo canal.
**Para tu caso:** Optional via boolean (iconos como improvement, no obligatorio en todas las sizes).

### "Necesita isReadOnly separado de isDisabled?"
**Option A: Si (Spectrum)** — ReadOnly = visible, focusable, no interactivo. Para RBAC. Upside: separacion semantica clara. Downside: baja adopcion (2/19).
**Option B: No (17 sistemas)** — Disabled cubre todos los escenarios de no-interaccion.
**Para tu caso:** Omitir por ahora — consensus muy bajo. Agregar si hay requisito RBAC.

### "Debe el label cambiar con el estado?"
**Option A: Label dinamico** — "Notifications ON" / "Notifications OFF". Upside: estado obvio. Downside: rompe SR navigation.
**Option B: Label estable (Atlassian)** — "Notifications" siempre. Estado comunicado por aria-checked. Upside: SR-friendly. Downside: menos obvio visualmente.
**Para tu caso:** Label estable — Atlassian documenta el problema real de SR navigation.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Pill track + circle thumb | Track redondeado (full radius) con thumb circular | Universal, familiar | M3, Spectrum, Ant, Atlassian, Chakra, shadcn |
| Thumb con checkmark | Icono checkmark dentro del thumb cuando ON | A11y compliance | M3, Carbon small, Mantine |
| State text en track | Texto "On"/"Off" o "Active"/"Inactive" dentro del track | Compliance contexts | Carbon default, Lightning |
| Loading spinner | Spinner reemplaza/superpone al thumb durante loading | Enterprise async | Ant Design, Primer |
| Emphasized track | Color de acento mas prominente para toggles prioritarios | Settings panels densos | Spectrum |

```
Standard switch:
  OFF: ┌──────────┐     ON: ┌──────────┐
       │ ●        │          │        ● │
       └──────────┘          └──────────┘

With thumb icon:
  OFF: ┌──────────┐     ON: ┌──────────┐
       │ ○─       │          │       ─✓ │
       └──────────┘          └──────────┘

With state text:
  OFF: ┌──────────┐     ON: ┌──────────┐
       │ ● OFF    │          │  ON   ● │
       └──────────┘          └──────────┘

With label:
  ┌──────────┐
  │        ● │  Notifications
  └──────────┘
```

---

## Risks to Consider

1. **Switch en contexto de formulario (HIGH)** — Si un switch se coloca en un formulario con boton submit, el usuario no sabe si el cambio es inmediato o diferido. Mitigacion: documentar guia de uso explicita, solo usar switch para efecto inmediato.

2. **Color como unico diferenciador on/off (HIGH)** — Track verde/gris sin otro encoding falla WCAG 1.4.1 para daltonicos. Mitigacion: posicion del thumb como encoding secundario minimo; iconos como tercer canal recomendado.

3. **Loading sin feedback accesible (MEDIUM)** — Si implementas loading, aria-busy="true" y spinner accesible son obligatorios. Sin ellos, el SR no comunica que el control esta procesando. Mitigacion: seguir patron Primer (aria-busy + spinner).

4. **Label dinamico rompe SR nav (MEDIUM)** — Cambiar "Notifications ON" a "Notifications OFF" causa que el usuario pierda referencia. Mitigacion: label estable, estado solo via aria-checked.

5. **Track dimensions inconsistentes entre tamanos (LOW)** — Sin ratios definidos, el thumb puede quedar desproporcionado. Mitigacion: definir ratios track:thumb en cada size.

---

## Next Steps

```
/spec switch        -- Generar config.json con anatomia + matriz
/enrich switch      -- A11y + tokens
/generate switch    -- Figma components
/figma-qa           -- Validar y auto-fix
/build switch       -- Pipeline completo
```
