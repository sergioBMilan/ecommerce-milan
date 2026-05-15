"use client";

import { useEffect, useState } from "react";
import { getCart, setCartItem, subscribe, type CartItem } from "../../lib/cart";

function formatCOP(cents: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function CartView() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(getCart());
    setReady(true);
    return subscribe(() => setItems(getCart()));
  }, []);

  if (!ready) return <p className="text-neutral-600">Cargando carrito…</p>;

  if (items.length === 0) {
    return (
      <div>
        <p className="text-neutral-600 mb-4">Tu carrito está vacío.</p>
        <a href="/" className="underline">Volver al catálogo</a>
      </div>
    );
  }

  const total = items.reduce((s, i) => s + i.priceCents * i.qty, 0);

  return (
    <div>
      <ul className="divide-y divide-neutral-200 border border-neutral-200 rounded mb-6">
        {items.map((i) => (
          <li key={i.slug} className="flex items-center justify-between p-3">
            <div>
              <a href={`/product/${i.slug}`} className="font-medium underline">
                {i.name}
              </a>
              <p className="text-sm text-neutral-600">
                {formatCOP(i.priceCents)} × {i.qty} = {formatCOP(i.priceCents * i.qty)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCartItem(i, i.qty - 1)}
                className="border border-neutral-300 rounded w-8 h-8"
              >
                −
              </button>
              <span className="w-6 text-center">{i.qty}</span>
              <button
                type="button"
                onClick={() => setCartItem(i, i.qty + 1)}
                className="border border-neutral-300 rounded w-8 h-8"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setCartItem(i, 0)}
                className="text-sm underline ml-2"
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold mb-4">Total: {formatCOP(total)}</p>
      <a href="/" className="underline">Seguir comprando</a>
    </div>
  );
}
