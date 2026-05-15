import { beforeEach, describe, it, expect, vi } from "vitest";
import { getCart, setCartItem, subscribe } from "../lib/cart";

const PRODUCT_A = { slug: "a", name: "A", priceCents: 1000 };
const PRODUCT_B = { slug: "b", name: "B", priceCents: 2000 };

beforeEach(() => {
  window.localStorage.clear();
});

describe("cart module", () => {
  it("getCart() returns [] when storage is empty", () => {
    expect(getCart()).toEqual([]);
  });

  it("setCartItem() adds a new item", () => {
    setCartItem(PRODUCT_A, 2);
    expect(getCart()).toEqual([{ ...PRODUCT_A, qty: 2 }]);
  });

  it("setCartItem() replaces qty for existing slug", () => {
    setCartItem(PRODUCT_A, 1);
    setCartItem(PRODUCT_A, 5);
    expect(getCart()).toEqual([{ ...PRODUCT_A, qty: 5 }]);
  });

  it("setCartItem() with qty=0 removes the item", () => {
    setCartItem(PRODUCT_A, 3);
    setCartItem(PRODUCT_B, 1);
    setCartItem(PRODUCT_A, 0);
    expect(getCart().map((i) => i.slug)).toEqual(["b"]);
  });

  it("persists across getCart() calls (localStorage)", () => {
    setCartItem(PRODUCT_A, 2);
    setCartItem(PRODUCT_B, 1);
    expect(getCart()).toHaveLength(2);
  });

  it("subscribe() fires on each setCartItem()", () => {
    const listener = vi.fn();
    const unsub = subscribe(listener);
    setCartItem(PRODUCT_A, 1);
    setCartItem(PRODUCT_A, 2);
    expect(listener).toHaveBeenCalledTimes(2);
    unsub();
    setCartItem(PRODUCT_A, 3);
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
