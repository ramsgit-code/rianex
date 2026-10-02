import type { Metadata } from "next";
import "./globals.css";
import { RootDocument } from "@/components/RootDocument";
import NotFound from "./(es)/not-found";

// Con dos layouts raiz, (es) y (en), una URL que no casa con ninguna ruta no
// tiene layout en el que pintarse y Next sirve su 404 generico. Este es el 404
// de la web para esos casos.

export const metadata: Metadata = {
  title: "Página no encontrada | Rianex",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="es">
      <NotFound />
    </RootDocument>
  );
}
