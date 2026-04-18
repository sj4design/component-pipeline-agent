# Steps

## Overview

Steps es un indicador de navegación que comunica la posición del usuario dentro de un flujo secuencial de múltiples pasos. El componente muestra el conjunto completo de pasos del flujo, el estado de cada uno y el paso activo actual — sin poseer el contenido de cada paso ni la lógica de navegación. Esta arquitectura de separación de responsabilidades (navigation indicator, no wizard container) es el patrón adoptado por 10 de los 14 sistemas que implementan el componente.

La familia Steps comprende dos componentes: **Steps** (el contenedor con orientación y distribución) y **Step** (el ítem individual con estado, indicador y texto). Step es un sub-componente con sus propias variantes de estado e indicador.

```
HORIZONTAL (wizard header estándar):
┌─────────────────────────────────────────────────────────────────┐
│  ●──────────────────●──────────────────○──────────────────○     │
│  1                  2                  3                  4     │
│ Account            Profile            Review             Done   │
│ [finish]           [process]          [wait]             [wait] │
└─────────────────────────────────────────────────────────────────┘

CON ERROR:
┌─────────────────────────────────────────────────────────────────┐
│  ✓──────────────────⚠──────────────────●──────────────────○     │
│  1                  2                  3                  4     │
│ Account            Billing            Confirm             Done  │
│ [finish]           [error]            [process]          [wait] │
└─────────────────────────────────────────────────────────────────┘

VERTICAL (sidebar form navigation):
┌────────────────────────────────┐
│  ✓  Account details            │
│  │                             │
│  ✓  Billing information        │
│  │                             │
│  ▶  Confirm order   ← current  │
│  │                             │
│  ○  Done                       │
└────────────────────────────────┘

ANATOMÍA DE UN STEP:
┌───────────────────────────────────────────────────┐
│  [●indicator]  [Label text]                       │
│               [Description text opcional]         │
│       │        (connector line al siguiente step)  │
└───────────────────────────────────────────────────┘

Indicator types:
  number     → "1" / "2" / "3" (se reemplaza por ✓ en status=finish)
  check      → ✓ checkmark (status=finish)
  error-icon → ⚠ exclamation (status=error)
  custom-icon → ícono de dominio via swap (status=process / wait)
  dot        → punto circular minimalista (solo md/lg, no sm)
```

La diferencia entre Steps como navigation indicator versus wizard container es arquitectónica: Steps comunica el estado de posición y delega la navegación y el contenido de cada paso al consumidor. El consumidor renderiza los botones Next/Previous, gestiona el estado de la aplicación entre pasos y renderiza el contenido del paso activo.

**What the designer can configure:**

Variants para Steps (contenedor):

```
Orientation   → horizontal | vertical
Size          → sm | md | lg
IndicatorType → number | icon | dot
```

Toggles para Steps:

```
Interactive   → boolean — steps como botones interactivos vs. spans no-clickeables
SpaceEqually  → boolean — distribución equal-width independiente del largo del label
```

Variants para Step (sub-componente):

```
Status        → wait | process | finish | error | warning
IndicatorType → number | check | error-icon | custom-icon | dot
```

Toggles para Step:

```
Disabled      → boolean — step bloqueado; no navegable
HasDescription → boolean — muestra el slot de description
```

### Figma properties panel

```
STEPS (contenedor)
┌─────────────────────────────────────────┐
│  STEPS                                  │
│  ─────────────────────────────────────  │
│  Orientation   [horizontal ▾]           │
│  Size          [md         ▾]           │
│  IndicatorType [number     ▾]           │
│  ─────────────────────────────────────  │
│  Interactive   [ ] false                │
│  SpaceEqually  [ ] false                │
└─────────────────────────────────────────┘

STEP (sub-componente)
┌─────────────────────────────────────────┐
│  STEP                                   │
│  ─────────────────────────────────────  │
│  Status        [process    ▾]           │
│  IndicatorType [number     ▾]           │
│  ─────────────────────────────────────  │
│  Disabled      [ ] false                │
│  HasDescription [ ] false               │
│  ─────────────────────────────────────  │
│  Show Custom Icon  [ ] false            │
│  Indicator Icon  [swap icon ▾]          │
│  ─────────────────────────────────────  │
│  ✏️ Label       [Paso              ]    │
│  ✏️ Description [Descripción del paso]  │
└─────────────────────────────────────────┘

CONTEO DE FRAMES
  Steps:  2 orientaciones × 3 sizes × 3 indicatorTypes = 18 gross, minus 2 exclusiones = 16 net
  Step:   5 statuses × 5 indicatorTypes = 25 gross, minus 6 exclusiones = 19 net
  Total familia: 35 frames (budget medium 30-80)
```

