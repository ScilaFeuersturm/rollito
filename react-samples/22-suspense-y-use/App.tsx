import { Suspense, use, useState, useTransition } from 'react'

type Tarea = { id: number; titulo: string }

// Simula una API. La promesa se crea afuera del componente que la lee (en un estado o una caché):
// si se creara adentro, cada dibujo haría un pedido nuevo.
function buscarTarea(id: number): Promise<Tarea> {
  return new Promise(resolve => setTimeout(() => resolve({ id, titulo: `Tarea número ${id}` }), 100))
}

function Detalle({ promesa }: { promesa: Promise<Tarea> }) {
  const tarea = use(promesa) // suspende hasta que la promesa se resuelve
  return <h2>{tarea.titulo}</h2>
}

export default function App() {
  const [promesa, setPromesa] = useState(() => buscarTarea(1))
  const [, iniciarTransicion] = useTransition()

  return (
    <main>
      <button onClick={() => setPromesa(buscarTarea(2))}>Ver la 2</button>
      <button onClick={() => iniciarTransicion(() => setPromesa(buscarTarea(3)))}>Ver la 3 (con transición)</button>
      <Suspense fallback={<p role="status">Cargando tarea…</p>}>
        <Detalle promesa={promesa} />
      </Suspense>
    </main>
  )
}
