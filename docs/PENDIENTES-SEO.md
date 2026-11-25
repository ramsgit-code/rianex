# SEO y GEO: cola de pendientes

Lista viva de lo que falta para posicionar www.rianex.es en Google y en los
asistentes de IA (ChatGPT, Perplexity, Claude, AI Overviews). Se actualiza
cada vez que se cierra o aparece algo: lo terminado baja a **Hecho** con la
fecha y el PR.

Origen: auditoría del 2 de octubre de 2026. Auditoría técnica, SEO y GEO completa el 25 de noviembre (113 URLs rastreadas, todas con 200; ver «Hecho» y los puntos nuevos de «Para Ramiro» y «Código»). Repaso anterior: 7 de noviembre (1.480 impresiones, 6 clics, posición 67,7; GA4 51 sesiones, 0 leads; Bing 10 URLs indexadas y 0 impresiones). Repaso del 26 de octubre: 799 impresiones, 3 clics, posición 70,3. Repaso anterior: 21 de octubre
(Search Console, 28 días: 58 páginas indexadas, solo 2 sin indexar y son
redirecciones; 488 impresiones, 2 clics, posición media 71,4. El 54% de las
impresiones va a "por dónde empezar". GA4: 26 sesiones, ningún
`generate_lead` todavía, un `form_start`).

## Para Ramiro (requieren login o una decisión)

- [ ] **Sortlist**: perfil en sortlist.com/agency/rianex con 3 reseñas
      (5/5), 3 trabajos e índice de calidad del 58%; «Inteligencia
      Artificial» es ya el primer servicio. Lo que queda depende de ti: foto
      del equipo (una foto buena tuya) y decidir si quitas los servicios que
      no vendes (creación de sitios web, email marketing). «Destaca tu mejor
      trabajo» pide 3 trabajos por categoría: no se rellena sin proyectos
      reales.
- [ ] **Validar los cuatro servicios de canal (25-nov)**: `/servicios/creacion-de-webs`,
      `/servicios/email-marketing`, `/servicios/outbound-linkedin` y
      `/servicios/cold-calling`, en el grupo nuevo «Canales de captación» de
      /servicios y de la portada. Sin casos, sin plazos y sin precio publicado
      (se da en la consultoría). Revisar lo que prometen: Next.js en Vercel o
      embudos de GoHighLevel, cambios en Next.js con el mantenimiento
      mensual, que ningún correo nuevo sale sin revisión, mensajes de LinkedIn
      aprobados antes de enviar en Valley, quién hace las llamadas (la ficha
      no lo dice), marcador del CRM, grabación y resumen con IA, y que el
      agente de voz no hace llamadas comerciales en frío. Las FAQ legales
      (LGTel art. 66, Circular 1/2023 de la AEPD, LOPDGDD arts. 19 y 23, LSSI
      art. 21, Reglamento de IA art. 50, Acuerdo de usuario de LinkedIn 8.2
      y 3.4) están comprobadas en la fuente el 25-nov. El formulario de
      diagnóstico no tiene opción para estos servicios.
- [ ] **Validar las dos páginas de sector nuevas (25-nov)**:
      `/soluciones/inmobiliarias` y `/soluciones/negocios-con-cita`. No tienen
      caso propio y lo dicen sin inventar cifras, pero prometen cosas que
      salen de las landings y de las fichas: respuesta «en minutos» a los
      leads de los portales también de noche y en fin de semana, lectura del
      correo de aviso del portal (y conexión por API si el software
      inmobiliario la tiene), informe semanal automático al propietario,
      plazo de 4 a 8 semanas («el primer agente suele estar atendiendo en la
      semana 4»), precios generales (discovery desde 1.500 €, implantación
      5.000-25.000 €), recordatorio al reservar y el día antes, lista de
      espera, mensajes de recuperación y petición de reseñas. La de negocios
      con cita lleva un bloque «A tener en cuenta» (el agente dice que es una
      IA, no se nombra el tratamiento si hay datos de salud, hace falta la
      API oficial de WhatsApp): si no lo quieres, se quita.
- [ ] **Repasar las traducciones al inglés (25-nov)**: 39 artículos y los
      dos textos legales. Las cifras van en notación inglesa (€1,500, 30%).
      En los artículos de GTM, «tiene el código cerrado» se tradujo como
      «is code-complete»: si querías decir código no abierto, se cambia. Los
      textos legales en inglés dicen que la versión que vincula es la
      castellana.
- [ ] **GEO: estar donde miran los asistentes (auditoría del 25-nov).** Claude
      no nombra a Rianex en ninguna de las 12 preguntas (informe del 4-nov),
      y buscando «Rianex agencia automatización IA Ávila» o «rianex.es» la web
      no sale. Los asistentes recomiendan agencias a partir de listados de
      terceros: upliora.es, clutch.co, javadex.es, sortlist, aisuperior.com,
      malt.com, ecosistemastartup.com, el directorio de agencias de Semrush y
      experts.n8n.io. Rianex no está en ninguno. Por orden: (1) perfiles en
      Clutch (con una reseña verificada de Eventos Barcelona), Sortlist
      (hecho el 25-nov: sortlist.com/agency/rianex, ya en `sameAs`; faltan
      reseñas, trabajos y equipo para subir el índice de calidad del 42%),
      experts.n8n.io (piloto cerrado con lista de espera: piden 3 clientes
      activos con n8n, ser miembro activo de la comunidad y trabajar en
      Reino Unido, Irlanda, norte de Europa o Norteamérica; mientras tanto,
      perfil en community.n8n.io y plantillas en n8n.io/creators),
      directorio de partners de HighLevel, Malt y Google
      Business Profile en Ávila, con el mismo nombre, descripción y URL;
      (2) escribir a upliora, aisuperior y ecosistemastartup para entrar en
      sus listas de agencias de automatización con IA en España; (3) los dos
      enlaces de Eventos Barcelona y Tribeca Media, que siguen pendientes.
      Cada perfil que se abra se añade al `sameAs` del JSON-LD de la home.
      Esto pesa más que cualquier cambio dentro de la web.
- [ ] **Medir la visibilidad cada mes**: el único informe es del 4-nov y
      solo pregunta a Claude. Con las claves de Perplexity, Gemini y OpenAI,
      programar `npm run visibilidad-ia` en rianex-server el día 1 de cada mes.
