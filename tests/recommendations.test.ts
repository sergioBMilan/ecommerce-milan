import { describe, it, expect } from "vitest";
import { recommendByText } from "../lib/recommendations";

const fixture = [
  { slug: "a", name: "Bici A", description: "bicicleta urbana de aluminio para ciclorrutas" },
  { slug: "b", name: "Bici B", description: "mountain bike de carbono con suspensión" },
  { slug: "c", name: "Bici C", description: "bicicleta de ruta de carbono premium" },
  { slug: "d", name: "Bici D", description: "bicicleta infantil con rueditas" },
];

describe("recommendByText", () => {
  it("devuelve [] cuando no hay tokens > 3 caracteres", () => {
    expect(recommendByText(fixture, "a y b")).toEqual([]);
  });

  it("devuelve [] cuando ningún token coincide con descripciones", () => {
    expect(recommendByText(fixture, "patineta scooter")).toEqual([]);
  });

  it("ordena por número de tokens coincidentes desc, desempata por nombre", () => {
    const result = recommendByText(fixture, "bicicleta carbono");
    expect(result.map((p) => p.slug)).toEqual(["c", "a", "b", "d"]);
  });

  it("respeta el límite y excluye los slugs indicados", () => {
    const result = recommendByText(
      fixture,
      "bicicleta",
      new Set(["a"]),
      2,
    );
    expect(result.map((p) => p.slug)).toEqual(["c", "d"]);
  });

  it("ignora mayúsculas y acentos no relevantes", () => {
    const result = recommendByText(fixture, "URBANA");
    expect(result.map((p) => p.slug)).toEqual(["a"]);
  });
});
