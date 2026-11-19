import { lazy, Suspense, useState } from 'react'
import styles from './ReactPlayground.module.css'

// Igual que ReactPlayground, pero para HTML y CSS puros: Sandpack se carga recién al tocar
// "Probar en vivo", con la plantilla estática (sin React ni bundler).
const Sandpack = lazy(() => import('@codesandbox/sandpack-react').then(module => ({ default: module.Sandpack })))

export function HtmlPlayground({ html, css }: { html: string; css?: string }) {
  const [live, setLive] = useState(false)

  if (!live) {
    return <div className={styles.playground}>
      <pre><code className="language-html">{html.trimEnd()}</code></pre>
      {css && <pre><code className="language-css">{css.trimEnd()}</code></pre>}
      <button type="button" className={styles.run} onClick={() => setLive(true)}>
        <span aria-hidden="true">▶</span> Probar en vivo
      </button>
      <p className={styles.note}>Abre un editor con vista previa para que cambies el HTML y el CSS y veas el resultado.</p>
    </div>
  }

  const files: Record<string, string> = { '/index.html': html.trimEnd() }
  if (css) files['/styles.css'] = css.trimEnd()

  return <div className={styles.playground}>
    <Suspense fallback={<p role="status">Cargando el editor…</p>}>
      <Sandpack template="static" files={files} options={{ showLineNumbers: true, editorHeight: 420 }} />
    </Suspense>
  </div>
}
