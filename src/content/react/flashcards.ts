// Ronda relámpago de React: 40 preguntas cortas con respuesta de una o dos líneas, de Junior a Senior.
// Las marcadas como "verificado" salen de los tests de react-samples.

type Flashcard = { topic: string; prompt: string; answer: string }
const tema = (nombre: string) => (prompt: string, answer: string): Flashcard => ({ topic: nombre, prompt, answer })

const base = tema('Fundamentos')
const hooks = tema('Hooks')
const datos = tema('Datos y estado')
const render = tema('Renderizado y performance')
const calidad = tema('Testing, accesibilidad y seguridad')
const arq = tema('Arquitectura y Senior')

export const reactFlashcards: readonly Flashcard[] = [
  base('¿Qué es JSX?', 'Una sintaxis parecida a HTML dentro de JavaScript, que se compila a llamadas a funciones de React.'),
  base('¿Props o estado?', 'Las props vienen del padre y son de solo lectura; el estado es memoria propia del componente y, al cambiar, lo redibuja.'),
  base('Trampa: después de `setCantidad(5)`, ¿qué vale `cantidad` en la línea siguiente?', 'El valor anterior: el setter programa un dibujo nuevo, no cambia la variable de este dibujo.'),
  base('Trampa: ¿qué muestra `{cantidad && <p>Hay</p>}` si `cantidad` es 0?', 'Un "0" en la pantalla. Se usa `cantidad > 0 &&`.'),
  base('¿Para qué sirve la key en una lista?', 'Para identificar cada elemento entre dibujos. Tiene que ser única y estable, como un id; el índice falla si la lista cambia de orden.'),
  base('¿Cómo le avisa un hijo algo al padre?', 'Llamando a una función que el padre le pasó por props.'),
  base('¿Qué es levantar el estado?', 'Moverlo al padre común de los componentes que lo necesitan, para tener una sola fuente de verdad.'),

  hooks('¿Cuáles son las reglas de los hooks?', 'Llamarlos solo en el nivel superior de componentes o de otros hooks, nunca en condiciones ni bucles, porque React los identifica por el orden.'),
  hooks('¿Para qué sirve `useEffect`?', 'Para sincronizar con algo de afuera de React: APIs, suscripciones o temporizadores. No para datos derivados.'),
  hooks('Trampa: ¿por qué un efecto corre dos veces en desarrollo?', 'Por el modo estricto, que monta, desmonta y vuelve a montar para revelar limpiezas faltantes.'),
  hooks('¿Qué hace la función de limpieza de un efecto?', 'Deshace lo que hizo el efecto antes de volver a correrlo o al desmontar: cancelar un pedido, un temporizador o una suscripción.'),
  hooks('¿`useRef` o `useState`?', 'Cambiar el estado redibuja; cambiar una ref, no. La ref sirve para el DOM o para valores que no se muestran.'),
  hooks('¿`useMemo` o `useCallback`?', '`useMemo` guarda un valor calculado; `useCallback`, una función. Se usan después de medir, para referencias estables o cálculos caros.'),
  hooks('¿Qué hace `use(promesa)`?', 'Suspende el componente hasta que la promesa se resuelve; mientras tanto se ve el fallback del Suspense más cercano.'),

  datos('Trampa: ¿`fetch` rechaza ante un 404?', 'No: solo rechaza ante fallas de red. Hay que revisar `response.ok` (verificado en el live coding).'),
  datos('¿Qué es una race condition al pedir datos?', 'Una respuesta vieja que llega después de una nueva y la pisa. Se evita abortando el pedido en la limpieza del efecto.'),
  datos('¿Por qué separar el estado del servidor del de la interfaz?', 'El del servidor necesita caché, reintentos e invalidación: lo resuelve TanStack Query. El de la interfaz es tuyo.'),
  datos('Después de una mutación con TanStack Query, ¿cómo se actualiza la lista?', 'Invalidando la consulta en `onSuccess`: TanStack Query la vuelve a pedir sola (verificado).'),
  datos('¿Qué diferencia hay entre `staleTime` y `gcTime`?', '`staleTime`: cuánto tiempo el dato se considera fresco. `gcTime`: cuánto se guarda en caché sin usarse.'),
  datos('¿Cuándo usás Context?', 'Para datos transversales que cambian poco, como el tema o la sesión. Todos sus consumidores se redibujan al cambiar.'),
  datos('Trampa: el selector de Zustand está bien y el componente se redibuja igual. ¿Por qué?', 'Porque se redibuja su padre. El selector no evita los dibujos que vienen del padre: para eso está `memo` (verificado).'),

  render('¿Cuándo conserva React el estado de un componente?', 'Si en esa posición sigue el mismo tipo con la misma key. Si cambia el tipo o la key, lo descarta (verificado).'),
  render('¿Cómo reseteás un componente a propósito?', 'Cambiándole la key.'),
  render('¿`useTransition` o `useDeferredValue`?', '`useTransition` para una actualización que disparás vos; `useDeferredValue` para un valor que recibís.'),
  render('Trampa: con Suspense, ¿qué pasa al cambiar de dato sin transición?', 'Vuelve el fallback. Con `startTransition`, React conserva lo anterior hasta que llega lo nuevo (verificado).'),
  render('Una lista de 10.000 elementos se traba. ¿Qué hacés?', 'Mido con el Profiler y, si el costo es dibujar tantas filas, virtualizo: solo se dibujan las visibles (verificado: 12 filas en el DOM).'),
  render('¿`memo` siempre mejora el rendimiento?', 'No: tiene costo y no sirve si las props cambian en cada dibujo. Rinde en componentes caros con props estables.'),
  render('¿Qué hace el React Compiler?', 'Agrega la memorización automáticamente al compilar, si el código respeta las reglas de React.'),

  calidad('¿`getBy`, `queryBy` o `findBy`?', '`getBy` para lo que ya está, `queryBy` para verificar que algo no está y `findBy` para lo asincrónico.'),
  calidad('¿Por qué buscar por rol en los tests?', 'Porque es como encuentra los elementos un lector de pantalla: si el test no los encuentra así, una persona tampoco.'),
  calidad('¿Para qué sirve MSW?', 'Para interceptar los pedidos de red en los tests con handlers reutilizables, sin tocar el código de la app.'),
  calidad('¿Cómo asociás un error a un campo para un lector de pantalla?', 'Con `aria-invalid` en el campo y `aria-describedby` apuntando al id del mensaje (verificado).'),
  calidad('¿Cómo anunciás un cambio sin mover el foco?', 'Con una región `role="status"` que exista desde antes y cambie su texto.'),
  calidad('¿React es vulnerable a XSS por mostrar texto?', 'No: escapa lo que va entre llaves. El riesgo está en `dangerouslySetInnerHTML` sin sanitizar y en las URLs externas.'),
  calidad('Trampa: ¿qué hace React 19 con `href="javascript:alert(1)"`?', 'Lo reemplaza por una URL que solo lanza un error (verificado). Igual conviene validar las URLs a http y https.'),

  arq('¿Qué es la hidratación?', 'Conectar React al HTML que vino del servidor sin recrearlo. El primer dibujo del cliente tiene que coincidir con ese HTML.'),
  arq('¿SSR o Server Components?', 'SSR genera HTML de componentes que también corren en el navegador; los Server Components corren solo en el servidor y no mandan su código.'),
  arq('¿Qué no atrapa un error boundary?', 'Errores en manejadores de eventos y en código asincrónico.'),
  arq('¿Por qué React Hook Form con Zod en formularios grandes?', 'El esquema valida y tipa a la vez, y React Hook Form no redibuja todo el formulario en cada tecla.'),
  arq('¿Qué orden seguís en una entrevista de diseño front-end?', 'Requisitos, arquitectura, datos y estado, API y optimizaciones, cada una justificada.'),
]