- [ ] **`/sobre-mi` se queda corta** (417 palabras, foto de 200×200) y es la
      página que sostiene la firma de los 39 artículos. Pásame trayectoria
      con fechas, el máster donde das clase, proyectos con nombre y la foto
      original, y la amplío.
- [ ] **Core Web Vitals sin medir**: el 25-nov la API de PageSpeed dio cuota
      agotada. Pasar pagespeed.web.dev a la home, `/diagnostico` y un
      artículo, en móvil, y mirar sobre todo si el aviso de cookies (modal
      que bloquea) es el elemento más grande de la primera pantalla.

- [ ] **Dónde buscar clics (24-nov-2026).** En 90 días, el 89% de las impresiones sin marca está más allá de la posición 50 y solo el 1% en el top 10: las búsquedas genéricas («automatización de procesos con IA», «agentes de IA») no traerán clics en meses. Prioridad: búsquedas de compra donde ya salimos en el top 20 (licitaciones: «busco una herramienta para redactar ofertas técnicas…» en la 6-8), búsquedas entre la 4 y la 15, y artículos para búsquedas concretas en nichos con poca competencia en español (GoHighLevel en español, qué es n8n). El informe semanal de Rizzo ya elige así. Lo que mueve la búsqueda genérica son enlaces externos.
- [x] **«Proyectos de IA a medida» vuelve al principio del título (24-nov-2026).** El #73 lo había cambiado a «Precio de…» y apartó la única búsqueda sin marca con volumen en el top 30 (101 impresiones en 90 días, posición 30). Título: «Proyectos de IA a medida para empresas: precio, plazos y ejemplos»; H2 con «en producción» (posición 13). Regla: al cambiar el título de una página con impresiones, la búsqueda que las trae va al principio. Medir en 2-3 semanas.
- [x] **Grupo «automatización de procesos con IA» ordenado (24-nov-2026).** Página principal: por dónde empezar. Ejemplos y herramientas dejan de usar la frase principal en título, descripción y enlaces (se quedan con «ejemplos» e «IA para automatizar procesos / herramientas»); cuánto cuesta se fusiona en la página de precio con 301; los cuatro artículos enlazan al servicio. Medir en 4-6 semanas: la principal debería salir de la posición 80; si herramientas sigue sin búsquedas propias, fusionarla en la principal. Para el top 10 de la búsqueda genérica harán falta enlaces externos.
- [x] ~~**Subir de la posición 80 los artículos de «automatizar procesos con IA».** Por dónde empezar, ejemplos, herramientas y cómo implementar suman ~2.800 impresiones en 90 días en la posición 77-82 y 0 clics (Search Console, 24-nov). Revisar si se canibalizan entre sí y decidir cuál es la página principal de cada búsqueda antes de reescribir.
- [x] **Títulos y descripciones para clics (24-nov-2026).** Seis páginas que ya salen en primera página sin clics: cross-selling por WhatsApp (pos. 7), /en/diagnostico (pos. 5-6), caso Tribeca Media (pos. 8,6, casi todo búsquedas de la marca), n8n 3 (pos. 10), Clay/Treg/ColdIQ (pos. 4-5) y GTM engineering. Títulos con la palabra exacta que se busca y una promesa que el contenido cumple. Medir el CTR en 2-3 semanas.

- [ ] **IA selectiva: validar plazo y precio (25-nov-2026).** La ficha
      `/servicios/ia-selectiva` dice que la medición y el mapa del flujo
      llevan 1-2 semanas y el rediseño 2-4 más, y que la medición se cobra
      como un discovery (desde 1.500 €) y el rediseño como una implantación.
      Lo supuse yo con los precios ya publicados: confírmalo o dime qué
      cambiar. La landing `/l/ia-selectiva` está lista para una campaña o
      para el enlace de los mensajes de prospección a empresas que ya usan IA.

- [ ] **Control con cámaras e IA: lo que queda abierto.** El 24-nov
      validaste el plazo (3 a 6 semanas), el precio (instalación más cuota
      mensual), que la prueba con grabaciones va aparte de la consultoría y
      con precio cerrado, y que no se compra nada: se instala en los sistemas
      del cliente. Quedan dos cosas: (1) el **precio de la prueba**, que no
      se publica pero tendrás que dar en cada consultoría, y (2) que un
      **asesor de protección de datos** lea las FAQ legales (art. 22 y 89 de
      la LOPDGDD, evaluación de impacto, matrículas) antes de gastar en
      anuncios. Decidido por mí: las "sugerencias de la semana" del panel se
      ofrecen como parte del informe semanal (Claude lee los datos de la
      semana y propone; decide el gerente). Sin caso propio todavía: en
      cuanto haya un piloto, cambiamos la banda de prueba de las landings
      por el caso. Las landings son `noindex` como el resto de `/l/`; si
      quieres que posicionen solas, las pasamos a `/soluciones/` con versión
      en inglés.

- [ ] **¿El diagnóstico gratis lleva entregable por escrito?** (radar del
      23-nov, referencia Noah). Si después de cada llamada de 30 minutos vas
      a mandar en 24 horas una página con los 2-3 procesos a automatizar
      primero, horas y coste orientativo, lo prometemos en `/diagnostico`
      con un bloque "Qué te llevas" y un `Service` en JSON-LD. Sin tu OK no
      se promete.

- [ ] **Saldo de Anthropic para el chat**: el 20-nov se cargaron 5 $
      (unas 50 conversaciones con Opus, a ~0,10 $ cada una). Activa la
      recarga automática o un aviso de saldo en console.anthropic.com: sin
      saldo, el chat responde con error y el lead solo ve el calendario.
- [ ] **Borrar el lead de prueba** "Prueba Chat Rianex" (correo de pruebas)
      en GHL, con sus dos oportunidades, y sus dos solicitudes del panel.

- [ ] **Pegar la categoría "AI Workflow & Business Automation"** en el
      titular de la página de LinkedIn, la base del bot de GHL y la imagen
      `public/og.png` (fuera del alcance del código).

- [ ] **Bot de GHL: que diga que es una IA (obligatorio desde el 2-ago-2026,
      art. 50 del AI Act).** La base `rianex-chatbot-kb.md` (fuera del repo)
      ya lo pide en el primer mensaje desde el 11-nov: hay que pegarla en el
      bot de GHL. Revisar también cualquier agente de WhatsApp o de voz
      entregado a clientes: aviso en el primer mensaje o saludo de voz, y
      quién se encarga del marcado del contenido antes del 2-dic-2026.

