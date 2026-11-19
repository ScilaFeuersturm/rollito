// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('carga, error, reintento, y la mutación invalida la consulta', async () => {
  render(<App />)
  expect(screen.getByRole('status').textContent).toBe('Cargando tareas…')
  expect((await screen.findByRole('alert')).textContent).toContain('Sin conexión')

  fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }))
  expect(await screen.findByText('Comprar yerba')).toBeTruthy()

  fireEvent.change(screen.getByLabelText('Nueva tarea'), { target: { value: 'Pagar la luz' } })
  fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))
  expect(await screen.findByText('Pagar la luz')).toBeTruthy() // llegó por la consulta invalidada
})
