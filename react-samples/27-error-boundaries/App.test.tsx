// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import App, { reportes } from './App'

afterEach(() => { cleanup(); vi.restoreAllMocks() })

it('reemplaza solo la parte que falló, reporta el error y permite reintentar', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {}) // React loguea el error capturado
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Romper la tarjeta' }))
  expect(screen.getByRole('alert').textContent).toContain('No pudimos mostrar esta parte.')
  expect(screen.getByRole('heading', { name: 'Panel' })).toBeTruthy() // el resto sigue
  expect(reportes).toEqual(['Datos inválidos'])

  fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }))
  expect(screen.getByText('Resumen de tareas')).toBeTruthy()
})
