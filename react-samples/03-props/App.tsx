type TarjetaProps = {
  titulo: string
  vence: string
  urgente?: boolean
}

function TarjetaDeTarea({ titulo, vence, urgente = false }: TarjetaProps) {
  return (
    <article className={urgente ? 'tarjeta urgente' : 'tarjeta'}>
      <h2>{titulo}</h2>
      <p>Vence {vence}</p>
    </article>
  )
}

export default function App() {
  return (
    <main>
      <TarjetaDeTarea titulo="Pagar la luz" vence="hoy" urgente />
      <TarjetaDeTarea titulo="Renovar el DNI" vence="en 30 días" />
    </main>
  )
}
