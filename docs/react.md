# React · De Junior a Semi Senior

**Estado:** completo y publicado, a la par del recorrido Android. Junior (8 lecciones), Semi Senior (11 + 6 de live coding guiado, archivos `33-` a `38-`) y Senior (13, archivos `20-` a `32-`). Simulacros de 12 preguntas por nivel (`/simulacro/react/<nivel>/`), práctica de código con 9 katas (`/practica/react/<nivel>/`) y ronda relámpago de 40 preguntas (`/flashcards/react/`). Todo el código está en `react-samples/` con tests: los ejemplos de cada lección, las katas y el proyecto del live coding (`react-samples/live-coding/`). Los borradores de abajo quedan como referencia.

Cada lección sigue el formato habitual: concepto con analogía, ejemplo, ejercicios de autoevaluación, tarea para tu máquina, resumen y "cómo contarlo en una entrevista". El ejemplo de cada lección es un `App.tsx` de `react-samples/` que TypeScript y un test verifican. En la app se ve como código, con un botón **Probar en vivo** que abre Sandpack para editarlo y ver el resultado.

El hilo conductor es el de siempre: una app de tareas.

| # | Lección | Ejemplo | Min |
| --- | --- | --- | --- |
| R1 | JSX: HTML dentro de JavaScript | `01-jsx` | 5 |
| R2 | Componentes | `02-componentes` | 5 |
| R3 | Props | `03-props` | 5 |
| R4 | Estado con useState | `04-estado` | 6 |
| R5 | Eventos y comunicación de hijo a padre | `05-eventos` | 5 |
| R6 | Listas y keys | `06-listas-y-keys` | 6 |
| R7 | Renderizado condicional | `07-renderizado-condicional` | 5 |
| R8 | Formularios controlados | `08-formularios` | 6 |

---

## R1. JSX: HTML dentro de JavaScript · Junior · 5 min

**Concepto.** JSX es una sintaxis que permite escribir algo parecido a HTML dentro de JavaScript. No es HTML: al compilar, cada etiqueta se transforma en una llamada a una función de React que describe qué mostrar. Reglas básicas:

- **Llaves `{}`** para meter cualquier expresión de JavaScript: variables, cuentas, llamadas a funciones.
- **`className`** en vez de `class`, y los atributos en camelCase (`onClick`, `htmlFor`).
- **Un solo elemento raíz** por componente. Si no querés un `div` de más, usás un fragmento: `<>...</>`.
- **Etiquetas cerradas siempre**: `<img />`, `<br />`.

Además, React escapa el texto que metés entre llaves, así que un texto con `<script>` se muestra como texto y no se ejecuta.

Pensalo como una plantilla de carta: el texto fijo ya está escrito, y en los huecos (`{nombre}`) va lo que cambia en cada caso.

**Ejemplo.**

```tsx
export default function App() {
  const tarea = { titulo: 'Comprar yerba', vence: 'hoy' }
  const pendientes = 3

  return (
    <main className="tarjeta">
      <h1>{tarea.titulo}</h1>
      <p>Vence {tarea.vence}</p>
      <p>Te quedan {pendientes} tareas pendientes</p>
    </main>
  )
}
```

*Código en `react-samples/01-jsx/App.tsx`, verificado con TypeScript y un test.*

`{tarea.titulo}` y `{pendientes}` se reemplazan por sus valores. Si cambiás `pendientes` a 5 en el editor en vivo, la pantalla lo muestra al instante.

### Práctica

1. ¿JSX es HTML? **Respuesta.** No. Es una sintaxis de JavaScript que se compila a llamadas de funciones de React. Por eso se escribe `className` y no `class`, que es una palabra reservada de JavaScript.
2. ¿Qué podés poner entre llaves? **Respuesta.** Cualquier expresión de JavaScript que devuelva un valor: una variable, una cuenta, una llamada a una función, un ternario. Un `if` no, porque es una sentencia y no devuelve valor.
3. Un componente devuelve un `h1` y un `p` uno al lado del otro, sin nada que los envuelva. ¿Qué pasa? **Respuesta.** No compila: JSX necesita un único elemento raíz. Se envuelven en un fragmento (`<>...</>`) para no agregar un elemento de más al DOM.

### Tarea para tu máquina

Creá un proyecto con `npm create vite@latest` eligiendo React y TypeScript. En `App.tsx`, mostrá una tarjeta de tarea con título, fecha de vencimiento y la cantidad de días que faltan, calculada con una cuenta entre llaves.

**Resultado esperado.** La tarjeta muestra los datos, y al cambiar las variables en el código la pantalla se actualiza sola con el servidor de desarrollo corriendo.

### Resumen

- JSX es una sintaxis para escribir algo parecido a HTML dentro de JavaScript.
- Entre llaves va cualquier expresión de JavaScript, como una variable o una cuenta.
- Se usa class name en vez de class, y cada componente devuelve un solo elemento raíz.
- React escapa el texto entre llaves, así que no se ejecuta código inyectado.

### Entrevista

**En 30 segundos.** "JSX es azúcar sintáctica que se compila a llamadas de funciones de React que describen la interfaz. Permite mezclar marcado con expresiones de JavaScript entre llaves, exige un único elemento raíz o un fragmento, y escapa el contenido, lo que protege contra inyección de código."

**Trampa.** ¿Se puede usar React sin JSX? **Respuesta.** Sí: JSX es opcional. Se puede llamar directamente a las funciones de React que crean elementos, pero el código queda mucho menos legible. Por eso casi todos los proyectos usan JSX.

**Cuándo no.** Si necesitás mostrar HTML que viene de afuera (por ejemplo, de un editor de texto enriquecido), las llaves lo muestran como texto. Existe `dangerouslySetInnerHTML`, pero el nombre es una advertencia: solo con contenido sanitizado.

---

## R2. Componentes · Junior · 5 min

**Concepto.** Un componente es una **función que devuelve JSX**. Es la pieza básica de React: la interfaz se arma combinando componentes chicos, como bloques. Reglas:

- El nombre **empieza con mayúscula** (`TarjetaDeTarea`). Con minúscula, React lo trata como una etiqueta HTML.
- Se usa como una etiqueta: `<TarjetaDeTarea />`.
- Tiene que ser **puro**: con los mismos datos, devuelve siempre lo mismo y no modifica nada de afuera mientras se dibuja.

Pensalo como los bloques de Lego: cada pieza tiene una forma definida y la podés usar las veces que quieras para armar cosas más grandes.

**Ejemplo.**

```tsx
function Encabezado() {
  return <h1>Mis tareas</h1>
}

function TarjetaDeTarea() {
  return (
    <article className="tarjeta">
      <h2>Comprar yerba</h2>
      <p>Vence hoy</p>
    </article>
  )
}

export default function App() {
  return (
    <main>
      <Encabezado />
      <TarjetaDeTarea />
      <TarjetaDeTarea />
    </main>
  )
}
```

*Código en `react-samples/02-componentes/App.tsx`, verificado con TypeScript y un test.*

`App` se arma con un `Encabezado` y dos `TarjetaDeTarea`. Por ahora las dos tarjetas son iguales: en la próxima lección cada una va a recibir sus propios datos.

### Práctica

1. ¿Qué pasa si declarás un componente como `tarjetaDeTarea`, con minúscula? **Respuesta.** Al usarlo como `<tarjetaDeTarea />`, React lo interpreta como una etiqueta HTML desconocida y no ejecuta tu función. Los componentes van con mayúscula.
2. ¿Qué significa que un componente sea puro? **Respuesta.** Que con las mismas props y el mismo estado devuelve siempre el mismo JSX, y que mientras se dibuja no modifica variables de afuera ni hace pedidos de red.
3. ¿Por qué conviene partir una pantalla en componentes chicos? **Respuesta.** Se reutilizan, se leen y se prueban por separado, y cada uno tiene una responsabilidad clara.

### Tarea para tu máquina

En tu proyecto de Vite, partí una pantalla de tareas en tres componentes: `Encabezado`, `ListaDeTareas` y `PieDePagina`, cada uno en su propio archivo, y usalos desde `App`.

**Resultado esperado.** `App` queda corta y se lee como un índice de la pantalla, y cada componente vive en su archivo.

### Resumen

- Un componente es una función que devuelve JSX.
- Su nombre empieza con mayúscula, y se usa como una etiqueta.
- La interfaz se arma combinando componentes chicos y reutilizables.
- Un componente tiene que ser puro: con los mismos datos, devuelve siempre lo mismo.

### Entrevista

**En 30 segundos.** "Un componente es una función que recibe props y devuelve JSX. Armo la interfaz componiendo piezas chicas con una responsabilidad cada una, y las mantengo puras: el dibujo depende solo de sus props y su estado, y los efectos van aparte."

**Trampa.** ¿Componentes de clase o de función? **Respuesta.** Hoy se usan componentes de función con hooks: son más simples y es lo que recomienda la documentación de React. Los de clase siguen funcionando y aparecen en código viejo, así que conviene reconocerlos.

**Cuándo no.** Partir de más también es un problema: un componente de tres líneas que se usa una sola vez y obliga a saltar entre archivos no aporta. Se extrae cuando se repite o cuando simplifica.

---

## R3. Props · Junior · 5 min

**Concepto.** Las **props** son los datos que un componente recibe de su padre, como los parámetros de una función. Se pasan como atributos (`<TarjetaDeTarea titulo="Pagar la luz" />`) y se leen desestructurando el parámetro. Cosas clave:

- Son de **solo lectura**: el componente no las modifica.
- Los datos fluyen **en una sola dirección**, de padre a hijo.
- Se pueden poner **valores por defecto** (`urgente = false`).
- Con TypeScript se declara su tipo, y el editor avisa si falta una prop o tiene el tipo equivocado.
- `children` es una prop especial: lo que va entre la etiqueta de apertura y la de cierre.

Pensalo como un formulario impreso que llenás: el formulario (el componente) es siempre el mismo, pero cada copia lleva datos distintos.

**Ejemplo.**

```tsx
type TarjetaProps = {
  titulo: string
  vence: string
  urgente?: boolean
}

function TarjetaDeTarea({ titulo, vence, urgente = false }: TarjetaProps) {
  return (
    <article className={urgente ? 'tarjeta urgente' : 'tarjeta'}>
      <h2>{titulo}</h2>
      <p>Vence {vence}</p>
    </article>
  )
}

export default function App() {
  return (
    <main>
      <TarjetaDeTarea titulo="Pagar la luz" vence="hoy" urgente />
      <TarjetaDeTarea titulo="Renovar el DNI" vence="en 30 días" />
    </main>
  )
}
```

*Código en `react-samples/03-props/App.tsx`, verificado con TypeScript y un test.*

La misma tarjeta muestra dos tareas distintas. `urgente` es opcional: en la segunda tarjeta no se pasa y vale `false`.

### Práctica

1. ¿Un componente puede modificar sus props? **Respuesta.** No: son de solo lectura. Si un dato tiene que cambiar, es estado, y vive en el componente que lo maneja.
2. ¿Qué significa escribir `urgente` sin valor, como en `<TarjetaDeTarea urgente />`? **Respuesta.** Es lo mismo que `urgente={true}`.
3. ¿Para qué sirve `children`? **Respuesta.** Para que el padre le pase contenido arbitrario a un componente contenedor, como una `Tarjeta` que envuelve lo que le pongas adentro.

### Tarea para tu máquina

Creá un componente `Tarjeta` que reciba `titulo` y `children` y los muestre dentro de un borde. Usalo dos veces con contenido distinto adentro: un párrafo en una y una lista en la otra.

**Resultado esperado.** El mismo componente muestra contenidos distintos, y TypeScript marca error si te olvidás el `titulo`.

