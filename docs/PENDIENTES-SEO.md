# SEO y GEO: cola de pendientes

Lista viva de lo que falta para posicionar www.rianex.es en Google y en los
asistentes de IA (ChatGPT, Perplexity, Claude, AI Overviews). Se actualiza
cada vez que se cierra o aparece algo: lo terminado baja a **Hecho** con la
fecha y el PR.

Origen: auditoría del 2 de octubre de 2026. Último repaso: 26 de octubre (799 impresiones, 3 clics, posición 70,3; GA4 35 sesiones y `generate_lead` ya disponible para marcar). Repaso anterior: 21 de octubre
(Search Console, 28 días: 58 páginas indexadas, solo 2 sin indexar y son
redirecciones; 488 impresiones, 2 clics, posición media 71,4. El 54% de las
impresiones va a "por dónde empezar". GA4: 26 sesiones, ningún
`generate_lead` todavía, un `form_start`).

## Para Ramiro (requieren login o una decisión)

- [ ] **Marcar `generate_lead` como evento clave en GA4**: en cuanto llegue
      el primer diagnóstico, Administrar → Eventos → Eventos recientes →
      estrella en `generate_lead` (y en `diagnostico_agendar` si quieres
      medir también las reservas). GA4 no deja marcarlo antes de recibirlo.

- [ ] **Bing, revisar hacia el 9 de noviembre**: a 26 de octubre Bing solo
      tenía 4 URLs indexadas de las 47 que conoce por el sitemap, 0
      impresiones y 0 citas en AI Performance (Copilot) en 30 días, y 0
      backlinks. No hay bloqueo técnico (robots, `noindex` y respuesta a
      Bingbot correctos). Ese día se enviaron las 49 URLs del sitemap por URL
      Submission (cupo de 100 al día). Mirar en Site Explorer cuántas ha
      indexado y, si siguen sin entrar, volver a enviarlas. Bing pesa mucho
      los enlaces externos: ver la tarea de enlaces.
- [ ] **Forks públicos**: el original ya es privado, pero
      `ramirogrowth4u/rianex` (tuyo) y `philippe-G4U/rianex` siguen públicos y
      salen buscando "Rianex". Borrar el tuyo (Settings → Danger Zone → Delete)
      y pedirle a Philippe que borre el suyo.
- [ ] **Foto en alta**: la de LinkedIn solo se puede bajar a 200×200. Si
      quieres una más grande en `/sobre-mi`, pásame el original.
- [ ] **Perfiles fuera de la web**: Google
      Business Profile (Ávila), directorio de partners de HighLevel, Clutch o
      Sortlist. Mismo nombre, descripción y URL en todos.
- [ ] **Enlaces externos (lo que más movería el pilar)**: GSC no ve
      ninguno. Pedir a Eventos Barcelona y Tribeca Media un enlace "sistema
      implementado por Rianex", idealmente uno de ellos al artículo
      `/blog/automatizar-procesos-con-ia-por-donde-empezar`, y enlazar ese
      artículo desde tu LinkedIn (post o sección Destacados).
- [ ] **Después de cada despliegue con URLs nuevas**: `npm run indexnow`.

- [ ] **Precio del agente de WhatsApp**: la FAQ de
      /servicios/agente-ia-whatsapp usa el rango general de implementación
      (5.000-25.000 €) y explica los costes de uso de Meta y del modelo. Si
      tienes un precio de partida propio para este servicio, pásamelo.
- [ ] **Testimonio de Tribeca**: la página del caso no lleva cita. Si Antonio
      da una frase, se añade en `src/lib/casos.ts`.
- [ ] **Página de LinkedIn de Rianex**: pegar el eslogan y la descripción
      nuevos (en `linkedin/textos-linkedin-es.md` de tu carpeta local).

## Código

Por orden de impacto:

- [ ] **Revisar en diciembre** las impresiones de "proyectos de IA a medida"
      tras reorientarlo a automatización (title igual, descripción nueva).
- [ ] **Más go-to-market**: faltan artículos de infraestructura de email
      (dominios, calentamiento, SPF/DKIM/DMARC con Instantly) y de LinkedIn
      con Valley. Treg es muy nuevo: revisar en enero si sus datos del
      artículo de enriquecimiento siguen vigentes.
- [ ] **Actualizar el artículo de n8n 3.0 cuando salga la estable**
      (principios de diciembre): fecha exacta, cambios de última hora en
      la lista oficial y campo `updated`. Es contenido con fecha: si se
      queda viejo, pierde la consulta.

