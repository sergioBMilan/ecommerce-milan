import { describe, it, expect } from "vitest";
import { matchProductsByText } from "../lib/search";

const fixture = [
  { slug: "a", name: "Milán Urbana 01", description: "Bicicleta urbana ideal para ciclorrutas." },
  { slug: "b", name: "Milán MTB Trail", description: "Mountain bike para senderos." },
  { slug: "c", name: "Milán Ruta Elite", description: "Bicicleta de ruta premium, grupo Shimano." },
  { slug: "d", name: "Milán Kids 16", description: "Bicicleta infantil rin 16, con rueditas." },
];

describe("matchProductsByText", () => {
  it("devuelve todos los productos cuando el query está vacío", () => {
    expect(matchProductsByText(fixture, "")).toHaveLength(fixture.length);
  });

  it("filtra por substring en description (case-insensitive)", () => {
    const result = matchProductsByText(fixture, "urbana");
    expect(result.map((p) => p.slug)).toEqual(["a"]);
  });

  it("también busca en name", () => {
    const result = matchProductsByText(fixture, "kids");
    expect(result.map((p) => p.slug)).toEqual(["d"]);
  });

  it("ignora mayúsculas/minúsculas y espacios alrededor", () => {
    const result = matchProductsByText(fixture, "  BICICLETA  ");
    expect(result.map((p) => p.slug).sort()).toEqual(["a", "c", "d"]);
  });

  it("devuelve [] cuando no hay coincidencias", () => {
    expect(matchProductsByText(fixture, "patineta")).toEqual([]);
  });
});