- [ ] **Landings de campaña**: cinco por nicho para Meta, LinkedIn y outbound
      (`/l/agencias-de-marketing`, `/l/empresas-de-eventos`, `/l/clinicas`,
      `/l/inmobiliarias`, `/l/negocios-con-cita`; copia en `src/lib/nichos.ts`)
      y una por servicio para Google Ads de búsqueda (`/l/<servicio>`,
      `src/lib/landings.ts`). Para anuncios, añade UTM a la URL,
      p. ej. `https://www.rianex.es/l/agente-ia-whatsapp?utm_source=meta&utm_campaign=agente-nov`.
      Cada lead que entra por una landing llega a GoHighLevel con las
      etiquetas `landing-<servicio>` y `utm-<fuente>` (también los parciales
      del paso 1), y el payload del lead guarda todas las UTM. En GA4,
      `generate_lead` lleva el parámetro `landing`: regístralo como dimensión
      personalizada (Administrar → Definiciones personalizadas) para verlo en
      los informes. Revisa los titulares de cada landing antes de gastar en
      anuncios.

- [ ] **¿Cobra Rianex por resultado?** El artículo "Cobrar la IA por
      resultado" (9-nov) explica el formato (implantación cerrada + cuota
      base + importe por cita confirmada con tope) sin decir que Rianex lo
      ofrezca. Si decides ofrecerlo, pásame la cuota base y el importe por
      cita y añadimos el bloque "Cómo cobramos" en la ficha del agente de
      WhatsApp y en el artículo. Eventos Barcelona no tiene agente de citas,
      así que no sirve para calcular el coste real por cita: hará falta el
      primer cliente propio con agente de citas.

- [ ] **Validar el bloque "Mantenimiento mensual" (11-nov)** en las fichas
      del agente de WhatsApp, automatización de procesos e implantación de
      CRM (`src/lib/mantenimiento.ts`). Promete cuatro cosas: pruebas con
      casos reales antes de cada cambio de modelo, informe mensual de coste
      por respuesta correcta, registro de cambios en el CRM y revisión de
      claves y proveedores, dentro del retainer de 1.000-5.000 €/mes. Si algo
      no lo vas a dar, se quita; si tienes un precio de entrada para el
      mantenimiento de un solo agente, lo ponemos.
- [ ] **FUNDAE en la ficha de formación (16-nov)**: la web dice que Rianex
      imparte el taller y da "el programa, las horas, el control de
      asistencia y la factura" para justificar la bonificación, y que la
      gestión la hace la empresa o una entidad organizadora (su gestoría).
      Confirma que lo puedes dar así. Si quieres hacer tú de entidad
      organizadora, hay que darse de alta en la aplicación de FUNDAE.

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

- [ ] **Home para «agencia de automatización» (24-nov)**: title «Agencia de
      automatización con IA en Ávila», H1 con la keyword, H2 con variantes,
      enlaces internos bajo «qué hacemos», FAQ nueva y JSON-LD
      Organization + ProfessionalService con Ávila. Revisar en GSC a las 2 y
      4 semanas las consultas «agencia de automatización», «agencia de
      automatización con ia» y «automatización con ia para empresas». Si la
      posición no se mueve, el freno son los enlaces externos y los perfiles
      (Google Business Profile, Clutch, Sortlist).

- Tras el rediseño (nov-2026): revisar en GSC la home (title nuevo) a las 2 y 4 semanas, y actualizar el texto de la página de LinkedIn y la base del bot de GHL con "consultoría gratuita" en vez de "diagnóstico gratuito".

- [ ] **Marcar `generate_lead` como evento clave en GA4**: en cuanto llegue
      el primer diagnóstico, Administrar → Eventos → Eventos recientes →
      estrella en `generate_lead` (y en `diagnostico_agendar` si quieres
      medir también las reservas). GA4 no deja marcarlo antes de recibirlo.

- [ ] **Bing, revisar hacia el 1 de diciembre**: a 11 de noviembre tiene
      22 URLs indexadas (10 el 9-nov), 2 impresiones, 0 citas en Copilot y 0
      backlinks. No reenviar en bloque por URL Submission: ya conoce las URLs.
      Las nuevas se avisan con `npm run indexnow`. Lo que más lo movería son
      los enlaces externos (ver la tarea de enlaces).
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
- [ ] **Página de LinkedIn de Rianex**: pegar el eslogan y la descripción
      nuevos (en `linkedin/textos-linkedin-es.md` de tu carpeta local).

## Código

- [ ] **Pedir indexación en GSC el 26-nov** de `/servicios/outbound-linkedin`
      y `/servicios/cold-calling` (y sus versiones `/en/`): el 25-nov se
      agotó el cupo diario tras pedir creación de webs y email marketing.
      El sitemap se reenvió el 25-nov (154 URLs leídas) e IndexNow aceptó
      las 154.

Pendiente de la auditoría del 25-nov (segunda tanda), por impacto:

- [ ] **`Organization`**: faltan `legalName` y `foundingDate` (necesito la
      razón social y la fecha de alta), y cada perfil externo nuevo en
      `sameAs`. `contactPoint` ya está.
- [ ] **Menores**: `/testimonios` solo crecerá con más opiniones (desde el
      25-nov enlaza a las reseñas de Sortlist y a los casos). 13 artículos sin
      `updated`.
- [ ] **Medir los títulos cortos del 25-nov hacia el 16 de diciembre**: 31
      artículos llevan desde el PR #93 un `seoTitle` de 60 caracteres o menos
      (el H1 no cambia). Varios ya se habían cambiado el 24-nov para medir el
      CTR (proyectos de IA a medida, licitaciones, cross-selling, Clay/Treg/
      ColdIQ, GTM, el pilar): la medición de esos cambios queda mezclada con
      esta, Ramiro lo decidió así. En Search Console, CTR y posición de cada
      uno frente a las cuatro semanas anteriores al 24-nov.
- [ ] **Repetir la auditoría con claude-seo**: el plugin está instalado en el
      Claude Code de Ramiro (`claude-seo@agricidaniel-claude-seo`, 2.6.2). En
      una sesión nueva, `/seo audit https://www.rianex.es`; o, más barato, sus
      comprobaciones deterministas por URL (`page_checks.py`,
      `sitemap_discovery.py`, `transport_check.py`, `agentic_check.py`) con
      `~/.claude/plugins/cache/agricidaniel-claude-seo/claude-seo/2.6.2/scripts/claude-seo run <script>`.
