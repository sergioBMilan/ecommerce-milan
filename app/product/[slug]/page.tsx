// TODO Fase A: mostrar datos básicos del producto, botón "Agregar al carrito"
// TODO Fase B: traer datos desde el MCP del Ej 1 + sección de recomendados

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Producto: {slug}</h1>
      <p className="text-neutral-600 mb-4">
        Placeholder — implementar detalle del producto y recomendados.
      </p>
      <div className="flex gap-4">
        <a href="/cart" className="underline">Agregar al carrito</a>
        <a href="/" className="underline">Volver al catálogo</a>
      </div>
    </div>
  );
}
