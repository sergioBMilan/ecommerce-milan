// TODO Fase A: mostrar al menos 1 producto hardcoded con link a /product/[slug]
// TODO Fase B: implementar grid de productos + buscador server-side

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Catálogo</h1>
      <p className="text-neutral-600 mb-4">
        Placeholder — implementar grid de productos y buscador.
      </p>
      <ul className="list-disc pl-6">
        <li>
          <a href="/product/milan-urbana-01" className="underline">
            Producto de ejemplo: Milán Urbana 01
          </a>
        </li>
      </ul>
    </div>
  );
}
