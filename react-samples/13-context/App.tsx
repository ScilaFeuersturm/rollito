import { createContext, useContext, useState } from 'react'

type Tema = 'claro' | 'oscuro'
const TemaContext = createContext<Tema>('claro')

function TarjetaDeTarea({ titulo }: { titulo: string }) {
  // Lee el tema sin que nadie se lo pase por props.
  const tema = useContext(TemaContext)
  return <article className={`tarjeta ${tema}`}>{titulo} · tema {tema}</article>
}

function ListaDeTareas() {
  return (
    <section>
      <TarjetaDeTarea titulo="Comprar yerba" />
      <TarjetaDeTarea titulo="Pagar la luz" />
    </section>
  )
}

export default function App() {
  const [tema, setTema] = useState<Tema>('claro')

  return (
    // Desde React 19, el contexto se puede usar directamente como proveedor.
    <TemaContext value={tema}>
      <button onClick={() => setTema(tema === 'claro' ? 'oscuro' : 'claro')}>Cambiar tema</button>
      <ListaDeTareas />
    </TemaContext>
  )
}
