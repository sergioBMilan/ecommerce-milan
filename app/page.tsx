import Link from "next/link";
import { searchProducts } from "../lib/search";
import { getRecommendations } from "../lib/recommendations";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const products = await searchProducts(q);

  const exclude = new Set(products.map((p) => p.slug));
  const recommendations = q ? await getRecommendations(q, exclude) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Catálogo</h1>

      <form action="/" method="get" className="mb-6">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Buscar bicicletas…"
          className="border border-neutral-300 rounded px-3 py-2 w-80"
        />
      </form>

      {q && (
        <p className="text-sm text-neutral-600 mb-3">
          {products.length} resultado(s) para “{q}”
        </p>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {products.map((p) => (
          <li key={p.slug} className="border border-neutral-200 rounded p-3">
            <Link href={`/product/${p.slug}`} className="font-medium underline">
              {p.name}
            </Link>
            <p className="text-sm text-neutral-600">{p.description}</p>
          </li>
        ))}
      </ul>

      {products.length === 0 && (
        <p className="text-neutral-600">Sin resultados.</p>
      )}

      {recommendations.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Te puede interesar</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recommendations.map((p) => (
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
    </div>
  );
}
