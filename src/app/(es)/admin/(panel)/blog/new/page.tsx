import { BlogEditor } from "@/components/admin/BlogEditor";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Nuevo articulo</h1>
      <BlogEditor />
    </div>
  );
}