---

## When to use (and when not to)

```
¿El usuario está navegando un flujo de múltiples pasos en secuencia?
  └→ Sí, 3-7 pasos, misma página → Steps horizontal
  └→ Sí, 7+ pasos o sidebar → Steps vertical
  └→ Sí, pero son páginas separadas → Considerar navigation links; Steps puede funcionar

¿El flujo es lineal estricto (no se puede regresar)?
  └→ Sí (checkout, formulario regulatorio) → Steps + Interactive=false (solo indicador)
  └→ No, el usuario puede navegar entre pasos → Steps + Interactive=true

¿El usuario necesita ver el progreso sin interacción?
  └→ Sí → Steps display-only (Interactive=false, Orientation según espacio)
  └→ No, el usuario necesita navegar → Steps con onChange / Interactive=true

¿Hay más de 7 pasos horizontales?
  └→ Usar orientación vertical o rediseñar el flujo en agrupaciones de pasos
```

**Use Steps when:**
- El usuario navega un flujo secuencial de 3 a 7 etapas claramente diferenciadas (registro, checkout, onboarding, configuración de producto).
- El contexto requiere que el usuario vea el flujo completo para entender dónde está y cuánto falta (orientación y progreso).
- Los pasos tienen estados discretos que comunican información del sistema: qué está completo, cuál está activo, cuáles requieren atención.
- El diseño tiene espacio horizontal suficiente para el wizard header (3+ pasos con labels de 12–20 caracteres cada uno) o un panel lateral para la orientación vertical.
- El flujo permite al usuario regresar a pasos visitados (Atlassian: visited=navigable) o es lineal estricto (Orbit: linear enforcement) — ambos patrones son válidos con configuración apropiada.

**Do NOT use Steps when:**
- El flujo tiene un solo paso o solo dos pasos — un stepper para dos pasos es sobreingeniería; un header de sección es suficiente.
- Los pasos tienen lógica condicional o branching complejo — un wizard container no puede modelar flujos donde el paso 4 depende de la respuesta en el paso 2 de múltiples formas.
- El contenido de cada paso es homogéneo y simple (e.g., un wizard de 3 pasos con un solo campo por paso) y el equipo prefiere wiring mínimo — evalúa Mantine Stepper como wizard container.
- El componente se usaría en mobile como primary pattern sin fallback de "Paso X de Y" — el paso horizontal con labels en pantallas estrechas es ilegible.
- El "flujo" en realidad son páginas separadas de una aplicación — usa breadcrumbs o navegación explícita, no stepper.
- El contexto es regulatorio o clínico con requisitos de auditoría — los pasos no deben ser navegables una vez enviados (Nord pattern: locked steps).

---

## Visual variations

### Por orientación

**horizontal** — El layout estándar para wizard headers. Los step items se distribuyen en una fila horizontal con líneas conectoras entre ellos. Los labels aparecen debajo de cada indicador. Funciona bien con 3–6 pasos y labels cortos (hasta 20 caracteres). Con `SpaceEqually=true`, todos los ítems tienen el mismo ancho independientemente del largo del label — útil en interfaces multiidioma.

**vertical** — Los step items se apilan en una columna con líneas conectoras verticales. Los labels aparecen a la derecha del indicador. Ideal para 7+ pasos o cuando el stepper vive en un panel lateral de un formulario largo. No tiene el problema de overflow de labels que el horizontal.

### Por indicador (IndicatorType)

| IndicatorType | Descripción | Cuándo usar |
|---------------|-------------|-------------|
| `number` | Número del paso en un círculo; se reemplaza por ✓ al completar | Default para la mayoría de flujos (3–7 pasos) |
| `icon` | Ícono de dominio (e.g., usuario, tarjeta, confirmación) via instance swap | Cuando cada paso tiene una identidad visual clara |
| `dot` | Punto circular minimalista | UIs compactas donde el label provee suficiente contexto; no usar en size=sm |

