// Video de cada servicio (/servicios/<slug>) y de la home.
//
// Va aparte de servicios.ts para que la home, que es un componente de
// cliente, sepa que servicios tienen video sin cargar todo el texto de las
// fichas. Los videos salen del proyecto Remotion ~/rianex-videos (voz en
// castellano), renderizados a 1280x720 y comprimidos para la web.
//
// El del agente de WhatsApp es una demo con una llamada recreada (clinica
// ficticia) y la ficha lo dice. El de control con camaras (24-nov-2026) es una
// simulacion con un restaurante y datos ficticios, y su nota lo dice.
// Prospeccion B2B y los servicios de formacion y asesoramiento todavia no
// tienen video.

export type ServicioVideo = {
  src: string;
  poster: string;
  /** ISO 8601 */
  duration: string;
  /** ISO 8601 con zona horaria, lo exige Google */
  uploadDate: string;
  /** Recreacion, no un sistema real de cliente: se rotula como demo. */
  demo?: boolean;
  /** Nota bajo el video, si no vale la de la demo del agente. */
  note?: { es: string; en: string };
};

const SUBIDO = "2026-11-07T10:30:00+01:00";

const v = (name: string, duration: string, uploadDate = SUBIDO): ServicioVideo => ({
  src: `/videos/${name}.mp4`,
  poster: `/videos/${name}.jpg`,
  duration,
  uploadDate,
});

export const SERVICIO_VIDEO: Record<string, ServicioVideo> = {
  "automatizacion-procesos-ia": v("servicio-automatizacion-procesos-ia", "PT1M3S"),
  "embudo-de-captacion": v("servicio-embudo-de-captacion", "PT1M"),
  "generador-de-propuestas": v("servicio-generador-de-propuestas", "PT56S"),
  "implementacion-crm-gohighlevel": v("servicio-implementacion-crm-gohighlevel", "PT54S"),
  "integracion-gohighlevel-hubspot": v("servicio-integracion-gohighlevel-hubspot", "PT1M"),
  "migracion-a-gohighlevel": v("servicio-migracion-a-gohighlevel", "PT58S"),
  "control-con-camaras-ia": {
    ...v("servicio-control-con-camaras-ia", "PT1M29S", "2026-11-24T09:00:00+01:00"),
    note: {
      es: "Simulación con un restaurante y datos ficticios: la cámara de la terraza, el aviso al encargado y el panel del gerente.",
      en: "Simulation with a fictional restaurant and data: the terrace camera, the alert to the manager and the manager's dashboard. Narrated in Spanish.",
    },
  },
  "agente-ia-whatsapp": {
    ...v("agente-voz-whatsapp-cita", "PT1M25S", "2026-11-03T08:00:00+01:00"),
    demo: true,
  },
};
