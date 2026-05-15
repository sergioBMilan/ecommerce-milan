import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { AddToCartButton } from "../../_components/AddToCartButton";

function formatCOP(cents: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) notFound();

  return (
    <article className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
      <p className="text-sm text-neutral-500 uppercase mb-4">{product.category}</p>

      <p className="text-xl font-semibold mb-4">{formatCOP(product.priceCents)}</p>

      <p className="text-neutral-700 mb-6">{product.description}</p>

      <div className="flex gap-4">
        <AddToCartButton
          product={{
            slug: product.slug,
            name: product.name,
            priceCents: product.priceCents,
          }}
        />
        <a href="/" className="underline self-center">Volver al catálogo</a>
      </div>
    </article>
  );
}