### Resumen

- Las props son los datos que un componente recibe de su padre.
- Son de solo lectura: el componente no las modifica.
- Los datos fluyen en una sola dirección, de padre a hijo.
- Children es una prop especial con el contenido que va entre las etiquetas.

### Entrevista

**En 30 segundos.** "Las props son la entrada de un componente: datos de solo lectura que pasa el padre, con flujo en una sola dirección. Las tipo con TypeScript, uso valores por defecto para las opcionales y `children` para componentes contenedores."

**Trampa.** ¿Qué diferencia hay entre props y estado? **Respuesta.** Las props vienen de afuera y el componente no las cambia. El estado es memoria propia del componente, y cuando cambia React lo vuelve a dibujar. Un mismo dato puede ser estado en el padre y prop en el hijo.

**Cuándo no.** Pasar una prop a través de cuatro o cinco componentes que no la usan, solo para que llegue abajo (*prop drilling*), es una señal de que conviene otra solución, como Context, que se ve en Semi Senior.

---

## R4. Estado con useState · Junior · 6 min

**Concepto.** El **estado** es la memoria de un componente: datos que cambian con el tiempo y que, al cambiar, hacen que React vuelva a dibujar el componente. Se crea con `useState`, que devuelve el valor actual y una función para cambiarlo: `const [completada, setCompletada] = useState(false)`. Cosas clave:

- Una variable común no sirve: se reinicia en cada dibujo y React no se entera de que cambió.
- Llamar al *setter* no cambia la variable en ese momento: pide un nuevo dibujo con el valor nuevo.
- Si el valor nuevo depende del anterior, se usa la forma con función: `setCantidad(anterior => anterior + 1)`.
- Los objetos y listas del estado no se modifican: se reemplazan por una copia nueva.

Pensalo como un pizarrón en la cocina de un restaurante: cuando alguien cambia lo que está escrito, todos los que lo miran se enteran y actúan.

**Ejemplo.**

```tsx
import { useState } from 'react'

export default function App() {
  const [completada, setCompletada] = useState(false)

  return (
    <main className="tarjeta">
      <h1>Comprar yerba</h1>
      <p>{completada ? 'Hecha' : 'Pendiente'}</p>
      <button onClick={() => setCompletada(!completada)}>
        {completada ? 'Marcar como pendiente' : 'Completar'}
      </button>
    </main>
  )
}
```

*Código en `react-samples/04-estado/App.tsx`, verificado con TypeScript y un test.*

Al tocar el botón, `setCompletada` pide un nuevo dibujo con el valor contrario, y el texto y el botón cambian.

### Práctica

1. ¿Por qué no alcanza con una variable común (`let completada = false`)? **Respuesta.** Porque se vuelve a crear en cada dibujo y cambiarla no avisa a React, así que la pantalla no se actualiza.
2. Con `cantidad` en 0, llamás dos veces seguidas a `setCantidad(cantidad + 1)`. ¿Cuánto vale después? **Respuesta.** 1. Las dos llamadas usan el mismo valor de `cantidad` de ese dibujo. Con `setCantidad(c => c + 1)` dos veces, vale 2.
3. ¿Por qué hacer `tareas.push(nueva)` y después `setTareas(tareas)` no actualiza la pantalla? **Respuesta.** Porque es la misma lista: React compara la referencia, ve que no cambió y no vuelve a dibujar. Hay que crear una lista nueva, por ejemplo `setTareas([...tareas, nueva])`.

### Tarea para tu máquina

Hacé un contador de tareas hechas con dos botones: "Sumar una" y "Sumar tres". "Sumar tres" tiene que llamar tres veces al setter. Probalo primero con `setHechas(hechas + 1)` y después con la forma con función.

**Resultado esperado.** Con la primera forma, "Sumar tres" suma solo uno. Con `setHechas(h => h + 1)` suma tres.

### Resumen

- El estado es la memoria de un componente, y al cambiar hace que React lo vuelva a dibujar.
- Use state devuelve el valor actual y una función para cambiarlo.
- Si el valor nuevo depende del anterior, se usa la forma con función.
- Los objetos y listas del estado no se modifican: se reemplazan por una copia nueva.

### Entrevista

**En 30 segundos.** "El estado es la memoria de un componente: con `useState` obtengo el valor y un setter, y cada cambio dispara un nuevo dibujo. Trato el estado como inmutable, creando copias nuevas, y uso la forma con función cuando el valor nuevo depende del anterior."

**Trampa.** Después de `setCantidad(5)`, ¿qué imprime `console.log(cantidad)` en la línea siguiente? **Respuesta.** El valor anterior. El setter no cambia la variable de ese dibujo: programa uno nuevo, y recién ahí `cantidad` vale 5.

**Cuándo no.** No todo va al estado: lo que se puede calcular a partir de otro estado o de las props (por ejemplo, la cantidad de tareas pendientes) se calcula al dibujar. Duplicarlo en el estado obliga a mantener dos datos sincronizados.

---

## R5. Eventos y comunicación de hijo a padre · Junior · 5 min

**Concepto.** Los eventos se manejan pasando una **función** a props como `onClick` u `onChange`: `onClick={completar}`, no `onClick={completar()}`, que la ejecutaría al dibujar. La función recibe el evento, con métodos como `preventDefault()`.

Como los datos solo bajan de padre a hijo, para que un hijo avise algo hacia arriba **el padre le pasa una función por props**, y el hijo la llama. Si dos componentes hermanos necesitan el mismo dato, el estado se **sube** al padre común (*lifting state up*).

Pensalo como el timbre de una casa: la visita (el hijo) no entra a cambiar nada; toca el timbre (llama la función) y quien vive ahí (el padre) decide qué hacer.

**Ejemplo.**

```tsx
import { useState } from 'react'

type BotonProps = {
  alCompletar: () => void
}

function BotonCompletar({ alCompletar }: BotonProps) {
  return <button onClick={alCompletar}>Completar</button>
}

export default function App() {
  const [hechas, setHechas] = useState(0)

  return (
    <main>
      <p>Tareas hechas hoy: {hechas}</p>
      <BotonCompletar alCompletar={() => setHechas(hechas + 1)} />
    </main>
  )
}
```

*Código en `react-samples/05-eventos/App.tsx`, verificado con TypeScript y un test.*

`BotonCompletar` no sabe cuántas tareas hay: solo llama a `alCompletar`. El estado vive en `App`, que es quien decide sumar uno.

### Práctica

1. ¿Qué diferencia hay entre `onClick={completar}` y `onClick={completar()}`? **Respuesta.** La primera pasa la función para que React la llame al hacer clic. La segunda la ejecuta en cada dibujo y le pasa a `onClick` lo que devuelve.
2. ¿Cómo le avisa un hijo a su padre que pasó algo? **Respuesta.** Llamando a una función que el padre le pasó por props, por ejemplo `alCompletar`.
3. Dos componentes hermanos necesitan mostrar la misma cantidad de tareas. ¿Dónde va el estado? **Respuesta.** En el padre común. El padre se lo pasa a los dos por props, junto con las funciones para cambiarlo.

### Tarea para tu máquina

Armá un `Buscador` con un campo de texto y una `ListaDeTareas` que muestre solo las tareas que contienen lo escrito. Los dos son hermanos dentro de `App`, así que el texto buscado tiene que vivir en `App`.

**Resultado esperado.** Al escribir en el buscador, la lista se filtra al instante, y ni el buscador ni la lista guardan el texto por su cuenta.

### Resumen

- Los eventos se manejan pasando una función, sin ejecutarla, a props como on click.
- Para que un hijo avise algo, el padre le pasa una función por props.
- Si dos hermanos necesitan el mismo dato, el estado sube al padre común.
- El evento trae métodos como prevent default para cortar el comportamiento por defecto.

### Entrevista

**En 30 segundos.** "Manejo eventos pasando funciones a props como `onClick`. Como el flujo de datos es de padre a hijo, para comunicar hacia arriba paso callbacks por props, y cuando dos componentes comparten un dato, subo el estado al padre común."

**Trampa.** ¿El objeto de evento de React es el evento nativo del navegador? **Respuesta.** No exactamente: es un evento sintético que React arma con la misma interfaz en todos los navegadores. El nativo está en `evento.nativeEvent`, aunque casi nunca hace falta.

**Cuándo no.** Subir el estado demasiado arriba, por ejemplo a `App`, cuando solo lo usa una parte chica de la pantalla, hace que se vuelva a dibujar más de lo necesario. Se sube solo hasta el primer padre común.

---

## R6. Listas y keys · Junior · 6 min

**Concepto.** Para mostrar una lista se transforma un array en elementos con `map`. Cada elemento necesita una **key**: un valor **único entre hermanos y estable en el tiempo**, normalmente el `id` del dato. React usa la key para saber qué elemento es cuál entre un dibujo y el siguiente.

Usar el índice del array como key funciona si la lista nunca cambia de orden, pero falla al agregar al principio, borrar o reordenar: React confunde los elementos y el estado interno de cada fila (por ejemplo, un checkbox o un campo de texto) queda pegado a la posición equivocada.

Pensalo como el DNI de cada persona en una fila: si identificás a la gente por su lugar en la fila ("el tercero"), cuando alguien se cuela todos cambian de identidad.

**Ejemplo.**

```tsx
import { useState } from 'react'

type Tarea = { id: number; titulo: string }

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, titulo: 'Comprar yerba' },
    { id: 2, titulo: 'Pagar la luz' },
  ])

  function agregarAlPrincipio() {
    const nueva = { id: Date.now(), titulo: 'Llamar al médico' }
    setTareas([nueva, ...tareas])
  }

  return (
    <main>
      <button onClick={agregarAlPrincipio}>Agregar arriba</button>
      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id}>{tarea.titulo}</li>
        ))}
      </ul>
    </main>
  )
}
```

*Código en `react-samples/06-listas-y-keys/App.tsx`, verificado con TypeScript y un test.*

Cada `li` tiene como key el `id` de la tarea. Al agregar una arriba, React sabe que las otras dos son las mismas y solo agrega la nueva.

### Práctica

1. ¿Qué tiene que cumplir una key? **Respuesta.** Ser única entre hermanos y estable: el mismo dato tiene que tener siempre la misma key entre dibujos.
2. ¿Por qué el índice como key falla al agregar un elemento al principio? **Respuesta.** Porque todos los elementos cambian de índice: React cree que cada fila es otra, y el estado interno de las filas queda en la posición equivocada.
3. ¿Usarías `Math.random()` como key? **Respuesta.** No: cambia en cada dibujo, así que React cree que todos los elementos son nuevos, los destruye y los vuelve a crear, perdiendo su estado.

### Tarea para tu máquina

Armá una lista de tareas donde cada fila tenga un campo de texto para una nota. Usá el índice como key, escribí una nota en la primera fila y agregá una tarea al principio. Después repetilo con el `id` como key.

**Resultado esperado.** Con el índice, la nota queda en la primera fila, que ahora es otra tarea. Con el `id`, la nota sigue con su tarea.

### Resumen

- Para mostrar una lista se transforma un array en elementos con map.
- Cada elemento necesita una key única entre hermanos y estable en el tiempo, como el id del dato.
- Con el índice como key, agregar o reordenar elementos mezcla el estado de las filas.
- Una key que cambia en cada dibujo hace que React vuelva a crear todos los elementos.

### Entrevista

**En 30 segundos.** "Renderizo listas con `map` y una key estable y única entre hermanos, normalmente el id del dato. React la usa para reconciliar: saber qué elementos se mantienen, cuáles se agregan y cuáles se van. Evito el índice si la lista puede cambiar de orden, porque mezcla el estado de las filas."

