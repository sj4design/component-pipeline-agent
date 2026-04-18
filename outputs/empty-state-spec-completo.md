# EmptyState

## Overview

El EmptyState es un componente contenedor que comunica visualmente un estado de ausencia de contenido y guía al usuario hacia la acción correcta para resolver esa situación. No es simplemente un mensaje de "no hay datos" — es un punto de activación: la primera vez que un usuario llega a una sección vacía, el EmptyState define su percepción del producto. Un título orientado a la acción ("Crea tu primer proyecto") supera siempre al texto descriptivo del estado ("No hay proyectos") porque le dice al usuario qué puede hacer, no lo que falta.

El componente opera en cuatro variantes contextuales que cubren los casos reales en cualquier producto: `default` (primera vez sin contenido), `search` (búsqueda sin resultados), `error` (fallo del sistema) y `no-access` (restricción de permisos). Cada variante tiene su propia ilustración y mensaje template, manteniendo la misma estructura visual.

```
Size=lg (página completa):
┌──────────────────────────────────────────────┐
│                                              │
│         ┌─────────────────┐                 │
│         │                 │                 │
│         │   illustration  │  160×160px      │
│         │   (aria-hidden) │                 │
│         └─────────────────┘                 │
│                                              │
│         Crea tu primer proyecto              │  20px/600
│                                              │
│      Los proyectos te ayudan a organizar    │
│      tu trabajo y colaborar con tu equipo.  │  16px/400
│                                              │
│         [ Crear proyecto ]                   │  Primary
│                                              │
│         Aprender más sobre proyectos →       │  Link
│                                              │
└──────────────────────────────────────────────┘
         max-width: 600px | centrado

Size=sm (dentro de tabla/card):
┌──────────────────────────────┐
│                              │
│    [icon 80px]               │
│                              │
│    Sin resultados para       │  16px/600
│    "quarterly report"        │
│                              │
│    Intenta con otros términos│  14px/400
│    o elimina los filtros.    │
│                              │
│    [ Limpiar filtros ]       │
│                              │
└──────────────────────────────┘
     max-width: 400px | centrado
```

El EmptyState no tiene trigger externo — es un reemplazo inline del contenido que normalmente ocuparía ese espacio. No genera variantes de Figma adicionales por booleanos; los booleans (Has Illustration, Has Primary Action, Has Secondary Action, Has Description) simplemente muestran u ocultan capas dentro del frame.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Variant: default | search | error | no-access
Size:    sm | lg
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Has Illustration     → muestra/oculta slot illustration (default: ON)
Has Description      → muestra/oculta párrafo bajo el título (default: ON)
Has Primary Action   → muestra/oculta botón CTA principal (default: ON)
Has Secondary Action → muestra/oculta acción secundaria (default: OFF)
```

### Figma properties panel

```
┌─────────────────────────────────────────────┐
│  EmptyState                                 │
├─────────────────────────────────────────────┤
│  Variant        [ default ▼ ]               │
│                   search                    │
│                   error                     │
│                   no-access                 │
├─────────────────────────────────────────────┤
│  Size           [ lg ▼ ]                    │
│                   sm                        │
├─────────────────────────────────────────────┤
│  Has Illustration      [ ✓ ]               │
│  Has Description       [ ✓ ]               │
│  Has Primary Action    [ ✓ ]               │
│  Has Secondary Action  [   ]               │
├─────────────────────────────────────────────┤
│  ✏️ Title          [No hay elementos aún  ] │
│  ✏️ Description    [Comienza creando...   ] │
└─────────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El espacio normalmente contiene contenido dinámico?
│
├─ Sí → ¿El usuario puede crear contenido desde aquí?
│        ├─ Sí → EmptyState Variant=default (acción orientada)
│        └─ No → ¿Es resultado de búsqueda/filtro?
│                 ├─ Sí → EmptyState Variant=search
│                 └─ No → ¿Es error del sistema?
│                          ├─ Sí → EmptyState Variant=error
│                          └─ No → EmptyState Variant=no-access
│
└─ No → No usar EmptyState
         Usar texto de placeholder estático o diseño alternativo
