# FileUpload — Especificación Completa

## Descripción general

Componente de carga de archivos con soporte de drag & drop y selección por click. Incluye zona de drop visual, lista de archivos seleccionados con estado de progreso individual y mensajes de error por archivo. Compuesto por `FileItem` (item de archivo con estado de carga) y `FileUpload` (zona de drop con variantes de presentación).

### Wireframe estructural

**FileItem:**
```
┌──────────────────────────────────────────────────────────────────┐
│  [📄]  document.pdf                          2.3 MB       [✕]   │
│        [████████░░░░░░░░░░░░░░░░░░░░░░░░░░] 40%                 │  ← uploading
└──────────────────────────────────────────────────────────────────┘
```

**FileUpload (Variant=dropzone, State=default):**
```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│              ⬆                                                    │
│     Arrastra archivos aquí o haz click                           │
│         JPG, PNG hasta 10MB                                       │
│                                                                   │
│                   [Seleccionar archivo]                           │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
  ↑ dashed border
│  document.pdf           2.3 MB    [✓]                            │  ← file list
│  imagen.png             1.1 MB    [uploading 60%]                │
```

**Anatomía de slots — FileItem:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `icon` | icon | No | Icono del tipo de archivo |
| `name` | text | Sí | Nombre del archivo |
| `size` | text | No | Tamaño: "2.3 MB" |
| `progressBar` | container | No | Barra de progreso (uploading) |
| `statusIcon` | icon | No | Check/alert según estado |
| `removeButton` | icon-action | No | Eliminar de la lista |

**Anatomía de slots — FileUpload:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `dropZone` | container | Sí | Área dashed border para drag & drop |
| `dropZoneIcon` | icon | No | Icono upload grande |
| `dropZoneLabel` | text | Sí | Instrucción principal |
| `dropZoneHint` | text | No | Tipos aceptados / tamaño límite |
| `browseButton` | container | No | Botón "Seleccionar archivo" |
| `fileList` | container | No | N FileItems |
| `errorMessage` | text | No | Error de validación global |

### Properties y valores

**FileItem:**
| Property | Valores |
|----------|---------|
| **State** | `pending` · `uploading` · `success` · `error` · `paused` |
| **Size** | `sm` · `md` |

**FileUpload:**
| Property | Valores |
|----------|---------|
| **State** | `default` · `hover` · `dragover` · `error` · `disabled` |
| **Size** | `sm` · `md` · `lg` |
| **Variant** | `dropzone` · `button-only` · `compact` |

**Frame counts:**
- FileItem: State(5) × Size(2) = **10 frames**
- FileUpload: State(5) × Size(3) × Variant(3) = 45 − 9 exclusiones = **36 frames**
- **Total: 46 frames**

**Exclusiones FileUpload:**
| Combinación excluida | Razón |
|----------------------|-------|
| `Variant=button-only + State=dragover` | Un botón no acepta drag & drop |
| `Variant=compact + dropZoneIcon large` | Compact no tiene espacio para icon grande |

### Panel de Figma

**FileItem:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| State | Variant | pending / uploading / success / error / paused |
| Size | Variant | sm / md |
| 👁 Has Icon | Boolean | true/false |
| 👁 Has Size | Boolean | true/false |
| 👁 Show Progress | Boolean | true/false |
| 👁 Show Remove | Boolean | true/false |
| ✏️ Name | Text | `document.pdf` |
| ✏️ Size | Text | `2.3 MB` |
| 🔄 File Icon | Instance swap | `icon/file-pdf` |
| 🔄 Status Icon | Instance swap | `icon/check` |

**FileUpload:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| State | Variant | default / hover / dragover / error / disabled |
| Size | Variant | sm / md / lg |
| Variant | Variant | dropzone / button-only / compact |

---

## Cuándo usar

**Usar FileUpload cuando:**
- El usuario necesita cargar uno o varios archivos (documentos, imágenes, CSV)
- Se requiere feedback de progreso por archivo (uploads grandes)
- El flujo permite pausar y reanudar uploads

**Variant=dropzone:** Upload primario en la página, imágenes de perfil grandes, archivos de importación
**Variant=button-only:** Upload compacto en formularios (adjuntar archivo, avatar pequeño)
**Variant=compact:** Upload inline en un formulario con lista de archivos seleccionados

**No usar FileUpload cuando:**
- Solo se permite seleccionar un archivo y no hay feedback de upload → `<input type="file">` simple con styling
- El archivo se procesa instantáneamente sin progreso → Button + input hidden

---

## Variaciones visuales

### FileItem — Estados y colores

