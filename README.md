# 3D Portfolio

![3D Portfolio](https://github.com/Ronald-Cifuentes/portforlio_3d/assets/59535805/04907b64-dfb0-40e0-b372-6a77a5f80e6e)

Single-page portfolio built with React 19, Vite and react-three-fiber.

## Getting started

Requires Node >= 24 and pnpm.

```bash
pnpm install
pnpm dev
```

Copy the EmailJS credentials into a local `.env` before using the contact form:

```
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
VITE_APP_EMAILJS_NAME=
VITE_APP_EMAILJS_EMAIL=
```

The form reports a configuration error instead of silently failing when any of them is missing.

## Commands

| Command                | What it does                                               |
| ---------------------- | ---------------------------------------------------------- |
| `pnpm dev`             | Vite dev server                                            |
| `pnpm build`           | Production build into `dist/`                              |
| `pnpm preview`         | Serve the production build                                 |
| `pnpm test`            | Unit and architecture tests (`node --test`)                |
| `pnpm test:watch`      | Same suite in watch mode                                   |
| `pnpm test:e2e`        | Playwright end-to-end suite (builds and serves on its own) |
| `pnpm lint`            | ESLint                                                     |
| `pnpm format`          | Prettier, writing changes                                  |
| `pnpm verify`          | Format check, lint, unit tests, build                      |
| `pnpm verify:all`      | `verify` plus the end-to-end suite                         |
| `pnpm optimize:assets` | Re-encode `src/assets` images to WebP                      |

## Layout

```
src/
  lib/         pure functions — no React, no DOM; unit tested in isolation
  hooks/       React hooks that adapt browser behaviour to component state
  platform/    browser and third-party adapters (WebGL, YouTube, storage, mail)
  components/  one folder per feature, each with a single public entry point
  constants/   the content of the site: experiences, projects, tech catalog, copy
  assets/      images and icons, re-exported through a single barrel
test/          architecture fitness tests and the test-time module resolver
e2e/           Playwright journeys
```

Dependencies point inwards: `components` may use `hooks`, `platform` and `lib`; `hooks` and
`platform` may use `lib`; `lib` depends on nothing but itself. Those boundaries, the absence of code
comments and the absence of unused translations or assets are enforced by
`test/architecture.test.js`, so breaking one fails the suite rather than passing review.

`node --test` runs the browser-facing modules directly by resolving extensionless imports and
stubbing images through `test/moduleResolution.mjs`, which is why the pure layer needs no bundler to
be tested.
