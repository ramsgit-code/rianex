# Design: Planta Lean

Sistema visual de rianex.es desde noviembre de 2026. La web es un tablero de planta Lean: cada proceso de una empresa es una tarjeta kanban que pasa de Manual a Automatizado.

## Principios

- **Plano.** Sin degradados, sin sombras, sin cristal ni blur decorativo. Esquinas rectas.
- **La cinta estructura.** La cinta amarilla de suelo (`.tape`, 6px) separa secciones y marca la navegación; las secciones no se encierran en tarjetas.
- **El estado es una marca.** Rojo/amarillo/verde siempre acompañado de texto, banda o tachado; nunca color solo.
- **Sin eyebrow.** Nada de rótulos pequeños encima de un titular: el titular habla solo.
- **Una sola animación de autor:** el tablero del hero. El resto del contenido es visible por defecto.

## Color (`tailwind.config.ts`)

| Token | Valor | Uso |
|---|---|---|
| `background` | `#ECEDEA` | Suelo de hormigón claro, fondo de página |
| `surface` / `surface-2` | `#E3E4E0` / `#D8DAD4` | Superficies secundarias |
| `ink` / `foreground` | `#16181B` | Texto, botón principal, bandas oscuras (casos, footer) |
| `foreground-muted` | `#3E4147` | Texto secundario |
| `muted` | `#5F6267` | Metadatos (≥4.5:1 sobre el fondo) |
| `border` | `#C9CBC4` | Líneas finas |
| `accent` | `#FFC20E` | Cinta: fondos, bandas, CTA de la nav, cierre. Nunca texto sobre claro |
| `accent-text` | `#7A5600` | Texto/iconos en tono ámbar sobre claro |
| `go` / `go-text` | `#1E9E5A` / `#16733F` | Andon verde: automatizado |
| `stop` | `#D7392B` | Andon rojo: manual |

Estrategia: comprometida. El amarillo ocupa regiones enteras (paso 1 de la oferta, cierre, CTA del footer) y el grafito otras (banda de prueba, casos, footer).

## Tipografía

Una familia, **Archivo** (Google Fonts, eje `wdth`), cargada en `RootDocument.tsx` como `--font-archivo`.

- Titulares: `.font-display` = Archivo al 72% de anchura, extrabold, MAYÚSCULAS, interlineado 0.86–0.95.
- Texto: Archivo al 100%, 16–20px, medida máxima 65ch (`.measure`).
- Rótulos de datos: condensada, 11–13px, mayúsculas, tracking 0.06–0.08em.
- `JetBrains Mono` solo para datos/código (`.data-tag`).

## Componentes (`globals.css`)

- `.btn-primary` grafito → amarillo al hover. `.btn-tape` amarillo → grafito. `.btn-secondary` borde 2px grafito → relleno.
- `.card`: blanco, borde 1px `border`, recto; hover borde grafito.
- `.tag`: chip grafito con texto claro en mayúsculas (solo para chips y etiquetas de lista, nunca encima de un H1).
- `.section-title`: titular de sección condensado.
- Focus: contorno grafito 3px con offset; selección amarilla; scrollbar grafito.

## Home (`src/app/(es)/page.tsx`)

Hero (titular + `ProcessBoard`) → banda de prueba grafito → Qué hacemos (tres pasos, el primero en amarillo) → Servicios (tarjetas por grupo; "Otros servicios" en grafito; complementarios en lista) → Para quién trabajamos (perfiles, encaja si…, sectores, empresas reales y bloque amarillo de consultoría) → herramientas → Casos (grafito) → Testimonios → Guías → FAQ → Cierre amarillo. Copia en `src/lib/home.ts`; los servicios salen de `content.ts`.

## Páginas interiores

- Cabecera común en `PageShell`: H1 condensado grande, entradilla a 65ch, sin rótulo encima.
- Listados (`/servicios`, `/casos-de-exito`, `/soluciones`): filas separadas por línea grafito de 2px, título de grupo sobre cinta amarilla, resultado de cada caso en bloque grafito con la cifra en amarillo.
- Fichas: "En resumen" en bloque amarillo; vídeo (si lo hay, `src/lib/servicio-media.ts`) junto a "Qué consigues"; "Así funciona" en cuatro tarjetas con banda andon (rojo lo que llega, ámbar lo que hace el sistema, verde lo hecho) y la etiqueta "Ejemplo ilustrativo"; casos reales en bloque grafito; rótulos de dato con `<Label>` (`src/components/ui/Label.tsx`); viñetas de "incluye" en verde andon.
- La llamada a la consultoría la pone el pie (bloque amarillo) en todas las páginas salvo la home y `/diagnostico`; las fichas no la repiten.
- `Reveal` anima a estado final en 0 s con `prefers-reduced-motion`: el contenido nunca se queda oculto.
