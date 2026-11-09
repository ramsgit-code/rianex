# SEO y GEO: cola de pendientes

Lista viva de lo que falta para posicionar www.rianex.es en Google y en los
asistentes de IA (ChatGPT, Perplexity, Claude, AI Overviews). Se actualiza
cada vez que se cierra o aparece algo: lo terminado baja a **Hecho** con la
fecha y el PR.

Origen: auditoría del 2 de octubre de 2026. Último repaso: 7 de noviembre (1.480 impresiones, 6 clics, posición 67,7; GA4 51 sesiones, 0 leads; Bing 10 URLs indexadas y 0 impresiones). Repaso del 26 de octubre: 799 impresiones, 3 clics, posición 70,3. Repaso anterior: 21 de octubre
(Search Console, 28 días: 58 páginas indexadas, solo 2 sin indexar y son
redirecciones; 488 impresiones, 2 clics, posición media 71,4. El 54% de las
impresiones va a "por dónde empezar". GA4: 26 sesiones, ningún
`generate_lead` todavía, un `form_start`).

## Para Ramiro (requieren login o una decisión)

- [ ] **Validar los servicios nuevos (nov-2026)**: Kit IA, Formación en IA y
      Asesoramiento en IA (`src/lib/servicios.ts` y `src/lib/content.ts`).
      Revisar sobre todo: plazos (Kit 2-3 semanas, taller 1-2 semanas de
      preparación, hoja de ruta 2-4 semanas), que el asesoramiento use los
      rangos de discovery (desde 1.500 €) y retainer (1.000-5.000 €/mes), que
      Kit y formación salgan sin precio ("te lo damos en la consultoría") y que
      la formación diga que eres "profesor de Industria 4.0 en un máster
      universitario" (sale de la base del bot; si prefieres no decirlo, se
      quita). Si tienes precio de partida para el Kit o un taller, pásamelo.
- [ ] **Fotos reales para las fichas**: hoy cada servicio lleva vídeo
      ilustrativo (Remotion) y un esquema "Así funciona", pero ninguna foto.
      Lo que más sumaría: una foto tuya dando una formación o un taller (para
      /servicios/formacion-ia-empresas y Kit IA) y capturas reales,
      anonimizadas y con permiso, del sistema de Eventos Barcelona (la
      propuesta en web) y del panel de Tribeca.
- [ ] **Bot de GHL y LinkedIn con los servicios nuevos**: la base del bot
      (`rianex-chatbot-kb.md`) y la página de LinkedIn no conocen el Kit IA,
      la formación ni el asesoramiento.

- [ ] **GA4, canal "IA"**: Administrar → Grupos de canales → crear un grupo
      con un canal "IA" cuya fuente coincida con
      `chatgpt|openai|perplexity|gemini|copilot|claude|deepseek|grok` (por
      encima de "Referral"), y marcar `ai_referral` como evento clave en
      cuanto llegue el primero.
- [ ] **Claves para `npm run visibilidad-ia`**: sin claves solo pregunta a
      Claude. Con `PERPLEXITY_API_KEY`, `GEMINI_API_KEY` y `OPENAI_API_KEY`
      en el entorno pregunta también a Perplexity, Gemini y ChatGPT. Decidir
      si se programa una vez al mes en rianex-server, como el radar.

- Tras el rediseño (nov-2026): revisar en GSC la home (title nuevo) a las 2 y 4 semanas, y actualizar el texto de la página de LinkedIn y la base del bot de GHL con "consultoría gratuita" en vez de "diagnóstico gratuito".

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

- [ ] **Páginas de sector para talleres, negocios con cita previa e
      inmobiliarias**: desde el 9 de noviembre la home las destaca en "Para
      quién trabajamos", pero solo clínicas tiene página propia en
      /soluciones (eventos y academias también, aunque no se destacan). Hoy
      las tarjetas de talleres y negocios con cita llevan a
      /servicios/agente-ia-whatsapp, y la de inmobiliarias a la implantación
      de CRM. Con /soluciones/talleres, /soluciones/negocios-con-cita e
      /soluciones/inmobiliarias (en `src/lib/sectores.ts`, sin casos
      inventados) habría páginas para "automatización talleres mecánicos",
      "agente WhatsApp inmobiliaria", etc.

- [ ] **Vídeo de prospección B2B**: es el único de los ocho servicios sin
      vídeo (`~/rianex-videos`, hace falta un visual nuevo). Tampoco tienen
      vídeo Kit IA, formación ni asesoramiento.
