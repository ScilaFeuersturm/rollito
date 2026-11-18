# SOLID y patrones de diseño

Estos temas van después de POO y antes de Arquitecturas en la tarjeta de Rollito. Cada lección de SOLID compara dos versiones del mismo ejemplo. Los resúmenes están pensados para escuchar, pausar y explicar la idea con tus palabras.

> Las cinco lecciones de SOLID y las diez lecciones de patrones están disponibles en Rollito.

## Recorrido

- **SOLID.** Responsabilidad única, abierto/cerrado, sustitución de Liskov, segregación de interfaces e inversión de dependencias.
- **Patrones, primera tanda.** Strategy para intercambiar un comportamiento, Adapter para conectar contratos distintos Observer para reaccionar a cambios y Factory para decidir qué notificador construir. Los ejemplos retoman composición, la entrada del ejemplo Hexagonal y el estado de la pantalla de MVVM.
- **Patrones, segunda tanda.** Singleton, Builder y Facade.
- **Patrones, tercera tanda.** Decorator, Repository e inyección de dependencias. Repository e inyección de dependencias se presentan como prácticas de arquitectura y diseño junto con los patrones clásicos.

## Lección 1 · S de SOLID: responsabilidad única

**Nivel** Semi Senior · **Duración estimada** 5 minutos · **Antes** POO

### Concepto y ejemplo

Preguntate qué decisiones cambian juntas y quién pide esos cambios. En un informe de tareas, una regla define cuáles se cuentan como completadas. Otra decisión define cómo se escribe el informe para quien lo lee.

En la primera versión de [ResponsabilidadUnica.kt](../android-samples/kotlin/solid/ResponsabilidadUnica.kt), un método cuenta y formatea al mismo tiempo. En la segunda, `calcularTotales` devuelve datos y `formatearInforme` arma el texto. Las dos imprimen `Completadas: 1 de 2`. Separarlas permite agregar una versión para otro idioma sin tocar el cálculo.

### Práctica

1. ¿Qué cambiarías para traducir el informe? Opciones el formato, la regla de conteo o el modelo de tarea. Respuesta el formato.
2. Ordená el flujo. Leer tareas → calcular totales → formatear → mostrar.
3. Si ahora una tarea cancelada se excluye del total, ¿qué prueba actualizarías? Respuesta la del cálculo.

### Tarea para tu máquina

Agregá un segundo formato que diga `1/2`. Usá el mismo resultado de `calcularTotales` para mostrar ambos formatos. Esperá dos textos distintos que representen el mismo conteo.

### Para repasar en audio

- Una responsabilidad agrupa decisiones que cambian por la misma razón.
- Contar tareas y redactar un informe pueden cambiar por razones distintas.
- Pausá y explicá qué parte tocarías si el informe cambia de idioma.

### Entrevista

**En 30 segundos.** Busco razones independientes de cambio. Separo las reglas del cálculo de su presentación si van a evolucionar por motivos distintos.

**Pregunta trampa.** ¿Una responsabilidad equivale a un método? Varios métodos pueden cuidar una sola decisión del negocio. Dividir por cantidad de métodos puede dispersar lógica que cambia junta.

**Cuándo simplificar.** Si el texto es parte inseparable de una operación mínima, esperá un caso concreto de variación antes de sumar estructura.

## Lección 2 · O de SOLID: abierto a extensión, cerrado a modificación

**Nivel** Semi Senior · **Duración estimada** 5 minutos · **Antes** Responsabilidad única

### Concepto y ejemplo

Elegí una variación que aparece seguido y dale un punto de extensión. En [AbiertoCerrado.kt](../android-samples/kotlin/solid/AbiertoCerrado.kt), agregar otro formato a la primera versión requiere editar el `when`. En la segunda, `mostrar` recibe un `FormatoTarea`. Para sumar una casilla de verificación, pasás otra implementación al armar la pantalla.

```text
- Comprar yerba
- Comprar yerba
[ ] Comprar yerba
```

### Práctica

