# Rollito

Base de una plataforma gratuita para aprender programación con lecciones cortas en español rioplatense.

## Desarrollo local

Requiere Node.js 22.13+ y npm.

```sh
npm ci
npm run dev      # servidor de desarrollo
npm test         # tests con Vitest
npm run build    # sitio estático en dist/
npm run preview  # sirve dist/ para probar el build
```

## Cómo se genera el sitio

`npm run build` hace cuatro pasos:

1. `tsc --noEmit` revisa los tipos.
2. `vite build` arma el JavaScript y el CSS del navegador en `dist/`.
3. `vite build --ssr` arma una versión de la app que corre en Node (`dist-ssr/`, temporal).
4. `scripts/prerender.js` usa esa versión para escribir un HTML por ruta: `dist/index.html`, `dist/repaso/index.html`, `dist/lecciones/<id>/index.html` y `dist/404.html`.

Cada página llega al navegador con el contenido ya escrito (se ve rápido en el celular y Google la puede indexar). Después React la "hidrata" y la navegación entre páginas es instantánea. Cualquier hosting estático sirve; Netlify usa `404.html` automáticamente para direcciones inexistentes.

## Estructura

- `src/app/`: shell, router mínimo sobre la History API (`router.tsx`), rutas (`routes.ts`) y páginas.
- `src/content/`: lecciones en MDX. `lesson-schema.ts` valida el frontmatter al cargar la app y en el build.
- `src/components/`: ejercicios y reproductor de audio.
- `src/audio/`: lectura en voz alta (Web Speech API).
- `src/progress/`: XP y racha en `localStorage`.
- `android-samples/`: el código Kotlin que muestran las lecciones.

## Lecciones

Cada lección es un `.mdx` con frontmatter. El cuerpo tiene **Concepto** y **Ejemplo**; los ejercicios, la tarea para tu máquina y el resumen (`resumen:`, de 3 a 5 ítems) van en el frontmatter y la app los muestra en ese orden.

- Cada lección completada otorga 10 XP una sola vez. La racha cuenta días consecutivos del calendario local y sigue vigente si la última lección se completó ayer.
- El progreso se guarda en el navegador. Si el guardado falla, dura hasta que se cierre o recargue la página.

## Repaso en audio

Solo para la sección **Arquitectura** (POO, MVC, MVVM, MVP, Hexagonal, Clean y VIPER): conceptos para escuchar y pensar, no sintaxis. Una lección tiene audio si su frontmatter dice `track: fundamentos` y `modulo: Arquitectura` (ver `src/content/audio.ts`). El resto de las lecciones muestra el resumen como texto.

El resumen se puede escuchar al final de cada lección de Arquitectura, y todos juntos en `/repaso/`, como un podcast corto. Usa la voz que trae el dispositivo: prefiere español rioplatense, después latinoamericano y después cualquier español.

Limitaciones conocidas:

- La voz y su calidad dependen del dispositivo.
- Pausar retoma desde el comienzo de la frase actual (en Android `speechSynthesis.pause()` no es confiable).
- No sigue sonando con la pantalla bloqueada.

Más adelante se pueden sumar audios grabados (MP3) por lección, con guiones de 30 a 90 segundos: una idea, un ejemplo y una pregunta para pausar y explicar el concepto con tus palabras. Eso resuelve la calidad y la reproducción con pantalla bloqueada.
