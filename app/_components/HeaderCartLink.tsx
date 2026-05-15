"use client";

import { useEffect, useState } from "react";
import { getCart, subscribe } from "../../lib/cart";

export function HeaderCartLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getCart().reduce((s, i) => s + i.qty, 0));
    update();
    return subscribe(update);
  }, []);

  return (
    <a href="/cart" className="underline">
      Carrito{count > 0 ? ` (${count})` : ""}
    </a>
  );
}