**Trampa.** ¿Un componente puede leer su key como prop? **Respuesta.** No: React la usa internamente y no la pasa como prop. Si el componente necesita el id, hay que pasárselo además en otra prop.

**Cuándo no.** Si la lista es estática, nunca cambia de orden y sus filas no tienen estado interno, el índice como key no causa problemas. Igual, si hay un id, conviene usarlo.

---

## R7. Renderizado condicional · Junior · 5 min

**Concepto.** Mostrar una cosa u otra según una condición se hace con JavaScript común:

- **Ternario** `condicion ? <A /> : <B />` cuando hay dos alternativas.
- **`&&`** cuando hay una sola: `hayError && <Mensaje />`.
- **`if` con `return` temprano** antes del JSX principal, por ejemplo para un estado de carga.
- **`return null`** cuando el componente no tiene que mostrar nada.

La trampa clásica: con `&&`, si la condición es un número, `0 && <A />` da `0`, y React **muestra el 0**. Por eso conviene que la condición sea booleana: `cantidad > 0 && ...`.

Pensalo como un cartel de "Abierto / Cerrado" en una puerta: según la hora, se da vuelta y muestra una cara u otra.

**Ejemplo.**

```tsx
import { useState } from 'react'

export default function App() {
  const [tareas, setTareas] = useState<string[]>([])
  const urgentes = 0

  return (
    <main>
      {tareas.length === 0 ? (
        <p>No tenés tareas pendientes</p>
      ) : (
        <ul>
          {tareas.map(tarea => <li key={tarea}>{tarea}</li>)}
        </ul>
      )}

      {/* Con && hay que usar una condición booleana: {urgentes && ...} mostraría un 0. */}
      {urgentes > 0 && <p>Tenés {urgentes} tareas urgentes</p>}

      <button onClick={() => setTareas(['Comprar yerba'])}>Agregar una tarea</button>
    </main>
  )
}
```

*Código en `react-samples/07-renderizado-condicional/App.tsx`, verificado con TypeScript y un test.*

Con la lista vacía se ve el mensaje. `urgentes > 0 && ...` no muestra nada cuando `urgentes` es 0. Con `urgentes && ...` aparecería un "0" suelto en la pantalla.

### Práctica

1. ¿Qué muestra `{cantidad && <p>Tenés tareas</p>}` si `cantidad` es 0? **Respuesta.** Un "0" en la pantalla: `0 && algo` da 0, y React dibuja los números. La condición tiene que ser booleana: `cantidad > 0`.
2. ¿Cuándo usás un ternario y cuándo `&&`? **Respuesta.** El ternario cuando hay dos alternativas para mostrar. `&&` cuando se muestra algo o nada.
3. ¿Qué devuelve un componente que no tiene que mostrar nada? **Respuesta.** `null`.

### Tarea para tu máquina

Armá una pantalla con tres estados: "Cargando…", la lista de tareas y "No tenés tareas". Simulá cada uno con una variable y usá un `return` temprano para el estado de carga.

**Resultado esperado.** Al cambiar la variable se ve cada uno de los tres estados, y nunca aparece un número suelto en la pantalla.

### Resumen

- El renderizado condicional se hace con JavaScript común: ternarios, and lógico e if con return temprano.
- El ternario elige entre dos alternativas, y el and lógico muestra algo o nada.
- Con and lógico, una condición que vale cero muestra el cero en pantalla: conviene que sea booleana.
- Un componente que no tiene que mostrar nada devuelve null.

### Entrevista

**En 30 segundos.** "Uso ternarios para elegir entre dos alternativas, `&&` para mostrar algo o nada con condiciones booleanas, y `return` temprano para estados como carga o error. Cuando la lógica crece, extraigo componentes o variables con nombre para que el JSX siga legible."

**Trampa.** ¿Ocultar con CSS es lo mismo que no renderizar? **Respuesta.** No. Si no se renderiza, el componente no existe: pierde su estado y no consume recursos. Si se oculta con CSS, sigue montado y conserva su estado. A veces conviene una cosa y a veces la otra.

**Cuándo no.** Ternarios anidados dentro del JSX se vuelven ilegibles. Con más de dos casos, conviene un `if` antes del `return`, un objeto que mapee estados a componentes o un componente aparte.

---

## R8. Formularios controlados · Junior · 6 min

**Concepto.** En un **campo controlado**, el valor vive en el estado de React: el input recibe `value={titulo}` y cada tecla actualiza el estado con `onChange`. Así el estado es la única fuente de verdad, y es fácil validar, limpiar o transformar lo que se escribe.

En un **campo no controlado**, el valor vive en el DOM y se lee al enviar (con una `ref` o con `FormData`). Es más simple cuando no hace falta reaccionar a cada tecla.

Al enviar, `onSubmit` recibe el evento y se llama a `evento.preventDefault()` para que el navegador no recargue la página. Para accesibilidad, cada campo lleva un `label` asociado con `htmlFor`.

Pensalo como un formulario en papel con una persona al lado que va leyendo mientras escribís y te avisa si te equivocaste, en vez de revisarlo todo recién al final.

**Ejemplo.**

```tsx
import { useState, type FormEvent } from 'react'

export default function App() {
  const [titulo, setTitulo] = useState('')
  const [tareas, setTareas] = useState<string[]>([])
  const [error, setError] = useState('')

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const limpio = titulo.trim()
    if (limpio === '') {
      setError('Escribí un título')
      return
    }
    setTareas([...tareas, limpio])
    setTitulo('')
    setError('')
  }

  return (
    <main>
      <form onSubmit={enviar}>
        <label htmlFor="titulo">Nueva tarea</label>
        <input id="titulo" value={titulo} onChange={evento => setTitulo(evento.target.value)} />
        <button type="submit">Agregar</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <ul>
        {tareas.map(tarea => <li key={tarea}>{tarea}</li>)}
      </ul>
    </main>
  )
}
```

*Código en `react-samples/08-formularios/App.tsx`, verificado con TypeScript y un test.*

El campo está controlado por `titulo`. Al enviar se valida, se agrega la tarea, se limpia el campo y se borra el error.

### Práctica

1. ¿Qué hace que un campo sea controlado? **Respuesta.** Que su valor sale del estado (`value`) y cada cambio actualiza ese estado (`onChange`). React es la única fuente de verdad.
2. ¿Qué pasa si ponés `value={titulo}` pero te olvidás del `onChange`? **Respuesta.** El campo queda de solo lectura: el valor siempre es el del estado, que nunca cambia. React además avisa en la consola.
3. ¿Por qué `evento.preventDefault()` en el `onSubmit`? **Respuesta.** Porque el comportamiento por defecto de un formulario es enviarse y recargar la página, y eso borraría el estado de la app.

### Tarea para tu máquina

Agregá al formulario del ejemplo un campo de fecha de vencimiento obligatorio, con su `label`. Mostrá un error distinto si falta el título o la fecha, y deshabilitá el botón mientras el título esté vacío.

**Resultado esperado.** Cada error aparece solo cuando corresponde, el botón se habilita al escribir el título y, al enviar bien, los dos campos quedan vacíos.

### Resumen

- En un campo controlado, el valor vive en el estado y cada tecla lo actualiza.
- En uno no controlado, el valor vive en el DOM y se lee recién al enviar.
- Al enviar se llama a prevent default para que el navegador no recargue la página.
- Cada campo lleva un label asociado para que sea accesible.

### Entrevista

**En 30 segundos.** "Uso campos controlados cuando necesito validar o transformar mientras se escribe: el estado es la fuente de verdad. Para formularios simples, o muy grandes, uso campos no controlados y leo los valores al enviar. En el envío prevengo el comportamiento por defecto, valido y doy feedback accesible."

**Trampa.** ¿Qué agregó React 19 a los formularios? **Respuesta.** Permite pasarle una función a la prop `action` del `form`: React la llama con un `FormData` al enviar, y hooks como `useActionState` manejan el resultado y el estado de envío. Para formularios con muchas reglas, en proyectos grandes también se usan librerías como React Hook Form.

**Cuándo no.** En un formulario con decenas de campos, controlar cada uno con su propio estado vuelve a dibujar todo en cada tecla y llena el componente de código repetido. Ahí convienen campos no controlados o una librería de formularios.

---

---

# Semi Senior (publicado; borrador de referencia)

| # | Lección | Ejemplo | Min |
| --- | --- | --- | --- |
| R9 | useEffect: sincronizar con el exterior | `09-use-effect` | 7 |
| R10 | useMemo y useCallback | `10-use-memo-y-use-callback` | 6 |
| R11 | useRef | `11-use-ref` | 5 |
| R12 | Hooks propios | `12-hooks-propios` | 5 |
| R13 | Context | `13-context` | 6 |
| R14 | Estado global con useReducer y Context | `14-estado-global` | 7 |
| R15 | Datos remotos: carga, error y reintento | `15-datos-remotos` | 6 |
| R16 | Routing con React Router | `16-routing` | 6 |
| R17 | TypeScript con React | `17-typescript` | 6 |
| R18 | Testing con Testing Library | `18-testing` | 6 |
| R19 | Performance | `19-performance` | 7 |

---

## R9. useEffect: sincronizar con el exterior · Semi Senior · 7 min

**Concepto.** `useEffect` sirve para **sincronizar un componente con algo de afuera de React**: un pedido a una API, un temporizador, una suscripción o el título de la página. Corre **después** de que React dibuja.

- **Dependencias:** el array del final dice cuándo volver a correr. `[]` corre una vez al montar; `[filtro]`, cada vez que cambia `filtro`. Hay que incluir todo lo que el efecto usa.
- **Limpieza:** la función que devuelve el efecto se ejecuta antes de volver a correrlo y al desmontar. Ahí se cancela lo que quedó pendiente.
- **Modo estricto:** en desarrollo, React monta, desmonta y vuelve a montar cada componente para que se note si falta la limpieza.

Muchas cosas **no necesitan un efecto**: un dato que se calcula a partir de otros se calcula al dibujar, y lo que responde a un clic va en el manejador del evento.

Pensalo como el piloto automático de un avión: cada vez que cambia el rumbo indicado, corrige el avión para que coincida; si se apaga, suelta los controles.

**Ejemplo.**

```tsx
import { useEffect, useState } from 'react'

type Tarea = { id: number; titulo: string; hecha: boolean }

// Simula una API: en una app real sería un fetch.
function buscarTareas(soloPendientes: boolean): Promise<Tarea[]> {
  const todas = [
    { id: 1, titulo: 'Comprar yerba', hecha: true },
    { id: 2, titulo: 'Pagar la luz', hecha: false },
  ]
  return new Promise(resolve =>
    setTimeout(() => resolve(soloPendientes ? todas.filter(t => !t.hecha) : todas), 300))
}

export default function App() {
  const [soloPendientes, setSoloPendientes] = useState(false)
  const [tareas, setTareas] = useState<Tarea[]>([])

  useEffect(() => {
    let ignorar = false
    buscarTareas(soloPendientes).then(resultado => {
      if (!ignorar) setTareas(resultado)
    })
    // Limpieza: si el filtro cambia antes de que llegue la respuesta, se descarta la vieja.
    return () => { ignorar = true }
  }, [soloPendientes])

  return (
    <main>
      <label>
        <input type="checkbox" checked={soloPendientes}
          onChange={evento => setSoloPendientes(evento.target.checked)} />
        Solo pendientes
      </label>
      <ul>
        {tareas.map(tarea => <li key={tarea.id}>{tarea.titulo}</li>)}
      </ul>
    </main>
  )
}
```

*Código en `react-samples/09-use-effect/App.tsx`, verificado con TypeScript y un test.*

