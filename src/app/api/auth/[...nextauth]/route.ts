import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth-options";
import { rateLimit } from "@/lib/rate-limit";

const handler = NextAuth(authOptions);

// Detras de este login estan todos los leads con datos personales, asi que el
// intento de credenciales se limita por IP. El resto de rutas de NextAuth
// (session, csrf, providers) las pide el propio cliente en cada carga y no
// tienen por que pasar por el limitador.
export async function POST(req: NextRequest, ctx: { params: Promise<{ nextauth: string[] }> }) {
  const { nextauth } = await ctx.params;

  if (nextauth?.[0] === "callback") {
    const limited = await rateLimit(req, 5, "auth");
    if (limited) return limited;
  }

  return handler(req, ctx);
}

export { handler as GET };
