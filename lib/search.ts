import { prisma } from "./prisma";

export type SearchableProduct = {
  slug: string;
  name: string;
  description: string;
};

export async function searchProducts(query: string) {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return matchProductsByText(products, query);
}

export function matchProductsByText<T extends SearchableProduct>(
  products: T[],
  query: string,
): T[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return products;
  return products.filter((p) => {
    const haystack = `${p.name} ${p.description}`.toLowerCase();
    return haystack.includes(needle);
  });
}
