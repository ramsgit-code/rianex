// Slugs que publicaba la version anterior del blog, cuando se servia desde la
// base de datos. Google y los enlaces externos ya los conocen: cada uno manda
// al articulo actual que cubre el mismo tema.
const SLUGS_ANTIGUOS = {
  "automatizar-propuestas-comerciales": "propuestas-comerciales-automaticas",
  "agentes-ia-whatsapp-seguimiento-24-7": "whatsapp-automatizacion-ventas",
  "cualificar-leads-scoring-gohighlevel": "como-cualificar-leads-automaticamente",
  "booking-sdr-mas-reuniones-sin-ampliar-equipo": "whatsapp-automatizacion-ventas",
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
