export type CartProduct = {
  slug: string;
  name: string;
  priceCents: number;
};

export type CartItem = CartProduct & {
  qty: number;
};
