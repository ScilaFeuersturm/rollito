function Encabezado() {
  return <h1>Mis tareas</h1>
}

function TarjetaDeTarea() {
  return (
    <article className="tarjeta">
      <h2>Comprar yerba</h2>
      <p>Vence hoy</p>
    </article>
  )
}

export default function App() {
  return (
    <main>
      <Encabezado />
      <TarjetaDeTarea />
      <TarjetaDeTarea />
    </main>
  )
}
