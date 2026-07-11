import type { Metadata } from "next";
import { ServiciosView } from "./ServiciosView";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Cualificación de leads, embudo de captación, Booking SDR, propuestas automáticas, CRM Go High Level y agentes de IA en servidor VPS.",
};

export default function ServiciosPage() {
  return <ServiciosView />;
}
