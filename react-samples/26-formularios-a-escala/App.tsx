import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// El esquema es la única fuente de verdad: valida y define el tipo de los datos.
const esquema = z.object({
  titulo: z.string().trim().min(3, 'Mínimo 3 caracteres'),
  estimacion: z.number({ error: 'Tiene que ser un número' }).int().min(1, 'Tiene que ser al menos 1'),
})
type Datos = z.infer<typeof esquema>

export default function App() {
  const [guardada, setGuardada] = useState<Datos | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Datos>({ resolver: zodResolver(esquema) })

  return (
    <form onSubmit={handleSubmit(datos => setGuardada(datos))} noValidate>
      <label>Título <input {...register('titulo')} aria-invalid={!!errors.titulo} /></label>
      {errors.titulo && <p role="alert">{errors.titulo.message}</p>}
      <label>Estimación (horas) <input type="number" {...register('estimacion', { valueAsNumber: true })} aria-invalid={!!errors.estimacion} /></label>
      {errors.estimacion && <p role="alert">{errors.estimacion.message}</p>}
      <button disabled={isSubmitting}>Guardar</button>
      {guardada && <p role="status">Guardada: {guardada.titulo} ({guardada.estimacion} h)</p>}
    </form>
  )
}