Cada vez que cambia `soloPendientes`, el efecto pide las tareas otra vez. Si la persona cambia el filtro antes de que llegue la respuesta anterior, la limpieza marca `ignorar` y esa respuesta vieja se descarta: así se evita una *race condition*.

### Práctica

1. ¿Cuándo corre un efecto con `[]` como dependencias? **Respuesta.** Una vez, después del primer dibujo. En desarrollo con modo estricto corre dos veces (montar, desmontar, montar) para revelar limpiezas faltantes.
2. ¿Para qué sirve la función de limpieza? **Respuesta.** Para deshacer lo que hizo el efecto antes de que vuelva a correr o al desmontar: cancelar un temporizador, desuscribirse o descartar una respuesta que ya no sirve.
3. ¿Usarías un efecto para calcular `pendientes` a partir de `tareas`? **Respuesta.** No. Se calcula directamente al dibujar. Un efecto que copia un dato en otro estado agrega un dibujo extra y dos fuentes de verdad.

### Tarea para tu máquina

Hacé un componente que muestre un reloj que se actualiza cada segundo, con `setInterval` dentro de un `useEffect`. Agregá un botón que lo oculte. Probalo primero sin limpieza y después con `clearInterval` en la limpieza.

**Resultado esperado.** Sin limpieza, aparece en la consola un aviso o el intervalo sigue corriendo después de ocultar el reloj. Con limpieza, el intervalo se detiene al desmontar.

### Resumen

- Use effect sincroniza un componente con algo de afuera de React, y corre después de dibujar.
- El array de dependencias dice cuándo vuelve a correr, y tiene que incluir todo lo que el efecto usa.
- La función de limpieza deshace lo que hizo el efecto antes de volver a correr o al desmontar.
- Lo que se calcula a partir de otros datos no necesita un efecto.

### Entrevista

**En 30 segundos.** "Uso `useEffect` para sincronizar con sistemas externos: APIs, suscripciones o temporizadores. Declaro todas las dependencias, siempre limpio lo que el efecto deja abierto y evito efectos para datos derivados o para lógica que corresponde a un evento. Para pedidos de datos, en proyectos grandes prefiero una librería como TanStack Query."

**Trampa.** ¿Por qué mi efecto corre dos veces en desarrollo? **Respuesta.** Por el modo estricto: React monta, desmonta y vuelve a montar el componente a propósito para que se note si falta la limpieza. En producción corre una vez. La solución no es apagar el modo estricto, sino escribir bien la limpieza.

**Cuándo no.** Si algo pasa por una acción de la persona, como enviar un formulario, va en el manejador del evento, no en un efecto que mira un estado.

---

## R10. useMemo y useCallback · Semi Senior · 6 min

**Concepto.** En cada dibujo, el código del componente se vuelve a ejecutar: los cálculos se repiten y las funciones se vuelven a crear.

- **`useMemo(() => calculo, [deps])`** guarda el **resultado** de un cálculo y solo lo recalcula si cambian sus dependencias.
- **`useCallback(fn, [deps])`** guarda la **misma función** entre dibujos.

Sirven en tres casos: un cálculo realmente costoso, una prop que va a un hijo envuelto en `memo` (que solo se vuelve a dibujar si sus props cambian) y una dependencia de un efecto. Fuera de esos casos, agregan complejidad sin beneficio. El React Compiler puede aplicar esta memorización automáticamente.

Pensalo como anotar el resultado de una cuenta larga en un papel: si los números no cambiaron, mirás el papel en vez de volver a hacerla.

**Ejemplo.**

```tsx
import { memo, useCallback, useMemo, useState } from 'react'

type Tarea = { id: number; titulo: string }

const tareas: Tarea[] = Array.from({ length: 200 }, (_, i) => ({ id: i, titulo: `Tarea ${i}` }))

const Fila = memo(function Fila({ tarea, alBorrar }: { tarea: Tarea; alBorrar: (id: number) => void }) {
  return <li>{tarea.titulo} <button onClick={() => alBorrar(tarea.id)}>Borrar</button></li>
})

export default function App() {
  const [busqueda, setBusqueda] = useState('')
  const [borradas, setBorradas] = useState<number[]>([])
  const [modoOscuro, setModoOscuro] = useState(false)

  // Se recalcula solo si cambian la búsqueda o las borradas, no al cambiar el modo oscuro.
  const visibles = useMemo(
    () => tareas.filter(t => !borradas.includes(t.id) && t.titulo.includes(busqueda)),
    [busqueda, borradas],
  )

  // La misma función entre dibujos: las filas memorizadas no se vuelven a dibujar sin motivo.
  const alBorrar = useCallback((id: number) => setBorradas(previas => [...previas, id]), [])

  return (
    <main className={modoOscuro ? 'oscuro' : ''}>
      <button onClick={() => setModoOscuro(!modoOscuro)}>Cambiar modo</button>
      <input aria-label="Buscar" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      <p>{visibles.length} tareas</p>
      <ul>{visibles.slice(0, 5).map(t => <Fila key={t.id} tarea={t} alBorrar={alBorrar} />)}</ul>
    </main>
  )
}
```

*Código en `react-samples/10-use-memo-y-use-callback/App.tsx`, verificado con TypeScript y un test.*

Cambiar el modo oscuro vuelve a dibujar `App`, pero `visibles` no se recalcula (sus dependencias no cambiaron) y las `Fila`, envueltas en `memo`, no se vuelven a dibujar, porque `alBorrar` es la misma función gracias a `useCallback`.

### Práctica

1. ¿Qué diferencia hay entre `useMemo` y `useCallback`? **Respuesta.** `useMemo` guarda el resultado de una función; `useCallback` guarda la función misma. `useCallback(fn, deps)` equivale a `useMemo(() => fn, deps)`.
2. ¿Sirve `useCallback` si el hijo no está envuelto en `memo`? **Respuesta.** En general no: el hijo se vuelve a dibujar igual cuando se dibuja el padre. Sirve si la función es dependencia de un efecto o de otro `useMemo`.
3. ¿Conviene envolver cada cálculo en `useMemo`? **Respuesta.** No. Tiene su propio costo y complica el código. Se usa cuando se midió un problema o cuando hace falta una referencia estable.

### Tarea para tu máquina

Instalá React DevTools en tu navegador y abrí el Profiler sobre una lista de 200 elementos con un botón que cambia algo no relacionado. Grabá un clic sin `memo` ni `useCallback`, y después con los dos.

**Resultado esperado.** En la primera grabación todas las filas se vuelven a dibujar. En la segunda, el Profiler muestra que las filas no se dibujaron.

### Resumen

- En cada dibujo se repiten los cálculos y se vuelven a crear las funciones.
- Use memo guarda el resultado de un cálculo, y use callback guarda la misma función entre dibujos.
- Sirven para cálculos costosos, para props de hijos memorizados y para dependencias de efectos.
- Fuera de esos casos agregan complejidad sin beneficio: primero se mide.

### Entrevista

**En 30 segundos.** "`useMemo` memoriza un valor y `useCallback` una función, para mantener referencias estables entre dibujos. Los uso con hijos envueltos en `memo`, con cálculos caros o con dependencias de efectos, siempre después de medir con el Profiler. El React Compiler automatiza buena parte de esto."

**Trampa.** ¿`useMemo` garantiza que el cálculo no se repita nunca? **Respuesta.** No. Es una optimización: React puede descartar el valor guardado y recalcularlo. El código tiene que funcionar bien aunque se recalcule.

**Cuándo no.** Envolver todo "por las dudas" hace el código más difícil de leer y puede ser más lento que no memorizar nada.

---

## R11. useRef · Semi Senior · 5 min

**Concepto.** `useRef` guarda un valor que **sobrevive entre dibujos pero no provoca un nuevo dibujo al cambiar**. Se lee y se escribe en `ref.current`. Tiene dos usos:

- **Acceder a un elemento del DOM**, pasándole la ref con `ref={campo}`: enfocar un campo, medir un elemento o hacer scroll.
- **Guardar un valor mutable** que no se muestra: el id de un temporizador o un contador interno.

No conviene leer ni escribir refs mientras el componente se dibuja (salvo para inicializarlas), porque React no se entera de esos cambios. Desde React 19, un componente de función puede recibir `ref` como una prop común.

Pensalo como un cajón de escritorio: guardás algo ahí, sigue estando cuando volvés, pero cambiar lo que hay adentro no hace que nadie se entere.

**Ejemplo.**

```tsx
import { useRef, useState } from 'react'

export default function App() {
  const campo = useRef<HTMLInputElement>(null)
  const clics = useRef(0)
  const [titulo, setTitulo] = useState('')

  function enfocar() {
    campo.current?.focus()
    // Cambiar una ref no vuelve a dibujar el componente.
    clics.current += 1
  }

  return (
    <main>
      <input ref={campo} aria-label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <button onClick={enfocar}>Escribir una tarea</button>
      <button onClick={() => alert(`Enfocaste el campo ${clics.current} veces`)}>¿Cuántas veces?</button>
    </main>
  )
}
```

*Código en `react-samples/11-use-ref/App.tsx`, verificado con TypeScript y un test.*

`campo` apunta al input y permite enfocarlo. `clics` cuenta sin volver a dibujar: el número solo se lee cuando se toca el segundo botón.

### Práctica

1. ¿Qué diferencia hay entre una ref y un estado? **Respuesta.** Cambiar un estado provoca un nuevo dibujo; cambiar `ref.current`, no. Lo que se muestra en pantalla va en el estado.
2. ¿Cuándo está disponible `campo.current` apuntando al input? **Respuesta.** Después de que React dibuja y conecta el elemento: en un efecto o en un manejador de eventos. Durante el primer dibujo todavía es `null`.
3. ¿Por qué no mostrar `clics.current` en el JSX? **Respuesta.** Porque al cambiar no provoca un nuevo dibujo, así que la pantalla quedaría desactualizada.

### Tarea para tu máquina

Armá un cronómetro con botones Iniciar y Detener. Guardá el id del `setInterval` en una ref y los segundos en un estado.

**Resultado esperado.** Detener corta el intervalo correcto aunque hayas iniciado y detenido varias veces, y los segundos se ven actualizados.

### Resumen

- Use ref guarda un valor que sobrevive entre dibujos sin provocar uno nuevo al cambiar.
- Sirve para acceder a elementos del DOM, como enfocar un campo.
- También sirve para guardar valores que no se muestran, como el id de un temporizador.
- Lo que se muestra en pantalla va en el estado, no en una ref.

### Entrevista

**En 30 segundos.** "Uso `useRef` para acceder al DOM, como enfocar o medir un elemento, y para guardar valores mutables que no afectan lo que se ve, como el id de un temporizador. Lo que se muestra va en el estado, porque cambiar una ref no vuelve a dibujar."

**Trampa.** ¿Hace falta `forwardRef` para pasar una ref a un componente propio? **Respuesta.** Ya no desde React 19: los componentes de función reciben `ref` como una prop común. `forwardRef` sigue funcionando y aparece en código anterior.

**Cuándo no.** Manipular el DOM a mano con refs para cosas que React puede declarar (agregar clases, mostrar u ocultar) rompe el modelo: React y el DOM quedan desincronizados.

---

## R12. Hooks propios · Semi Senior · 5 min

**Concepto.** Un **hook propio** es una función cuyo nombre empieza con `use` y que usa otros hooks adentro. Sirve para **extraer lógica con estado y reutilizarla** en varios componentes.

Lo que se comparte es la **lógica**, no el estado: cada componente que llama al hook tiene su propia copia del estado.

Cumple las **reglas de los hooks**: se llaman siempre en el nivel superior del componente o de otro hook, nunca dentro de un `if`, un bucle o una función común.

Pensalo como una receta guardada: cada vez que la usás, cocinás tu propia porción; no compartís el plato con quien usó la misma receta.