**Exclusión:** `IndicatorType=dot × Size=sm` — Los dots en 32px de altura son demasiado pequeños para ser legibles; mínimo `md`.

### Por status del Step

| Status | Indicador | Color | Descripción |
|--------|-----------|-------|-------------|
| `wait` | Número (vacío) | Neutral | Paso no alcanzado aún |
| `process` | Número (filled) | Brand/interactive | Paso activo actual; `aria-current="step"` |
| `finish` | ✓ checkmark | Success green | Paso completado exitosamente |
| `error` | ⚠ error-icon | Error red | Paso con error bloqueante; requiere corrección |
| `warning` | ⚠ warning-icon | Warning amber | Paso con advertencia no bloqueante; puede continuar |

**Exclusiones de status/indicator:**
- `Status=finish × IndicatorType=number` — Los pasos completados reemplazan el número con checkmark
- `Status=error × IndicatorType=number` — Los pasos de error reemplazan el número con ícono de error
- `Status=error × IndicatorType=check` — Error y checkmark son mutuamente excluyentes
- `Status=finish × IndicatorType=error-icon` — Completado y error son mutuamente excluyentes
- `Status=error × Status=warning` — Un step no puede ser simultáneamente bloqueante y no-bloqueante
- `Status=wait × Disabled=true` — Disabled implica locked; wait implica no-alcanzado; semánticamente solapados

### Por tamaño

| Size | Indicator h/w | Font | Icon | Connector |
|------|--------------|------|------|-----------|
| `sm` | 32px | 12px | 16px | 1px line |
| `md` | 40px | 14px | 20px | 1px line |
| `lg` | 48px | 16px | 24px | 2px line |

El radio del indicador circular es 9999 (círculo perfecto) en todos los tamaños.

---

## Design decisions

### 1. Navigation indicator, no wizard container

**Why:** Los wizard containers (Mantine, Base Web) acoplan el contenido de cada paso con el componente Step — cuando los pasos tienen lógica condicional, contenido variable, validación async o branching, el API del wizard container explota en complejidad. El 71% de los sistemas que implementan Steps (10/14) usan arquitectura de indicador. La separación de responsabilidades es consistentemente el enfoque más sostenible en sistemas enterprise.

**Tradeoff:** El consumidor debe manejar la renderización del contenido del paso activo, la lógica next/previous y el focus management en las transiciones de paso. Esto es más "wiring", pero permite cualquier tipo de contenido en cualquier paso sin acoplamiento.

---

### 2. Orientation como dimensión de variante (no boolean)

**Why:** Horizontal y vertical producen layouts estructuralmente diferentes: horizontal es `flex-row` con líneas conectoras horizontales; vertical es `flex-column` con líneas conectoras verticales. La dirección del connector line y la posición del label (abajo vs. a la derecha del indicador) son diferencias estructurales que cambian múltiples propiedades visuales simultáneamente → variante requerida.

**Tradeoff:** Duplica el frame count del contenedor Steps (de 9 a 18 gross). Necesario para que los layouts sean correctos en Figma y los prototipos muestren la distribución real.

---

### 3. Status como dimensión de variante en Step (feedback del sistema)

**Why:** Status es FEEDBACK DEL SISTEMA — cada valor (wait/process/finish/error/warning) comunica una condición del sistema o de los datos. El status cambia el color de fill del indicador, el ícono del indicador, el color del connector line y el peso del texto del label — ≥2 propiedades visuales → variante por global-property-rules. Un boolean no puede capturar este conjunto de cambios.

**Tradeoff:** 5 valores de Status × 5 IndicatorTypes = 25 gross para Step, aunque las exclusiones lo llevan a 19 net. La inversión en frames es la correcta para que el sistema documente todos los estados posibles de un paso.

---

### 4. Interactive y SpaceEqually como booleans

**Why:** `Interactive` alterna si los step items usan `<button>`/`<a>` vs. `<span>` — sin cambio de layout ni fill visual en el indicador; es un toggle de comportamiento. `SpaceEqually` cambia la distribución flex del contenedor (equal-width vs. content-width) sin cambiar la estructura de ningún slot. Ambos son cambios de ≤1 propiedad → boolean.