```

**Use EmptyState when:**
- Una tabla, lista, galería o sección de contenido no tiene ítems que mostrar
- El usuario acaba de crear su cuenta y todavía no tiene datos (onboarding first-time)
- Una búsqueda o filtro no retornó resultados y el usuario necesita orientación
- Un error del sistema impidió cargar el contenido y el usuario necesita saber qué hacer
- El usuario no tiene permisos para ver el contenido de esa sección
- El contexto es una página completa (size=lg) o dentro de un panel/tabla (size=sm)

**Do NOT use EmptyState when:**
- El contenido está cargando — usa un skeleton o spinner en su lugar
- El espacio normalmente está vacío por diseño (no es un contenedor dinámico)
- El mensaje es un error de validación de formulario — usa mensajes de error inline
- Hay un estado de error global de la aplicación — usa un Banner o Alert a nivel de página
- El contexto es tan pequeño que ni la versión sm tiene espacio suficiente (< 200px de ancho)
- El mensaje de error/no-acceso requiere acción técnica del equipo de IT (usa un canal diferente)

---

## Visual variations

### Por Variant

**Variant=default**
El estado de ausencia de contenido más común. La ilustración muestra un inbox o caja vacía. El título está orientado a la acción: "Crea tu primer [elemento]". Siempre incluye una acción primaria clara. El tono es motivador e invitante — el usuario puede resolver la situación inmediatamente.

**Variant=search**
Se muestra cuando una búsqueda o filtro activo no retorna resultados. La ilustración muestra un ícono de búsqueda con "X". El título refleja la búsqueda actual: "Sin resultados para '[término]'". La acción primaria es siempre limpiar filtros o ampliar la búsqueda. Este variant no debe tener el mismo tono motivador que `default` — es un estado de recuperación, no de activación.

**Variant=error**
Error del sistema — el contenido no pudo cargarse por un fallo técnico. La ilustración muestra un triángulo de alerta (nunca en rojo — principio Nord: distinguir visualmente error de sistema vs. ausencia de datos). El título es neutral: "Ocurrió un error". La acción primaria es "Reintentar". Según la exclusión documentada: `Variant=error + Has Primary Action` puede desactivarse cuando el error no tiene recuperación del lado del usuario.

**Variant=no-access**
El usuario no tiene permisos para ver ese contenido. La ilustración muestra un candado. El título explica la restricción: "Sin acceso a este contenido". Normalmente sin acción primaria (el usuario no puede resolver el acceso él mismo) o con una acción de "Solicitar acceso". No usar iconografía de error — no es un fallo, es una restricción.

### Por Size

**Size=lg** — para páginas completas o secciones de primer nivel
- Ilustración: 160×160px con fondo sutil (surface/subtle)
- Gap interno: 20px entre elementos
- Padding: 40px horizontal, 48px vertical
- Título: 20px/600/lh28
- Descripción: 16px/400/lh24
- Max-width: 600px, centrado en el contenedor

**Size=sm** — para tablas, cards, paneles compactos
- Ilustración: 80×80px
- Gap interno: 12px entre elementos
- Padding: 24px horizontal, 24px vertical
- Título: 16px/600/lh24
- Descripción: 14px/400/lh20
- Max-width: 400px, centrado en el contenedor

### Combinaciones de booleanos más frecuentes

| Contexto | Has Illustration | Has Description | Has Primary | Has Secondary |
|----------|-----------------|-----------------|-------------|---------------|
| Default activación | ON | ON | ON | OFF |
| Search sin resultados | ON | ON | ON | OFF |
| Error recuperable | ON | ON | ON | OFF |
| Error no recuperable | ON | ON | OFF | OFF |
| No-access | ON | ON | OFF | OFF |
| Tabla compacta sm | OFF | OFF | ON | OFF |

---

## Design decisions

### 1. Cuatro variantes contextuales (default / search / error / no-access)

**Por qué:** Cada una de las cuatro situaciones requiere una ilustración diferente, un tono de comunicación diferente y — fundamentalmente — una acción diferente. Ant Design tiene un ConfigProvider global; Atlassian y Polaris tienen variantes implícitas por contexto de uso. Cuatro variantes explícitas cubren exactamente los casos reales en Zoom: tablas vacías por primera vez, búsquedas sin resultados, errores de carga de API, y restricciones de permisos.

**Tradeoff:** Un único componente genérico con texto libre sería más flexible, pero perdería la garantía de que cada situación use la ilustración y el mensaje correcto. Cuatro variantes concretas aseguran consistencia entre equipos.

### 2. Título orientado a la acción ("Crea tu primer X", no "No hay X")

**Por qué:** Polaris enforces esta regla con linting en el código. El principio es psicológico: "No hay proyectos aún" describe un estado negativo; "Crea tu primer proyecto" describe una oportunidad. El usuario en un empty state ya sabe que no hay contenido — lo que necesita es saber qué hacer. Los títulos de acción aumentan las tasas de activación en onboarding y retención después de búsquedas sin resultados.

**Tradeoff:** El título orientado a la acción no funciona para `Variant=error` o `Variant=no-access` (donde el usuario no puede tomar acción). Por eso los templates de título son diferentes por variante y no se aplica una regla única a todos.

### 3. Has Illustration boolean (default ON, no required)

**Por qué:** Polaris require ilustración; Spectrum require SVG; Atlassian recomienda. Pero en contextos compactos (size=sm dentro de una tabla de 300px de ancho), una ilustración de 80×80px puede consumir demasiado espacio visual y competir con el contenido de la tabla adyacente. El boolean permite que la versión compacta sea solo texto + acción cuando el contexto lo requiere.

**Tradeoff:** Si se deja el boolean como default OFF se pierden ilustraciones en contextos donde sí aportan valor. Default ON garantiza la presencia visual excepto cuando el diseñador deliberadamente la desactiva.

### 4. Layout centrado en todas las variantes (no side-by-side)

**Por qué:** Atlassian tiene un layout de dos columnas (ilustración izquierda, texto+acciones derecha) para paneles anchos. Este patrón requiere breakpoints y lógica responsive dentro del componente. Para mantener el componente simple y predecible en todos los contextos de Zoom, se eligió el layout centrado vertical único. El diseñador puede crear el layout de dos columnas composición directamente si lo necesita para un caso específico.

**Tradeoff:** Se pierde elegancia en contenedores muy anchos (>800px) donde el texto centrado puede verse estrecho. Aceptable para la mayoría de los contextos de Zoom.

### 5. Max-width fijo por size (400px sm / 600px lg)

**Por qué:** Sin max-width, el EmptyState en un contenedor de pantalla completa (1440px) produce líneas de texto extremadamente largas que son ilegibles. Los max-widths de 400px/600px corresponden a los rangos óptimos de longitud de línea para lectura en pantalla (45-75 caracteres por línea).

**Tradeoff:** El max-width fijo puede parecer "flotante" en contenedores muy anchos. Es el tradeoff correcto: legibilidad sobre ocupación de espacio.

### Excluded combinations

```
Variant=error + Has Primary Action=true (soft exclusion)
→ Los errores sin recuperación del lado del usuario no deben tener acción
→ Error con "Reintentar" SÍ tiene Primary Action (el usuario puede reintentar)
→ Error de infraestructura SIN acción posible → desactivar Has Primary Action
→ No es exclusión hard porque depende del tipo de error
```

---

## Behavior

### Essential for design

El EmptyState es un componente inline — vive dentro del flujo normal del documento y no interrumpe la navegación. No tiene focus trap ni comportamientos de interacción propios. Sus únicas partes interactivas son los botones de acción (Primary y Secondary), que siguen el comportamiento estándar de Button.

El único comportamiento especial es el del estado `Variant=search`: el título debe reflejar dinámicamente el término de búsqueda actual ("Sin resultados para 'quarterly report'"). Esto es responsabilidad del consumer, no del componente; el EmptyState expone el slot ✏️ Title como texto editable.

Cuando `Variant=error` y el usuario hace click en "Reintentar", el EmptyState debe ser reemplazado por el estado de carga (skeleton/spinner) del contenido que se está re-intentando. La transición entre estados es responsabilidad del consumer.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| EmptyState container | none (div) | ninguno — no es landmark | No añadir role artificial; el heading crea la estructura |
| illustration | img (decorativa) | `aria-hidden="true"` | Ilustraciones no aportan información semántica; título y descripción son suficientes para lectores de pantalla |
| title | heading (h2/h3 según contexto) | `id` para posible aria-labelledby | Heading real (no solo estilo visual) para navegación por headings en screen readers |
| description | p | ninguno | Texto informativo estándar |
| primaryAction | button o a | label descriptivo: "Crear primer proyecto" (no solo "Crear") | El label debe describir la acción en contexto, no solo el verbo |
| secondaryAction | button o a | label descriptivo según acción | Si es link (navegación) → `<a>`; si es acción → `<button>` |

### Keyboard navigation

Primary interactions (affect design):

```
Tab           → mueve focus al Primary Action button
Tab (2nd)     → mueve focus al Secondary Action (si visible)
Enter / Space → activa el botón enfocado
```

Secondary interactions (dev reference):

```
No focus trap — EmptyState no captura el foco
El heading semántico permite que usuarios de screen reader
lleguen al EmptyState navegando por headings (H key en NVDA/JAWS)
Heading level debe ser coherente con la jerarquía de la página:
  - EmptyState en página principal → h2
  - EmptyState dentro de una sección/panel → h3
  - EmptyState dentro de un modal → h2 (primero dentro del modal)
