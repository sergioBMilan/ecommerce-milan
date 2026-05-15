# AGENTS.md — Milán Ecommerce

> Este archivo orienta a Claude Code sobre cómo trabajar en este repositorio.
> Mantén cada sección **corta y operativa** — el AGENTS.md es contexto que Claude lee cada vez, no documentación general.

## Stack del proyecto

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Prisma + SQLite como **única** fuente de datos. El catálogo de 20 bicicletas se siembra desde [prisma/seed.ts](prisma/seed.ts).
- Tests con Vitest (jsdom).
- pnpm exclusivamente (ver [CLAUDE.md](CLAUDE.md)).
- **No se usa MCP** en este ejercicio — el catálogo es local.

## Alcance del proyecto (features)

1. **Buscador**: input en el header, envía con Enter, busca por `name`/`description`.
2. **Login falso**: solo pide email, lo guarda en cookie/localStorage y lo muestra en el header. Botón "Salir" lo limpia. Sin contraseña, sin auth real.
3. **Carrito**: persistido en `localStorage` (sobrevive al recargar). **No** está vinculado al login.
4. **Recomendaciones**: al buscar o al agregar al carrito, mostrar hasta 4 productos cuya `description` contenga alguno de los tokens (>3 caracteres) del término/producto actual. Excluir el producto actual.
5. **UI mínima** — la interfaz no es criterio evaluable.

## Principios de diseño

1. **La UI no toca Prisma**. Cualquier acceso a datos pasa por un módulo de `lib/` (`lib/products.ts`, `lib/cart.ts`, `lib/recommendations.ts`, `lib/session.ts`).
2. **Server Components por defecto**. Solo se marca `'use client'` cuando hay interactividad real (input del buscador, botones del carrito, formulario de login).
3. **Carrito vive en el cliente** (`localStorage`). El modelo `CartItem` de Prisma queda sin uso en este ejercicio; no escribir a SQLite para el carrito.
4. **Tipos compartidos en `lib/`**. Los tipos de dominio (`Product`, `CartItem`) se exportan desde `lib/` y se reutilizan en UI y server.
5. **Una feature a la vez**. No anticipar abstracciones. Tres líneas similares son mejor que una abstracción prematura.

## Convenciones de código

- **Server Components por defecto**. `'use client'` solo donde haga falta.
- **Server Actions** en `app/**/actions.ts` cuando se necesiten (no en este momento — el carrito es client-side).
- **Tests** en `tests/`, nombrados `*.test.ts(x)`. Un test mínimo por cada módulo nuevo de `lib/`.
- **Sin comentarios obvios**. Solo comentar el *por qué* no obvio.
- **Imports**: rutas absolutas desde la raíz (`@/lib/...`, `@/app/...`) si está configurado; si no, relativos cortos.
- **Estilos**: Tailwind utilitario. Nada de CSS modules ni styled-components.

## Cómo correr el proyecto

```bash
pnpm install
pnpm db:setup     # genera Prisma + migra + siembra
pnpm dev          # http://localhost:3000
```

## Cómo correr los tests

```bash
pnpm test
pnpm test:watch
```

## Requisitos de calidad (rúbrica)

1. **Deep module**: al menos un módulo en `lib/` debe seguir el patrón *deep module*. Su `index.ts` expone **máximo 3 funciones públicas**; toda la complejidad (helpers, tipos internos, parsing, etc.) vive en archivos internos del módulo y **no** se reexporta.
2. **Pre-commit hook activo** (Husky): corre `pnpm lint` y `pnpm test`. **Bloquea** commits si algún test falla.
3. **Al menos un PRD** en [docs/prds/](docs/prds/) para una feature de la Fase 2. (El usuario indicará cuándo estamos en esa fase.)
4. **Evidencia de Red-Green-Refactor** en al menos una feature: el commit que **agrega el test** debe ser **anterior** al commit que agrega la implementación. Mensaje del primer commit en imperativo describiendo el test que falla (rojo); el segundo, la implementación que lo hace pasar (verde).

## Flujo de trabajo esperado

1. **Construir incremental**: primero las rutas vacías y navegación end-to-end → luego datos reales → luego interactividad → luego recomendaciones.
2. **Test al lado del módulo**: al crear un módulo de `lib/`, agregar un test mínimo en `tests/`.
3. **Commits cortos en imperativo** ("agrega ruta de carrito", "conecta home con Prisma"). Un commit = un paso navegable.
4. **El proyecto es una práctica de herramientas de Claude Code** — usar agentes (Explore, Plan) y skills (`/align`) cuando el paso lo amerite.

## MCP disponibles

Ninguno en este ejercicio. El catálogo se lee de SQLite vía Prisma (ver [lib/prisma.ts](lib/prisma.ts) y [prisma/seed.ts](prisma/seed.ts)).
