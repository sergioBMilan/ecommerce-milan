# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Requires Node 20+ and pnpm 9+ (pinned via `packageManager` in `package.json`; Corepack will refuse other managers).

Use **pnpm** exclusively — never `npm install`. The repo applies supply-chain mitigations that npm would silently bypass:
- `.npmrc` sets `minimum-release-age=10080` (7-day quarantine on freshly published packages — defense against Shai-Hulud-style attacks).
- Versions are pinned (no `^`/`~`) so every install resolves identically.
- `pnpm.onlyBuiltDependencies` whitelists *only* `prisma`, `@prisma/engines`, `@prisma/client`, and `esbuild` to run install scripts. Adding a dep that needs scripts requires explicitly extending this list.
- Running `npm install` generates a `package-lock.json` that conflicts with `pnpm-lock.yaml` and breaks the next engineer's setup.

```bash
pnpm install          # install deps
pnpm dev              # Next.js dev server at http://localhost:3000
pnpm build            # production build
pnpm lint             # ESLint
pnpm test             # run tests once (Vitest)
pnpm test:watch       # Vitest in watch mode
pnpm seed             # re-seed the database with 20 sample bikes
pnpm db:setup         # prisma generate + migrate + seed (first-time setup)
pnpm dlx prisma studio  # inspect the SQLite DB via UI
```

Run a single test file: `pnpm vitest run tests/smoke.test.ts`

## Steering

`AGENTS.md` is the per-project steering doc: design principles, code conventions, and workflow are filled in there during the exercise. Read it before making design decisions — its rules take precedence over generic defaults.

## Architecture

This is a **Next.js 15 App Router** project with TypeScript and Tailwind CSS.

**Data layer split:**
- `User` and `CartItem` live in **Prisma + SQLite** (`prisma/schema.prisma`). The singleton client is at `lib/prisma.ts`.
- The **product catalog** (Phase B) comes from the **Odoo MCP** (`mcp__claude_ai_Odoo_MCP__query`), not from local SQLite. The local `Product` model exists only for cart foreign keys — avoid seeding or duplicating catalog data locally.

**App Router pages** (`app/`):
- `/` — product catalog + search (to be implemented)
- `/product/[slug]` — product detail
- `/cart` — cart view with persistence
- `/login` — auth page

**`lib/`** is for domain modules (cart logic, search, recommendations, etc.). Keep modules focused with a clean public interface; UI components should not import Prisma directly — go through `lib/` functions.

**Tests** live in `tests/`. Vitest is configured via `vitest.config.ts` with jsdom.

**Pre-commit hook** (Husky, `.husky/pre-commit`) is present but commented out — check before enabling.

## MCP

The Odoo MCP is available as `mcp__claude_ai_Odoo_MCP__query`. Use it for all product catalog reads in Phase B. Treat it as read-only; do not issue raw SQL through it.