- [ ] **Revisar las tres fichas nuevas hacia el 5 de diciembre**:
      /servicios/kit-ia, /servicios/formacion-ia-empresas y
      /servicios/asesoramiento-ia. En Search Console, que estén indexadas y
      qué consultas traen ("formación ia empresas", "asesoramiento ia",
      "kit ia"). Si no indexan, pedir la indexación a mano.

- [ ] **Revisar las fichas de servicio reenfocadas hacia el 26 de noviembre**:
      el 29 de octubre cambiaron title y meta de /servicios/outbound-b2b
      (ahora prospección autónoma y Go to Market), agente-ia-whatsapp (suma
      Telegram y voz con Vapi), embudo-de-captacion (leads de Meta Ads en
      GoHighLevel), implementacion-crm-gohighlevel (GoHighLevel o HubSpot) y
      generador-de-propuestas (aplicación en Vercel). En Search Console,
      comparar impresiones y posición con las cuatro semanas anteriores. Si
      "outbound b2b" pierde mucho, valorar un artículo propio para esa consulta.

- [ ] **Revisar el title nuevo de la home hacia el 15 de noviembre**: desde el
      29 de octubre es "Automatiza los procesos de tu empresa con IA". En
      Search Console, comparar impresiones y posición de la home con las dos
      semanas anteriores, y comprobar que no le quita la consulta
      "automatización de procesos con IA" a /servicios/automatizacion-procesos-ia.

- [ ] **Canibalización en GTM Engineering, revisar hacia el 1 de diciembre**:
      `que-es-gtm-engineering` (definición) y `gtm-engineering-no-es-mandar-emails-con-clay`
      (opinión, arquitectura comercial) comparten tema. El segundo enlaza al
      primero como definición. Si en Search Console los dos salen para "gtm
      engineering" y se reparten la posición, quitar "gtm engineering" del
      title del segundo y orientarlo a "arquitectura comercial".

- [ ] **Canibalización en "a medida"**: "desarrollo-a-medida-con-ia-cuando-construir"
      sale para "proyectos de ia a medida" y "desarrollo software ia a medida"
      (posición ~64). Desde el 28 de octubre ya defiende automatizar antes que
      construir y dice que Rianex no hace apps. Revisar a mediados de
      noviembre: si "proyectos de IA a medida" entra en primera página y el
      otro sigue sin tráfico, redirigirlo con un 301 al de proyectos.

Por orden de impacto:

- [ ] **Más go-to-market**: faltan artículos de infraestructura de email
      (dominios, calentamiento, SPF/DKIM/DMARC con Instantly) y de LinkedIn
      con Valley. Treg es muy nuevo: revisar en enero si sus datos del
      artículo de enriquecimiento siguen vigentes.
- [ ] **Serie de agentes (Tribeca), siguientes artículos**: el agente
      de contenido cuando Content tenga algo construido; y traspasos entre
      agentes cuando el runner los tenga. Revisar antes el estado en
      `~/Documents/tribeca/KEYWORKERS_Estado_Agentes_*.md`.
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

- 2026-11-09 · "Para quién trabajamos": inmobiliarias y negocios con cita
  previa pasan por delante de talleres mecánicos, a petición de Ramiro. Orden:
  agencias de marketing, eventos, clínicas y hospitales, inmobiliarias,
  negocios con cita previa y talleres (también en la entradilla y la FAQ).

- 2026-11-09 · "Para quién trabajamos": agencias de marketing y empresas de
  eventos pasan a ser las dos primeras tarjetas (con los casos de Tribeca
  Media, Growth4U y Eventos Barcelona), a petición de Ramiro. Seis sectores
  en dos filas de tres; salen de la línea "Y también".

- 2026-11-09 · "Para quién trabajamos" con cuatro sectores destacados, a
  petición de Ramiro: clínicas y hospitales (con el caso de Growth4U),
  talleres mecánicos, negocios con cita previa e inmobiliarias. Cada tarjeta
  dice qué duele, qué automatizamos y a qué servicio lleva. Se añaden a la
  entradilla, a la FAQ "¿Para qué empresas trabajáis?" y al "para quién" del
  agente de WhatsApp (la meta description de esa ficha no se toca, que está
  en medición hasta el 26-nov).