**Ejemplo.**

```tsx
import { useState } from 'react'

type Tarea = { id: number; titulo: string; hecha: boolean }

// Un hook propio: lógica con estado que se puede reutilizar en varios componentes.
function useTareas(iniciales: Tarea[]) {
  const [tareas, setTareas] = useState(iniciales)

  function alternar(id: number) {
    setTareas(actuales => actuales.map(t => (t.id === id ? { ...t, hecha: !t.hecha } : t)))
  }

  const pendientes = tareas.filter(t => !t.hecha).length
  return { tareas, alternar, pendientes }
}

export default function App() {
  const { tareas, alternar, pendientes } = useTareas([
    { id: 1, titulo: 'Comprar yerba', hecha: false },
    { id: 2, titulo: 'Pagar la luz', hecha: false },
  ])

  return (
    <main>
      <p>Pendientes: {pendientes}</p>
      <ul>
        {tareas.map(t => (
          <li key={t.id}>
            <label>
              <input type="checkbox" checked={t.hecha} onChange={() => alternar(t.id)} />
              {t.titulo}
            </label>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

*Código en `react-samples/12-hooks-propios/App.tsx`, verificado con TypeScript y un test.*

`useTareas` encapsula el estado, la acción `alternar` y el cálculo de `pendientes`. El componente queda corto y la lógica se puede testear y reutilizar.

### Práctica

1. ¿Por qué el nombre tiene que empezar con `use`? **Respuesta.** Es la convención que usan React y sus herramientas (como el linter) para saber que es un hook y verificar las reglas.
2. Dos componentes usan `useTareas`. ¿Comparten las mismas tareas? **Respuesta.** No: cada uno tiene su propio estado. Para compartirlo, el estado tiene que subir a un padre común o a un contexto.
3. ¿Se puede llamar a un hook dentro de un `if`? **Respuesta.** No. React identifica cada hook por el orden en que se llama, así que el orden tiene que ser el mismo en cada dibujo.

### Tarea para tu máquina

Escribí un hook `useAlternar(inicial)` que devuelva el valor y una función para invertirlo. Usalo en dos componentes distintos: un menú desplegable y un interruptor de modo oscuro.

**Resultado esperado.** Cada componente maneja su propio valor de forma independiente, con el mismo hook.

### Resumen

- Un hook propio es una función que empieza con use y usa otros hooks adentro.
- Sirve para extraer lógica con estado y reutilizarla en varios componentes.
- Se comparte la lógica, no el estado: cada componente tiene su propia copia.
- Los hooks se llaman siempre en el nivel superior, nunca dentro de condiciones ni bucles.

### Entrevista

**En 30 segundos.** "Extraigo lógica con estado a hooks propios cuando se repite o cuando ensucia el componente: carga de datos, formularios o suscripciones. Cada componente que lo usa tiene su propio estado, y respeto las reglas de los hooks, con el linter de React activo."

**Trampa.** ¿Por qué los hooks no pueden ir dentro de un `if`? **Respuesta.** Porque React guarda el estado de cada hook según el orden de las llamadas. Si un `if` saltea un hook en un dibujo, el orden cambia y React le asigna a cada hook el estado de otro.

**Cuándo no.** Si la lógica no usa hooks, alcanza con una función común. Y un hook usado una sola vez, que solo mueve código de lugar, no siempre aporta claridad.

---

## R13. Context · Semi Senior · 6 min

**Concepto.** Context permite que un componente **pase un dato a todo su subárbol sin pasarlo por props** en cada nivel, evitando el *prop drilling*. Se crea con `createContext(valorPorDefecto)`, un componente de arriba lo provee y cualquier descendiente lo lee con `useContext`.

- Desde React 19, el contexto se usa directamente como proveedor: `<TemaContext value={tema}>` (antes, `<TemaContext.Provider>`).
- Cuando cambia el valor, **se vuelven a dibujar todos los componentes que lo leen**. Por eso conviene separar contextos por tema y no meter en uno solo datos que cambian seguido.
- Es ideal para datos que usa mucha gente y cambian poco: tema, idioma o usuario conectado.

Pensalo como la música ambiente de un local: suena para todos los que están adentro, sin que haya que pasarle un parlante a cada persona.

**Ejemplo.**

```tsx
import { createContext, useContext, useState } from 'react'

type Tema = 'claro' | 'oscuro'
const TemaContext = createContext<Tema>('claro')

function TarjetaDeTarea({ titulo }: { titulo: string }) {
  // Lee el tema sin que nadie se lo pase por props.
  const tema = useContext(TemaContext)
  return <article className={`tarjeta ${tema}`}>{titulo} · tema {tema}</article>
}

function ListaDeTareas() {
  return (
    <section>
      <TarjetaDeTarea titulo="Comprar yerba" />
      <TarjetaDeTarea titulo="Pagar la luz" />
    </section>
  )
}

export default function App() {
  const [tema, setTema] = useState<Tema>('claro')

  return (
    // Desde React 19, el contexto se puede usar directamente como proveedor.
    <TemaContext value={tema}>
      <button onClick={() => setTema(tema === 'claro' ? 'oscuro' : 'claro')}>Cambiar tema</button>
      <ListaDeTareas />
    </TemaContext>
  )
}
```

*Código en `react-samples/13-context/App.tsx`, verificado con TypeScript y un test.*

`TarjetaDeTarea` lee el tema sin que `ListaDeTareas` lo reciba ni lo pase. Al cambiar el tema, las dos tarjetas se actualizan.

### Práctica

1. ¿Qué problema resuelve Context? **Respuesta.** El *prop drilling*: pasar un dato a través de varios componentes intermedios que no lo usan, solo para que llegue abajo.
2. ¿Qué pasa con los componentes que leen un contexto cuando cambia su valor? **Respuesta.** Se vuelven a dibujar todos, aunque solo usen una parte del valor.
3. ¿Qué devuelve `useContext` si no hay ningún proveedor arriba? **Respuesta.** El valor por defecto que se pasó a `createContext`.

### Tarea para tu máquina

Creá un `UsuarioContext` con el nombre de la persona conectada y mostralo en un encabezado y en un pie de página, que estén en distintas ramas del árbol. Agregá un botón para cambiar de usuario.

**Resultado esperado.** El encabezado y el pie muestran el mismo nombre y se actualizan juntos, sin que ningún componente intermedio reciba el nombre por props.

### Resumen

- Context pasa un dato a todo un subárbol sin pasarlo por props en cada nivel.
- Un componente lo provee y los descendientes lo leen con use context.
- Cuando cambia el valor, se vuelven a dibujar todos los componentes que lo leen.
- Es ideal para datos que usa mucha gente y cambian poco, como el tema o el usuario.

### Entrevista

**En 30 segundos.** "Uso Context para datos transversales que cambian poco, como tema, idioma o sesión, y así evito el prop drilling. Separo contextos por responsabilidad y cuido que el valor no cambie de referencia en cada dibujo, porque todos los consumidores se vuelven a dibujar."

**Trampa.** ¿Context reemplaza a Redux? **Respuesta.** No exactamente. Context es un mecanismo para pasar datos, no una herramienta de manejo de estado. Combinado con `useReducer` alcanza para muchas apps, pero las librerías de estado agregan suscripciones selectivas, herramientas de depuración y mejor rendimiento cuando el estado cambia seguido.

**Cuándo no.** Si el dato solo baja uno o dos niveles, pasarlo por props es más simple y explícito. Y un contexto con datos que cambian muchas veces por segundo vuelve a dibujar media app.

---

## R14. Estado global con useReducer y Context · Semi Senior · 7 min

**Concepto.** Cuando muchas partes de la app leen y cambian el mismo estado, conviene centralizarlo.

- **`useReducer`** ordena la lógica: en vez de llamar a varios setters, se **despachan acciones** (`{ tipo: 'agregar', titulo }`), y una función pura, el **reducer**, recibe el estado y la acción y devuelve el estado nuevo.
- Combinado con **Context**, el estado y la función `despachar` quedan disponibles para toda la app.

En apps grandes se suele usar una librería: **Redux Toolkit** (el patrón reducer con herramientas), **Zustand** (más liviano) u otras. Y un consejo importante: los **datos del servidor** (lo que viene de una API) se manejan mejor con una librería de *server state* como **TanStack Query**, que resuelve caché, reintentos y actualización.

Pensalo como la caja de un restaurante: los mozos no cambian la cuenta a mano; le pasan un pedido a la caja ("agregar un café") y la caja actualiza la cuenta con reglas claras.

**Ejemplo.**

```tsx
import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'

type Tarea = { id: number; titulo: string; hecha: boolean }
type Accion = { tipo: 'agregar'; titulo: string } | { tipo: 'alternar'; id: number }

// El reducer recibe el estado y una acción, y devuelve el estado nuevo. Es una función pura.
function tareasReducer(tareas: Tarea[], accion: Accion): Tarea[] {
  switch (accion.tipo) {
    case 'agregar':
      return [...tareas, { id: tareas.length + 1, titulo: accion.titulo, hecha: false }]
    case 'alternar':
      return tareas.map(t => (t.id === accion.id ? { ...t, hecha: !t.hecha } : t))
  }
}

const TareasContext = createContext<{ tareas: Tarea[]; despachar: Dispatch<Accion> } | null>(null)

function useTareasGlobales() {
  const valor = useContext(TareasContext)
  if (!valor) throw new Error('useTareasGlobales tiene que usarse dentro de ProveedorDeTareas')
  return valor
}

function ProveedorDeTareas({ children }: { children: ReactNode }) {
  const [tareas, despachar] = useReducer(tareasReducer, [{ id: 1, titulo: 'Comprar yerba', hecha: false }])
  return <TareasContext value={{ tareas, despachar }}>{children}</TareasContext>
}

function Contador() {
  const { tareas } = useTareasGlobales()
  return <p>Pendientes: {tareas.filter(t => !t.hecha).length}</p>
}

function Lista() {
  const { tareas, despachar } = useTareasGlobales()
  return (
    <>
      <button onClick={() => despachar({ tipo: 'agregar', titulo: 'Pagar la luz' })}>Agregar</button>
      <ul>
        {tareas.map(t => (
          <li key={t.id}>
            <button onClick={() => despachar({ tipo: 'alternar', id: t.id })}>{t.hecha ? '✓' : '○'}</button> {t.titulo}
          </li>
        ))}
      </ul>
    </>
  )
}

