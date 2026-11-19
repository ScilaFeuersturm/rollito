// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('agrega una tarea y limpia el campo', () => {
  // 1. Preparar: dibujar el componente.
  render(<App />)

  // 2. Actuar: lo mismo que haría una persona, buscando por lo que se ve en pantalla.
  fireEvent.change(screen.getByLabelText('Nueva tarea'), { target: { value: 'Pagar la luz' } })
  fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))

  // 3. Verificar: el resultado visible, no el estado interno.
  expect(screen.getByRole('listitem').textContent).toBe('Pagar la luz')
  expect((screen.getByLabelText('Nueva tarea') as HTMLInputElement).value).toBe('')
})

it('no deja agregar una tarea vacía', () => {
  render(<App />)
  fireEvent.change(screen.getByLabelText('Nueva tarea'), { target: { value: '   ' } })
  expect((screen.getByRole('button', { name: 'Agregar' }) as HTMLButtonElement).disabled).toBe(true)
})
