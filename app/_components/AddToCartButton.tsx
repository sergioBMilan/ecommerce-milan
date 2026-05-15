"use client";

import { getCart, setCartItem, type CartProduct } from "../../lib/cart";

export function AddToCartButton({ product }: { product: CartProduct }) {
  const handleClick = () => {
    const current = getCart().find((i) => i.slug === product.slug);
    setCartItem(product, (current?.qty ?? 0) + 1);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-neutral-900 text-white px-4 py-2 rounded"
    >
      Agregar al carrito
    </button>
  );
}
