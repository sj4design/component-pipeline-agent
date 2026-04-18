# FileUpload

## Overview

FileUpload es un componente compuesto de dos partes: el contenedor de carga (`FileUpload`) y el ítem de archivo individual (`FileItem`). Juntos cubren todo el ciclo de vida de un archivo: selección (drag-and-drop o click-to-browse), carga (con progress bar), y estados finales (éxito, error, pausa). La separación en dos componentes permite usar `FileItem` de forma independiente dentro de tablas, listas de adjuntos o cualquier contexto que muestre el estado de un archivo ya seleccionado.

El principio de diseño fundamental que unifica todos los sistemas: el drag-and-drop es una mejora progresiva, no el único mecanismo. Un botón de selección de archivos (click-to-browse) debe siempre estar disponible, ya que muchos usuarios con discapacidades motoras no pueden realizar gestos de arrastrar. Carbon IBM lleva esto al extremo haciendo que el drop zone sea un elemento `<button>` nativo — el único enfoque que garantiza accesibilidad de teclado sin ARIA adicional.

```
Variant=dropzone (layout completo):
┌─────────────────────────────────────────────────────────────┐
│  Subir archivos                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │  Size=md (180px height)                               │  │
│  │         ↑                                             │  │
│  │  [    ícono upload 48px    ]                          │  │
│  │                                                       │  │
│  │   Arrastra archivos aquí o haz click                  │  │
│  │         [ Seleccionar archivos ]                      │  │
│  │     JPG, PNG, PDF hasta 10MB por archivo              │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                            ↑ borde punteado                 │
├─────────────────────────────────────────────────────────────┤
│  State=dragover:                                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  bg: brand/subtle · borde: sólido 2px brand           │  │
│  │  "Suelta para subir"                                   │  │
│  └───────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  File list (después de selección):                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  📄 reporte-q1.pdf   ████████░░  80%            [×]  │  │
│  │  📄 presupuesto.xlsx ██████████ Completado      [×]  │  │
│  │  📄 notas.txt        ⚠ Archivo muy grande       [×]  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

Variant=button-only:
[ ↑ Seleccionar archivo ]   JPG, PNG hasta 10MB

Variant=compact:
[↑] Adjuntar archivo | documento.pdf ████░░ 60% [×]
```

El `FileUpload` acepta `N` instancias de `FileItem` en el slot `fileList`. `FileItem` es un building block reutilizable que también puede aparecer standalone en otros contextos.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
FileUpload:
  State:    default | hover | dragover | error | disabled
  Size:     sm | md | lg
  Variant:  dropzone | button-only | compact

FileItem:
  State:    pending | uploading | success | error | paused
  Size:     sm | md
```

Toggles (show/hide parts — do NOT generate extra variants):

```
FileItem:
  Has Icon        → ícono del tipo de archivo (pdf, image, doc)
  Has Size        → texto del tamaño del archivo (ej. "2.3 MB")
  Show Progress   → barra de progreso (visible en State=uploading)
  Show Remove     → botón × para eliminar el archivo de la lista
```

### Figma properties panel

```
FileUpload:
┌─────────────────────────────────────────────┐
│  FileUpload                                 │
├─────────────────────────────────────────────┤
│  Variant        [ dropzone ▼ ]              │
│                   button-only               │
│                   compact                   │
├─────────────────────────────────────────────┤
│  State          [ default ▼ ]               │
│                   hover                     │
│                   dragover                  │
│                   error                     │
│                   disabled                  │
├─────────────────────────────────────────────┤
│  Size           [ md ▼ ]                    │
│                   sm                        │
│                   lg                        │
└─────────────────────────────────────────────┘

