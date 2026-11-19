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