- [ ] **Revisar con calma (25-nov), salió al buscar fuentes**: la
      llamada por WhatsApp de GoHighLevel (artículo del agente de voz) sigue
      en beta y pide que el número no use Coexistence y un límite de 2.000
      conversaciones; «es la automatización con mejor retorno» (clínicas) y
      «quien busca una clínica llama a varias» no tienen fuente.
- [ ] **Artículos nuevos: traducción al inglés**. Desde el 25-nov cada
      artículo tiene su traducción en `src/content/blog-en/<slug>.mdx` (mismo
      nombre de fichero, enlaces internos con `/en`, sección «## Frequently
      asked questions»). Un artículo nuevo sin traducir no rompe nada:
      `/en/blog/<slug>` redirige al original (307) hasta que exista. Al
      revisar un artículo castellano, revisar también su traducción. El radar
      y cualquier sesión que publique deberían crear las dos versiones.
- [ ] **`lastmod` del sitemap**: desde el 25-nov sale de la constante
      `LASTMOD` de `src/app/sitemap.ts`, por sección. Hay que actualizarla en
      el mismo PR que cambie el contenido de una sección.

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

- [ ] **Revisar la canibalización del pilar y de "a medida" hacia el 2 de diciembre**
      (cambios del 18-nov). En Search Console, 28 días:
      - "automatización de procesos con ia" (434 impr): el 18-nov se la
        repartían el pilar (261, pos ~86), ejemplos (175) y herramientas (95).
        Debería quedar casi toda en el pilar y su posición subir.
      - "ejemplos de automatización de procesos" (pos 26-30) y
        "generador de propuestas para licitaciones" (pos 16,7): ¿suben?
      - "proyectos de ia a medida" (pos 11,6, más 42 del artículo ya
        redirigido): ¿entra en primera página?
      Si el pilar sigue en la posición 80 o más, el freno son los enlaces
      externos, no el contenido (ver "Para Ramiro").

- [ ] **Canibalización en GTM Engineering, revisar hacia el 1 de diciembre**:
      `que-es-gtm-engineering` (definición) y `gtm-engineering-no-es-mandar-emails-con-clay`
      (opinión, arquitectura comercial) comparten tema. El segundo enlaza al
      primero como definición. Si en Search Console los dos salen para "gtm
      engineering" y se reparten la posición, quitar "gtm engineering" del
      title del segundo y orientarlo a "arquitectura comercial".

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

- [ ] **Cifras sin fuente en artículos antiguos**: el de propuestas dice
      "en 8 minutos: cómo lo hago" con ese tono de primera persona de antes.
      Revisar los artículos de abril que quedan (propuestas, WhatsApp) con el
      mismo criterio que la home. El de cualificar leads ya está (16-nov).
- [ ] **Directrices del art. 50 en el DOUE**: el radar del 16-nov dice que
      salieron el 12-nov como comunicación C/2026/6005 (CELEX 52026XC06005),
      pero solo lo cuenta CASRAI y EUR-Lex no se pudo abrir. Si se confirma,
      añadir la referencia en `/blog/ai-act-chatbot-decir-que-es-ia` antes
      del 2-dic.
- [ ] **Revisar a mediados de noviembre** el pilar "por dónde empezar"
      (title "qué es y por dónde empezar" desde el 26 de octubre): posición
      para "automatización de procesos con ia" (78 a 26 de octubre) y
      "automatizar procesos con ia" (66), y si aparecen clics. El techo lo
      pone la autoridad del dominio: el top 10 es Microsoft, Oracle, AWS,
      IBM e Informatica, y rianex.es tiene 0 enlaces externos.
- [ ] **Editor de blog del panel**: ya no publica en la web (el blog se lee de
      los `.mdx`). Decidir si se retira o se reconvierte.
- [ ] **Textos legales con `noindex`** (prioridad baja).

## Hecho

- 2026-11-25 · Séptima tanda (claude-seo, segunda parte), a petición de
  Ramiro. (1) **Títulos cortos**: campo `seoTitle` opcional en el
  frontmatter (máximo 60) para el `<title>`; el titular largo sigue en el H1,
  la tarjeta social y el JSON-LD. Puesto en los 31 artículos (18 ES y 13 EN)
  que pasaban de 60, con la búsqueda principal al principio. Con esto ninguna
  página del sitemap pasa de 60. (2) **Markdown para asistentes**: cada
  artículo se sirve también en `/blog/<slug>.md` y `/en/blog/<slug>.md`
  (`src/app/md`, rewrite `beforeFiles` en `next.config.mjs`), con la
  canónica al HTML en la cabecera `Link`, `<link rel="alternate"
  type="text/markdown">` en la página y una línea en `llms.txt`. (3)
  **robots.txt** pasa a route handler (`src/app/robots.txt/route.ts`) para
  añadir `Content-Signal: search=yes, ai-input=yes, ai-train=yes` en cada
  grupo; mismo contenido que antes más `Disallow: /md/` (la ruta interna).
  (4) **`/soluciones`** de 264 a 428 palabras: cuatro preguntas frecuentes
  con `FAQPage` (ES y EN) y enlaces que nombran el sector («Ver la solución
  para inmobiliarias») en vez de seis «Ver la solución para el sector».

- 2026-11-25 · Sexta tanda, con el plugin **claude-seo** (2.6.2):
  comprobaciones deterministas en las 154 URLs del sitemap (página a página,
  sitemap, TLS y cabeceras, acceso de agentes de IA, precarga y validador de
  JSON-LD). Ningún fallo crítico ni alto: todas con canonical propio, un H1,
  hreflang recíproco, JSON-LD válido, alt y dimensiones en las imágenes, y
  sin títulos ni descripciones duplicados. Corregido: (1) « | Rianex» solo
  cuando el title completo cabe en 60 caracteres (`withBrand` en
  `src/lib/seo.ts`; antes se añadía hasta 55 de base y salían títulos de
  64): 29 títulos dejan de cortarse en la SERP. (2) 19 meta descriptions de
  161 a 180 caracteres recortadas a 160 o menos; el esquema del blog baja el
  máximo de 165 a 160. (3) `/diagnostico` tenía 83 palabras: ahora explica
  cómo es la consultoría (formulario, llamada, chat opcional) y lleva cuatro
  preguntas frecuentes con `FAQPage`, en ES y EN, con los precios ya
  publicados y sin prometer el entregable escrito. (4) `/testimonios` enlaza
  a las reseñas de Sortlist y a los casos. (5) Los «Saber más / Learn more»
  de los servicios complementarios llevan texto propio. (6) Imágenes: el
  logo del pie bajaba la versión de 1200 px (3840 en retina) en todas las
  páginas para verse a 127 px; los logos de cabecera, casos, landings y la
  franja de clientes llevan `sizes`, y la foto del autor y los logos que se
  ven arriba ya no se cargan en diferido. (7) Títulos de los textos legales
  más descriptivos.

