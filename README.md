# captacion-web

Sitio de Rianex (Next.js 15 / App Router): web pública en castellano e inglés,
formulario de diagnóstico, blog y panel de administración, con Go High Level
como CRM.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # rellenar segun docs/ADMIN-SETUP.md y docs/GHL-SETUP.md
npm run dev
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` / `build` / `start` | Ciclo normal de Next.js |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run blog` | Agente que redacta posts nuevos (`scripts/blog-agent.ts`) |
| `npm run blog:import` | Publica los `.mdx` de `src/content/blog/` |
| `npm run admin:hash` | Genera `ADMIN_PASSWORD_HASH` para `.env` |
| `npm run db:push` / `db:migrate` | Prisma contra Supabase Postgres (necesita `DIRECT_URL`) |

## Estructura

```
src/app/            rutas (App Router): publicas, /en (ingles), /admin, /api
src/components/      componentes de UI, admin/ y sections/ aparte
src/lib/             integraciones (GHL, Prisma, auth, scoring, i18n, consentimiento...)
src/content/blog/    posts en .mdx
prisma/              schema + migraciones
scripts/             agentes y utilidades de mantenimiento (tsx)
docs/                notas internas: setup de admin, GHL, generacion de videos con IA
```

## Documentación

- [`docs/ADMIN-SETUP.md`](docs/ADMIN-SETUP.md) — panel de administración.
- [`docs/GHL-SETUP.md`](docs/GHL-SETUP.md) — integración con Go High Level.
- [`docs/VIDEOS-IA.txt`](docs/VIDEOS-IA.txt) / [`docs/KLING-PROMPTS.md`](docs/KLING-PROMPTS.md) — generación de los vídeos antes/después con IA.
