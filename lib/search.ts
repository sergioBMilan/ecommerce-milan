export type SearchableProduct = {
  slug: string;
  name: string;
  description: string;
};

export function matchProductsByText<T extends SearchableProduct>(
  _products: T[],
  _query: string,
): T[] {
  return [];
}
