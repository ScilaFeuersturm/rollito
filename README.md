# Rollito

Base de una plataforma gratuita para aprender programación con lecciones cortas en español rioplatense.

## Desarrollo local

Requiere Node.js 22.13+ y npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vite genera el sitio estático en `dist/`. La navegación usa el fragmento de la URL para funcionar en un host estático sin reglas de redirección.

## Fase 0

- `src/content/android/demo.mdx` es una lección de muestra para probar el formato. Los borradores del recorrido Android se revisan antes de incorporarlos.
- `src/content/lesson-schema.ts` valida el frontmatter al cargar la app.
- La práctica incluye opción múltiple, completar un hueco y ordenar pasos con botones.
- Cada lección completada otorga 10 XP una sola vez. La racha cuenta días consecutivos del calendario local y sigue vigente si la última lección se completó ayer.
- El progreso se guarda en el navegador. Si el guardado falla, dura hasta que se cierre o recargue la página.

## Audio para una fase posterior

Agregar clips opcionales para repasar conceptos centrales como SOLID, MVVM y Clean Architecture. Usar guiones de 30 a 90 segundos en español rioplatense con una idea, un ejemplo y una pregunta breve para que la persona pause y explique el concepto con sus palabras. Incluir transcripción, controles de pausa y repetición, y velocidad de reproducción. Cargar el audio a pedido para cuidar los datos en el celular.