**Tradeoff:** `Interactive=true` vs `Interactive=false` puede tener implicaciones visuales en algunos sistemas (cursor pointer, hover state en el step). Documentar en el handoff que Interactive=true habilita hover/focus states en los step items.

---

### 5. Indicator indicator en finish y error debe ser checkmark/error-icon (nunca número)

**Why:** El consenso universal en 14/14 sistemas que implementan el componente es que los pasos completados reemplazan el número con un checkmark. El número de paso es informativo en el contexto "aún no lo he hecho / lo estoy haciendo" — una vez completado, el checkmark comunica "listo" más claramente que "1". El error icon sigue la misma lógica: el número ya no es relevante cuando el estado del step es "necesita corrección".

**Tradeoff:** El IndicatorType del step cambia con el status (número para wait/process → checkmark para finish → error-icon para error). Esta es la lógica correcta pero requiere documentar las exclusiones explícitamente para que los diseñadores no combinen Status=finish con IndicatorType=number.

### Excluded combinations

```
Steps:
  IndicatorType=dot × Size=sm       → Dot en 32px es ilegible; mínimo md
  Orientation=horizontal × más de 7 Steps → Recomendar orientación vertical

Step:
  Status=error   × Status=warning       → Mutuamente excluyentes (bloqueante vs. no-bloqueante)
  Status=wait    × Disabled=true        → Semánticamente solapados; usar Disabled para locked
  Status=finish  × IndicatorType=number → Finish reemplaza el número con checkmark
  Status=error   × IndicatorType=number → Error reemplaza el número con error-icon
  Status=error   × IndicatorType=check  → Error y checkmark son mutuamente excluyentes
  Status=finish  × IndicatorType=error-icon → Finish y error-icon son mutuamente excluyentes
  Interactive=true × Disabled=true (en Step) → Step bloqueado no debe ser clickeable
```

---

## Behavior

### Essential for design

**Steps como navigation indicator:**
El componente en sí no navega — comunica el estado de posición. El consumidor provee los controles de navegación (botones "Siguiente" / "Anterior" o "Omitir") y actualiza la prop `currentStep` que cambia el Status de los step items.

**Transición entre pasos:**
Al avanzar de paso N a paso N+1, el step N cambia de `Status=process` a `Status=finish` y el step N+1 cambia de `Status=wait` a `Status=process`. El foco se mueve al heading o contenido del nuevo paso activo (responsibility del consumidor, no del componente). El indicador del paso activo recibe `aria-current="step"`.

**Steps interactivos (Interactive=true):**
Los step items son elementos interactivos (`<button>` o `<a>` según el caso). Los pasos visitados pueden ser navegables (modelo Atlassian: `<a href>` para visited, `<span>` para unvisited). Los pasos con `Disabled=true` son `<span>` con `aria-disabled="true"` sin pointer events — no son clickeables incluso cuando `Interactive=true` en el contenedor.

**Mobile compact mode (recomendado):**
Para orientación horizontal en viewports estrechos (<600px), reemplazar el indicador completo con texto "Paso 3 de 6" + label del paso activo. El modelo de Orbit/GOV.UK es la referencia. Este fallback es obligatorio — el indicador horizontal falla visualmente en mobile sin él.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Steps container (navigable) | `<nav>` | `aria-label="[nombre del flujo]"` | Landmark de navegación; AT anuncia el flujo al que pertenecen los steps |
| Steps container (display) | `<ol>` | — | Semántica de lista ordenada; "paso 3 de 5" emerge del orden del DOM |
| Step activo | `<li>` o step element | `aria-current="step"` | Universal en los 14 sistemas; anuncia el paso activo al AT |
| Step completado | `<li>` | Texto visually-hidden: "completado" | El checkmark es visual; el AT necesita texto, no solo el ícono |
| Step con error | `<li>` | Texto visually-hidden: "error, requiere corrección" | El ícono de error debe tener equivalente de texto |
| Step no-navigable | `<span>` o `<li>` | `aria-disabled="true"` | Sin element interactivo; sin expectativa de acción |
| Step visitado (navigable) | `<a href>` | — | HTML nativo comunica navigabilidad sin ARIA adicional (patrón Atlassian) |
| Step interactivo (button) | `<button>` | — | HTML nativo para steps clickeables en modo navigation |
| Conector de pasos | Visual | — | El conector es decorativo; no necesita rol o texto |

