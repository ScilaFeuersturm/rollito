import { createContext, useContext, useState, type ReactNode } from 'react'

type ContextoTabs = { activa: string; setActiva: (id: string) => void }
const Contexto = createContext<ContextoTabs | null>(null)

function useTabs() {
  const contexto = useContext(Contexto)
  if (!contexto) throw new Error('Tab y Panel van adentro de <Tabs>')
  return contexto
}

// Componentes compuestos: Tabs comparte el estado con sus piezas por Context, y quien lo usa arma
// la estructura que quiera. Acepta modo controlado (activa + alCambiar) o no controlado (inicial).
function Tabs({ inicial, activa, alCambiar, children }: {
  inicial?: string; activa?: string; alCambiar?: (id: string) => void; children: ReactNode
}) {
  const [interna, setInterna] = useState(inicial ?? '')
  const valor = activa ?? interna
  const setActiva = (id: string) => { setInterna(id); alCambiar?.(id) }
  return <Contexto.Provider value={{ activa: valor, setActiva }}>{children}</Contexto.Provider>
}

function Lista({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { activa, setActiva } = useTabs()
  return <button role="tab" id={`tab-${id}`} aria-selected={activa === id} aria-controls={`panel-${id}`}
    onClick={() => setActiva(id)}>{children}</button>
}

function Panel({ id, children }: { id: string; children: ReactNode }) {
  const { activa } = useTabs()
  return <div role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} hidden={activa !== id}>{children}</div>
}

Tabs.Lista = Lista
Tabs.Tab = Tab
Tabs.Panel = Panel
export { Tabs }

export default function App() {
  return (
    <Tabs inicial="pendientes">
      <Tabs.Lista>
        <Tabs.Tab id="pendientes">Pendientes</Tabs.Tab>
        <Tabs.Tab id="hechas">Hechas</Tabs.Tab>
      </Tabs.Lista>
      <Tabs.Panel id="pendientes">Pagar la luz</Tabs.Panel>
      <Tabs.Panel id="hechas">Comprar yerba</Tabs.Panel>
    </Tabs>
  )
}