- [ ] **Cifras sin fuente en artículos antiguos**: la descripción de "Cómo
      cualificar leads automáticamente" dice "El 80% de los leads que recibes
      no van a comprar", y el de propuestas dice "en 8 minutos: cómo lo hago"
      con ese tono de primera persona de antes. Revisar los tres artículos de
      abril (cualificar leads, propuestas, WhatsApp) con el mismo criterio que
      la home.
- [ ] **Revisar a mediados de noviembre** el pilar "por dónde empezar"
      (title "qué es y por dónde empezar" desde el 26 de octubre): posición
      para "automatización de procesos con ia" (78 a 26 de octubre) y
      "automatizar procesos con ia" (66), y si aparecen clics. El techo lo
      pone la autoridad del dominio: el top 10 es Microsoft, Oracle, AWS,
      IBM e Informatica, y rianex.es tiene 0 enlaces externos.
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

- 2026-10-28 · Blog de go-to-market: "Prospección B2B con IA: cómo montar
  outbound en España" (`prospección b2b outbound`, `prospección b2b con ia`)
  y "Clay, Treg o ColdIQ: cómo enriquecer datos para prospección B2B"
  (`clay.com qué es`, `clay pricing`). Cluster nuevo "Go-to-market y
  outbound B2B" con GTM Engineering; fuera el cluster de desarrollo a
  medida. Los dos artículos de desarrollo reorientados a automatización
  (mismas URLs): Rianex no hace apps y lo dice. Enlazados desde
  /servicios/outbound-b2b y desde GTM Engineering.

- 2026-10-27 · Enfoque en dos frentes: automatización de procesos (Claude,
  n8n, Make, Zapier, crons) y go-to-market (GoHighLevel, HubSpot, Clay,
  Instantly, Valley). Fuera el servicio de desarrollo a medida (308 de
  `/servicios/desarrollo-ia-a-medida` a automatización) y servicio nuevo
  `/servicios/outbound-b2b`. Home, /servicios, títulos, JSON-LD, llms.txt,
  sobre mí, FAQ de herramientas y carrusel de integraciones alineados. Los
  artículos de desarrollo a medida del blog siguen publicados (ver Código).

- 2026-10-26 · Meta description de la home recortada a 140 caracteres (la
  del PR #24 tenía 188 y Bing la marcaba como error "Meta Description too
  long"); la inglesa a 130.

- 2026-10-26 · Dos artículos nuevos: "n8n 3.0: qué se rompe y cómo
  prepararte" (`/blog/n8n-3-que-se-rompe-y-como-prepararte`, checklist con
  los cambios oficiales y CTA al diagnóstico de la instancia) y la página
  pilar "Qué es GTM Engineering" (`/blog/que-es-gtm-engineering`, con el
  caso Tribeca Media y Eventos Barcelona). n8n enlazado desde
  /servicios/automatizacion-procesos-ia y desde "qué herramientas usar";
  GTM desde /servicios/embudo-de-captacion, el caso Tribeca y la sección
  "Guías" de la home (ahora 2×2).

- 2026-10-26 · Caso Tribeca Media (/casos-de-exito/tribeca-media): agentes
  de performance y contenido de KEYWORKERS, con vídeo y `VideoObject`.
  Vídeo también en el caso de Eventos Barcelona. Casos ordenados con los
  propios primero. Servicio de agentes reconvertido en "Agente de IA para
  WhatsApp" (`/servicios/agente-ia-whatsapp`, 308 desde `agentes-ia-vps`)
  con FAQ de precio, API oficial y agenda. Artículo nuevo "Cómo implementar
  IA en tu empresa" (`implementar ia en mi empresa`). /servicios agrupado en
  tres frentes. "Auditoría" pasa a "diagnóstico" en toda la web. El
  testimonio de Hospital Capilar deja de publicarse (filtro en
  `src/lib/testimonios.ts`; sigue aprobado en la base de datos).

- 2026-10-26 · Pilar "por dónde empezar" ampliado para la intención de
  "automatización de procesos con ia" (441 impresiones en 28 días, 0
  clics, posición 70-78): title "qué es y por dónde empezar", sección
  "Qué procesos se pueden automatizar con IA" y precio junto a los plazos.
  FAQ con las cuatro preguntas que Google muestra en "Más preguntas"
  (qué procesos, cómo, cuál es la mejor IA, cuánto cuesta). Indexación
  pedida en GSC.

