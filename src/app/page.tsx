import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { id: true, name: true, company: true, role: true, quote: true },
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const testimonials = await getTestimonials();

  return (
    <>
      <Hero />
      <Testimonials items={testimonials} />
      {/* pasos: ocultos en móvil (home light), visibles en escritorio */}
      <div className="hidden sm:block">
        <Process />
      </div>
    </>
  );
}
