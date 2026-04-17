# EmptyState

## Descripción general

EmptyState es el componente de placeholder para contenido vacío o ausente del sistema de diseño: comunica por qué no hay contenido, qué puede hacer el usuario para generarlo, y orienta hacia la acción. Es el primer estado que un usuario nuevo ve en tablas, listas, dashboards, y secciones de datos — y su redacción y diseño tienen impacto directo en la activación y retención. Existen cuatro variantes contextuales: `default` (sin elementos aún), `search` (sin resultados para la búsqueda), `error` (falló la carga), y `no-access` (sin permisos). El Size define si vive en una sección (sm) o en una página completa (lg).

```
Size=lg (página completa — Variant=default):
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                    ┌──────────────────┐                       │
│                    │  🖼  (160px)      │  ← ilustración       │
│                    └──────────────────┘                       │
│                                                                │
│               Crea tu primer proyecto                         │  20px/600
│         Organiza y comparte tu trabajo en un solo lugar.      │  16px/400
│                                                                │
│                    [ Crear proyecto ]                          │  Button primary
│                      [ Ver tutorial ]                          │  Button ghost
│                                                                │
└────────────────────────────────────────────────────────────────┘

Size=sm (sección — Variant=search):
┌──────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────┐   │
│  │   🔍 (80px)                                        │   │
│  │   Sin resultados para "Dashboard Q2"               │   │  16px/600
│  │   Intenta con otros términos o filtros.            │   │  14px/400
│  │   [ Limpiar búsqueda ]                             │   │
│  └────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘

Variants (4) × Sizes (2):
┌──────────────────────────────────────────────────────────────┐
│  default   🗂  (vacío)     │  search    🔍  (sin resultados) │
│  error     ⚠  (falló)     │  no-access 🔒  (sin permisos)   │
└──────────────────────────────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Variant → default | search | error | no-access
Size    → sm | lg
```

Toggles:

```
👁 Has Illustration     → muestra/oculta la imagen/ilustración (default: on)
👁 Has Description      → muestra/oculta el texto descriptivo (default: on)
👁 Has Primary Action   → muestra/oculta el botón primario (default: on)
👁 Has Secondary Action → muestra/oculta el botón secundario (default: off)
```

Textos editables:

```
✏️ Title       → "No hay elementos aún"
✏️ Description → "Comienza creando tu primer elemento."
```

### Panel de propiedades en Figma

```
┌────────────────────────────────────────────────────────────────┐
│  EmptyState                                                    │
│  ────────────────────────────────────────────────────────────  │
│  Variant  [ default        ▼ ]                                 │
│  Size     [ lg             ▼ ]                                 │
│  ────────────────────────────────────────────────────────────  │
│  👁 Has Illustration      [ on ]                               │
│  👁 Has Description       [ on ]                               │
│  👁 Has Primary Action    [ on ]                               │
│  👁 Has Secondary Action  [ off ]                              │
│  ✏️ Title         [ No hay elementos aún               ]       │
│  ✏️ Description   [ Comienza creando tu primer elemento.]      │
└────────────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Una sección o página no tiene contenido que mostrar?
                    │
                    ▼
       ¿Por qué está vacío?
       ├── Usuario nuevo (nunca ha creado nada) → Variant=default
       ├── Búsqueda sin resultados             → Variant=search
       ├── Error al cargar los datos            → Variant=error
       └── Sin permisos de acceso               → Variant=no-access
                    │
                    ▼
       ¿Qué tan prominente debe ser?
       ├── Página completa (toda la vista es empty) → Size=lg
       └── Sección dentro de una página            → Size=sm
                    │
                    ▼
       ¿El usuario puede resolver el estado vacío?
       ├── Sí (crear, buscar diferente) → Has Primary Action=on
       └── No (no-access, error sin retry) → Has Primary Action=off
```

**Usar EmptyState cuando:**
- Tabla o lista vacía en el primer uso del usuario ("No tienes proyectos — Crear proyecto")
- Panel de búsqueda sin resultados ("Sin resultados para 'X' — Limpiar búsqueda")
- Dashboard con datos que fallaron al cargar ("Error al cargar métricas — Reintentar")
- Sección de permisos a la que el usuario no tiene acceso ("Sin acceso — Solicitar acceso")
- Widget de historial sin datos ("Sin actividad reciente")