- 2026-10-26 · Posicionamiento: la home deja de vender "ahorra 10 horas" y
  GoHighLevel como mensaje principal y pasa a "automatización con IA y
  software a medida para vender más" (mismo eje que el LinkedIn: AI
  automation + software + go-to-market). Title y description de la home,
  JSON-LD y llms.txt alineados. La prueba junto al CTA es ahora Eventos
  Barcelona (8 min) y el logo de Hospital Capilar sale de "Clientes con
  sistema activo"; donde se cita, va como "con Growth4U". Revisar en
  noviembre el CTR de la home en Search Console con el title nuevo.

- 2026-10-21 · PR #21 · Tres artículos nuevos para consultas que ya
  asomaban en Search Console: "Proyectos de IA a medida: ejemplos, plazos y
  precio" (`desarrollo software ia a medida`, `proyectos de ia a medida`),
  "Cross-selling por WhatsApp" (`cross selling whatsapp`) e "IA para
  automatizar procesos: qué herramientas usar" (`ia para automatizar
  procesos`). "Por dónde empezar" reforzado para "automatización de procesos
  con IA": title con la consulta, respuesta corta, FAQ y enlaces a los
  nuevos. Código: campo `updated` en el frontmatter (va a `dateModified` y
  al lastmod del sitemap) y `FAQPage` automático desde la sección
  "Preguntas frecuentes" de cada artículo. Enlazados desde las páginas de
  servicio y desde los artículos vecinos.

- 2026-10-12 · GA4 vinculado con Search Console (lo hizo Ramiro). Los
  informes de búsqueda orgánica de GA4 tardan uno o dos días en llenarse.

- 2026-10-12 · PR #18 · Artículo "Automatización de procesos con IA: 12
  ejemplos para una pyme" (`/blog/ejemplos-automatizacion-procesos-con-ia`),
  la intención vecina del de "por dónde empezar" (92 impresiones), enlazados
  entre sí y desde `/servicios/automatizacion-procesos-ia`. GA4: el
  formulario de diagnóstico manda `generate_lead` y el botón del calendario
  `diagnostico_agendar`. Indexación pedida en Search Console para las 3
  páginas descubiertas sin indexar y para el artículo nuevo. IndexNow
  enviado (3 URLs).

- 2026-10-02 · PR #9 · El blog se sirve desde los `.mdx`: 12 artículos
  publicados (antes 4 en 404), sitemap, RSS y llms.txt correctos, imagen
  social por artículo, 301 de los slugs antiguos. IndexNow enviado (22 URLs).
- 2026-10-05 · PR #17 · Calculadora de fuga de leads
  (`/herramientas/calculadora-fuga-de-leads`, castellano e inglés): cálculo
  en el navegador, fórmula y supuestos a la vista, FAQ y schema
  `WebApplication`. Eventos de GA4 `calculadora_fuga_uso` y
  `calculadora_fuga_resultado`. Enlazada desde el pie, el artículo de
  "cuánto cuesta automatizar", el sitemap y llms.txt.
- 2026-10-03 · PR #16 · Una página por caso de éxito
  (`/casos-de-exito/hospital-capilar`, `/eventos-barcelona`, `/growth4u`, en
  castellano e inglés) con contexto, qué se montó, resultado, cita del
  cliente, servicios y schema `Article`; enlazadas desde el listado y desde
  las páginas de servicio y sector. Hero: "−32% en 8 semanas" (confirmado).
  Testimonios en la base: "GoHighLevel" en el de Xavi, Philippe como Growth
  Manager de Growth4U y traducciones al inglés corregidas.
- 2026-10-03 · Site Scan de Bing: 0 errores, 0 avisos, 0 notas.
- 2026-10-23 · PR #23 · Cuatro artículos nuevos enlazados entre sí y con
  el pilar "por dónde empezar": medir un proceso antes de automatizarlo,
  propuestas para licitaciones con IA, automatizar la recepción de una
  clínica y qué es GoHighLevel (elegidos por consultas reales de GSC sin
  página propia). El pilar suma una tabla para puntuar procesos y el caso
  real de Eventos Barcelona, y se enlaza desde una sección "Guías" nueva en
  la home. El renderizador del blog ahora pinta tablas y listas numeradas
  (antes salían como texto). Enlaces desde los artículos que no enlazaban a
  nada (cualificar leads, propuestas comerciales) y desde el de clínicas.
- 2026-10-21 · PR #22 · Botón "Sigue a Rianex en LinkedIn" en el pie de
  todas las páginas (castellano e inglés), enlazado a
  linkedin.com/company/rianex, y la página en el `sameAs` del schema
  `ProfessionalService` de la home.
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