FileItem:
┌─────────────────────────────────────────────┐
│  FileItem                                   │
├─────────────────────────────────────────────┤
│  State          [ uploading ▼ ]             │
│                   pending / success         │
│                   error / paused            │
├─────────────────────────────────────────────┤
│  Size           [ md ▼ ] / sm               │
├─────────────────────────────────────────────┤
│  Has Icon          [ ✓ ]                   │
│  Has Size          [ ✓ ]                   │
│  Show Progress     [ ✓ ]                   │
│  Show Remove       [ ✓ ]                   │
├─────────────────────────────────────────────┤
│  🔄 File Icon     [ icon/file-pdf ▼ ]       │
│  🔄 Status Icon   [ icon/check ▼ ]          │
│  ✏️ Name          [ document.pdf         ]  │
│  ✏️ Size          [ 2.3 MB               ]  │
└─────────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿El usuario necesita subir archivos?
│
├─ Sí → ¿Es el upload la acción principal de la pantalla?
│        ├─ Sí → ¿Espera subir múltiples archivos?
│        │        ├─ Sí → FileUpload Variant=dropzone (Size=lg)
│        │        └─ No → FileUpload Variant=dropzone (Size=sm o md)
│        │
│        └─ No → ¿Es un campo más dentro de un formulario?
│                 ├─ Sí → FileUpload Variant=button-only o compact
│                 └─ No → ¿Es un adjunto inline en un mensaje/ticket?
│                          ├─ Sí → FileUpload Variant=compact
│                          └─ No → FileUpload Variant=button-only
│
└─ No → No usar FileUpload
```

**Use FileUpload when:**
- El usuario necesita cargar uno o más archivos como parte de un flujo de trabajo
- La acción de upload es el foco principal de la pantalla (documentos, imágenes de producto, CSV)
- El usuario se beneficia del feedback visual de progreso durante la carga
- El contexto requiere selección de archivos desde el sistema operativo (no URL)
- Se necesita validar tipos de archivo o tamaño máximo con feedback inmediato

**Do NOT use FileUpload when:**
- Solo se necesita capturar una URL de imagen (usar campo de texto o avatar component)
- El upload es completamente transparente al usuario (background sync) — no mostrar UI
- El contexto es tan compacto que ni `Variant=button-only` tiene espacio
- El tipo de archivo requiere verificación de identidad o compliance especial (usar servicio externo certificado)
- La app es solo móvil táctil y el drag-and-drop no aporta valor (considerar solo `button-only`)

---

## Visual variations

### FileUpload por Variant

**Variant=dropzone**
El patrón más rico visualmente. Un área rectangular con borde punteado que actúa como target de drag-and-drop Y como zona clickeable para abrir el file picker nativo. Incluye ícono, label principal y texto de hint. Esta es la variante para cuando el upload es la acción principal de la pantalla.

**Variant=button-only**
Un botón estándar que abre el file picker. Sin zona de drag-and-drop. Ideal para formularios donde el upload es un campo más entre otros. Más compacto y menos disruptivo visualmente. Exclusión hard: `Variant=button-only + State=dragover` no existe (el botón no puede ser target de drag).

**Variant=compact**
Versión inline para adjuntos en mensajes, comentarios o tickets. Combina un botón pequeño con el file list inline. Diseñado para contextos donde el upload vive dentro de otro componente (MessageComposer, TaskForm).

### FileUpload por State (Variant=dropzone)

| State | Borde | Fondo | Descripción |
|-------|-------|-------|-------------|
| default | punteado · color `border/default` | transparente | Reposo — invita al arrastre |
| hover | punteado · color `border/focus` | `surface/hover` | Mouse sobre el área |
| dragover | sólido 2px · color `interactive/default` | `brand/subtle` | Archivo arrastrado encima — confirmación visual |
| error | punteado · color `status/error/border` | `status/error/bg` | Tipo de archivo rechazado o error de validación |
| disabled | punteado · color `border/disabled` | `surface/disabled` | opacidad 0.6 — sin interacción |

### FileItem por State

| State | Fondo | Texto color | Ícono status |
|-------|-------|-------------|--------------|
| pending | transparente | text/secondary | hourglass |
| uploading | brand/subtle | interactive/default | progress bar visible |
| success | status/success/bg | status/success/fg | check-circle |
| error | status/error/bg | status/error/fg | alert-circle |
| paused | status/warning/bg | status/warning/fg | pause |

### FileUpload por Size (Variant=dropzone)

| Size | Altura dropZone | Padding | Ícono upload | Label fontSize |
|------|----------------|---------|--------------|----------------|
| sm | 120px | 16px | 32px | 14px |
| md | 180px | 24px | 48px | 16px |
| lg | 240px | 32px | 64px | 18px |

---

## Design decisions

### 1. Tres Variants: dropzone / button-only / compact

**Por qué:** Las tres variantes responden a tres necesidades distintas de contexto. Dropzone para cuando el upload es la acción principal (Polaris DropZone, Carbon FileUploader, Ant Design Upload.Dragger); button-only para formularios donde el upload es un campo más entre muchos (patrón de GOV.UK, Fluent 2); compact para adjuntos inline en conversaciones o tickets (Gmail, Notion). Ningún sistema cubre bien los tres con un único componente — tener tres variantes explícitas evita hacks visuales.

**Tradeoff:** Más variantes = más frames en Figma y más casos de uso que documentar. El tradeoff es correcto: la consistencia visual entre los distintos contextos de Zoom justifica tener las tres variantes bien definidas.

### 2. Cinco estados de FileItem incluyendo paused

**Por qué:** Archivos grandes requieren pause/resume. State=paused es estándar en enterprise file upload (Dropbox, Google Drive, OneDrive). Sin este estado, no existe forma de representar visualmente la pausa de una carga en progreso. La alternativa — mostrar "uploading" con un indicador de pausa — mezcla semánticas y confunde al usuario.

**Tradeoff:** Añade complejidad al FileItem (5 estados vs. 4). Para archivos pequeños (<10MB) el estado `paused` nunca se usa. Es una inversión para futuras necesidades de upload de archivos grandes.

### 3. Progress bar como slot dentro de FileItem

**Por qué:** El feedback visual del progreso es crítico durante la carga. Integrarlo directamente en el FileItem en lugar de un componente de progress separado simplifica el layout — el item ya sabe cuánto espacio tiene y puede mostrar la barra dentro de sus límites. La alternativa (progress bar separado debajo de cada item) duplica la cantidad de elementos DOM y complica el auto-layout de Figma.

**Tradeoff:** La progress bar dentro del FileItem tiene dimensiones fijas (ancho máximo del item). Para items muy compactos (Size=sm) la barra puede ser visualmente delgada. Aceptable — el estado `uploading` siempre se muestra en size=md o superior en contextos donde el progreso importa.

### 4. Drag & drop con fallback de teclado obligatorio (WCAG 2.1.1)

**Por qué:** WCAG 2.1.1 requiere que toda funcionalidad que usa gestos de puntero tenga una alternativa de teclado. Drag-and-drop es un gesto de puntero. La alternativa es el botón "Seleccionar archivos" (click-to-browse). Carbon IBM va un paso más allá: hace que el drop zone sea un elemento `<button>` nativo, que inherentemente es focuseable y activable con Enter/Space. GOV.UK ha demostrado con research que muchos usuarios — personas mayores, usuarios con discapacidades motoras, usuarios en dispositivos táctiles — no pueden o no saben hacer drag-and-drop.

**Tradeoff:** El botón "Seleccionar archivos" debe siempre estar visible, incluso en Variant=dropzone. Esto añade un elemento visual que "compite" con la instrucción de arrastre. La solución: presentar el botón como parte del label del drop zone ("Arrastra archivos aquí o **haz click**"), no como un elemento separado.

### 5. Exclusión: Variant=compact + dropZoneIcon large

**Por qué:** La variante compact está diseñada para contextos inline donde el espacio horizontal es limitado. Un ícono de upload de 48px o 64px en un contexto compact rompe la densidad visual esperada. La exclusión garantiza que el ícono large solo aparece en Variant=dropzone.

**Tradeoff:** El diseñador no puede añadir énfasis visual extra a Variant=compact mediante el ícono. Es el tradeoff correcto: compact debe ser compact.

### Excluded combinations

```
Variant=button-only + State=dragover
→ El botón no es una superficie que acepte drag
→ Combinación imposible: excluida hard