```

---

## Content guide

### Slot: illustration
Ilustración SVG decorativa que refuerza visualmente el contexto del estado. Cada variante tiene su ícono por defecto definido en la config:
- `default` → inbox (caja vacía)
- `search` → search-x (lupa con X)
- `error` → alert-triangle (triángulo de alerta — nunca en rojo)
- `no-access` → lock (candado)

El slot acepta instancia de ícono personalizado via instance-swap en Figma. Nunca añadir texto alternativo — es aria-hidden siempre.

### Slot: title (requerido)
El único slot requerido. Debe ser un heading semántico (h2/h3 según la jerarquía de la página). Reglas de contenido:
- **Variant=default:** orientado a acción — "Crea tu primer [elemento]", "Añade tu primer [elemento]"
- **Variant=search:** refleja el término — "Sin resultados para '[búsqueda]'"
- **Variant=error:** neutral, no alarmista — "Ocurrió un error", "No pudimos cargar el contenido"
- **Variant=no-access:** descriptivo — "Sin acceso a este contenido", "No tienes permiso para ver esto"
- Máximo: 60 caracteres (2 líneas en size=sm, 1 línea en size=lg)
- Nunca terminar con punto (son títulos, no oraciones)

### Slot: description
Párrafo de apoyo que amplía el contexto o guía los siguientes pasos. Opcional pero recomendado en todos los contexts salvo los más compactos.
- Default: "Comienza creando tu primer elemento."
- Search: "Intenta con otros términos o elimina los filtros."
- Error: "Intenta de nuevo en unos momentos. Si el problema persiste, contacta al soporte."
- No-access: "Solicita acceso al administrador de tu organización."
- Máximo: 120 caracteres (3 líneas en size=sm)
- Tono: informativo, no técnico, sin jerga de sistema

### Slot: primaryAction
Botón CTA principal. Debe tener un label que incluya contexto suficiente para ser comprensible sin leer el título:
- Bien: "Crear primer proyecto", "Limpiar filtros", "Reintentar", "Solicitar acceso"
- Mal: "Crear", "OK", "Aceptar", "Continuar"

### Slot: secondaryAction
Acción de apoyo — generalmente un link de "Aprender más" o una acción alternativa más ligera. Usar `<a>` si navega a otra página, `<button>` si es una acción en contexto. Default: oculto (Has Secondary Action = OFF).

---

## Pre-build checklist

```
Frames
[ ] Variant(4) × Size(2) = 8 frames generados
[ ] Has Illustration boolean visible en cada frame
[ ] Ilustración correcta por variante (inbox/search-x/alert-triangle/lock)
[ ] Has Primary Action ON por defecto en todos excepto error-no-recoverable
[ ] Has Secondary Action OFF por defecto