export default function App() {
  return (
    <ProveedorDeTareas>
      <Contador />
      <Lista />
    </ProveedorDeTareas>
  )
}
```

*Código en `react-samples/14-estado-global/App.tsx`, verificado con TypeScript y un test.*

`Contador` y `Lista` leen el mismo estado. Los cambios pasan siempre por el reducer, así que la lógica está en un solo lugar y se puede testear sin interfaz. El hook `useTareasGlobales` avisa con un error claro si alguien lo usa fuera del proveedor.

### Práctica

1. ¿Qué es un reducer? **Respuesta.** Una función pura que recibe el estado actual y una acción, y devuelve el estado nuevo, sin modificar el anterior.
2. ¿Qué ventaja tiene despachar acciones frente a varios `setState` sueltos? **Respuesta.** Toda la lógica de cambios queda en un solo lugar, cada cambio tiene un nombre y el reducer se puede testear como una función común.
3. ¿Guardarías las respuestas de la API en el estado global? **Respuesta.** Mejor no a mano. Para datos del servidor conviene una librería como TanStack Query, que maneja caché, reintentos y datos desactualizados.

### Tarea para tu máquina

Al ejemplo, sumale una acción `borrar` y otra `limpiarHechas`. Escribí tests del reducer solo, sin dibujar componentes: llamalo con un estado y una acción y verificá el resultado.

**Resultado esperado.** Los tests del reducer pasan sin usar Testing Library, porque es una función común.

### Resumen

- Use reducer centraliza la lógica de cambios: se despachan acciones y un reducer devuelve el estado nuevo.
- Un reducer es una función pura que se puede testear sin interfaz.
- Combinado con context, el estado queda disponible para toda la app.
- Los datos del servidor se manejan mejor con una librería como TanStack Query.

### Entrevista

**En 30 segundos.** "Separo el estado del servidor del estado de la interfaz. Para el del servidor uso TanStack Query; para el de la interfaz compartido, `useReducer` con Context en apps chicas, o Redux Toolkit o Zustand cuando crece y hacen falta suscripciones selectivas y herramientas de depuración."

**Trampa.** ¿Redux o Zustand? **Respuesta.** Depende. Redux Toolkit da estructura, convenciones y DevTools potentes, y conviene en equipos grandes. Zustand es más liviano y con menos código repetitivo. Lo importante es justificar la elección según el tamaño del equipo y la complejidad del estado.

**Cuándo no.** Poner todo en un estado global, incluso lo que usa un solo componente, hace que todo dependa de todo. El estado vive lo más cerca posible de donde se usa.

---

## R15. Datos remotos: carga, error y reintento · Semi Senior · 6 min

**Concepto.** Todo pedido de datos tiene al menos tres estados: **cargando, error y listo**. Conviene modelarlos como un **tipo con alternativas** en vez de varios booleanos sueltos (`cargando`, `hayError`), que permiten combinaciones imposibles como "cargando y con error a la vez".

Además:

- Mostrar un estado de carga accesible (`role="status"`) y un error con acción para **reintentar**.
- Descartar respuestas viejas si el pedido cambia o el componente se desmonta (la *race condition* de R9).
- En proyectos reales, **TanStack Query** resuelve todo esto más caché, reintentos automáticos y pedidos duplicados.

Pensalo como el seguimiento de un envío: "en preparación", "en camino", "entregado" o "no se pudo entregar, reprogramar". Nunca dos a la vez.

**Ejemplo.**

```tsx
import { useEffect, useState } from 'react'

type Estado =
  | { tipo: 'cargando' }
  | { tipo: 'error'; mensaje: string }
  | { tipo: 'listo'; tareas: string[] }

// Simula una API que falla la primera vez, para practicar el reintento.
let intentos = 0
function buscarTareas(): Promise<string[]> {
  intentos += 1
  return new Promise((resolve, reject) => setTimeout(() =>
    intentos === 1 ? reject(new Error('Sin conexión')) : resolve(['Comprar yerba', 'Pagar la luz']), 300))
}

export default function App() {
  const [estado, setEstado] = useState<Estado>({ tipo: 'cargando' })
  const [pedido, setPedido] = useState(0)

  useEffect(() => {
    let ignorar = false
    setEstado({ tipo: 'cargando' })
    buscarTareas()
      .then(tareas => { if (!ignorar) setEstado({ tipo: 'listo', tareas }) })
      .catch((error: Error) => { if (!ignorar) setEstado({ tipo: 'error', mensaje: error.message }) })
    return () => { ignorar = true }
  }, [pedido])

  if (estado.tipo === 'cargando') return <p role="status">Cargando tareas…</p>
  if (estado.tipo === 'error') {
    return (
      <div role="alert">
        <p>No pudimos traer las tareas: {estado.mensaje}</p>
        <button onClick={() => setPedido(pedido + 1)}>Reintentar</button>
      </div>
    )
  }
  return <ul>{estado.tareas.map(t => <li key={t}>{t}</li>)}</ul>
}
```

*Código en `react-samples/15-datos-remotos/App.tsx`, verificado con TypeScript y un test.*

La API simulada falla la primera vez. Se ve "Cargando…", después el error con el botón Reintentar y, al reintentar, la lista. El tipo `Estado` hace imposible tener tareas y error al mismo tiempo.

### Práctica

1. ¿Por qué un tipo con alternativas en vez de `cargando` y `error` como booleanos? **Respuesta.** Porque los booleanos permiten estados imposibles (cargando y con error a la vez) y obligan a recordar resetearlos. Con alternativas, TypeScript obliga a contemplar cada caso.
2. ¿Qué pasa si el componente se desmonta antes de que llegue la respuesta y no hay limpieza? **Respuesta.** Se intenta actualizar el estado de un componente que ya no está. Con un filtro que cambia rápido, una respuesta vieja puede pisar a la nueva.
3. ¿Qué agrega TanStack Query frente a hacerlo a mano? **Respuesta.** Caché compartida, reintentos, eliminación de pedidos duplicados, datos actualizados al volver a la pestaña y estados de carga listos para usar.

### Tarea para tu máquina

Consumí una API pública con `fetch` (por ejemplo JSONPlaceholder) mostrando los tres estados. Simulá un error cambiando la URL por una que no existe y verificá el reintento. Si te animás, repetilo con TanStack Query y compará cuánto código te ahorra.

**Resultado esperado.** Se ven los tres estados, y un error HTTP (por ejemplo un 404) se muestra como error. Ojo: `fetch` no rechaza la promesa ante un 404, así que hay que revisar `response.ok`.

### Resumen

- Todo pedido de datos tiene al menos tres estados: cargando, error y listo.
- Conviene modelarlos como un tipo con alternativas, no como varios booleanos sueltos.
- Un buen error explica qué pasó y permite reintentar.
- En proyectos reales, TanStack Query resuelve caché, reintentos y pedidos duplicados.

### Entrevista

**En 30 segundos.** "Modelo los datos remotos con un tipo de alternativas (cargando, error y listo), muestro un error con reintento y descarto respuestas viejas. En proyectos reales uso TanStack Query, que además resuelve caché, reintentos, deduplicación y revalidación."

**Trampa.** ¿`fetch` rechaza la promesa si el servidor responde 404 o 500? **Respuesta.** No. Solo rechaza si falla la red. Un 404 o un 500 llegan como respuesta normal: hay que revisar `response.ok` o el código de estado y tratarlo como error.

**Cuándo no.** Para un dato que se pide una vez y no se comparte, un efecto simple alcanza. TanStack Query se paga solo cuando hay varios pedidos, datos compartidos o necesidad de caché.

---

## R16. Routing con React Router · Semi Senior · 6 min

**Concepto.** En una *single page application* hay una sola página HTML, y el **router** decide qué componentes mostrar según la URL, sin recargar. Con **React Router** (en este ejemplo, la versión 8):

- **`<Routes>` y `<Route path element>`** declaran qué componente va con cada ruta.
- **`<Link to>`** navega sin recargar la página.
- **`useParams`** lee los parámetros de la URL (`/tareas/:id` → `id`).
- **`useNavigate`** navega desde código, por ejemplo después de guardar.
- **`<Outlet>`** marca dónde se dibujan las rutas anidadas dentro de un layout.

En una app real se usa `BrowserRouter` (o un router de datos con `createBrowserRouter`). Y el servidor tiene que devolver la app para cualquier ruta: si no, al recargar `/tareas/2` aparece un 404.

Pensalo como el índice de un libro: cada capítulo tiene su número de página, y podés ir directo a uno sin leer los anteriores.

**Ejemplo.**

```tsx
import { Link, MemoryRouter, Route, Routes, useParams } from 'react-router'

const tareas = [
  { id: '1', titulo: 'Comprar yerba' },
  { id: '2', titulo: 'Pagar la luz' },
]

function Lista() {
  return (
    <ul>
      {tareas.map(t => <li key={t.id}><Link to={`/tareas/${t.id}`}>{t.titulo}</Link></li>)}
    </ul>
  )
}

function Detalle() {
  const { id } = useParams()
  const tarea = tareas.find(t => t.id === id)
  if (!tarea) return <p>No encontramos esa tarea</p>
  return (
    <>
      <h1>{tarea.titulo}</h1>
      <Link to="/">Volver</Link>
    </>
  )
}

export default function App() {
  // En una app real se usa BrowserRouter (o un router de datos). MemoryRouter guarda la
  // dirección en memoria, cómodo para ejemplos y tests.
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Lista />} />
        <Route path="/tareas/:id" element={<Detalle />} />
      </Routes>
    </MemoryRouter>
  )
}
```

*Código en `react-samples/16-routing/App.tsx`, verificado con TypeScript y un test.*

*En la app, el editor en vivo carga React Router como dependencia.* La lista enlaza al detalle; el detalle lee el `id` de la URL y muestra un mensaje si la tarea no existe.

### Práctica

1. ¿Por qué `<Link>` y no un `<a href>` común? **Respuesta.** `<Link>` cambia la URL y muestra la nueva ruta sin recargar la página, así que se conserva el estado de la app. Un `<a>` común recarga todo.
2. ¿Cómo leés el `id` de `/tareas/:id`? **Respuesta.** Con `useParams()`, que devuelve un objeto con `id`. Llega como texto, así que si es un número hay que convertirlo.
3. Al recargar `/tareas/2` en producción aparece un 404. ¿Por qué? **Respuesta.** El servidor busca un archivo en esa ruta y no existe. Hay que configurarlo para que devuelva la app en cualquier ruta, o prerenderizar las páginas.

### Tarea para tu máquina

En tu proyecto de Vite, instalá React Router y armá tres rutas (`/`, `/tareas/:id` y una ruta `*` de página no encontrada) dentro de un layout con encabezado y `<Outlet>`. Después de "guardar" en el detalle, navegá a la lista con `useNavigate`.

**Resultado esperado.** El encabezado se mantiene al navegar, una URL inventada muestra la página no encontrada y guardar te devuelve a la lista.

### Resumen

- En una aplicación de una sola página, el router decide qué mostrar según la URL, sin recargar.
- Routes y Route declaran las rutas, y Link navega sin recargar la página.
- Use params lee los parámetros de la URL, y use navigate navega desde el código.
- El servidor tiene que devolver la app en cualquier ruta, o recargar una ruta interna da un error.

### Entrevista

**En 30 segundos.** "Uso React Router con rutas declarativas, layouts con `Outlet` para las anidadas, `useParams` para los parámetros y `useNavigate` para navegar después de una acción. Cuido la ruta de no encontrada y la configuración del servidor para que los enlaces profundos funcionen al recargar."

**Trampa.** ¿Qué es *code splitting* por ruta y por qué importa? **Respuesta.** Cargar el código de cada pantalla recién cuando se visita (con `lazy` y `Suspense`, o con la carga perezosa del router), así la primera carga descarga menos JavaScript. Es una mejora de rendimiento clásica en apps con muchas pantallas.

**Cuándo no.** Si la app es una sola pantalla con pestañas que no necesitan URL propia, un estado alcanza. El router se justifica cuando las vistas tienen que poder compartirse, guardarse o abrirse directo.

---

## R17. TypeScript con React · Semi Senior · 6 min

**Concepto.** TypeScript atrapa errores antes de ejecutar: props que faltan, tipos equivocados o casos sin contemplar. Lo más usado en React:

- **Props:** un `type` con cada prop. Las opcionales llevan `?`, y `children` es `ReactNode`.
- **Estado:** `useState<Tarea[]>([])` cuando el valor inicial no alcanza para inferir el tipo.
- **Eventos:** `ChangeEvent<HTMLInputElement>` o `FormEvent<HTMLFormElement>`.
- **Uniones discriminadas** para estados con alternativas, como en R15.
- **Genéricos** para componentes reutilizables con cualquier tipo de dato.

Conviene evitar `any`, que apaga la verificación. Si un tipo es realmente desconocido, `unknown` obliga a revisarlo antes de usarlo.

Pensalo como el control de equipaje en un aeropuerto: revisa antes de subir, así los problemas no aparecen en pleno vuelo.

**Ejemplo.**

```tsx
import { useState, type ReactNode } from 'react'

