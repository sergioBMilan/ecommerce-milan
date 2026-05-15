import { getSession } from "../../lib/session";
import { logoutAction } from "../login/actions";

export async function HeaderSession() {
  const session = await getSession();
  if (!session) {
    return (
      <a href="/login" className="underline">
        Iniciar sesión
      </a>
    );
  }
  return (
    <form action={logoutAction} className="flex items-center gap-2">
      <span className="text-neutral-700">{session.email}</span>
      <button type="submit" className="underline">
        Salir
      </button>
    </form>
  );
}
