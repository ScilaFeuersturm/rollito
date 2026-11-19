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