// Componente genérico: sirve para listas de cualquier tipo, con tipos verificados.
type ListaProps<T> = {
  elementos: T[]
  clave: (elemento: T) => string
  mostrar: (elemento: T) => ReactNode
}

function Lista<T>({ elementos, clave, mostrar }: ListaProps<T>) {
  return <ul>{elementos.map(e => <li key={clave(e)}>{mostrar(e)}</li>)}</ul>
}

type Tarea = { id: string; titulo: string; prioridad: 'alta' | 'baja' }

export default function App() {
  const [tareas] = useState<Tarea[]>([
    { id: 'a', titulo: 'Pagar la luz', prioridad: 'alta' },
    { id: 'b', titulo: 'Ordenar el placard', prioridad: 'baja' },
  ])

  return (
    <Lista
      elementos={tareas}
      clave={t => t.id}
      mostrar={t => `${t.titulo} (${t.prioridad})`}
    />
  )
}
```

*Código en `react-samples/17-typescript/App.tsx`, verificado con TypeScript y un test.*

`Lista` es genérica: sirve para tareas, usuarios o lo que sea, y TypeScript verifica que `clave` y `mostrar` reciban el tipo correcto. `prioridad` solo acepta `'alta'` o `'baja'`.

### Práctica

1. ¿Qué tipo usás para `children`? **Respuesta.** `ReactNode`, que acepta elementos, texto, números, listas, `null` y más.
2. ¿Por qué `useState<Tarea[]>([])` y no solo `useState([])`? **Respuesta.** Porque de un array vacío TypeScript no puede inferir de qué es, y lo tipa como `never[]`: después no deja agregar tareas.
3. ¿Qué ventaja tiene `unknown` sobre `any`? **Respuesta.** Con `unknown`, TypeScript obliga a verificar el tipo antes de usar el valor. Con `any`, deja hacer cualquier cosa y los errores aparecen en ejecución.

### Tarea para tu máquina

Tipá la respuesta de una API con un `type` y una función que valide que el JSON recibido tiene la forma esperada antes de usarlo (podés probar con una librería como Zod). Después cambiá un campo en la respuesta simulada.

**Resultado esperado.** Con datos bien formados, todo funciona con tipos completos. Con el campo cambiado, la validación lo detecta y muestra un error claro, en vez de fallar más adelante.

### Resumen

- TypeScript atrapa errores antes de ejecutar, como props que faltan o tipos equivocados.
- Las props se tipan con un type, y children es React node.
- Las uniones discriminadas modelan estados con alternativas, y los genéricos sirven para componentes reutilizables.
- Conviene evitar any, porque apaga la verificación.

### Entrevista

**En 30 segundos.** "Tipo props, estado y eventos, modelo los estados con uniones discriminadas y uso genéricos en componentes reutilizables. Evito `any`, y los datos que vienen de afuera los valido en tiempo de ejecución, porque los tipos de TypeScript desaparecen al compilar."

**Trampa.** ¿TypeScript valida los datos que llegan de una API? **Respuesta.** No. Los tipos solo existen al compilar. Si la API manda otra forma, TypeScript no se entera: hay que validar en tiempo de ejecución, por ejemplo con Zod.

**Cuándo no.** Tipos excesivamente ingeniosos, que nadie del equipo entiende, cuestan más de lo que protegen. Tipos simples y claros, y genéricos solo donde hacen falta.

---

## R18. Testing con Testing Library · Semi Senior · 6 min

**Concepto.** **Testing Library** propone testear como usa la app una persona: buscar elementos por lo que se ve y actuar sobre ellos, sin mirar el estado interno. Así los tests no se rompen al refactorizar.

- **Prioridad de búsqueda:** `getByRole` (con su nombre accesible), `getByLabelText`, `getByText` y, como último recurso, `getByTestId`.
- **`getBy`** falla si no encuentra el elemento; **`queryBy`** devuelve `null` (sirve para verificar que algo *no* está); **`findBy`** espera, para lo asincrónico.
- **Estructura:** preparar, actuar y verificar.
- Se corre con **Vitest** o Jest. Para simular la API se usa **MSW**, que intercepta los pedidos de red.

Pensalo como probar un auto manejándolo, no desarmando el motor: si llega a destino, frena y dobla bien, funciona, aunque por dentro cambien piezas.

**Ejemplo.** El componente:

```tsx
import { useState } from 'react'

export default function App() {
  const [tareas, setTareas] = useState<string[]>([])
  const [titulo, setTitulo] = useState('')

  return (
    <main>
      <label htmlFor="nueva">Nueva tarea</label>
      <input id="nueva" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <button disabled={titulo.trim() === ''}
        onClick={() => { setTareas([...tareas, titulo.trim()]); setTitulo('') }}>
        Agregar
      </button>
      <ul>{tareas.map(t => <li key={t}>{t}</li>)}</ul>
    </main>
  )
}
```

*Código en `react-samples/18-testing/App.tsx`, verificado con TypeScript y un test.*

Y su test, el mismo que corre este proyecto:

```tsx
// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('agrega una tarea y limpia el campo', () => {
  // 1. Preparar: dibujar el componente.
  render(<App />)

  // 2. Actuar: lo mismo que haría una persona, buscando por lo que se ve en pantalla.
  fireEvent.change(screen.getByLabelText('Nueva tarea'), { target: { value: 'Pagar la luz' } })
  fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))

  // 3. Verificar: el resultado visible, no el estado interno.
  expect(screen.getByRole('listitem').textContent).toBe('Pagar la luz')
  expect((screen.getByLabelText('Nueva tarea') as HTMLInputElement).value).toBe('')
})

it('no deja agregar una tarea vacía', () => {
  render(<App />)
  fireEvent.change(screen.getByLabelText('Nueva tarea'), { target: { value: '   ' } })
  expect((screen.getByRole('button', { name: 'Agregar' }) as HTMLButtonElement).disabled).toBe(true)
})
```

### Práctica

1. ¿Por qué buscar por rol y no por clase de CSS? **Respuesta.** Porque el rol con su nombre es lo que percibe una persona (y un lector de pantalla). Una clase puede cambiar en un refactor sin que cambie el comportamiento.
2. ¿Qué usás para esperar un elemento que aparece después de un pedido? **Respuesta.** `findBy...`, que devuelve una promesa y reintenta hasta que aparece o se vence el tiempo.
3. ¿Cómo verificás que un mensaje de error *no* está en pantalla? **Respuesta.** Con `queryBy...` y comprobando que sea `null`. `getBy...` fallaría al no encontrarlo.

### Tarea para tu máquina

Escribí tests para el formulario de R8: que muestre el error con el título vacío, que agregue una tarea válida y que limpie el campo. Usá solo búsquedas por rol y por label.

**Resultado esperado.** Los tests pasan, y si cambiás el texto de un botón, falla el test que lo usa: señal de que el test mira lo que ve la persona.

### Resumen

- Testing Library propone testear como una persona usa la app, buscando lo que se ve en pantalla.
- Conviene buscar por rol y por label, y usar el test id solo como último recurso.
- Get by falla si no encuentra, query by devuelve null y find by espera lo asincrónico.
- Un test se arma en tres pasos: preparar, actuar y verificar.

### Entrevista

**En 30 segundos.** "Testeo con Testing Library desde el punto de vista de la persona: busco por rol y label, actúo y verifico lo visible, no el estado interno. Uso `findBy` para lo asincrónico y MSW para simular la API, y los reducers y la lógica pura los testeo como funciones comunes."

**Trampa.** ¿`fireEvent` o `userEvent`? **Respuesta.** `userEvent` simula la interacción completa (foco, teclas, clic) y es más realista, por eso se recomienda. `fireEvent` dispara un solo evento: es más simple y alcanza para casos básicos, como en este ejemplo.

**Cuándo no.** Testear detalles de implementación (cuántas veces se llamó un setter, el valor de un estado) hace tests frágiles que fallan al refactorizar sin que haya un bug.

---

## R19. Performance · Semi Senior · 7 min

**Concepto.** La regla número uno: **medir antes de optimizar**, con el Profiler de React DevTools o las herramientas del navegador. Las técnicas más comunes:

- **No dibujar de más:** estado lo más abajo posible, `memo` en componentes caros, con `useMemo` y `useCallback` para mantener las props estables (R10). El React Compiler automatiza buena parte.
- **Priorizar la respuesta:** `useDeferredValue` y `useTransition` permiten que la interfaz responda al instante mientras el trabajo pesado queda en segundo plano.
- **Cargar menos:** *code splitting* con `lazy` y `Suspense` para no descargar todo al inicio.
- **Listas largas:** virtualización (por ejemplo con TanStack Virtual), que dibuja solo lo visible.
- **Keys estables**, para no recrear elementos (R6).

Pensalo como un restaurante en hora pico: no conviene que el mozo espere a que salga un plato complicado para tomar el pedido de la mesa siguiente; primero atiende y la cocina trabaja de fondo.

**Ejemplo.**

```tsx
import { memo, useDeferredValue, useState } from 'react'

const tareas = Array.from({ length: 5000 }, (_, i) => `Tarea número ${i}`)

// Lista "cara" de dibujar. memo evita volver a dibujarla si su prop no cambió.
const ListaFiltrada = memo(function ListaFiltrada({ busqueda }: { busqueda: string }) {
  const visibles = tareas.filter(t => t.includes(busqueda))
  return (
    <>
      <p>{visibles.length} resultados</p>
      <ul>{visibles.slice(0, 50).map(t => <li key={t}>{t}</li>)}</ul>
    </>
  )
})