**NO usar EmptyState cuando:**
- El estado vacío es transitorio (skeleton mientras carga) → usar `Skeleton`
- Solo se necesita un mensaje de validación → usar Banner/inline o mensaje de campo
- El contenido está cargando → usar `Spinner` centrado
- La pantalla tiene múltiples secciones, solo una está vacía → limitar EmptyState al área afectada

---

## Variaciones visuales

### Variant

| Variant   | Ilustración predeterminada | Título template | Tiene acción |
|-----------|--------------------------|----------------|-------------|
| default   | inbox / file-empty (80/160px) | "No hay [elementos] aún" | Sí — crear el primer elemento |
| search    | search-x (80/160px) | "Sin resultados para '[búsqueda]'" | Sí — limpiar búsqueda o filtros |
| error     | alert-triangle (80/160px) | "Ocurrió un error" | Opcional — reintentar |
| no-access | lock (80/160px) | "Sin acceso a este contenido" | Opcional — solicitar acceso |

### Size

| Size | Ilustración | Gap | Padding | TitleFont | DescFont | MaxWidth |
|------|------------|-----|---------|----------|---------|---------|
| sm   | 80px       | 12px | px:24 py:24 | 16px/600 | 14px/400 | 400px |
| lg   | 160px      | 20px | px:40 py:48 | 20px/600 | 16px/400 | 600px |

---

## Decisiones de diseño

**1. 4 variants contextuales (default/search/error/no-access)** — Cada variant tiene una ilustración distinta, un tono de redacción diferente, y distintas acciones disponibles. Ant Design usa un ConfigProvider global para ilustraciones custom; Atlassian y Polaris tienen variantes implícitas por contexto. Los 4 variants cubren los casos de Zoom: tablas vacías (default), resultados de búsqueda (search), errores de carga (error), y pantallas de permisos (no-access).

**2. Title orientado a acción (no solo "No hay X")** — Polaris enforcea headings que describen lo que el usuario PUEDE hacer, no el estado vacío: "Crea tu primer proyecto" es más motivador que "No hay proyectos". El título del EmptyState es una oportunidad de orientar al usuario hacia el siguiente paso. El diseñador puede personalizar con ✏️ Title.

**3. Has Illustration boolean (default ON)** — Para Size=sm dentro de tablas o widgets compactos, la ilustración puede ser excesiva. El toggle permite omitirla cuando el espacio es limitado. Para Size=lg de página completa, la ilustración es siempre recomendada — le da identidad al estado vacío.

**4. Ilustración no es imagen real** — La ilustración en EmptyState es un placeholder visual (ícono grande o SVG simple), no una fotografía. La implementación usa ilustraciones del sistema o SVGs personalizados por contexto. En Figma, se modela como imagen abstracta con el ícono contextual del variant.

**5. Variant=error + Has Primary Action** — Errores no siempre tienen acción ("Reintentar"). Cuando el error es irrecuperable (acceso revocado, recurso eliminado), Has Primary Action=off es correcto. El toggle permite modelar ambos casos.

### Combinaciones excluidas

```
Variant=error + Has Primary Action=on → solo en errores con "Reintentar" disponible
                                        (no excluir — es el caso más común)
```

---

## Comportamiento

### Esencial para diseño

- **Siempre centrado en su área** — EmptyState se centra horizontal y verticalmente dentro del espacio disponible (tabla, sección, página). Para Size=lg de página completa, se centra en el viewport disponible.
- **MaxWidth limita el ancho del contenido** — aunque el contenedor puede ser más ancho, el contenido del EmptyState tiene maxWidth=400px (sm) o 600px (lg) para limitar la longitud de línea. El contenido se centra dentro de ese maxWidth.
- **Ilustración es decorativa** — `aria-hidden="true"` en la ilustración. El título y descripción comunican todo el significado semántico.
- **Title como heading semántico** — el título debe ser un `<h2>` o `<h3>` según la jerarquía del documento, no un `<p>` o `<span>`. Esto permite que los screen readers naveguen a él como heading de sección.
- **Variant=search debe reflejar la búsqueda actual** — el título debe incluir el término buscado: "Sin resultados para 'Dashboard Q2'" no solo "Sin resultados". El developer inyecta el término dinámicamente.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Título | `<h2>` o `<h3>` (heading semántico) | SR puede navegar al EmptyState como heading de sección |
| Ilustración | `aria-hidden="true"` en img/svg | Decorativa — el texto ya comunica el mensaje |
| Primary Action | `<button>` con label descriptivo | "Crear primer proyecto" no "Clic aquí" |
| Secondary Action | `<a>` o `<button>` según comportamiento | Link si navega; button si ejecuta acción |
| Container | `<section>` o `<div role="region">` + `aria-label` | Delimita la región semántica del estado vacío |
| Variant=search | El término buscado en el título | SR contextualiza: "Sin resultados para 'Dashboard Q2'" |