### Keyboard navigation

Primary interactions (affect design):

```
Tab             → Navegar entre steps interactivos (solo cuando Interactive=true)
Enter / Space   → Activar step (navegar a ese paso en modo interactive)
arrow keys      → No aplican en el componente Steps estándar
                  (aplican en Tabs pattern — Steps no es Tabs)
```

Secondary interactions (dev reference):

```
aria-current="step":
  → Aplicar SOLO al step activo (Status=process)
  → Nunca en múltiples steps simultáneamente

Visually-hidden text por step:
  → "Paso 1 de 4: Account details — completado"
  → "Paso 3 de 4: Confirm order — actual"
  → "Paso 4 de 4: Done — pendiente"
  → Nunca depender solo de color o ícono para comunicar estado

Transición de paso (step change):
  → El consumidor mueve el foco al heading o contenido del nuevo paso
  → aria-live="polite" en una live region: "Ahora en Paso 3: Confirm order"
  → Sin este anuncio, la transición es visual-only para AT

Steps con error:
  → aria-live="assertive" (o foco al error) cuando un step pasa a Status=error
  → El AT debe anunciar el error inmediatamente, no al navegar al step
```

---

## Content guide

### Slot: label (REQUERIDO en Step)

El label del step debe ser conciso y orientado a la acción o al dominio. Máximo 20 caracteres para orientación horizontal (donde el espacio es limitado) — aunque en orientación vertical se pueden usar labels más descriptivos.

- **Bueno:** "Cuenta", "Facturación", "Confirmar", "Listo"
- **Bueno en vertical:** "Detalles de la cuenta", "Información de facturación"
- **Evitar:** Frases de acción larga ("Introduce los datos de tu cuenta de usuario")
- **Evitar:** Números redundantes ("Paso 1: Cuenta") — el indicador ya muestra el número

Los labels deben ser paralelos en estructura gramatical — todos sustantivos o todos verbos en imperativo, no mezcla.

### Slot: description (opcional, HasDescription=true)

Texto de apoyo debajo del label. Útil cuando el label por sí solo no comunica suficientemente lo que implica el paso. Máximo 60 caracteres. En orientación horizontal, la descripción puede desbordar si es muy larga — diseñar con el peor caso.

Ejemplos útiles: "Completa tu perfil profesional", "Elige un método de pago seguro". Evitar redundar con el label: si el label es "Facturación", la descripción no necesita decir "En este paso se añade información de facturación".

### Slot: indicator (REQUERIDO en Step)

El indicador comunica el número del paso (número) o su estado (checkmark, error-icon, custom-icon, dot). El contenido del indicador es determinado por `IndicatorType` y mapeado correctamente según `Status`:

| Status | IndicatorType correcto |
|--------|----------------------|
| wait | number |
| process | number |
| finish | check |
| error | error-icon |
| warning | warning-icon (similar a error-icon, color amber) |

Para `IndicatorType=custom-icon`, el slot usa patrón BOOL+SWAP: `Show Custom Icon` boolean + `Indicator Icon` swap.

El texto del indicador (número) no necesita `alt` — el número visible es el texto de accesibilidad. El ícono de checkmark, error-icon y custom-icon necesitan texto visually-hidden para lectores de pantalla.

---

## Pre-build checklist