Variant=compact + dropZoneIcon large
→ Ícono grande en contexto compact rompe densidad
→ Excluida en config

FileItem State=uploading + Show Progress=false
→ La progress bar es la única indicación de progreso en uploading
→ Si uploading, Show Progress debe ser true (soft rule)
```

---

## Behavior

### Essential for design

El comportamiento más importante del FileUpload es la distinción entre estado visual del drop zone y estado de los FileItems — son dos sistemas de estado paralelos. El drop zone puede estar en `dragover` mientras los FileItems muestran `uploading` de archivos anteriores. El diseñador debe entender que el drop zone representa la zona de entrada y los FileItems representan el estado de cada archivo.

El timing de upload es siempre consumer-controlled: agregar archivos al drop zone NO inicia la carga automáticamente. El usuario siempre confirma explícitamente. Esta decisión (tomada también por Carbon, Paste y Base Web) es crítica para flujos de review-before-submit donde el usuario puede revisar la lista antes de confirmar.

Cuando `State=dragover`, el borde cambia de punteado a sólido y el fondo cambia a `brand/subtle`. Este cambio visual confirma al usuario que el archivo será aceptado si lo suelta. Si el archivo es de tipo inválido, el estado debe cambiar a `error` visualmente durante el drag (no solo después de soltar).

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Drop zone | button | `tabindex=0` · `aria-label="Subir archivo. Arrastra o haz click para seleccionar"` | Accesibilidad de teclado — Enter/Space abre el file picker nativo |
| Input nativo | input[type=file] | `aria-describedby` → hint text ID · `aria-label` si sin label visible | Base semántica de accesibilidad; siempre presente aunque visualmente oculto |
| Drop zone (dragover) | — | `aria-live="polite"` anuncia "Suelta para subir" | Usuario de screen reader sabe que puede soltar |
| File list | list | `role="list"` | Semántica de lista para navegación de screen reader |
| FileItem | listitem | `role="listitem"` | Cada archivo como ítem de lista |
| Progress bar | progressbar | `aria-valuenow` · `aria-valuemax="100"` · `aria-label="Subiendo [filename]"` | El porcentaje de progreso es anunciado |
| Upload progress | — | `aria-live="polite"` con "Subiendo archivo.pdf, 40%" | Actualización de progreso para screen readers |
| Upload success | — | `aria-live="polite"` con "archivo.pdf subido correctamente" | Confirmación de éxito |
| Upload error | — | `aria-live="assertive"` con descripción específica del error | Errores críticos anunciados inmediatamente |
| Remove button | button | `aria-label="Eliminar [filename]"` | Cada botón × tiene contexto de qué archivo elimina |

### Keyboard navigation

Primary interactions (affect design):

```
Tab           → mueve focus al drop zone (o al botón en button-only)
Enter / Space → abre file picker nativo del OS
Tab (2nd+)    → mueve focus al primer FileItem, luego al remove button
Enter / Space → en remove button elimina el archivo de la lista
```

Secondary interactions (dev reference):

```
Escape durante upload → cancela la carga (si el backend lo soporta)
Drop zone como <button> nativo → inherentemente focuseable sin ARIA adicional
Input[type=file] oculto → recibe el resultado del file picker
aria-live="polite" → anuncia adición de archivos sin interrumpir el flujo
aria-live="assertive" → solo para errores (interrumpe para notificar)
Drag & drop no es la única forma → siempre hay fallback click-to-browse
```

---

## Content guide

### Slot: dropZoneLabel (requerido)
Texto principal del área de drop zone. Debe comunicar tanto la posibilidad de arrastre como la alternativa de click:
- Bien: "Arrastra archivos aquí o haz click para seleccionar"
- Bien: "Suelta tus archivos aquí"
- Mal: "Upload" (sin instrucción)
- Mal: "Drag and drop" (sin fallback mencionado)

### Slot: dropZoneHint
Restricciones de tipo y tamaño. WCAG requiere que estas restricciones se comuniquen en texto visible, no solo en el atributo `accept` del input (que filtra silenciosamente):
- Bien: "JPG, PNG, PDF · Máximo 10 MB por archivo"
- Bien: "Formatos soportados: PDF, Word, Excel · Hasta 25 MB"
- Mal: (vacío) — el usuario no sabe qué puede subir hasta que recibe un error
- Nunca mencionar el atributo `accept` técnico — usar nombres legibles

### Slot: errorMessage (FileUpload nivel)
Error a nivel del drop zone (tipo inválido, tamaño excedido, demasiados archivos):
- Bien: "Solo se aceptan archivos JPG, PNG y PDF"
- Bien: "El archivo supera el límite de 10 MB"
- Nunca: "Error 413" o mensajes técnicos de servidor

### Slot: name (FileItem, requerido)
Nombre completo del archivo con extensión. Nunca truncar el nombre en el texto del slot — el truncado es responsabilidad del CSS:
- Default: "document.pdf"
- Debe incluir extensión para que el usuario identifique el tipo

### Slot: icon (FileItem)
Ícono que representa el tipo de archivo (pdf, image, doc, xlsx, etc.). Usa instance-swap para que el diseñador pueda cambiar el ícono por tipo de archivo. Default: `icon/file-pdf`.

---

## Pre-build checklist

```
Frames FileUpload
[ ] State(5) × Size(3) × Variant(3) = 45; −9 exclusiones = 36 frames
[ ] Exclusión hard: button-only + dragover eliminado
[ ] Exclusión hard: compact + dropZoneIcon large eliminado
[ ] State=dragover: borde sólido 2px + bg brand/subtle visible
[ ] State=error: borde rojo + bg error/bg + errorMessage visible
[ ] State=disabled: opacidad 0.6 aplicada