### Navegación por teclado

```
Tab         → navega a Has Primary Action y Has Secondary Action
Enter/Space → activa el botón/link de acción
Shift+Tab   → navega hacia atrás

Sin focus trap — EmptyState es inline en el flujo del documento.
```

---

## Guía de contenido

**Title — principios clave:**
- Orientado a acción para Variant=default: "Crea tu primer X", "Empieza invitando a tu equipo"
- Contextual para Variant=search: "Sin resultados para '[término]'" — siempre incluir el término
- Empático para Variant=error: "No se pudo cargar" (no "Error 500"), proponer solución en description
- Informativo para Variant=no-access: "No tienes acceso a [qué]" — claro y sin culpa

**Description:**
- Complementar el título con el contexto del "¿por qué?" y el "¿qué hacer?"
- Para default: beneficio de la acción — "Organiza y comparte tu trabajo en un solo lugar"
- Para search: sugerir alternativas — "Intenta con otros términos o elimina los filtros"
- Para error: indicar la causa si es conocida + acción — "Revisa tu conexión e intenta de nuevo"
- Para no-access: indicar quién puede dar acceso — "Solicita acceso al administrador de tu organización"
- Máximo 2 líneas — si necesita más, el estado es más complejo de lo que EmptyState puede resolver

**Has Primary Action — label:**
- Verbo + sustantivo concreto: "Crear proyecto", "Limpiar búsqueda", "Reintentar", "Solicitar acceso"
- Para default: el label es la propuesta de valor principal — "Crear mi primer proyecto"
- Para search: acción directa — "Limpiar búsqueda" o "Eliminar filtros"
- Para error: "Reintentar" o "Recargar página"
- Para no-access: "Solicitar acceso" o no mostrar (Has Primary Action=off)

---

## Pre-build checklist

```
□ ¿Title es un heading semántico (<h2>/<h3>)?
□ ¿La ilustración tiene aria-hidden="true"?
□ ¿Primary Action label es descriptivo ("Crear proyecto", no "OK")?
□ ¿Variant=search incluye el término buscado en el título dinámicamente?
□ ¿Variant=error sin Primary Action cuando el error es irrecuperable?
□ ¿Variant=no-access sin Primary Action si no hay forma de solicitar acceso?
□ ¿MaxWidth limita el ancho del contenido (400/600px) aunque el container sea más ancho?
□ ¿EmptyState está centrado en su área?
□ ¿Size=lg solo para página completa (no para secciones)?
□ ¿Has Illustration=off en contextos muy compactos (Size=sm en tablas)?
```

---

## Componentes relacionados

