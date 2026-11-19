import { lazy, Suspense, useState } from 'react'
import styles from './ReactPlayground.module.css'

// Sandpack pesa bastante y descarga el bundler de CodeSandbox. Se carga recién cuando la persona
// toca "Probar en vivo": así cada lección se lee rápido en el celular, y el HTML prerenderizado
// muestra el código igual que cualquier otro ejemplo (sin Sandpack en el servidor).
const Sandpack = lazy(() => import('@codesandbox/sandpack-react').then(module => ({ default: module.Sandpack })))

/**
 * Ejemplo de React con editor y vista previa en vivo. `code` es el contenido de App.tsx y
 * `dependencies`, las librerías extra que necesita (por ejemplo, React Router).
 */
export function ReactPlayground({ code, dependencies }: { code: string; dependencies?: Record<string, string> }) {
  const [live, setLive] = useState(false)
  const source = code.trimEnd()

  if (!live) {
    return <div className={styles.playground}>
      <pre><code className="language-tsx">{source}</code></pre>
      <button type="button" className={styles.run} onClick={() => setLive(true)}>
        <span aria-hidden="true">▶</span> Probar en vivo
      </button>
      <p className={styles.note}>Abre un editor con vista previa para que cambies el código y veas el resultado.</p>
    </div>
  }

  return <div className={styles.playground}>
    <Suspense fallback={<p role="status">Cargando el editor…</p>}>
      <Sandpack template="react-ts" files={{ '/App.tsx': source }}
        customSetup={dependencies ? { dependencies } : undefined}
        options={{ showLineNumbers: true, showTabs: false, editorHeight: 420 }} />
    </Suspense>
  </div>
}
