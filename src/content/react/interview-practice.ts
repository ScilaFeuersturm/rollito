// Simulacros de entrevista de React por nivel (12 preguntas). Fuente: docs/react.md.

type Question = { topic: string; prompt: string; answer: string }

export const reactInterview: Record<'junior' | 'semi-senior', readonly Question[]> = {
  'junior': [
    { topic: "Pregunta 1", prompt: "¿Qué es React y qué problema resuelve?", answer: "Una librería para construir interfaces con componentes. Describís cómo se ve la interfaz según el estado, y React se encarga de actualizar el DOM cuando el estado cambia, en vez de manipularlo a mano." },
    { topic: "Pregunta 2", prompt: "¿Qué es JSX?", answer: "Una sintaxis para escribir algo parecido a HTML dentro de JavaScript, que se compila a llamadas a funciones de React. Usa `className`, expresiones entre llaves y un solo elemento raíz." },
    { topic: "Pregunta 3", prompt: "¿Qué es un componente?", answer: "Una función que recibe props y devuelve JSX. Se nombra con mayúscula y se compone con otros componentes para armar la interfaz." },
    { topic: "Pregunta 4", prompt: "¿Qué diferencia hay entre props y estado?", answer: "Las props vienen del padre y son de solo lectura. El estado es memoria propia del componente, y cuando cambia React lo vuelve a dibujar." },
    { topic: "Pregunta 5", prompt: "¿Por qué no modificar el estado directamente?", answer: "Porque React compara referencias para saber si algo cambió. Si modificás el mismo objeto o array, no se entera y no actualiza la pantalla. Se crea una copia nueva." },
    { topic: "Pregunta 6", prompt: "Llamás dos veces a `setCantidad(cantidad + 1)`. ¿Cuánto sube?", answer: "Uno, porque las dos usan el valor de ese dibujo. Con `setCantidad(c => c + 1)` dos veces, sube dos." },
    { topic: "Pregunta 7", prompt: "¿Para qué sirve la `key` en una lista?", answer: "Para que React identifique cada elemento entre dibujos. Tiene que ser única entre hermanos y estable, como un id. El índice falla si la lista cambia de orden." },
    { topic: "Pregunta 8", prompt: "¿Cómo le avisa un hijo algo a su padre?", answer: "Llamando a una función que el padre le pasó por props." },
    { topic: "Pregunta 9", prompt: "¿Qué es \"levantar el estado\"?", answer: "Mover el estado al padre común de los componentes que lo necesitan, para que haya una sola fuente de verdad, y pasarlo hacia abajo por props." },
    { topic: "Pregunta 10", prompt: "¿Qué muestra `{cantidad && <p>Hay tareas</p>}` si `cantidad` es 0?", answer: "Un \"0\" en la pantalla. Hay que usar una condición booleana: `cantidad > 0 &&`." },
    { topic: "Pregunta 11", prompt: "¿Qué es un formulario controlado?", answer: "Uno donde el valor de cada campo vive en el estado (`value` más `onChange`). React es la única fuente de verdad, y es fácil validar o transformar." },
    { topic: "Pregunta 12", prompt: "¿Por qué `evento.preventDefault()` en el `onSubmit`?", answer: "Para que el navegador no envíe el formulario y recargue la página, cosa que borraría el estado de la app." },
  ],
  'semi-senior': [
    { topic: "Pregunta 1", prompt: "¿Para qué sirve `useEffect` y cuándo no lo usarías?", answer: "Para sincronizar con algo externo: APIs, suscripciones o temporizadores. No para datos derivados (se calculan al dibujar) ni para lógica que corresponde a un evento." },
    { topic: "Pregunta 2", prompt: "¿Por qué un efecto corre dos veces en desarrollo?", answer: "Por el modo estricto, que monta, desmonta y vuelve a montar para revelar limpiezas faltantes. La solución es escribir bien la limpieza." },
    { topic: "Pregunta 3", prompt: "¿Qué es una race condition al pedir datos y cómo la evitás?", answer: "Una respuesta vieja que llega después de una nueva y la pisa. Se evita descartándola en la limpieza del efecto (con una bandera o `AbortController`), o con TanStack Query." },
    { topic: "Pregunta 4", prompt: "¿`useMemo` o `useCallback`?", answer: "`useMemo` guarda un valor calculado; `useCallback`, una función. Los uso para referencias estables con hijos en `memo`, cálculos caros o dependencias de efectos, después de medir." },
    { topic: "Pregunta 5", prompt: "¿Qué diferencia hay entre `useRef` y `useState`?", answer: "Cambiar el estado vuelve a dibujar; cambiar una ref, no. La ref sirve para el DOM o para valores que no se muestran." },
    { topic: "Pregunta 6", prompt: "¿Cuáles son las reglas de los hooks?", answer: "Llamarlos solo en el nivel superior de componentes o de otros hooks, nunca dentro de condiciones, bucles o funciones comunes, porque React los identifica por el orden de las llamadas." },
    { topic: "Pregunta 7", prompt: "¿Cuándo usarías Context y cuáles son sus límites?", answer: "Para datos transversales que cambian poco (tema, idioma, sesión). Su límite: todos los consumidores se vuelven a dibujar cuando cambia el valor." },
    { topic: "Pregunta 8", prompt: "¿Cómo manejás el estado global?", answer: "Separo el estado del servidor (TanStack Query) del de la interfaz (`useReducer` con Context en apps chicas, o Redux Toolkit o Zustand cuando crece)." },
    { topic: "Pregunta 9", prompt: "¿Cómo modelás los estados de un pedido de datos?", answer: "Con una unión discriminada (cargando, error y listo), con un error que permite reintentar. Y recordando que `fetch` no rechaza ante un 404: hay que revisar `response.ok`." },
    { topic: "Pregunta 10", prompt: "¿Cómo testeás un componente?", answer: "Con Testing Library, desde el punto de vista de la persona: busco por rol y label, actúo y verifico lo visible. `findBy` para lo asincrónico y MSW para simular la API." },
    { topic: "Pregunta 11", prompt: "Una pantalla se siente lenta. ¿Qué hacés?", answer: "Mido con el Profiler, identifico la causa (dibujos de más, trabajo pesado, bundle grande o lista larga) y aplico la técnica que corresponde: `memo`, `useDeferredValue`, code splitting o virtualización." },
    { topic: "Pregunta 12", prompt: "¿TypeScript valida los datos de una API?", answer: "No: los tipos desaparecen al compilar. Los datos externos se validan en tiempo de ejecución, por ejemplo con Zod." },
  ],
}
