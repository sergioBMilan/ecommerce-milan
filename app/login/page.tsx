import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/");
  const { error } = await searchParams;

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      <p className="text-neutral-600 mb-4">
        Solo ingresa tu correo. Esto es una simulación — no se pide contraseña.
      </p>
      <form action={loginAction} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder="tu@correo.com"
          className="border border-neutral-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-neutral-900 text-white px-4 py-2 rounded self-start"
        >
          Entrar
        </button>
      </form>
      {error && (
        <p className="text-red-600 text-sm mt-3">
          Correo inválido. Intenta de nuevo.
        </p>
      )}
    </div>
  );
}
