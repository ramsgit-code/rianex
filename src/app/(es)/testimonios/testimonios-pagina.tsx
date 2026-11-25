import { prisma } from "@/lib/prisma";
import { testimoniosPublicos } from "@/lib/testimonios";
import { TestimoniosView } from "./TestimoniosView";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import type { Lang } from "@/lib/i18n";



async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: testimoniosPublicos,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, company: true, role: true, quote: true, roleEn: true, quoteEn: true, imageUrl: true },
    });
  } catch {
    return [];
  }
}

export async function Testimonios({ lang }: { lang: Lang }) {
  const items = await getTestimonials();
  return (
    <>
      <ListingJsonLd path="/testimonios" lang={lang} />
      <TestimoniosView items={items} />
    </>
  );
}
