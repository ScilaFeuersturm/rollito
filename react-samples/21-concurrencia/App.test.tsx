// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('el campo responde y la lista diferida termina filtrando', async () => {
  render(<App />)
  fireEvent.change(screen.getByLabelText('Buscar'), { target: { value: 'Tarea 4999' } })
  expect((screen.getByLabelText('Buscar') as HTMLInputElement).value).toBe('Tarea 4999')
  expect(await screen.findByText('Tarea 4999')).toBeTruthy()
  expect(screen.getAllByRole('listitem')).toHaveLength(1)
})

it('la transición cambia de pestaña', async () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Ver resumen' }))
  expect(await screen.findByText('Resumen: 5000 tareas')).toBeTruthy()
})