Frames FileItem
[ ] State(5) × Size(2) = 10 frames
[ ] State=uploading: Show Progress=true por defecto
[ ] State=success: statusIcon check-circle visible
[ ] State=error: statusIcon alert-circle visible + bg error/bg
[ ] State=paused: statusIcon pause + bg warning/bg

Tokens
[ ] fu/dragover/bg → brand/subtle verificado
[ ] fu/dragover/border → interactive/default verificado
[ ] fu/error/bg → status/error/bg verificado
[ ] fu/item/success/bg → status/success/bg verificado
[ ] fu/item/uploading/bg → brand/subtle verificado

Accesibilidad
[ ] Drop zone documentado como button (tabindex=0)
[ ] Remove buttons con aria-label="Eliminar [filename]" documentado
[ ] aria-live regions documentados en component description
[ ] Hint text de tipos de archivo siempre visible (no solo en atributo accept)

Content
[ ] ✏️ Name con "document.pdf" como default
[ ] ✏️ Size con "2.3 MB" como default
[ ] dropZoneLabel con instrucción de drag + click
[ ] dropZoneHint con tipos de archivo + límite de tamaño
```

---

## Related components

```
Button        → browseButton usa Button component
Icon          → dropZoneIcon y file type icons son instancias de Icon
ProgressBar   → progressBar dentro de FileItem puede ser ProgressBar component
Badge         → statusIcon en FileItem puede usar Badge de estado para texto
Form          → FileUpload como FormField dentro de un Form
EmptyState    → cuando el file list está vacío antes de seleccionar
```

---

## Reference: how other systems do it

**Carbon FileUploader** es el más accesible en Tier 1. La decisión crítica: la zona de drag-and-drop se renderiza como un elemento `<button>`, no un `<div>`. Esto hace que el drop zone sea focuseable por teclado y activable con Enter/Space para abrir el diálogo de archivos — la única forma en que los usuarios que solo usan teclado pueden "arrastrar" archivos. Todos los demás sistemas usan `<div>` con adiciones ARIA; Carbon usa el elemento nativo que inherentemente puede operarse por teclado. Los objetos de estado por archivo rastrean estados individuales (`uploading`, `uploaded`, `error`, `selected`). Cuando ocurren transiciones de estado, el `aria-label` en cada ítem de archivo se actualiza para anunciar el nuevo estado a los lectores de pantalla.

**Ant Design Upload** es el más rico en variantes de Tier 1. La prop `listType` selecciona entre cuatro modos visuales de lista de archivos: `text` (lista de nombres), `picture` (lista con miniaturas), `picture-card` (cuadrícula de imágenes con tarjetas de agregar/previsualizar), `picture-circle` (slots circulares estilo avatar). `Upload.Dragger` es el sub-componente de zona de drag-and-drop. `customRequest` reemplaza la capa HTTP — los equipos pueden sustituir el XHR por defecto con AWS S3, Alibaba OSS o cualquier SDK personalizado.

**Spectrum FileTrigger + DropZone** separa la selección de archivos (FileTrigger) de la zona de drag-and-drop (DropZone — región desplegable independiente). FileTrigger agrega comportamiento de `<input type="file">` a cualquier botón o link de Spectrum sin forzar un estilo visual específico. Spectrum proporciona solo el mecanismo de selección de archivos — la lista de archivos, el progreso de carga y el estado de error son completamente responsabilidad de la aplicación.

**Polaris DropZone** refleja su origen en la gestión de fotos de productos de Shopify. `customValidator: (file: File) => boolean` ejecuta validación por archivo antes de la aceptación. `dropOnPage` extiende el target de drop a todo el viewport del navegador — los merchants pueden arrastrar directamente desde el Finder/Explorer a la ventana del browser. DropZones anidadas para manejo de variantes (imagen principal vs. imágenes adicionales).

**Mantine FileInput + Dropzone** separa `FileInput` (`@mantine/core`) de `Dropzone` (`@mantine/dropzone`) — la decisión de API más práctica en T3. Estos son patrones de interacción genuinamente diferentes. Separar los paquetes permite que los equipos que solo necesitan un botón de archivo simple eviten importar dependencias de drag-and-drop.

**Base Web FileUploader** separa explícitamente la lógica de selección de UI de la mecánica de carga. El componente maneja estados de drag, feedback de rechazo de archivos y visualización de progreso — pero el upload HTTP real está completamente fuera de la responsabilidad del componente. Este diseño de "lógica de upload sin estado" es arquitectónicamente correcto: la mecánica de upload (chunked transfer, retry, multipart) pertenece al código de aplicación o a una biblioteca dedicada.

**GOV.UK** usa deliberadamente solo `<input type="file">` nativo con etiqueta clara y texto de pista. El principio es que el research del gobierno del Reino Unido muestra que los usuarios mayores, los usuarios con discapacidades motoras y los usuarios en dispositivos táctiles tienen dificultades significativas con el upload de archivos mediante drag-and-drop. La entrada nativa funciona mejor para la ciudadanía del Reino Unido que cualquier UI de dropzone. Este es uno de los argumentos anti-feature más fuertes en cualquier sistema: drag-and-drop es una mejora, nunca un reemplazo.

**Atlassian Media Picker** soporta múltiples fuentes: sistema de archivos local, archivos recientes, URLs e integraciones cloud (Google Drive, Dropbox). La canvas de drag-and-drop es el "pathway preferido". Vista de cuadrícula y lista para el file browser. Contador de selección múltiple con badge. Es el file sourcing más completo de cualquier sistema, pero demasiado pesado para simples inputs de archivo en formularios.

---

## Tokens

**26 tokens** · prefix `fu-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| fu/sm/h | sizing/120 | Altura drop zone size sm (120px) |
| fu/md/h | sizing/180 | Altura drop zone size md (180px) |
| fu/lg/h | sizing/240 | Altura drop zone size lg (240px) |
| fu/default/border | border/default | Borde punteado en estado default |
| fu/hover/border | border/focus | Borde punteado en estado hover |
| fu/dragover/bg | brand/subtle | Fondo cuando archivo es arrastrado encima |
| fu/dragover/border | interactive/default | Borde sólido en dragover |
| fu/error/bg | status/error/bg | Fondo del drop zone en estado error |
| fu/error/border | status/error/border | Borde del drop zone en estado error |
| fu/disabled/bg | surface/disabled | Fondo en estado disabled |
| fu/item/pending/fg | text/secondary | Texto del item en estado pending |
| fu/item/uploading/bg | brand/subtle | Fondo del item mientras sube |
| fu/item/success/bg | status/success/bg | Fondo del item completado |
| fu/item/error/bg | status/error/bg | Fondo del item con error |
| fu/item/paused/bg | status/warning/bg | Fondo del item pausado |
| fu/item/sm/h | sizing/48 | Altura FileItem size sm |
| fu/item/md/h | sizing/64 | Altura FileItem size md |
| fu/item/sm/px | spacing/3 | Padding horizontal FileItem sm |
| fu/item/md/px | spacing/4 | Padding horizontal FileItem md |
| fu/item/sm/gap | spacing/2.5 | Gap entre elementos FileItem sm |
| fu/item/md/gap | spacing/3 | Gap entre elementos FileItem md |
| fu/zone/border/style | dashed | Estilo de borde del drop zone (dashed → solid en dragover) |
| fu/zone/border/width | 1px (2px dragover) | Grosor del borde del drop zone |
| fu/zone/radius | radius/md | Radio del drop zone |
| fu/focus/ring | border/focus | Ring 2px en drop zone y remove buttons |
| fu/label/color | text/primary | Color del label del drop zone |

### Spacing specs

```
FileUpload (Variant=dropzone):
  sm: height=120px · padding=16px · iconSize=32px · labelFontSize=14px
  md: height=180px · padding=24px · iconSize=48px · labelFontSize=16px
  lg: height=240px · padding=32px · iconSize=64px · labelFontSize=18px

  borde: 1px dashed (default/hover) → 2px solid (dragover)
  border-radius: 8px (radius/md)
  gap interno (ícono → label → hint → botón): 12px

FileItem:
  sm: height=48px · padding-x=12px · gap=10px · fontSize=13px
      iconSize=18px · removeButtonSize=24px
  md: height=64px · padding-x=16px · gap=12px · fontSize=14px
      iconSize=24px · removeButtonSize=32px

  Progress bar height: 4px (sm) / 6px (md)
  border-radius: 4px (radius/sm)
  gap entre name y size: 4px

FileList:
  gap entre items: 8px
  margin-top desde drop zone: 12px
```
