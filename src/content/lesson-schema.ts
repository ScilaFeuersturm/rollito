import { z } from 'zod'

const prompt = {
  pregunta: z.string().trim().min(1),
  explicacion: z.string().trim().min(1),
}
const lines = z.array(z.string().trim().min(1)).min(2)

const exerciseSchema = z.discriminatedUnion('tipo', [
  z.object({ ...prompt, tipo: z.literal('opcion_multiple'), opciones: lines, correcta: z.number().int().nonnegative() })
    .refine(({ opciones, correcta }) => correcta < opciones.length, 'La respuesta debe apuntar a una opción existente.'),
  z.object({ ...prompt, tipo: z.literal('completar'), codigo: z.string().includes('___'), respuestas: z.array(z.string().trim().min(1)).min(1) }),
  z.object({ ...prompt, tipo: z.literal('ordenar'), pasos: lines }),
])

export const lessonSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  track: z.string().min(1),
  nivel: z.enum(['trainee', 'junior', 'semi-senior', 'senior']),
  modulo: z.string().min(1),
  titulo: z.string().min(1),
  duracion_min: z.number().int().min(3).max(7),
  prerequisitos: z.array(z.string()),
  ejercicios: z.array(exerciseSchema).min(2).max(5),
  tarea_local: z.string().min(1),
  resultado_esperado: z.string().min(1),
  resumen: z.array(z.string().trim().min(1)).min(3).max(5),
})

export type Exercise = z.infer<typeof exerciseSchema>
