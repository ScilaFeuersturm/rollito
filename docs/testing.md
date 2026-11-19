# Ruta de Testing

27 lecciones en `src/content/testing/`, en tres niveles, más un simulacro de 12 preguntas por nivel (`src/content/testing/interview-practice.ts`, en `/simulacro/testing/<nivel>/`).

| Nivel | Lecciones | Temas |
| --- | --- | --- |
| Junior · Testing manual | 01 a 10 | Qué es testing, niveles y tipos, partición de equivalencia y valores límite, tablas de decisión y estados, casos de prueba, exploratorio, reporte de bugs, smoke/sanity/regresión, mobile, plan de pruebas |
| Semi Senior · Automatización | 11 a 19 | Pirámide, APIs, primer test con Playwright, localizadores y aserciones, Page Object Model, datos y red, tests inestables, mobile, CI |
| Senior · Estrategia de calidad | 20 a 27 | Shift-left, contract testing, performance con k6, seguridad, accesibilidad, cobertura vs. mutation testing, testing en producción, liderar QA |

## Pruebas reales de Rollito que usan las lecciones

| Qué | Dónde | Cómo se corre |
| --- | --- | --- |
| Tests unitarios y de componentes (84) | `src/**/*.test.ts`, `react-samples/**` | `npm test` |
| Reglas de Firestore contra el emulador (21) | `firebase/reglas.emulador.mjs` | `npm run test:reglas` (Java 21+) |
| E2E con Playwright, escritorio y celular (12) | `e2e/sitio.e2e.ts`, `e2e/paginas/CuentaPage.ts`, `playwright.config.ts` | `npm run test:e2e` (la primera vez: `npx playwright install chromium`) |

Los archivos E2E terminan en `.e2e.ts` para que Vitest no los tome como tests unitarios.

## Hallazgos reales que aparecen en las lecciones

- **Registro con un nombre hecho solo de espacios** (resuelto): pasaba el `required`, el servidor lo rechazaba y se mostraba un error sobre el código de invitación. Ahora se valida antes de crear la cuenta (`src/cuenta/validar.ts`, con tests unitarios, un caso más en las reglas y un E2E de regresión).
- **Contraseña mínima de 8 caracteres solo en el cliente** (pendiente de configuración): la app la valida, pero Firebase acepta desde 6 si alguien llama a la API directamente. Se arregla en la consola de Firebase: **Authentication → Configuración → Política de contraseñas**, con un mínimo de 8.
