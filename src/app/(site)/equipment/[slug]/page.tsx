import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEquipmentBySlug } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const equipment = await getEquipmentBySlug(slug);

  if (!equipment) return {};

  return {
    title: equipment.name,
    description: equipment.description,
    openGraph: {
      title: equipment.name,
      description: equipment.description,
    },
  };
}

export default async function EquipmentPage({ params }: Props) {
  const { slug } = await params;
  const equipment = await getEquipmentBySlug(slug);

  if (!equipment) notFound();

  return (
    <main>
      <h1>{equipment.name}</h1>
    </main>
  );
}
