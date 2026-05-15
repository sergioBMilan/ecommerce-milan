import { describe, it, expect } from "vitest";
import { isValidEmail, normalizeEmail, COOKIE_OPTIONS, COOKIE_NAME } from "../lib/session/cookie";

describe("session cookie helpers", () => {
  it("acepta emails con sintaxis válida", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("user.name+tag@example.com")).toBe(true);
  });

  it("rechaza valores no-string o sintaxis inválida", () => {
    expect(isValidEmail(undefined)).toBe(false);
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("no-arroba")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail(42)).toBe(false);
  });

  it("normaliza recortando espacios y a minúsculas", () => {
    expect(normalizeEmail("  Foo@Bar.CO  ")).toBe("foo@bar.co");
  });

  it("la cookie es httpOnly, SameSite=lax, path=/ y tiene maxAge > 0", () => {
    expect(COOKIE_OPTIONS.httpOnly).toBe(true);
    expect(COOKIE_OPTIONS.sameSite).toBe("lax");
    expect(COOKIE_OPTIONS.path).toBe("/");
    expect(COOKIE_OPTIONS.maxAge).toBeGreaterThan(0);
  });

  it("el nombre de cookie es estable", () => {
    expect(COOKIE_NAME).toBe("milan_session");
  });
});
