// Genera un HTML estático por ruta a partir del build del cliente (dist/) y del build SSR (dist-ssr/).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const ssr = resolve('dist-ssr')
const { render, prerenderPaths } = await import(pathToFileURL(join(ssr, 'entry-server.js')).href)

const template = await readFile(join(dist, 'index.html'), 'utf8')
const rootTag = '<div id="root"></div>'
if (!template.includes(rootTag)) throw new Error(`No encontré ${rootTag} en dist/index.html`)

const escapeHtml = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function page(url) {
  const { html, title } = render(url)
  // Reemplazos con función: si el HTML contiene "$&" o "$1" (por ejemplo en código de una lección),
  // un reemplazo con string los interpretaría como patrones especiales.
  return template
    .replace(/<title>.*?<\/title>/, () => `<title>${escapeHtml(title)}</title>`)
    // data-route le dice al cliente para qué ruta se generó este HTML (ver src/entry-client.tsx).
    .replace(rootTag, () => `<div id="root" data-route="${escapeHtml(url)}">${html}</div>`)
}

async function write(file, content) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, content)
}

for (const url of prerenderPaths) {
  await write(join(dist, url, 'index.html'), page(url))
}
// Página que muchos hosts estáticos (por ejemplo Netlify) sirven para direcciones inexistentes.
await write(join(dist, '404.html'), page('/404'))
await rm(ssr, { recursive: true, force: true })

console.log(`Prerender: ${prerenderPaths.length} páginas + 404.html`)
