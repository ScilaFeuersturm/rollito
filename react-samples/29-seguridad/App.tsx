import DOMPurify from 'dompurify'

// Un comentario que escribió alguien en la app. Puede traer HTML malicioso.
export const comentario = 'Hola <b>equipo</b><img src="x" onerror="alert(1)">'

// Solo se permiten links http y https: nada de javascript:, data: ni rutas raras.
export function linkSeguro(url: string): string {
  try {
    const { protocol } = new URL(url)
    return protocol === 'http:' || protocol === 'https:' ? url : '#'
  } catch {
    return '#'
  }
}

export default function App() {
  return (
    <main>
      {/* 1. Como texto: React escapa todo, así que se ve el HTML literal y no se ejecuta nada. */}
      <p data-testid="texto">{comentario}</p>

      {/* 2. Si hace falta HTML, se sanitiza antes de dangerouslySetInnerHTML. */}
      <div data-testid="html" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comentario) }} />

      {/* 3. Las URLs que vienen de afuera se validan. */}
      <a href={linkSeguro('javascript:alert(1)')}>Perfil</a>
    </main>
  )
}
