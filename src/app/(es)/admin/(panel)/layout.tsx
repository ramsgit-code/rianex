import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Providers } from "@/components/Providers";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  return (
    <Providers>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </Providers>
  );
}
