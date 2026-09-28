# Blog: contenido, contrato y descubrimiento

## Cómo se publica un artículo

Los artículos viven en `src/content/blog/*.mdx` y el nombre del fichero es el
slug de la URL. La web los lee de la base de datos, así que hay un paso de
importación.

```bash
npm run blog:check    # valida sin escribir nada
npm run blog:import   # valida y sincroniza con la base
```

La importación **valida todo el lote antes de escribir**. Si un artículo no
cumple el contrato, no se importa ninguno: es preferible quedarse sin publicar
a publicar media tanda y dejar la otra mitad en un estado que nadie recuerda.

## El contrato

Vive en [`src/lib/blog-schema.ts`](../src/lib/blog-schema.ts). Todo artículo
necesita este frontmatter:

```yaml
---
title: "Máximo 70 caracteres"
description: "Entre 70 y 165 caracteres"
date: "AAAA-MM-DD"
tags: ["al", "menos", "uno"]
cluster: "automatizacion-ia"
author: "Ramiro Pérez"
draft: false
---
```

Los límites no son caprichosos: Google corta el title en la SERP pasados unos
70 caracteres y la meta description pasados unos 165. Que falle la importación
es mucho más barato que descubrirlo tres semanas después en los resultados.

### Clusters

| Cluster | Para qué |
|---|---|
| `automatizacion-ia` | Automatización de procesos con IA |
| `agentes-ia` | Agentes de IA |
| `desarrollo-ia` | Desarrollo a medida con IA |
| `crm` | CRM, integraciones y migraciones |
| `captacion` | Captación y cualificación |

El cluster ordena el enlazado interno y es lo que agrupa el índice de
`llms.txt`. Para añadir uno nuevo, se añade en `CLUSTERS` y el resto se ajusta
solo.

`draft: true` deja el artículo fuera de la web.

## Sintaxis admitida en el cuerpo

El renderizador ([`src/lib/markdown.tsx`](../src/lib/markdown.tsx)) soporta un
subconjunto a propósito:

- `## ` y `### ` para encabezados
- `- ` para listas
- `**negrita**`
- `[texto](/ruta)` para enlaces

No hay tablas, listas numeradas ni bloques de código. Lo que no esté en esa
lista se renderiza como texto plano.

## Descubrimiento

| Ruta | Qué es |
|---|---|
| `/sitemap.xml` | Todas las páginas, con hreflang de las dos versiones de idioma |
| `/rss.xml` | Feed del blog. Declarado en el `<head>` para que los lectores lo encuentren |
| `/llms.txt` | Índice del sitio para modelos de lenguaje, agrupado por cluster |
| `/blog/<slug>/opengraph-image` | Imagen social generada por artículo, con su titular |

`llms.txt` se **genera** en cada revalidación desde la base de datos y desde el
contenido de los servicios. No se escribe a mano: un índice estático se queda
viejo con el siguiente artículo y acaba describiendo un sitio que ya no existe.

Sobre expectativas: Anthropic y Perplexity han confirmado que respetan
`llms.txt` al recuperar; Google dice que no le hace falta para AI Overviews y
OpenAI no se ha comprometido. Cuesta poco y no sustituye a nada. Lo que decide
la visibilidad sigue siendo que el contenido esté en el HTML y que `robots.txt`
deje pasar a los rastreadores, que es el caso.

## IndexNow

Avisa a Bing, Copilot y Yandex de las URLs nuevas en vez de esperar a que pasen
a rastrear.

```bash
npm run indexnow                        # manda todo el sitemap
npm run indexnow https://www.rianex.es/blog/mi-articulo
```

Se ejecuta **después de desplegar**. La clave está en
`public/2e18428a2e6c8459a030afcbda389de1.txt` y tiene que ser accesible en
producción, o la API rechaza el lote entero. Ese fichero no se borra.

## El agente de blog

```bash
npm run blog                       # tema de la cola
npm run blog -- --topic="..."      # tema concreto
npm run blog -- --mode=news        # partiendo de noticias del sector
```

Genera artículos con `draft: true`, así que **no se publican solos**: quedan
para revisar y hay que quitar el flag a mano. Es deliberado, porque un modelo
puede inventarse una cifra o un caso de cliente y eso no debería llegar a la web
sin que lo lea alguien.

La cola de temas está en `scripts/blog-agent.ts` y debe mantenerse alineada con
lo que la web dice que hace. Si cambia el posicionamiento, cambia la cola.
