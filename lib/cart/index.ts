import { readFromStorage, writeToStorage } from "./storage";
import { addListener, emit } from "./events";
import type { CartItem, CartProduct } from "./types";

export type { CartItem, CartProduct } from "./types";

export function getCart(): CartItem[] {
  return readFromStorage();
}

export function setCartItem(product: CartProduct, qty: number): void {
  const current = readFromStorage();
  const others = current.filter((i) => i.slug !== product.slug);
  const next = qty > 0 ? [...others, { ...product, qty }] : others;
  writeToStorage(next);
  emit();
}

export function subscribe(listener: () => void): () => void {
  return addListener(listener);
}