- 2026-11-25 · Quinta tanda, a petición de Ramiro. **Cuatro servicios
  nuevos** en ES y EN: creación de webs, email marketing, outbound en
  LinkedIn y cold calling B2B, en un grupo nuevo «Canales de captación» de
  `/servicios` y la home, sin precio ni plazo publicados, con FAQ legales
  contrastadas en el BOE (Ley 11/2022 art. 66, Circular 1/2023 de la AEPD,
  LOPDGDD arts. 19 y 23, LSSI art. 21, AI Act art. 50) y en las condiciones
  de uso de LinkedIn. Opción nueva en el formulario («Captar clientes: web,
  email, LinkedIn o llamadas»), antes de «Otro». **Fuentes locales**:
  Archivo y JetBrains Mono se sirven desde `src/fonts` (mismos ficheros que
  daba Google), así que el build ya no depende de Google Fonts. **Sortlist**:
  descripción y habilidades en Growth Marketing (LinkedIn, telemarketing,
  llamadas salientes, generación de leads B2B), Email Marketing y Creación
  de Sitios Web; Sortlist no tiene categorías propias de LinkedIn ni de
  llamadas.

- 2026-11-25 · **«Propuestas comerciales»**: `/blog/propuestas-comerciales-automaticas`
  con title y H1 «Propuestas comerciales automáticas con IA: hazlas en
  minutos», description nueva, sección de partes de la propuesta (qué genera
  la IA y qué revisa una persona), flujo paso a paso, CTA al diagnóstico a
  mitad y al final, enlace al servicio de generador de propuestas y enlaces
  contextuales desde los artículos de GTM engineering y de Clay/Treg/ColdIQ.
  Pendiente: medir posición de "propuestas comerciales" en 2-3 semanas, y
  actualizar su traducción (`src/content/blog-en/propuestas-comerciales-automaticas.mdx`),
  que se quedó con la versión anterior.
- 2026-11-25 · Cuarta tanda. **Cifra sin fuente fuera**: el «30-60% de
  fuga» (dos artículos, la página de academias, la ficha de automatización y
  la calculadora) y el «cinco a diez veces el ahorro de horas» no tenían
  fuente ni medición propia publicada; ahora se pide contar la fuga propia
  y la calculadora dice que su 30% es un valor de ejemplo. Si tienes datos
  medidos en tus proyectos, se vuelve a poner como experiencia propia.
  **Privacidad**: Anthropic añadido como encargado (el chat de
  precualificación), en ES y EN; versión de la política 2026-11 (se guarda
  con cada lead). **Caso Tribeca**: cita de Antonio (Country Manager),
  sacada de su reseña pública en Sortlist. **Sortlist**: IA como primer
  servicio. **Fuentes en los 39 artículos**: 78 citas verificadas nuevas en
  los 19 que no tenían (las mismas en inglés), de Meta, GoHighLevel,
  HubSpot, Make, Zapier, n8n, Google, OpenAI, AEPD, BOE (RGPD, LSSI, AI
  Act) e INE. Corregido lo que no se sostenía al contrastarlo: el «80%
  menos de probabilidades de convertir» (el estudio que se suele citar mide
  otra cosa), el 15-30% de ausencias en clínicas (sin fuente), Make ya no
  cobra por operación sino por créditos, Meta cobra desde octubre también
  los mensajes de servicio por encima de un volumen, y la importación por
  CSV de GoHighLevel admite una sola nota por contacto.

- 2026-11-25 · Tercera tanda. **Fuentes** verificadas en los cuatro
  artículos con más impresiones (por dónde empezar, proyectos de IA a
  medida, qué es GoHighLevel y qué es GTM Engineering), 21 enlaces en total
  y los mismos en inglés: documentación oficial de Zapier, Make, n8n,
  GoHighLevel, Meta y Anthropic, el RGPD y la LSSI en el BOE, y Clay y
  TechCrunch sobre el origen del puesto. **Dato propio**: la medición del
  vídeo de IA selectiva, con método, fecha y tabla, en el artículo (ES y
  EN). **Imagen social** propia para cada servicio, sector y caso en los dos
  idiomas (`/og/p/<idioma>/<sección>/<slug>`); y una imagen general
  por idioma (`/og/general/<idioma>`) para el resto: ninguna página usa
  ya `og.png`, que llevaba «Recupera 10 horas/semana». **Cifras clave y
  servicios usados** arriba en cada caso. Title de la ficha de cámaras
  acortado a «Control con cámaras e IA: mesas, plazas y colas» (pasaba de
  70 y casi repetía el del artículo). Indexación pedida en GSC para
  `/soluciones/inmobiliarias` y `/soluciones/negocios-con-cita`.

- 2026-11-25 · Auditoría, segunda tanda. **Inglés completo**: los 39
  artículos traducidos en `/en/blog/<slug>` (antes redirigían al
  castellano), con hreflang recíproco, imagen social propia
  (`/og/blog-en/<slug>`), JSON-LD en inglés y entrada en el sitemap;
  `/en/privacidad` y `/en/cookies`; el listado `/en/blog`, las guías de la
  home y las fichas de servicio, sector y caso enlazan a la traducción.
  **Sectores**: `/soluciones/inmobiliarias` y `/soluciones/negocios-con-cita`
  (ES y EN), y las tarjetas de la home ya enlazan a ellas. **Preguntas
  frecuentes** en los 8 artículos que no tenían (ahora los 39 llevan
  `FAQPage`); la última respuesta ya no arrastra el párrafo de cierre del
  artículo. **JSON-LD** en `/blog`, `/casos-de-exito`, `/soluciones`,
  `/diagnostico` y `/testimonios`, y el de `/en` en inglés, con
  `contactPoint` y `WebSite` enlazado a la organización. **Títulos**: los
  artículos de más de 55 caracteres van sin « | Rianex» (de 13 títulos por
  encima de 70 quedan 3). `llms.txt` dice «consultoría gratuita» y lista
  primero los casos propios; `manifest.webmanifest`; fuera la cabecera
  `x-powered-by`. Sitemap: 146 URLs (73 inglesas).

