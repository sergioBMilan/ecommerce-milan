type Listener = () => void;

const listeners = new Set<Listener>();

export function emit(): void {
  for (const l of listeners) l();
}

export function addListener(l: Listener): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