Tokens
[ ] est/title-color → text/primary verificado
[ ] est/desc-color → text/secondary verificado
[ ] est/illustration-bg → surface/subtle verificado
[ ] est/bg → surface/default verificado

Contenido
[ ] ✏️ Title con texto default orientado a acción para Variant=default
[ ] ✏️ Description con texto default contextual
[ ] Todas las propiedades de texto editables funcionan en Figma

Accesibilidad
[ ] Ilustración marcada como decorativa (aria-hidden en implementación)
[ ] Heading level documentado en description del componente
[ ] Primary Action label descriptivo (no solo "Crear")

Exclusiones
[ ] Variant=error documentado como soft exclusion para Primary Action
[ ] Max-width 400px (sm) / 600px (lg) aplicado en auto-layout

Responsive
[ ] Size=sm probado en contenedor de 300px de ancho
[ ] Size=lg probado en contenedor de 800px de ancho
[ ] Layout centrado funciona en ambos casos
```

---

## Related components

```
Button          → primaryAction y secondaryAction son instancias de Button
Icon            → illustration usa iconos como fallback cuando no hay SVG personalizado
Banner / Alert  → para errores globales a nivel de página (no secciones específicas)
Skeleton        → estado de carga ANTES de confirmar que el contenido es vacío
Illustration    → slot de ilustración puede aceptar componente standalone
Typography      → title y description usan Typography internamente
```

---

## Reference: how other systems do it

**Atlassian EmptyState** es el más estructuralmente completo de Tier 1. Su prop `headingLevel` requerido (h2 a h6) obliga al consumer a especificar el nivel de heading correcto para el documento — el único sistema que trata la semántica del heading como un requisito de API, no una recomendación de documentación. La jerarquía de tres niveles de acciones (primaryAction, secondaryAction, tertiaryAction) cubre la complejidad real de los empty states de producto: un sprint vacío en Jira podría ofrecer "Crear issue" (primary), "Importar issues" (secondary) y "Aprender más sobre sprints" (tertiary link). El layout responsive de dos columnas (ilustración + texto en pantallas anchas, apilado en estrechas) está gestionado por el componente.

**Polaris EmptyState** enforce que los empty states incluyan ilustraciones (prop `image` requerida) — reflejando la visión de Shopify de que los empty states en interfaces de merchant necesitan calidez visual. Las reglas de linting enforce títulos orientados a la acción: "Add your first product" en lugar de "No products yet". La prop `fullWidth` elimina la restricción de max-width para contextos de página completa.

**Ant Design Empty** acepta `image` como boolean (false para ocultar), URL string o ReactNode para ilustraciones personalizadas. El prop `ConfigProvider renderEmpty` establece un renderer global de empty state para TODOS los componentes de colección de Ant Design (Table, List, Select, TreeSelect, Transfer) — un único punto de configuración. La integración automática con componentes de colección es el feature más destacado: Table, List y Select muestran Empty automáticamente cuando sus datos están vacíos.

**Spectrum IllustratedMessage** requiere un SVG de ilustración como slot obligatorio. Adobe proporciona una biblioteca de SVGs pre-construidos para casos comunes (sin resultados, sin acceso, upload, error). No tiene slot de acción incorporado — las acciones son responsabilidad del consumer, colocadas adyacentes al componente.

**Gestalt IllustratedMessage** nombra su componente "IllustratedMessage" en lugar de "EmptyState" — un nombre más preciso porque el mismo componente maneja listas vacías, estados de error, placeholders de onboarding y puertas de permisos. La plataforma de descubrimiento visual de Pinterest convierte los tableros vacíos y las búsquedas con cero resultados en momentos de alto compromiso donde las ilustraciones impulsan el re-engagement.

**Orbit EmptyState** está diseñado para momentos de alta fricción en viajes. Sin resultados en una búsqueda de vuelos es un riesgo de abandono; el EmptyState de Orbit incluye ilustraciones temáticas de viaje y slots de acción para CTAs de recuperación ("Limpiar filtros", "Buscar de nuevo"). El componente distingue entre "sin resultados por filtros" y "genuinamente no hay datos" — copy diferente, acciones diferentes.

**Evergreen EmptyState** está diseñado para empty states de onboarding de nuevos workspaces. CTA primaria + anchorCta secundaria para links de "Aprender más". La prop `background` para contextos de panel claro/oscuro.

**Nord EmptyState** aplica el principio de calma visual en software clínico: nunca usar colores rojos o iconos de advertencia, para distinguir claramente "sin datos" de "fallo del sistema". En software médico, un clínico debe saber inmediatamente si un registro vacío significa que el paciente no tiene citas (normal) o que ocurrió un error del sistema (escalar a IT). El principio de calma visual de Nord se generaliza a cualquier contexto donde los estados de error y los estados de no-data deban ser inequívocamente distintos.

---

## Tokens

**8 tokens** · prefix `est-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| est/bg | surface/default | Fondo del contenedor EmptyState |
| est/title-color | text/primary | Color del texto del título (heading) |
| est/desc-color | text/secondary | Color del texto de descripción |
| est/illustration-bg | surface/subtle | Fondo del área de ilustración |
| est/focus/ring | border/focus | Ring de focus en botones de acción |
| est/action/primary | interactive/default | Color del botón primario |
| est/action/hover | interactive/hover | Estado hover del botón primario |
| est/action/disabled | text/disabled | Estado disabled de acciones |

### Spacing specs

```
Size=sm:
  illustrationSize: 80×80px
  gap (entre elementos): 12px
  padding horizontal (px): 24px
  padding vertical (py): 24px
  titleFontSize: 16px
  titleFontWeight: 600
  titleLineHeight: 24px
  descFontSize: 14px
  descLineHeight: 20px
  maxWidth: 400px
  layout: centered-stacked

Size=lg:
  illustrationSize: 160×160px
  gap (entre elementos): 20px
  padding horizontal (px): 40px
  padding vertical (py): 48px
  titleFontSize: 20px
  titleFontWeight: 600
  titleLineHeight: 28px
  descFontSize: 16px
  descLineHeight: 24px
  maxWidth: 600px
  layout: centered-stacked

Spacing entre slots (ambos sizes):
  illustration → title:    gap
  title → description:     gap
  description → actions:   gap
  primaryAction → secondaryAction: 8px (dentro del action group)
```
