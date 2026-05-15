import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      <p className="text-neutral-600 mb-4">
        Placeholder — implementar login mock con email.
      </p>
      <Link href="/" className="underline">Volver al catálogo</Link>
    </div>
  );
}
