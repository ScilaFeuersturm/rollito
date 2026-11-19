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