```
ANTES DE EMPEZAR
  [ ] Decidir modelo de navegación: display-only (Interactive=false) vs. navigable (Interactive=true)
  [ ] Si navigable: decidir visited=navigable (Atlassian) vs. linear enforcement (Orbit/Nord)
  [ ] Decidir scope de error states: solo error (Carbon) vs. error+warning (Ant Design)
  [ ] Confirmar número máximo de steps en el producto (≤7 horizontal, cualquier número vertical)
  [ ] Confirmar si se necesita fallback mobile ("Paso X de Y")

FIGMA
  [ ] 16 frames net para Steps (2 orientaciones × 3 sizes × 3 indicatorTypes, minus 2 exclusiones)
  [ ] 19 frames net para Step (5 statuses × 5 indicatorTypes, minus 6 exclusiones)
  [ ] Status=finish usa IndicatorType=check (no number)
  [ ] Status=error usa IndicatorType=error-icon (no number)
  [ ] Línea conectora entre steps (horizontal: línea horizontal; vertical: línea vertical)
  [ ] IndicatorType=dot solo en size=md y size=lg (no sm)
  [ ] HasDescription boolean configurado como boolText en Step
  [ ] custom-icon slot con patrón BOOL+SWAP correctamente configurado
  [ ] Disabled layer en Step con opacidad reducida + sin pointer events

ACCESIBILIDAD
  [ ] Container navegable usa <nav> con aria-label descriptivo
  [ ] Container display-only usa <ol>
  [ ] aria-current="step" en el step activo (Status=process)
  [ ] Texto visually-hidden por step incluyendo estado y posición ("Paso 2 de 4: Billing — completado")
  [ ] Steps disabled tienen aria-disabled="true"
  [ ] Transición de paso: especificado en handoff que el consumidor debe mover el foco al nuevo contenido
  [ ] aria-live="polite" para anuncio de cambio de paso documentado

TOKENS
  [ ] Prefix stp- en todos los tokens del componente
  [ ] Color del conector cambia entre estados (neutral para wait, brand para process/finish, error para error)
  [ ] Indicator circle usa colores semánticos correctos por status
  [ ] Texto visually-hidden de accesibilidad no usa tokens de color
```

---

## Related components

```
Progress Bar
  → Para progreso continuo (0–100%) sin steps discretos
  → Cuando el usuario no puede navegar entre estados — solo avanzar

Breadcrumbs
  → Para navegación jerárquica (páginas visitadas en profundidad de árbol)
  → Steps es para flujos lineales secuenciales; breadcrumbs para jerarquías

Tabs
  → Para navegación no-lineal entre secciones de contenido paralelas
  → Steps implica secuencia y progreso; Tabs implica categorías paralelas de igual jerarquía

Wizard Container (Mantine Stepper / Base Web ProgressSteps)
  → Si el flujo es simple, lineal, con contenido uniforme por paso
  → Wizard container reduce el wiring pero acopla contenido con navegación

Accordion (GOV.UK Step by Step)
  → Para flujos inter-página donde los pasos involucran navegación a páginas separadas o servicios externos
```

---

## Reference: how other systems do it

**Carbon (IBM) Progress Indicator** denomina deliberadamente el componente "Progress Indicator" en lugar de "Stepper" — poniendo énfasis en la comunicación de progreso sobre la navegación. La decisión más distintiva de Carbon es el estado `invalid` por paso: los workflows de aprovisionamiento cloud de IBM necesitan señalar pasos completados que fallaron validación backend después de que el usuario avanzó. A diferencia del estado `warning` de Ant Design (no bloqueante), `invalid` de Carbon es un fallo definitivo que requiere corrección. Por defecto los steps son display-only; pasar `onChange` los hace interactivos — la interactividad es opt-in explícito, no el default. El prop `spaceEqually` distribuye los items en igual ancho independientemente del largo del label, esencial para interfaces multiidioma.

**Atlassian Progress Tracker** está deliberadamente scoped a flujos wizard horizontales lineales. La decisión arquitectónica más significativa es el modelo "visited = navigable": una vez que el usuario alcanza un paso, permanece clickeable independientemente de si el paso actual está completo. La investigación de Atlassian encontró que los usuarios frecuentemente quieren reconsiderar elecciones anteriores sin completar el paso actual. La implementación semántica es la más correcta de los 24 sistemas: pasos visitados como `<a href>` (links), pasos no visitados como `<span>` — el HTML nativo comunica la navigabilidad sin necesidad de ARIA adicional.

**Ant Design Steps** es la implementación más feature-completa de los 24 sistemas: 5 tipos de layout, 5 estados de step, subtitle y description por paso, y porcentaje de completación parcial del paso activo con `percent`. El tipo `inline` es único en el sector — embebe el indicador de progreso dentro de una fila de tabla para tracking del estado de órdenes en e-commerce (el caso de uso de Alibaba). El estado `warning` es el único estado de problema no-bloqueante en todos los 24 sistemas: señala una preocupación sin bloquear el avance, en contraste con el `invalid` hard-failure de Carbon. El `subTitle` permite texto terciario junto al label para información adicional (e.g., tiempo estimado del paso).