1. ¿Qué sumás para mostrar una casilla? Respuesta una implementación de `FormatoTarea`.
2. ¿Dónde elegís el formato? Opciones al invocar `mostrar`, en el modelo de tarea o dentro de `mostrar`. Respuesta al invocarlo.
3. Si cambia la firma de `describir`, ¿es una extensión compatible? Respuesta requiere adaptar las implementaciones que usaban el contrato anterior.

### Tarea para tu máquina

Sumá un formato que devuelva el título en mayúsculas precedido por `TAREA:`. Invocá `mostrar` con ese formato y el de lista. Esperá `TAREA: COMPRAR YERBA` y `- Comprar yerba`.

### Para repasar en audio

- Primero identificá qué comportamiento suele variar.
- Un contrato permite agregar variantes sin editar la lógica que las usa.
- Pausá y explicá en qué parte agregarías otro formato.

### Entrevista

**En 30 segundos.** Si una variación aparece seguido, diseño una entrada para añadirla como otra implementación. El código que consume el contrato puede seguir funcionando con las variantes existentes.

**Pregunta trampa.** ¿Nunca se modifica código que ya existe? Corregir errores o cambiar un requisito común puede exigir modificarlo. El principio apunta a una dimensión de cambio elegida.

**Cuándo simplificar.** Para dos casos fijos con reglas estables, un `when` puede ser fácil de leer y de mantener.

## Lección 3 · L de SOLID: sustitución de Liskov

**Nivel** Semi Senior · **Duración estimada** 6 minutos · **Antes** Herencia y polimorfismo

### Concepto y ejemplo

Un subtipo tiene que respetar lo que el código cliente puede esperar del contrato base. Si un contrato permite renombrar una tarea con un título válido, una tarea archivada que siempre rechaza el cambio rompe esa expectativa.

En [SustitucionLiskov.kt](../android-samples/kotlin/solid/SustitucionLiskov.kt), la primera versión acepta una tarea archivada como editable y falla al renombrarla. En la segunda, las tareas archivadas y activas se pueden leer mediante `TareaLegible`. Las activas ofrecen además el contrato `TareaEditable`.

```text
Una tarea archivada no se puede editar
Comprar yerba
Pagar internet
```

### Práctica

1. ¿Qué expectativa rompe la primera versión? Respuesta una operación ofrecida por el contrato falla para cualquier título.
2. ¿Qué contrato necesita la función que solo muestra títulos? Respuesta `TareaLegible`.
3. ¿Qué contrato requiere una pantalla de edición? Respuesta `TareaEditable`.

### Tarea para tu máquina

Creá una función que acepte `TareaEditable`, renombre con un título válido y verifique el resultado. Probala con una tarea activa. Después pasá una tarea archivada a esa función y observá el error de tipos del compilador. Quitá esa llamada para ejecutar la verificación.

### Para repasar en audio

- Sustituir un tipo implica mantener las expectativas de su contrato.
- Un tipo puede ofrecer lectura aunque carezca de edición.
- Pausá y explicá qué contrato usarías para mostrar tareas activas y archivadas juntas.

### Entrevista

**En 30 segundos.** Si reemplazo una implementación por otra del mismo contrato, el cliente debería poder usarla con las mismas garantías. Cuando algunas tareas se pueden editar y otras solo se pueden leer, expongo esas capacidades en contratos distintos.

**Pregunta trampa.** ¿Una excepción siempre rompe el principio? Depende de lo que promete el contrato. Puede admitir rechazar títulos inválidos. Rechazar toda edición contradice un contrato que garantiza editar con un título válido.

**Cuándo simplificar.** Si el dominio permite exactamente los mismos comportamientos para todos los estados de una tarea, una sola representación puede alcanzar.

## Lección 4 · I de SOLID: segregación de interfaces

**Nivel** Semi Senior · **Duración estimada** 5 minutos · **Antes** Sustitución de Liskov

### Concepto y ejemplo

Diseñá cada contrato a partir de las operaciones que necesita quien lo usa. En [SegregacionInterfaces.kt](../android-samples/kotlin/solid/SegregacionInterfaces.kt), la pantalla de resumen solo lee títulos. La primera versión le pide un contrato que también tiene una operación de escritura y obliga al doble de prueba a implementarla. La segunda versión recibe solo `LecturaTareas`. El tablero real ofrece lectura y escritura.

