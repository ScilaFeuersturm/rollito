// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('muestra carga, después el error y, al reintentar, las tareas', async () => {
  render(<App />)
  expect(screen.getByRole('status').textContent).toBe('Cargando tareas…')
  expect((await screen.findByRole('alert')).textContent).toContain('Sin conexión')
  fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }))
  expect(screen.getByRole('status')).toBeTruthy()
  expect(await screen.findByText('Pagar la luz')).toBeTruthy()
})
