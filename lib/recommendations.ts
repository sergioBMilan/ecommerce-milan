import { prisma } from "./prisma";

export type RecommendableProduct = {
  slug: string;
  name: string;
  description: string;
};

const DEFAULT_LIMIT = 4;
const MIN_TOKEN_LENGTH = 3;

function tokenize(source: string): string[] {
  return Array.from(
    new Set(
      source
        .toLowerCase()
        .split(/[^\p{L}\p{N}]+/u)
        .filter((t) => t.length > MIN_TOKEN_LENGTH),
    ),
  );
}

export function recommendByText<T extends RecommendableProduct>(
  products: T[],
  source: string,
  excludeSlugs: ReadonlySet<string> = new Set(),
  limit: number = DEFAULT_LIMIT,
): T[] {
  const tokens = tokenize(source);
  if (tokens.length === 0) return [];

  const scored = products
    .filter((p) => !excludeSlugs.has(p.slug))
    .map((p) => {
      const haystack = p.description.toLowerCase();
      const score = tokens.reduce(
        (n, t) => n + (haystack.includes(t) ? 1 : 0),
        0,
      );
      return { product: p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name));

  return scored.slice(0, limit).map((x) => x.product);
}

export async function getRecommendations(
  source: string,
  excludeSlugs: ReadonlySet<string> = new Set(),
  limit: number = DEFAULT_LIMIT,
) {
  const products = await prisma.product.findMany();
  return recommendByText(products, source, excludeSlugs, limit);
}