```text
Comprar yerba
Comprar yerba
Comprar yerba, Pagar la luz
```

### Práctica

1. ¿Qué contrato necesita el resumen? Opciones lectura, escritura o las dos. Respuesta lectura.
2. ¿Puede el tablero real implementar ambos contratos? Sí. Cada pantalla recibe la capacidad que usa.
3. ¿Qué síntoma te haría revisar el contrato? Respuesta tener que implementar operaciones ajenas a lo que se está probando.

### Tarea para tu máquina

Creá una pantalla `FormularioTarea` que reciba `EscrituraTareas`. Pasale un doble que registre lo escrito. Enviá `"Pagar la luz"` y verificá que registró ese título sin preparar ninguna operación de lectura.

### Para repasar en audio

- Un cliente necesita un contrato que corresponda a lo que hace.
- Una implementación puede ofrecer varias capacidades a distintos clientes.
- Pausá y explicá qué contrato le darías a una pantalla que solo muestra títulos.

### Entrevista

**En 30 segundos.** Diseño interfaces según las necesidades de quienes las usan. Si una pantalla solo lee títulos, le doy un contrato de lectura. El mismo tablero puede ofrecer otro contrato para quien agrega tareas.

**Pregunta trampa.** ¿Hay que crear una interfaz por método? Agrupá operaciones que el mismo cliente necesita y que cambian juntas. La cantidad de métodos por sí sola dice poco.

**Cuándo simplificar.** Si los clientes usan la misma capacidad completa, un contrato cohesivo evita fragmentación innecesaria.

## Lección 5 · D de SOLID: inversión de dependencias

**Nivel** Semi Senior · **Duración estimada** 6 minutos · **Antes** Segregación de interfaces

### Concepto y ejemplo