**Twilio Paste ProgressSteps** cubre el caso de uso central de wizard indicator con estados complete/current/incomplete/error y soporte horizontal/vertical. El estado `error` por paso es crítico para los flujos de configuración de API de Twilio Console donde pasos de configuración pueden fallar después de su envío. Como Carbon, Paste trata el componente como indicator de navegación, no wizard container.

**Lightning Design System** provee dos variantes: Progress Indicator (pattern estándar de wizard) y **Path** (cadena de chevrons para etapas de pipeline CRM). Path es único en los 24 sistemas — no es un wizard step genérico sino un tracker de etapa de pipeline de ventas (Lead → Qualified → Proposal → Closed). El shape de chevron codifica visualmente "etapa de pipeline" en lugar de "paso de formulario". Ambas variantes soportan estados de error y warning por paso, combinando la cobertura de Carbon + Ant Design.

**Chakra UI Steps (v3)** soporta orientaciones horizontal y vertical con indicadores numéricos o íconos personalizados. Es un navigation indicator únicamente — sin content panels inline. El consumidor maneja el contenido del paso activo y la navegación. Usa `aria-current="step"` en el paso activo.

**GOV.UK Step by Step Navigation** es categóricamente diferente de todas las otras implementaciones: es un patrón de journey inter-página, no un wizard intra-página. El componente enlaza a usuarios a través de una secuencia de páginas separadas, servicios gubernamentales y sitios web externos — solicitar una licencia de conducir involucra el DVLA, el registro médico, la Agencia de Carreteras y procesadores de pago, lo que ningún componente single-page puede abarcar. Los pasos usan secciones acordeón expansibles que listan sub-tareas dentro de cada etapa.

**Base Web (Uber) ProgressSteps** es un wizard container: el contenido del paso se renderiza como prop `content` en cada step, haciendo al componente el orquestador del flujo completo. Provee `NumberedStep` (con número) y `Step` (con ícono) variants. Vertical-only — sin soporte horizontal. El sistema de Overrides de Base Web permite customización profunda.

**Mantine Stepper** es el wizard container más completo en Tier 3: contenido inline via `Stepper.Step` children, `Stepper.Completed` para el estado final de éxito, ícono de loading por paso para validación async, y `allowNextStepsSelect` para gate o abrir la navegación hacia atrás. El prop `allowNextStepsSelect` es la implementación más explícita de la decisión arquitectónica "linear vs. free-navigation" — un único boolean que define la filosofía del wizard.

**Orbit (Kiwi.com) Wizard** nombra su componente "Wizard" en lugar de "Steps" — el naming más domain-driven de los 24 sistemas, porque cada instancia en producción de Kiwi.com es exactamente el embudo de reserva de vuelos. La progresión es lineal estricta (sin skip de pasos). La decisión más valiosa de Orbit es el **mobile compact mode**: en viewports estrechos el indicador completo colapsa a "Paso 3 de 6: Confirmar pedido" — texto completamente legible en cualquier ancho de pantalla. Esta solución mobile-first debería ser implementación estándar para cualquier Steps horizontal.

**Nord (Nordhealth) Steps** está construido para flujos clínicos secuenciales: registro, prescripción, evaluación. Los pasos non-navigable locked son un requisito regulatorio — una vez que un paso clínico es enviado, no puede ser revisitado por cumplimiento de auditoría. Esta es la filosofía arquitectónica opuesta a Atlassian (visited=navigable). Los indicadores numéricos son el default — en contextos clínicos se evitan íconos para minimizar errores de interpretación. La referencia correcta para flujos con requisitos de auditoría legal.

**Los 10 sistemas sin componente dedicado** revelan contextos donde el patrón no es apropiado: M3 lo removió de MD3 porque se mal-usaba en flujos con demasiados pasos o lógica de branching. Polaris lo descartó por investigación que muestra mayor abandono en formularios wizard-style. Fluent 2 lo excluyó por investigación de UX de Microsoft que encontró mayor tasa de error en edición in-place de vistas densas con steps. Spectrum evita la colisión de naming con su componente "Stepper" de número input.

---

## Tokens

