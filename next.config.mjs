/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      {
        source: "/servicios",
        destination: "/casos-de-exito",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