```
Skeleton   → para estado de loading antes de determinar si hay contenido
Spinner    → para loading de contenido (antes del EmptyState o del contenido real)
Banner     → para mensajes de error inline en formularios (no estado vacío)
Table      → usa EmptyState/sm cuando no hay filas que mostrar
List       → usa EmptyState/sm cuando no hay ítems
Dashboard  → usa EmptyState/lg en pantalla completa de primer uso
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Variants | Sizes | Ilustración | Acción | Diferenciador |
|---------|-------|----------|-------|------------|--------|--------------|
| **Material Design 3** | Sin componente | — | — | Ilustración custom | — | Sin EmptyState; patrón UX de M3 usa Progress |
| **Spectrum (Adobe)** | IllustratedMessage | Sin variants | Sin size | SVG obligatorio | button/link | IllustratedMessage universal; sin variantes contextuales |
| **Carbon (IBM)** | Empty State | 5 variants (error/info/noData/noResults/notFound) | lg/sm/xs | Ilustración | button | Más variants; xs para widgets; image puede ser custom |
| **Polaris (Shopify)** | EmptyState | Sin variants (contexto manual) | Sin size | image obligatorio | primaryAction/secondaryAction | heading orientado a acción; footerContent slot |
| **Atlassian** | EmptyState | Sin variantes formales | — | imageUrl | primaryAction/secondaryAction | header + description + actions; image custom |
| **Ant Design** | Empty | Sin variants formales | — | SVG default (hormiga) | description slot | ConfigProvider para imagen global; simple=true para compact |
| **Twilio Paste** | EmptyState | Sin variants | — | image slot | — | Minimal; sin variants; image custom |
| **Lightning** | Sin componente | — | — | — | — | Patrón CSS con illustration |
| **Primer (GitHub)** | Blankslate | Sin variants | — | Octicon | button + action | graphic slot (SVG/icon); variations para size |
| **shadcn/ui** | Sin componente | — | — | — | — | Patrón de composición con Card |
| **Chakra UI** | Sin componente | — | — | — | — | Composición manual con VStack |
| **Fluent 2** | Sin componente | — | — | — | — | Composición con ilustración custom |
| **Gestalt (Pinterest)** | Sin componente (Callout) | — | — | — | — | Callout como alternativa |
| **Mantine** | Sin componente | — | — | — | — | Composición con Stack + Image |
| **Orbit (Kiwi)** | Sin componente | — | — | — | — | Domain-specific; no EmptyState genérico |
| **Evergreen** | Sin componente | — | — | — | — | Composición manual |
| **Nord** | Sin componente | — | — | — | — | Healthcare; uso de Alert o Typography |

**Patrones clave de la industria:**
1. **Variantes contextuales son raros** — Solo Carbon (T1) tiene variantes formales del empty state (error/noData/noResults/notFound/info). La mayoría delega la variación al contenido (imagen + texto custom). La decisión de 4 variants predefinidos reduce la carga de decisión del diseñador y developer.
2. **Ilustración obligatoria en T1** — Spectrum, Polaris, y Atlassian requieren ilustración. Carbon tiene ilustraciones predefinidas por variant. La ilustración hace el estado vacío más humano y memorable. El toggle Has Illustration=off es un escape hatch, no el default.
3. **Heading orientado a acción** — Solo Polaris enforcea esto explícitamente, pero es la best practice de UX más adoptada. "Crea tu primer proyecto" vs "No hay proyectos" tiene impacto medible en la activación.
4. **Primary + Secondary actions** — Polaris y Atlassian tienen dos niveles de acción. El patrón: acción primaria (crear, resolver) + acción secundaria (aprender, explorar). Modelar ambos como toggles independientes es el enfoque más flexible.

---

## Tokens

**8 tokens** · prefijo `est-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `est-title-color` | `text/primary` | Color del título |
| `est-desc-color` | `text/secondary` | Color de la descripción |
| `est-illustration-bg` | `surface/subtle` | Fondo del placeholder de ilustración |
| `est-bg` | `surface/default` | Background del componente |
| `est-sm-illustrationSize` | `sizing/80` | Tamaño ilustración Size=sm — 80px |
| `est-lg-illustrationSize` | `sizing/160` | Tamaño ilustración Size=lg — 160px |
| `est-sm-maxW` | `sizing/400` | MaxWidth Size=sm — 400px |
| `est-lg-maxW` | `sizing/600` | MaxWidth Size=lg — 600px |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Size=sm:                                                │
│  ilustración: 80px · gap: 12px · px:24 py:24            │
│  title: 16px/600/24px · desc: 14px/400/20px             │
│  maxW: 400px · layout: centered-stacked                 │
│                                                          │
│  Size=lg:                                                │
│  ilustración: 160px · gap: 20px · px:40 py:48           │
│  title: 20px/600/28px · desc: 16px/400/24px             │
│  maxW: 600px · layout: centered-stacked                 │
│                                                          │
│  Frames totales:                                         │
│  Variant(4) × Size(2) = 8 frames                        │
└──────────────────────────────────────────────────────────┘
```
