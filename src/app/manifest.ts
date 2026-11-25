import type { MetadataRoute } from "next";

// Manifiesto web: nombre, color e icono al guardar la web en el movil.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rianex",
    short_name: "Rianex",
    description: "Agencia de automatización con IA",
    start_url: "/",
    display: "browser",
    background_color: "#FBFBF8",
    theme_color: "#FBFBF8",
    icons: [{ src: "/icon.png", type: "image/png", sizes: "256x256" }],
  };
}
