import SalonClient from "./SalonClient";

// Pré-gera rotas estáticas para o GitHub Pages
export async function generateStaticParams() {
  // Em produção (Vercel): buscar slugs do DB via Prisma
  // Para o build estático: slugs de demonstração
  return [
    { slug: "studio-bella" },
    { slug: "studio-eclat" },
    { slug: "villa-beaute" },
    { slug: "rose-nails" },
    { slug: "maison-glow" },
  ];
}

export default async function SalonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SalonClient slug={slug} />;
}
