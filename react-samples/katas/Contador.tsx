import { useState } from 'react'

// Kata: contador que no baja de 0 ni pasa de un máximo, con botón para reiniciar.
export default function Contador({ maximo = 10 }: { maximo?: number }) {
  const [valor, setValor] = useState(0)

  return (
    <main>
      <p aria-live="polite">Valor: {valor}</p>
      <button onClick={() => setValor(v => v - 1)} disabled={valor === 0}>Restar</button>
      <button onClick={() => setValor(v => v + 1)} disabled={valor === maximo}>Sumar</button>
      <button onClick={() => setValor(0)}>Reiniciar</button>
    </main>
  )
}
