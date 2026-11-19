// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('muestra el mensaje de lista vacía y no muestra un 0 suelto', () => {
  const { container } = render(<App />)
  expect(screen.getByText('No tenés tareas pendientes')).toBeTruthy()
  expect(container.textContent).not.toContain('0')
  fireEvent.click(screen.getByRole('button', { name: 'Agregar una tarea' }))
  expect(screen.getAllByRole('listitem').map(li => li.textContent)).toEqual(['Comprar yerba'])
})
