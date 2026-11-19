import { memo, useDeferredValue, useState } from 'react'

const tareas = Array.from({ length: 5000 }, (_, i) => `Tarea número ${i}`)

// Lista "cara" de dibujar. memo evita volver a dibujarla si su prop no cambió.
const ListaFiltrada = memo(function ListaFiltrada({ busqueda }: { busqueda: string }) {
  const visibles = tareas.filter(t => t.includes(busqueda))
  return (
    <>
      <p>{visibles.length} resultados</p>
      <ul>{visibles.slice(0, 50).map(t => <li key={t}>{t}</li>)}</ul>
    </>
  )
})

export default function App() {
  const [busqueda, setBusqueda] = useState('')
  // El campo se actualiza al instante; la lista usa una versión "diferida" que puede quedar
  // un paso atrás mientras React prioriza responder a cada tecla.
  const busquedaDiferida = useDeferredValue(busqueda)

  return (
    <main>
      <input aria-label="Buscar" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      <ListaFiltrada busqueda={busquedaDiferida} />
    </main>
  )
}
