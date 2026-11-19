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
