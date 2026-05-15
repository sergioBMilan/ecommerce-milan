export type SearchableProduct = {
  slug: string;
  name: string;
  description: string;
};

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
