import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export default async function AdminBlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  } catch {
    // DB not ready
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-foreground">Blog</h1>
        <Link href="/admin/blog/new" className="btn-primary">
          Nuevo articulo
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-muted">No hay articulos. Crea el primero.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface text-muted text-left">
              <tr>
                <th className="px-4 py-2 font-medium">Titulo</th>
                <th className="px-4 py-2 font-medium">Estado</th>
                <th className="px-4 py-2 font-medium">Fecha</th>
                <th className="px-4 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground">{post.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs ${post.published ? "text-accent-text" : "text-muted"}`}
                    >
                      {post.published ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(post.updatedAt).toLocaleDateString("es-ES")}
                  </td>
                  <td className="px-4 py-3 flex gap-3 justify-end">
                    <Link href={`/admin/blog/${post.id}`} className="text-accent-text hover:underline">
                      Editar
                    </Link>
                    <DeletePostButton id={post.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
