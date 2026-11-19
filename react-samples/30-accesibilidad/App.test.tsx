// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('el error queda asociado al campo y el foco vuelve a él', () => {
  render(<App />)
  const campo = screen.getByRole('textbox', { name: 'Nueva tarea' })
  fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))
  expect(campo.getAttribute('aria-invalid')).toBe('true')
  expect(campo.getAttribute('aria-describedby')).toBe(screen.getByText('Escribí un título').id)
  expect(document.activeElement).toBe(campo)
})

it('al agregar, anuncia el resultado y deja el foco en el campo', () => {
  render(<App />)
  const campo = screen.getByRole('textbox', { name: 'Nueva tarea' })
  fireEvent.change(campo, { target: { value: 'Pagar la luz' } })
  fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))
  expect(screen.getByRole('status').textContent).toBe('Tarea agregada: Pagar la luz')
  expect(campo.getAttribute('aria-invalid')).toBeNull()
  expect(document.activeElement).toBe(campo)
})
