# SEO y GEO: cola de pendientes

Lista viva de lo que falta para posicionar www.rianex.es en Google y en los
asistentes de IA (ChatGPT, Perplexity, Claude, AI Overviews). Se actualiza
cada vez que se cierra o aparece algo: lo terminado baja a **Hecho** con la
fecha y el PR.

Origen: auditoría del 2 de octubre de 2026. Último repaso: 2 de octubre
(ninguna página de rianex.es indexada aún en la búsqueda de marca).

## Para Ramiro (requieren login o una decisión)

- [ ] **Search Console**: volver a enviar `https://www.rianex.es/sitemap.xml` y
      pedir indexación de 2 o 3 artículos clave (migrar de HubSpot a
      GoHighLevel, cuánto cuesta automatizar con IA).
- [ ] **Bing Webmaster Tools**: alta con "Importar desde Google Search
      Console". ChatGPT busca sobre el índice de Bing.
- [ ] **Repos privados**: buscando "Rianex" salen 3 repos de GitHub y sus PRs,
      y la web no aparece. Son `ramsgit-code/rianex` y dos forks públicos:
      `ramirogrowth4u/rianex` (tuyo) y `philippe-G4U/rianex`. Pasar a privado
      el original no oculta los forks: hay que borrar o hacer privado el de
      `ramirogrowth4u` y pedírselo a Philippe con el suyo. GitHub → Settings →
      Danger Zone.
- [ ] **Decidir la entidad**: ¿la web habla de "Ramiro Pérez" (persona) o de
      "un grupo de ingenieros" (equipo)? Hoy llms.txt y el schema dicen lo
      primero y `/sobre-mi` lo segundo. Bloquea el schema `Person` y
      `Organization` y la página `/sobre-mi`.
- [ ] **Testimonios**: en el panel, corregir "Go High Level" → "GoHighLevel"
      en el de Xavi (viene de la base, no del código), y si se puede, nombre
      completo y foto en los tres.
- [ ] **Perfiles fuera de la web**: página de empresa en LinkedIn, Google
      Business Profile (Ávila), directorio de partners de HighLevel, Clutch o
      Sortlist. Mismo nombre, descripción y URL en todos.
- [ ] **Enlaces de clientes**: pedir a Hospital Capilar, EB y Growth4U un
      enlace "sistema implementado por Rianex" a la web.
- [ ] **Después de cada despliegue con URLs nuevas**: `npm run indexnow`.

## Código

Por orden de impacto:

- [ ] **Una página por servicio** (`/servicios/<slug>`): hoy los 8 servicios
      son anclas de una sola página, y un ancla no posiciona. Cada una con
      respuesta directa al principio, precio y plazos, FAQ propia y un caso.
      Empezar por migración HubSpot → GoHighLevel y agentes de IA en servidor
      propio, que en español no tienen competencia seria.
- [ ] **Una página por sector** (`/soluciones/clinicas`, `/eventos`,
      `/academias`): `/soluciones` tiene 141 palabras para tres sectores.
- [ ] **Una página por caso de éxito**, con fecha, contexto, metodología,
      cifras antes y después, y schema `Article`.
- [ ] **Schema**: `BreadcrumbList` en todas las páginas; `Organization` con
      `address`, `logo` y `sameAs`; `Person` completo (`jobTitle`, `sameAs`,
      foto), cuando esté decidida la entidad; `areaServed` España y
      Latinoamérica.
- [ ] **JSON-LD en las páginas que no tienen**: casos de éxito, soluciones,
      sobre-mi, listado del blog.
- [ ] **`/en` sirve el JSON-LD de la home en castellano** (FAQ incluida):
      traducirlo.
- [ ] **Imagen social por página**: las páginas que no son del blog comparten
      `og.png`.
- [ ] **Editor de blog del panel**: ya no publica en la web (el blog se lee de
      los `.mdx`). Decidir si se retira o se reconvierte.
- [ ] **Traducir los artículos al inglés** (opcional): hoy `/en/blog/<slug>`
      redirige al castellano.
- [ ] **Textos legales con `noindex`** (prioridad baja).

## Hecho

- 2026-10-02 · PR #9 · El blog se sirve desde los `.mdx`: 12 artículos
  publicados (antes 4 en 404), sitemap, RSS y llms.txt correctos, imagen
  social por artículo, 301 de los slugs antiguos. IndexNow enviado (22 URLs).
- 2026-10-02 · PR #10 · `lang="en"` en el HTML de las páginas inglesas;
  title con palabras clave y tarjeta social propia en cada página y en su
  idioma; H1 fijo en la home; "GoHighLevel" bien escrito en toda la web.
