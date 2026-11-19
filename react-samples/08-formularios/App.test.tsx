// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('valida el título vacío y agrega una tarea válida', () => {
  render(<App />)
  const campo = screen.getByLabelText('Nueva tarea') as HTMLInputElement
  fireEvent.change(campo, { target: { value: '   ' } })
  fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))
  expect(screen.getByRole('alert').textContent).toBe('Escribí un título')

  fireEvent.change(campo, { target: { value: 'Pagar la luz' } })
  fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))
  expect(screen.getAllByRole('listitem').map(li => li.textContent)).toEqual(['Pagar la luz'])
  expect(campo.value).toBe('')
  expect(screen.queryByRole('alert')).toBeNull()
})