**30 tokens** · prefix `stp-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `stp-indicator-bg-wait` | `surface/default` | Fondo del indicador en status=wait |
| `stp-indicator-bg-process` | `interactive/default` | Fondo del indicador en status=process |
| `stp-indicator-bg-finish` | `success/fg` | Fondo del indicador en status=finish |
| `stp-indicator-bg-error` | `status/error/fg` | Fondo del indicador en status=error |
| `stp-indicator-bg-warning` | `status/warning/fg` | Fondo del indicador en status=warning |
| `stp-indicator-border-wait` | `border/default` | Borde del indicador en wait |
| `stp-indicator-border-process` | `interactive/default` | Borde del indicador en process |
| `stp-indicator-fg-wait` | `text/secondary` | Color del número en wait |
| `stp-indicator-fg-process` | `text/inverse` | Color del número en process (sobre fondo brand) |
| `stp-indicator-fg-finish` | `text/inverse` | Color del checkmark en finish |
| `stp-indicator-fg-error` | `text/inverse` | Color del error-icon en error |
| `stp-label-wait` | `text/secondary` | Color del label en wait |
| `stp-label-process` | `text/primary` | Color del label en process (bold) |
| `stp-label-finish` | `text/primary` | Color del label en finish |
| `stp-label-disabled` | `text/disabled` | Color del label en disabled |
| `stp-description-fg` | `text/secondary` | Color de la description |
| `stp-connector-wait` | `border/default` | Color del conector entre steps wait |
| `stp-connector-finish` | `success/fg` | Color del conector cuando ambos extremos son finish |
| `stp-connector-error` | `status/error/fg` | Color del conector hacia step=error |
| `stp-radius` | `radius/9999` | Radio del indicador circle |
| `stp-indicator-sm` | `iconSize/sm` (16px) | Tamaño del indicator circle sm |
| `stp-indicator-md` | `iconSize/md` (20px) | Tamaño del indicator circle md |
| `stp-indicator-lg` | `iconSize/lg` (24px) | Tamaño del indicator circle lg |
| `stp-font-sm` | `type/sm` (12px) | Font-size size=sm |
| `stp-font-md` | `type/md` (14px) | Font-size size=md |
| `stp-font-lg` | `type/lg` (16px) | Font-size size=lg |
| `stp-gap-sm` | `spacing/8` (8px) | Gap entre indicator y label sm |
| `stp-gap-md` | `spacing/8` (8px) | Gap entre indicator y label md |
| `stp-connector-thickness` | 1px / 2px | Grosor del conector (sm: 1px, md/lg: 2px) |
| `stp-focus-ring` | `focus/ring` | Ring de focus para steps interactivos |

### Spacing specs

```
SIZE: sm (indicator 32px)
  ├── indicator: 32×32px  (circle)
  ├── gap (indicator→label): 8px  (spacing/8)
  ├── font-size label: 12px  │  line-height: 16px
  ├── font-size desc: 10px   │  line-height: 14px
  ├── connector-thickness: 1px
  └── border-radius indicator: 9999

SIZE: md (indicator 40px) — DEFAULT
  ├── indicator: 40×40px  (circle)
  ├── gap: 8px  (spacing/8)
  ├── font-size label: 14px  │  line-height: 20px
  ├── font-size desc: 12px   │  line-height: 16px
  ├── connector-thickness: 1px
  └── border-radius indicator: 9999

SIZE: lg (indicator 48px)
  ├── indicator: 48×48px  (circle)
  ├── gap: 8px  (spacing/8)
  ├── font-size label: 16px  │  line-height: 24px
  ├── font-size desc: 14px   │  line-height: 20px
  ├── connector-thickness: 2px
  └── border-radius indicator: 9999

HORIZONTAL (orientación horizontal):
  ├── gap entre step items: flexible (SpaceEqually distribución)
  ├── connector: línea horizontal centrada en el indicador
  ├── label: centrado debajo del indicador
  └── description: centrada debajo del label

VERTICAL (orientación vertical):
  ├── gap entre step items: 16px (spacing/16)
  ├── connector: línea vertical izquierda, centrada con el indicador
  ├── label: a la derecha del indicador, alineado al top
  └── description: debajo del label, misma columna que label

FOCUS RING (steps interactivos)
  ├── ring-width: 2px
  ├── ring-offset: 2px
  └── ring-color: #405EF2 (interactive/default)

MOBILE COMPACT MODE (breakpoint <600px, orientación horizontal)
  └── Reemplazar indicador completo con:
      "Paso [N] de [total]: [label del paso activo]"
      font-size: 14px  │  font-weight: 500  │  color: text/primary
```
