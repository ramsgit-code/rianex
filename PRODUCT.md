# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueños, gerentes y responsables de operaciones o ventas de pymes y empresas medianas de España y Latinoamérica. Sectores destacados en la web, en este orden (nov-2026, decisión de Ramiro): agencias de marketing y empresas de eventos (donde están los casos propios), clínicas y hospitales, inmobiliarias y negocios con cita previa; también academias, talleres mecánicos, gestorías, B2B y distribución. Saben que "deberían estar usando IA", pero no saben qué procesos se pueden automatizar, por dónde empezar ni en quién confiar. Llegan desde Google, LinkedIn o una recomendación y deciden en pocos minutos si piden una consultoría.

## Product Purpose

Rianex es una agencia de automatización con IA. Vende dos cosas, en este orden:

1. **Consultoría gratuita**: una sesión en la que se revisan los procesos de la empresa y se señala qué se puede automatizar o agilizar con IA y qué se ganaría.
2. **Asesoramiento e implantación**: acompañar a la empresa a integrar esas automatizaciones y a adoptar la IA en el día a día del equipo (diseño, construcción, puesta en producción, formación y mantenimiento).
3. **IA para el equipo** ("Otros servicios", nov-2026): Kit IA (Claude o ChatGPT con cuentas de empresa, asistente con los documentos de la empresa, plantillas por puesto, guía de datos y formación), formación en IA por perfiles y asesoramiento mensual en IA para dirección. Más servicios complementarios: mantenimiento, auditoría de agentes, control del coste de la IA y medición del punto de partida.

Mensaje central: casi cualquier proceso que se repite se puede automatizar o agilizar. Éxito = el visitante pide la consultoría gratuita (`/diagnostico`).

## Positioning

Agencia de automatización con IA dirigida por un ingeniero industrial (Ramiro Pérez), que parte del proceso de negocio y no de la herramienta: primero mapa de procesos y consultoría gratuita, luego implantación con las herramientas que la empresa ya usa. El código y la infraestructura son del cliente. No vende desarrollo de software ni apps.

## Operating Context

- Herramientas: Claude y OpenAI, n8n, Make, Zapier, tareas programadas; GoHighLevel y HubSpot como CRM; Clay, Instantly y Valley para el proceso comercial; Vapi para voz.
- Áreas automatizables que se usan como ejemplos: operativa interna, ventas y prospección, atención al cliente (WhatsApp, Telegram, voz), CRM e integraciones, captación de leads, propuestas y documentos.
- Proceso: consultoría gratuita (30 min) → diseño → implantación → entrega con formación y 30 días de soporte. Primer sistema en producción en ~4 semanas.
- Web bilingüe ES/EN (Next.js 15 + Tailwind 3), contenido en `src/lib/content.ts`, servicios en `src/lib/servicios.ts`; blog en MDX; panel admin interno.

## Capabilities and Constraints

- Las URLs de servicios (`/servicios/[slug]`), soluciones, casos y blog se conservan por SEO; los servicios actuales pasan a presentarse como ejemplos de "qué podemos automatizar".
- Los rangos de precio no aparecen en la home; solo en la FAQ.
- Voz de agencia en plural ("nosotros") con Ramiro al frente; la página `/sobre-mi` se mantiene, en el menú aparece como "Nosotros". No inventar equipo.
- Cola SEO en `docs/PENDIENTES-SEO.md`; mantener JSON-LD, metadatos y hreflang.

## Brand Commitments

- Nombre Rianex y logotipo/marca existentes en `public/logos/`.
- Español con tildes y ñ correctas; tono directo, concreto, sin hype.

## Evidence on Hand

- Eventos Barcelona: propuestas de 1-3 días a 8 minutos; −85% tiempo de respuesta. Caso propio.
- Tribeca Media: Performance Agent (Meta y Google Ads con aprobación humana), Content Agent en construcción. Caso propio; sin precios ni clientes de Tribeca.
- Growth4U: funnel de captación con scoring en GoHighLevel.
- Hospital Capilar es cliente de Growth4U: solo puede aparecer como "con Growth4U", nunca como caso propio ni en logos de la home.
- Testimonios desde la BD (filtro `src/lib/testimonios.ts`). No inventar testimonios, métricas ni clientes.

## Product Principles

1. Proceso antes que herramienta: se habla de tareas del negocio, no de tecnología.
2. La consultoría gratuita es la puerta de entrada y la acción principal de cada página.
3. Probar con casos reales y concretos; nunca cifras inventadas.
4. Claridad sobre espectáculo: el visitante entiende qué hacemos en segundos.
