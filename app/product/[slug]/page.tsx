import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { getRecommendations } from "../../../lib/recommendations";

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

  const similar = await getRecommendations(
    `${product.name} ${product.description}`,
    new Set([product.slug]),
  );

  return (
    <article className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
      <p className="text-sm text-neutral-500 uppercase mb-4">{product.category}</p>

      <p className="text-xl font-semibold mb-4">{formatCOP(product.priceCents)}</p>

      <p className="text-neutral-700 mb-6">{product.description}</p>

      <div className="flex gap-4">
        <Link
          href="/cart"
          className="bg-neutral-900 text-white px-4 py-2 rounded"
        >
          Agregar al carrito
        </Link>
        <Link href="/" className="underline self-center">Volver al catálogo</Link>
      </div>

      {similar.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Productos similares</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {similar.map((p) => (
              <li key={p.slug} className="border border-neutral-200 rounded p-3">
                <Link href={`/product/${p.slug}`} className="font-medium underline">
                  {p.name}
                </Link>
                <p className="text-sm text-neutral-600">{p.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