- 2026-11-25 · Auditoría técnica, SEO y GEO, primera tanda. (1) El selector
  de idioma es un enlace y no un botón, y las 30 URLs inglesas llevan su
  `<loc>` en el sitemap: antes no recibían ningún enlace interno. Desde un
  artículo, un texto legal o una landing, que solo existen en castellano,
  lleva a `/en`. (2) Las tarjetas de eventos y clínicas de la home enlazan a
  `/soluciones` en vez de a la landing `noindex`; las landings llevan
  canonical propia (antes `noindex` con canonical a otra URL, dos señales
  contradictorias). (3) Artículos con firma y foto enlazadas a `/sobre-mi`,
  fecha en `<time>`, «Actualizado el…» cuando hay `updated`, migas de pan y
  tres relacionados (por etiquetas y clúster); en el JSON-LD, autor y editor
  con el mismo `@id` que la home y `/sobre-mi`, logo del editor y
  `BreadcrumbList`. La fecha ya no cambia de día según la zona horaria del
  visitante. (4) Enlaces internos: licitaciones y n8n vs Make vs Zapier en
  las guías de la home, y las comparativas, el agente de voz, cross-selling
  y GTM en las fichas de servicio que les tocan. (5) `lastmod` real por
  sección en el sitemap (antes, la fecha de cada despliegue). (6) Caché de
  un día para `/videos` y `/logos` (antes `max-age=0`). Medir en 3-4
  semanas: páginas inglesas indexadas, posición de `/soluciones/clinicas` y
  `/soluciones/eventos`, y clics del artículo de licitaciones.

- 2026-11-25 · Servicio **IA selectiva** (`/servicios/ia-selectiva`, ES/EN):
  grupo propio «Optimizar la IA que ya usas» en `/servicios` y la home, con
  sus usos al lado; respuesta directa, ejemplo con el pedido del vídeo, dónde
  se usa, método en cuatro pasos, casos de Eventos Barcelona (8 pasos, la IA
  decide en 2) y Tribeca Media (coste por llamada y tope), seis FAQ y el
  vídeo de grabaciones reales. Landing `/l/ia-selectiva`, opción nueva en el
  formulario (cuenta como automatización en el lead scoring), línea en el
  chat, y el complementario «Control del coste de la IA» enlaza ahora al
  servicio. El artículo `reducir-gasto-tokens-ia-selectiva` enlaza a la ficha.

- 2026-11-24 · Vídeo de `reducir-gasto-tokens-ia-selectiva` rehecho con
  grabaciones reales (58 s): el mismo pedido ficticio ejecutado dos veces en
  un n8n aislado con un modelo local pequeño. Cifras medidas: 6 llamadas,
  1.436 tokens y 107,5 s frente a 1 llamada, 107 tokens y 5,6 s.
- 2026-11-24 · «IA para licitaciones» en `propuestas-licitaciones-con-ia`
  (ya en posición 4 para «licitaciones ia» y 6-8 para dos búsquedas de
  compra): title «IA para licitaciones: herramientas para redactar la oferta
  técnica», sección tras la respuesta corta con los tres tipos de herramienta
  (generalista, específica de licitaciones, generador propio; solo se nombra
  Gobierto Contratación, según su web), llamada al servicio, secciones cortas
  de buscar licitaciones, analizar el pliego y memoria técnica, y dos
  preguntas nuevas. Medir en 4-6 semanas.
- 2026-11-24 · `reducir-gasto-tokens-ia-selectiva` reescrito con voz propia
  (primera persona, sin giros de texto generado) y con una cuenta de ejemplo
  en tokens (números redondos, rotulados como inventados). Mismos datos,
  título, descripción, preguntas frecuentes y enlaces. Vídeo sustituido por
  la versión genérica de 1:32 (sin pádel ni Eventos Barcelona).
- 2026-11-24 · Artículo `reducir-gasto-tokens-ia-selectiva` («Cómo reducir
  el gasto en tokens de IA: IA selectiva en 6 pasos»), con vídeo propio de
  1:38 al principio. Cifras del S-1 y del folleto final de Anthropic
  comprobadas en EDGAR (80 % de ingresos por consumo, NRR ~900 % sin Pro ni
  Max, -40 % de coste por tarea de Opus 5.5 frente a Opus 5); la mediana de
  NRR del software cotizado es 109 % (Clouded Judgement, 19-nov), no el
  108 % del borrador. Caso propio: Eventos Barcelona (8 pasos, IA en 2).
  Enlaza a coste de un agente, medir un proceso, cuándo compensa un agente,
  cobrar por resultado y n8n vs Make vs Zapier. Medir en 3-4 semanas
  «reducir tokens», «coste de tokens» y «tokenmaxxing»; si no entra nada,
  decidir si se fusiona con coste de un agente en producción.

- 2026-11-24 · Aviso de cookies como modal que bloquea la página hasta que
  el visitante acepta o rechaza (antes era una tarjeta pequeña que se podía
  ignorar, y sin decisión GA4 no mide). Rechazar sigue al mismo nivel y
  tamaño que Aceptar (guía de la AEPD). En /cookies y /privacidad no
  bloquea. A vigilar en GA4: subida de sesiones medidas desde esta fecha.

- 2026-11-24 · Artículo `proyectos-de-ia-a-medida-ejemplos-plazos-precio`
  reescrito para intención de compra: title y meta con el rango de precio
  y plazo del propio texto, resumen al principio, dos llamadas a
  `/diagnostico` (tras los precios y al final, sin prometer entregable
  escrito), enlace a `/servicios/desarrollo-ia-a-medida` y una pregunta
  nueva en el FAQ ("qué incluye"), que alimenta el JSON-LD FAQPage.

- 2026-11-24 · Control con cámaras: decisiones de Ramiro aplicadas en la
  ficha (ES/EN), las landings, el chat y los dos artículos. La prueba con
  grabaciones es la primera fase, con precio cerrado y aparte de la
  consultoría gratuita; después, instalación y cuota mensual; no se compra
  ningún equipo (se instala en un ordenador o servidor del cliente, o en su
  nube).

