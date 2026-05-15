import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  COOKIE_OPTIONS,
  isValidEmail,
  normalizeEmail,
} from "./cookie";
import type { Session } from "./types";

export type { Session } from "./types";

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!isValidEmail(value)) return null;
  return { email: normalizeEmail(value) };
}

export async function setSession(email: string): Promise<void> {
  if (!isValidEmail(email)) throw new Error("Email inválido");
  const store = await cookies();
  store.set(COOKIE_NAME, normalizeEmail(email), COOKIE_OPTIONS);
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