- 2026-11-07 · Web reorganizada para que se entienda en segundos. Home: Qué
  hacemos (tres pasos: consultoría gratuita, implantación, formación y
  acompañamiento) → Servicios (tarjetas por grupo, con los que tienen vídeo
  marcados) → Otros servicios (Kit IA, formación, asesoramiento) y
  complementarios → Para quién trabajamos (perfiles, encaje, sectores,
  empresas reales y llamada a la consultoría). Menú: Servicios, Para quién,
  Casos, Nosotros, Blog. Fichas de servicio con vídeo, "Qué consigues",
  ejemplo "Así funciona" en cuatro pasos y varios casos por servicio
  (Hospital Capilar siempre "Con Growth4U"; VideoObject en las que tienen
  vídeo). Tres páginas nuevas: /servicios/kit-ia,
  /servicios/formacion-ia-empresas y /servicios/asesoramiento-ia, con FAQ y
  Service en JSON-LD. Vídeos de servicio re-renderizados con "consultoría
  gratuita" en el cierre y los títulos actuales de CRM y leads de Meta; los
  de los casos, también.

- 2026-11-07 · Pendientes de Search Console: indexación pedida (cola prioritaria) para los tres artículos del 3-nov, que estaban "Descubierta: actualmente sin indexar" (`agente-de-voz-whatsapp-agenda-citas`, `gohighlevel-levelup-day-2026-agentes-ia`, `gtm-engineering-no-es-mandar-emails-con-clay`), y para la home, para que Google recoja antes el title nuevo. Avisos de datos de vídeo a 0. El informe de indexación de vídeos marca 2 vídeos como "El vídeo no está en una página de visualización": es lo esperado, porque el vídeo acompaña al artículo o al caso y no es el contenido principal; no se corrige.

- 2026-11-04 · Medición de la visibilidad en asistentes de IA: opción
  "ChatGPT u otra IA" en "¿Cómo me conociste?" (etiqueta `#via-ia`), visitas
  desde ChatGPT, Perplexity, Gemini, Copilot y Claude en el panel de
  analítica (también las que solo traen `utm_source=chatgpt.com`), evento
  `ai_referral` en GA4 y `npm run visibilidad-ia`, que pregunta cada mes a
  los asistentes y deja el informe en `docs/visibilidad-ia/`.

- 2026-11-03 · Title de la home definitivo a petición de Ramiro: "AI Automation Agency | Rianex" en ES y EN (sustituye a "Agencia IA - Rianex"). En ES el title va en inglés; la description sigue en español con "automatización con IA".

- 2026-11-03 · Aviso de Search Console sobre los datos estructurados de vídeo: `uploadDate` sin zona horaria y con valor no válido. El VideoObject del blog y el de los casos de éxito usaban solo la fecha (`2026-10-08`); ahora llevan fecha, hora y zona horaria (ISO 8601). Resuelto: el 6 de noviembre Google volvió a leer los datos y los dos problemas quedan a 0, sin necesidad de validar.

- 2026-11-03 · Title de la home a petición de Ramiro: "Agencia IA - Rianex" (EN "AI Agency - Rianex"); antes "Agencia de automatización con IA para empresas | Rianex". Pierde la keyword "automatización" en el title; vigilar impresiones de la home en GSC.

- 2026-11-03 · Tres artículos del radar del 2-nov: `gohighlevel-levelup-day-2026-agentes-ia` (novedades del 27-oct con el estado de cada función), `gtm-engineering-no-es-mandar-emails-con-clay` (arquitectura del sistema comercial en seis capas, caso Tribeca) y `agente-de-voz-whatsapp-agenda-citas` (el primer artículo con vídeo propio). El blog admite ahora `video`, `videoPoster` y `videoDuration` en el frontmatter: el vídeo abre el artículo y sale un VideoObject en el JSON-LD.

- 2026-11-03 · Home con 6 resultados (más ventas con los mismos leads, clientes nuevos, agenda llena, clientes atendidos, cobrar antes, horas devueltas) y "medimos el punto de partida" en la oferta. Falta ficha de servicio propia para cobros/facturas y para el asistente interno; hoy enlazan a automatización de procesos.

- 2026-11-03 · Home enfocada al resultado y no al servicio: H1 "Más clientes, sin más horas", sección "Resultados que entregamos" (agenda llena, más ventas, horas devueltas, ningún cliente perdido), menú "Resultados". El title de la home no cambia (keyword); la description sí. Las URLs no cambian. Las fichas de servicio siguen con el enfoque anterior.

- 2026-11-01 · Rediseño "agencia de automatización con IA": nuevo title/description de la home ("Agencia de automatización con IA para empresas"), H1 nuevo ("Si se repite, se automatiza"), "diagnóstico gratuito" pasa a "consultoría gratuita" en toda la web salvo el blog, JSON-LD con "Consultoría de IA" y "Adopción de IA". Las URLs no cambian. Vigilar en GSC las impresiones de la home las próximas 4 semanas.

