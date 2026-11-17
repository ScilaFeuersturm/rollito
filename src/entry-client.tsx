import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './app/App'
import { matchRoute } from './app/routes'
import './styles/global.css'

const root = document.getElementById('root')!
const app = <StrictMode><App url={location.pathname} /></StrictMode>

function sameRoute(a: string, b: string) {
  const ra = matchRoute(a)
  const rb = matchRoute(b)
  return ra.name === rb.name && (ra.name !== 'leccion' || rb.name === 'leccion' && ra.lesson.id === rb.lesson.id)
}

// En el build, cada HTML ya viene prerenderizado y React solo lo "hidrata" (le conecta los eventos).
// Hidratar exige que el HTML coincida con lo que renderiza el cliente. Si el host sirvió un HTML de
// otra ruta (por ejemplo 404.html o la home como fallback) o estamos en `npm run dev` con el
// contenedor vacío, renderizamos desde cero.
const prerendered = root.dataset.route
if (prerendered && sameRoute(prerendered, location.pathname)) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}
