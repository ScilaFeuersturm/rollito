import { useState } from 'react'

function Contador({ nombre }: { nombre: string }) {
  const [valor, setValor] = useState(0)
  return (
    <p>
      {nombre}: {valor} <button onClick={() => setValor(v => v + 1)}>Sumar</button>
    </p>
  )
}

export default function App() {
  const [persona, setPersona] = useState('Ana')
  const [conKey, setConKey] = useState(false)

  return (
    <main>
      <button onClick={() => setPersona(p => (p === 'Ana' ? 'Beto' : 'Ana'))}>Cambiar persona</button>
      <label>
        <input type="checkbox" checked={conKey} onChange={evento => setConKey(evento.target.checked)} />
        Usar key
      </label>
      {/* Mismo tipo en la misma posición: React conserva el estado. Con otra key, lo descarta. */}
      {conKey ? <Contador key={persona} nombre={persona} /> : <Contador nombre={persona} />}
    </main>
  )
}
