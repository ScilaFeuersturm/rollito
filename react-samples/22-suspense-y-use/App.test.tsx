// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('muestra el fallback mientras la promesa no se resuelve', async () => {
  await act(async () => { render(<App />) })
  expect(await screen.findByText('Tarea número 1')).toBeTruthy()
})

it('sin transición vuelve al fallback; con transición conserva lo anterior', async () => {
  await act(async () => { render(<App />) })
  await screen.findByText('Tarea número 1')

  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Ver la 2' })) })
  expect(screen.getByRole('status').textContent).toBe('Cargando tarea…')
  await screen.findByText('Tarea número 2')

  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Ver la 3 (con transición)' })) })
  expect(screen.queryByRole('status')).toBeNull()
  expect(screen.getByText('Tarea número 2')).toBeTruthy() // se sigue viendo la anterior
  expect(await screen.findByText('Tarea número 3')).toBeTruthy()
})
