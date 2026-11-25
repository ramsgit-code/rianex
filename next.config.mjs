// Slugs que publicaba la version anterior del blog, cuando se servia desde la
// base de datos. Google y los enlaces externos ya los conocen: cada uno manda
// al articulo actual que cubre el mismo tema.
const SLUGS_ANTIGUOS = {
  "automatizar-propuestas-comerciales": "propuestas-comerciales-automaticas",
  "agentes-ia-whatsapp-seguimiento-24-7": "whatsapp-automatizacion-ventas",
  "cualificar-leads-scoring-gohighlevel": "como-cualificar-leads-automaticamente",
  "booking-sdr-mas-reuniones-sin-ampliar-equipo": "whatsapp-automatizacion-ventas",
  // Se repartia "proyectos de IA a medida" con el articulo de proyectos (noviembre de 2026).
  "desarrollo-a-medida-con-ia-cuando-construir": "proyectos-de-ia-a-medida-ejemplos-plazos-precio",
  // «Cuánto cuesta» competía con la página de precio: su contenido útil pasó allí (24-nov-2026).
  "cuanto-cuesta-automatizar-un-proceso-con-ia": "proyectos-de-ia-a-medida-ejemplos-plazos-precio",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // El blog se lee de los .mdx en el build. Si alguna ruta se regenera en
  // ejecucion tiene que encontrarlos tambien en la funcion desplegada.
  outputFileTracingIncludes: {
    "/**": ["./src/content/blog/*.mdx"],
  },
  async redirects() {
    return [
      ...Object.entries(SLUGS_ANTIGUOS).flatMap(([antiguo, actual]) => [
        { source: `/blog/${antiguo}`, destination: `/blog/${actual}`, permanent: true },
        { source: `/en/blog/${antiguo}`, destination: `/blog/${actual}`, permanent: true },
      ]),
      // El servicio de agentes paso a centrarse en WhatsApp (octubre de 2026).
      { source: "/servicios/agentes-ia-vps", destination: "/servicios/agente-ia-whatsapp", permanent: true },
      { source: "/en/servicios/agentes-ia-vps", destination: "/en/servicios/agente-ia-whatsapp", permanent: true },
      // El desarrollo a medida dejo de ser un servicio (octubre de 2026).
      { source: "/servicios/desarrollo-ia-a-medida", destination: "/servicios/automatizacion-procesos-ia", permanent: true },
      { source: "/en/servicios/desarrollo-ia-a-medida", destination: "/en/servicios/automatizacion-procesos-ia", permanent: true },
      // Los articulos no tienen version en ingles: el original es el castellano.
      { source: "/en/blog/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
  experimental: {
    // 404 propio con dos layouts raiz: ver src/app/global-not-found.tsx.
    globalNotFound: true,
    // "framer-motion" ya no es dependencia del proyecto: el paquete es "motion".
    optimizePackageImports: ["lucide-react", "motion"],
  },
  async headers() {
    return [
      // Vídeos, pósters y logos: sin esto se servían con max-age=0 y el
      // navegador los revalidaba en cada visita. Un día en el navegador y una
      // semana obsoleto-mientras-revalida: si se sustituye un vídeo con el
      // mismo nombre, el cambio llega en un día.
      {
        source: "/:dir(videos|logos)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
