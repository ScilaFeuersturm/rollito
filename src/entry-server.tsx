import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './app/App'
import { matchRoute, pageTitle } from './app/routes'

export { prerenderPaths } from './app/routes'

// Lo usa scripts/prerender.js en el build, nunca el navegador.
export function render(url: string) {
  return {
    html: renderToString(<StrictMode><App url={url} /></StrictMode>),
    title: pageTitle(matchRoute(url)),
  }
}