- 2026-10-29 · Servicios reenfocados a petición de Ramiro, en español e inglés:
  "Outbound B2B" pasa a ser prospección autónoma en la nube y Go to Market
  (SABI, Clay, Databricks, Instantly o Lemlist, Valley, HubSpot), sin cambiar
  la URL; agentes para WhatsApp, Telegram y voz con Vapi; captación de leads de
  Meta Ads en GoHighLevel; implantación de CRM en GoHighLevel o HubSpot;
  propuestas en una aplicación en Vercel con su pipeline. Actualizados la lista
  "Qué hacemos" de la portada, llms.txt, knowsAbout y el stack de /sobre-mi.
- 2026-10-29 · Fuera el párrafo bajo el titular de la portada ("Para empresas
  que quieren automatizar con IA…") en español e inglés, a petición de Ramiro.
  La meta description no cambia.
- 2026-10-29 · Scoring del diagnóstico alineado con el cliente ideal: el
  sector ya no puntúa, el volumen de leads baja de 20 a 10 puntos y entra el
  objetivo (15 puntos si quiere automatizar procesos, integrar herramientas,
  el seguimiento o las propuestas). Opción nueva de sector: industria,
  logística y distribución.

- 2026-10-29 · Cliente ideal de la web: empresas que quieren automatizar
  procesos con IA. Fuera los "dos frentes" (automatización y go-to-market):
  lo comercial pasa a ser un proceso más que se automatiza. Cambian el H1 y
  el hero, el title y la description de la home y de /servicios, el "para
  quién" de cada servicio (sin sectores ni "más de 10 leads al mes"), la
  FAQ (pregunta nueva "¿Para qué empresas trabajáis?"), el JSON-LD (con
  `audience`) y llms.txt. No cambia ninguna URL.

- 2026-10-28 · Cuarto artículo de la serie de agentes: "Qué revisar en un
  sistema de agentes de IA antes de escalarlo"
  (`/blog/revisar-sistema-de-agentes-ia-antes-de-escalar`), a partir del
  diagnóstico de Tribeca y de los bloques de observabilidad (S3) y escalado
  (S4), sin detalles de seguridad. Enlazado desde los otros tres de la
  serie y como guía del caso Tribeca.

- 2026-10-28 · Blog de go-to-market: "Prospección B2B con IA: cómo montar
  outbound en España" (`prospección b2b outbound`, `prospección b2b con ia`)
  y "Clay, Treg o ColdIQ: cómo enriquecer datos para prospección B2B"
  (`clay.com qué es`, `clay pricing`). Cluster nuevo "Go-to-market y
  outbound B2B" con GTM Engineering; fuera el cluster de desarrollo a
  medida. "Desarrollo a medida con IA o automatización" reorientado (misma
  URL): automatizar antes que construir, Lovable para validar una app y
  Rianex no hace apps. En "Proyectos de IA a medida" (reforzado en el #30)
  se añaden Lovable, los enlaces de outbound y la FAQ "¿Hacéis aplicaciones
  a medida?". Enlazados desde /servicios/outbound-b2b y GTM Engineering.

- 2026-10-28 · Serie de agentes con el caso Tribeca, tres artículos del
  clúster `agentes-ia`: "Agentes de IA con aprobación humana"
  (`/blog/agentes-de-ia-con-aprobacion-humana`), "Agente de IA para Meta
  Ads y Google Ads" (`/blog/agente-ia-meta-ads-google-ads`) y "Coste de un
  agente de IA en producción" (`/blog/coste-agente-de-ia-en-produccion`).
  Enlazados entre sí, desde "cuándo compensan los agentes", desde la
  sección Tribeca de "Qué es GTM Engineering" y como guías del caso Tribeca
  (`src/lib/casos.ts`). Sin precios, clientes de Tribeca ni detalles de
  seguridad.

- 2026-10-28 · Artículo "Proyectos de IA a medida" reforzado: era la
  consulta más cerca de la primera página ("proyectos de ia a medida",
  posición 10,8 en 28 días; 33 impresiones entre todas las páginas). Title
  con "para empresas", tabla de catálogo/configurado/a medida, tabla de
  fases, tabla de costes (puntuales y recurrentes), sección de por qué los
  proyectos se quedan en piloto (consulta "proyectos de ia en produccion"),
  casos reales de Eventos Barcelona y Tribeca, 8 preguntas frecuentes y
  `updated`. Fuera el ejemplo de "panel o portal a medida" (desarrollo de
  software, fuera del posicionamiento desde el PR #29); en su lugar,
  prospección y outbound con IA. Enlazado desde los servicios de
  automatización y de agente de WhatsApp.

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
