import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { TestimoniosView } from "./TestimoniosView";

export const metadata: Metadata = {
  title: "Testimonios",
  description:
    "Opiniones reales de clientes con sistemas de automatización comercial en Go High Level.",
};

export const revalidate = 60;

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, company: true, role: true, quote: true, roleEn: true, quoteEn: true, imageUrl: true },
    });
  } catch {
    return [];
  }
}

export default async function TestimoniosPage() {
  const items = await getTestimonials();
  return <TestimoniosView items={items} />;
}
