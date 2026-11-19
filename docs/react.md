# React · De Junior a Semi Senior

**Estado:** borradores de las 8 lecciones Junior para revisar. Todavía no están maquetadas. Las 10 lecciones Semi Senior, los simulacros y la práctica de código vienen en la próxima tanda.

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

## Para revisar

- [ ] ¿Te sirven el orden y el nivel de detalle de las 8 lecciones Junior?
- [ ] ¿Las analogías te funcionan (plantilla de carta, Lego, formulario impreso, pizarrón de cocina, timbre, DNI en una fila, cartel de abierto y cerrado)?
- [ ] Con tu OK las maqueto y sigo con las 10 Semi Senior, los simulacros y la práctica de código.