- 2026-11-24 · Control con cámaras, segunda tanda: landing de
  supermercados (parking como contador de visitas, previsión de cola,
  derrames y aseos según el uso, con vídeo de 1:41 y captura del panel del
  gerente) y de limpieza (empresas de limpieza e instalaciones), "Tiendas y
  supermercados" separado en dos, artículo
  `camaras-con-ia-en-supermercados` con el vídeo y el primer artículo con
  secciones de supermercados y limpieza.

- 2026-11-24 · Control con cámaras e IA: ficha del servicio en castellano e
  inglés (con "Dónde se usa" por sector), grupo propio en `/servicios` y en la
  home con enlaces a las landings, cinco landings por sector con "Qué
  medimos" y privacidad, landing de Google Ads, opción nueva en el objetivo
  del formulario (puntúa como automatización), contexto en el chat de
  precualificación, `llms.txt` y metadatos de `/servicios`. Vídeo de 1:29
  (simulación: cámara de la terraza, aviso al encargado y panel del
  gerente) en la ficha, la landing de Google Ads y la de restaurantes, con
  captura del panel en esta última. Artículo
  `camaras-con-ia-para-controlar-tu-negocio` con el vídeo.

- 2026-11-23 · Radar del 23-nov (cifras comprobadas en fuente primaria):
  "ejemplos de automatización" pasa de 12 a 15 (presupuesto cerrado en un
  minuto, atender a los agentes de IA de tus clientes, revisión contable con
  firma humana; tabla de ejemplos reales de noviembre y FAQ "¿un agente puede
  llamar a mi negocio?") para atacar las búsquedas en posición 23 y 30.
  "Coste de un agente en producción" añade cómo se factura (cuota fija y
  consumo con margen por escrito, referencia Thunderphone). n8n 3.0: title
  con "estable en diciembre" y estado a fecha. Enlaces internos "doce" →
  "quince".

- 2026-11-20 · Chat de precualificación activo en producción
  (`ANTHROPIC_API_KEY` en Vercel). Prueba completa: formulario → chat de 4
  preguntas → cierre → nota en GHL sin errores. #67: si falla una respuesta,
  el mensaje vuelve a la caja en vez de bloquear el chat.
- 2026-11-18 · Categoría "AI Workflow & Business Automation" en ES y EN
  (title y description de la home, hero, pie, schema `slogan` y
  `knowsAbout`, llms.txt). Chat de precualificación con Claude tras el
  formulario (inactivo hasta poner la clave). Cuatro comparativas:
  `n8n-vs-make-vs-zapier`, `gohighlevel-vs-hubspot`,
  `agencia-automatizacion-vs-freelance-vs-equipo-interno` y
  `vapi-vs-retell`; la sección "GoHighLevel vs HubSpot" de
  `que-es-gohighlevel` queda en resumen con enlace para no canibalizar.
  Revisar precios en diciembre (n8n 3.0 estable, oferta de HubSpot Starter)
  y confirmar el precio de Make en su web.
- 2026-11-18 · Modelo de venta (referencia HappyRobot,
  `docs/MODELO-DE-VENTA.md`): email en el hero y el cierre que llega ya
  escrito al paso 1 de `/diagnostico`, evento GA4 `email_cta`; banda de
  cuatro cifras de casos propios etiquetadas por objeción; tres FAQ de
  objeciones en la home (sustituir al equipo, datos y AI Act, cómo sé que
  compensa), también en el FAQPage.
- 2026-11-18 · Indexación pedida en Search Console (cola prioritaria) para
  los cuatro artículos cambiados en #63 y las dos URLs pendientes del 16-nov:
  `/en/soluciones/agencias-de-marketing` (aún no estaba en Google) y
  `/servicios/agente-ia-whatsapp`. IndexNow aceptó 6 URLs, incluida la
  redirigida. Las 4 páginas nuevas del 11-nov ya están indexadas.

- 2026-11-18 · Canibalización del pilar y de "a medida". "Automatización de
  procesos con IA" se la repartían tres artículos, todos en la posición
  80-90: el title de ejemplos pasa a "12 ejemplos de automatización de
  procesos en una pyme, con IA" y el de herramientas a "Herramientas de IA
  para automatizar procesos", y los dos enlazan al pilar con ese texto.
  `desarrollo-a-medida-con-ia-cuando-construir` (pos 42 para "proyectos de
  ia a medida", sin clics) se redirige con un 301 a
  `proyectos-de-ia-a-medida-ejemplos-plazos-precio` (pos 11,6), que recoge
  su sección sobre Lovable y la pregunta de si es lo que te diferencia.
  Licitaciones: title "Generador de propuestas para licitaciones con IA"
  (la búsqueda está en la posición 16,7). La home no compite por la
  consulta de automatización (16 impresiones en 28 días, casi todas de
  marca): revisión del title cerrada.

- 2026-11-16 · Indexación pedida en Search Console (cola prioritaria) para
  9 URLs: `/soluciones/agencias-de-marketing` y `/blog/ai-act-chatbot-decir-que-es-ia`
  (las dos aún no estaban en Google), `/blog/propuestas-licitaciones-con-ia`,
  `/blog/como-cualificar-leads-automaticamente`, `/servicios/formacion-ia-empresas`,
  `/en/diagnostico`, `/casos-de-exito`, `/soluciones` y
  `/blog/cobrar-la-ia-por-resultado`. Cupo diario agotado antes de las dos
  últimas (ver "Código").

- 2026-11-16 · Mejoras de web del radar del 16-nov. Página nueva
  `/soluciones/agencias-de-marketing` (ES y EN), primera del listado de
  sectores, con los casos de Tribeca Media y Growth4U; la home enlaza ahí
  desde la tarjeta de agencias (antes iba a la landing y, en inglés, al caso
  de Tribeca). Title y meta de /soluciones con agencias. `/en/diagnostico`:
  title "Free process automation assessment (30 min)" para la búsqueda en
  posición 5,7 con 0 clics. Formación en IA: pregunta frecuente sobre la
  bonificación de FUNDAE (datos de la FAQ oficial de fundae.es: crédito
  mínimo de 420 € para 1-5 personas, porcentajes por tamaño, cofinanciación,
  comunicar el inicio hasta dos días antes y la finalización), y mención en
  la meta y en el precio.

- 2026-11-16 · Radar del 16-nov. Propuestas para licitaciones: sección
  nueva "¿Hay una herramienta que redacte la oferta técnica de una
  licitación?" (la búsqueda está en la posición 8,7), con el segundo agente
  que revisa la oferta contra el pliego, y su pregunta frecuente. Cualificar
  leads: title y description nuevos (fuera el 80% sin fuente), respuesta
  corta, sección de señales, agente que investiga la cuenta y aprobación
  humana (Rox, 100 M$, Fortune) y cuatro preguntas frecuentes.

- 2026-11-11 · Casos y mantenimiento (radar del 11-nov). Hospital Capilar
  sale siempre como proyecto "con Growth4U": tarjeta de /casos-de-exito,
  title, meta y H1 de su caso, /soluciones y la pregunta del Booking SDR. La
  meta de /casos-de-exito ya no abre con su −32%: abre con Eventos Barcelona
  y Tribeca. En "Cómo cualificar leads" se quitan el 40% y el 60% (no estaban
  confirmados) y queda el −32% de coste por paciente, con Growth4U. Growth4U
  sigue como caso propio (cliente de Rianex, confirmado el 11-nov). Bloque
  fijo "Mantenimiento mensual" (`src/lib/mantenimiento.ts`) en agente de
  WhatsApp, automatización de procesos e implantación de CRM, y sección
  "Cómo controlamos lo que hace la IA" en /casos-de-exito, con datos de
  Tribeca. Sin nombrar competidores ni bajar precios.

- 2026-11-11 · Radar del 11-nov. Artículo nuevo "Tu chatbot tiene que decir
  que es una IA: qué exige el AI Act" (`/blog/ai-act-chatbot-decir-que-es-ia`),
  con cifras y citas comprobadas en el DOUE (vía BOE), el Ómnibus 2026/1744 y
  las directrices de la Comisión sobre el art. 50; enlazado desde RGPD,
  recepción de clínicas y la ficha del agente de WhatsApp. Actualizados:
  cobrar por resultado (Zendesk y "cobrar solo lo que pasa un control"),
  recepción de clínica (lo que el agente nunca confirma sin mirar el sistema;
  el caso de r/n8n del veterinario no se pudo comprobar y no se cita) y
  agentes con aprobación humana (Bay, 50 M$).

- 2026-11-11 · Indexación pedida en Search Console (cola prioritaria) para
  las cuatro URLs nuevas que Google aún no conocía:
  `/blog/cobrar-la-ia-por-resultado`, `/servicios/asesoramiento-ia`,
  `/servicios/formacion-ia-empresas` y `/servicios/kit-ia`. IndexNow enviado
  para esas cuatro y para los dos artículos editados en el #56 (6 URLs).
  Bing revisado: 22 URLs indexadas.

- 2026-11-11 · Posicionamiento aclarado por Ramiro: Rianex es una agencia
  de automatización con IA, y un MVP o un pequeño software puede ser el
  resultado de automatizar un proceso. Se corrige donde la web decía "no
  desarrollamos aplicaciones": la sección "No es empezar por una aplicación"
  y la FAQ "¿Hacéis aplicaciones a medida?" de proyectos de IA a medida, y el
  cierre de "Desarrollo a medida con IA o automatización", con la app de
  propuestas de Eventos Barcelona como ejemplo. La base del bot de GHL
  (`rianex-chatbot-kb.md`, fuera del repo) se actualiza igual y hay que
  pegarla en el bot.

- 2026-11-09 · Las tarjetas de sector de la home (ES) llevan a su landing
  `/l/<nicho>`; en EN siguen a páginas en inglés porque las landings solo
  están en castellano. El logo de las landings vuelve a la home.

- 2026-11-09 · Landings por nicho en `/l/<nicho>`, a petición de Ramiro
  (las por servicio eran un malentendido; se quedan para Google Ads de
  búsqueda): agencias de marketing (casos Tribeca y Growth4U), empresas de
  eventos (Eventos Barcelona), clínicas (Hospital Capilar con Growth4U, con
  el bloque de datos de salud), inmobiliarias y negocios con cita previa (sin
  caso propio: la banda de prueba lo dice sin inventar cifras). Clínicas y
  eventos reutilizan el texto de /soluciones y llevan canonical a esa página.
  Piezas comunes en `src/components/landing/Partes.tsx`.

- 2026-11-09 · Landings de conversión por servicio en `/l/<servicio>` (11,
  solo en castellano), para campañas: sin menú ni chat, titular de resultado,
  vídeo o ejemplo paso a paso, prueba, "es para ti si", qué incluye, cómo
  empezamos, casos, el formulario de la consultoría dentro de la página y
  FAQ. Con `noindex, follow` y canonical a la ficha de `/servicios`, fuera
  del sitemap. Origen del lead (landing + UTM) en el payload, en etiquetas de
  GoHighLevel y en el evento `generate_lead` de GA4 (`src/lib/origen.ts`).

- 2026-11-09 · "Para quién trabajamos": talleres mecánicos sale de las
  tarjetas principales y pasa a "Y también", a petición de Ramiro. Quedan
  cinco: agencias de marketing y eventos (más anchas, con casos), y clínicas
  y hospitales, inmobiliarias y negocios con cita previa. Fuera también de la
  entradilla y de la FAQ.

- 2026-11-09 · "Para quién trabajamos": inmobiliarias y negocios con cita
  previa pasan por delante de talleres mecánicos, a petición de Ramiro. Orden:
  agencias de marketing, eventos, clínicas y hospitales, inmobiliarias,
  negocios con cita previa y talleres (también en la entradilla y la FAQ).

- 2026-11-09 · Artículo "Cobrar la IA por resultado: qué puede copiar una
  pyme de Sierra" (`/blog/cobrar-la-ia-por-resultado`, cluster agentes-ia),
  idea del radar del 9-nov. Cifras comprobadas en la fuente primaria: Sierra
  (su blog, 30-oct), Fin (página de precios y ayuda de Intercom), Revolut
  (The Register, 3-nov; cifras de la empresa sin auditar) y Vapi (su
  calculadora). El ejemplo de coste por cita usa supuestos redondos marcados
  como tales; no se dan tarifas de Meta por mensaje porque las fuentes no
  coinciden. Enlazado desde la ficha del agente de WhatsApp.

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