| Estado | Background | Texto | Icono status |
|--------|-----------|-------|--------------|
| `pending` | Transparente | `text/secondary` | ⏳ hourglass |
| `uploading` | `brand/subtle` | `interactive/default` | Progress bar visible |
| `success` | `status/success/bg` | `status/success/fg` | ✓ check-circle (verde) |
| `error` | `status/error/bg` | `status/error/fg` | ⚠ alert-circle (rojo) |
| `paused` | `status/warning/bg` | `status/warning/fg` | ⏸ pause (amber) |

### FileItem — Tamaños

| Size | Alto | Padding X | Gap | Font | Icon | Button |
|------|------|-----------|-----|------|------|--------|
| `sm` | 48px | 12px | 10px | 13px | 18px | 24px |
| `md` | 64px | 16px | 12px | 14px | 24px | 32px |

### FileUpload — Estados del drop zone

| Estado | Background | Border | Estilo border |
|--------|-----------|--------|---------------|
| `default` | Transparente | `border/default` | Dashed |
| `hover` | `surface/hover` | `border/focus` (brand) | Dashed |
| `dragover` | `brand/subtle` | `interactive/default` 2px | **Solid** |
| `error` | `status/error/bg` | `status/error/border` | Dashed |
| `disabled` | `surface/disabled` | `border/default` | Dashed, opacity 60% |

### FileUpload — Tamaños del drop zone

| Size | Alto drop zone | Padding | Icon | Font label |
|------|----------------|---------|------|------------|
| `sm` | 120px | 16px | 32px | 14px |
| `md` | 180px | 24px | 48px | 16px |
| `lg` | 240px | 32px | 64px | 18px |

### Variantes

**dropzone:** Área rectangular con border dashed prominente, icon grande, label e instrucciones. Zona principal de drop.

**button-only:** Solo un botón "Seleccionar archivo" sin área de drop visual. Para contexts donde drag & drop no es conveniente (mobile, forms compactos).

**compact:** Drop zone pequeño con label inline + file list directamente debajo.

---

## Decisiones de diseño

### 1. WCAG 2.1.1: drag & drop SIEMPRE tiene fallback keyboard

El drag & drop es conveniente con mouse pero **no accesible sin él**. La drop zone debe tener `role="button"` + `tabindex="0"` para que el keyboard user pueda activarla con Enter/Space y abrir el file picker nativo. Este requisito es no negociable.

### 2. 5 estados de FileItem incluyendo paused

Uploads de archivos grandes (video, CSV pesado) requieren pause/resume. El estado `paused` en amber es estándar en Dropbox, Google Drive y enterprise file upload. Omitirlo fuerza implementaciones a crear estados custom.

### 3. Progress bar como slot integrado en FileItem

El feedback visual durante upload es crítico para UX. La barra de progreso integrada en el item evita tener un componente separado que deba sincronizarse con el item individual.

### 4. Error diferenciado por archivo vs. error global

Los errores de validación pueden ser por archivo (tipo incorrecto, size excedido) o globales (sin conexión, cuota excedida). El `errorMessage` del FileItem es por archivo; el `errorMessage` de FileUpload es global. Ambos usan semántica `aria-live="assertive"` para anunciarse inmediatamente.

---

## Comportamiento e interacción

### Roles ARIA

| Elemento | Rol / Atributo |
|----------|----------------|
| Drop zone | `role="button"` + `tabindex="0"` + `aria-label="Subir archivo. Arrastra o haz click para seleccionar"` |
| Input file oculto | `<input type="file">` + `aria-describedby` → hint text |
| Drop zone en dragover | `aria-live="polite"` anuncia `"Suelta para subir"` |
| File list | `role="list"` |
| FileItem | `role="listitem"` |
| Progress upload | `aria-live="polite"` anuncia `"Subiendo document.pdf, 40%"` |
| Success | `aria-live="polite"` anuncia `"document.pdf subido correctamente"` |
| Error | `aria-live="assertive"` con descripción específica |
| Remove button | `aria-label="Eliminar document.pdf"` |

### Navegación de teclado

| Tecla | Comportamiento |
|-------|----------------|
| `Tab` | Navega al drop zone / browse button |
| `Enter` / `Space` | Abre el file picker nativo del browser |
| `Tab` a FileItem | Navega al remove button del item |
| `Enter` / `Space` en remove | Elimina el archivo de la lista |
| `Escape` | Cancela upload en progreso (si soportado) |

### Focus

- Ring 2px en drop zone cuando tiene focus
- Ring 2px en remove buttons de cada FileItem
- Drop zone mantiene tabindex=0 incluso con `disabled` visual para garantizar accesibilidad

### Feedback de estado

Al añadir archivos: FileItems aparecen en `pending` → transicionan a `uploading` cuando comienza la carga. La lista de archivos se anuncia via `aria-live` cuando se añaden o completan items.

---

## Guía de contenido

**dropZoneLabel:**
- "Arrastra archivos aquí o haz click para seleccionar"
- "Solta tu imagen aquí" (más conversacional para consumer apps)
- Siempre incluir la alternativa click para keyboard users

