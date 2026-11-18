# Modelo de venta de la web

Referencia: cómo vende HappyRobot (happyrobot.ai) en su web, revisado el
18-nov-2026, y qué se ha adaptado a rianex.es. Copiamos el sistema, no los
textos ni la marca. Regla que no cambia: ninguna cifra, logo ni testimonio
sin un caso real publicado (ver `PRODUCT.md`).

## Su sistema en una línea

Un solo CTA ("Book a demo") repetido en todo el sitio, con el email en el
hero. Debajo, cifras de clientes etiquetadas por la objeción que responden.
Páginas por sector y por función que bajan a casos de uso con verbo. FAQ que
responden objeciones. Hub SEO de comparativas. Y, tras captar el lead, su
propio agente de IA prepara la demo.

## Mecanismo por mecanismo

| # | Mecanismo de HappyRobot | En rianex.es | Estado |
|---|---|---|---|
| 1 | Email en el hero y el cierre → formulario en 2 pasos con el email ya puesto | `EmailCta` en hero y cierre → `/diagnostico?email=` prellena el paso 1 | Hecho (18-nov) |
| 2 | Tras enviar: calendario del comercial o "habla con nuestro agente (3 min)" | Calendario de GHL prellenado tras enviar | Falta el agente: decisión de Ramiro (abajo) |
| 3 | Cifras de cliente etiquetadas por objeción (escala, CSAT, rendimiento, velocidad) | Banda de 4 cifras en el hero: Rapidez, Atención, Control, Alcance, cada una con enlace a su caso | Hecho (18-nov) |
| 4 | Casos con estructura fija: titular con cifra → métricas → productos → cita → reto/qué funciona/resultados | Fichas en `casos.ts` con H1 con cifra, contexto, qué montamos, resultados y cita | Casi; falta bloque "Cifras clave" + servicios usados arriba |
| 5 | Páginas por sector y por función con casos de uso con verbo | `/soluciones/<sector>`, `/l/<nicho>`, `/servicios/<slug>` | Hecho; faltan inmobiliarias y negocios con cita (cola SEO) |
| 6 | "How we work": Build → Test → Deploy, "en semanas, no meses" | "Qué hacemos": consultoría → implantación (semana 4) → formación | Hecho |
| 7 | FAQ que responden objeciones (¿me sustituye?, seguridad, ROI, integración) | Añadidas en la home: sustituir al equipo, datos/RGPD/AI Act, cómo sé que compensa | Hecho (18-nov) |
| 8 | Maquetas de "trabajo hecho" (WhatsApp 23:14 → ticket cerrado) | Tablero del hero (`ProcessBoard`) y "Así funciona" en fichas | Hecho |
| 9 | Hub de comparativas "X vs Y" y "alternativas a X" con limitaciones honestas | No hay | Pendiente (cola SEO, "Código") |
| 10 | "Ingresos nuevos, no solo recortar costes" + "no sustituye a tu equipo" | En la FAQ nueva | Hecho (18-nov) |
| + | "¿Cómo nos conociste?" con opción "Asistente de IA" | Ya existía en el paso 5 | Hecho |
| + | Sellos de compliance en el pie | Sin sellos (Rianex no tiene certificaciones) | No aplica; no inventar sellos |

## Lo que no se copia

- Logos de grandes empresas, "150+ clientes", cifras agregadas (15M+
  interacciones): Rianex no las tiene y no se inventan.
- Ocultar el precio: la FAQ sigue dando rangos, que en pyme generan confianza.
- Rechazar emails personales en el formulario: el dueño de una pyme a menudo
  usa Gmail.
- Términos de visión ("superinteligencia"): no encajan con el tono sin hype.

## Medición

- GA4 `email_cta` con `origen` (hero o cierre) y `con_email`: cuántos
  arrancan desde la home y cuántos lo hacen con el email escrito.
- Comparar `generate_lead` antes y después del 18-nov.
