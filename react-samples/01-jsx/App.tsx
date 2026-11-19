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
