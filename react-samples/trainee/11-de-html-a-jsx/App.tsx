// El mismo formulario de la lección de formularios, pasado a JSX. Las diferencias están marcadas.
export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 16 }}>  {/* style es un objeto, en camelCase */}
      <h1 className="titulo">Nueva tarea</h1>                             {/* class → className */}
      <form onSubmit={evento => evento.preventDefault()}>                  {/* onsubmit → onSubmit, recibe una función */}
        <label htmlFor="titulo">Título</label>                             {/* for → htmlFor */}
        <input id="titulo" name="titulo" type="text" required maxLength={60} />  {/* etiquetas sin cierre: /> ; números entre llaves */}
        <label><input type="checkbox" name="urgente" /> Es urgente</label>
        <button type="submit">Guardar</button>
      </form>
    </main>
  )
}
