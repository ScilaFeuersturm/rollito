// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('muestra los errores del esquema y guarda los datos válidos', async () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))
  const errores = await screen.findAllByRole('alert')
  expect(errores.map(e => e.textContent)).toEqual(['Mínimo 3 caracteres', 'Tiene que ser un número'])

  fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Pagar la luz' } })
  fireEvent.change(screen.getByLabelText('Estimación (horas)'), { target: { value: '2' } })
  fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))
  expect((await screen.findByRole('status')).textContent).toBe('Guardada: Pagar la luz (2 h)')
})