El caso de uso de agregar una tarea necesita preservar una regla y solicitar almacenamiento. En [InversionDependencias.kt](../android-samples/kotlin/solid/InversionDependencias.kt), la primera versión recibe una clase concreta de memoria. En la segunda, el caso de uso recibe `GuardarTarea`, un contrato expresado desde su necesidad. El almacenamiento implementa ese contrato y el punto de entrada conecta las piezas. Es la misma dirección de dependencias que aparece en el ejemplo de Clean Architecture. [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

```text
Antes: caso de uso → almacenamiento en memoria
Después: caso de uso → GuardarTarea ← adaptador de memoria
```

Ambas versiones guardan `Comprar yerba` sin espacios en los extremos. La segunda también permite verificar el guardado con un doble.

### Práctica

1. ¿Qué dependencia tiene el caso de uso en la versión nueva? Respuesta `GuardarTarea`.
2. ¿Quién implementa el contrato? Respuesta el adaptador que sabe guardar.
3. Si reemplazás memoria por almacenamiento en archivo, ¿dónde cambia la conexión? Respuesta en el código que ensambla las piezas al arrancar.

### Tarea para tu máquina

Conectá el caso de uso a un adaptador que escriba títulos en un archivo nuevo. Probá con `" "` y `" Pagar la luz "`. El archivo debe contener una sola línea, `Pagar la luz`. Reutilizá el caso de uso para verificar que conserva la regla.

### Para repasar en audio

- Las reglas expresan qué necesitan mediante contratos.
- La infraestructura proporciona una implementación de esos contratos.
- Pausá y explicá qué cambiarías para pasar de memoria a un archivo.

### Entrevista

**En 30 segundos.** Hago que el caso de uso dependa de un contrato que expresa su necesidad. La clase de almacenamiento implementa ese contrato y se conecta al arrancar. Puedo probar la regla sin usar el almacenamiento real.

**Pregunta trampa.** ¿Pasar la dependencia por constructor alcanza? En las dos versiones se pasa por constructor. La inversión se ve en el tipo que conoce el caso de uso y en la dirección de la dependencia.

**Cuándo simplificar.** Si una dependencia concreta es estable y separarla aporta poco al diseño o a las pruebas, una abstracción adicional puede sumar trabajo.

## Lección 6 · Strategy: intercambiá el criterio de orden

**Nivel** Semi Senior · **Duración estimada** 5 minutos · **Antes** Abierto/cerrado y composición

### Concepto y ejemplo

Strategy encapsula variantes de un mismo comportamiento detrás de un contrato. En [Strategy.kt](../android-samples/kotlin/patrones/Strategy.kt), la pantalla muestra tareas. Puede ordenarlas por título o por vencimiento según lo que elija la persona. Cada estrategia recibe la misma lista y devuelve la lista en el orden pedido.

```text
Comprar yerba, Pagar la luz
Pagar la luz, Comprar yerba
```

### Práctica

1. ¿Qué comportamiento cambia en el ejemplo? Respuesta el orden de la lista.
2. ¿Quién elige el criterio? Respuesta quien invoca `mostrar`, por ejemplo a partir de la opción elegida en la pantalla.
3. ¿Qué debe devolver un criterio de orden válido? Respuesta las mismas tareas, reordenadas según su regla.

### Tarea para tu máquina

Agregá `porVencimientoDescendente` y probala con tareas que vencen en uno, dos y tres días. Esperá el orden tres, dos, uno. Verificá también que la lista original conserva su orden.

### Para repasar en audio

- Strategy permite intercambiar maneras de resolver el mismo comportamiento.
- La pantalla delega el orden y las estrategias conservan el mismo contrato.
- Pausá y explicá dónde agregarías un criterio para ordenar por prioridad.

### Entrevista

**En 30 segundos.** Agrupo distintas maneras de resolver una acción bajo el mismo contrato. La pantalla de tareas recibe el criterio de orden y le delega ese trabajo. Así puedo probar cada criterio por separado.

**Pregunta trampa.** ¿Una estrategia necesita una clase propia? En Kotlin, una lambda puede cumplir una interfaz funcional. Una clase sirve cuando la estrategia necesita su propia configuración o varias operaciones internas.

**Cuándo simplificar.** Con una regla fija y sin necesidad de elegir otra, una función directa puede alcanzar.

## Lección 7 · Singleton: compartí una instancia con un propósito claro

**Nivel** Semi Senior · **Duración estimada** 5 minutos · **Antes** Clases y objetos

### Concepto y ejemplo

Singleton hace que los clientes que acceden a un objeto compartan su instancia. En Kotlin se puede expresar con una declaración `object`. Usá [Singleton.kt](../android-samples/kotlin/patrones/Singleton.kt) para comparar las referencias que obtienen el formulario y la importación. Ambos usan la misma política de títulos, que no guarda datos de la pantalla. [Declaraciones de objetos en Kotlin](https://kotlinlang.org/docs/object-declarations.html)

```text
Misma instancia: true
Título válido: true
Título vacío válido: false
```

### Práctica

1. ¿Qué comprueba el operador de tres signos igual en el ejemplo? Opciones identidad, texto o tipo. Respuesta identidad.
2. ¿Cuántas instancias usan el formulario y la importación? Respuesta una.
3. Dos pantallas necesitan validar con máximos independientes. ¿Qué elegirías? Respuesta una política configurable por pantalla.

### Tarea para tu máquina

Verificá con `check` que la política acepta 50 caracteres y rechaza 51. Después creá una clase que reciba el máximo por constructor y comprobá que una política de 20 caracteres y otra de 50 puedan coexistir.

### Para repasar en audio

- Singleton permite compartir una instancia.
- La identidad indica si dos referencias apuntan al mismo objeto.
- Pausá y explicá qué cambiarías si cada pantalla necesita una configuración distinta.

### Entrevista

**En 30 segundos.** Uso Singleton cuando hay una razón para compartir exactamente una instancia y puedo explicar quién la usa. En Kotlin puedo darle nombre con una declaración de objeto. Si distintos clientes necesitan configuraciones propias, creo instancias separadas.

**Pregunta trampa.** ¿Compartir una instancia vuelve seguros los cambios concurrentes? Kotlin garantiza que la inicialización de la declaración sea segura. Las operaciones sobre datos mutables compartidos requieren su propio control.

**Cuándo simplificar.** Para comportamiento sin estado, una función también puede expresar la regla. Para datos que dependen de una pantalla o una sesión, elegí el alcance que coincide con ese ciclo de vida.

## Lección 8 · Builder: configurá una tarea por pasos

**Nivel** Semi Senior · **Duración estimada** 6 minutos · **Antes** Factory

### Concepto y ejemplo

Builder deja configurar un objeto en pasos. Una tarea necesita título y puede llevar etiqueta y vencimiento. En [Builder.kt](../android-samples/kotlin/patrones/Builder.kt), la configuración queda en el constructor por pasos. `construir()` valida esos valores y devuelve una tarea con propiedades de solo lectura.

```text
Comprar yerba · Compras · faltan 3 días
```

### Práctica

1. ¿Cuándo se construye la tarea? Opciones al agregar la etiqueta, al crear el builder o al llamar a construir. Respuesta al llamar a construir.
2. Ordená el proceso. Dar el título → elegir opciones → construir y validar → usar la tarea.
3. ¿Qué pasa si el vencimiento es negativo? Respuesta la validación rechaza la configuración.

### Tarea para tu máquina

Construí `"Pagar la luz"` con vencimiento cero y sin etiqueta. Verificá con `check` que el título y el vencimiento coincidan y que la etiqueta sea `null`. Después verificá que `venceEn(-1).construir()` lance `IllegalArgumentException`.

### Para repasar en audio

- Builder permite configurar el objeto por pasos.
- La operación final valida la configuración.
- Pausá y explicá qué harías si una opción solo se permite junto con otra.

### Entrevista

**En 30 segundos.** Builder concentra el proceso de construcción. Permite definir opciones de a poco y validar su combinación antes de entregar el objeto listo para usar.

**Pregunta trampa.** ¿Builder y Factory resuelven lo mismo? Una fábrica puede elegir qué implementación crear. Builder se centra en cómo combinar los datos y completar la construcción.

**Cuándo simplificar.** En Kotlin, un constructor con argumentos nombrados y valores por defecto suele alcanzar si toda la configuración se conoce al crearlo. [Funciones y argumentos por defecto en Kotlin](https://kotlinlang.org/docs/functions.html#default-arguments)

## Lección 9 · Facade: ofrecé una operación sobre varias piezas

**Nivel** Semi Senior · **Duración estimada** 6 minutos · **Antes** Adapter

### Concepto y ejemplo

La pantalla necesita guardar una tarea y ver un resumen. Los detalles de guardar, leer y generar el resumen viven en dos clases. En [Facade.kt](../android-samples/kotlin/patrones/Facade.kt), la fachada ofrece una operación que coordina ese recorrido para la pantalla.

```text
Escribí un título
Tareas guardadas: 1
Tareas guardadas: 2
```

### Práctica

1. ¿Qué necesita llamar la pantalla para guardar y actualizar el resumen? Respuesta `agregarYVerResumen`.
2. Ordená el recorrido válido. Validar título → guardar → leer lista → generar resumen.
3. Si cambia el texto del resumen, ¿qué pieza ajustarías? Respuesta `ResumenTareas`, que conoce su formato.

### Tarea para tu máquina

Agregá una operación `verResumen` que muestre el total sin insertar tareas. Probá primero con el depósito vacío y después de agregar `"Comprar yerba"`. Esperá cero y uno, respectivamente.

### Para repasar en audio

- Facade ofrece operaciones sencillas sobre varias piezas.
- La pantalla pide un resultado sin coordinar cada paso.
- Pausá y explicá qué detalle queda dentro de la fachada cuando se agrega una tarea.

### Entrevista

**En 30 segundos.** Una fachada da un punto de entrada para operaciones que requieren varias piezas. Mantengo las responsabilidades en sus clases y reúno la coordinación que comparte el código cliente.

**Pregunta trampa.** ¿En qué se diferencia de Adapter? Adapter conecta un contrato esperado con otro existente. Facade ofrece una forma más simple de usar un conjunto de piezas.

**Cuándo simplificar.** Si una operación ya se resuelve con una llamada clara, otra capa puede sumar un salto al leer el código.
