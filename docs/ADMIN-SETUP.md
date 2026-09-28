# Panel Admin y despliegue — Configuracion

## 1. Supabase (PostgreSQL)

Hacen falta **dos** cadenas de conexion, no una:

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ve a **Project Settings → Database**.
3. `DATABASE_URL` — **Connection pooler**, modo Transaction, puerto **6543**.
   Anade `?pgbouncer=true` si no viene. Es la que usa la web: aguanta las
   conexiones cortas de las funciones serverless de Vercel.
4. `DIRECT_URL` — conexion **directa**, puerto **5432**. Solo la usa Prisma CLI
   para migrar.

> Por que dos: PgBouncer en modo transaction no soporta los advisory locks que
> usa `prisma migrate deploy`. Contra el pooler las migraciones fallan. Con
> `directUrl` en el schema, Prisma usa la directa para migrar y la del pooler
> en tiempo de ejecucion.

## 2. Migraciones

```bash
cp .env.example .env.local
# Rellena DATABASE_URL y DIRECT_URL

npx prisma migrate deploy
# o en desarrollo:
npx prisma db push
```

## 3. Admin login

```bash
npm run admin:hash -- tu-password-segura
```

Copia el resultado en `.env.local`:

```env
ADMIN_EMAIL=tu@email.com
ADMIN_PASSWORD_HASH=...
NEXTAUTH_SECRET=...   # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

En produccion, `NEXTAUTH_URL` tiene que ser `https://www.rianex.es`.

No existe ninguna variable `ADMIN_PASSWORD` en claro: la unica que se lee es el
hash.

## 4. Limite de peticiones

Sin `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`, el limitador cae a un
contador **en memoria del proceso**, que en Vercel no limita nada: cada
instancia serverless tiene el suyo y basta con que la funcion escale para
saltarselo. En local da igual; en produccion hay que configurarlo.

La forma corta: en el proyecto de Vercel, **Storage → Upstash (Redis)**. La
integracion inyecta las dos variables sola. Sirve cualquier Redis de Upstash.

Protege `/api/leads`, `/api/leads/partial`, `/api/testimonials`, `/api/track` y
el login del admin.

## 5. Analitica y Search Console

| Variable | Donde se saca |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 → Administrar → Flujos de datos → `G-XXXXXXXXXX` |
| `GOOGLE_SITE_VERIFICATION` | Search Console → Propiedad de prefijo de URL → Etiqueta HTML → **solo el valor de `content`** |

Las dos son opcionales: si faltan, GA4 no se carga y no se emite la etiqueta de
verificacion.

GA4 va en **Consent Mode v2**: arranca con todo denegado y solo mide si el
visitante acepta el aviso de cookies. Las senales publicitarias quedan
denegadas siempre. Para comprobarlo, mira la peticion a
`google-analytics.com/g/collect`: debe llevar `gcs=G101` y `npa=1`, y no debe
existir antes de aceptar.

En Search Console conviene dar de alta la propiedad como **dominio**
(`rianex.es`, verificada por DNS) para que cubra `www` y `no-www` a la vez, y
enviar `https://www.rianex.es/sitemap.xml`. El sitemap ya declara las dos
versiones de idioma.

## 6. Vercel

Variables obligatorias:

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`

Recomendadas: `UPSTASH_REDIS_REST_*`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
`GOOGLE_SITE_VERIFICATION`, y las `GHL_*` para sincronizar con Go High Level.

El **Build Command** se deja en el de por defecto (`npm run build`, que ya hace
`prisma generate && next build`).

> No metas `prisma migrate deploy` en el Build Command: migraria la base de
> produccion en cada build, incluidos los de preview de cada rama. Las
> migraciones se lanzan a mano o desde un paso aparte del despliegue.

## 7. Idiomas

El castellano vive en la raiz (`/servicios`) y el ingles bajo `/en`
(`/en/servicios`), con hreflang reciproco. Al anadir una pagina nueva hay que
crear tambien su version en `src/app/en/`, que reexporta la misma pagina y solo
cambia el metadata. Ver `src/lib/i18n.ts`.

Las paginas legales (`/privacidad`, `/cookies`) estan solo en castellano a
proposito.

## 8. Uso del admin

| Seccion | Funcion |
|---------|---------|
| Dashboard | Resumen leads, visitas, conversion |
| Blog | Crear, editar, publicar articulos |
| Leads | Ver envios del formulario de diagnostico |
| Analytics | Visitas, top paginas, conversion diagnostico |

La analitica propia solo registra visitas de quien ha aceptado el aviso de
cookies, asi que las cifras del panel son mas bajas que el trafico real. GA4,
en las mismas condiciones, tampoco cuenta a quien rechaza.
