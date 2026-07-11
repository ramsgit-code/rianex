import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogEditor } from "@/components/admin/BlogEditor";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  let post;
  try {
    post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  } catch {
    notFound();
  }
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Editar articulo</h1>
      <BlogEditor
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          description: post.description,
          content: post.content,
          titleEn: post.titleEn ?? "",
          descriptionEn: post.descriptionEn ?? "",
          contentEn: post.contentEn ?? "",
          tags: post.tags.join(", "),
          published: post.published,
        }}
      />
    </div>
  );
}
