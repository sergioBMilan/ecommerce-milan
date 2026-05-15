"use server";

import { redirect } from "next/navigation";
import { setSession, clearSession } from "../../lib/session";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  if (typeof email !== "string") redirect("/login?error=1");
  try {
    await setSession(email);
  } catch {
    redirect("/login?error=1");
  }
  redirect("/");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
