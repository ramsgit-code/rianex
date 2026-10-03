# SEO y GEO: cola de pendientes

Lista viva de lo que falta para posicionar www.rianex.es en Google y en los
asistentes de IA (ChatGPT, Perplexity, Claude, AI Overviews). Se actualiza
cada vez que se cierra o aparece algo: lo terminado baja a **Hecho** con la
fecha y el PR.

Origen: auditoría del 2 de octubre de 2026. Último repaso: 2 de octubre
(ninguna página de rianex.es indexada aún en la búsqueda de marca).

## Para Ramiro (requieren login o una decisión)

- [ ] **Hacia el 16 de octubre**: revisar en Search Console el informe
      Páginas (qué se indexó y qué no) y en Bing el informe AI Performance
      (Citation Share: cuánto nos citan Copilot y las respuestas con IA). Es
      la medida de GEO.
- [ ] **Forks públicos**: el original ya es privado, pero
      `ramirogrowth4u/rianex` (tuyo) y `philippe-G4U/rianex` siguen públicos y
      salen buscando "Rianex". Borrar el tuyo (Settings → Danger Zone → Delete)
      y pedirle a Philippe que borre el suyo.
- [ ] **Foto en alta**: la de LinkedIn solo se puede bajar a 200×200. Si
      quieres una más grande en `/sobre-mi`, pásame el original.
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

- [ ] **Confirmar dos cifras del hero de la home**: "recupera 10
      horas/semana" y "−32% de coste por paciente en 6 semanas". El −32% está
      en el caso de Hospital Capilar, pero "en 6 semanas" y las 10 horas no
      aparecen en ningún sitio más. Si son reales, se quedan; si no, se cambian.
- [ ] **Una página por caso de éxito**, con fecha, contexto, metodología,
      cifras antes y después, y schema `Article`.
- [ ] **Schema**: `BreadcrumbList` en las páginas que aún no lo llevan (ya
      está en las de servicio).
- [ ] **JSON-LD en las páginas que no tienen**: casos de éxito, soluciones,
      listado del blog.
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
- 2026-10-03 · Site Scan de Bing: 0 errores, 0 avisos, 0 notas.
- 2026-10-03 · PR #14 · Cifras de "Qué hacemos" en la home sustituidas
  por datos con respaldo: resultados de los casos publicados (Eventos
  Barcelona, Hospital Capilar) y plazos y método reales. La etiqueta pasa de
  "Resultados" a "En cifras". Academias deja de citar a Growth4U (es una
  agencia; el proyecto de formación no tiene nombre público).
- 2026-10-02 · PR #13 · Una página por sector (`/soluciones/clinicas`,
  `/eventos`, `/academias`, en castellano e inglés) con respuesta directa,
  dónde se pierde el dinero, qué automatizar, qué medir, caso, FAQ y schema.
  Enlaces a las páginas de servicio desde cada pestaña de "Qué hacemos" en la
  home y en el pie de todas las páginas. Sitemap y llms.txt al día.
- 2026-10-02 · PR #12 · Foto y enlace a LinkedIn en `/sobre-mi`; `sameAs`
  (LinkedIn) e `image` en el schema `Person` de `/sobre-mi` y de la home.
- 2026-10-02 · PR #11 · Una página por servicio (`/servicios/<slug>`, 8 en
  castellano y 8 en inglés) con respuesta directa, cuándo encaja y cuándo no,
  método, plazo, inversión, caso real, FAQ, guías relacionadas y schema
  `Service`, `FAQPage` y `BreadcrumbList`. La web se presenta como Ramiro
  Pérez Rodero: `/sobre-mi` en primera persona, schema `ProfilePage` y
  `Person`, autor de los artículos y `founder` con el nombre completo.
  `Organization` con dirección (Ávila), logo y `areaServed` España y
  Latinoamérica.
- 2026-10-02 · URL Submission en Bing (home, servicios, casos y 3 artículos).
- 2026-10-02 · Alta en Google Search Console (propiedad de dominio, sitemap
  enviado) y en Bing Webmaster Tools. IndexNow ya estaba activo con la clave
  `2e18428a…` publicada en la raíz; no hace falta la que sugiere Bing.
- 2026-10-02 · `ramsgit-code/rianex` pasado a privado.
- 2026-10-02 · IndexNow tras el despliegue del PR #10 (22 URLs).
- 2026-10-02 · PR #10 · `lang="en"` en el HTML de las páginas inglesas;
  title con palabras clave y tarjeta social propia en cada página y en su
  idioma; H1 fijo en la home; "GoHighLevel" bien escrito en toda la web.
