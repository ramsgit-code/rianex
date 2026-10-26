import type { Prisma } from "@prisma/client";

// Hospital Capilar es cliente de Growth4U, no de Rianex: su testimonio sigue
// aprobado en la base de datos, pero la web publica no lo enseña.
const EMPRESAS_OCULTAS = ["Hospital Capilar"];

/** Filtro de los testimonios que se publican en la web. */
export const testimoniosPublicos: Prisma.TestimonialWhereInput = {
  approved: true,
  NOT: EMPRESAS_OCULTAS.map((empresa) => ({
    company: { contains: empresa, mode: "insensitive" },
  })),
};