**dropZoneHint:**
- Especificar tipos aceptados y límite de tamaño: "JPG, PNG, PDF hasta 10MB"
- Si hay límite de cantidad: "Máximo 5 archivos"
- Este texto se vincula al input via `aria-describedby`

**Error messages:**
- Tipo incorrecto: "El archivo debe ser JPG o PNG"
- Tamaño excedido: "El archivo supera el límite de 10MB"
- Upload fallido: "No se pudo subir document.pdf. Intenta de nuevo."
- Error global: "Sin conexión. Verifica tu red e intenta de nuevo."

**Estados del FileItem:**
- `uploading`: Mostrar porcentaje: "40%" o "1.2MB de 3.0MB"
- `success`: "Subido correctamente" (opcionalmente, solo el ✓ basta)
- `error`: Mostrar razón específica bajo el nombre

---

## Pre-build checklist

- [ ] Drop zone dashed border visible y reconocible como drop target
- [ ] Estado `dragover` usa border solid (no dashed) para distinguirse claramente del hover
- [ ] FileItem en `uploading`: progress bar visible con % o valor absoluto
- [ ] FileItem en `success/error/paused`: icono de estado + color semántico en background
- [ ] Remove button tiene `aria-label` con nombre del archivo (no "Eliminar" genérico)
- [ ] Variant=button-only: no incluir frames con `State=dragover`
- [ ] Verificar que los 5 estados de FileItem tienen color diferenciable sin depender solo del tono
- [ ] Drop zone en size `lg` se ve proporcionado con icon 64px

---

## Componentes relacionados

| Componente | Relación |
|------------|----------|
| **Button** | Browse button + remove button usan Button/secondary y Button/icon-only |
| **ProgressBar** | La barra de progreso de FileItem puede usar ProgressBar internally |
| **FormField** | FileUpload se usa frecuentemente dentro de FormField como input |
| **Alert / Banner** | El error global puede usar Alert/error |

---

## Referencia: ¿cómo lo hacen otros sistemas?

| Sistema | Drag & drop | Paused state | Progress per file | Variants |
|---------|------------|--------------|------------------|---------|
| **Ant Design** | Sí | No | Sí | Dragger + Avatar |
| **Atlassian** | Sí | No | Sí | 1 variante |
| **Carbon (IBM)** | Sí | No | Sí | File uploader + Drag |
| **Polaris (Shopify)** | Sí | No | Sí | 1 variante |
| **MUI** | Sí (headless) | No nativo | Sí | No nativo |
| **Spectrum (Adobe)** | Sí | No | Sí | 2 variantes |

**Consenso:** Drag & drop + progress per file son core. Paused state raro pero útil para enterprise. Variantes de presentación difieren entre sistemas.

---

## Tokens y espaciado

**Prefijo:** `fu-` · **Total tokens:** 26 · **Modo:** Components

### Tokens del drop zone

| Token | Valor DS | Uso |
|-------|----------|-----|
| `fu/sm/h` | `sizing/120` | Alto drop zone sm |
| `fu/md/h` | `sizing/180` | Alto drop zone md |
| `fu/lg/h` | `sizing/240` | Alto drop zone lg |
| `fu/default/border` | `border/default` | Border reposo |
| `fu/hover/border` | `border/focus` | Border hover |
| `fu/dragover/bg` | `brand/subtle` | Fondo dragover |
| `fu/dragover/border` | `interactive/default` | Border dragover |
| `fu/error/bg` | `status/error/bg` | Fondo error |
| `fu/error/border` | `status/error/border` | Border error |
| `fu/disabled/bg` | `surface/disabled` | Fondo disabled |

### Tokens de FileItem

| Token | Valor DS | Uso |
|-------|----------|-----|
| `fu/item/pending/fg` | `text/secondary` | Texto pending |
| `fu/item/uploading/bg` | `brand/subtle` | Fondo uploading |
| `fu/item/success/bg` | `status/success/bg` | Fondo success |
| `fu/item/error/bg` | `status/error/bg` | Fondo error |
| `fu/item/paused/bg` | `status/warning/bg` | Fondo paused |

### Espaciado por tamaño — FileItem

| Propiedad | sm | md |
|-----------|----|----|
| Alto | 48px | 64px |
| Padding X | 12px | 16px |
| Gap | 10px | 12px |
| Font | 13px | 14px |
| Icon archivo | 18px | 24px |
| Remove button | 24px | 32px |

### Espaciado por tamaño — Drop zone

| Propiedad | sm | md | lg |
|-----------|----|----|-----|
| Alto | 120px | 180px | 240px |
| Padding | 16px | 24px | 32px |
| Icon upload | 32px | 48px | 64px |
| Font label | 14px | 16px | 18px |
