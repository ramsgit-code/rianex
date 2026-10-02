# Blog: contenido, contrato y descubrimiento

## Cómo se publica un artículo

Los artículos viven en `src/content/blog/*.mdx` y el nombre del fichero es el
slug de la URL. **La web los lee directamente de ahí en el build**
([`src/lib/blog.ts`](../src/lib/blog.ts)): listado, artículo, imagen social,
sitemap, RSS y `llms.txt` salen del mismo lote. Publicar es hacer commit del
`.mdx` con `draft: false` y desplegar.

```bash
npm run blog:check    # valida el lote sin desplegar
```

Si un artículo no cumple el contrato, **falla el build** y no se despliega
nada: es preferible quedarse sin publicar a publicar media tanda.

Antes el blog público se leía de la base de datos y cada ruta se tragaba el
error de la consulta por su cuenta. Eso acabó con un listado que enlazaba a
artículos en 404, un sitemap mandando a Google a esos 404 y un `llms.txt` que
decía que el blog estaba vacío. La tabla `BlogPost` y el editor del panel
siguen existiendo, pero **ya no alimentan la web pública**; `npm run
blog:import` solo sincroniza la tabla.

Los artículos solo existen en castellano: `/en/blog/<slug>` redirige al
original y no se declara hreflang en ellos. Los slugs de la versión anterior
del blog redirigen con 301 al artículo actual del mismo tema
(`SLUGS_ANTIGUOS` en `next.config.mjs`). Si se renombra un `.mdx`, el slug
viejo se añade ahí.

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
author: "Ramiro Pérez Rodero"
linkPolicy: "nofollow"
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

## Enlaces salientes y colaboraciones

Todo enlace externo salía dofollow hasta ahora, porque el `rel` era solo
`noopener noreferrer`. En un blog propio da igual. Publicando artículos de
colaboradores significa repartir autoridad sin haberlo decidido.

**El defecto es `nofollow`**, a propósito: si a alguien se le olvida marcar un
enlace, el fallo cae del lado que no regala nada. Enlazar en dofollow pasa a ser
un acto deliberado, que es lo que debería ser.

### Por artículo

`linkPolicy` en el frontmatter se aplica a todos los enlaces externos que no
traigan marca propia:

| Valor | Cuándo |
|---|---|
| `nofollow` | Defecto. No respondemos de ese destino |
| `follow` | Artículo propio donde citamos fuentes porque lo valen |
| `sponsored` | Hay dinero, intercambio o contraprestación de por medio |
| `ugc` | Lo escribió un tercero (colaborador invitado) |

Un artículo recibido de un colaborador se marca **entero** aquí, en vez de ir
enlace por enlace y arriesgarse a olvidar uno.

### Por enlace

El tercer parámetro del enlace (el atributo `title` estándar de Markdown) fija
la política de ese enlace concreto y gana sobre la del artículo:

```markdown
[una fuente](https://ejemplo.com "follow")
[el patrocinador](https://ejemplo.com "sponsored")
```

Esto permite que dentro de un artículo marcado `sponsored` se pueda citar una
fuente legítima en dofollow, que es lo razonable.

Los enlaces internos (los que empiezan por `/`) no llevan `rel` y no les afecta
nada de esto.

### Sobre intercambios de enlaces

`sponsored` y `ugc` llevan también `nofollow`, porque los atributos de Google
son pistas y sin `nofollow` otros buscadores siguen el enlace igual.

Conviene saber que el intercambio recíproco sistemático ("enlázame y te
enlazo") es el ejemplo que Google pone de esquema de enlaces. Lo habitual no es
una penalización: es que esos enlaces no cuenten. Marcarlos bien no es una
formalidad, es lo que separa una colaboración de un esquema.

## Descubrimiento

| Ruta | Qué es |
|---|---|
| `/sitemap.xml` | Todas las páginas, con hreflang de las dos versiones de idioma |
| `/rss.xml` | Feed del blog. Declarado en el `<head>` para que los lectores lo encuentren |
| `/llms.txt` | Índice del sitio para modelos de lenguaje, agrupado por cluster |
| `/og/blog/<slug>` | Imagen social generada por artículo, con su titular |

`llms.txt` se **genera** en cada build desde los `.mdx` del blog y desde el
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
