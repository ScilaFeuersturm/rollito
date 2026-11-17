# Android moderno de Junior a Senior

El primer recorrido usa una lista de tareas como ejemplo común. Arranca con Kotlin y una pantalla de Compose, y termina con una separación clara entre eventos, estado y UI. La misma app puede crecer para practicar persistencia, errores, pruebas y decisiones de arquitectura.

## Primer recorrido de 12 lecciones

| Nivel | Lección | Resultado |
| --- | --- | --- |
| Junior | 1. Ausencia de datos en Kotlin | Mostrás un nombre alternativo si el dato falta. |
| Junior | 2. Data classes y transformaciones | Modelás una tarea y actualizás una lista. |
| Junior | 3. De XML a Compose | Dibujás una tarjeta a partir de sus datos. |
| Junior | 4. Eventos y estado | Actualizás un contador con una acción del usuario. |
| Junior | 5. Listas y elementos con identidad | Mostrás tareas y preservás su identidad al reordenar. |
| Junior | 6. Navegación entre lista y detalle | Abrís una tarea a partir de su identificador. |
| Semi Senior | 7. De Presenter a ViewModel | Separás el comportamiento de una pantalla del código que la dibuja. |
| Semi Senior | 8. Estado con StateFlow | Representás carga, contenido y error. |
| Semi Senior | 9. Flujo unidireccional | Seguís un evento desde el botón hasta el nuevo estado. |
| Semi Senior | 10. Corrutinas y cancelación | Cancelás una búsqueda anterior cuando empieza otra. |
| Semi Senior | 11. Repositorio y errores | Mostrás un error recuperable y permitís reintentar. |
| Semi Senior | 12. Pruebas del estado de pantalla | Verificás el resultado de una acción sin abrir la interfaz. |

Después del puente, el nivel Semi Senior profundiza en Retrofit, Room e inyección de dependencias. El tramo Senior propone comparar límites entre módulos, medir recomposición y arranque, probar flujos de UI, automatizar entregas y justificar decisiones de seguridad y mantenimiento.

## Borrador para revisión · Ausencia de datos en Kotlin

**Duración estimada** 4 minutos.

### Concepto

El nombre de una persona puede venir vacío, o el dato puede faltar por completo. Kotlin te permite expresar la segunda situación en el tipo. Un `String` contiene texto. Un `String?` permite que el valor sea `null`. Cuando lo vas a usar, podés decidir qué mostrar si falta.

### Ejemplo

```kotlin
fun main() {
    val nombre: String? = null
    val nombreVisible = nombre ?: "Invitado"
    println("Hola, $nombreVisible")
}
```

El operador `?:` usa el valor de la izquierda si está presente. Cuando es `null`, usa el valor de la derecha. El programa imprime `Hola, Invitado`.

### Práctica

1. Elegí el tipo de un nombre que puede faltar. Opciones `String`, `String?` e `Int`. Respuesta `String?`.
2. Completá el operador en `val visible = nombre ___ "Invitado"`. Respuesta `?:`.
3. Si `nombre` vale `"Ana"`, elegí qué imprime ese programa. Respuesta `Hola, Ana`. El valor alternativo se usa cuando el dato es `null`.

### Para repasar

- `String?` permite representar un dato ausente.
- `?:` elige un valor alternativo cuando el dato es `null`.
- Una cadena vacía es un valor distinto de `null`.

### Tarea para tu máquina

En un archivo de Kotlin, escribí una función `nombreVisible` que reciba un `String?` y devuelva un `String`. Probala con `null`, `"Ana"` y `""`. El resultado esperado es `"Invitado"`, `"Ana"` y `""`, respectivamente.
