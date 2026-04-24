import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Sidebar, { BottomNav } from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Dashboard — BelezaRS",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ignora autenticação durante o build estático para GitHub Pages
  const isStaticBuild = process.env.GITHUB_PAGES === "true";

  let salonName = "Meu Salão";
  let ownerName = "Proprietária";

  if (!isStaticBuild) {
    const session = await auth();

    if (!session?.user) {
      redirect("/login");
    }

    if (session.user.role === "CLIENT") {
      redirect("/");
    }

    salonName = session.user.name ?? "Meu Salão";
    ownerName = session.user.name ?? "Proprietária";
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f0ebe6" }}>
      <Sidebar
        salonName={salonName}
        ownerName={ownerName}
        plan="Pro"
      />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
