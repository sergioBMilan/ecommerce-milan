# Reflexión

> Completar al cierre del ejercicio (Fase C). 5 a 10 líneas.

**¿Dónde Claude falló o se desvió del camino?**

- No usé feature branches al inicio: los primeros seis commits cayeron directo a `main` hasta que el usuario lo señaló.
- Diferí el pre-commit hook hasta el final, y un commit del ciclo Red-Green-Refactor (`9078fef`) tuvo que pasar con `--no-verify` porque el hook todavía no estaba activo cuando se activó después.
- Escribí un test de recomendaciones con un valor esperado incorrecto (omití que "carbono" también matcheaba al producto B); tuve que ajustar el test, no la implementación.
- Seguí asumiendo el MCP de Odoo que describía `CLAUDE.md` aunque el usuario no lo usaba; me corrigió y migré el catálogo a `prisma/seed.ts`.

**¿Qué intervenciones humanas fueron clave?**

- Invocar `/align` antes de codificar: fijó alcance (buscador, login falso, carrito en `localStorage`, recomendaciones) y descartó MCP.
- "Crea branches paso a paso desde ahora" — corrigió el flujo a `feat/<name>` con push y PR/merge por step.
- "¿Por qué el pre-commit está sin marcar?" — me hizo activar Husky y arreglar los `<a>` → `<Link>` que el lint pedía.
- "Las recomendaciones están implementadas?" — destapó la única feature de la rúbrica que faltaba.
- Autorización explícita del `--force-with-lease` sobre `feat/login` tras rebase.

**¿Qué harías distinto la próxima vez?**

- Activar Husky + lint + tests **en el primer commit**, antes de cualquier feature. Eso evita el dilema Red-Green vs hook.
- Branch desde el `tracer` commit en adelante; nunca tocar `main` directo.
- Leer `CLAUDE.md` y `AGENTS.md` juntos al inicio y reconciliar diferencias con el usuario antes de programar.
- Para tests, escribir aserciones después de un trace mental del input completo contra la lógica, no por intuición.
- Inicializar `git` antes de `pnpm install` para que `husky` se configure en el `prepare` script sin tener que volver a invocarlo a mano.
