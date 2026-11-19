import { useState, type ReactNode } from 'react'

// Componente genérico: sirve para listas de cualquier tipo, con tipos verificados.
type ListaProps<T> = {
  elementos: T[]
  clave: (elemento: T) => string
  mostrar: (elemento: T) => ReactNode
}

function Lista<T>({ elementos, clave, mostrar }: ListaProps<T>) {
  return <ul>{elementos.map(e => <li key={clave(e)}>{mostrar(e)}</li>)}</ul>
}

type Tarea = { id: string; titulo: string; prioridad: 'alta' | 'baja' }

export default function App() {
  const [tareas] = useState<Tarea[]>([
    { id: 'a', titulo: 'Pagar la luz', prioridad: 'alta' },
    { id: 'b', titulo: 'Ordenar el placard', prioridad: 'baja' },
  ])

  return (
    <Lista
      elementos={tareas}
      clave={t => t.id}
      mostrar={t => `${t.titulo} (${t.prioridad})`}
    />
  )
}
