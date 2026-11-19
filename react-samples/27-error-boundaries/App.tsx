import { Component, useState, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode; alReintentar: () => void }

// Un error boundary todavía se escribe como clase: no hay hook equivalente.
class LimiteDeError extends Component<Props, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Acá se reporta a la herramienta de monitoreo (Sentry, Crashlytics…), sin datos personales.
    reportar(error, info.componentStack ?? '')
  }

  render() {
    if (this.state.error) {
      return <div role="alert">
        No pudimos mostrar esta parte.{' '}
        <button onClick={() => { this.setState({ error: null }); this.props.alReintentar() }}>Reintentar</button>
      </div>
    }
    return this.props.children
  }
}

export const reportes: string[] = []
function reportar(error: Error, _pila: string) { reportes.push(error.message) }

function Tarjeta({ romper }: { romper: boolean }) {
  if (romper) throw new Error('Datos inválidos')
  return <p>Resumen de tareas</p>
}

export default function App() {
  const [romper, setRomper] = useState(false)
  return (
    <main>
      <h1>Panel</h1>
      <button onClick={() => setRomper(true)}>Romper la tarjeta</button>
      {/* Solo la tarjeta se reemplaza por el mensaje: el resto de la pantalla sigue funcionando. */}
      <LimiteDeError alReintentar={() => setRomper(false)}>
        <Tarjeta romper={romper} />
      </LimiteDeError>
    </main>
  )
}
