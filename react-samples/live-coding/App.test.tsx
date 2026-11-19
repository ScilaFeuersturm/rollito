// @vitest-environment jsdom
// Paso 5: tests desde el punto de vista de la persona, con fetch simulado.
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, expect, it, vi } from 'vitest'
import { Rutas } from './App'

afterEach(() => { cleanup(); vi.unstubAllGlobals() })

const json = (datos: unknown, status = 200) => new Response(JSON.stringify(datos), { status })
const tareas = [
  { userId: 1, id: 1, title: 'Comprar yerba', completed: true },
  { userId: 1, id: 2, title: 'Pagar la luz', completed: false },
]

function simularFetch(...respuestas: Array<() => Response | Promise<Response>>) {
  const fetch = vi.fn()
  respuestas.forEach(r => fetch.mockImplementationOnce(async () => r()))
  vi.stubGlobal('fetch', fetch)
  return fetch
}

const abrir = (ruta = '/') => render(<MemoryRouter initialEntries={[ruta]}><Rutas /></MemoryRouter>)

it('muestra la carga, la lista y navega al detalle', async () => {
  simularFetch(() => json(tareas), () => json(tareas[1]))
  abrir()
  expect(screen.getByRole('status').textContent).toBe('Cargando tareas…')
  fireEvent.click(await screen.findByRole('link', { name: 'Pagar la luz' }))
  expect(await screen.findByRole('heading', { name: 'Pagar la luz' })).toBeTruthy()
  expect(screen.getByText('Pendiente')).toBeTruthy()
})

it('sin conexión muestra el error y reintentar carga la lista', async () => {
  simularFetch(() => { throw new TypeError('Failed to fetch') }, () => json(tareas))
  abrir()
  expect((await screen.findByRole('alert')).textContent).toContain('No hay conexión')
  fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }))
  expect(await screen.findByRole('link', { name: 'Comprar yerba' })).toBeTruthy()
})

it('una lista vacía muestra el estado vacío', async () => {
  simularFetch(() => json([]))
  abrir()
  expect(await screen.findByText('No hay tareas todavía.')).toBeTruthy()
})

it('clasifica un 500 y un JSON con otra forma', async () => {
  simularFetch(() => json({}, 500))
  abrir()
  expect((await screen.findByRole('alert')).textContent).toContain('El servicio no está disponible.')
  cleanup()
  simularFetch(() => json([{ id: 'uno' }]))
  abrir()
  expect((await screen.findByRole('alert')).textContent).toContain('Algo salió mal.')
})

it('un detalle que no existe muestra "No encontramos esa tarea"', async () => {
  simularFetch(() => json({}, 404))
  abrir('/tareas/999')
  expect(await screen.findByText('No encontramos esa tarea.')).toBeTruthy()
})