export default function App() {
  const [busqueda, setBusqueda] = useState('')
  // El campo se actualiza al instante; la lista usa una versión "diferida" que puede quedar
  // un paso atrás mientras React prioriza responder a cada tecla.
  const busquedaDiferida = useDeferredValue(busqueda)

  return (
    <main>
      <input aria-label="Buscar" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      <ListaFiltrada busqueda={busquedaDiferida} />
    </main>
  )
}
```

*Código en `react-samples/19-performance/App.tsx`, verificado con TypeScript y un test.*

El campo usa `busqueda`, que se actualiza en cada tecla; la lista usa `busquedaDiferida`. Si filtrar 5000 tareas es lento, React prioriza el campo y actualiza la lista apenas puede. `memo` evita dibujar la lista si su prop no cambió.

### Práctica

1. ¿Qué hacés antes de optimizar? **Respuesta.** Medir: reproducir el problema y usar el Profiler para encontrar qué componente tarda y por qué se dibuja.
2. ¿Qué resuelve `useDeferredValue`? **Respuesta.** Que una parte cara de la interfaz use una versión del valor que puede quedar un paso atrás, para que lo urgente, como escribir, responda al instante.
3. ¿Cuándo virtualizarías una lista? **Respuesta.** Cuando tiene cientos o miles de elementos visibles en scroll: se dibuja solo lo que entra en pantalla y unos pocos de margen.

### Tarea para tu máquina

En tu proyecto, cargá una página pesada con `lazy` y `Suspense` y mirá en la pestaña Network que su archivo se descarga recién al visitarla. Después mostrá una lista de 10.000 elementos con y sin virtualización y comparalas en el Profiler.

**Resultado esperado.** El archivo de la página aparece en Network recién al navegar. La lista virtualizada se dibuja en una fracción del tiempo y hace scroll fluido.

### Resumen

- Antes de optimizar hay que medir, con el Profiler de React o las herramientas del navegador.
- Mantener el estado abajo y memorizar componentes caros evita dibujar de más.
- Use deferred value y use transition priorizan que la interfaz responda al instante.
- Code splitting carga menos al inicio, y la virtualización dibuja solo lo visible en listas largas.

### Entrevista

**En 30 segundos.** "Primero mido con el Profiler. Después ataco la causa: estado demasiado arriba, dibujos innecesarios (`memo` con props estables, o el React Compiler), trabajo pesado que bloquea (`useDeferredValue` o `useTransition`), bundles grandes (code splitting) y listas largas (virtualización)."

**Trampa.** ¿Que un componente se vuelva a dibujar es un problema? **Respuesta.** No necesariamente: dibujar es barato y React solo toca el DOM donde hay cambios. Es un problema cuando el componente es caro o se dibuja muchísimas veces, y eso se confirma midiendo.

**Cuándo no.** Optimizar sin un problema medido llena el código de `memo` y hooks de memorización que lo hacen más difícil de mantener, a cambio de una mejora que nadie nota.

---

# Simulacros de entrevista

## Junior (12 preguntas)

1. **¿Qué es React y qué problema resuelve?** Una librería para construir interfaces con componentes. Describís cómo se ve la interfaz según el estado, y React se encarga de actualizar el DOM cuando el estado cambia, en vez de manipularlo a mano.
2. **¿Qué es JSX?** Una sintaxis para escribir algo parecido a HTML dentro de JavaScript, que se compila a llamadas a funciones de React. Usa `className`, expresiones entre llaves y un solo elemento raíz.
3. **¿Qué es un componente?** Una función que recibe props y devuelve JSX. Se nombra con mayúscula y se compone con otros componentes para armar la interfaz.
4. **¿Qué diferencia hay entre props y estado?** Las props vienen del padre y son de solo lectura. El estado es memoria propia del componente, y cuando cambia React lo vuelve a dibujar.
5. **¿Por qué no modificar el estado directamente?** Porque React compara referencias para saber si algo cambió. Si modificás el mismo objeto o array, no se entera y no actualiza la pantalla. Se crea una copia nueva.
6. **Llamás dos veces a `setCantidad(cantidad + 1)`. ¿Cuánto sube?** Uno, porque las dos usan el valor de ese dibujo. Con `setCantidad(c => c + 1)` dos veces, sube dos.
7. **¿Para qué sirve la `key` en una lista?** Para que React identifique cada elemento entre dibujos. Tiene que ser única entre hermanos y estable, como un id. El índice falla si la lista cambia de orden.
8. **¿Cómo le avisa un hijo algo a su padre?** Llamando a una función que el padre le pasó por props.
9. **¿Qué es "levantar el estado"?** Mover el estado al padre común de los componentes que lo necesitan, para que haya una sola fuente de verdad, y pasarlo hacia abajo por props.
10. **¿Qué muestra `{cantidad && <p>Hay tareas</p>}` si `cantidad` es 0?** Un "0" en la pantalla. Hay que usar una condición booleana: `cantidad > 0 &&`.
11. **¿Qué es un formulario controlado?** Uno donde el valor de cada campo vive en el estado (`value` más `onChange`). React es la única fuente de verdad, y es fácil validar o transformar.
12. **¿Por qué `evento.preventDefault()` en el `onSubmit`?** Para que el navegador no envíe el formulario y recargue la página, cosa que borraría el estado de la app.

## Semi Senior (12 preguntas)

1. **¿Para qué sirve `useEffect` y cuándo no lo usarías?** Para sincronizar con algo externo: APIs, suscripciones o temporizadores. No para datos derivados (se calculan al dibujar) ni para lógica que corresponde a un evento.
2. **¿Por qué un efecto corre dos veces en desarrollo?** Por el modo estricto, que monta, desmonta y vuelve a montar para revelar limpiezas faltantes. La solución es escribir bien la limpieza.
3. **¿Qué es una race condition al pedir datos y cómo la evitás?** Una respuesta vieja que llega después de una nueva y la pisa. Se evita descartándola en la limpieza del efecto (con una bandera o `AbortController`), o con TanStack Query.
4. **¿`useMemo` o `useCallback`?** `useMemo` guarda un valor calculado; `useCallback`, una función. Los uso para referencias estables con hijos en `memo`, cálculos caros o dependencias de efectos, después de medir.
5. **¿Qué diferencia hay entre `useRef` y `useState`?** Cambiar el estado vuelve a dibujar; cambiar una ref, no. La ref sirve para el DOM o para valores que no se muestran.
6. **¿Cuáles son las reglas de los hooks?** Llamarlos solo en el nivel superior de componentes o de otros hooks, nunca dentro de condiciones, bucles o funciones comunes, porque React los identifica por el orden de las llamadas.
7. **¿Cuándo usarías Context y cuáles son sus límites?** Para datos transversales que cambian poco (tema, idioma, sesión). Su límite: todos los consumidores se vuelven a dibujar cuando cambia el valor.
8. **¿Cómo manejás el estado global?** Separo el estado del servidor (TanStack Query) del de la interfaz (`useReducer` con Context en apps chicas, o Redux Toolkit o Zustand cuando crece).
9. **¿Cómo modelás los estados de un pedido de datos?** Con una unión discriminada (cargando, error y listo), con un error que permite reintentar. Y recordando que `fetch` no rechaza ante un 404: hay que revisar `response.ok`.
10. **¿Cómo testeás un componente?** Con Testing Library, desde el punto de vista de la persona: busco por rol y label, actúo y verifico lo visible. `findBy` para lo asincrónico y MSW para simular la API.
11. **Una pantalla se siente lenta. ¿Qué hacés?** Mido con el Profiler, identifico la causa (dibujos de más, trabajo pesado, bundle grande o lista larga) y aplico la técnica que corresponde: `memo`, `useDeferredValue`, code splitting o virtualización.
12. **¿TypeScript valida los datos de una API?** No: los tipos desaparecen al compilar. Los datos externos se validan en tiempo de ejecución, por ejemplo con Zod.

---

# Práctica de código en vivo

Ejercicios como los de una entrevista en vivo de React. Las soluciones están en `react-samples/katas/`, con tests que las verifican. Los dos componentes se podrían abrir en el editor en vivo.

## Junior

### 1. Contador con límites

**Enunciado.** Un contador con botones Sumar, Restar y Reiniciar, que no baja de 0 ni pasa de un máximo que llega por props. Los botones se deshabilitan en los límites.

**Pista.** Un `useState` para el valor, la forma con función del setter y `disabled` según el valor.

```tsx
import { useState } from 'react'

// Kata: contador que no baja de 0 ni pasa de un máximo, con botón para reiniciar.
export default function Contador({ maximo = 10 }: { maximo?: number }) {
  const [valor, setValor] = useState(0)

  return (
    <main>
      <p aria-live="polite">Valor: {valor}</p>
      <button onClick={() => setValor(v => v - 1)} disabled={valor === 0}>Restar</button>
      <button onClick={() => setValor(v => v + 1)} disabled={valor === maximo}>Sumar</button>
      <button onClick={() => setValor(0)}>Reiniciar</button>
    </main>
  )
}
```

### 2. Lista de tareas

**Enunciado.** El clásico: un formulario para agregar tareas (sin aceptar títulos vacíos), la lista y un botón para borrar cada una. Si no hay tareas, un mensaje.

**Pista.** Un estado para la lista y otro para el campo controlado. Cada tarea necesita un id para la key y para borrarla.

```tsx
import { useState, type FormEvent } from 'react'

type Tarea = { id: number; titulo: string }

// Kata: lista de tareas con agregar y borrar. El clásico del código en vivo.
export default function ListaDeTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [titulo, setTitulo] = useState('')

  function agregar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const limpio = titulo.trim()
    if (!limpio) return
    setTareas(actuales => [...actuales, { id: Date.now() + actuales.length, titulo: limpio }])
    setTitulo('')
  }

  return (
    <main>
      <form onSubmit={agregar}>
        <label htmlFor="titulo">Nueva tarea</label>
        <input id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} />
        <button type="submit">Agregar</button>
      </form>
      {tareas.length === 0 && <p>No hay tareas</p>}
      <ul>
        {tareas.map(t => (
          <li key={t.id}>
            {t.titulo}
            <button onClick={() => setTareas(actuales => actuales.filter(x => x.id !== t.id))}
              aria-label={`Borrar ${t.titulo}`}>Borrar</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

### 3. Agrupar por

**Enunciado.** Una función genérica que agrupe una lista según una clave calculada. Por ejemplo, tareas en "hechas" y "pendientes".

**Pista.** Recorré la lista y acumulá en un objeto. `??=` crea el array del grupo la primera vez.

```tsx
// Kata: agrupar una lista según una clave calculada para cada elemento.
export function agruparPor<T, K extends string>(lista: T[], clave: (elemento: T) => K): Record<K, T[]> {
  const grupos = {} as Record<K, T[]>
  for (const elemento of lista) {
    const k = clave(elemento)
    ;(grupos[k] ??= []).push(elemento)
  }
  return grupos
}
```

## Semi Senior

### 4. debounce

**Enunciado.** Una función que reciba otra función y una espera, y devuelva una versión que solo se ejecuta cuando pasan `espera` ms sin nuevas llamadas, con los últimos argumentos.

**Pista.** Guardá el temporizador en una clausura y cancelalo en cada llamada nueva.

```tsx
// Kata: devolver una función que ejecuta `fn` recién cuando pasan `espera` ms sin nuevas llamadas.
export function debounce<A extends unknown[]>(fn: (...args: A) => void, espera: number) {
  let temporizador: ReturnType<typeof setTimeout> | undefined
  return (...args: A) => {
    clearTimeout(temporizador)
    temporizador = setTimeout(() => fn(...args), espera)
  }
}
```

### 5. useDebounce

**Enunciado.** El mismo concepto como hook: recibe un valor y devuelve una versión que se actualiza recién cuando el valor dejó de cambiar. Ideal para un buscador.

**Pista.** Un estado con el valor demorado y un efecto que programa el cambio y lo cancela en la limpieza.

```tsx
import { useEffect, useState } from 'react'

// Kata: hook que devuelve el valor recién cuando dejó de cambiar durante `espera` ms.
export function useDebounce<T>(valor: T, espera: number): T {
  const [demorado, setDemorado] = useState(valor)

  useEffect(() => {
    const temporizador = setTimeout(() => setDemorado(valor), espera)
    // Si el valor cambia antes de tiempo, se cancela el temporizador anterior.
    return () => clearTimeout(temporizador)
  }, [valor, espera])

  return demorado
}
```

### 6. Promise.all propio

**Enunciado.** Reimplementá `Promise.all`: resolver con todos los resultados en el mismo orden que las promesas, o rechazar con el primer error. Una lista vacía resuelve con `[]`.

**Pista.** Guardá cada resultado en su índice (no con `push`, porque terminan en cualquier orden) y llevá la cuenta de cuántas faltan.

```tsx
// Kata: reimplementar Promise.all. Resuelve con los resultados en el mismo orden,
// o rechaza con el primer error.
export function promiseAll<T>(promesas: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const resultados: T[] = new Array(promesas.length)
    let pendientes = promesas.length
    if (pendientes === 0) return resolve([])
    promesas.forEach((promesa, indice) => {
      promesa.then(valor => {
        resultados[indice] = valor
        pendientes -= 1
        if (pendientes === 0) resolve(resultados)
      }, reject)
    })
  })
}
```

---

## Para revisar (Semi Senior, simulacros y práctica)

- [ ] ¿Te sirven el orden y el nivel de las 11 lecciones Semi Senior?
- [ ] ¿Las preguntas de los simulacros cubren lo que esperás para cada nivel?
- [ ] ¿Querés más ejercicios de práctica, o de algún tipo en particular?
