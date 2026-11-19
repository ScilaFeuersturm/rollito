import { memo, useDeferredValue, useState, useTransition } from 'react'

const todas = Array.from({ length: 5000 }, (_, i) => `Tarea ${i + 1}`)

// memo: si `filtro` no cambia, no se vuelve a calcular la lista.
const Lista = memo(function Lista({ filtro }: { filtro: string }) {
  const visibles = todas.filter(tarea => tarea.includes(filtro)).slice(0, 20)
  return <ul>{visibles.map(tarea => <li key={tarea}>{tarea}</li>)}</ul>
})

export default function App() {
  const [texto, setTexto] = useState('')
  const filtro = useDeferredValue(texto) // se actualiza "cuando React tiene tiempo"
  const [pestana, setPestana] = useState<'lista' | 'resumen'>('lista')
  const [cargando, iniciarTransicion] = useTransition()

  return (
    <main>
      <button onClick={() => iniciarTransicion(() => setPestana('resumen'))}>Ver resumen</button>
      {cargando && <p role="status">Cambiando de pestaña…</p>}
      {pestana === 'resumen' ? <p>Resumen: {todas.length} tareas</p> : <>
        <label>Buscar <input value={texto} onChange={evento => setTexto(evento.target.value)} /></label>
        {/* El campo responde enseguida; la lista se atenúa mientras está desactualizada. */}
        <div style={{ opacity: texto !== filtro ? 0.5 : 1 }}>
          <Lista filtro={filtro} />
        </div>
      </>}
    </main>
  )
}
